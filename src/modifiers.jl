"""
    cols_label(; kwargs...)

Rename columns for display. Each keyword argument maps a column `Symbol` to its
display label (a plain string or any `SummaryTables.Cell`-compatible value).
Column names in the underlying `DataFrame` are not changed.

# Examples
```julia
df |> StyledTable() |> cols_label(bmi = "BMI (kg/m²)", sbp = "Systolic BP") |> render()
```
"""
function cols_label(; kwargs...)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for (col, label) in kwargs
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            tbl.col_labels[col] = label
        end
        return tbl
    end
end

"""
    cols_align(halign, columns=nothing)

Set horizontal alignment for columns. `halign` must be `:left`, `:center`, or `:right`.
If `columns` is omitted, alignment is applied to all columns.

# Examples
```julia
df |> StyledTable() |> cols_align(:right, [:x, :y]) |> render()
df |> StyledTable() |> cols_align(:center) |> render()
```
"""
function cols_align(halign::Symbol, columns=nothing)
    halign in (:left, :center, :right) || throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        cols = columns === nothing ? colnames : columns
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            tbl.col_alignments[col] = halign
        end
        return tbl
    end
end

"""
    tab_spanner(label; columns::Vector{Symbol})

Add a spanning header above a group of columns. Multiple calls create multiple
spanners in the order they are added.

# Examples
```julia
df |> StyledTable() |> tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |> render()
```
"""
function tab_spanner(label; columns::Vector{Symbol})
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        push!(tbl.spanners, Spanner(label, columns))
        return tbl
    end
end

"""
    tab_stub(col::Symbol)

Designate a column as the stub (row-label column). The stub header is not bolded
by default; use `tab_stubhead` to set its label.

# Examples
```julia
df |> StyledTable() |> tab_stub(:drug) |> render()
```
"""
function tab_stub(col::Symbol)
    return function (tbl::StyledTable)
        col in Symbol.(names(tbl.data)) || throw(ArgumentError("Column :$col not found in DataFrame"))
        tbl.stub_col = col
        return tbl
    end
end

function StyledTable(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(
        df,                             # data
        Dict{Symbol,Any}(),             # col_labels
        Dict{Symbol,Symbol}(),          # col_alignments
        Spanner[],                      # spanners
        nothing,                        # row_group_col
        12.0,                           # row_group_indent_pt
        nothing,                        # stub_col
        nothing,                        # header
        Any[],                          # footnotes
        Dict{Symbol,Function}(),        # col_formatters
        Dict{Symbol,ColStyleOverride}(),# col_styles
        Dict{Symbol,Any}(),             # col_footnotes
        nothing,                        # col_order
        Set{Symbol}(),                  # hidden_cols
        nothing,                        # stubhead_label
        Any[],                          # source_notes
        Any[],                          # postprocessors
        nothing,                        # round_digits
        nothing,                        # round_mode
        nothing,                        # trailing_zeros
    )
end

"""
    tab_header(title; subtitle = nothing)

Add a title (and optional subtitle) above the column headers. The title is bold;
the subtitle is italic.

# Examples
```julia
df |> StyledTable() |> tab_header("My Table"; subtitle = "Subtitle here") |> render()
```
"""
function tab_header(title; subtitle = nothing)
    return function (tbl::StyledTable)
        tbl.header = TableHeader(title, subtitle)
        return tbl
    end
end

"""
    tab_footnote(text; columns = nothing)

Add a footnote. Without `columns`, the text is a table-level note. With `columns`,
an auto-numbered superscript is appended to those column headers and the text
appears below the table.

# Examples
```julia
df |> StyledTable() |> tab_footnote("Source: World Bank") |> render()
df |> StyledTable() |> tab_footnote("PPP adjusted"; columns = [:gdp]) |> render()
```
"""
function tab_footnote(text; columns::Union{Nothing,AbstractVector{Symbol}} = nothing)
    return function (tbl::StyledTable)
        if columns === nothing
            push!(tbl.footnotes, text)
        else
            colnames = Symbol.(names(tbl.data))
            for col in columns
                col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            end
            for col in columns
                tbl.col_footnotes[col] = text
            end
        end
        return tbl
    end
end

"""
    tab_row_group(col::Symbol; indent_pt = 12)

Group rows by the values of a column. A bold group-label row is inserted before
each new group value; data rows are indented by `indent_pt` points.

# Examples
```julia
df |> StyledTable() |> tab_row_group(:category) |> cols_hide(:category) |> render()
```
"""
function tab_row_group(col::Symbol; indent_pt::Real = 12)
    return function (tbl::StyledTable)
        col in Symbol.(names(tbl.data)) || throw(ArgumentError("Column :$col not found in DataFrame"))
        tbl.row_group_col = col
        tbl.row_group_indent_pt = Float64(indent_pt)
        return tbl
    end
end

"""
    tab_stubhead(label)

Set the label for the stub column header. Only takes effect when `tab_stub` has
been called.

# Examples
```julia
df |> StyledTable() |> tab_stub(:drug) |> tab_stubhead("Drug Name") |> render()
```
"""
function tab_stubhead(label)
    return function (tbl::StyledTable)
        tbl.stubhead_label = label
        return tbl
    end
end

"""
    tab_source_note(text)

Add a source-note line in the table footer. Source notes span the full table
width. Multiple calls stack additional lines.

# Examples
```julia
df |> StyledTable() |> tab_source_note("Data: World Bank Open Data") |> render()
```
"""
function tab_source_note(text)
    return function (tbl::StyledTable)
        push!(tbl.source_notes, text)
        return tbl
    end
end

"""
    tab_style(columns; color=nothing, bold=nothing, italic=nothing, underline=nothing)

Apply inline styling to all body cells in the specified columns. `color` is a
hex string (`"#RRGGBB"`). Any keyword left `nothing` is inherited from the cell default.

# Examples
```julia
df |> StyledTable() |> tab_style([:pct]; color = "#1a7340", bold = true) |> render()
```
"""
function tab_style(
    columns::AbstractVector{Symbol};
    color::Union{Nothing,String} = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        for col in columns
            tbl.col_styles[col] = ColStyleOverride(color, bold, italic, underline)
        end
        return tbl
    end
end

"""
    sub_missing(; with = "—")

Replace `missing` values with a display placeholder. Defaults to `"—"` (em dash).

# Examples
```julia
df |> StyledTable() |> sub_missing() |> render()
df |> StyledTable() |> sub_missing(with = "N/A") |> render()
```
"""
function sub_missing(; with::Any = "—")
    return function (tbl::StyledTable)
        push!(tbl.postprocessors, SummaryTables.Replace(ismissing, with, true))
        return tbl
    end
end

"""
    tab_options(; round_digits=nothing, round_mode=nothing, trailing_zeros=nothing)

Set global rounding options for all numeric cells. `round_mode` accepts `:auto`,
`:digits`, or `:sigdigits`.

# Examples
```julia
df |> StyledTable() |> tab_options(round_digits = 2, round_mode = :digits) |> render()
```
"""
function tab_options(;
    round_digits::Union{Nothing,Int} = nothing,
    round_mode::Union{Nothing,Symbol} = nothing,
    trailing_zeros::Union{Nothing,Bool} = nothing,
)
    if round_mode !== nothing
        round_mode in (:auto, :digits, :sigdigits) ||
            throw(ArgumentError("round_mode must be :auto, :digits, or :sigdigits, got :$round_mode"))
    end
    return function (tbl::StyledTable)
        round_digits !== nothing && (tbl.round_digits = round_digits)
        round_mode !== nothing && (tbl.round_mode = round_mode)
        trailing_zeros !== nothing && (tbl.trailing_zeros = trailing_zeros)
        return tbl
    end
end

"""
    cols_hide(cols::Symbol...)

Remove columns from the rendered table without dropping them from the `DataFrame`.
Useful for grouping columns (e.g., `tab_row_group`) that should not appear in the output.

# Examples
```julia
df |> StyledTable() |> tab_row_group(:group) |> cols_hide(:group) |> render()
```
"""
function cols_hide(cols::Symbol...)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        for col in cols
            push!(tbl.hidden_cols, col)
        end
        return tbl
    end
end

"""
    cols_move(cols; after = nothing)

Reorder columns. By default, `cols` are moved to the front. Pass `after = :col`
to insert them after a specific column.

# Examples
```julia
df |> StyledTable() |> cols_move([:name]) |> render()
df |> StyledTable() |> cols_move([:value]; after = :name) |> render()
```
"""
function cols_move(cols::AbstractVector{Symbol}; after::Union{Nothing,Symbol} = nothing)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        if after !== nothing
            after in colnames || throw(ArgumentError("Column :$after not found in DataFrame"))
            after in cols && throw(ArgumentError("Column :$after cannot appear in both `cols` and `after`"))
        end
        remaining = filter(c -> c ∉ cols, colnames)
        if after === nothing
            tbl.col_order = vcat(cols, remaining)
        else
            idx = findfirst(==(after), remaining)
            tbl.col_order = vcat(remaining[1:idx], collect(cols), remaining[idx+1:end])
        end
        return tbl
    end
end
