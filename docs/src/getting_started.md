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

tbl = StyledTable(df)
render(tbl)
```

`StyledTable(df)` wraps the DataFrame. `render()` converts it to a `SummaryTables.Table` for display in Jupyter, Pluto, or Documenter.

## Adding a title

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response"; subtitle = "Phase II Clinical Trial")
render(tbl)
```

## Relabeling and aligning columns

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, :treatment => "Treatment Arm", :n => "N", :response => "Response Rate")
cols_align!(tbl, :center, [:n, :response])
render(tbl)
```

## Grouping columns under a spanner

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, :treatment => "Treatment Arm", :n => "N", :response => "Response Rate")
tab_spanner!(tbl, "Results" => [:n, :response])
render(tbl)
```

## Formatting numbers

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, :treatment => "Treatment Arm", :n => "N", :response => "Response Rate")
tab_spanner!(tbl, "Results" => [:n, :response])
fmt_percent!(tbl, [:response]; digits = 1)
render(tbl)
```

## Next steps

- **Reference** — full API documentation.
- **Examples** — real-world use cases.
