module StyledTables

using Colors
using DataFrames
using DocStringExtensions
using SummaryTables

include("errors.jl")
include("conversions.jl")
include("colors.jl")
include("types.jl")
include("annotations.jl")
include("formatting.jl")
include("modifiers.jl")
include("structure.jl")
include("styling.jl")
include("render.jl")
include("show.jl")
include("testdata.jl")

export StyledTable
export render
export cols_label!, cols_align!, cols_hide!
export tab_spanner!, tab_rowgroup!, tab_stub!, tab_stubhead!
export tab_header!, tab_footnote!, tab_sourcenote!
export tab_style!
export sub_missing!
export fmt!, fmt_number!, fmt_percent!, fmt_integer!

end
