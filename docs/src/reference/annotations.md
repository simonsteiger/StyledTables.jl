# Annotations

These functions annotate the table: a title and subtitle at the top, footnotes and source notes at the bottom.

## `header!`

Add a title (and optional subtitle) above the column headers.

**Signature:** `header!(tbl, title; subtitle = nothing)`

```@example annotations
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

tbl = StyledTable(df)
header!(tbl, "GDP by Country"; subtitle = "Trillions USD, 2025")
relabel!(tbl, :country => "Country", :gdp => "GDP")
format!(NumberFormatter(digits = 1), tbl, :gdp)
render(tbl)
```

```@docs
StyledTables.header!
```

## `footnote!`

Attach footnotes to columns, spanners, or individual body cells.
An superscript marks the target; the annotation text appears below the table.
For general notes, use [`sourcenote!`](@ref).

**Signatures:**
```julia
footnote!(tbl, col => text)
footnote!(tbl, [col1, col2] => text)
footnote!(tbl, col1 => text1, col2 => text2, ...)
footnote!(tbl, d::AbstractDict)
```

```@example annotations
tbl = StyledTable(df)
header!(tbl, "GDP by Country")
footnote!(tbl, :gdp => "Purchasing power parity adjusted")
render(tbl)
```

Multiple columns with the same footnote:

```@example annotations
tbl = StyledTable(df)
footnote!(tbl, [:country, :gdp] => "Source: World Bank (2025)")
render(tbl)
```

Footnotes for different columns:

```@example annotations
df2 = DataFrame(country = ["US", "DE"], gdp = [25.5, 4.1], pop = [331, 84])

tbl = StyledTable(df2)
footnote!(tbl,
    :gdp => "Purchasing power parity adjusted",
    :pop => "Population in millions",
)
render(tbl)
```

Footnotes for spanner labels and individual cells are explained [here](../examples/footnotes.md).

```@docs
StyledTables.footnote!(::StyledTable, ::Pair...)
```

## `sourcenote!`

Add a source-note line in the footer. Source notes span the full table width and are left-aligned; each call appends one.

**Signature:** `sourcenote!(tbl, text)`

```@example annotations
using SummaryTables: Multiline
note = Multiline("Data: World Bank Open Data", "Values in trillions USD")

tbl = StyledTable(df)
header!(tbl, "GDP by Country")
sourcenote!(tbl, note)
render(tbl)
```

```@docs
StyledTables.sourcenote!
```
