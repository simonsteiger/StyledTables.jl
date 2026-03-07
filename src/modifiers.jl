function gt(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return GTTable(
        df,
        Dict{Symbol,Any}(),
        Dict{Symbol,Symbol}(),
        Spanner[],
        nothing,
        nothing,
        nothing,
        Any[],
    )
end
