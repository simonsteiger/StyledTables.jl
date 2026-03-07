# Rendering defined here

function render(tbl::GTTable)
    df = tbl.data
    colnames = Symbol.(names(df))
    n_cols = length(colnames)

    # --- Spanner row (optional) ---
    has_spanners = !isempty(tbl.spanners)
    spanner_row = has_spanners ? _build_spanner_row(tbl, colnames) : nothing

    # --- Column header row ---
    header_row = [_header_cell(tbl, col) for col in colnames]

    # --- Body rows ---
    body = Matrix{Cell}(undef, nrow(df), n_cols)
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i in 1:nrow(df)
            body[i, j] = Cell(df[i, col]; halign)
        end
    end

    n_header_rows = 1 + (has_spanners ? 1 : 0)

    cells = if has_spanners
        [spanner_row'; header_row'; body]
    else
        [header_row'; body]
    end

    return Table(cells; header = n_header_rows)
end

function _build_spanner_row(tbl::GTTable, colnames::Vector{Symbol})
    row = Cell[Cell(nothing) for _ in colnames]
    for (group_idx, spanner) in enumerate(tbl.spanners)
        for col in spanner.columns
            j = findfirst(==(col), colnames)
            j === nothing && continue
            row[j] = Cell(spanner.label; bold = true, merge = true, mergegroup = group_idx)
        end
    end
    return row
end

# Build a single header cell for a given column, applying label overrides and alignment
function _header_cell(tbl::GTTable, col::Symbol)
    # Stub column has no header label
    col == tbl.stub_col && return Cell(nothing)
    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    return Cell(label; bold = true, halign)
end
