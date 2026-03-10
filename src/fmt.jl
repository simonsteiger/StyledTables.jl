using Printf

# Internal helper: validates cols and stores formatter function
function _apply_formatter_modifier(cols, f::Function)
    col_vec = cols isa Symbol ? Symbol[cols] : collect(Symbol, cols)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in col_vec
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        for col in col_vec
            tbl.col_formatters[col] = f
        end
        return tbl
    end
end

"""
    fmt_number(cols; digits=2, trailing_zeros=true)

Format numeric values in `cols` to a fixed number of decimal places.
`cols` can be a `Symbol` or `AbstractVector{Symbol}`.
"""
function fmt_number(cols; digits::Int = 2, trailing_zeros::Bool = true)
    fmt_str = Printf.Format("%.$(digits)f")
    f = function (x)
        ismissing(x) && return x
        s = Printf.format(fmt_str, Float64(x))
        trailing_zeros && return s
        s = rstrip(s, '0')
        s = rstrip(s, '.')
        return String(s)
    end
    return _apply_formatter_modifier(cols, f)
end

"""
    fmt_percent(cols; digits=1, scale=100, suffix="%")

Multiply values by `scale` and format as a percentage string.
"""
function fmt_percent(cols; digits::Int = 1, scale::Real = 100, suffix::String = "%")
    fmt_str = Printf.Format("%.$(digits)f")
    f = x -> ismissing(x) ? x : Printf.format(fmt_str, Float64(x) * scale) * suffix
    return _apply_formatter_modifier(cols, f)
end

"""
    fmt_integer(cols)

Format numeric values in `cols` as integers (rounds to nearest).
"""
function fmt_integer(cols)
    f = x -> ismissing(x) ? x : string(round(Int, x))
    return _apply_formatter_modifier(cols, f)
end

"""
    fmt(cols, f::Function)

Apply a custom formatter function `f(value) -> Any` to values in `cols`.
"""
function fmt(cols, f::Function)
    return _apply_formatter_modifier(cols, f)
end
