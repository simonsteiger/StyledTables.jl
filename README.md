# StyledTables.jl

<div align="center">
    <picture>
      <img alt="StyledTables.jl logo"
        src="/docs/src/assets/logo.svg" width="150">
    </picture>
</div>
<div align="center">
  <a href="https://github.com/simonsteiger/StyledTables.jl/actions/workflows/CI.yml?query=branch%3Amain">
    <img src="https://github.com/simonsteiger/StyledTables.jl/actions/workflows/CI.yml/badge.svg?branch=main" alt="Build Status">
  </a>
  <a href="https://github.com/JuliaDiff/BlueStyle">
    <img src="https://img.shields.io/badge/code%20style-blue-4495d1.svg" alt="Code Style: Blue">
  </a>
  <a href="https://github.com/JuliaTesting/Aqua.jl">
    <img src="https://juliatesting.github.io/Aqua.jl/dev/assets/badge.svg" alt="Aqua QA">
  </a>
</div>

StyledTables provides flexible formatting functionality for tabular data.
Tables can be exported as HTML, docx, LaTeX, and Typst files.
It builds on data structures defined in [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/), with an API inspired by R's [gt](https://gt.rstudio.com/) package.

## Installation

StyledTables is not yet registered in the Julia General Registry. Install it directly from GitHub:

```julia
using Pkg
Pkg.add(url="https://github.com/simonsteiger/StyledTables.jl")
```

## Quick Start

```julia
using StyledTables, DataFrames, Chain
using Statistics: mean

# Step 1: summarise your data
df = @chain DataFrame(StyledTables.penguins()) begin
    dropmissing(_)
    groupby(_, [:island, :species])
    combine(_, Cols(r"bill") .=> mean => identity)
    sort(_, :island)
end

# Step 2: create a `StyledTable`
tbl = StyledTable(df)

# Step 3: add styling
tab_row_group!(tbl, :island)
cols_hide!(tbl, :island)
tab_spanner!(tbl, "Bill measures" => [:bill_length_mm, :bill_depth_mm])

labels = [
    :species => "Species", 
    :bill_length_mm => "Length", 
    :bill_depth_mm => "Depth"
]

cols_label!(tbl, labels)

# Step 4: render
render(tbl)
```

Have a look at the [documentation](https://simonsteiger.github.io/StyledTables.jl) if you'd like to learn more!
