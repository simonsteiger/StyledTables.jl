using Printf

# Internal helper: validates cols and stores formatter function on tbl
function _apply_formatter!(tbl::StyledTable, cols::AbstractVector{Symbol}, f::Function)
    colnames = Symbol.(names(tbl.data))
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in cols
        tbl.col_formatters[col] = f
    end
    return tbl
end

function _apply_formatter!(tbl::StyledTable, cols::AbstractVector{<:AbstractString}, f::Function)
    _apply_formatter!(tbl, Symbol.(cols), f)
    return tbl
end

function _apply_formatter!(tbl::StyledTable, cols::AbstractString, f::Function)
    _apply_formatter!(tbl, Symbol(cols), f)
    return tbl
end

function _apply_formatter!(tbl::StyledTable, cols::Symbol, f::Function)
    _apply_formatter!(tbl, [cols], f)
    return tbl
end

"""
$TYPEDSIGNATURES

Format values in `cols` to a fixed number of decimal places.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: column name(s) to format — a single `Symbol` or an `AbstractVector{Symbol}`.

# Keywords

- `digits`: number of decimal places (default `2`).
- `trailing_zeros`: keep trailing zeros (default `true`).

# Returns

`tbl` (modified in place).

See also: [`fmt_percent!`](@ref), [`fmt_integer!`](@ref), [`fmt!`](@ref), [`tab_options!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt_number!(tbl, [:x]; digits = 2)
render(tbl)
```
"""
function fmt_number!(tbl::StyledTable, cols; digits::Int = 2, trailing_zeros::Bool = true)
    fmt_str = Printf.Format("%.$(digits)f")
    f = function (x)
        ismissing(x) && return x
        s = Printf.format(fmt_str, Float64(x))
        trailing_zeros && return s
        s = rstrip(s, '0')
        s = rstrip(s, '.')
        return String(s)
    end
    return _apply_formatter!(tbl, cols, f)
end

"""
$TYPEDSIGNATURES

Format values in `cols` as percentage strings.

Multiplies each value by `scale`, formats to `digits` decimal places, and appends `suffix`.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `digits`: decimal places for the percentage (default `1`).
- `scale`: multiplier applied before formatting (default `100`).
- `suffix`: string appended after the number (default `"%"`).

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_integer!`](@ref), [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt_percent!(tbl, [:rate]; digits = 1)
render(tbl)
```
"""
function fmt_percent!(tbl::StyledTable, cols; digits::Int = 1, scale::Real = 100, suffix::String = "%")
    fmt_str = Printf.Format("%.$(digits)f")
    f = x -> ismissing(x) ? x : Printf.format(fmt_str, Float64(x) * scale) * suffix
    return _apply_formatter!(tbl, cols, f)
end

"""
$TYPEDSIGNATURES

Round values in `cols` to the nearest integer and format without a decimal point.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_percent!`](@ref), [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt_integer!(tbl, [:count])
render(tbl)
```
"""
function fmt_integer!(tbl::StyledTable, cols)
    f = x -> ismissing(x) ? x : string(round(Int, x))
    return _apply_formatter!(tbl, cols, f)
end

"""
$TYPEDSIGNATURES

Apply a custom formatter function to values in `cols`.

`f` receives the raw cell value and returns a display-ready value.
Return `x` unchanged for `missing` to let [`sub_missing!`](@ref) handle it.

# Arguments

- `f`: formatter: `f(value) -> Any`.
- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: column name(s) to format.

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_percent!`](@ref), [`fmt_integer!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt!(x -> "≈\$(round(Int, x))", tbl, [:x])
render(tbl)
```
"""
function fmt!(f, tbl::StyledTable, cols)
    _apply_formatter!(tbl, cols, f)
    return tbl
end
