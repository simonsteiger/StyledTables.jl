# Why StyledTables.jl?

DOCX is a common output format in clinical and applied research — and for that, no existing Julia table package was quite right.

## Existing table-styling packages

I tried to make the tables I need with [PrettyTables.jl](https://ronisbr.github.io/PrettyTables.jl/stable/) and [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/), but neither met my requirements.

The building blocks SummaryTables provides work well for DOCX rendering, but the tables I needed were often outside the intentionally opinionated summaries this package offers.

PrettyTables, on the other hand, offered the customisation I needed, but had no DOCX support.

## What was missing

For me the missing piece was a simple, intuitive way to combine the building blocks provided by SummaryTables.
R's [gt](https://gt.rstudio.com/) package is the clearest model for how this works: construct a table object, then apply modifier functions one at a time.

The core contribution of StyledTables is this same incremental approach: each step is a small, focused modification, and you can inspect the result at any stage.

Instead of working with pipes as would be idiomatic for R, StyledTables has a more Julian take on iterative table modification: all styling functions are mutating and directly modify the `StyledTable`.

## The workflow

In contrast to SummaryTables, StyledTables does not provide any data-summarising capabilites.
It assumes that you bring summarised data that can be converted to a `DataFrame` object.
The typical workflow is thus:

1. Summarise your data
2. Convert it to a `StyledTable`
3. Apply styling
4. Render to html, LaTeX, typst or docx
