"""
$TYPEDSIGNATURES

Change the columns names displayed in the output table.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: the pairs specifying columns and labels.

# Returns

`tbl` (modified in place).

See also: [`cols_align!`](@ref), [`cols_hide!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
cols_label!(tbl, :bmi => "BMI (kg/m²)", :sbp => "Systolic BP")
render(tbl)
```
"""
function cols_label!(tbl::StyledTable, args::Pair...)
    cols_label!(tbl, collect(args))
    return tbl
end

function cols_label!(tbl::StyledTable, d::AbstractVector{Pair{Symbol, String}})
    colnames = Symbol.(names(tbl.data))
    for (col, label) in d
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        tbl.col_labels[col] = label
    end
    return tbl
end

"""
$TYPEDSIGNATURES

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: a `Dict` specifying columns and their labels.

# Returns

`tbl` (modified in place).

See also: [`cols_align!`](@ref), [`cols_hide!`](@ref).

# Examples

```julia
label_dict = Dict(:bmi => "BMI (kg/m²)", :sbp => "Systolic BP")
tbl = StyledTable(df)
cols_label!(tbl, label_dict)
render(tbl)
```
"""
function cols_label!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}}, 
    AbstractVector{<:Pair{<:AbstractString, Symbol}}, AbstractDict{Symbol, Symbol}, 
    AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}})
    ps = [Symbol(col) => String(label) for (col, label) in d]
    cols_label!(tbl, ps)
    return tbl
end

"""
$TYPEDSIGNATURES

Set horizontal alignment for one or more columns.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `halign`: one of `:left`, `:center`, or `:right`.
- `columns`: vector of column names to align. Omit to apply to all columns.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, :right, [:x, :y])
render(tbl)
```
"""
function cols_align!(tbl::StyledTable, halign::Symbol, columns=nothing)
    halign in (:left, :center, :right) ||
        throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    colnames = Symbol.(names(tbl.data))
    cols = columns === nothing ? colnames : columns
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in cols
        tbl.col_alignments[col] = halign
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Add a spanning header label above one or more groups of columns.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: any number of `Pair`s that maps the spanner labels
  to vectors of columns.

# Returns

`tbl` (modified in place).

See also: [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes" => [:efficacy, :safety])
render(tbl)
```
"""
function tab_spanner!(tbl::StyledTable, args::Pair...)
    tab_spanner!(tbl, collect(args))
    return tbl
end

function tab_spanner!(tbl::StyledTable, d::AbstractVector{Pair{String, Vector{Symbol}}})
    colnames = Symbol.(names(tbl.data))
    for (label, columns) in d
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        push!(tbl.spanners, Spanner(label, columns))
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Add a spanning header label above one or more groups of columns.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or an `AbstractVector` of `Pair`s that maps 
  the spanner labels to vectors of columns.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
tab_spanner!(tbl, Dict(
    "Outcomes" => [:efficacy, :safety],
    "Demographics" => [:age, :sex])
)
render(tbl)
```
"""
function tab_spanner!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{T, Vector{T}}},
    AbstractVector{<:Pair{Symbol, Vector{Symbol}}}, AbstractVector{<:Pair{Symbol, Vector{T}}}, 
    AbstractVector{<:Pair{T, Vector{Symbol}}}, AbstractDict{Symbol, Vector{Symbol}}, AbstractDict{T, Vector{T}}, 
    AbstractDict{Symbol, Vector{T}}, AbstractDict{T, Vector{Symbol}}}) where T <: AbstractString
    ps = [String(label) => Symbol.(columns) for (label, columns) in d]
    tab_spanner!(tbl, ps)
end

"""
$TYPEDSIGNATURES

Designate a column as the stub (row-label column).

The stub header cell is not bolded by default. Use [`tab_stubhead!`](@ref) to
provide a label for it.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `col`: name of the column to use as the stub.

# Returns

`tbl` (modified in place).

See also: [`tab_stubhead!`](@ref), [`tab_row_group!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_stub!(tbl, :drug)
render(tbl)
```
"""
function tab_stub!(tbl::StyledTable, col::Symbol)
    col in Symbol.(names(tbl.data)) ||
        throw(ArgumentError("Column :$col not found in DataFrame"))
    tbl.stub_col = col
    return tbl
end

"""
$TYPEDSIGNATURES

Construct a [`StyledTable`](@ref) from a `DataFrame` (or any Tables.jl-compatible source).

Returns a `StyledTable` with default settings. Apply modifier functions and
call [`render`](@ref) to produce a `SummaryTables.Table`.

# Arguments

- `data`: a `DataFrame` or any Tables.jl-compatible table.

# Returns

A [`StyledTable`](@ref).

See also: [`render`](@ref), [`cols_label!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_header!(tbl, "My Table")
render(tbl)
```
"""
function StyledTable(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(
        df,                              # data
        Dict{Symbol,Any}(),              # col_labels
        Dict{Symbol,Symbol}(),           # col_alignments
        Spanner[],                       # spanners
        nothing,                         # row_group_col
        12.0,                            # row_group_indent_pt
        nothing,                         # stub_col
        nothing,                         # header
        Any[],                           # footnotes
        Dict{Symbol,Function}(),         # col_formatters
        Dict{Symbol,ColStyleOverride}(), # col_styles
        Dict{Symbol,Any}(),              # col_footnotes
        nothing,                         # col_order
        Set{Symbol}(),                   # hidden_cols
        nothing,                         # stubhead_label
        Any[],                           # source_notes
        Any[],                           # postprocessors
        nothing,                         # round_digits
        nothing,                         # round_mode
        nothing,                         # trailing_zeros
    )
end

"""
$TYPEDSIGNATURES

Add a title and optional subtitle above the column headers.

The title is rendered bold; the subtitle is rendered italic.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `title`: main heading text.

# Keywords

- `subtitle`: secondary heading text, or `nothing` (default).

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_source_note!`](@ref), [`tab_footnote!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_header!(tbl, "My Table"; subtitle = "Subtitle here")
render(tbl)
```
"""
function tab_header!(tbl::StyledTable, title; subtitle = nothing)
    tbl.header = TableHeader(title, subtitle)
    return tbl
end

"""
$TYPEDSIGNATURES

Add a footnote to the table.

Without `columns`, `text` is a table-level note appended below the body.
With `columns`, an auto-numbered superscript is attached to those column
headers and `text` appears in the footnote area.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `text`: footnote text.

# Keywords

- `columns`: column names to annotate with a superscript, or `nothing` (default).

# Returns

`tbl` (modified in place).

See also: [`tab_source_note!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_footnote!(tbl, "Source: World Bank")
tab_footnote!(tbl, "PPP adjusted"; columns = [:gdp])
render(tbl)
```
"""
function tab_footnote!(tbl::StyledTable, text; columns::Union{Nothing,AbstractVector{Symbol}} = nothing)
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

"""
$TYPEDSIGNATURES

Group rows by the values of a column.

A bold group-label row is inserted before each new group value. Data rows are
indented by `indent_pt` points. The grouping column is typically hidden with
[`cols_hide!`](@ref) afterwards.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `col`: column whose distinct values define the groups.

# Keywords

- `indent_pt`: left indent for data rows within a group (default `12`).

# Returns

`tbl` (modified in place).

See also: [`cols_hide!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_row_group!(tbl, :category)
cols_hide!(tbl, :category)
render(tbl)
```
"""
function tab_row_group!(tbl::StyledTable, col::Symbol; indent_pt::Real = 12)
    col in Symbol.(names(tbl.data)) ||
        throw(ArgumentError("Column :$col not found in DataFrame"))
    tbl.row_group_col = col
    tbl.row_group_indent_pt = Float64(indent_pt)
    return tbl
end

"""
$TYPEDSIGNATURES

Set the label for the stub column header.

Only takes effect when [`tab_stub!`](@ref) has been called first.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `label`: display text for the stub header cell.

# Returns

`tbl` (modified in place).

See also: [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_stub!(tbl, :drug)
tab_stubhead!(tbl, "Drug Name")
render(tbl)
```
"""
function tab_stubhead!(tbl::StyledTable, label)
    tbl.stubhead_label = label
    return tbl
end

"""
$TYPEDSIGNATURES

Add a source-note line in the table footer.

Source notes span the full table width and are left-aligned. Multiple calls
stack additional lines in the order they are added.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `text`: source note text.

# Returns

`tbl` (modified in place).

See also: [`tab_footnote!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_source_note!(tbl, "Data: World Bank Open Data")
render(tbl)
```
"""
function tab_source_note!(tbl::StyledTable, text)
    push!(tbl.source_notes, text)
    return tbl
end

"""
$TYPEDSIGNATURES

Apply inline styling to all body cells in the specified columns.

Any keyword left as `nothing` is inherited from the cell default.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `columns`: column names to style.

# Keywords

- `color`: hex color string (`"#RRGGBB"`), or `nothing`.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

# Returns

`tbl` (modified in place).

See also: [`fmt!`](@ref), [`cols_align!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, [:pct, :n]; color = "#1a7340", bold = true)
render(tbl)
```
"""
function tab_style!(
    tbl::StyledTable,
    columns::AbstractVector{Symbol};
    color::Union{Nothing,String} = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    colnames = Symbol.(names(tbl.data))
    for col in columns
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in columns
        tbl.col_styles[col] = ColStyleOverride(color, bold, italic, underline)
    end
    return tbl
end

"""
$TYPEDSIGNATURES

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, :pct; color = "#1a7340", bold = true)
render(tbl)
```
"""
function tab_style!(
    tbl::StyledTable,
    columns::Symbol...;
    color::Union{Nothing,String} = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    tab_style!(tbl, collect(columns); color=color, bold=bold, italic=italic, underline=underline)
    return tbl
end

"""
$TYPEDSIGNATURES

Replace `missing` values with a display placeholder.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `with`: replacement display value (default `"—"`, an em dash).

# Returns

`tbl` (modified in place).

See also: [`tab_options!`](@ref), [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
sub_missing!(tbl)
render(tbl)
```
"""
function sub_missing!(tbl::StyledTable; with::Any = "—")
    push!(tbl.postprocessors, SummaryTables.Replace(ismissing, with, true))
    return tbl
end

"""
$TYPEDSIGNATURES

Set global rounding options for all numeric cells.

These options are forwarded to `SummaryTables.Table` at render time.
Per-column formatters applied via [`fmt_number!`](@ref) or [`fmt!`](@ref) take
precedence over these global settings.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `round_digits`: number of digits to round to.
- `round_mode`: `:auto`, `:digits`, or `:sigdigits`.
- `trailing_zeros`: whether to keep trailing zeros after rounding.

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_percent!`](@ref), [`fmt_integer!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_options!(tbl, round_digits = 2, round_mode = :digits)
render(tbl)
```
"""
function tab_options!(tbl::StyledTable;
    round_digits::Union{Nothing,Int} = nothing,
    round_mode::Union{Nothing,Symbol} = nothing,
    trailing_zeros::Union{Nothing,Bool} = nothing,
)
    if round_mode !== nothing
        round_mode in (:auto, :digits, :sigdigits) ||
            throw(ArgumentError("round_mode must be :auto, :digits, or :sigdigits, got :$round_mode"))
    end
    round_digits !== nothing && (tbl.round_digits = round_digits)
    round_mode !== nothing && (tbl.round_mode = round_mode)
    trailing_zeros !== nothing && (tbl.trailing_zeros = trailing_zeros)
    return tbl
end

"""
$TYPEDSIGNATURES

Remove columns from the rendered output without modifying the `DataFrame`.

Hidden columns are still accessible for grouping or formatting; they just
do not appear in the final table. Commonly paired with [`tab_row_group!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: one or more column names to hide.

# Returns

`tbl` (modified in place).

See also: [`tab_row_group!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_row_group!(tbl, :group)
cols_hide!(tbl, :group)
render(tbl)
```
"""
function cols_hide!(tbl::StyledTable, cols::Symbol...)
    colnames = Symbol.(names(tbl.data))
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in cols
        push!(tbl.hidden_cols, col)
    end
    return tbl
end
