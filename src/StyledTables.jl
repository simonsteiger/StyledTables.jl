module StyledTables

using DataFrames
using SummaryTables

include("types.jl")
include("modifiers.jl")
include("render.jl")

export StyledTable
export styled_table, render
export cols_label, cols_align
export tab_spanner, tab_row_group, tab_stub, tab_header, tab_footnote

end
