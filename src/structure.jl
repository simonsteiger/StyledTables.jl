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
tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes" => [:efficacy, :safety])
render(tbl)

tbl = StyledTable(df)
tab_spanner!(tbl, "Length (mm)" => [:bill_len, :bill_depth, :flipper_len])
tab_spanner!(tbl, "Physical measurements" => [:bill_len, :bill_depth, :flipper_len, :body_mass]; level = 2)
render(tbl)

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
    for (_, columns) in d
        for col in columns
            if col ∉ colnames
                throw(ArgumentError("Column :$col not found in DataFrame"))
            end
        end
    end

    for (label, columns) in d
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
    ps = [_convert_lab(label) => _convert_cols(col_or_cols) for (label, col_or_cols) in d]
    tab_spanner!(tbl, ps; level)
    return tbl
end

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
