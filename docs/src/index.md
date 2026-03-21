````@raw html
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: StyledTables
  text:
  tagline: Apply custom formatting to tables in Julia - render HTML, docx, LaTeX and Typst
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

StyledTables adds GT-style formatting to summary tables.
Tables render to HTML, docx, LaTeX, and Typst.
It builds on [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/), with an API inspired by R's [gt](https://gt.rstudio.com/) package.

## Installation

StyledTables is not yet registered. Install from GitHub:

```julia
using Pkg
Pkg.add(url="https://github.com/simonsteiger/StyledTables.jl")
```

## Examples

```@example index
using StyledTables, DataFrames, PalmerPenguins, Chain
using Statistics: mean

df = @chain DataFrame(PalmerPenguins.load()) begin
    dropmissing(_)
    groupby(_, [:island, :species])
    combine(_, Cols(r"bill") .=> mean => identity)
end

tbl = StyledTable(df)
tab_row_group!(tbl, :island)
cols_hide!(tbl, :island)
tab_spanner!(tbl, "Bill measures" => [:bill_length_mm, :bill_depth_mm])

labels = [
    :species => "Species", 
    :bill_length_mm => "Length", 
    :bill_depth_mm => "Depth"
]

cols_label!(tbl, labels)
render(tbl)
```
