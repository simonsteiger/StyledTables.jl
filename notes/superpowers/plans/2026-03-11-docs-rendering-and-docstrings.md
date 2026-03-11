# Docs Rendering Fix + Docstring Revision Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix table rendering in docs (convert `julia` blocks to `@example` blocks) and revise all docstrings to follow the `julia-docstrings` skill conventions (DocStringExtensions, full argument docs, cross-references).

**Architecture:**
- **Rendering fix:** Documenter.jl only executes `` ```@example ``` `` blocks and captures the last expression's HTML `show` output. Our examples use `` ```julia ``` `` which are inert. Changing the fence token and making examples self-contained is the entire fix. Additionally, adding `Base.show` methods to `StyledTable` itself (delegating to `render()`) enables auto-display in Jupyter/REPL.
- **Docstrings:** Add `DocStringExtensions` as a dep and rewrite all exported-function docstrings using the standard template: `$TYPEDSIGNATURES`, `# Arguments`, `# Keywords`, `# Returns`, `See also:`. Add `$TYPEDEF`/`$TYPEDFIELDS` to structs.

**Tech Stack:** Julia, DocStringExtensions.jl, Documenter.jl `@example` blocks.

---

## File Structure

**Modify:**
- `Project.toml` — add `DocStringExtensions` to `[deps]`
- `docs/Project.toml` — add `DocStringExtensions` to docs env (for doctest evaluation)
- `src/StyledTables.jl` — `using DocStringExtensions`, module-level docstring with `$EXPORTS`
- `src/types.jl` — add `$TYPEDEF`/`$TYPEDFIELDS` docstrings to all structs
- `src/modifiers.jl` — revise all function docstrings with full template
- `src/fmt.jl` — revise all function docstrings with full template
- `src/render.jl` — add `Base.show` methods; revise `render` docstring
- `docs/src/index.md` — convert quick-example block to `@example`
- `docs/src/getting_started.md` — convert all blocks to `@example`
- `docs/src/reference/columns.md` — convert to `@example` with named environments
- `docs/src/reference/structure.md` — convert to `@example` with named environments
- `docs/src/reference/annotations.md` — convert to `@example` with named environments
- `docs/src/reference/styling.md` — convert to `@example` with named environments
- `docs/src/reference/formatting.md` — convert to `@example` with named environments
- `docs/src/reference/rendering.md` — convert to `@example`
- `docs/src/examples/cars.md` — convert to named `@example cars` environment
- `docs/src/examples/clinical.md` — convert to named `@example clinical` environment
- `docs/src/examples/report.md` — convert to named `@example report` environment

---

## Chunk 1: Base.show methods + DocStringExtensions setup

### Task 1: Add `Base.show` methods to `StyledTable`

**Files:**
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

These three methods let `StyledTable` display as a rendered table anywhere Julia
renders rich output (Jupyter, Pluto, Documenter `@example` blocks) — without the
user needing to call `render()` explicitly.

- [ ] **Step 1: Add `Base.show` methods at the end of `src/render.jl`**

```julia
# Allow StyledTable to be displayed directly without an explicit render() call.
# Delegates to render() and forwards to SummaryTables.Table's show methods.
function Base.show(io::IO, mime::MIME"text/html", tbl::StyledTable)
    show(io, mime, render(tbl))
end

function Base.show(io::IO, mime::MIME"text/latex", tbl::StyledTable)
    show(io, mime, render(tbl))
end

function Base.show(io::IO, mime::MIME"text/typst", tbl::StyledTable)
    show(io, mime, render(tbl))
end
```

- [ ] **Step 2: Add a test for `Base.show` in `test/runtests.jl`**

  Add inside the `@testset "StyledTables"` block:

```julia
@testset "Base.show methods" begin
    df = DataFrame(a = [1, 2], b = ["x", "y"])
    tbl = StyledTable(df)

    # HTML
    buf = IOBuffer()
    show(buf, MIME"text/html"(), tbl)
    html_str = String(take!(buf))
    @test occursin("<table", html_str)

    # LaTeX
    buf = IOBuffer()
    show(buf, MIME"text/latex"(), tbl)
    latex_str = String(take!(buf))
    @test occursin("tabular", latex_str)
end
```

- [ ] **Step 3: Run the test to verify it passes**

  Using the Julia MCP server:
  ```julia
  using Pkg; Pkg.activate("test"); Pkg.test()
  ```
  Expected: new `Base.show methods` testset passes; all others still pass.

- [ ] **Step 4: Commit**

```bash
git add src/render.jl test/runtests.jl
git commit -m "feat: add Base.show methods to StyledTable for auto-display"
```

---

### Task 2: Add DocStringExtensions

**Files:**
- Modify: `Project.toml`
- Modify: `docs/Project.toml`
- Modify: `src/StyledTables.jl`

- [ ] **Step 1: Add DocStringExtensions to `Project.toml`**

  Add to `[deps]`:
  ```toml
  DocStringExtensions = "ffbed154-4ef7-542d-bbb7-c09d3a79fcae"
  ```
  Add to `[compat]`:
  ```toml
  DocStringExtensions = "0.9"
  ```

- [ ] **Step 2: Add DocStringExtensions to `docs/Project.toml`**

  Using the Julia MCP server:
  ```julia
  using Pkg
  Pkg.activate("docs")
  Pkg.add("DocStringExtensions")
  ```

- [ ] **Step 3: Add `using DocStringExtensions` and module docstring to `src/StyledTables.jl`**

  Replace the current module file with:
  ```julia
  """
  StyledTables.jl — a GT-style pipe-friendly table builder for Julia.

  Build publication-ready tables by chaining modifier functions onto a `StyledTable`
  and calling `render()` to produce a `SummaryTables.Table`.

  $EXPORTS
  """
  module StyledTables

  using DataFrames
  using SummaryTables
  using DocStringExtensions

  include("types.jl")
  include("modifiers.jl")
  include("fmt.jl")
  include("render.jl")

  export StyledTable
  export render
  export cols_label, cols_align, cols_hide, cols_move
  export tab_spanner, tab_row_group, tab_stub, tab_stubhead, tab_header, tab_footnote, tab_source_note
  export tab_style
  export sub_missing, tab_options
  export fmt, fmt_number, fmt_percent, fmt_integer

  end
  ```

- [ ] **Step 4: Verify module loads**

  ```julia
  using Pkg; Pkg.activate(".")
  using StyledTables
  ```
  Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add Project.toml docs/Project.toml src/StyledTables.jl
git commit -m "feat: add DocStringExtensions dependency"
```

---

## Chunk 2: Revise Docstrings

The julia-docstrings skill specifies this template for exported functions:

```julia
"""
$TYPEDSIGNATURES

Brief one-line description.

Longer description paragraph if needed.

# Arguments
- `arg1::Type`: description
- `arg2::Type`: description

# Keywords
- `kw1::Type=default`: description

# Returns
- `Type`: description

See also: [`related_fn`](@ref)
"""
function fn(...) end
```

For types, use `$TYPEDEF` + `$TYPEDFIELDS`.

### Task 3: Add type docstrings to `src/types.jl`

**Files:**
- Modify: `src/types.jl`

- [ ] **Step 1: Add docstrings to all four structs**

```julia
"""
$TYPEDEF

A span label that groups columns under a shared header row.

$TYPEDFIELDS
"""
struct Spanner
    "text or value shown in the spanning header cell"
    label::Any
    "columns covered by this spanner"
    columns::Vector{Symbol}
end

"""
$TYPEDEF

Title and optional subtitle displayed above the column header row.

$TYPEDFIELDS
"""
struct TableHeader
    "bold title text"
    title::Any
    "italic subtitle text, or `nothing`"
    subtitle::Union{Nothing,Any}
end

"""
$TYPEDEF

Optional inline styling overrides for a column's body cells.
Fields left `nothing` inherit the cell default.

$TYPEDFIELDS
"""
struct ColStyleOverride
    "hex color string `\"#RRGGBB\"`, or `nothing`"
    color::Union{Nothing,String}
    "bold override, or `nothing`"
    bold::Union{Nothing,Bool}
    "italic override, or `nothing`"
    italic::Union{Nothing,Bool}
    "underline override, or `nothing`"
    underline::Union{Nothing,Bool}
end

"""
$TYPEDEF

A mutable table specification that wraps a `DataFrame` together with
all accumulated styling, formatting, and layout modifiers.

Build a `StyledTable` by piping modifier functions, then call `render()`
to produce a `SummaryTables.Table`.

$TYPEDFIELDS

See also: [`render`](@ref), [`StyledTable(data)`](@ref StyledTable)
"""
mutable struct StyledTable
    "source data"
    data::DataFrame
    "display labels keyed by column symbol"
    col_labels::Dict{Symbol,Any}
    "horizontal alignments keyed by column symbol"
    col_alignments::Dict{Symbol,Symbol}
    "list of column spanners in order of addition"
    spanners::Vector{Spanner}
    "column used to create row groups, or `nothing`"
    row_group_col::Union{Nothing,Symbol}
    "indentation in points for grouped rows (default `12.0`)"
    row_group_indent_pt::Float64
    "stub (row-label) column, or `nothing`"
    stub_col::Union{Nothing,Symbol}
    "title and subtitle, or `nothing`"
    header::Union{Nothing,TableHeader}
    "table-level footnote texts"
    footnotes::Vector{Any}
    "per-column value formatter functions"
    col_formatters::Dict{Symbol,Function}
    "per-column inline style overrides"
    col_styles::Dict{Symbol,ColStyleOverride}
    "per-column footnote annotations (applied to column headers)"
    col_footnotes::Dict{Symbol,Any}
    "explicit column display order, or `nothing` (uses DataFrame order)"
    col_order::Union{Nothing,Vector{Symbol}}
    "columns hidden from the rendered output"
    hidden_cols::Set{Symbol}
    "stub column header label, or `nothing`"
    stubhead_label::Union{Nothing,Any}
    "source-note lines shown in the table footer"
    source_notes::Vector{Any}
    "postprocessors passed to `SummaryTables.Table`"
    postprocessors::Vector{Any}
    "global round digits override, or `nothing`"
    round_digits::Union{Nothing,Int}
    "global round mode override (`:auto`, `:digits`, `:sigdigits`), or `nothing`"
    round_mode::Union{Nothing,Symbol}
    "global trailing-zeros override, or `nothing`"
    trailing_zeros::Union{Nothing,Bool}
end
```

- [ ] **Step 2: Run tests to verify nothing broke**

  ```julia
  using Pkg; Pkg.activate("test"); Pkg.test()
  ```

- [ ] **Step 3: Commit**

```bash
git add src/types.jl
git commit -m "docs: add TYPEDEF/TYPEDFIELDS docstrings to all types"
```

---

### Task 4: Revise docstrings in `src/modifiers.jl`

**Files:**
- Modify: `src/modifiers.jl`

Apply the full template to each exported function. Below are the complete revised docstrings for every function. Replace the existing docstrings verbatim.

- [ ] **Step 1: Replace `cols_label` docstring**

```julia
"""
$TYPEDSIGNATURES

Rename columns for display without changing the underlying `DataFrame`.

Each keyword argument maps a column `Symbol` to its display label.
Labels can be plain strings or any value accepted by `SummaryTables.Cell`.

# Keywords
- `kwargs...`: pairs of `column_name = "Display Label"` (one per column to rename)

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if a keyword argument names a column not present in the data

See also: [`cols_align`](@ref), [`cols_hide`](@ref), [`cols_move`](@ref)
"""
function cols_label(; kwargs...)
```

- [ ] **Step 2: Replace `cols_align` docstring**

```julia
"""
$TYPEDSIGNATURES

Set the horizontal alignment for one or more columns.

When `columns` is omitted, the alignment applies to all columns.

# Arguments
- `halign::Symbol`: one of `:left`, `:center`, `:right`
- `columns`: column symbol(s) to align, or `nothing` to align all columns

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if `halign` is not `:left`, `:center`, or `:right`
- `ArgumentError`: if any name in `columns` is not present in the data

See also: [`cols_label`](@ref), [`tab_style`](@ref)
"""
function cols_align(halign::Symbol, columns=nothing)
```

- [ ] **Step 3: Replace `tab_spanner` docstring**

```julia
"""
$TYPEDSIGNATURES

Add a spanning header row above a group of columns.

Multiple calls add multiple spanners in the order they are registered.
All columns in `columns` must exist in the data.

# Arguments
- `label`: text (or any `Cell`-compatible value) shown in the spanning header cell

# Keywords
- `columns::Vector{Symbol}`: the columns covered by this spanner

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if any column in `columns` is not present in the data

See also: [`tab_stub`](@ref), [`tab_row_group`](@ref), [`cols_label`](@ref)
"""
function tab_spanner(label; columns::Vector{Symbol})
```

- [ ] **Step 4: Replace `tab_stub` docstring**

```julia
"""
$TYPEDSIGNATURES

Designate a column as the **stub** (row-label column).

The stub is rendered without a bold header. Use [`tab_stubhead`](@ref) to
set a label for its header cell.

# Arguments
- `col::Symbol`: the column to use as the stub

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if `col` is not present in the data

See also: [`tab_stubhead`](@ref), [`tab_row_group`](@ref)
"""
function tab_stub(col::Symbol)
```

- [ ] **Step 5: Replace `tab_stubhead` docstring**

```julia
"""
$TYPEDSIGNATURES

Set the label for the stub column header.

Has no effect unless [`tab_stub`](@ref) has also been applied.

# Arguments
- `label`: text (or any `Cell`-compatible value) for the stub header cell

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`tab_stub`](@ref)
"""
function tab_stubhead(label)
```

- [ ] **Step 6: Replace `tab_header` docstring**

```julia
"""
$TYPEDSIGNATURES

Add a title and optional subtitle above the column headers.

The title is rendered bold; the subtitle is italic.

# Arguments
- `title`: text (or any `Cell`-compatible value) for the title row

# Keywords
- `subtitle=nothing`: text for the subtitle row, or `nothing` to omit it

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`tab_footnote`](@ref), [`tab_source_note`](@ref)
"""
function tab_header(title; subtitle = nothing)
```

- [ ] **Step 7: Replace `tab_footnote` docstring**

```julia
"""
$TYPEDSIGNATURES

Add a footnote to the table.

Without `columns`, the text appears as a table-level note below the data.
With `columns`, an auto-numbered superscript is appended to each named column
header, and the footnote text is listed below.

# Arguments
- `text`: footnote text (or any `Cell`-compatible value)

# Keywords
- `columns=nothing`: column symbols whose headers receive a numbered superscript,
    or `nothing` for a table-level note

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if any name in `columns` is not present in the data

See also: [`tab_source_note`](@ref), [`tab_header`](@ref)
"""
function tab_footnote(text; columns::Union{Nothing,AbstractVector{Symbol}} = nothing)
```

- [ ] **Step 8: Replace `tab_row_group` docstring**

```julia
"""
$TYPEDSIGNATURES

Group rows by the values of a column.

A bold group-label row is inserted before each new group value, and data rows
are indented by `indent_pt` points. Use [`cols_hide`](@ref) to hide the grouping
column from the rendered output.

# Arguments
- `col::Symbol`: the column whose values define row groups

# Keywords
- `indent_pt::Real=12`: indentation in points for data rows within a group

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if `col` is not present in the data

See also: [`cols_hide`](@ref), [`tab_stub`](@ref)
"""
function tab_row_group(col::Symbol; indent_pt::Real = 12)
```

- [ ] **Step 9: Replace `tab_source_note` docstring**

```julia
"""
$TYPEDSIGNATURES

Add a source-note line to the table footer.

Source notes span the full table width. Multiple calls stack additional lines
in the order they are added.

# Arguments
- `text`: source note text (or any `Cell`-compatible value)

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`tab_footnote`](@ref), [`tab_header`](@ref)
"""
function tab_source_note(text)
```

- [ ] **Step 10: Replace `tab_style` docstring**

```julia
"""
$TYPEDSIGNATURES

Apply inline styling to body cells in specified columns.

Any keyword left `nothing` inherits the cell's default styling.
Colors must be hex strings in `"#RRGGBB"` format.

# Arguments
- `columns::AbstractVector{Symbol}`: the columns to style

# Keywords
- `color::Union{Nothing,String}=nothing`: hex color `"#RRGGBB"` for cell text
- `bold::Union{Nothing,Bool}=nothing`: bold override
- `italic::Union{Nothing,Bool}=nothing`: italic override
- `underline::Union{Nothing,Bool}=nothing`: underline override

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if any column in `columns` is not present in the data

See also: [`cols_align`](@ref), [`tab_options`](@ref)
"""
function tab_style(
```

- [ ] **Step 11: Replace `sub_missing` docstring**

```julia
"""
$TYPEDSIGNATURES

Replace `missing` values with a display placeholder.

Implemented as a `SummaryTables.Replace` postprocessor, so replacement
happens at render time and does not modify the source `DataFrame`.

# Keywords
- `with::Any="—"`: the replacement value (default is an em dash)

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`tab_options`](@ref), [`fmt`](@ref)
"""
function sub_missing(; with::Any = "—")
```

- [ ] **Step 12: Replace `tab_options` docstring**

```julia
"""
$TYPEDSIGNATURES

Set global rounding options for all numeric cells in the table.

Options are forwarded to `SummaryTables.Table`. Any keyword left `nothing`
uses the SummaryTables default (`round_digits=3`, `round_mode=:auto`,
`trailing_zeros=false`).

# Keywords
- `round_digits::Union{Nothing,Int}=nothing`: number of decimal places or significant digits
- `round_mode::Union{Nothing,Symbol}=nothing`: one of `:auto`, `:digits`, `:sigdigits`
- `trailing_zeros::Union{Nothing,Bool}=nothing`: pad to `round_digits` places with zeros

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if `round_mode` is not one of the accepted symbols

See also: [`fmt_number`](@ref), [`fmt_percent`](@ref)
"""
function tab_options(;
```

- [ ] **Step 13: Replace `cols_hide` docstring**

```julia
"""
$TYPEDSIGNATURES

Remove columns from the rendered output without dropping them from the `DataFrame`.

Hidden columns remain accessible for row-grouping (see [`tab_row_group`](@ref))
or other non-display purposes.

# Arguments
- `cols::Symbol...`: one or more column names to hide

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if any column in `cols` is not present in the data

See also: [`cols_move`](@ref), [`tab_row_group`](@ref)
"""
function cols_hide(cols::Symbol...)
```

- [ ] **Step 14: Replace `cols_move` docstring**

```julia
"""
$TYPEDSIGNATURES

Reorder columns in the rendered output.

By default, `cols` are moved to the front. Pass `after` to insert them
immediately after a specific anchor column.

# Arguments
- `cols::AbstractVector{Symbol}`: the columns to move

# Keywords
- `after::Union{Nothing,Symbol}=nothing`: anchor column; `cols` are placed
    immediately after it, or at the front when `nothing`

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

# Throws
- `ArgumentError`: if any column in `cols` or `after` is not present in the data
- `ArgumentError`: if `after` appears in `cols`

See also: [`cols_hide`](@ref), [`cols_label`](@ref)
"""
function cols_move(cols::AbstractVector{Symbol}; after::Union{Nothing,Symbol} = nothing)
```

- [ ] **Step 15: Run tests**

  ```julia
  using Pkg; Pkg.activate("test"); Pkg.test()
  ```

- [ ] **Step 16: Commit**

```bash
git add src/modifiers.jl
git commit -m "docs: revise modifiers.jl docstrings with DocStringExtensions templates"
```

---

### Task 5: Revise docstrings in `src/fmt.jl` and `src/render.jl`

**Files:**
- Modify: `src/fmt.jl`
- Modify: `src/render.jl`

- [ ] **Step 1: Replace `fmt_number` docstring in `src/fmt.jl`**

```julia
"""
$TYPEDSIGNATURES

Format numeric values in `cols` to a fixed number of decimal places.

The formatter runs at render time and does not modify the source `DataFrame`.

# Arguments
- `cols`: a `Symbol` or `AbstractVector{Symbol}` naming the columns to format

# Keywords
- `digits::Int=2`: number of decimal places
- `trailing_zeros::Bool=true`: if `false`, strip trailing zeros after the decimal point

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`fmt_percent`](@ref), [`fmt_integer`](@ref), [`fmt`](@ref), [`tab_options`](@ref)
"""
function fmt_number(cols; digits::Int = 2, trailing_zeros::Bool = true)
```

- [ ] **Step 2: Replace `fmt_percent` docstring**

```julia
"""
$TYPEDSIGNATURES

Multiply values by `scale` and format as a percentage string.

# Arguments
- `cols`: a `Symbol` or `AbstractVector{Symbol}` naming the columns to format

# Keywords
- `digits::Int=1`: number of decimal places in the percentage
- `scale::Real=100`: multiplier applied before formatting (use `1` if values are already 0–100)
- `suffix::String="%"`: string appended after the number

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`fmt_number`](@ref), [`fmt_integer`](@ref), [`fmt`](@ref)
"""
function fmt_percent(cols; digits::Int = 1, scale::Real = 100, suffix::String = "%")
```

- [ ] **Step 3: Replace `fmt_integer` docstring**

```julia
"""
$TYPEDSIGNATURES

Format numeric values in `cols` as integers (rounded to nearest whole number).

# Arguments
- `cols`: a `Symbol` or `AbstractVector{Symbol}` naming the columns to format

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`fmt_number`](@ref), [`fmt_percent`](@ref), [`fmt`](@ref)
"""
function fmt_integer(cols)
```

- [ ] **Step 4: Replace `fmt` docstring**

```julia
"""
$TYPEDSIGNATURES

Apply a custom formatter function to values in `cols`.

The formatter `f` receives each raw cell value and should return a display
value (string, number, or any `Cell`-compatible value). `missing` is passed
through as-is unless `f` handles it explicitly.

# Arguments
- `cols`: a `Symbol` or `AbstractVector{Symbol}` naming the columns to format
- `f::Function`: formatter `f(value) -> display_value`

# Returns
- `Function`: a modifier closure `(tbl::StyledTable) -> StyledTable`

See also: [`fmt_number`](@ref), [`fmt_percent`](@ref), [`fmt_integer`](@ref)
"""
function fmt(cols, f::Function)
```

- [ ] **Step 5: Replace `render` docstring in `src/render.jl`**

```julia
"""
$TYPEDSIGNATURES

Convert a `StyledTable` into a `SummaryTables.Table`.

Applies all accumulated modifiers (labels, spanners, formatters, styles,
row groups, source notes, etc.) and assembles the final cell matrix.

The returned `SummaryTables.Table` can be displayed in Jupyter, Pluto, and
Documenter pages, and supports:
- `show(io, MIME"text/html"(), tbl)`
- `show(io, MIME"text/latex"(), tbl)`
- `show(io, MIME"text/typst"(), tbl)`

# Arguments
- `tbl::StyledTable`: the table specification to render

# Returns
- `SummaryTables.Table`: the assembled, renderable table

See also: [`StyledTable`](@ref), [`tab_header`](@ref), [`cols_label`](@ref)
"""
function render(tbl::StyledTable)
```

- [ ] **Step 6: Run tests**

  ```julia
  using Pkg; Pkg.activate("test"); Pkg.test()
  ```

- [ ] **Step 7: Commit**

```bash
git add src/fmt.jl src/render.jl
git commit -m "docs: revise fmt.jl and render.jl docstrings with DocStringExtensions templates"
```

---

## Chunk 3: Convert docs pages to `@example` blocks

### Background: `@example` block rules

- `` ```@example ``` `` blocks are executed by Documenter.jl at build time.
- The **last expression** in a block is displayed using its HTML `show` method.
- Named blocks (`` ```@example myname ``` ``) **share a module** — variables
  defined in block 1 are available in block 2 with the same name on the same page.
- Unnamed blocks (`` ```@example ``` ``) each get a **fresh isolated module**.
- Since our examples all end with `render()` (which returns `SummaryTables.Table`),
  and `SummaryTables.Table` has `show(io, MIME"text/html"(), ...)`, the table will
  render automatically.
- Use `nothing` as the last line to suppress output if you don't want display.

### Task 6: Convert `docs/src/reference/` pages

**Files:**
- Modify: `docs/src/reference/columns.md`
- Modify: `docs/src/reference/structure.md`
- Modify: `docs/src/reference/annotations.md`
- Modify: `docs/src/reference/styling.md`
- Modify: `docs/src/reference/formatting.md`
- Modify: `docs/src/reference/rendering.md`

**Pattern to apply to every reference page:**

1. Every `` ```julia `` fence that contains a complete runnable example → `` ```@example <section_name> ``
2. The first block in each named environment must include `using StyledTables, DataFrames` and data setup.
3. Blocks that share data (e.g., a second example building on `df` from the first) → same named environment.
4. Blocks that are fully independent → different names or unnamed `` ```@example ``

Below is the complete rewrite for each page.

- [ ] **Step 1: Rewrite `docs/src/reference/columns.md`**

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

```@example colslabel
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

df |> StyledTable() |>
    cols_label(bmi = "BMI (kg/m²)", sbp = "Systolic BP (mmHg)") |>
    render()
```

```@docs
StyledTables.cols_label
```

---

## `cols_align`

Set horizontal alignment for one or more columns. Valid values: `:left`,
`:center`, `:right`.

**Signatures:**
- `cols_align(halign, columns)` — apply to specific columns
- `cols_align(halign)` — apply to all columns

```@example colsalign
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

df |> StyledTable() |>
    cols_align(:right, [:bmi, :sbp]) |>
    render()
```

Align all columns at once:

```@example colsalign2
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

df |> StyledTable() |>
    cols_align(:center) |>
    render()
```

```@docs
StyledTables.cols_align
```

---

## `cols_hide`

Remove columns from the rendered table without dropping them from the data.
Useful when a column is needed for grouping (`tab_row_group`) but should not
appear in the output.

**Signature:** `cols_hide(cols::Symbol...)`

```@example colshide
using StyledTables, DataFrames

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

```@docs
StyledTables.cols_hide
```

---

## `cols_move`

Reorder columns. By default, the specified columns are moved to the front.
Use `after = :col` to insert them after a specific column.

**Signatures:**
- `cols_move(cols)` — move `cols` to the beginning
- `cols_move(cols; after = :anchor_col)` — move `cols` after `:anchor_col`

```@example colsmove
using StyledTables, DataFrames

df = DataFrame(id = 1:3, name = ["A","B","C"], value = [10, 20, 30])

df |> StyledTable() |>
    cols_move([:name]) |>
    render()
```

```@example colsmove2
using StyledTables, DataFrames

df = DataFrame(id = 1:3, name = ["A","B","C"], value = [10, 20, 30])

df |> StyledTable() |>
    cols_move([:value]; after = :name) |>
    render()
```

```@docs
StyledTables.cols_move
```
```

- [ ] **Step 2: Rewrite `docs/src/reference/structure.md`**

Apply the same pattern. Key: the `tab_spanner` page has two consecutive blocks that
share `df`. Use `@example tabspanner` for the first and `@example tabspanner2` for
the second (since they define `df` identically), or use one named env and include
`df` definition in both. The simplest approach: each block is self-contained with
its own `using` + `df`. Full file:

```markdown
# Table Structure

These functions control the high-level layout: grouped column headers, a stub
(row label) column, and grouped row sections.

---

## `tab_spanner`

Add a spanning header above a group of columns.

**Signature:** `tab_spanner(label; columns::Vector{Symbol})`

```@example tabspanner
using StyledTables, DataFrames

df = DataFrame(
    drug     = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
    safety   = [0.91, 0.84, 0.88],
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

Multiple spanners can be chained:

```@example tabspanner2
using StyledTables, DataFrames

df = DataFrame(
    drug     = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
    safety   = [0.91, 0.84, 0.88],
)

df |> StyledTable() |>
    tab_spanner("Dosing"; columns = [:dose_mg]) |>
    tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |>
    render()
```

```@docs
StyledTables.tab_spanner
```

---

## `tab_stub`

Designate one column as the **stub** — a row-label column rendered with special
formatting (no bold header by default, distinct from data columns).

**Signature:** `tab_stub(col::Symbol)`

```@example tabstub
using StyledTables, DataFrames

df = DataFrame(
    drug     = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
)

df |> StyledTable() |>
    tab_stub(:drug) |>
    cols_label(dose_mg = "Dose (mg)", efficacy = "Efficacy") |>
    render()
```

```@docs
StyledTables.tab_stub
```

---

## `tab_stubhead`

Set a label for the stub column header. Only takes effect when `tab_stub` has
been applied.

**Signature:** `tab_stubhead(label)`

```@example tabstubhead
using StyledTables, DataFrames

df = DataFrame(
    drug     = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
)

df |> StyledTable() |>
    tab_stub(:drug) |>
    tab_stubhead("Drug Name") |>
    render()
```

```@docs
StyledTables.tab_stubhead
```

---

## `tab_row_group`

Group rows by the values of a column. A bold group-label row is inserted before
each new group value. Data rows are indented.

**Signature:** `tab_row_group(col::Symbol; indent_pt = 12)`

```@example tabrowgroup
using StyledTables, DataFrames

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

```@docs
StyledTables.tab_row_group
```
```

- [ ] **Step 3: Rewrite `docs/src/reference/annotations.md`**

Same pattern — each example block is self-contained and uses `@example` with a
unique name per distinct example. Full file:

```markdown
# Annotations

These functions add metadata to the table: a title and subtitle at the top,
footnotes at the bottom, and source notes in the footer.

---

## `tab_header`

Add a title (and optional subtitle) above the column headers.

**Signature:** `tab_header(title; subtitle = nothing)`

```@example tabheader
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

df |> StyledTable() |>
    tab_header("GDP by Country"; subtitle = "Trillions USD, 2025") |>
    cols_label(country = "Country", gdp = "GDP") |>
    fmt_number(:gdp; digits = 1) |>
    render()
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

```@example tabfootnote
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

df |> StyledTable() |>
    tab_header("GDP by Country") |>
    tab_footnote("Source: World Bank (2025)") |>
    render()
```

Annotating a specific column:

```@example tabfootnote2
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

df |> StyledTable() |>
    tab_footnote("Purchasing power parity adjusted"; columns = [:gdp]) |>
    render()
```

```@docs
StyledTables.tab_footnote
```

---

## `tab_source_note`

Add a source-note line in the table footer. Source notes appear below any data
rows and span the full table width. Multiple calls stack additional lines.

**Signature:** `tab_source_note(text)`

```@example tabsourcenote
using StyledTables, DataFrames

df = DataFrame(country = ["US", "DE", "JP"], gdp = [25.5, 4.1, 4.2])

df |> StyledTable() |>
    tab_header("GDP by Country") |>
    tab_source_note("Data: World Bank Open Data") |>
    tab_source_note("Values in trillions USD") |>
    render()
```

```@docs
StyledTables.tab_source_note
```
```

- [ ] **Step 4: Rewrite `docs/src/reference/styling.md`**

```markdown
# Styling & Options

---

## `tab_style`

Apply inline styling (color, bold, italic, underline) to all body cells in
specified columns. Colors are hex strings (`"#RRGGBB"`).

**Signature:**
```julia
tab_style(columns; color=nothing, bold=nothing, italic=nothing, underline=nothing)
```

```@example tabstyle
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

```@docs
StyledTables.tab_style
```

---

## `sub_missing`

Replace `missing` values with a placeholder string for display. Defaults to
`"—"` (em dash).

**Signature:** `sub_missing(; with = "—")`

```@example submissing
using StyledTables, DataFrames

df = DataFrame(
    group = ["A", "A", "B", "B"],
    value = [1.2, missing, 3.4, missing],
)

df |> StyledTable() |>
    sub_missing() |>
    render()
```

Custom placeholder:

```@example submissing2
using StyledTables, DataFrames

df = DataFrame(
    group = ["A", "A", "B", "B"],
    value = [1.2, missing, 3.4, missing],
)

df |> StyledTable() |>
    sub_missing(with = "N/A") |>
    render()
```

```@docs
StyledTables.sub_missing
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

```@example taboptions
using StyledTables, DataFrames

df = DataFrame(a = [1.23456, 7.891], b = [100.0, 200.0])

df |> StyledTable() |>
    tab_options(round_digits = 2, round_mode = :sigdigits) |>
    render()
```

```@example taboptions2
using StyledTables, DataFrames

df = DataFrame(a = [1.23456, 7.891], b = [100.0, 200.0])

df |> StyledTable() |>
    tab_options(round_digits = 3, round_mode = :digits, trailing_zeros = true) |>
    render()
```

```@docs
StyledTables.tab_options
```
```

- [ ] **Step 5: Rewrite `docs/src/reference/formatting.md`**

Convert every `julia` fence to `@example` with unique names. Pattern: each
independent example gets its own name. Full file content replaces all six `julia`
blocks — the prose headings, text, and `@docs` blocks remain.

For each `julia` block on this page, change `` ```julia `` to `` ```@example fmtnumber ``,
`` ```@example fmtpercent ``, `` ```@example fmtpercent2 ``, `` ```@example fmtinteger ``,
`` ```@example fmtcustom ``, `` ```@example fmtmulti `` and add `using StyledTables, DataFrames`
as the first line of each block.

- [ ] **Step 6: Rewrite `docs/src/reference/rendering.md`**

Change both `julia` blocks to `@example renderbasic` and `@example renderfile`.
Each block includes `using StyledTables, DataFrames`. The "Saving to file" example
ends with `nothing` as the last line to suppress the `IOStream` output:

```@example renderfile
using StyledTables, DataFrames

tbl = DataFrame(x = [1, 2, 3]) |> StyledTable() |> render()

open("/tmp/table.html", "w") do io
    show(io, MIME"text/html"(), tbl)
end
nothing
```

- [ ] **Step 7: Run makedocs and check for errors**

  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```
  Expected: no errors; `@example` blocks execute successfully.

- [ ] **Step 8: Commit**

```bash
git add docs/src/reference/
git commit -m "docs: convert reference pages to @example blocks for inline table rendering"
```

---

### Task 7: Convert `docs/src/getting_started.md` and `docs/src/index.md`

**Files:**
- Modify: `docs/src/getting_started.md`
- Modify: `docs/src/index.md`

- [ ] **Step 1: Convert `index.md` quick example**

  The quick example defines and pipes `df`. Name the environment `@example index`.
  Include `using StyledTables, DataFrames` at the top of the block.

- [ ] **Step 2: Convert `getting_started.md`**

  Six code blocks, each building on the same `df`. Use a **single named environment
  `@example gettingstarted`** so `df` persists across blocks. The very first block
  defines `df`; subsequent blocks reuse it:

  ```@example gettingstarted
  using StyledTables, DataFrames

  df = DataFrame(
      treatment = ["Placebo", "Low Dose", "High Dose"],
      n         = [30, 30, 30],
      response  = [0.12, 0.38, 0.61],
  )

  df |> StyledTable() |> render()
  ```

  ```@example gettingstarted
  df |> StyledTable() |>
      tab_header("Treatment Response"; subtitle = "Phase II Clinical Trial") |>
      render()
  ```

  ... and so on for the remaining blocks.

- [ ] **Step 3: Run makedocs**

- [ ] **Step 4: Commit**

```bash
git add docs/src/index.md docs/src/getting_started.md
git commit -m "docs: convert index and getting_started to @example blocks"
```

---

### Task 8: Convert `docs/src/examples/` pages

**Files:**
- Modify: `docs/src/examples/cars.md`
- Modify: `docs/src/examples/clinical.md`
- Modify: `docs/src/examples/report.md`

The example pages have multiple "step" blocks that build on shared data.
Use a **single named environment per page** so data defined in the first block
is available in subsequent blocks.

- [ ] **Step 1: Convert `cars.md`**

  Use `@example cars` throughout. Move `cars = DataFrame(...)` into the first block.
  Steps 1, 2, and 3 each show progressively more of the pipeline — they each
  *redefine* and *re-render* so they are self-contained except for the `using` clause.
  Since each step redeclares `cars`, all blocks can share the `@example cars` env
  and omit repeated `using` lines after the first block.

  Structure:
  ```@example cars
  using StyledTables, DataFrames

  cars = DataFrame(
      origin   = ["Italy", "Italy", "Germany", "Germany", "UK", "UK"],
      ...
  )
  nothing  # suppress DataFrame display
  ```

  ```@example cars
  cars |> StyledTable() |>
      tab_row_group(:origin) |>
      ...
      render()
  ```

  ```@example cars
  cars |> StyledTable() |>
      tab_row_group(:origin) |>
      tab_spanner(...) |>
      ...
      render()
  ```

  ```@example cars
  cars |> StyledTable() |>
      tab_header(...) |>
      ...
      render()
  ```

- [ ] **Step 2: Convert `clinical.md`**

  Use `@example clinical`. First block defines `demo = DataFrame(...)` with `nothing`
  as last line. Steps 1 and 2 reuse `demo`.

- [ ] **Step 3: Convert `report.md`**

  Use `@example report`. First block defines `report = DataFrame(...)` with `nothing`.
  Steps 1 and 2 reuse `report`.

- [ ] **Step 4: Run makedocs**

  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```
  Expected: all example blocks execute; tables render.

- [ ] **Step 5: Commit**

```bash
git add docs/src/examples/
git commit -m "docs: convert example case study pages to @example blocks"
```

---

## Chunk 4: Verify and finalize

### Task 9: Final verification

- [ ] **Step 1: Run full test suite**

  ```julia
  using Pkg; Pkg.activate("test"); Pkg.test()
  ```
  Expected: all tests pass.

- [ ] **Step 2: Run makedocs clean**

  ```julia
  using Pkg; Pkg.activate("docs")
  include("docs/make.jl")
  ```
  Expected: zero errors; only optional warnings (logo/favicon/devbranch).

- [ ] **Step 3: Preview VitePress site**

  > **Use the `documenter-vitepress` skill for local preview.**

  ```julia
  using DocumenterVitepress
  Threads.@spawn DocumenterVitepress.dev_docs("docs/build")
  ```

  Verify in browser (http://localhost:5173):
  - Tables render inline in Getting Started
  - Tables render inline in all reference pages
  - Multi-step examples in case studies show incremental table output
  - `@docs` blocks show full docstrings with signatures, arguments, see-also links

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "docs: complete rendering fix and DocStringExtensions revision"
```

---

## Summary

| Chunk | Tasks | Output |
|-------|-------|--------|
| 1 | 1–2 | `Base.show` on `StyledTable`; DocStringExtensions wired in |
| 2 | 3–5 | All 19 exported functions + 4 types have full DocStringExtensions docstrings |
| 3 | 6–8 | All docs pages converted to `@example` blocks; tables render inline |
| 4 | 9 | Tests pass; docs build clean; VitePress preview verified |
