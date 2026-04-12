# Annotations

These functions annotate the table: a title and subtitle at the top, footnotes and source notes at the bottom.

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

## `tab_footnote!`

Attach footnotes to columns, spanners, or individual body cells.
An superscript marks the target; the annotation text appears below the table.
For general notes, use [`tab_sourcenote!`](@ref).

**Signatures:**
```julia
tab_footnote!(tbl, text => col)
tab_footnote!(tbl, text => [col1, col2])
tab_footnote!(tbl, text1 => col1, text2 => col2, ...)
tab_footnote!(tbl, d::AbstractDict)
```

```@example annotations
tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country")
tab_footnote!(tbl, "Purchasing power parity adjusted" => :gdp)
render(tbl)
```

Multiple columns with the same footnote:

```@example annotations
tbl = StyledTable(df)
tab_footnote!(tbl, "Source: World Bank (2025)" => [:country, :gdp])
render(tbl)
```

Footnotes for different columns:

```@example annotations
df2 = DataFrame(country = ["US", "DE"], gdp = [25.5, 4.1], pop = [331, 84])

tbl = StyledTable(df2)
tab_footnote!(tbl,
    "Purchasing power parity adjusted" => :gdp,
    "Population in millions" => :pop,
)
render(tbl)
```

Footnotes for spanner labels and individual cells are explained [here](../examples/footnotes.md).

```@docs
StyledTables.tab_footnote!(::StyledTable, ::Pair...)
```

## `tab_sourcenote!`

Add a source-note line in the footer. Source notes span the full table width and are left-aligned; each call appends one.

**Signature:** `tab_sourcenote!(tbl, text)`

```@example annotations
using SummaryTables: Multiline
note = Multiline("Data: World Bank Open Data", "Values in trillions USD")

tbl = StyledTable(df)
tab_header!(tbl, "GDP by Country")
tab_sourcenote!(tbl, note)
render(tbl)
```

```@docs
StyledTables.tab_sourcenote!
```
