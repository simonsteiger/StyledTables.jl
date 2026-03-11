# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Julia Evaluation

Always use the Julia MCP server (`mcp__julia__julia_eval`) to run Julia code. Do NOT use `julia --project=. -e '...'` via Bash.

## Running Tests

```julia
# In the Julia MCP session, activate and run the test environment
using Pkg; Pkg.activate("test"); Pkg.test()
```

To run a single testset, activate the test environment and call `include("test/runtests.jl")` with the relevant `@testset` block isolated.

Reference files are auto-created on first run if missing. To regenerate a stale reference file, delete it and re-run the tests.

## Architecture

**Package name:** `StyledTables` (directory is still named `SummaryTablesExtras/` — a rename in progress on branch `rename-to-styledtables`).

**Pipeline API:**
```julia
tbl = StyledTable(df)
tab_spanner!(tbl, "Label"; columns=[:a,:b])
tab_header!(tbl, "Title")
render(tbl)
```

- `StyledTable(df)` — constructs a `StyledTable` (mutable struct wrapping a DataFrame + styling specs)
- Modifier functions (`cols_label!`, `cols_align!`, `tab_spanner!`, `tab_stub!`, `tab_row_group!`, `tab_header!`, `tab_footnote!`) mutate `tbl` in-place and return `nothing` for direct API usage
- `render(tbl)` — converts `StyledTable` → `SummaryTables.Table` (a `Matrix{Cell}`)

**File layout:**
- `src/types.jl` — `Spanner`, `TableHeader`, `StyledTable` structs
- `src/modifiers.jl` — all modifier functions + `StyledTable()` constructor
- `src/render.jl` — `render()` and private `_build_*` helpers
- `test/runtests.jl` — reference-based test suite using `ReferenceTests.jl`
- `test/references/<feature>/<scenario>.{txt,latex.txt,typ.txt}` — golden files (HTML/LaTeX/Typst)

**`render()` assembly pattern:**
```julia
parts = Matrix{Cell}[]
append!(parts, title_rows)          # 0–2 rows (title + optional subtitle)
push!(parts, spanner_row)           # optional
push!(parts, header_row)            # column labels
push!(parts, body)                  # data rows (with optional group header rows)
cells = reduce(vcat, parts)
return Table(cells; header = n_header_rows, footnotes = tbl.footnotes)
```

## Key Conventions

**Column validation** — all modifiers compute `colnames = Symbol.(names(tbl.data))` once, then check:
```julia
col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
```

**Reference tests** — `run_reftest(tbl, relpath)` renders a `StyledTable` and calls `@test_reference` for all three output formats (HTML `.txt`, LaTeX `.latex.txt`, Typst `.typ.txt`). No compiler binaries are needed; comparison is pure text.

**Test dependencies** — `ReferenceTests` lives only in `[extras]` in the root `Project.toml`; the test environment is `test/Project.toml` + `test/Manifest.toml`. If the package is renamed, both files must be updated.

## SummaryTables.jl Primitives

- `Cell(value; bold, italic, halign, valign, indent_pt, merge, mergegroup)` — leaf cell
- `Table(matrix; header=N, footnotes=[])` — `header=N` means first N rows are the header section
