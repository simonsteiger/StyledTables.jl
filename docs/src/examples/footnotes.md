# Footnotes everywhere

StyledTables.jl supports three footnote targets. Each target places an
auto-numbered superscript on a different element and appends the annotation text below the table.

| Target        | Constructor              | Attaches to        |
|---------------|--------------------------|--------------------|
| Column header | `"note" => :col`         | A column label     |
| Spanner label | `"note" => SpannerTarget(label)`   | A spanner row cell |
| Body cell     | `"note" => CellTarget(row, col)`   | A single data cell |

## Setup

```@example footnotes
using StyledTables, DataFrames

df = DataFrame(
    country  = ["United States", "Germany", "Japan"],
    gdp_usd  = [25.5, 4.1, 4.2],
    gdp_ppp  = [27.3, 5.2, 6.2],
    pop_m    = [331, 84, 125],
)
```

## Column footnotes

Annotate one or more column headers with a note.

```@example footnotes
tbl = StyledTable(df)
tab_footnote!(tbl, 
    "Trillions USD, 2025" => [:gdp_usd, :gdp_ppp],
    "Millions" => [:pop_m],
)
render(tbl)
```

## Spanner footnotes

Use [`SpannerTarget`](@ref) to annotate a spanner label instead of a column header — useful when a note applies to the group as a whole rather than any single column.

```@example footnotes
tbl = StyledTable(df)
tab_spanner!(tbl, "GDP (Trillions)" => [:gdp_usd, :gdp_ppp])
tab_footnote!(tbl, "Estimated values" => SpannerTarget("GDP (Trillions)"))
render(tbl)
```

## Cell footnotes

Use [`CellTarget`](@ref) to annotate a single body cell — useful for flagging a data point as preliminary, revised, or otherwise noteworthy.

**By row index** (1-based):

```@example footnotes
tbl = StyledTable(df)
japan_gdp_ppp = CellTarget(3, :gdp_ppp)
tab_footnote!(tbl, "Preliminary estimate" => japan_gdp_ppp)
render(tbl)
```

**By stub value** (requires [`tab_stub!`](@ref)):

With a stub column, target rows by stub value rather than numeric index — more robust when row order may change.

```@example footnotes
tbl = StyledTable(df)
tab_stub!(tbl, :country)
japan_gdp_ppp = CellTarget(Stub("Japan"), :gdp_ppp)
tab_footnote!(tbl, "Preliminary estimate" => japan_gdp_ppp)
render(tbl)
```
