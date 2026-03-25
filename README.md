# StyledTables.jl

<div align="center">
    <picture>
      <img alt="StyledTables.jl logo"
        src="/docs/src/assets/logo.svg" width="150">
    </picture>
</div>

[![Build Status](https://github.com/simonsteiger/StyledTables.jl/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/simonsteiger/StyledTables.jl/actions/workflows/CI.yml?query=branch%3Amain)

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
using DataFrames, StyledTables

df = DataFrame(
    group  = ["A", "A", "B", "B"],
    name   = ["alpha", "beta", "gamma", "delta"],
    value  = [1.234, 5.678, 9.012, 3.456],
    rate   = [0.12, 0.34, 0.56, 0.78],
)

tbl = StyledTable(df)

tab_header!(tbl, "Results Summary"; subtitle="Groups A and B")
cols_label!(tbl, :name => "Item", :value => "Value", :rate => "Rate")
tab_spanner!(tbl, "Measurements" => [:value, :rate])
tab_row_group!(tbl, :group)
fmt_number!(tbl, [:value]; digits=2)
fmt_percent!(tbl, [:rate]; digits=1)

render(tbl)
```

## Key Functions

| Function | Purpose |
|---|---|
| `StyledTable` | Wrap a `DataFrame` in a `StyledTable` for styling |
| `render` | Convert a `StyledTable` to a `SummaryTables.Table` for display or export |
| `cols_label!` | Rename columns in the rendered output |
| `cols_align!` | Set horizontal alignment for one or more columns |
| `cols_hide!` | Exclude columns from the rendered output |
| `tab_header!` | Add a title and optional subtitle above the table |
| `tab_spanner!` | Add a spanner label spanning multiple columns |
| `tab_stub!` | Designate a row-label (stub) column |
| `tab_row_group!` | Group rows by a categorical column |
| `tab_footnote!` | Add a table-level or column-annotated footnote |
| `tab_source_note!` | Add a source note below the table |
| `tab_style!` | Apply color, bold, italic, or underline styling to column cells |
| `sub_missing!` | Replace `missing` values with a display value |
| `tab_options!` | Set global rounding options (digits, mode, trailing zeros) |
| `fmt_number!` | Format numeric columns to a fixed number of decimal places |
| `fmt_percent!` | Format numeric columns as percentage strings |
| `fmt_integer!` | Format numeric columns as integers |
| `fmt!` | Apply a custom formatter function to one or more columns |

## Documentation

Full API reference and examples: <https://simonsteiger.github.io/StyledTables.jl>

## License

MIT
