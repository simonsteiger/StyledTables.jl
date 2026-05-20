# Footnotes everywhere

StyledTables.jl supports three footnote targets. Each target places an
auto-numbered superscript on a different element and appends the annotation text below the table.

| Target        | Constructor              | Attaches to        |
|---------------|--------------------------|--------------------|
| Column header | `:col => "note"`         | A column label     |
| Spanner label | `SpannerTarget(label) => "note"`   | A spanner row cell |
| Body cell     | `CellTarget(row, col) => "note"`   | A single data cell |

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
footnote!(tbl, 
    [:gdp_usd, :gdp_ppp] => "Trillions USD, 2025",
    [:pop_m] => "Millions",
)
render(tbl)
```

## Spanner footnotes

Use [`SpannerTarget`](@ref) to annotate a spanner label instead of a column header — useful when a note applies to the group as a whole rather than any single column.

```@example footnotes
tbl = StyledTable(df)
spanner!(tbl, [:gdp_usd, :gdp_ppp] => "GDP (Trillions)")
footnote!(tbl, SpannerTarget("GDP (Trillions)") => "Estimated values")
render(tbl)
```

## Cell footnotes

Use [`CellTarget`](@ref) to annotate a single body cell — useful for flagging a data point as preliminary, revised, or otherwise noteworthy.

**By row index** (1-based):

```@example footnotes
tbl = StyledTable(df)
japan_gdp_ppp = CellTarget(3, :gdp_ppp)
footnote!(tbl, japan_gdp_ppp => "Preliminary estimate")
render(tbl)
```

**By stub value** (requires [`stub!`](@ref)):

With a stub column, target rows by stub value rather than numeric index — more robust when row order may change.

```@example footnotes
tbl = StyledTable(df)
stub!(tbl, :country)
japan_gdp_ppp = CellTarget(Stub("Japan"), :gdp_ppp)
footnote!(tbl, japan_gdp_ppp => "Preliminary estimate")
render(tbl)
```
