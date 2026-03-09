# Usage: styled_table(df) |> cols_label(x = "X", y = "Y")
function cols_label(; kwargs...)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for (col, label) in kwargs
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            tbl.col_labels[col] = label
        end
        return tbl
    end
end

# Usage: styled_table(df) |> cols_align(:center, [:x, :y])
# or:    styled_table(df) |> cols_align(:right)   # applies to all columns
function cols_align(halign::Symbol, columns=nothing)
    halign in (:left, :center, :right) || throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        cols = columns === nothing ? colnames : columns
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            tbl.col_alignments[col] = halign
        end
        return tbl
    end
end

# Usage: styled_table(df) |> tab_spanner("Label"; columns = [:a, :b])
function tab_spanner(label; columns::Vector{Symbol})
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        push!(tbl.spanners, Spanner(label, columns))
        return tbl
    end
end

function tab_stub(col::Symbol)
    return function (tbl::StyledTable)
        col in Symbol.(names(tbl.data)) || throw(ArgumentError("Column :$col not found in DataFrame"))
        tbl.stub_col = col
        return tbl
    end
end

function styled_table(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(
        df,
        Dict{Symbol,Any}(),
        Dict{Symbol,Symbol}(),
        Spanner[],
        nothing,
        12.0,
        nothing,
        nothing,
        Any[],
    )
end

function tab_header(title; subtitle = nothing)
    return function (tbl::StyledTable)
        tbl.header = TableHeader(title, subtitle)
        return tbl
    end
end

function tab_footnote(text)
    return function (tbl::StyledTable)
        push!(tbl.footnotes, text)
        return tbl
    end
end

function tab_row_group(col::Symbol; indent_pt::Real = 12)
    return function (tbl::StyledTable)
        col in Symbol.(names(tbl.data)) || throw(ArgumentError("Column :$col not found in DataFrame"))
        tbl.row_group_col = col
        tbl.row_group_indent_pt = Float64(indent_pt)
        return tbl
    end
end
