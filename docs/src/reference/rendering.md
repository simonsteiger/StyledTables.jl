# Rendering

## `render`

Convert a `StyledTable` into a `SummaryTables.Table`, which can be displayed
in Jupyter, Pluto, and Documenter pages, and saved to HTML, LaTeX, or Typst.

**Signature:** `render(tbl::StyledTable) -> SummaryTables.Table`

```julia
using StyledTables, DataFrames

df = DataFrame(a = [1, 2], b = ["x", "y"])

tbl = df |> StyledTable() |> cols_label(a = "A", b = "B") |> render()
```

The returned `SummaryTables.Table` supports:
- `show(io, MIME"text/html"(), tbl)`
- `show(io, MIME"text/latex"(), tbl)`
- `show(io, MIME"text/typst"(), tbl)`

### Saving to file

```julia
using StyledTables, DataFrames

tbl = DataFrame(x = [1, 2, 3]) |> StyledTable() |> render()

# HTML
open("table.html", "w") do io
    show(io, MIME"text/html"(), tbl)
end

# LaTeX
open("table.tex", "w") do io
    show(io, MIME"text/latex"(), tbl)
end
```

```@docs
StyledTables.render
```
