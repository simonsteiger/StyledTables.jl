# Sports Cars Performance Table

This example compares sports cars across performance metrics.
We hide auxiliary columns, group by origin country, add a performance spanner, format prices, and highlight them with bold styling.

## The data

```@example cars
using StyledTables, DataFrames

cars = DataFrame(
    origin   = ["Italy", "Italy", "Germany", "Germany", "UK", "UK"],
    make     = ["Ferrari", "Lamborghini", "Porsche", "BMW", "McLaren", "Aston Martin"],
    model    = ["488 GTB", "Huracán", "911 GT3", "M8", "720S", "Vantage"],
    msrp_eur = [280_000, 210_000, 180_000, 130_000, 220_000, 155_000],
    year     = [2022, 2022, 2022, 2022, 2022, 2022],
    hp       = [660, 610, 503, 617, 710, 503],
    trq_nm   = [760, 560, 470, 750, 770, 625],
    mpg      = [15, 13, 22, 19, 21, 20],
)
```

## Step 1: Basic table with row groups

Group by `:origin` and hide the origin and year columns.

```@example cars
label_dict = Dict(
    :make => "Make",
    :model => "Model",
    :msrp_eur => "MSRP (€)",
    :hp => "HP",
    :trq_nm => "Torque (Nm)",
    :mpg => "MPG",
)

tbl = StyledTable(cars)
tab_row_group!(tbl, :origin)
cols_hide!(tbl, :origin, :year)
cols_label!(tbl, label_dict)
render(tbl)
```

## Step 2: Add a spanner for performance metrics

```@example cars
tab_spanner!(tbl, "Performance" => [:hp, :trq_nm, :mpg])
render(tbl)
```

## Step 3: Reorder, format, and highlight

Format MSRP with a currency prefix, right-align numeric columns, bold the price values, and annotate the MPG column.

```@example cars
fmt!(tbl, :msrp_eur) do x
    replace(string(x), r"(\d)(?=(\d{3})+$)" => s"\1,") * "€"
end
cols_align!(tbl, [:msrp_eur, :hp, :trq_nm, :mpg] => :right)
tab_style!(tbl, :msrp_eur; bold = true)
tab_footnote!(tbl, "City/highway combined estimate" => :mpg)
tab_source_note!(tbl, "Source: manufacturer specifications")
render(tbl)
```

The table groups cars by origin, spans the three performance columns, formats MSRP with a thousands separator and currency symbol, and bolds prices for emphasis. The MPG footnote clarifies the measurement basis.
