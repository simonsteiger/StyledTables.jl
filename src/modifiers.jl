# Resolve a user-provided color value to a "#RRGGBB" hex string, or nothing.
_resolve_color(::Nothing) = nothing

function _resolve_color(c::Symbol)
    return "#" * Colors.hex(Colors.RGB(Colors.parse(Colors.Colorant, string(c))))
end

function _resolve_color(c::AbstractString)
    return "#" * Colors.hex(Colors.RGB(Colors.parse(Colors.Colorant, c)))
end

function _resolve_color(c::Colors.Colorant)
    return "#" * Colors.hex(Colors.RGB(c))
end

function _resolve_color(c)
    throw(ArgumentError(
        "_resolve_color received unsupported type $(typeof(c)). " *
        "Accepted: nothing, Symbol, AbstractString, Colors.Colorant."
    ))
end

"""
$TYPEDSIGNATURES

Rename one or more columns in the rendered output.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: any number of `col => label` pairs. `col` must be a `Symbol` matching
  a column name; `label` can be a plain `String` or any value accepted by
  `SummaryTables.Cell`, including `Multiline` for multi-line headers.

# Returns

`tbl` (modified in place).

# Notes

The underlying `DataFrame` is unchanged.

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

# Note: Pair{Symbol, Symbol} inputs are routed to the conversion method below because
# AbstractVector{<:Pair{Symbol, Symbol}} is a subtype of (and therefore more specific than)
# AbstractVector{<:Pair{Symbol}}. This method handles all remaining Symbol-keyed pairs,
# including Multiline and any other value type.
function cols_label!(tbl::StyledTable, d::AbstractVector{<:Pair{Symbol}})
    colnames = Symbol.(names(tbl.data))
    for (col, label) in d
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        tbl.col_labels[col] = label
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Rename columns using a dict or vector of pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: a `Dict` or vector of `col => label` pairs specifying columns and their labels.

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

Relabel columns by applying a function to each column name.

`f(col::String) -> label` receives the column name as a `String` and returns any value
accepted by the pair form: a `String`, or any `Cell`-compatible value such as `Multiline`.

# Arguments

- `f`: function mapping a column name `String` to a label value.
- `tbl`: the [`StyledTable`](@ref) to modify.
- `columns`: optional column selector. Pass a `Symbol`, `String`, or a `Vector` of either 
  to restrict which columns are relabeled; omit to apply `f` to all columns.

# Returns

`tbl` (modified in place).

See also: [`cols_align!`](@ref), [`cols_hide!`](@ref).

# Examples

```julia
# Apply uppercase to every column header
tbl = StyledTable(df)
cols_label!(uppercase, tbl)

# do-block: titlecase + underscore removal for selected columns
tbl = StyledTable(df)
cols_label!(tbl, [:bmi_score, :sbp_mmhg]) do col
    titlecase(replace(col, "_" => " "))
end
render(tbl)
```
"""
function cols_label!(f, tbl::StyledTable, columns::AbstractVector{Symbol})
    colnames = Symbol.(names(tbl.data))
    for col in columns
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in columns
        tbl.col_labels[col] = f(string(col))
    end
    return tbl
end

function cols_label!(f, tbl::StyledTable, columns::AbstractVector{<:AbstractString})
    cols_label!(f, tbl, Symbol.(columns))
    return tbl
end

cols_label!(f, tbl::StyledTable, column::Symbol) = cols_label!(f, tbl, [column])
cols_label!(f, tbl::StyledTable, column::AbstractString) = cols_label!(f, tbl, Symbol(column))

function cols_label!(f, tbl::StyledTable)
    cols_label!(f, tbl, Symbol.(names(tbl.data)))
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

Add one or more spanning header labels above groups of columns.

Each spanner is given as a `label => columns` pair, where `label` is the spanner text
(a `String`, `SummaryTables.Multiline`, or any value accepted by `SummaryTables.Cell`)
and `columns` is a `Vector{Symbol}` of column names to span.

Use the `level` keyword to stack spanners in multiple rows: `level = 1` (the default) is
the bottom-most row, closest to the column labels; `level = 2` sits above it, and so on.
A higher-level spanner's column set must fully contain every lower-level spanner it overlaps.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: one or more `label => columns` pairs.
- `level`: spanner row (default `1`). Alternatively, use the single-label form
  `tab_spanner!(tbl, label; columns = [...], level = N)`.

# Returns

`tbl` (modified in place).

See also: [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
# Single spanner
tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes" => [:efficacy, :safety])
render(tbl)
```

```julia
# Two levels: "Length (mm)" at level 1, "Physical measurements" above it at level 2
tbl = StyledTable(df)
tab_spanner!(tbl, "Length (mm)" => [:bill_len, :bill_depth, :flipper_len])
tab_spanner!(tbl, "Physical measurements" => [:bill_len, :bill_depth, :flipper_len, :body_mass]; level = 2)
render(tbl)
```

```julia
using SummaryTables: Multiline
tbl = StyledTable(df)
tab_spanner!(tbl, Multiline("Treatment", "(N=50)") => [:dose, :response])
render(tbl)
```
"""
function tab_spanner!(tbl::StyledTable, args::Pair...; level::Int = 1)
    tab_spanner!(tbl, collect(args); level)
    return tbl
end

function _push_spanners!(tbl::StyledTable, d; level::Int = 1)
    colnames = Symbol.(names(tbl.data))
    for (label, columns) in d
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        push!(tbl.spanners, Spanner(label, columns, level))
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Add a single spanning header label above a group of columns, using keyword arguments.

This is a convenience alternative to the `label => columns` pair form. Both forms accept
the `level` keyword for stacking spanners in multiple header rows.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `label`: the spanner text (a `String`, `SummaryTables.Multiline`, or any value accepted
  by `SummaryTables.Cell`).
- `columns`: columns to span (`Vector{Symbol}`). Required.
- `level`: spanner row (default `1`). `1` = bottom-most row; higher values sit above.

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_spanner!(tbl, "Length (mm)"; columns = [:bill_len, :bill_depth, :flipper_len])
tab_spanner!(tbl, "Physical measurements";
    columns = [:bill_len, :bill_depth, :flipper_len, :body_mass], level = 2)
render(tbl)
```
"""
function tab_spanner!(tbl::StyledTable, label; columns::AbstractVector{Symbol}, level::Int = 1)
    _push_spanners!(tbl, [label => columns]; level)
    return tbl
end

# Note: Pair{String, Vector{Symbol}} inputs arrive here from the conversion method below.
# The exact (invariant) signature prevents Julia from routing them back through the
# conversion method, which would cause a StackOverflow.
function tab_spanner!(tbl::StyledTable, d::AbstractVector{Pair{String, Vector{Symbol}}}; level::Int = 1)
    _push_spanners!(tbl, d; level)
end

# Handles Multiline and any other non-String, non-Symbol label keys.
function tab_spanner!(tbl::StyledTable, d::AbstractVector{<:Pair{<:Any, Vector{Symbol}}}; level::Int = 1)
    _push_spanners!(tbl, d; level)
end

"""
$TYPEDSIGNATURES

Add spanning headers from a dict or vector of pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or `AbstractVector` of `Pair`s mapping spanner labels to column
  name vectors.
- `level`: spanner row applied to every entry in `d` (default `1`).

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_spanner!(tbl, Dict(
    "Outcomes"     => [:efficacy, :safety],
    "Demographics" => [:age, :sex])
)
render(tbl)
```
"""
function tab_spanner!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{T, Vector{T}}},
    AbstractVector{<:Pair{Symbol, Vector{Symbol}}}, AbstractVector{<:Pair{Symbol, Vector{T}}},
    AbstractVector{<:Pair{T, Vector{Symbol}}}, AbstractDict{Symbol, Vector{Symbol}}, AbstractDict{T, Vector{T}},
    AbstractDict{Symbol, Vector{T}}, AbstractDict{T, Vector{Symbol}}}; level::Int = 1) where T <: AbstractString
    ps = [String(label) => Symbol.(columns) for (label, columns) in d]
    tab_spanner!(tbl, ps; level)
end

"""
$TYPEDSIGNATURES

Mark a column as the stub (row-label column).

The stub header is not bolded. Use [`tab_stubhead!`](@ref) to label it.

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

Wrap a `DataFrame` (or any Tables.jl-compatible table) in a [`StyledTable`](@ref).

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
        Dict{Symbol,Function}(),         # col_style_fns
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

The title renders bold; the subtitle renders italic.

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

Without `columns`, `text` appears as a table-level note. With `columns`, an auto-numbered superscript attaches to those column headers, and `text` appears in the footnote area.

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

Group rows by distinct values in a column.

A bold group-label row precedes each new group value. Data rows are indented by `indent_pt` points. Hide the grouping column afterwards with [`cols_hide!`](@ref).

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

Set the stub column header label.

Requires a prior call to [`tab_stub!`](@ref).

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

Source notes span the full table width and are left-aligned. Each call appends another line.

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

- `color`: color value — hex string (`"#RRGGBB"`), CSS name (`"green"`), symbol (`:green`),
  or a `Colors.Colorant`. `nothing` inherits the default. Alpha channels are silently dropped.
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
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    colnames = Symbol.(names(tbl.data))
    for col in columns
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in columns
        tbl.col_styles[col] = ColStyleOverride(_resolve_color(color), bold, italic, underline)
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Apply inline styling to body cells in the listed columns (variadic form).

# Returns

`tbl` (modified in place).

# Keywords

- `color`: color value — hex string (`"#RRGGBB"`), CSS name (`"green"`), symbol (`:green`),
  or a `Colors.Colorant`. `nothing` inherits the default. Alpha channels are silently dropped.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

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
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    tab_style!(tbl, collect(columns); color=color, bold=bold, italic=italic, underline=underline)
    return tbl
end

"""
$TYPEDSIGNATURES

Apply conditional inline styling to body cells in the listed columns.

`f(raw_value) -> Union{Nothing, NamedTuple}` receives each cell's raw DataFrame value
(before any formatter) and returns either `nothing` (no conditional style) or a `NamedTuple`
with any subset of `color`, `bold`, `italic`, `underline`. A key set to `nothing` explicitly
clears the static baseline for that property.

Optional kwargs set a static per-column baseline. The function result overrides any
baseline property whose key is present in the returned `NamedTuple`.

# Returns

`tbl` (modified in place).

# Keywords

- `color`: baseline color — hex string, CSS name, `Symbol`, or `Colors.Colorant`.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, :change) do val
    val > 0 ? (; color=:green, bold=true) :
    val < 0 ? (; color=:red) :
    nothing
end
render(tbl)
```
"""
function tab_style!(
    f,
    tbl::StyledTable,
    columns::AbstractVector{Symbol};
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    colnames = Symbol.(names(tbl.data))
    for col in columns
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in columns
        tbl.col_style_fns[col] = f
        if any(!isnothing, (color, bold, italic, underline))
            tbl.col_styles[col] = ColStyleOverride(_resolve_color(color), bold, italic, underline)
        end
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Apply conditional inline styling to body cells (variadic / do-block form).

See the vector form for full documentation.
"""
function tab_style!(
    f,
    tbl::StyledTable,
    columns::Symbol...;
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    tab_style!(f, tbl, collect(columns); color=color, bold=bold, italic=italic, underline=underline)
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

Options pass to `SummaryTables.Table` at render time. Per-column formatters (see [`fmt_number!`](@ref), [`fmt!`](@ref)) take precedence.

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

Hidden columns remain accessible for grouping or formatting, but do not appear in the rendered table. Commonly paired with [`tab_row_group!`](@ref).

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
