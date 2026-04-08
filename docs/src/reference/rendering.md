# Rendering

## `render`

Convert a `StyledTable` into a `SummaryTables.Table` for display or for saving to HTML, LaTeX, or Typst. 
In interactive contexts, calling `render` explicitly is optional because `Base.show` automatically `render`s the table.

**Signature:** `render(tbl::StyledTable) -> SummaryTables.Table`

```@example rendering
using StyledTables, DataFrames

df = DataFrame(a = [1, 2], b = ["x", "y"])

tbl = StyledTable(df)
cols_label!(tbl, :a => "A", :b => "B")
render(tbl)
```

The returned `SummaryTables.Table` supports:
- `show(io, MIME"text/html"(), rendered)`
- `show(io, MIME"text/latex"(), rendered)`
- `show(io, MIME"text/typst"(), rendered)`

### Saving to file

See the [SummaryTables.jl docs](https://pumasai.github.io/SummaryTables.jl/stable/reference/renderers) for information on how to save `SummaryTables.Table`s to html, LaTeX, typst or docx.

```@docs
StyledTables.render
```
