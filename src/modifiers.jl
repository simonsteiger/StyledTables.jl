# Shared catch-all helper for pair-accepting functions.
# Inspects runtime key and value types; throws an informative ArgumentError for mixed types.
# check_keys=false skips key inspection (used by tab_spanner!, where label-type mixing
# is not the documented error case).
function _throw_mixed_pair_values(
    f::Function,
    ktypes,
    vtypes,
    tbl,
    d;
    check_keys::Bool = true,
)
    if check_keys && length(ktypes) > 1
        throw(ArgumentError(
            "Mixed key types in pairs: $(join(ktypes, ", ")). " *
            "All keys must share the same type.",
        ))
    end
    if length(vtypes) > 1
        throw(ArgumentError(
            "Mixed value types in pairs: $(join(vtypes, ", ")). " *
            "All values must share the same type.",
        ))
    end
    throw(MethodError(f, (tbl, d)))
end

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
    throw(
        ArgumentError(
            "_resolve_color received unsupported type $(typeof(c)). " *
            "Pass one of: `nothing`, `Symbol`, `AbstractString`, `Colors.Colorant`.",
        ),
    )
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
function cols_label!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{<:Pair{Symbol,Symbol}},
        AbstractVector{<:Pair{<:AbstractString,<:AbstractString}},
        AbstractVector{<:Pair{<:AbstractString,Symbol}},
        AbstractDict{Symbol,Symbol},
        AbstractDict{<:AbstractString,<:AbstractString},
        AbstractDict{<:AbstractString,Symbol},
        AbstractDict{Symbol,<:AbstractString},
    },
)
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
        tbl.col_labels[col] = f(string(col))
    end

    return tbl
end

function cols_label!(f, tbl::StyledTable, columns::AbstractVector{<:AbstractString})
    cols_label!(f, tbl, Symbol.(columns))
    return tbl
end

cols_label!(f, tbl::StyledTable, column::Symbol) = cols_label!(f, tbl, [column])
function cols_label!(f, tbl::StyledTable, column::AbstractString)
    return cols_label!(f, tbl, Symbol(column))
end

function cols_label!(f, tbl::StyledTable)
    cols_label!(f, tbl, Symbol.(names(tbl.data)))
    return tbl
end

function cols_label!(tbl::StyledTable, d::AbstractDict)
    ktypes = unique(typeof(k) for k in keys(d))
    vtypes = unique(typeof(v) for v in values(d))
    _throw_mixed_pair_values(cols_label!, ktypes, vtypes, tbl, d)
end

function cols_label!(tbl::StyledTable, d::AbstractVector)
    if !isempty(d) && all(x -> x isa Pair, d)
        ktypes = unique(typeof(k) for (k, _) in d)
        vtypes = unique(typeof(v) for (_, v) in d)
        _throw_mixed_pair_values(cols_label!, ktypes, vtypes, tbl, d)
    end
    throw(MethodError(cols_label!, (tbl, d)))
end

"""
$TYPEDSIGNATURES

Set horizontal alignment for one or more columns.

Each argument is a `col => halign` pair, where `col` is a `Symbol` matching a column name
and `halign` is one of `:left`, `:center`, or `:right`.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: one or more `col => halign` pairs.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, :x => :right, :y => :center)
render(tbl)
```
"""
function cols_align!(tbl::StyledTable, args::Pair{Symbol,Symbol}...)
    colnames = Symbol.(names(tbl.data))
    valid = (:left, :center, :right)
    for (col, halign) in args
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        halign in valid || throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    end
    for (col, halign) in args
        tbl.col_alignments[col] = halign
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Set alignment from a dict or vector of `col => halign` pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or `AbstractVector` of `col => halign` pairs.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, Dict(:x => :right, :y => :center))
render(tbl)
```
"""
function cols_align!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{<:Pair{Symbol,Symbol}},
        AbstractVector{<:Pair{<:AbstractString,Symbol}},
        AbstractDict{Symbol,Symbol},
        AbstractDict{<:AbstractString,Symbol},
    },
)
    ps = [Symbol(col) => halign for (col, halign) in d]
    cols_align!(tbl, ps...)
    return tbl
end

"""
$TYPEDSIGNATURES

Set the same horizontal alignment for a group of columns given as a vector.

Each argument is a `cols => halign` pair, where `cols` is a vector of column names
(as `Symbol`s or `AbstractString`s) and `halign` is one of `:left`, `:center`, or `:right`.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: one or more `cols => halign` pairs.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, [:msrp_eur, :hp, :trq_nm] => :right)
render(tbl)
```
"""
function cols_align!(tbl::StyledTable, args::Pair{<:AbstractVector,Symbol}...)
    expanded = Pair{Symbol,Symbol}[Symbol(col) => halign for (cols, halign) in args for col in cols]
    cols_align!(tbl, expanded...)
    return tbl
end

# Zero-argument disambiguator required to resolve the Aqua ambiguity between
# Pair{Symbol,Symbol}... and Pair{<:AbstractVector,Symbol}... when called with no pairs.
cols_align!(tbl::StyledTable) = tbl

"""
$TYPEDSIGNATURES

Set the same horizontal alignment for all columns.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `halign`: one of `:left`, `:center`, or `:right`.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, :center)
render(tbl)
```
"""
function cols_align!(tbl::StyledTable, halign::Symbol)
    halign in (:left, :center, :right) ||
        throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    for col in Symbol.(names(tbl.data))
        tbl.col_alignments[col] = halign
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Set alignment for all columns whose element type satisfies a predicate.

`f(T::Type) -> Bool` is called with the element type of each column. Columns for which
`f` returns `true` are assigned `halign`; others are left unchanged.

# Arguments

- `f`: predicate on element type — e.g. `T -> T <: Real`.
- `tbl`: the [`StyledTable`](@ref) to modify.
- `halign`: one of `:left`, `:center`, or `:right`.

# Returns

`tbl` (modified in place).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, :right) do T
    T <: Real
end
render(tbl)
```
"""
function cols_align!(f, tbl::StyledTable, halign::Symbol)
    halign in (:left, :center, :right) ||
        throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    for col in Symbol.(names(tbl.data))
        T = eltype(tbl.data[!, col])
        f(T) && (tbl.col_alignments[col] = halign)
    end
    return tbl
end

function cols_align!(tbl::StyledTable, d::AbstractDict)
    ktypes = unique(typeof(k) for k in keys(d))
    vtypes = unique(typeof(v) for v in values(d))
    _throw_mixed_pair_values(cols_align!, ktypes, vtypes, tbl, d)
end

function cols_align!(tbl::StyledTable, d::AbstractVector)
    if !isempty(d) && all(x -> x isa Pair, d)
        ktypes = unique(typeof(k) for (k, _) in d)
        vtypes = unique(typeof(v) for (_, v) in d)
        _throw_mixed_pair_values(cols_align!, ktypes, vtypes, tbl, d)
    end
    throw(MethodError(cols_align!, (tbl, d)))
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
- `args`: one or more `label => column(s)` pairs.
- `level`: the spanner row (default `1`).

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
function tab_spanner!(tbl::StyledTable, args::Pair...; level = 1)
    tab_spanner!(tbl, collect(args); level)
    return tbl
end

function _push_spanners!(tbl::StyledTable, d; level = 1)
    colnames = Symbol.(names(tbl.data))

    for (label, columns) in d
        for col in columns
            if col ∉ colnames
                throw(ArgumentError("Column :$col not found in DataFrame"))
            end
        end
        push!(tbl.spanners, Spanner(label, columns, level))
    end

    return tbl
end

function tab_spanner!(
    tbl::StyledTable,
    d::AbstractVector{Pair{String,Vector{Symbol}}};
    level = 1,
)
    _push_spanners!(tbl, d; level)
end


function tab_spanner!(
    tbl::StyledTable,
    d::AbstractVector{Pair{Multiline,Vector{Symbol}}};
    level = 1,
)
    _push_spanners!(tbl, d; level)
end

"""
$TYPEDSIGNATURES

Add spanning headers from a dict or vector of pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or `AbstractVector` pairing spanner labels to column names.
- `level`: the spanner row applied to every entry in `d` (default `1`).

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
function tab_spanner!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{<:Pair{<:AbstractString,<:AbstractVector{<:AbstractString}}},
        AbstractVector{<:Pair{Symbol,Vector{Symbol}}},
        AbstractVector{<:Pair{Symbol,<:AbstractVector{<:AbstractString}}},
        AbstractVector{<:Pair{<:AbstractString,Vector{Symbol}}},
        AbstractDict{Symbol,Vector{Symbol}},
        AbstractDict{<:AbstractString,<:AbstractVector{<:AbstractString}},
        AbstractDict{Symbol,<:AbstractVector{<:AbstractString}},
        AbstractDict{<:AbstractString,Vector{Symbol}},
        AbstractVector{<:Pair{<:AbstractString,<:AbstractString}},
        AbstractVector{<:Pair{Symbol,<:AbstractString}},
        AbstractVector{<:Pair{<:AbstractString,Symbol}},
        AbstractVector{<:Pair{Symbol,Symbol}},
        AbstractDict{<:AbstractString,<:AbstractString},
        AbstractDict{Symbol,<:AbstractString},
        AbstractDict{<:AbstractString,Symbol},
        AbstractDict{Symbol,Symbol},
        AbstractVector{<:Pair{Multiline,Symbol}},
        AbstractVector{<:Pair{Multiline,<:AbstractString}},
        AbstractDict{Multiline,Symbol},
        AbstractDict{Multiline,<:AbstractString},
    };
    level = 1,
)
    ps = [_sanitize_lab(label) => _sanitize_cols(col_or_cols) for (label, col_or_cols) in d]
    tab_spanner!(tbl, ps; level)
    return tbl
end

function _sanitize_cols(col_or_cols)
    return Symbol.(col_or_cols isa AbstractVector ? col_or_cols : [col_or_cols])
end
_sanitize_lab(label) = label isa Multiline ? label : String(label)

function tab_spanner!(tbl::StyledTable, d::AbstractDict; level = 1)
    ktypes = unique(typeof(k) for k in keys(d))
    vtypes = unique(typeof(v) for v in values(d))
    _throw_mixed_pair_values(tab_spanner!, ktypes, vtypes, tbl, d; check_keys = false)
end

function tab_spanner!(tbl::StyledTable, d::AbstractVector{<:Pair}; level = 1)
    ktypes = unique(typeof(k) for (k, _) in d)
    vtypes = unique(typeof(v) for (_, v) in d)
    _throw_mixed_pair_values(tab_spanner!, ktypes, vtypes, tbl, d; check_keys = false)
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
    if col ∉ Symbol.(names(tbl.data))
        throw(ArgumentError("Column :$col not found in DataFrame"))
    end

    tbl.stub_col = col
    return tbl
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

Add footnotes to the table.

Footnotes refer to specific columns. For placing general notes under the table, see [`tab_source_note!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: one or more `text => column(s)` pairs.

# Returns

`tbl` (modified in place).

See also: [`tab_source_note!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_footnote!(tbl, "PPP adjusted" => :gdp)
render(tbl)
```
"""
function tab_footnote!(tbl::StyledTable, args::Pair...)
    tab_footnote!(tbl, collect(args))
    return tbl
end

function tab_footnote!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{<:Pair{<:AbstractString,<:AbstractString}},
        AbstractVector{<:Pair{<:AbstractString,Symbol}},
        AbstractDict{<:AbstractString,<:AbstractString},
        AbstractDict{<:AbstractString,Symbol},
    },
)
    ps = [String(text) => [col isa Symbol ? col : Symbol(col)] for (text, col) in d]
    _push_footnotes!(tbl, ps)
    return tbl
end

function _push_footnotes!(tbl::StyledTable, d)
    colnames = Symbol.(names(tbl.data))

    for (text, columns) in d
        for col in columns
            col ∉ colnames && throw(ArgumentError("Column :$col not found in DataFrame"))
        end
    end

    for (text, columns) in d
        for col in columns
            if haskey(tbl.col_footnotes, col)
                @warn "Column :$col already has a footnote " *
                      "(\"$(tbl.col_footnotes[col])\"); it will be replaced."
            end
            tbl.col_footnotes[col] = text
        end
    end

    return tbl
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector{Pair{String,Vector{Symbol}}})
    _push_footnotes!(tbl, d)
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector{Pair{Multiline,Vector{Symbol}}})
    _push_footnotes!(tbl, d)
end

function tab_footnote!(tbl::StyledTable, d::AbstractDict)
    ktypes = unique(typeof(k) for k in keys(d))
    vtypes = unique(typeof(v) for v in values(d))
    _throw_mixed_pair_values(tab_footnote!, ktypes, vtypes, tbl, d)
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector)
    if !isempty(d) && all(x -> x isa Pair, d)
        ktypes = unique(typeof(k) for (k, _) in d)
        vtypes = unique(typeof(v) for (_, v) in d)
        _throw_mixed_pair_values(tab_footnote!, ktypes, vtypes, tbl, d)
    end
    throw(MethodError(tab_footnote!, (tbl, d)))
end

"""
$TYPEDSIGNATURES

Add footnotes from a dict or vector of pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or `AbstractVector` of `Pair`s mapping text to column names.

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_footnote!(tbl, Dict(
    "measured each month" => [:efficacy, :safety],
    "in years" => [:age])
)
render(tbl)
```
"""
function tab_footnote!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{
            <:Pair{<:AbstractString,<:Union{Vector{<:AbstractString},Vector{Symbol}}},
        },
        AbstractDict{<:AbstractString,<:Union{Vector{<:AbstractString},Vector{Symbol}}},
    },
)
    ps = [String(text) => Symbol.(columns) for (text, columns) in d]
    tab_footnote!(tbl, ps)
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
    if col ∉ Symbol.(names(tbl.data))
        throw(ArgumentError("Column :$col not found in DataFrame"))
    end

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
    if tbl.stub_col === nothing
        @warn "No stub column is set; this label has no effect. " *
              "Call tab_stub!(tbl, col) first to designate the stub column."
    end
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
        tbl.col_styles[col] =
            ColStyleOverride(_resolve_color(color), bold, italic, underline)
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
    tab_style!(tbl, collect(columns); color, bold, italic, underline)
    return tbl
end

"""
$TYPEDSIGNATURES

Apply conditional inline styling to body cells in the listed columns.

`f(x) -> Union{Nothing, NamedTuple}` receives each cell's raw DataFrame value
(before any formatter) and returns either `nothing` (no conditional style) or a `NamedTuple`
with any of `color`, `bold`, `italic`, `underline`.

Optional kwargs set a per-column baseline. The function result overrides any
baseline property whose key is present in the returned `NamedTuple`.

Setting a key to `nothing` explicitly clears the static baseline for that property.

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
            tbl.col_styles[col] =
                ColStyleOverride(_resolve_color(color), bold, italic, underline)
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
    tab_style!(f, tbl, collect(columns); color, bold, italic, underline)
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
tab_options!(tbl, round_digits=2, round_mode=:digits)
render(tbl)
```
"""
function tab_options!(
    tbl::StyledTable;
    round_digits::Union{Nothing,Int} = nothing,
    round_mode::Union{Nothing,Symbol} = nothing,
    trailing_zeros::Union{Nothing,Bool} = nothing,
)
    if round_mode !== nothing && round_mode ∉ (:auto, :digits, :sigdigits)
        throw(
            ArgumentError(
                "`round_mode` must be `:auto`, `:digits`, or `:sigdigits`, " *
                "got `:$(round_mode)`",
            ),
        )
    end

    if round_digits !== nothing
        tbl.round_digits = round_digits
    end

    if round_mode !== nothing
        tbl.round_mode = round_mode
    end

    if trailing_zeros !== nothing
        tbl.trailing_zeros = trailing_zeros
    end

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
