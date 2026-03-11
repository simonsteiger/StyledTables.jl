# Getting Started

## Installation

```julia
using Pkg
Pkg.add("StyledTables")
```

## Your first table

Every StyledTables pipeline starts with a `DataFrame` and ends with `render()`.

```@example gettingstarted
using StyledTables, DataFrames

df = DataFrame(
    treatment = ["Placebo", "Low Dose", "High Dose"],
    n         = [30, 30, 30],
    response  = [0.12, 0.38, 0.61],
)

df |> StyledTable |> render
```

Piping a `DataFrame` through `StyledTable` wraps it. Calling `render()` converts it to
a `SummaryTables.Table`, which displays in Jupyter, Pluto, or any Documenter page.

## Adding a title

```@example gettingstarted
df |> StyledTable |>
    tab_header("Treatment Response"; subtitle = "Phase II Clinical Trial") |> render
```

## Relabeling and aligning columns

```@example gettingstarted
df |> StyledTable |>
    tab_header("Treatment Response") |>
    cols_label(treatment = "Treatment Arm", n = "N", response = "Response Rate") |>
    cols_align(:center, [:n, :response]) |> render
```

## Grouping columns under a spanner

```@example gettingstarted
df |> StyledTable |>
    tab_header("Treatment Response") |>
    cols_label(treatment = "Treatment Arm", n = "N", response = "Response Rate") |>
    tab_spanner("Results"; columns = [:n, :response]) |> render
```

## Formatting numbers

```@example gettingstarted
df |> StyledTable |>
    tab_header("Treatment Response") |>
    cols_label(treatment = "Treatment Arm", n = "N", response = "Response Rate") |>
    tab_spanner("Results"; columns = [:n, :response]) |>
    fmt_percent(:response; digits = 1) |> render
```

## Next steps

- See **Reference** for the full API.
- See **Examples** for applied, real-world case studies.
