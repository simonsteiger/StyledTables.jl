"""
$TYPEDEF

A label spanning a group of columns in the header row.

$TYPEDFIELDS
"""
struct Spanner
    "Display label."
    label::Any
    "Columns this label spans."
    columns::Vector{Symbol}
    "Spanner row level; `1` = bottom-most row (closest to column labels), `2` = above that, etc."
    level::Int
end

"""
$TYPEDEF

A table title and optional subtitle, displayed above the column headers.

$TYPEDFIELDS
"""
struct TableHeader
    "Title text, rendered bold."
    title::Any
    "Subtitle text, rendered italic, or `nothing`."
    subtitle::Union{Nothing,Any}
end

"""
$TYPEDEF

Inline style overrides for all body cells in a column.

$TYPEDFIELDS
"""
struct ColStyleOverride
    "Hex color string (`\"#RRGGBB\"`), or `nothing` to inherit."
    color::Union{Nothing,String}
    "`true` for bold; `nothing` inherits the default."
    bold::Union{Nothing,Bool}
    "`true` for italic; `nothing` inherits the default."
    italic::Union{Nothing,Bool}
    "`true` for underline; `nothing` inherits the default."
    underline::Union{Nothing,Bool}
end

"""
$TYPEDEF

Contains table build specifications for the `DataFrame` to be rendered.

Construct with [`StyledTable`](@ref), apply modifier functions, then call [`render`](@ref):

```julia
tbl = StyledTable(df)
cols_label!(tbl, :x => "X")
tab_header!(tbl, "Title")
render(tbl)
```

$TYPEDFIELDS
"""
@kwdef mutable struct StyledTable
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
    "Per-column conditional style functions `f(raw_value) -> Union{Nothing, NamedTuple}`."
    col_style_fns::Dict{Symbol,Function}
    "Per-column footnote annotations."
    col_footnotes::Dict{Symbol,Any}
    "Explicit column display order, or `nothing` (use DataFrame order)."
    col_order::Union{Nothing,Vector{Symbol}}
    "Columns excluded from the rendered output."
    hidden_cols::Set{Symbol}
    "Label for the stub column header, or `nothing`."
    stubhead_label::Union{Nothing,Any}
    "Source-note lines appended below the table body."
    source_notes::Vector{Any}
    "SummaryTables postprocessors applied during rendering."
    postprocessors::Vector{Any}
    "Digits to round to, or `nothing` (SummaryTables defaults to 3)."
    round_digits::Union{Nothing,Int}
    "Global rounding mode (`:auto`, `:digits`, `:sigdigits`), or `nothing`."
    round_mode::Union{Nothing,Symbol}
    "`true` to pad with trailing zeros when rounding; `nothing` defers to SummaryTables."
    trailing_zeros::Union{Nothing,Bool}

end

"""
$TYPEDSIGNATURES

Wrap a `DataFrame` (or any Tables.jl-compatible table) in a [`StyledTable`](@ref).

Returns a `StyledTable` with default settings. Apply modifier functions and
call [`render`](@ref) to produce a `SummaryTables.Table`.

# Arguments

- `data`: a `DataFrame` or any Tables.jl-compatible table.

# Returns

A [`StyledTable`](@ref).

See also: [`render`](@ref), [`cols_label!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_header!(tbl, "My Table")
render(tbl)
```
"""
function StyledTable(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(;
        data              = df,
        col_labels        = Dict{Symbol,Any}(),
        col_alignments    = Dict{Symbol,Symbol}(),
        spanners          = Spanner[],
        row_group_col     = nothing,
        row_group_indent_pt = 12.0,
        stub_col          = nothing,
        header            = nothing,
        footnotes         = Any[],
        col_formatters    = Dict{Symbol,Function}(),
        col_styles        = Dict{Symbol,ColStyleOverride}(),
        col_style_fns     = Dict{Symbol,Function}(),
        col_footnotes     = Dict{Symbol,Any}(),
        col_order         = nothing,
        hidden_cols       = Set{Symbol}(),
        stubhead_label    = nothing,
        source_notes      = Any[],
        postprocessors    = Any[],
        round_digits      = nothing,
        round_mode        = nothing,
        trailing_zeros    = nothing,
    )
end
