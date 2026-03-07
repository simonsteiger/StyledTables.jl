module SummaryTablesExtras

using DataFrames
using SummaryTables

include("types.jl")
include("modifiers.jl")
include("render.jl")

export GTTable
export gt, render
export cols_label, cols_align
export tab_spanner, tab_row_group, tab_stub, tab_header, tab_footnote

end
