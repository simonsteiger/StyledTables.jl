# Rendering

## `render`

Convert a `StyledTable` into a `SummaryTables.Table`, which can be displayed
in Jupyter, Pluto, and Documenter pages, and saved to HTML, LaTeX, or Typst.

**Signature:** `render(tbl::StyledTable) -> SummaryTables.Table`

```@example rendering
using StyledTables, DataFrames

df = DataFrame(a = [1, 2], b = ["x", "y"])

tbl = StyledTable(df)
cols_label!(tbl, :a => "A", :b => "B")
render(tbl)
```

The returned `SummaryTables.Table` supports:
- `show(io, MIME"text/html"(), tbl)`
- `show(io, MIME"text/latex"(), tbl)`
- `show(io, MIME"text/typst"(), tbl)`

### Saving to file

```@example rendering
tbl = StyledTable(DataFrame(x = [1, 2, 3]))
rendered = render(tbl)

# HTML
open("table.html", "w") do io
    show(io, MIME"text/html"(), rendered)
end

# LaTeX
open("table.tex", "w") do io
    show(io, MIME"text/latex"(), rendered)
end
```

```@docs
StyledTables.render
```
