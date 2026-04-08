function _convert_cols(col_or_cols)
    return Symbol.(col_or_cols isa AbstractVector ? col_or_cols : [col_or_cols])
end

_convert_lab(label) = label isa Multiline ? label : String(label)
