# 0.2.0

Changed `format!` API `format!(formatter(; settings), tbl, cols...)` to `format!(tbl, formatter(cols; settings)...)`. 
This implies that individual `AbstractFormatter`s now take the columns they should format as their (only) positional argument.
The function-based API `format!(f, tbl, cols...)` survives as an exception for this to allow for arbitrary formatting.
