# StyledTables.jl

[![Build Status](https://github.com/simonsteiger/StyledTables.jl/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/simonsteiger/StyledTables.jl/actions/workflows/CI.yml?query=branch%3Amain)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://simonsteiger.github.io/StyledTables.jl/dev/)
[![Code Style: Blue](https://img.shields.io/badge/code%20style-blue-4495d1.svg)](https://github.com/JuliaDiff/BlueStyle)
[![Aqua QA](https://juliatesting.github.io/Aqua.jl/dev/assets/badge.svg)](https://github.com/JuliaTesting/Aqua.jl) <a href="https://simonsteiger.github.io/StyledTables.jl/dev"><img src="/docs/src/assets/logo.svg" align="right" alt="StyledTables logo" style="height: 140px;"></a>

StyledTables provides flexible formatting functionality for tabular data.
Tables can be exported as HTML, docx, LaTeX, and Typst files.
It builds on data structures defined in [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/), with an API inspired by R's [gt](https://gt.rstudio.com/) package.

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
tab_rowgroup!(tbl, :island)
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

Have a look at the [documentation](https://simonsteiger.github.io/StyledTables.jl/dev) if you'd like to learn more!
