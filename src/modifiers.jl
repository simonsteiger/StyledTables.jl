# Usage: gt(df) |> cols_label(x = "X", y = "Y")
function cols_label(; kwargs...)
    return function (tbl::GTTable)
        for (col, label) in kwargs
            tbl.col_labels[col] = label
        end
        return tbl
    end
end

# Usage: gt(df) |> cols_align(:center, [:x, :y])
# or:    gt(df) |> cols_align(:right)   # applies to all columns
function cols_align(halign::Symbol, columns=nothing)
    return function (tbl::GTTable)
        cols = columns === nothing ? Symbol.(names(tbl.data)) : columns
        for col in cols
            tbl.col_alignments[col] = halign
        end
        return tbl
    end
end

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
