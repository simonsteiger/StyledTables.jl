# Annotations

These functions annotate the table: a title and subtitle at the top, footnotes and source notes at the bottom.

---

## `tab_header!`

Add a title (and optional subtitle) above the column headers.

**Signature:** `tab_header!(tbl, title; subtitle = nothing)`

```@example annotations
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country"; subtitle = "Trillions USD, 2025")
cols_label!(tbl, :country => "Country", :gdp => "GDP")
fmt_number!(tbl, :gdp; digits = 1)
render(tbl)
```

```@docs
StyledTables.tab_header!
```

---

## `tab_footnote!`

Add a footnote. Without `columns`, the text appears below the table. With `columns`, an auto-numbered superscript attaches to those column headers, and the text appears in the footnote area.

**Signatures:**
- `tab_footnote!(tbl, text)` — table-level footnote
- `tab_footnote!(tbl, text; columns = [:col1, :col2])` — column-annotated footnote

```@example annotations
tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country")
tab_footnote!(tbl, "Source: World Bank (2025)")
render(tbl)
```

Annotate a specific column:

```@example annotations
tbl = StyledTable(df)
tab_footnote!(tbl, "Purchasing power parity adjusted"; columns = [:gdp])
render(tbl)
```

```@docs
StyledTables.tab_footnote!
```

---

## `tab_source_note!`

Add a source-note line in the footer. Source notes span the full table width. Each call appends another line.

**Signature:** `tab_source_note!(tbl, text)`

```@example annotations
tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country")
tab_source_note!(tbl, "Data: World Bank Open Data")
tab_source_note!(tbl, "Values in trillions USD")
render(tbl)
```

```@docs
StyledTables.tab_source_note!
```
