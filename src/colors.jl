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
