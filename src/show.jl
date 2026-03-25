# Display logic for StyledTable

function _truncate20(val)
    s = string(val)
    length(s) <= 20 ? s : first(s, 20) * "…"
end

_ncols_str(n) = n == 1 ? "1 col" : "$n cols"

function _is_unconfigured(tbl::StyledTable)
    isempty(tbl.col_labels) &&
    isempty(tbl.col_alignments) &&
    isempty(tbl.col_formatters) &&
    isempty(tbl.col_styles) &&
    isempty(tbl.col_style_fns) &&
    isempty(tbl.col_footnotes) &&
    isempty(tbl.hidden_cols) &&
    isempty(tbl.spanners) &&
    isempty(tbl.footnotes) &&
    isempty(tbl.source_notes) &&
    isempty(tbl.postprocessors) &&
    tbl.row_group_col === nothing &&
    tbl.stub_col === nothing &&
    tbl.header === nothing &&
    tbl.col_order === nothing &&
    tbl.stubhead_label === nothing &&
    tbl.round_digits === nothing &&
    tbl.round_mode === nothing &&
    tbl.trailing_zeros === nothing
end

function _spanner_str(spanners::Vector{Spanner})
    total = length(spanners)
    levels = sort(unique(s.level for s in spanners))
    if length(levels) == 1
        unique_cols = length(reduce(union, s.columns for s in spanners))
        return "$total ($unique_cols cols)"
    else
        parts = String[]
        for lv in levels
            cols = reduce(union, s.columns for s in spanners if s.level == lv)
            push!(parts, "L$lv: $(length(cols)) cols")
        end
        return "$total (" * join(parts, " · ") * ")"
    end
end

function _round_str(tbl::StyledTable)
    parts = String[]
    digits_part = tbl.round_digits !== nothing ? "$(tbl.round_digits) digits" : ""
    if tbl.round_mode !== nothing
        mode_tag = "($(tbl.round_mode))"
        digits_part = isempty(digits_part) ? mode_tag : "$digits_part $mode_tag"
    end
    !isempty(digits_part) && push!(parts, digits_part)
    tbl.trailing_zeros === true && push!(parts, "trailing zeros")
    join(parts, " · ")
end

function Base.show(io::IO, tbl::StyledTable)
    nrow, ncol = size(tbl.data)
    dims = "$nrow × $ncol"

    if _is_unconfigured(tbl)
        print(io, "StyledTable  $dims  (unconfigured)")
        return
    end

    # Collect active rows as (label, value) pairs
    rows = Pair{String,String}[]

    if tbl.header !== nothing
        title_str = "\"$(_truncate20(tbl.header.title))\""
        if tbl.header.subtitle !== nothing
            title_str *= " / \"$(_truncate20(tbl.header.subtitle))\""
        end
        push!(rows, "header" => title_str)
    end

    !isempty(tbl.spanners) &&
        push!(rows, "span" => _spanner_str(tbl.spanners))

    tbl.stub_col !== nothing &&
        push!(rows, "stub" => ":$(tbl.stub_col)")

    tbl.row_group_col !== nothing &&
        push!(rows, "groups" => ":$(tbl.row_group_col)")

    !isempty(tbl.col_labels) &&
        push!(rows, "labels" => _ncols_str(length(tbl.col_labels)))

    !isempty(tbl.col_alignments) &&
        push!(rows, "align" => _ncols_str(length(tbl.col_alignments)))

    !isempty(tbl.col_formatters) &&
        push!(rows, "fmt" => _ncols_str(length(tbl.col_formatters)))

    let n = length(union(keys(tbl.col_styles), keys(tbl.col_style_fns)))
        n > 0 && push!(rows, "styles" => _ncols_str(n))
    end

    !isempty(tbl.hidden_cols) &&
        push!(rows, "hidden" => _ncols_str(length(tbl.hidden_cols)))

    if !isempty(tbl.col_footnotes)
        n = length(tbl.col_footnotes)
        push!(rows, "note" => (n == 1 ? "1 note" : "$n notes"))
    end

    if !isempty(tbl.source_notes)
        n = length(tbl.source_notes)
        push!(rows, "source" => (n == 1 ? "1 source" : "$n sources"))
    end

    if !isempty(tbl.postprocessors)
        n = length(tbl.postprocessors)
        push!(rows, "postprocessors" => (n == 1 ? "1 postprocessor" : "$n postprocessors"))
    end

    (tbl.round_digits !== nothing ||
        tbl.round_mode !== nothing ||
        tbl.trailing_zeros !== nothing) &&
        push!(rows, "round" => _round_str(tbl))

    # Guard: if no displayable fields, fall back to single-line format
    if isempty(rows)
        print(io, "StyledTable  $dims  (unconfigured)")
        return
    end

    # Layout: right-pad labels to a fixed width
    label_width = maximum(length(first(r)) for r in rows) + 2
    row_strs = ["  $(rpad(label, label_width))$value" for (label, value) in rows]

    # Separator: covers widest row, clamped to [30, 80]
    sep_width = clamp(maximum(length(s) for s in row_strs), 30, 80)
    sep = '─'^sep_width

    lines = ["StyledTable  $dims", sep, row_strs...]
    print(io, join(lines, "\n"))
end
