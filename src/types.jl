struct Spanner
    label::Any
    columns::Vector{Symbol}
end

struct TableHeader
    title::Any
    subtitle::Union{Nothing,Any}
end

struct ColStyleOverride
    color::Union{Nothing,String}
    bold::Union{Nothing,Bool}
    italic::Union{Nothing,Bool}
    underline::Union{Nothing,Bool}
end

mutable struct StyledTable
    data::DataFrame
    col_labels::Dict{Symbol,Any}
    col_alignments::Dict{Symbol,Symbol}
    spanners::Vector{Spanner}
    row_group_col::Union{Nothing,Symbol}
    row_group_indent_pt::Float64
    stub_col::Union{Nothing,Symbol}
    header::Union{Nothing,TableHeader}
    footnotes::Vector{Any}
    col_formatters::Dict{Symbol,Function}
    col_styles::Dict{Symbol,ColStyleOverride}
    col_footnotes::Dict{Symbol,Any}
    col_order::Union{Nothing,Vector{Symbol}}
    hidden_cols::Set{Symbol}
    stubhead_label::Union{Nothing,Any}
    source_notes::Vector{Any}
    postprocessors::Vector{Any}
    round_digits::Union{Nothing,Int}
    round_mode::Union{Nothing,Symbol}
    trailing_zeros::Union{Nothing,Bool}
end
