# Annotations

These functions annotate the table: a title and subtitle appear at the top, footnotes and source notes at the bottom.

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

Add column-annotated footnotes. 
An auto-numbered superscript attaches to the specified column header(s); the footnote text appears in the footnote area below the table.
For general notes not attached to any column, use [`tab_source_note!`](@ref).

**Signatures:**
- `tab_footnote!(tbl, text => col)`
- `tab_footnote!(tbl, text => [col1, col2])`
- `tab_footnote!(tbl, text1 => col1, text2 => col2, ...)`
- `tab_footnote!(tbl, d::AbstractDict)`

```@example annotations
tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country")
tab_footnote!(tbl, "Purchasing power parity adjusted" => :gdp)
render(tbl)
```

Annotate multiple columns with the same footnote:

```@example annotations
tbl = StyledTable(df)
tab_footnote!(tbl, "Source: World Bank (2025)" => [:country, :gdp])
render(tbl)
```

Multiple independent footnotes in one call:

```@example annotations
df2 = DataFrame(country = ["US", "DE"], gdp = [25.5, 4.1], pop = [331, 84])

tbl = StyledTable(df2)
tab_footnote!(tbl,
    "Purchasing power parity adjusted" => :gdp,
    "Population in millions" => :pop,
)
render(tbl)
```

```@docs
StyledTables.tab_footnote!
```

---

## `tab_source_note!`

Add a source-note line in the footer. Source notes span the full table width and are left-aligned. Each call appends another line.

**Signature:** `tab_source_note!(tbl, text)`

```@example annotations
using SummaryTables: Multiline
note = Multiline("Data: World Bank Open Data", "Values in trillions USD")

tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country")
tab_source_note!(tbl, note)
render(tbl)
```

```@docs
StyledTables.tab_source_note!
```
