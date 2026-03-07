# Rendering defined here

function render(tbl::GTTable)
    df = tbl.data
    colnames = Symbol.(names(df))

    # --- Column header row ---
    header_row = [_header_cell(tbl, col) for col in colnames]

    # --- Body rows ---
    body = Matrix{Cell}(undef, nrow(df), ncol(df))
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i in 1:nrow(df)
            body[i, j] = Cell(df[i, col]; halign)
        end
    end

    cells = [header_row'; body]
    return Table(cells; header = 1)
end

# Build a single header cell for a given column, applying label overrides and alignment
function _header_cell(tbl::GTTable, col::Symbol)
    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    return Cell(label; bold = true, halign)
end
