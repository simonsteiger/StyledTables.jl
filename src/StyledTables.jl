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

export StyledTable, SpannerTarget, CellTarget, Stub
export render
export relabel!, align!, hide!
export spanner!, rowgroup!, stub!, stubhead!
export header!, footnote!, sourcenote!
export style!
export format!
export AbstractFormatter, FunctionFormatter
export NumberFormatter, PercentFormatter, IntegerFormatter, MissingFormatter

end
