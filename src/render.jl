"""
$TYPEDSIGNATURES

Convert a [`StyledTable`](@ref) into a renderable `SummaryTables.Table`.

Applies all modifiers registered on `tbl` (labels, spanners, formatters,
styles, row groups, etc.) and assembles the cell matrix. The result
supports `show(io, MIME"text/html"(), ...)`, LaTeX, and Typst output.

Calling `render` is optional in interactive contexts: `StyledTable` has
`Base.show` methods that call `render` automatically.

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
cols_label!(tbl, a = "A", b = "B")
render(tbl)
```
"""
function render(tbl::StyledTable)
    df = tbl.data

    # Determine base column order (respecting cols_move), then remove row_group_col and hidden_cols
    base_order = tbl.col_order !== nothing ? tbl.col_order : Symbol.(names(df))
    display_cols = filter(base_order) do col
        col != tbl.row_group_col && col ∉ tbl.hidden_cols
    end

    n_cols = length(display_cols)
    has_spanners = !isempty(tbl.spanners)

    spanner_row  = has_spanners ? _build_spanner_row(tbl, display_cols) : nothing
    header_row   = [_header_cell(tbl, col) for col in display_cols]

    body = if tbl.row_group_col !== nothing
        _build_body_with_groups(tbl, df, display_cols)
    else
        _build_plain_body(tbl, df, display_cols)
    end

    has_title = tbl.header !== nothing
    has_subtitle = has_title && tbl.header.subtitle !== nothing
    title_rows = _build_title_rows(tbl, n_cols)

    n_header_rows = (has_title ? 1 : 0) + (has_subtitle ? 1 : 0) + (has_spanners ? 1 : 0) + 1

    parts = Matrix{Cell}[]
    append!(parts, title_rows)
    has_spanners && push!(parts, reshape(spanner_row, 1, n_cols))
    push!(parts, reshape(header_row, 1, n_cols))
    push!(parts, body)

    cells = reduce(vcat, parts)

    # Append source notes as footer rows
    footer_row_start = nothing
    if !isempty(tbl.source_notes)
        footer_rows = map(tbl.source_notes) do note
            row = Vector{Cell}(undef, n_cols)
            row[1] = Cell(note; merge = true, halign = :left)
            for j in 2:n_cols
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

    title_row = [Cell(hdr.title; bold = true, merge = true) for _ in 1:n_cols]
    push!(rows, reshape(title_row, 1, n_cols))

    if hdr.subtitle !== nothing
        subtitle_row = [Cell(hdr.subtitle; italic = true, merge = true) for _ in 1:n_cols]
        push!(rows, reshape(subtitle_row, 1, n_cols))
    end

    return rows
end

function _apply_formatter(value, tbl::StyledTable, col::Symbol)
    haskey(tbl.col_formatters, col) || return value
    return tbl.col_formatters[col](value)
end

function _apply_col_style(value, tbl::StyledTable, col::Symbol)
    haskey(tbl.col_styles, col) || return value
    s = tbl.col_styles[col]
    return SummaryTables.Styled(value; s.color, s.bold, s.italic, s.underline)
end

function _build_plain_body(tbl::StyledTable, df::DataFrame, colnames::Vector{Symbol})
    body = Matrix{Cell}(undef, nrow(df), length(colnames))
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i in 1:nrow(df)
            raw = _apply_formatter(df[i, col], tbl, col)
            val = _apply_col_style(raw, tbl, col)
            body[i, j] = Cell(val; halign)
        end
    end
    return body
end

function _build_body_with_groups(tbl::StyledTable, df::DataFrame, display_cols::Vector{Symbol})
    group_col = tbl.row_group_col
    indent = tbl.row_group_indent_pt
    group_vals = string.(df[!, group_col])

    group_insert_positions = _find_group_boundaries(group_vals)
    n_extra = length(group_insert_positions)
    n_display_rows = nrow(df) + n_extra
    n_cols = length(display_cols)

    body = Matrix{Cell}(undef, n_display_rows, n_cols)
    offset = 0

    for i in 1:nrow(df)
        if haskey(group_insert_positions, i)
            label = group_insert_positions[i]
            for j in 1:n_cols
                if j == 1
                    body[i + offset, j] = Cell(label; bold = true, indent_pt = 0, halign = :left)
                else
                    body[i + offset, j] = Cell(nothing)
                end
            end
            offset += 1
        end
        for (j, col) in enumerate(display_cols)
            halign = get(tbl.col_alignments, col, :left)
            indent_pt = j == 1 ? indent : 0.0
            raw = _apply_formatter(df[i, col], tbl, col)
            val = _apply_col_style(raw, tbl, col)
            body[i + offset, j] = Cell(val; halign, indent_pt)
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

function _build_spanner_row(tbl::StyledTable, colnames::Vector{Symbol})
    row = Cell[Cell(nothing) for _ in colnames]
    for (group_idx, spanner) in enumerate(tbl.spanners)
        for col in spanner.columns
            j = findfirst(==(col), colnames)
            j === nothing && continue
            row[j] = Cell(spanner.label; bold = true, merge = true, mergegroup = group_idx)
        end
    end
    return row
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
