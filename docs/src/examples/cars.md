# Sports Cars Performance Table

This example builds a table comparing sports cars across performance metrics.
We start with raw data, hide auxiliary columns, group rows by origin country,
add a spanner for performance metrics, move the price column, format it, and
highlight it with bold styling.

## The data

```julia
using StyledTables, DataFrames

cars = DataFrame(
    origin   = ["Italy", "Italy", "Germany", "Germany", "UK", "UK"],
    make     = ["Ferrari", "Lamborghini", "Porsche", "BMW", "McLaren", "Aston Martin"],
    model    = ["488 GTB", "Huracán", "911 GT3", "M8", "720S", "Vantage"],
    year     = [2022, 2022, 2022, 2022, 2022, 2022],
    hp       = [660, 610, 503, 617, 710, 503],
    trq_nm   = [760, 560, 470, 750, 770, 625],
    mpg      = [15, 13, 22, 19, 21, 20],
    msrp_eur = [280_000, 210_000, 180_000, 130_000, 220_000, 155_000],
)
```

## Step 1: Basic table with row groups

Group by `:origin` and hide the origin and year columns from view.

```julia
cars |> StyledTable() |>
    tab_row_group(:origin) |>
    cols_hide(:origin, :year) |>
    cols_label(
        make     = "Make",
        model    = "Model",
        hp       = "HP",
        trq_nm   = "Torque (Nm)",
        mpg      = "MPG",
        msrp_eur = "MSRP (€)",
    ) |>
    render()
```

## Step 2: Add a spanner for performance metrics

```julia
cars |> StyledTable() |>
    tab_row_group(:origin) |>
    cols_hide(:origin, :year) |>
    cols_label(
        make     = "Make",
        model    = "Model",
        hp       = "HP",
        trq_nm   = "Torque (Nm)",
        mpg      = "MPG",
        msrp_eur = "MSRP (€)",
    ) |>
    tab_spanner("Performance"; columns = [:hp, :trq_nm, :mpg]) |>
    render()
```

## Step 3: Reorder, format, and highlight

Move MSRP next to the model name, format it with a currency prefix, right-align
the numeric columns, bold the price values, and add an annotated footnote on MPG.

```julia
cars |> StyledTable() |>
    tab_header("Sports Cars — 2022 Model Year"; subtitle = "Selected European manufacturers") |>
    tab_row_group(:origin) |>
    cols_hide(:origin, :year) |>
    cols_move([:msrp_eur]; after = :model) |>
    cols_label(
        make     = "Make",
        model    = "Model",
        msrp_eur = "MSRP (€)",
        hp       = "HP",
        trq_nm   = "Torque (Nm)",
        mpg      = "MPG",
    ) |>
    tab_spanner("Performance"; columns = [:hp, :trq_nm, :mpg]) |>
    fmt(:msrp_eur, x -> "€" * replace(string(x), r"(\d)(?=(\d{3})+$)" => s"\1,")) |>
    cols_align(:right, [:msrp_eur, :hp, :trq_nm, :mpg]) |>
    tab_style([:msrp_eur]; bold = true) |>
    tab_footnote("City/highway combined estimate"; columns = [:mpg]) |>
    tab_source_note("Source: manufacturer specifications") |>
    render()
```

The final table groups cars by origin country, shows a spanner over the three
performance columns, formats MSRP with a currency prefix and thousands separator,
and bolds those values to draw attention to price. The footnote on the MPG column
clarifies the measurement basis.
