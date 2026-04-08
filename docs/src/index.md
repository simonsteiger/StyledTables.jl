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
    - theme: brand
      text: Get started
      link: /getting_started
    - theme: alt
      text: View on Github
      link: https://github.com/simonsteiger/StyledTables.jl
    - theme: alt
      text: API Reference
      link: /resources/api
---
````

# StyledTables

StyledTables provides flexible formatting functionality for tabular data.
Tables can be exported as HTML, docx, LaTeX, and Typst files.
It builds on data structures defined in [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/), with an API inspired by R's [gt](https://gt.rstudio.com/) package.

The premise of `StyledTables.jl` is that your data come summarised; this package only includes formatting and styling functionality and never modifies the underlying dataset.

## Examples

```@example index
using StyledTables, DataFrames, Chain
using Statistics: mean

df = @chain DataFrame(StyledTables.penguins()) begin
    dropmissing(_)
    groupby(_, [:island, :species])
    combine(_, Cols(r"bill") .=> mean => identity)
    sort(_, :island)
end

tbl = StyledTable(df)
tab_rowgroup!(tbl, :island)
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

## Installation

```julia
using Pkg
Pkg.install("StyledTables")
```
