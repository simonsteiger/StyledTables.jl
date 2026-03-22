module StyledTables

using DataFrames
using SummaryTables
using DocStringExtensions
using Colors

include("types.jl")
include("modifiers.jl")
include("fmt.jl")
include("render.jl")

export StyledTable
export render
export cols_label!, cols_align!, cols_hide!
export tab_spanner!, tab_row_group!, tab_stub!, tab_stubhead!
export tab_header!, tab_footnote!, tab_source_note!
export tab_style!
export sub_missing!, tab_options!
export fmt!, fmt_number!, fmt_percent!, fmt_integer!

end
