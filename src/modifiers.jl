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
        df,                             # data
        Dict{Symbol,Any}(),             # col_labels
        Dict{Symbol,Symbol}(),          # col_alignments
        Spanner[],                      # spanners
        nothing,                        # row_group_col
        12.0,                           # row_group_indent_pt
        nothing,                        # stub_col
        nothing,                        # header
        Any[],                          # footnotes
        Dict{Symbol,Function}(),        # col_formatters
        Dict{Symbol,ColStyleOverride}(),# col_styles
        Dict{Symbol,Any}(),             # col_footnotes
        nothing,                        # col_order
        Set{Symbol}(),                  # hidden_cols
        nothing,                        # stubhead_label
        Any[],                          # source_notes
        Any[],                          # postprocessors
        nothing,                        # round_digits
        nothing,                        # round_mode
        nothing,                        # trailing_zeros
    )
end

function tab_header(title; subtitle = nothing)
    return function (tbl::StyledTable)
        tbl.header = TableHeader(title, subtitle)
        return tbl
    end
end

# Usage: styled_table(df) |> tab_footnote("note")                          # table-level
#        styled_table(df) |> tab_footnote("note"; columns = [:x, :y])     # annotates column headers
function tab_footnote(text; columns::Union{Nothing,AbstractVector{Symbol}} = nothing)
    return function (tbl::StyledTable)
        if columns === nothing
            push!(tbl.footnotes, text)
        else
            colnames = Symbol.(names(tbl.data))
            for col in columns
                col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            end
            for col in columns
                tbl.col_footnotes[col] = text
            end
        end
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

function tab_stubhead(label)
    return function (tbl::StyledTable)
        tbl.stubhead_label = label
        return tbl
    end
end

function tab_source_note(text)
    return function (tbl::StyledTable)
        push!(tbl.source_notes, text)
        return tbl
    end
end

# Usage: styled_table(df) |> sub_missing()
#        styled_table(df) |> sub_missing(with = "N/A")
function sub_missing(; with::Any = "—")
    return function (tbl::StyledTable)
        push!(tbl.postprocessors, SummaryTables.Replace(ismissing, with, true))
        return tbl
    end
end

# Usage: styled_table(df) |> tab_options(round_digits=2, round_mode=:digits)
function tab_options(;
    round_digits::Union{Nothing,Int} = nothing,
    round_mode::Union{Nothing,Symbol} = nothing,
    trailing_zeros::Union{Nothing,Bool} = nothing,
)
    if round_mode !== nothing
        round_mode in (:auto, :digits, :sigdigits) ||
            throw(ArgumentError("round_mode must be :auto, :digits, or :sigdigits, got :$round_mode"))
    end
    return function (tbl::StyledTable)
        round_digits !== nothing && (tbl.round_digits = round_digits)
        round_mode !== nothing && (tbl.round_mode = round_mode)
        trailing_zeros !== nothing && (tbl.trailing_zeros = trailing_zeros)
        return tbl
    end
end

# Usage: styled_table(df) |> cols_hide(:a, :b)
function cols_hide(cols::Symbol...)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            push!(tbl.hidden_cols, col)
        end
        return tbl
    end
end

# Usage: styled_table(df) |> cols_move([:c, :b])            # move :c, :b to start
#        styled_table(df) |> cols_move([:c]; after = :a)    # move :c after :a
function cols_move(cols::AbstractVector{Symbol}; after::Union{Nothing,Symbol} = nothing)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        if after !== nothing
            after in colnames || throw(ArgumentError("Column :$after not found in DataFrame"))
            after in cols && throw(ArgumentError("Column :$after cannot appear in both `cols` and `after`"))
        end
        remaining = filter(c -> c ∉ cols, colnames)
        if after === nothing
            tbl.col_order = vcat(cols, remaining)
        else
            idx = findfirst(==(after), remaining)
            tbl.col_order = vcat(remaining[1:idx], collect(cols), remaining[idx+1:end])
        end
        return tbl
    end
end
