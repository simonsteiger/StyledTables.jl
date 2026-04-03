"""
$TYPEDSIGNATURES

Convert a [`StyledTable`](@ref) into a renderable `SummaryTables.Table`.

Applies all registered modifiers (labels, spanners, formatters, styles, row groups)
and assembles the cell matrix. The result renders to HTML, LaTeX, and Typst.

In interactive contexts, `render` is optional: `StyledTable` defines `Base.show`
methods that call it automatically.

# Arguments

- `tbl`: a [`StyledTable`](@ref) configured with modifier functions.

# Returns

A `SummaryTables.Table` (a `Matrix{Cell}` with header/footer metadata).

See also: [`StyledTable`](@ref), [`tab_header!`](@ref), [`cols_label!`](@ref).

# Examples

```julia
using StyledTables, DataFrames
df = DataFrame(a = [1, 2], b = ["x", "y"])
tbl = StyledTable(df)
cols_label!(tbl, :a => "A", :b => "B")
render(tbl)
```
"""
function render(tbl::StyledTable)
    df = tbl.data

    # Determine base column order, then remove row_group_col and hidden_cols
    display_cols = filter(Symbol.(names(df))) do col
        col != tbl.row_group_col && col ∉ tbl.hidden_cols
    end

    _validate_spanners(tbl.spanners)
    _warn_render_issues(tbl, display_cols)

    n_cols = length(display_cols)
    has_spanners = !isempty(tbl.spanners)

    spanner_rows = has_spanners ? _build_spanner_rows(tbl, display_cols) : Vector{Cell}[]
    n_spanner_rows = length(spanner_rows)
    header_row = [_header_cell(tbl, col) for col in display_cols]

    body = if tbl.row_group_col !== nothing
        _build_body_with_groups(tbl, df, display_cols)
    else
        _build_plain_body(tbl, df, display_cols)
    end

    has_title = tbl.header !== nothing
    has_subtitle = has_title && tbl.header.subtitle !== nothing
    title_rows = _build_title_rows(tbl, n_cols)

    n_header_rows = (has_title ? 1 : 0) + (has_subtitle ? 1 : 0) + n_spanner_rows + 1

    parts = Matrix{Cell}[]
    append!(parts, title_rows)
    # Highest level goes at the top (furthest from column labels),
    # so reverse before appending.
    for row in reverse(spanner_rows)
        push!(parts, reshape(row, 1, n_cols))
    end
    push!(parts, reshape(header_row, 1, n_cols))
    push!(parts, body)

    cells = reduce(vcat, parts)

    # Append source notes as footer rows
    footer_row_start = nothing
    if !isempty(tbl.source_notes)
        footer_rows = map(tbl.source_notes) do note
            row = Vector{Cell}(undef, n_cols)
            row[1] = Cell(note; merge = true, halign = :left)
            for j = 2:n_cols
                row[j] = Cell(nothing)
            end
            reshape(row, 1, n_cols)
        end
        footer_matrix = reduce(vcat, footer_rows)
        cells = vcat(cells, footer_matrix)
        footer_row_start = size(cells, 1) - length(tbl.source_notes) + 1
    end

    return Table(
        cells;
        header = n_header_rows,
        footer = footer_row_start,
        footnotes = tbl.footnotes,
        postprocess = tbl.postprocessors,
        round_digits = something(tbl.round_digits, 3),
        round_mode = something(tbl.round_mode, :auto),
        trailing_zeros = something(tbl.trailing_zeros, false),
    )
end

function _build_title_rows(tbl::StyledTable, n_cols::Int)
    rows = Matrix{Cell}[]
    hdr = tbl.header
    hdr === nothing && return rows

    title_row = [Cell(hdr.title; bold = true, merge = true) for _ = 1:n_cols]
    push!(rows, reshape(title_row, 1, n_cols))

    if hdr.subtitle !== nothing
        subtitle_row = [Cell(hdr.subtitle; italic = true, merge = true) for _ = 1:n_cols]
        push!(rows, reshape(subtitle_row, 1, n_cols))
    end

    return rows
end

function _apply_formatter(value, tbl::StyledTable, col::Symbol)
    haskey(tbl.col_formatters, col) || return value
    return tbl.col_formatters[col](value)
end

function _apply_col_style(formatted, cell_raw, tbl::StyledTable, col::Symbol)
    has_static = haskey(tbl.col_styles, col)
    has_fn = haskey(tbl.col_style_fns, col)
    !has_static && !has_fn && return formatted

    # Read static baseline
    color = has_static ? tbl.col_styles[col].color : nothing
    bold = has_static ? tbl.col_styles[col].bold : nothing
    italic = has_static ? tbl.col_styles[col].italic : nothing
    underline = has_static ? tbl.col_styles[col].underline : nothing

    # Apply function override
    if has_fn
        result = tbl.col_style_fns[col](cell_raw)
        if result !== nothing
            result isa NamedTuple || throw(
                ArgumentError(
                    "tab_style! function for column :$col must return " *
                    "`nothing` or a NamedTuple, " *
                    "got $(typeof(result)). " *
                    "Did you forget an explicit `nothing` in the else branch?",
                ),
            )
            for key in keys(result)
                key in (:color, :bold, :italic, :underline) || throw(
                    ArgumentError(
                        "tab_style! function for column :$col returned NamedTuple with " *
                        "unrecognised key :$key. Valid keys: :color, :bold, :italic, :underline.",
                    ),
                )
            end
            hasproperty(result, :color) && (color = _resolve_color(result.color))
            hasproperty(result, :bold) && (bold = result.bold)
            hasproperty(result, :italic) && (italic = result.italic)
            hasproperty(result, :underline) && (underline = result.underline)
        end
    end

    if color === nothing && bold === nothing && italic === nothing && underline === nothing
        return formatted
    end
    return SummaryTables.Styled(formatted; color, bold, italic, underline)
end

function _build_plain_body(tbl::StyledTable, df::DataFrame, colnames::Vector{Symbol})
    body = Matrix{Cell}(undef, nrow(df), length(colnames))
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i = 1:nrow(df)
            cell_raw = df[i, col]
            formatted = _apply_formatter(cell_raw, tbl, col)
            styled = _apply_col_style(formatted, cell_raw, tbl, col)
            body[i, j] = Cell(styled; halign)
        end
    end
    return body
end

function _build_body_with_groups(
    tbl::StyledTable,
    df::DataFrame,
    display_cols::Vector{Symbol},
)
    group_col = tbl.row_group_col
    indent = tbl.row_group_indent_pt
    group_vals = string.(df[!, group_col])

    group_insert_positions = _find_group_boundaries(group_vals)
    n_extra = length(group_insert_positions)
    n_display_rows = nrow(df) + n_extra
    n_cols = length(display_cols)

    body = Matrix{Cell}(undef, n_display_rows, n_cols)
    offset = 0

    for i = 1:nrow(df)
        if haskey(group_insert_positions, i)
            label = group_insert_positions[i]
            for j = 1:n_cols
                if j == 1
                    body[i+offset, j] =
                        Cell(label; bold = true, indent_pt = 0, halign = :left)
                else
                    body[i+offset, j] = Cell(nothing)
                end
            end
            offset += 1
        end
        for (j, col) in enumerate(display_cols)
            halign = get(tbl.col_alignments, col, :left)
            indent_pt = j == 1 ? indent : 0.0
            cell_raw = df[i, col]
            formatted = _apply_formatter(cell_raw, tbl, col)
            styled = _apply_col_style(formatted, cell_raw, tbl, col)
            body[i+offset, j] = Cell(styled; halign, indent_pt)
        end
    end

    return body
end

# Returns Dict(row_index => group_label) for rows that start a new group
function _find_group_boundaries(group_vals::Vector{<:AbstractString})
    result = Dict{Int,String}()
    prev = nothing
    for (i, v) in enumerate(group_vals)
        if v != prev
            result[i] = v
            prev = v
        end
    end

    return result
end

# Returns a Vector of (spanner_label, gap_cols) tuples for each spanner
# whose columns are non-contiguous in display_cols.
function _noncontiguous_spanner_gaps(spanners, display_cols)
    results = Vector{Tuple{Any,Vector{Symbol}}}()
    col_pos = Dict(col => i for (i, col) in enumerate(display_cols))
    for s in spanners
        positions = [col_pos[c] for c in s.columns if haskey(col_pos, c)]
        length(positions) < 2 && continue
        lo, hi = extrema(positions)
        gap_cols = [display_cols[p] for p = lo:hi if display_cols[p] ∉ s.columns]
        isempty(gap_cols) || push!(results, (s.label, gap_cols))
    end

    return results
end

# Returns a Vector of group labels that appear more than once (non-adjacently).
function _duplicate_group_labels(tbl)
    tbl.row_group_col === nothing && return String[]
    vals = string.(tbl.data[!, tbl.row_group_col])
    seen = Set{String}()
    dupes = String[]
    prev = nothing
    for v in vals
        if v != prev && v in seen
            push!(dupes, v)
        end
        push!(seen, v)
        prev = v
    end

    return unique(dupes)
end

function _warn_render_issues(tbl, display_cols)
    gaps = _noncontiguous_spanner_gaps(tbl.spanners, display_cols)
    for (label, gap_cols) in gaps
        n = length(gap_cols)
        col_str = if n == 1
            "column :$(gap_cols[1])"
        else
            "columns $(join((":$c" for c in gap_cols), ", "))"
        end
        verb = n == 1 ? "lies" : "lie"
        @warn "Spanner \"$label\" has a gap: $col_str $verb between its " *
              "outermost spanned columns but are not part of this spanner."
    end

    dupes = _duplicate_group_labels(tbl)
    if !isempty(dupes)
        @warn "Row group column :$(tbl.row_group_col) is not sorted: " *
              "group label(s) " *
              "$(join(("\"$d\"" for d in dupes), ", ")) appear more than once."
    end
end

function _validate_spanners(spanners::Vector{Spanner})
    isempty(spanners) && return

    levels = sort(unique(s.level for s in spanners))

    # Check 1: contiguous levels starting from 1
    expected = collect(1:maximum(levels))
    if levels != expected
        missing_levels = setdiff(expected, levels)
        throw(
            ArgumentError(
                "Spanner levels must be contiguous starting from 1. " *
                "Missing level(s): $(join(missing_levels, ", ")).",
            ),
        )
    end

    # Check 2: same-level spanners must be fully disjoint
    for lvl in levels
        same = filter(s -> s.level == lvl, spanners)
        for i = 1:(length(same)-1), j = (i+1):length(same)
            overlap = intersect(same[i].columns, same[j].columns)
            isempty(overlap) && continue
            throw(
                ArgumentError(
                    "Two spanners at level $lvl share columns $(overlap): " *
                    "\"$(same[i].label)\" and \"$(same[j].label)\".",
                ),
            )
        end
    end

    # Check 3: cross-level pairs must be disjoint or one a subset of the other
    for i = 1:(length(spanners)-1), j = (i+1):length(spanners)
        si, sj = spanners[i], spanners[j]
        si.level == sj.level && continue
        a, b = Set(si.columns), Set(sj.columns)
        inter = intersect(a, b)
        isempty(inter) && continue   # disjoint: ok
        a ⊆ b && continue            # a inside b: ok
        b ⊆ a && continue            # b inside a: ok
        throw(
            ArgumentError(
                "Spanners at levels $(si.level) and $(sj.level) partially overlap. " *
                "\"$(si.label)\" covers $(sort(collect(a))) and " *
                "\"$(sj.label)\" covers $(sort(collect(b))). " *
                "Column sets must be disjoint or one must fully contain the other.",
            ),
        )
    end
end

# Returns one Vector{Cell} per spanner level, ordered level 1 first (bottom-most).
# render() reverses this order before assembling so the highest level appears at the top.
#
# mergegroup_counter is a single counter across ALL levels so that no two spanners
# share a mergegroup value.
function _build_spanner_rows(tbl::StyledTable, colnames::Vector{Symbol})
    levels = sort(unique(s.level for s in tbl.spanners))
    rows = Vector{Cell}[]
    mergegroup_counter = 0

    for lvl in levels
        row = Cell[Cell(nothing) for _ in colnames]
        level_spanners = filter(s -> s.level == lvl, tbl.spanners)
        for spanner in level_spanners
            mergegroup_counter += 1
            for col in spanner.columns
                j = findfirst(==(col), colnames)
                j === nothing && continue
                row[j] = Cell(
                    spanner.label;
                    bold = true,
                    merge = true,
                    mergegroup = mergegroup_counter,
                    border_bottom = true,
                )
            end
        end
        push!(rows, row)
    end

    return rows  # [level_1_row, level_2_row, ..., level_N_row]
end

# Build a single header cell for a given column, applying label overrides and alignment
function _header_cell(tbl::StyledTable, col::Symbol)
    if col == tbl.stub_col
        label = tbl.stubhead_label
        halign = get(tbl.col_alignments, col, :left)
        return Cell(label; bold = label !== nothing, halign)
    end

    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    
    if haskey(tbl.col_footnotes, col)
        label = SummaryTables.Annotated(label, tbl.col_footnotes[col])
    end
    
    return Cell(label; bold = true, halign)
end

# Allow StyledTable to be displayed directly without an explicit render() call.
# Delegates to render() and forwards to SummaryTables.Table's show methods.
function Base.show(io::IO, mime::MIME"text/html", tbl::StyledTable)
    show(io, mime, render(tbl))
end

function Base.show(io::IO, mime::MIME"text/latex", tbl::StyledTable)
    show(io, mime, render(tbl))
end

function Base.show(io::IO, mime::MIME"text/typst", tbl::StyledTable)
    show(io, mime, render(tbl))
end
