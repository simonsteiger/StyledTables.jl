# StyledTables.jl

**StyledTables.jl** is a GT-style table builder for Julia. It provides a pipe-friendly
API for turning a `DataFrame` into a polished, publication-ready table rendered in
HTML, LaTeX, and Typst.

Rendering is handled by [SummaryTables.jl](https://github.com/PumasAI/SummaryTables.jl)
as the backend; StyledTables layers a declarative modifier API on top.

## Quick example

```@example index
using StyledTables, DataFrames

df = DataFrame(
    name  = ["Alice", "Bob", "Carol"],
    score = [92.5, 87.0, 95.3],
    grade = ["A", "B", "A"],
)

df |> StyledTable |>
    tab_header("Student Results"; subtitle = "Spring 2026") |>
    cols_label(name = "Student", score = "Score", grade = "Grade") |>
    cols_align(:center, [:score, :grade]) |>
    fmt_number(:score; digits = 1) |> render
```

## Installation

```julia
using Pkg
Pkg.add("StyledTables")
```
