struct Spanner
    label::Any
    columns::Vector{Symbol}
end

struct TableHeader
    title::Any
    subtitle::Union{Nothing,Any}
end

mutable struct GTTable
    data::DataFrame
    col_labels::Dict{Symbol,Any}
    col_alignments::Dict{Symbol,Symbol}
    spanners::Vector{Spanner}
    row_group_col::Union{Nothing,Symbol}
    stub_col::Union{Nothing,Symbol}
    header::Union{Nothing,TableHeader}
    footnotes::Vector{Any}
end
