using Printf

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
    NumberFormatter(cols; digits = 2, trailing_zeros = true)

Format numeric values in `cols` to a fixed number of decimal places.

- `cols`: a `Symbol`/`AbstractString`, or a `Vector`/varargs of either, naming
  the target column(s).
- `digits`: number of decimal places.
- `trailing_zeros`: when `false`, strip trailing zeros after the decimal point.
"""
struct NumberFormatter <: AbstractNumericFormatter
    syms::Vector{Symbol}
    digits::Int
    trailing_zeros::Bool
end
function NumberFormatter(cols::AbstractVector; digits::Int = 2, trailing_zeros::Bool = true)
    return NumberFormatter(_convert_cols(cols), digits, trailing_zeros)
end
function NumberFormatter(
        cols::Union{Symbol, AbstractString}...;
        digits::Int = 2,
        trailing_zeros::Bool = true,
    )
    return NumberFormatter(collect(cols); digits, trailing_zeros)
end

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
    PercentFormatter(cols; digits = 1, scale = 100, suffix = "%")

Multiply values in `cols` by `scale`, format to `digits` decimal places, and
append `suffix`.

- `cols`: a `Symbol`/`AbstractString`, or a `Vector`/varargs of either, naming
  the target column(s).
"""
struct PercentFormatter <: AbstractNumericFormatter
    syms::Vector{Symbol}
    digits::Int
    scale::Float64
    suffix::String
end
function PercentFormatter(
        cols::AbstractVector;
        digits::Int = 1,
        scale::Real = 100,
        suffix::String = "%",
    )
    return PercentFormatter(_convert_cols(cols), digits, Float64(scale), suffix)
end
function PercentFormatter(
        cols::Union{Symbol, AbstractString}...;
        digits::Int = 1,
        scale::Real = 100,
        suffix::String = "%",
    )
    return PercentFormatter(collect(cols); digits, scale, suffix)
end

function (f::PercentFormatter)(x)
    ismissing(x) && return x
    fmt_str = Printf.Format("%.$(f.digits)f")
    return Printf.format(fmt_str, Float64(x) * f.scale) * f.suffix
end

"""
    IntegerFormatter(cols)

Round numeric values in `cols` to the nearest integer and format without a
decimal point.

- `cols`: a `Symbol`/`AbstractString`, or a `Vector`/varargs of either, naming
  the target column(s).
"""
struct IntegerFormatter <: AbstractNumericFormatter
    syms::Vector{Symbol}
end
IntegerFormatter(cols::AbstractVector) = IntegerFormatter(_convert_cols(cols))
IntegerFormatter(cols::Union{Symbol, AbstractString}...) = IntegerFormatter(collect(cols))

(f::IntegerFormatter)(x) = ismissing(x) ? x : isfinite(x) ? string(round(Int, x)) : string(x)

"""
    MissingFormatter(cols, replacement)

Return `replacement` when a value in `cols` `ismissing`; otherwise pass it
through unchanged. Stack this last so earlier numeric formatters run first.

- `cols`: a `Symbol`/`AbstractString`, or a `Vector` of either, naming the
  target column(s).
"""
struct MissingFormatter <: AbstractFormatter
    syms::Vector{Symbol}
    replacement::Any
end
MissingFormatter(cols::AbstractVector, replacement) =
    MissingFormatter(_convert_cols(cols), replacement)
MissingFormatter(col::Union{Symbol, AbstractString}, replacement) =
    MissingFormatter([col], replacement)

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
    return
end

function _validate_format_cols(tbl::StyledTable, cols::AbstractVector{Symbol})
    colnames = Symbol.(names(tbl.data))
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    return
end

function _push_formatter!(tbl::StyledTable, f::AbstractFormatter, cols::AbstractVector{Symbol})
    for col in cols
        vec = get!(tbl.col_formatters, col, AbstractFormatter[])
        push!(vec, f)
    end
    return tbl
end

function _format_one!(tbl::StyledTable, f::AbstractFormatter, cols::AbstractVector{Symbol})
    _validate_format_cols(tbl, cols)
    f isa AbstractNumericFormatter && _numeric_formatter_check(tbl, cols)
    _push_formatter!(tbl, f, cols)
    return tbl
end

# ── format! ──────────────────────────────────────────────────────────────────

"""
    format!(tbl, formatters...)
    format!(f, tbl, cols...)
    format!(f, tbl, cols::AbstractVector)

Append one or more formatters to the format stack for their target columns.

The first form takes any number of [`AbstractFormatter`](@ref) instances;
each carries its own target column(s) via its `syms` field. Formatters
targeting different columns can be mixed in a single call.

Tip: stack [`MissingFormatter`](@ref) last to
intercept any `missing` values that remain after earlier formatters.

# Examples

```julia
tbl = StyledTable(df)
format!(tbl, NumberFormatter(:x; digits = 3), MissingFormatter(:x, "—"))
render(tbl)
```

```julia
tbl = StyledTable(df)
format!(tbl, :x) do val
    val < 0 ? "neg" : "pos"
end
render(tbl)
```
"""
function format!(tbl::StyledTable, f_or_fs::AbstractFormatter...)
    for f in f_or_fs
        _format_one!(tbl, f, f.syms)
    end
    return tbl
end

# Bare callables → FunctionFormatter (do-block form). Typed on `Function`
# (not untyped `f`) so that `AbstractFormatter` structs — which are callable
# but not `isa Function` — never match here. That is what makes the old
# formatter-first call form (`format!(fmt, tbl, cols...)`) safe to drop
# without a migration guard: it now simply fails to dispatch (`MethodError`)
# instead of silently being treated as a bare callable.
function format!(f::Function, tbl::StyledTable, cols...)
    return _format_one!(tbl, FunctionFormatter(f), _convert_cols(collect(cols)))
end

function format!(f::Function, tbl::StyledTable, cols::AbstractVector)
    return _format_one!(tbl, FunctionFormatter(f), _convert_cols(cols))
end
