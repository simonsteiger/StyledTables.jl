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
    for (col, _) in d
        if col ∉ colnames
            throw(ArgumentError("Column :$col not found in DataFrame"))
        end
    end

    for (col, label) in d
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
tbl = StyledTable(df)
cols_label!(uppercase, tbl)
render(tbl)
```
"""
function cols_label!(f::Function, tbl::StyledTable, columns::AbstractVector{Symbol})
    colnames = Symbol.(names(tbl.data))

    for col in columns
        if col ∉ colnames
            throw(ArgumentError("Column :$col not found in DataFrame"))
        end
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
function cols_align!(tbl::StyledTable, args::Pair...)
    cols_align!(tbl, collect(args))
    return tbl
end

function _set_cols_align!(tbl, d)
    colnames = Symbol.(names(tbl.data))
    for (cols, halign) in d
        _validate_halign(halign)
        for col in cols
            if col ∉ colnames
                throw(ArgumentError("Column :$col not found in DataFrame"))
            end
        end
    end
    for (cols, halign) in d
        for col in cols
            tbl.col_alignments[col] = halign
        end
    end
    return tbl
end

function cols_align!(tbl::StyledTable, d::AbstractVector{Pair{Vector{Symbol},Symbol}})
    _set_cols_align!(tbl, d)
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
        AbstractVector{<:Pair{Vector{Symbol},Symbol}},
        AbstractVector{<:Pair{<:AbstractVector{<:AbstractString},Symbol}},
    },
)
    ps = [_convert_cols(col_or_cols) => halign for (col_or_cols, halign) in d]
    cols_align!(tbl, ps...)
    return tbl
end

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
    _validate_halign(halign)
    for col in Symbol.(names(tbl.data))
        tbl.col_alignments[col] = halign
    end
    return tbl
end

function _validate_halign(halign)
    if halign ∉ (:left, :center, :right)
        throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    end
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

Remove columns from the rendered output without modifying the `DataFrame`.

Hidden columns remain accessible for grouping or formatting, but do not appear in the rendered table. Commonly paired with [`tab_rowgroup!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: one or more column names to hide.

# Returns

`tbl` (modified in place).

See also: [`tab_rowgroup!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_rowgroup!(tbl, :group)
cols_hide!(tbl, :group)
render(tbl)
```
"""
function cols_hide!(tbl::StyledTable, cols::Symbol...)
    colnames = Symbol.(names(tbl.data))
    for col in cols
        if col ∉ colnames
            throw(ArgumentError("Column :$col not found in DataFrame"))
        end
    end

    for col in cols
        push!(tbl.hidden_cols, col)
    end

    return tbl
end
