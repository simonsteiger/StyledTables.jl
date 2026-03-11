# Annotations

These functions add metadata to the table: a title and subtitle at the top,
footnotes at the bottom, and source notes in the footer.

---

## `tab_header`

Add a title (and optional subtitle) above the column headers.

**Signature:** `tab_header(title; subtitle = nothing)`

```@example annotations
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

df |> StyledTable |>
    tab_header("GDP by Country"; subtitle = "Trillions USD, 2025") |>
    cols_label(country = "Country", gdp = "GDP") |>
    fmt_number(:gdp; digits = 1) |> render
```

```@docs
StyledTables.tab_header
```

---

## `tab_footnote`

Add a footnote. Without `columns`, the text appears as a table-level note.
With `columns`, an auto-numbered superscript is appended to those column
headers and the footnote text is listed below.

**Signatures:**
- `tab_footnote(text)` — table-level footnote
- `tab_footnote(text; columns = [:col1, :col2])` — column-annotated footnote

```@example annotations
df |> StyledTable |>
    tab_header("GDP by Country") |>
    tab_footnote("Source: World Bank (2025)") |> render
```

Annotating a specific column:

```@example annotations
df |> StyledTable |>
    tab_footnote("Purchasing power parity adjusted"; columns = [:gdp]) |> render
```

```@docs
StyledTables.tab_footnote
```

---

## `tab_source_note`

Add a source-note line in the table footer. Source notes appear below any data
rows and span the full table width. Multiple calls stack additional lines.

**Signature:** `tab_source_note(text)`

```@example annotations
df |> StyledTable |>
    tab_header("GDP by Country") |>
    tab_source_note("Data: World Bank Open Data") |>
    tab_source_note("Values in trillions USD") |> render
```

```@docs
StyledTables.tab_source_note
```
