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

## `tab_footnote!`

Attach footnote annotations to columns, spanners, or individual body cells.
An auto-numbered superscript attaches to the target; the footnote text appears below the table.
For general notes not attached to any element, use [`tab_sourcenote!`](@ref).

### Column footnotes

Annotate one or more column headers.

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

### Spanner footnotes

Use [`SpannerTarget`](@ref) to annotate a spanner label instead of a column header.
This is useful when a note applies to the group as a whole rather than any individual column.

**Signature:** `tab_footnote!(tbl, [annotation => SpannerTarget(label)])`

```@example annotations
df3 = DataFrame(country = ["US", "DE"], gdp_usd = [25.5, 4.1], gdp_ppp = [27.3, 5.2])

tbl = StyledTable(df3)
tab_spanner!(tbl, "GDP (Trillions)" => [:gdp_usd, :gdp_ppp])
cols_label!(tbl, :country => "Country", :gdp_usd => "USD", :gdp_ppp => "PPP")
tab_footnote!(tbl, ["Estimated values" => SpannerTarget("GDP (Trillions)")])
render(tbl)
```

```@docs
StyledTables.SpannerTarget
```

### Cell footnotes

Use [`CellTarget`](@ref) to annotate an individual body cell.
Specify the row as an integer index (1-based) or as [`Stub`](@ref) to match by stub value.

**Signature:** `tab_footnote!(tbl, [annotation => CellTarget(row, col)])`

```@example annotations
tbl = StyledTable(df)
tab_footnote!(tbl, ["Estimated" => CellTarget(2, :gdp)])
render(tbl)
```

Using a stub value (requires [`tab_stub!`](@ref)):

```@example annotations
tbl = StyledTable(df)
tab_stub!(tbl, :country)
tab_footnote!(tbl, ["Estimated" => CellTarget(Stub("DE"), :gdp)])
render(tbl)
```

```@docs
StyledTables.CellTarget
StyledTables.Stub
```

## `tab_sourcenote!`

Add a source-note line in the footer. Source notes span the full table width and are left-aligned. Each call appends another line.

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
