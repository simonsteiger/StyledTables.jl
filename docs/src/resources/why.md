# Why StyledTables.jl?

Because I had to send docx files to my collaborators.

Word files are common in clinical and applied research, and existing packages either did not support docx or did not provide a high level interface for custom table styling.

## Existing table-styling packages

I tried to make the tables I need with [PrettyTables.jl](https://ronisbr.github.io/PrettyTables.jl/stable/) and [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/).
On one hand, PrettyTables supports a lot of customisation but doesn't support docx output. 
On the other hand SummaryTables has great docx support, and while its basic building blocks allow you to manually built custom tables, a no dedicated API for this is outside of SummaryTables' scope.

## What was missing

What I was looking for was an accessible way to combine the building blocks provided by SummaryTables.
R's [gt](https://gt.rstudio.com/) package is the clearest model for how this works: first, you construct a table object, then you apply modifier functions one at a time.

StyledTables follows the same incremental approach: each step is a small, focused modification, and you can inspect the result at any stage.

In contrast to R's idiomatic pipe syntax, StyledTables has a more Julian take on iterative table modification: all styling functions are mutating and modify the `StyledTable` in place.

## The workflow

In contrast to SummaryTables, StyledTables provides no data-summarising capabilities.
It assumes you bring summarised data that can be converted to a `DataFrame`.
You typically go through the following steps when working with StyledTables:

1. Summarise your data
2. Convert it to a `StyledTable`
3. Apply styling
4. Render to HTML, LaTeX, Typst, or DOCX
