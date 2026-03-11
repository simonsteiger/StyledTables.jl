# Documentation Site Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a DocumenterVitepress documentation website for StyledTables.jl covering all API functions and three applied case-study examples.

**Architecture:** `docs/` folder with `make.jl` + `docs/src/` markdown pages, split into a getting-started page, per-function-group reference pages, and applied example pages. DocumenterVitepress provides the VitePress frontend; Documenter.jl handles docstring extraction and page assembly.

**Tech Stack:** Documenter.jl, DocumenterVitepress.jl, DataFrames.jl, StyledTables.jl (the package itself). Markdown pages with fenced Julia code blocks.

---

## Before You Begin (Preflight)

These steps must happen **before** any task in this plan.

- [ ] **Commit current changes to `main`**

  The working tree currently has modified files (`CLAUDE.md`, `src/StyledTables.jl`,
  `src/modifiers.jl`, `test/runtests.jl`). Commit them to `main` first:

  ```bash
  git add CLAUDE.md src/StyledTables.jl src/modifiers.jl test/runtests.jl
  git commit -m "chore: pre-docs cleanup"
  ```

- [ ] **Create and checkout a `docs-site` branch**

  ```bash
  git checkout -b docs-site
  ```

- [ ] **Relocate existing plan files out of `docs/`**

  Documenter.jl uses the `docs/` directory. Development plans in `docs/plans/`
  and `docs/superpowers/` are not user-facing documentation and must move to
  avoid confusing Documenter's build step.

  Move them to `notes/` at the repository root:

  ```bash
  mkdir -p notes/plans
  git mv docs/plans/* notes/plans/
  git mv docs/superpowers notes/superpowers
  git commit -m "chore: move dev plans out of docs/ to notes/"
  ```

  > **Update memory:** Plans are now saved under `notes/superpowers/plans/` in this repo.

---

## File Structure

**Create:**
- `docs/Project.toml` — docs environment (Documenter, DocumenterVitepress, DataFrames, StyledTables)
- `docs/make.jl` — Documenter.makedocs() with VitePress theme
- `docs/.gitignore` — ignore `docs/build/` and `node_modules/`
- `docs/src/index.md` — landing page with overview and quick example
- `docs/src/getting_started.md` — installation + first table walkthrough
- `docs/src/reference/columns.md` — cols_label, cols_align, cols_hide, cols_move
- `docs/src/reference/structure.md` — tab_spanner, tab_stub, tab_stubhead, tab_row_group
- `docs/src/reference/annotations.md` — tab_header, tab_footnote, tab_source_note
- `docs/src/reference/styling.md` — tab_style, sub_missing, tab_options
- `docs/src/reference/formatting.md` — fmt_number, fmt_percent, fmt_integer, fmt
- `docs/src/reference/rendering.md` — render()
- `docs/src/examples/index.md` — examples overview
- `docs/src/examples/cars.md` — applied case study: sports cars performance table
- `docs/src/examples/clinical.md` — applied case study: clinical demographics table
- `docs/src/examples/report.md` — applied case study: quarterly financial report

**Modify:**
- `src/fmt.jl` — already has docstrings; verify they're complete
- `src/modifiers.jl` — add docstrings for all exported functions
- `src/render.jl` — add docstring for `render()`

---

## Chunk 1: Infrastructure and Getting Started

### Task 1: Set up docs environment

> **Use the `documenter-vitepress` skill for this task.**

**Files:**
- Create: `docs/Project.toml`
- Create: `docs/make.jl`
- Create: `docs/.gitignore`

- [ ] **Step 1: Invoke the documenter-vitepress skill**

  Before writing any files, invoke `Skill("documenter-vitepress")` to load the skill and follow its instructions for setting up the environment.

- [ ] **Step 2: Create `docs/Project.toml`**

```toml
name = "docs"

[deps]
DataFrames = "a93c6f00-e57d-5684-b466-afe8fa294f38"
Documenter = "e30172f5-a6a5-5a46-863b-614d45cd2de4"
DocumenterVitepress = "4710194d-e776-4ef7-8cae-3e8d56f39f51"
StyledTables = "..."   # fill in UUID from Project.toml

[compat]
julia = "1"
```

  > **Note:** Copy the StyledTables UUID from the root `Project.toml`.

- [ ] **Step 3: Verify UUID and update Project.toml**

  Read `/Users/simonsteiger/.julia/dev/SummaryTablesExtras/Project.toml` to get the StyledTables UUID, then update `docs/Project.toml`.

- [ ] **Step 4: Create `docs/make.jl`**

```julia
using Documenter
using DocumenterVitepress
using StyledTables
using DataFrames

makedocs(;
    sitename = "StyledTables.jl",
    authors = "Simon Steiger",
    modules = [StyledTables],
    format = DocumenterVitepress.MarkdownVitepress(
        repo = "github.com/simonsteiger/StyledTables.jl",
    ),
    pages = [
        "Home" => "index.md",
        "Getting Started" => "getting_started.md",
        "Reference" => [
            "Column Modifiers" => "reference/columns.md",
            "Table Structure" => "reference/structure.md",
            "Annotations" => "reference/annotations.md",
            "Styling & Options" => "reference/styling.md",
            "Formatting" => "reference/formatting.md",
            "Rendering" => "reference/rendering.md",
        ],
        "Examples" => [
            "Overview" => "examples/index.md",
            "Sports Cars Table" => "examples/cars.md",
            "Clinical Demographics" => "examples/clinical.md",
            "Quarterly Report" => "examples/report.md",
        ],
    ],
    warnonly = true,
)
```

- [ ] **Step 5: Create `docs/.gitignore`**

```
build/
node_modules/
.vitepress/dist/
.vitepress/cache/
```

- [ ] **Step 6: Instantiate the docs environment**

  Using the Julia MCP server:
  ```julia
  using Pkg
  Pkg.activate("docs")
  Pkg.develop(path=".")   # add StyledTables from local source
  Pkg.instantiate()
  ```

- [ ] **Step 7: Create `docs/src/` directory tree**

  ```bash
  mkdir -p docs/src/reference docs/src/examples
  ```

- [ ] **Step 8: Run makedocs to verify wiring**

  Using the Julia MCP server:
  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```
  Expected: warnings about missing pages (not yet written), but no crashes.

- [ ] **Step 9: Commit scaffold**

  ```bash
  git add docs/Project.toml docs/make.jl docs/.gitignore docs/src/
  git commit -m "docs: scaffold DocumenterVitepress environment"
  ```

---

### Task 2: Write `docs/src/index.md` and `docs/src/getting_started.md`

**Files:**
- Create: `docs/src/index.md`
- Create: `docs/src/getting_started.md`

- [ ] **Step 1: Write `docs/src/index.md`**

```markdown
# StyledTables.jl

**StyledTables.jl** is a GT-style table builder for Julia. It provides a pipe-friendly
API for turning a `DataFrame` into a polished, publication-ready table rendered in
HTML, LaTeX, and Typst.

Rendering is handled by [SummaryTables.jl](https://github.com/PumasAI/SummaryTables.jl)
as the backend; StyledTables layers a declarative modifier API on top.

## Quick example

```julia
using StyledTables, DataFrames

df = DataFrame(
    name  = ["Alice", "Bob", "Carol"],
    score = [92.5, 87.0, 95.3],
    grade = ["A", "B", "A"],
)

df |> StyledTable() |>
    tab_header("Student Results"; subtitle = "Spring 2026") |>
    cols_label(name = "Student", score = "Score", grade = "Grade") |>
    cols_align(:center, [:score, :grade]) |>
    fmt_number(:score; digits = 1) |>
    render()
```

## Installation

```julia
using Pkg
Pkg.add("StyledTables")
```
```

- [ ] **Step 2: Write `docs/src/getting_started.md`**

```markdown
# Getting Started

## Installation

```julia
using Pkg
Pkg.add("StyledTables")
```

## Your first table

Every StyledTables pipeline starts with a `DataFrame` and ends with `render()`.

```julia
using StyledTables, DataFrames

df = DataFrame(
    treatment = ["Placebo", "Low Dose", "High Dose"],
    n         = [30, 30, 30],
    response  = [0.12, 0.38, 0.61],
)

df |> StyledTable() |> render()
```

The `StyledTable()` call wraps your `DataFrame`. Calling `render()` converts it to
a `SummaryTables.Table`, which displays in Jupyter, Pluto, or any Documenter page.

## Adding a title

```julia
df |> StyledTable() |>
    tab_header("Treatment Response"; subtitle = "Phase II Clinical Trial") |>
    render()
```

## Relabeling and aligning columns

```julia
df |> StyledTable() |>
    tab_header("Treatment Response") |>
    cols_label(treatment = "Treatment Arm", n = "N", response = "Response Rate") |>
    cols_align(:center, [:n, :response]) |>
    render()
```

## Grouping columns under a spanner

```julia
df |> StyledTable() |>
    tab_header("Treatment Response") |>
    cols_label(treatment = "Treatment Arm", n = "N", response = "Response Rate") |>
    tab_spanner("Results"; columns = [:n, :response]) |>
    render()
```

## Formatting numbers

```julia
df |> StyledTable() |>
    tab_header("Treatment Response") |>
    cols_label(treatment = "Treatment Arm", n = "N", response = "Response Rate") |>
    tab_spanner("Results"; columns = [:n, :response]) |>
    fmt_percent(:response; digits = 1) |>
    render()
```

## Next steps

- See **Reference** for the full API.
- See **Examples** for applied, real-world case studies.
```

- [ ] **Step 3: Verify makedocs runs without errors on these pages**

  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```

- [ ] **Step 4: Preview docs locally**

  > **Follow the `documenter-vitepress` skill instructions for local preview.**

- [ ] **Step 5: Commit**

  ```bash
  git add docs/src/index.md docs/src/getting_started.md
  git commit -m "docs: add index and getting started pages"
  ```

---

## Chunk 2: Reference Pages

### Task 3: Write `docs/src/reference/columns.md`

**Files:**
- Create: `docs/src/reference/columns.md`

This page covers: `cols_label`, `cols_align`, `cols_hide`, `cols_move`.

- [ ] **Step 1: Write the page**

```markdown
# Column Modifiers

These functions control column display names, alignment, visibility, and order.

---

## `cols_label`

Rename one or more columns for display. Column names in the underlying
`DataFrame` are not changed.

**Signature:** `cols_label(; kwargs...)`

Each keyword argument maps a column `Symbol` to its display label. Labels can
be plain strings or any value supported by `SummaryTables.Cell`.

```julia
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

df |> StyledTable() |>
    cols_label(bmi = "BMI (kg/m²)", sbp = "Systolic BP (mmHg)") |>
    render()
```

---

## `cols_align`

Set horizontal alignment for one or more columns. Valid values: `:left`,
`:center`, `:right`.

**Signatures:**
- `cols_align(halign, columns)` — apply to specific columns
- `cols_align(halign)` — apply to all columns

```julia
df |> StyledTable() |>
    cols_align(:right, [:bmi, :sbp]) |>
    render()
```

Align all columns at once:

```julia
df |> StyledTable() |>
    cols_align(:center) |>
    render()
```

---

## `cols_hide`

Remove columns from the rendered table without dropping them from the data.
Useful when a column is needed for grouping (`tab_row_group`) but should not
appear in the output.

**Signature:** `cols_hide(cols::Symbol...)`

```julia
df = DataFrame(
    group     = ["A", "A", "B", "B"],
    subject   = ["S1", "S2", "S3", "S4"],
    score     = [88, 92, 75, 84],
    pct_score = [0.88, 0.92, 0.75, 0.84],
)

df |> StyledTable() |>
    tab_row_group(:group) |>
    cols_hide(:group) |>
    cols_label(subject = "Subject", score = "Score", pct_score = "Score (%)") |>
    fmt_percent(:pct_score; digits = 0) |>
    render()
```

---

## `cols_move`

Reorder columns. By default, the specified columns are moved to the front.
Use `after = :col` to insert them after a specific column.

**Signatures:**
- `cols_move(cols)` — move `cols` to the beginning
- `cols_move(cols; after = :anchor_col)` — move `cols` after `:anchor_col`

```julia
df = DataFrame(id = 1:3, name = ["A","B","C"], value = [10, 20, 30])

# Move :name to front
df |> StyledTable() |>
    cols_move([:name]) |>
    render()

# Move :value after :name
df |> StyledTable() |>
    cols_move([:value]; after = :name) |>
    render()
```
```

- [ ] **Step 2: Add docstrings to `src/modifiers.jl` for `cols_label`, `cols_align`, `cols_hide`, `cols_move`**

  Each docstring follows the pattern:
  ```julia
  """
      cols_label(; kwargs...)

  Rename columns for display. Each keyword argument maps a column `Symbol` to
  its display label (plain string or any `Cell`-compatible value).

  # Examples
  ```julia
  df |> StyledTable() |> cols_label(x = "Variable X", y = "Variable Y") |> render()
  ```
  """
  function cols_label(; kwargs...)
  ```

  Repeat for `cols_align`, `cols_hide`, `cols_move`.

- [ ] **Step 3: Add `@autodocs` or `@docs` blocks to the reference page**

  After each manual example section, add:
  ````markdown
  ```@docs
  StyledTables.cols_label
  StyledTables.cols_align
  StyledTables.cols_hide
  StyledTables.cols_move
  ```
  ````

- [ ] **Step 4: Run makedocs and verify no docstring warnings**

  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add src/modifiers.jl docs/src/reference/columns.md
  git commit -m "docs: add column modifiers reference page + docstrings"
  ```

---

### Task 4: Write `docs/src/reference/structure.md`

**Files:**
- Create: `docs/src/reference/structure.md`

Covers: `tab_spanner`, `tab_stub`, `tab_stubhead`, `tab_row_group`.

- [ ] **Step 1: Write the page**

````markdown
# Table Structure

These functions control the high-level layout: grouped column headers, a stub
(row label) column, and grouped row sections.

---

## `tab_spanner`

Add a spanning header above a group of columns.

**Signature:** `tab_spanner(label; columns::Vector{Symbol})`

```julia
using StyledTables, DataFrames

df = DataFrame(
    drug = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
    safety = [0.91, 0.84, 0.88],
)

df |> StyledTable() |>
    tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |>
    cols_label(
        drug     = "Drug",
        dose_mg  = "Dose (mg)",
        efficacy = "Efficacy",
        safety   = "Safety",
    ) |>
    fmt_percent([:efficacy, :safety]; digits = 1) |>
    render()
```

Multiple spanners can be stacked:

```julia
df |> StyledTable() |>
    tab_spanner("Dosing"; columns = [:dose_mg]) |>
    tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |>
    render()
```

---

## `tab_stub`

Designate one column as the **stub** — a row-label column rendered with special
formatting (no bold header by default, distinct from data columns).

**Signature:** `tab_stub(col::Symbol)`

```julia
df |> StyledTable() |>
    tab_stub(:drug) |>
    cols_label(dose_mg = "Dose (mg)", efficacy = "Efficacy", safety = "Safety") |>
    render()
```

---

## `tab_stubhead`

Set a label for the stub column header. Only takes effect when `tab_stub` has
been applied.

**Signature:** `tab_stubhead(label)`

```julia
df |> StyledTable() |>
    tab_stub(:drug) |>
    tab_stubhead("Drug Name") |>
    render()
```

---

## `tab_row_group`

Group rows by the values of a column. A bold group-label row is inserted before
each new group value. Data rows are indented.

**Signature:** `tab_row_group(col::Symbol; indent_pt = 12)`

```julia
df = DataFrame(
    category = ["Analgesic", "Analgesic", "NSAID", "NSAID"],
    drug     = ["Aspirin", "Paracetamol", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 500, 200, 250],
)

df |> StyledTable() |>
    tab_row_group(:category) |>
    cols_hide(:category) |>
    cols_label(drug = "Drug", dose_mg = "Dose (mg)") |>
    render()
```

Increase indentation:

```julia
df |> StyledTable() |>
    tab_row_group(:category; indent_pt = 20) |>
    cols_hide(:category) |>
    render()
```
````

- [ ] **Step 2: Add docstrings to `src/modifiers.jl` for the four functions**

  Same pattern as Task 3. One `"""..."""` block per function with `# Examples`.

- [ ] **Step 3: Add `@docs` blocks to the page**

- [ ] **Step 4: Run makedocs**

- [ ] **Step 5: Commit**

  ```bash
  git add src/modifiers.jl docs/src/reference/structure.md
  git commit -m "docs: add table structure reference page + docstrings"
  ```

---

### Task 5: Write `docs/src/reference/annotations.md`

**Files:**
- Create: `docs/src/reference/annotations.md`

Covers: `tab_header`, `tab_footnote`, `tab_source_note`.

- [ ] **Step 1: Write the page**

````markdown
# Annotations

These functions add metadata to the table: a title and subtitle at the top,
footnotes at the bottom, and source notes in the footer.

---

## `tab_header`

Add a title (and optional subtitle) above the column headers.

**Signature:** `tab_header(title; subtitle = nothing)`

```julia
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

df |> StyledTable() |>
    tab_header("GDP by Country"; subtitle = "Trillions USD, 2025") |>
    cols_label(country = "Country", gdp = "GDP") |>
    fmt_number(:gdp; digits = 1) |>
    render()
```

---

## `tab_footnote`

Add a footnote. Without `columns`, the text appears as a table-level note.
With `columns`, an auto-numbered superscript is appended to those column
headers and the footnote text is listed below.

**Signatures:**
- `tab_footnote(text)` — table-level footnote
- `tab_footnote(text; columns = [:col1, :col2])` — column-annotated footnote

```julia
df |> StyledTable() |>
    tab_header("GDP by Country") |>
    tab_footnote("Source: World Bank (2025)") |>
    render()
```

Annotating a specific column:

```julia
df |> StyledTable() |>
    tab_footnote("Purchasing power parity adjusted"; columns = [:gdp]) |>
    render()
```

---

## `tab_source_note`

Add a source-note line in the table footer. Source notes appear below any data
rows and span the full table width.

**Signature:** `tab_source_note(text)`

```julia
df |> StyledTable() |>
    tab_header("GDP by Country") |>
    tab_source_note("Data: World Bank Open Data") |>
    tab_source_note("Values in trillions USD") |>
    render()
```
````

- [ ] **Step 2: Add docstrings to `src/modifiers.jl`**

- [ ] **Step 3: Add `@docs` blocks**

- [ ] **Step 4: Run makedocs**

- [ ] **Step 5: Commit**

  ```bash
  git add src/modifiers.jl docs/src/reference/annotations.md
  git commit -m "docs: add annotations reference page + docstrings"
  ```

---

### Task 6: Write `docs/src/reference/styling.md`

**Files:**
- Create: `docs/src/reference/styling.md`

Covers: `tab_style`, `sub_missing`, `tab_options`.

- [ ] **Step 1: Write the page**

````markdown
# Styling & Options

---

## `tab_style`

Apply inline styling (color, bold, italic, underline) to all body cells in
specified columns. Colors are hex strings (`"#RRGGBB"`).

**Signature:**
```julia
tab_style(columns; color=nothing, bold=nothing, italic=nothing, underline=nothing)
```

```julia
using StyledTables, DataFrames

df = DataFrame(
    metric  = ["Revenue", "EBITDA", "Net Income"],
    q1      = [1.2, 0.3, 0.18],
    q2      = [1.4, 0.35, 0.21],
    yoy_pct = [0.12, 0.08, 0.14],
)

df |> StyledTable() |>
    tab_header("Q2 2026 Financial Summary") |>
    tab_style([:yoy_pct]; color = "#1a7340", bold = true) |>
    fmt_percent(:yoy_pct; digits = 1) |>
    cols_label(
        metric  = "Metric",
        q1      = "Q1 (€B)",
        q2      = "Q2 (€B)",
        yoy_pct = "YoY Change",
    ) |>
    render()
```

---

## `sub_missing`

Replace `missing` values with a placeholder string for display. Defaults to
`"—"` (em dash).

**Signature:** `sub_missing(; with = "—")`

```julia
df = DataFrame(
    group = ["A", "A", "B", "B"],
    value = [1.2, missing, 3.4, missing],
)

df |> StyledTable() |>
    sub_missing() |>
    render()

# Custom placeholder:
df |> StyledTable() |>
    sub_missing(with = "N/A") |>
    render()
```

---

## `tab_options`

Set global rounding options for all numeric cells in the table.

**Signature:**
```julia
tab_options(; round_digits=nothing, round_mode=nothing, trailing_zeros=nothing)
```

- `round_digits` — number of decimal places or significant digits
- `round_mode` — `:auto`, `:digits`, or `:sigdigits`
- `trailing_zeros` — if `true`, pad with zeros to `round_digits` places

```julia
df = DataFrame(a = [1.23456, 7.891], b = [100.0, 200.0])

# Round to 2 significant digits
df |> StyledTable() |>
    tab_options(round_digits = 2, round_mode = :sigdigits) |>
    render()

# Fixed 3 decimal places with trailing zeros
df |> StyledTable() |>
    tab_options(round_digits = 3, round_mode = :digits, trailing_zeros = true) |>
    render()
```
````

- [ ] **Step 2: Add docstrings to `src/modifiers.jl`**

- [ ] **Step 3: Add `@docs` blocks**

- [ ] **Step 4: Run makedocs**

- [ ] **Step 5: Commit**

  ```bash
  git add src/modifiers.jl docs/src/reference/styling.md
  git commit -m "docs: add styling & options reference page + docstrings"
  ```

---

### Task 7: Write `docs/src/reference/formatting.md` and `docs/src/reference/rendering.md`

**Files:**
- Create: `docs/src/reference/formatting.md`
- Create: `docs/src/reference/rendering.md`

- [ ] **Step 1: Write `formatting.md`**

````markdown
# Formatting

Formatter functions convert raw cell values to display strings **before** styling
is applied. They are column-scoped: each formatter is associated with one or more
columns.

> `fmt_*` functions do not change the underlying `DataFrame` — they only affect
> how values look in the rendered output.

---

## `fmt_number`

Format to a fixed number of decimal places.

**Signature:** `fmt_number(cols; digits=2, trailing_zeros=true)`

```julia
using StyledTables, DataFrames

df = DataFrame(x = [1.2345, 6.789], y = [100.0, 0.001])

df |> StyledTable() |>
    fmt_number(:x; digits = 3) |>
    fmt_number(:y; digits = 2) |>
    render()
```

---

## `fmt_percent`

Multiply by `scale` (default `100`) and append `suffix` (default `"%"`).

**Signature:** `fmt_percent(cols; digits=1, scale=100, suffix="%")`

```julia
df = DataFrame(rate = [0.123, 0.456, 0.789])

df |> StyledTable() |>
    fmt_percent(:rate; digits = 1) |>
    render()
```

Already-scaled values (e.g., stored as 12.3 meaning 12.3%):

```julia
df2 = DataFrame(rate = [12.3, 45.6, 78.9])
df2 |> StyledTable() |>
    fmt_percent(:rate; digits = 1, scale = 1) |>
    render()
```

---

## `fmt_integer`

Round to the nearest integer and display without a decimal point.

**Signature:** `fmt_integer(cols)`

```julia
df = DataFrame(count = [12.6, 7.2, 100.9])

df |> StyledTable() |>
    fmt_integer(:count) |>
    render()
```

---

## `fmt`

Apply a fully custom formatter function.

**Signature:** `fmt(cols, f::Function)`

```julia
df = DataFrame(p_value = [0.032, 0.001, 0.245])

df |> StyledTable() |>
    fmt(:p_value, x -> x < 0.05 ? "$(round(x; digits=3))*" : string(round(x; digits=3))) |>
    render()
```

Multiple columns at once:

```julia
df = DataFrame(a = [1.0, 2.0], b = [3.0, 4.0])

df |> StyledTable() |>
    fmt([:a, :b], x -> "$(Int(x)) pts") |>
    render()
```
````

- [ ] **Step 2: Write `rendering.md`**

````markdown
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

The returned `SummaryTables.Table` supports `show(io, MIME"text/html"(), tbl)`,
`show(io, MIME"text/latex"(), tbl)`, and `show(io, MIME"text/typst"(), tbl)`.

### Saving to file

```julia
using StyledTables, DataFrames

tbl = DataFrame(x = [1,2,3]) |> StyledTable() |> render()

# HTML
open("table.html", "w") do io
    show(io, MIME"text/html"(), tbl)
end

# LaTeX
open("table.tex", "w") do io
    show(io, MIME"text/latex"(), tbl)
end
```
````

- [ ] **Step 3: Add docstrings to `src/render.jl`**

  ```julia
  """
      render(tbl::StyledTable) -> SummaryTables.Table

  Convert a `StyledTable` into a renderable `SummaryTables.Table`.

  Applies all modifiers registered on `tbl` (labels, spanners, formatters,
  styles, row groups, etc.) and assembles the cell matrix.

  # Examples
  ```julia
  using StyledTables, DataFrames
  df = DataFrame(a = [1, 2], b = ["x", "y"])
  df |> StyledTable() |> cols_label(a = "A", b = "B") |> render()
  ```
  """
  function render(tbl::StyledTable)
  ```

- [ ] **Step 4: Run makedocs**

- [ ] **Step 5: Commit**

  ```bash
  git add src/render.jl docs/src/reference/formatting.md docs/src/reference/rendering.md
  git commit -m "docs: add formatting and rendering reference pages + docstrings"
  ```

---

## Chunk 3: Applied Examples

### Task 8: Write `docs/src/examples/index.md` and `docs/src/examples/cars.md`

**Files:**
- Create: `docs/src/examples/index.md`
- Create: `docs/src/examples/cars.md`

This example is inspired by the [gt gtcars case study](https://gt.rstudio.com/articles/case-study-gtcars.html). It demonstrates a realistic reporting workflow: starting with raw data, hiding auxiliary columns, reordering, grouping, adding spanners, formatting, and styling.

- [ ] **Step 1: Write `examples/index.md`**

```markdown
# Applied Examples

These examples demonstrate how to combine multiple StyledTables modifiers into
production-quality tables for real-world use cases.

| Example | Features used |
|---------|---------------|
| [Sports Cars Table](cars.md) | `tab_row_group`, `cols_hide`, `cols_move`, `tab_spanner`, `tab_style`, `fmt_number`, `tab_footnote` |
| [Clinical Demographics](clinical.md) | `tab_stub`, `tab_stubhead`, `tab_spanner`, `fmt_percent`, `fmt_number`, `sub_missing`, `tab_footnote`, `tab_source_note` |
| [Quarterly Report](report.md) | `tab_header`, `tab_options`, `fmt_number`, `cols_align`, `tab_style`, `tab_footnote` |
```

- [ ] **Step 2: Write `examples/cars.md`**

````markdown
# Sports Cars Performance Table

This example builds a table comparing sports cars across performance metrics.
We start with all columns, hide the auxiliary ones, group by origin, add a
spanner for performance data, and highlight MSRP.

## The data

```julia
using StyledTables, DataFrames

cars = DataFrame(
    origin   = ["Italy","Italy","Germany","Germany","UK","UK"],
    make     = ["Ferrari","Lamborghini","Porsche","BMW","McLaren","Aston Martin"],
    model    = ["488 GTB","Huracán","911 GT3","M8","720S","Vantage"],
    year     = [2022, 2022, 2022, 2022, 2022, 2022],
    hp       = [660, 610, 503, 617, 710, 503],
    trq_nm   = [760, 560, 470, 750, 770, 625],
    mpg      = [15, 13, 22, 19, 21, 20],
    msrp_eur = [280_000, 210_000, 180_000, 130_000, 220_000, 155_000],
)
```

## Step 1: Basic table with row groups

Group by `:origin`, hide the origin column from view, and give the stub a label.

```julia
cars |> StyledTable() |>
    tab_row_group(:origin) |>
    cols_hide(:origin, :year) |>
    cols_label(
        make     = "Make",
        model    = "Model",
        hp       = "HP",
        trq_nm   = "Torque (Nm)",
        mpg      = "MPG",
        msrp_eur = "MSRP (€)",
    ) |>
    render()
```

## Step 2: Add a spanner for performance metrics

```julia
cars |> StyledTable() |>
    tab_row_group(:origin) |>
    cols_hide(:origin, :year) |>
    cols_label(
        make     = "Make",
        model    = "Model",
        hp       = "HP",
        trq_nm   = "Torque (Nm)",
        mpg      = "MPG",
        msrp_eur = "MSRP (€)",
    ) |>
    tab_spanner("Performance"; columns = [:hp, :trq_nm, :mpg]) |>
    render()
```

## Step 3: Move MSRP next to Make, format it, and highlight it

```julia
cars |> StyledTable() |>
    tab_header("Sports Cars — 2022 Model Year"; subtitle = "Selected European manufacturers") |>
    tab_row_group(:origin) |>
    cols_hide(:origin, :year) |>
    cols_move([:msrp_eur]; after = :model) |>
    cols_label(
        make     = "Make",
        model    = "Model",
        msrp_eur = "MSRP (€)",
        hp       = "HP",
        trq_nm   = "Torque (Nm)",
        mpg      = "MPG",
    ) |>
    tab_spanner("Performance"; columns = [:hp, :trq_nm, :mpg]) |>
    fmt(
        :msrp_eur,
        x -> "€" * replace(string(x), r"(\d)(?=(\d{3})+$)" => s"\1,"),
    ) |>
    cols_align(:right, [:msrp_eur, :hp, :trq_nm, :mpg]) |>
    tab_style([:msrp_eur]; bold = true) |>
    tab_footnote("City/highway combined estimate"; columns = [:mpg]) |>
    tab_source_note("Source: manufacturer specifications") |>
    render()
```

The final table groups cars by origin country, shows a spanner over the three
performance columns, formats MSRP with a currency prefix, and bolds those values
to draw attention to price. A footnote on MPG clarifies the measurement basis.
````

- [ ] **Step 3: Run makedocs and verify**

- [ ] **Step 4: Commit**

  ```bash
  git add docs/src/examples/index.md docs/src/examples/cars.md
  git commit -m "docs: add examples index and cars case study"
  ```

---

### Task 9: Write `docs/src/examples/clinical.md`

**Files:**
- Create: `docs/src/examples/clinical.md`

Inspired by the [gt clinical tables case study](https://gt.rstudio.com/articles/case-study-clinical-tables.html). Demonstrates a demographic summary table as used in clinical trial publications.

- [ ] **Step 1: Write the page**

````markdown
# Clinical Demographics Table

Demographic summary tables appear in nearly every clinical trial report. This
example builds one from scratch: two treatment arms, categorical and continuous
variables, missing data, and regulatory-style footnotes.

## The data

```julia
using StyledTables, DataFrames

demo = DataFrame(
    variable  = [
        "Sex", "Sex", "Sex",
        "Age (years)", "Age (years)", "Age (years)",
        "Race", "Race", "Race", "Race",
    ],
    category  = [
        "Male", "Female", "Unknown",
        "Mean (SD)", "Median", "Range",
        "White", "Black or African American", "Asian", "Other/Unknown",
    ],
    placebo_n   = [22, 28, missing, "48.3 (12.1)", "47", "24–72", 36, 8, 3, 3],
    treatment_n = [19, 30, 1,       "49.7 (11.8)", "50", "22–74", 32, 9, 5, 4],
)
```

## Step 1: Basic stub table with treatment spanners

```julia
demo |> StyledTable() |>
    tab_stub(:category) |>
    tab_row_group(:variable) |>
    cols_hide(:variable) |>
    tab_spanner("Placebo (N=50)"; columns = [:placebo_n]) |>
    tab_spanner("Treatment (N=50)"; columns = [:treatment_n]) |>
    cols_label(
        placebo_n   = "n (%)",
        treatment_n = "n (%)",
    ) |>
    render()
```

## Step 2: Add missing data handling and source notes

```julia
demo |> StyledTable() |>
    tab_header(
        "Baseline Demographic Characteristics";
        subtitle = "Safety Analysis Population",
    ) |>
    tab_stub(:category) |>
    tab_stubhead("Characteristic") |>
    tab_row_group(:variable) |>
    cols_hide(:variable) |>
    tab_spanner("Placebo (N=50)"; columns = [:placebo_n]) |>
    tab_spanner("Treatment (N=50)"; columns = [:treatment_n]) |>
    cols_label(
        placebo_n   = "n (%)",
        treatment_n = "n (%)",
    ) |>
    sub_missing(with = "—") |>
    tab_footnote(
        "Percentages computed on non-missing observations";
        columns = [:placebo_n, :treatment_n],
    ) |>
    tab_source_note("Abbreviations: SD = standard deviation; N = total per arm") |>
    render()
```

The final table presents demographic data in the standard clinical format:
row groups label the variable category, the stub column names the subgroup,
and spanner headers identify each treatment arm. Missing data in the Sex
`Unknown` category is replaced with an em dash.
````

- [ ] **Step 2: Run makedocs and verify**

- [ ] **Step 3: Commit**

  ```bash
  git add docs/src/examples/clinical.md
  git commit -m "docs: add clinical demographics case study"
  ```

---

### Task 10: Write `docs/src/examples/report.md`

**Files:**
- Create: `docs/src/examples/report.md`

- [ ] **Step 1: Write the page**

````markdown
# Quarterly Financial Report Table

This example shows a regional quarterly revenue table: consistent number
formatting, highlighted totals column, and annotated footnotes.

## The data

```julia
using StyledTables, DataFrames

report = DataFrame(
    region = ["North America", "Europe", "Asia-Pacific", "Latin America", "Total"],
    q1     = [4.21, 2.83, 1.94, 0.72, 9.70],
    q2     = [4.55, 3.02, 2.10, 0.81, 10.48],
    q3     = [4.38, 2.91, 2.22, 0.79, 10.30],
    q4     = [5.12, 3.45, 2.67, 0.94, 12.18],
    total  = [18.26, 12.21, 8.93, 3.26, 42.66],
)
```

## Step 1: Headers, alignment, and formatting

```julia
report |> StyledTable() |>
    tab_header("Annual Revenue by Region"; subtitle = "Figures in USD billions") |>
    cols_label(
        region = "Region",
        q1 = "Q1", q2 = "Q2", q3 = "Q3", q4 = "Q4",
        total = "Full Year",
    ) |>
    tab_spanner("Quarterly"; columns = [:q1, :q2, :q3, :q4]) |>
    cols_align(:right, [:q1, :q2, :q3, :q4, :total]) |>
    fmt_number([:q1, :q2, :q3, :q4, :total]; digits = 2) |>
    render()
```

## Step 2: Highlight the totals column and row

```julia
report |> StyledTable() |>
    tab_header("Annual Revenue by Region"; subtitle = "Figures in USD billions") |>
    cols_label(
        region = "Region",
        q1 = "Q1", q2 = "Q2", q3 = "Q3", q4 = "Q4",
        total = "Full Year",
    ) |>
    tab_spanner("Quarterly"; columns = [:q1, :q2, :q3, :q4]) |>
    cols_align(:right, [:q1, :q2, :q3, :q4, :total]) |>
    fmt_number([:q1, :q2, :q3, :q4, :total]; digits = 2) |>
    tab_style([:total]; bold = true) |>
    tab_footnote(
        "Preliminary Q4 figures, subject to audit";
        columns = [:q4],
    ) |>
    tab_source_note("Source: Internal Finance, March 2026") |>
    render()
```

The totals column is bolded to draw the eye. The Q4 footnote annotation flags
preliminary figures, and a source note credits the data origin.
````

- [ ] **Step 2: Run makedocs and verify**

- [ ] **Step 3: Commit**

  ```bash
  git add docs/src/examples/report.md
  git commit -m "docs: add quarterly report case study"
  ```

---

## Chunk 4: Finalize

### Task 11: Local preview, navigation polish, and final commit

> **Use the `documenter-vitepress` skill for local preview.**

**Files:**
- Modify: `docs/make.jl` (navigation tweaks if needed)

- [ ] **Step 1: Run makedocs one final time**

  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```
  Expected: no errors, only informational messages.

- [ ] **Step 2: Launch local VitePress preview**

  Follow the `documenter-vitepress` skill instructions for `npm run dev` or
  equivalent. Verify:
  - Landing page renders
  - All sidebar links navigate correctly
  - Code blocks display with syntax highlighting
  - Tables render in HTML output sections

- [ ] **Step 3: Verify all exported functions have docstrings**

  ```julia
  using Pkg; Pkg.activate(".")
  using StyledTables
  for name in names(StyledTables)
      f = getfield(StyledTables, name)
      if isa(f, Function)
          d = Base.doc(f)
          isempty(string(d)) && @warn "No docstring: $name"
      end
  end
  ```

- [ ] **Step 4: Add GitHub Actions workflow for docs deployment (optional)**

  If the repo has CI, add `.github/workflows/docs.yml`:
  ```yaml
  name: Docs
  on:
    push:
      branches: [main]
  jobs:
    docs:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: julia-actions/setup-julia@v2
          with: { version: '1' }
        - uses: julia-actions/cache@v2
        - run: julia --project=docs -e 'using Pkg; Pkg.develop(PackageSpec(path=pwd())); Pkg.instantiate()'
        - run: julia --project=docs docs/make.jl
        - uses: actions/upload-pages-artifact@v3
          with: { path: docs/build }
      permissions:
        pages: write
        id-token: write
  ```

- [ ] **Step 5: Final commit**

  ```bash
  git add docs/
  git commit -m "docs: complete documentation site with reference pages and applied examples"
  ```

---

## Summary

| Chunk | Tasks | Output |
|-------|-------|--------|
| 1 | 1–2 | docs infrastructure + getting started |
| 2 | 3–7 | six reference pages + docstrings for all exported functions |
| 3 | 8–10 | three applied case-study example pages |
| 4 | 11 | local preview, docstring audit, optional CI |
