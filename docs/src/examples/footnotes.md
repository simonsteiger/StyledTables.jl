# Footnotes everywhere

Here we'll showcase how to place footnotes in three different places.

| Target        | Constructor              |
|---------------|--------------------------|
| Column header | `:col => "note"`         |
| Spanner label | `SpannerTarget(label) => "note"`   |
| Body cell     | `CellTarget(row, col) => "note"`   |

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

Typically, all we want and need is to annotate a single column name:

```@example footnotes
tbl = StyledTable(df)
footnote!(tbl, 
    [:gdp_usd, :gdp_ppp] => "Trillions USD, 2025",
    [:pop_m] => "Millions",
)
render(tbl)
```

## Spanner footnotes

When we're using column spanners and our footnote applies to all columns under that spanner, we of course don't want to target all these column names with the same footnote.
Instead, we can use [`SpannerTarget`](@ref) to annotate only the spanner label:

```@example footnotes
tbl = StyledTable(df)
spanner!(tbl, [:gdp_usd, :gdp_ppp] => "GDP (Trillions)")
footnote!(tbl, SpannerTarget("GDP (Trillions)") => "Estimated values")
render(tbl)
```

## Cell footnotes

Last but not least, we may also want to annotate specific values in our table.
We do this by targetting cells using [`CellTarget`](@ref). 
You can specify the cell location in two ways:

**By row index** (1-based):

```@example footnotes
tbl = StyledTable(df)
japan_gdp_ppp = CellTarget(3, :gdp_ppp)
footnote!(tbl, japan_gdp_ppp => "Preliminary estimate")
render(tbl)
```

**By stub value** (requires [`stub!`](@ref)):

If a stub column exists, you may target rows by the stub value rather than the numeric index.
This option offers better readability over numeric indices, and if you expect your rows to change order it is also the more robust and maintainable choice.

```@example footnotes
tbl = StyledTable(df)
stub!(tbl, :country)
japan_gdp_ppp = CellTarget(Stub("Japan"), :gdp_ppp)
footnote!(tbl, japan_gdp_ppp => "Preliminary estimate")
render(tbl)
```
