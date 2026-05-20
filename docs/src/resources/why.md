# Why StyledTables.jl?

The most common file type being sent around in clinical and applied research is still docx (love it or hate it), and the existing packages either did not support docx or did not provide a high level interface for custom table styling.

## Existing table-styling packages

I tried to make the tables I need with [PrettyTables.jl](https://ronisbr.github.io/PrettyTables.jl/stable/) and [SummaryTables.jl](https://pumasai.github.io/SummaryTables.jl/stable/).
These are without doubt two excellent packages!
However, neither of them _quite_ did what I needed: while PrettyTables supports a lot of customisation, it doesn't support docx output. 
On the other hand SummaryTables has great docx support, and while its basic building blocks allow you to manually built custom tables, a dedicated API for this _not_ the stated goal of SummaryTables.

You probably guessed it by now: I was looking for R's [gt](https://gt.rstudio.com/) in Julia.
I wrote – with the help of Claude Code – this package with gt in mind: a StyledTables workflow chains commands that specify how the table should be formatted.
In contrast to R's idiomatic pipe syntax, StyledTables has a more Julian take on this chain: all styling functions are mutating and modify the `StyledTable` in place.
