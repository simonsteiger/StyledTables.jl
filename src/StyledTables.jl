module StyledTables

using DataFrames
using SummaryTables

include("types.jl")
include("modifiers.jl")
include("render.jl")

export StyledTable
export styled_table, render
export cols_label, cols_align, cols_hide, cols_move
export tab_spanner, tab_row_group, tab_stub, tab_stubhead, tab_header, tab_footnote, tab_source_note
export tab_style
export sub_missing, tab_options

end
