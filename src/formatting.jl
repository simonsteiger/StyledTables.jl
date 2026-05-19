using Printf

"""
    AbstractFormatter

Supertype for all formatters used with [`format!`](@ref).

Implement `(f::MyFormatter)(x)` to define a custom formatter:

```julia
struct PrefixFormatter <: AbstractFormatter
    prefix::String
end
(f::PrefixFormatter)(x) = ismissing(x) ? x : f.prefix * string(x)
```
"""
abstract type AbstractFormatter end

"""
    FunctionFormatter(f)

Wraps a bare callable `f` as an [`AbstractFormatter`](@ref). Created automatically
when a `Function` is passed to [`format!`](@ref).
"""
struct FunctionFormatter <: AbstractFormatter
    f::Any
end
(ff::FunctionFormatter)(x) = ff.f(x)

"""
    NumberFormatter(; digits = 2, trailing_zeros = true)

Format numeric values to a fixed number of decimal places.

- `digits`: number of decimal places.
- `trailing_zeros`: when `false`, strip trailing zeros after the decimal point.
"""
struct NumberFormatter <: AbstractFormatter
    digits::Int
    trailing_zeros::Bool
end
NumberFormatter(; digits::Int = 2, trailing_zeros::Bool = true) =
    NumberFormatter(digits, trailing_zeros)

function (f::NumberFormatter)(x)
    ismissing(x) && return x
    fmt_str = Printf.Format("%.$(f.digits)f")
    s = Printf.format(fmt_str, Float64(x))
    f.trailing_zeros && return s
    s = rstrip(s, '0')
    s = rstrip(s, '.')
    return String(s)
end

"""
    PercentFormatter(; digits = 1, scale = 100, suffix = "%")

Multiply a value by `scale`, format to `digits` decimal places, and append `suffix`.
"""
struct PercentFormatter <: AbstractFormatter
    digits::Int
    scale::Float64
    suffix::String
end
PercentFormatter(; digits::Int = 1, scale::Real = 100, suffix::String = "%") =
    PercentFormatter(digits, Float64(scale), suffix)

function (f::PercentFormatter)(x)
    ismissing(x) && return x
    fmt_str = Printf.Format("%.$(f.digits)f")
    return Printf.format(fmt_str, Float64(x) * f.scale) * f.suffix
end

"""
    IntegerFormatter()

Round numeric values to the nearest integer and format without a decimal point.
"""
struct IntegerFormatter <: AbstractFormatter end

(::IntegerFormatter)(x) = ismissing(x) ? x : isfinite(x) ? string(round(Int, x)) : string(x)

"""
    MissingFormatter(replacement)

Return `replacement` when a value `ismissing`; otherwise pass it through unchanged.
Stack this last so earlier numeric formatters run first.
"""
struct MissingFormatter <: AbstractFormatter
    replacement::Any
end

(f::MissingFormatter)(x) = ismissing(x) ? f.replacement : x

# ── Internal helpers ─────────────────────────────────────────────────────────

function _numeric_formatter_check(tbl::StyledTable, cols::AbstractVector{Symbol})
    for col in cols
        T = nonmissingtype(eltype(tbl.data[!, col]))
        T <: Real || throw(
            ArgumentError(
                ":$col has element type $T, which is not numeric (requires <: Real). " *
                "Use `format!` with a custom formatter for non-numeric columns.",
            ),
        )
    end
end

function _validate_format_cols(tbl::StyledTable, cols::AbstractVector{Symbol})
    colnames = Symbol.(names(tbl.data))
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
end

function _push_formatter!(tbl::StyledTable, f::AbstractFormatter, cols::AbstractVector{Symbol})
    for col in cols
        vec = get!(tbl.col_formatters, col, AbstractFormatter[])
        push!(vec, f)
    end
    return tbl
end

# ── format! ──────────────────────────────────────────────────────────────────

"""
    format!(formatter, tbl, cols...)
    format!(formatter, tbl, cols::AbstractVector)

Append `formatter` to the format stack for each column in `cols`.

`formatter` may be any [`AbstractFormatter`](@ref) or a bare callable (automatically
wrapped in [`FunctionFormatter`](@ref)).

Formatters are applied in call order at render time: the first `format!` call runs
first on the raw value. Stack [`MissingFormatter`](@ref) last to intercept any
`missing` values that remain after earlier formatters.

# Examples

```julia
tbl = StyledTable(df)
format!(NumberFormatter(digits = 3), tbl, :x, :y)
format!(MissingFormatter("—"), tbl, :x, :y)
render(tbl)
```
"""
function format!(f::AbstractFormatter, tbl::StyledTable, cols::Symbol...)
    syms = collect(cols)
    _validate_format_cols(tbl, syms)
    if f isa NumberFormatter || f isa PercentFormatter || f isa IntegerFormatter
        _numeric_formatter_check(tbl, syms)
    end
    _push_formatter!(tbl, f, syms)
    return tbl
end

function format!(f::AbstractFormatter, tbl::StyledTable, cols::AbstractVector{Symbol})
    _validate_format_cols(tbl, cols)
    if f isa NumberFormatter || f isa PercentFormatter || f isa IntegerFormatter
        _numeric_formatter_check(tbl, cols)
    end
    _push_formatter!(tbl, f, cols)
    return tbl
end

function format!(f::AbstractFormatter, tbl::StyledTable, cols::AbstractVector{<:AbstractString})
    format!(f, tbl, Symbol.(cols))
    return tbl
end

# Bare callables → FunctionFormatter
function format!(f, tbl::StyledTable, cols...)
    format!(FunctionFormatter(f), tbl, cols...)
end

function format!(f, tbl::StyledTable, cols::AbstractVector)
    format!(FunctionFormatter(f), tbl, cols)
end
