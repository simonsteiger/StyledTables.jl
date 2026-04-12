# Footnote Annotations

StyledTables.jl supports three levels of footnote targeting. Each level places an
auto-numbered superscript on a different element and appends the annotation text below the table.

| Target        | Constructor              | Attaches to        |
|---------------|--------------------------|--------------------|
| Column header | `"note" => :col`         | A column label     |
| Spanner label | `SpannerTarget(label)`   | A spanner row cell |
| Body cell     | `CellTarget(row, col)`   | A single data cell |

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

The simplest form: annotate one or more column headers with a text note.

```@example footnotes
tbl = StyledTable(df)
cols_label!(tbl, :country => "Country", :gdp_usd => "GDP (USD)", :gdp_ppp => "GDP (PPP)", :pop_m => "Population")
tab_footnote!(tbl, "Trillions USD, 2025" => [:gdp_usd, :gdp_ppp])
tab_footnote!(tbl, "Millions" => :pop_m)
render(tbl)
```

## Spanner footnotes

Use [`SpannerTarget`](@ref) to annotate a spanner label instead of a column header.
This is useful when a note applies to the group as a whole rather than any single column.

```@example footnotes
tbl = StyledTable(df)
tab_spanner!(tbl, "GDP (Trillions)" => [:gdp_usd, :gdp_ppp])
cols_label!(tbl, :country => "Country", :gdp_usd => "USD", :gdp_ppp => "PPP", :pop_m => "Population")
tab_footnote!(tbl, ["Estimated values" => SpannerTarget("GDP (Trillions)")])
render(tbl)
```

When a table has nested spanners at multiple levels, pass `level` to restrict the match:

```@example footnotes
tbl = StyledTable(df)
tab_spanner!(tbl, "USD" => [:gdp_usd])
tab_spanner!(tbl, "PPP" => [:gdp_ppp])
tab_spanner!(tbl, "GDP" => [:gdp_usd, :gdp_ppp], level = 2)
cols_label!(tbl, :country => "Country", :gdp_usd => "Trillions", :gdp_ppp => "Trillions", :pop_m => "Population")
tab_footnote!(tbl, ["Covers both USD and PPP estimates" => SpannerTarget("GDP"; level = 2)])
render(tbl)
```

## Cell footnotes

Use [`CellTarget`](@ref) to annotate a single body cell — useful for flagging an individual
data point as preliminary, revised, or otherwise noteworthy.

**By row index** (1-based):

```@example footnotes
tbl = StyledTable(df)
cols_label!(tbl, :country => "Country", :gdp_usd => "GDP (USD)", :gdp_ppp => "GDP (PPP)", :pop_m => "Population")
tab_footnote!(tbl, ["Preliminary estimate" => CellTarget(3, :gdp_ppp)])
render(tbl)
```

**By stub value** (requires [`tab_stub!`](@ref)):

When a table has a stub column, you can target rows by their stub value rather than
a numeric index. This is more robust when row order may change.

```@example footnotes
tbl = StyledTable(df)
tab_stub!(tbl, :country)
cols_label!(tbl, :country => "Country", :gdp_usd => "GDP (USD)", :gdp_ppp => "GDP (PPP)", :pop_m => "Population")
tab_footnote!(tbl, ["Preliminary estimate" => CellTarget(Stub("Japan"), :gdp_ppp)])
render(tbl)
```
