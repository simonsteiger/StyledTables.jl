"""
$TYPEDSIGNATURES

Add one or more spanning header labels above groups of columns.

Each spanner is given as a `columns => label` pair, where `columns` is a `Vector{Symbol}`
of column names to span and `label` is the spanner text (a `String`,
`SummaryTables.Multiline`, or any value accepted by `SummaryTables.Cell`).

Use the `level` keyword to stack spanners in multiple rows: `level = 1` (the default) is
the bottom-most row, closest to the column labels; `level = 2` sits above it, and so on.
A higher-level spanner's column set must fully contain every lower-level spanner it overlaps.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: one or more `column(s) => label` pairs.
- `level`: the spanner row (default `1`).

# Returns

`tbl` (modified in place).

See also: [`header!`](@ref), [`stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
spanner!(tbl, [:efficacy, :safety] => "Outcomes")
render(tbl)

tbl = StyledTable(df)
spanner!(tbl, [:bill_len, :bill_depth, :flipper_len] => "Length (mm)")
spanner!(tbl, [:bill_len, :bill_depth, :flipper_len, :body_mass] => "Physical measurements"; level = 2)
render(tbl)

using SummaryTables: Multiline
tbl = StyledTable(df)
spanner!(tbl, [:dose, :response] => Multiline("Treatment", "(N=50)"))
render(tbl)
```
"""
function spanner!(tbl::StyledTable, args::Pair...; level = 1)
    spanner!(tbl, collect(args); level)
    return tbl
end

function _push_spanners!(tbl::StyledTable, d; level = 1)
    colnames = Symbol.(names(tbl.data))
    for (columns, _) in d
        for col in columns
            if col ∉ colnames
                throw(ArgumentError("Column :$col not found in DataFrame"))
            end
        end
    end

    for (columns, label) in d
        push!(tbl.spanners, Spanner(label, columns, level))
    end

    return tbl
end

function spanner!(
    tbl::StyledTable,
    d::AbstractVector{Pair{Vector{Symbol},String}};
    level = 1,
)
    _push_spanners!(tbl, d; level)
end


function spanner!(
    tbl::StyledTable,
    d::AbstractVector{Pair{Vector{Symbol},Multiline}};
    level = 1,
)
    _push_spanners!(tbl, d; level)
end

"""
$TYPEDSIGNATURES

Add spanning headers from a dict or vector of pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or `AbstractVector` pairing column names to spanner labels.
- `level`: the spanner row applied to every entry in `d` (default `1`).

# Returns

`tbl` (modified in place).

See also: [`spanner!`](@ref), [`header!`](@ref), [`stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
spanner!(tbl, Dict(
    [:efficacy, :safety] => "Outcomes",
    [:age, :sex]         => "Demographics")
)
render(tbl)
```
"""
function spanner!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{<:Pair{<:AbstractVector{<:AbstractString},<:AbstractString}},
        AbstractVector{<:Pair{Vector{Symbol},Symbol}},
        AbstractVector{<:Pair{<:AbstractVector{<:AbstractString},Symbol}},
        AbstractVector{<:Pair{Vector{Symbol},<:AbstractString}},
        AbstractDict{Vector{Symbol},Symbol},
        AbstractDict{<:AbstractVector{<:AbstractString},<:AbstractString},
        AbstractDict{<:AbstractVector{<:AbstractString},Symbol},
        AbstractDict{Vector{Symbol},<:AbstractString},
        AbstractVector{<:Pair{<:AbstractString,<:AbstractString}},
        AbstractVector{<:Pair{<:AbstractString,Symbol}},
        AbstractVector{<:Pair{Symbol,<:AbstractString}},
        AbstractVector{<:Pair{Symbol,Symbol}},
        AbstractDict{<:AbstractString,<:AbstractString},
        AbstractDict{<:AbstractString,Symbol},
        AbstractDict{Symbol,<:AbstractString},
        AbstractDict{Symbol,Symbol},
        AbstractVector{<:Pair{Symbol,Multiline}},
        AbstractVector{<:Pair{<:AbstractString,Multiline}},
        AbstractDict{Symbol,Multiline},
        AbstractDict{<:AbstractString,Multiline},
    };
    level = 1,
)
    ps = [_convert_cols(col_or_cols) => _convert_lab(label) for (col_or_cols, label) in d]
    spanner!(tbl, ps; level)
    return tbl
end

function spanner!(tbl::StyledTable, d::AbstractDict; level = 1)
    ktypes = unique(typeof(k) for k in keys(d))
    vtypes = unique(typeof(v) for v in values(d))
    _throw_mixed_pair_values(spanner!, ktypes, vtypes, tbl, d)
end

function spanner!(tbl::StyledTable, d::AbstractVector{<:Pair}; level = 1)
    ktypes = unique(typeof(k) for (k, _) in d)
    vtypes = unique(typeof(v) for (_, v) in d)
    _throw_mixed_pair_values(spanner!, ktypes, vtypes, tbl, d)
end

"""
$TYPEDSIGNATURES

Group rows by distinct values in a column.

A bold group-label row precedes each new group value. Data rows are indented by `indent_pt` points. Hide the grouping column afterwards with [`hide!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `col`: column whose distinct values define the groups.

# Keywords

- `indent_pt`: left indent for data rows within a group (default `12`).
- `full_width`: whether group-label rows span the entire table width (default `false`).

# Returns

`tbl` (modified in place).

See also: [`hide!`](@ref), [`stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
rowgroup!(tbl, :category)
hide!(tbl, :category)
render(tbl)
```
"""
function rowgroup!(tbl::StyledTable, col::Symbol; indent_pt::Real = 12, full_width::Bool = false)
    if col ∉ Symbol.(names(tbl.data))
        throw(ArgumentError("Column :$col not found in DataFrame"))
    end

    tbl.rowgroup_col = col
    tbl.rowgroup_indent_pt = Float64(indent_pt)
    tbl.rowgroup_full_width = full_width

    return tbl
end

"""
$TYPEDSIGNATURES

Mark a column as the stub (row-label column).

The stub header is not bolded. Use [`stubhead!`](@ref) to label it.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `col`: name of the column to use as the stub.

# Returns

`tbl` (modified in place).

See also: [`stubhead!`](@ref), [`rowgroup!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
stub!(tbl, :drug)
render(tbl)
```
"""
function stub!(tbl::StyledTable, col::Symbol)
    if col ∉ Symbol.(names(tbl.data))
        throw(ArgumentError("Column :$col not found in DataFrame"))
    end

    tbl.stub_col = col
    return tbl
end

"""
$TYPEDSIGNATURES

Set the stub column header label.

Requires a prior call to [`stub!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `label`: display text for the stub header cell.

# Returns

`tbl` (modified in place).

See also: [`stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
stub!(tbl, :drug)
stubhead!(tbl, "Drug Name")
render(tbl)
```
"""
function stubhead!(tbl::StyledTable, label)
    if tbl.stub_col === nothing
        @warn "No stub column is set; this label has no effect. " *
              "Call `stub!(tbl, col)` first to designate the stub column."
    end
    tbl.stubhead_label = label
    return tbl
end
