# Getting Started

## Installation

```julia
import Pkg
Pkg.add("StyledTables")
```

## Your first table

The workflow almost always starts with a `DataFrame` and ends with `render()`.

```@example gettingstarted
using StyledTables, DataFrames

df = DataFrame(
    treatment = ["Placebo", "Low Dose", "High Dose"],
    n = [30, 30, 30],
    response = [0.12, 0.38, 0.61],
)

tbl = StyledTable(df)
render(tbl)
```

`StyledTable(df)` wraps the DataFrame. `render()` converts it to a `SummaryTables.Table` that can be saved as html, LaTeX, typst or docx (see the [SummaryTables.jl docs](https://pumasai.github.io/SummaryTables.jl/stable/reference/renderers) for further detail).

## Adding a title

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response"; subtitle = "Phase II Clinical Trial")
render(tbl)
```

## Relabeling and aligning columns

```@example gettingstarted
labels = Dict(
    :treatment => "Treatment arm", 
    :n => "N", 
    :response => "Response rate",
)

tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, labels)
cols_align!(tbl, :n => :center, :response => :center)
render(tbl)
```

## Grouping columns under a spanner

```@example gettingstarted
tab_spanner!(tbl, "Results" => [:n, :response])
render(tbl)
```

## Formatting numbers

```@example gettingstarted
fmt_percent!(tbl, [:response]; digits = 1)
render(tbl)
```
