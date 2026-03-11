"""
$TYPEDEF

A column-spanning header label above a group of columns.

$TYPEDFIELDS
"""
struct Spanner
    "Display label for the span."
    label::Any
    "Column names covered by this spanner."
    columns::Vector{Symbol}
end

"""
$TYPEDEF

Title and optional subtitle displayed above the column headers.

$TYPEDFIELDS
"""
struct TableHeader
    "Main title text (rendered bold)."
    title::Any
    "Subtitle text (rendered italic), or `nothing`."
    subtitle::Union{Nothing,Any}
end

"""
$TYPEDEF

Inline style overrides applied to all body cells in a column.

$TYPEDFIELDS
"""
struct ColStyleOverride
    "Hex color string (`\"#RRGGBB\"`), or `nothing` to inherit."
    color::Union{Nothing,String}
    "Bold override, or `nothing` to inherit."
    bold::Union{Nothing,Bool}
    "Italic override, or `nothing` to inherit."
    italic::Union{Nothing,Bool}
    "Underline override, or `nothing` to inherit."
    underline::Union{Nothing,Bool}
end

"""
$TYPEDEF

A GT-style table builder backed by a `DataFrame`.

Construct with [`StyledTable`](@ref) and chain modifier functions before
calling [`render`](@ref):

```julia
df |> StyledTable |> cols_label(x = "X") |> tab_header("Title") |> render
```

$TYPEDFIELDS
"""
mutable struct StyledTable
    "Source data."
    data::DataFrame
    "Display labels keyed by column name."
    col_labels::Dict{Symbol,Any}
    "Horizontal alignment (`:left`, `:center`, `:right`) keyed by column name."
    col_alignments::Dict{Symbol,Symbol}
    "Spanner header definitions."
    spanners::Vector{Spanner}
    "Column used for row grouping, or `nothing`."
    row_group_col::Union{Nothing,Symbol}
    "Left indent applied to data rows inside a group (points)."
    row_group_indent_pt::Float64
    "Column designated as the stub (row-label column), or `nothing`."
    stub_col::Union{Nothing,Symbol}
    "Title/subtitle definition, or `nothing`."
    header::Union{Nothing,TableHeader}
    "Table-level footnote texts."
    footnotes::Vector{Any}
    "Per-column formatter functions."
    col_formatters::Dict{Symbol,Function}
    "Per-column inline style overrides."
    col_styles::Dict{Symbol,ColStyleOverride}
    "Per-column footnote annotations."
    col_footnotes::Dict{Symbol,Any}
    "Explicit column display order, or `nothing` (use DataFrame order)."
    col_order::Union{Nothing,Vector{Symbol}}
    "Columns excluded from the rendered output."
    hidden_cols::Set{Symbol}
    "Label for the stub column header, or `nothing`."
    stubhead_label::Union{Nothing,Any}
    "Source-note lines appended after the table body."
    source_notes::Vector{Any}
    "SummaryTables postprocessors applied during rendering."
    postprocessors::Vector{Any}
    "Global rounding digit count, or `nothing` (use SummaryTables default of 3)."
    round_digits::Union{Nothing,Int}
    "Global rounding mode (`:auto`, `:digits`, `:sigdigits`), or `nothing`."
    round_mode::Union{Nothing,Symbol}
    "Whether to keep trailing zeros when rounding, or `nothing`."
    trailing_zeros::Union{Nothing,Bool}
end
