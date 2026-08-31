# Sports Cars Performance Table

This example creates a table comparing sports cars across performance metrics.

Styling elements used in this example are:

- Rowgroups
- Hidden columns
- Column labels
- Formatting values
- Column spanners
- Cell alignment
- Cell styling (bold font)
- Footnotes
- Source notes

```@example cars
using StyledTables, DataFrames

cars = DataFrame(
    origin = ["Italy", "Italy", "Germany", "Germany", "UK", "UK"],
    make = ["Ferrari", "Lamborghini", "Porsche", "BMW", "McLaren", "Aston Martin"],
    model = ["488 GTB", "Huracán", "911 GT3", "M8", "720S", "Vantage"],
    msrp_eur = [280_000, 210_000, 180_000, 130_000, 220_000, 155_000],
    year = [2022, 2022, 2022, 2022, 2022, 2022],
    hp = [660, 610, 503, 617, 710, 503],
    trq_nm = [760, 560, 470, 750, 770, 625],
    mpg = [15, 13, 22, 19, 21, 20],
)
```

## Step 1: Basic table with row groups

We first group the table by `:origin` and hide the origin and year columns.

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
rowgroup!(tbl, :origin)
hide!(tbl, :origin, :year)
relabel!(tbl, label_dict)
render(tbl)
```

## Step 2: Add a spanner for performance metrics

The columns `hp`, `trq_nm`, and `mpg` all describe performance of cars.
Let's unite them under a Performance column spanner:

```@example cars
spanner!(tbl, [:hp, :trq_nm, :mpg] => "Performance")
render(tbl)
```

## Step 3: Reorder, format, and highlight

Finally, we format `msrp_eur` as Euros, right-align numeric columns, bold the price values, and annotate the MPG column.

```@example cars
format!(tbl, :msrp_eur) do x
    replace(string(x), r"(\d)(?=(\d{3})+$)" => s"\1,") * "€"
end
align!(tbl, [:msrp_eur, :hp, :trq_nm, :mpg] => :right)
style!(tbl, :msrp_eur; bold = true)
footnote!(tbl, :mpg => "City/highway combined estimate")
sourcenote!(tbl, "Source: manufacturer specifications")
render(tbl)
```
