# Why StyledTables.jl?

DOCX is a common output format in clinical and applied research — and for that, no existing Julia table package was quite right.

## Existing table-styling packages

I have tried to make the tables I need with [PrettyTables.jl](https://ronisbr.github.io/PrettyTables.jl/stable/) and [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/) but both did not _quite_ meet my requirements.

The building blocks provided in SummaryTables worked really well for docx rendering, but the tables I needed were often outside of the (by design) opinionated summaries that this package provides.

PrettyTables, on the other hand, allowed for the customisation I needed but there was no docx support.

## What was missing

For me the missing piece was a simple, intuitive way to combine the building blocks provided by SummaryTables.
I am a big fan of being able to iteratively add elements to visual objects like plots or tables, and I think R's [gt](https://gt.rstudio.com/) package is a great example for how this could work for tables.

The core contribution of StyledTables lies in how it allows you to build tables incrementally: first, you construct a table object, then apply modifier functions one at a time.
Each step is a small and focused modification, and you can inspect the result at any stage of this process.

Instead of working with pipes as would be idiomatic for R, StyledTables has a more Julian take on iterative table modification: all styling functions are mutating and directly modify the `StyledTable`.

## The workflow

In contrast to SummaryTables, StyledTables does not provide any data-summarising capabilites.
It assumes that you bring summarised data that can be converted to a `DataFrame` object.
The typical workflow is thus:

1. Summarise your data
2. Convert it to a `StyledTable`
3. Apply styling
4. Render to html, LaTeX, typst or docx
