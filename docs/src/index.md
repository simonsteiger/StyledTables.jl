````@raw html
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: StyledTables
  text:
  tagline: Apply custom formatting to tables in Julia - render to HTML, docx, LaTeX and Typst
  image:
    src: logo.svg
    alt: StyledTables
  actions:
    - theme: alt
      text: View on Github
      link: https://github.com/simonsteiger/StyledTables.jl
---
````

# StyledTables

The goal of StyledTables is to provide styling elements for summarised tables.
Tables can be rendered in HTML, docx, LaTeX and Typst formats.
The package directly builds on top of [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/), while the API is loosely inspired by R's [gt](https://gt.rstudio.com/) package.

## Installation

SummaryTables is not yet registered in the General Registry and can be installed via url:

```julia
using Pkg
Pkg.add(url="https://github.com/simonsteiger/StyledTables.jl")
```

## Examples

```@example index
using StyledTables, DataFrames

df = DataFrame(
    name  = ["Alice", "Bob", "Carol"],
    score = [92.5, 87.0, 95.3],
    grade = ["A", "B", "A"],
)

tbl = StyledTable(df)
tab_header!(tbl, "Student Results"; subtitle = "Spring 2026")
cols_label!(tbl, :name => "Student", :score => "Score", :grade => "Grade")
cols_align!(tbl, :center, [:score, :grade])
fmt_number!(tbl, :score; digits = 1)
render(tbl)
```
