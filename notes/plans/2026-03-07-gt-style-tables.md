# GT-Style Table Formatting Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a composable, gt-inspired Julia API for styling and formatting tables backed by SummaryTables.jl's `Table`/`Cell`/`CellStyle` infrastructure.

**Architecture:** A mutable `GTTable` struct holds a `DataFrame` plus accumulated styling specs (spanners, row groups, column labels, etc.). Modifier functions mutate and return the struct for `|>` piping. A `render()` function converts the final struct to a `SummaryTables.Table`.

**Tech Stack:** Julia 1.10+, SummaryTables.jl (Cell, CellStyle, Table), DataFrames.jl

---

## Background & Key Concepts

### SummaryTables.jl primitives you will use

- `Cell(value; bold, italic, underline, halign, valign, indent_pt, border_bottom, merge, mergegroup)` — a single table cell
- `Table(matrix::AbstractMatrix{Cell}; header, footer, footnotes, rowgaps, colgaps)` — a rendered table
  - `header=N` means the first N rows are the header section (divider line after row N)
- `CellStyle` fields: `bold`, `italic`, `underline`, `halign` (`:left`/`:center`/`:right`), `valign`, `indent_pt`, `border_bottom`, `merge`, `mergegroup`

### Desired user-facing API (gt-inspired)

```julia
df |> gt() |> tab_spanner("Treatment", [:dose, :response]) |> tab_row_group(:arm) |> render()
```

or equivalently:

```julia
tbl = gt(df)
tbl = tab_spanner(tbl, "Treatment"; columns=[:dose, :response])
tbl = tab_row_group(tbl; col=:arm)
render(tbl)
```

---

## File Structure

```
src/
  SummaryTablesExtras.jl   # module, imports, exports, includes
  types.jl                 # GTTable and supporting structs
  modifiers.jl             # gt(), tab_*(), cols_*() functions
  render.jl                # render() -> SummaryTables.Table
test/
  runtests.jl              # all tests
```

---

## Task 1: Add DataFrames dependency and set up file structure

**Files:**
- Modify: `Project.toml`
- Create: `src/types.jl`
- Create: `src/modifiers.jl`
- Create: `src/render.jl`
- Modify: `src/SummaryTablesExtras.jl`

**Step 1: Add DataFrames to Project.toml**

Edit `Project.toml` to add DataFrames under `[deps]`:

```toml
[deps]
DataFrames = "a93c6f00-e57d-5684-b7b6-d8193f3e46c0"
SummaryTables = "6ce4ecf0-73a7-4ce3-9fb4-80ebfe887b60"

[compat]
DataFrames = "1"
SummaryTables = "3.5.1"
julia = "1.10"
```

**Step 2: Resolve the new dependency**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. -e 'using Pkg; Pkg.resolve()'
```

Expected: Pkg resolves successfully, Manifest.toml updated.

**Step 3: Create skeleton source files**

Create `src/types.jl` with just a comment: `# Types defined here`
Create `src/modifiers.jl` with just a comment: `# Modifiers defined here`
Create `src/render.jl` with just a comment: `# Rendering defined here`

**Step 4: Wire up the module**

Replace `src/SummaryTablesExtras.jl` with:

```julia
module SummaryTablesExtras

using DataFrames
using SummaryTables

include("types.jl")
include("modifiers.jl")
include("render.jl")

export GTTable
export gt, render
export cols_label, cols_align
export tab_spanner, tab_row_group, tab_stub, tab_header, tab_footnote

end
```

**Step 5: Verify the package loads**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. -e 'using SummaryTablesExtras; println("OK")'
```

Expected: prints `OK` with no errors.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add Project.toml Manifest.toml src/SummaryTablesExtras.jl src/types.jl src/modifiers.jl src/render.jl
git commit -m "chore: add DataFrames dep and set up file structure"
```

---

## Task 2: Define the `GTTable` struct and supporting types

**Files:**
- Modify: `src/types.jl`
- Modify: `test/runtests.jl`

### Supporting types

```
Spanner       – a labelled group of columns (for spanning header rows)
RowGroupSpec  – which column to use as row group labels
TableHeader   – optional title + subtitle rows above the column headers
```

**Step 1: Write the failing test**

In `test/runtests.jl`:

```julia
using SummaryTablesExtras
using DataFrames
using Test

@testset "SummaryTablesExtras.jl" begin

    df = DataFrame(group = ["A","A","B","B"], x = [1,2,3,4], y = [5.0,6.0,7.0,8.0])

    @testset "GTTable construction" begin
        tbl = gt(df)
        @test tbl isa GTTable
        @test tbl.data == df
        @test isempty(tbl.col_labels)
        @test isempty(tbl.col_alignments)
        @test isempty(tbl.spanners)
        @test isnothing(tbl.row_group_col)
        @test isnothing(tbl.stub_col)
        @test isnothing(tbl.header)
        @test isempty(tbl.footnotes)
    end

end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: gt not defined` (or similar).

**Step 3: Define types in `src/types.jl`**

```julia
struct Spanner
    label::Any
    columns::Vector{Symbol}
end

struct TableHeader
    title::Any
    subtitle::Union{Nothing,Any}
end

mutable struct GTTable
    data::DataFrame
    col_labels::Dict{Symbol,Any}
    col_alignments::Dict{Symbol,Symbol}
    spanners::Vector{Spanner}
    row_group_col::Union{Nothing,Symbol}
    stub_col::Union{Nothing,Symbol}
    header::Union{Nothing,TableHeader}
    footnotes::Vector{Any}
end
```

**Step 4: Define `gt()` in `src/modifiers.jl`**

```julia
function gt(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return GTTable(
        df,
        Dict{Symbol,Any}(),
        Dict{Symbol,Symbol}(),
        Spanner[],
        nothing,
        nothing,
        nothing,
        Any[],
    )
end
```

**Step 5: Run test to verify it passes**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `Test Summary: GTTable construction | Pass  9`.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/types.jl src/modifiers.jl test/runtests.jl
git commit -m "feat: define GTTable struct and gt() constructor"
```

---

## Task 3: Basic `render()` — plain table with column headers

The simplest render: column names as a bold header row, then body rows.

**Files:**
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing tests** (add inside the `@testset "SummaryTablesExtras.jl"` block)

```julia
@testset "basic render" begin
    df = DataFrame(a = [1, 2], b = ["x", "y"])
    tbl = gt(df)
    result = render(tbl)
    @test result isa SummaryTables.Table

    cells = result.cells
    # 3 rows: 1 header + 2 body; 2 columns
    @test size(cells) == (3, 2)

    # header row is bold
    @test cells[1, 1].style.bold == true
    @test cells[1, 2].style.bold == true

    # header row values are column names
    @test cells[1, 1].value == "a"
    @test cells[1, 2].value == "b"

    # body values match DataFrame
    @test cells[2, 1].value == 1
    @test cells[3, 1].value == 2
    @test cells[2, 2].value == "x"
    @test cells[3, 2].value == "y"

    # Table header marker is 1
    @test result.header == 1
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: render not defined`.

**Step 3: Implement `render()` in `src/render.jl`**

```julia
function render(tbl::GTTable)
    df = tbl.data
    colnames = Symbol.(names(df))

    # --- Column header row ---
    header_row = [_header_cell(tbl, col) for col in colnames]

    # --- Body rows ---
    body = Matrix{Cell}(undef, nrow(df), ncol(df))
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i in 1:nrow(df)
            body[i, j] = Cell(df[i, col]; halign)
        end
    end

    cells = [header_row'; body]
    return Table(cells; header = 1)
end

# Build a single header cell for a given column, applying label overrides and alignment
function _header_cell(tbl::GTTable, col::Symbol)
    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    return Cell(label; bold = true, halign)
end
```

**Step 4: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 5: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/render.jl test/runtests.jl
git commit -m "feat: implement basic render() for plain tables"
```

---

## Task 4: `cols_label()` — rename column headers

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "cols_label" begin
    df = DataFrame(x = [1], y = [2])
    tbl = gt(df) |> cols_label(x = "Variable X", y = "Variable Y")
    result = render(tbl)
    @test result.cells[1, 1].value == "Variable X"
    @test result.cells[1, 2].value == "Variable Y"
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: cols_label not defined`.

**Step 3: Implement `cols_label()` in `src/modifiers.jl`**

The function accepts keyword arguments `colname = new_label` and returns a closure for piping, or takes the `GTTable` as first argument:

```julia
# Modifier pattern: returns a function that takes a GTTable (for |> piping)
# Usage: gt(df) |> cols_label(x = "X", y = "Y")
function cols_label(; kwargs...)
    return function (tbl::GTTable)
        for (col, label) in kwargs
            tbl.col_labels[col] = label
        end
        return tbl
    end
end
```

**Step 4: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 5: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/modifiers.jl test/runtests.jl
git commit -m "feat: add cols_label() to rename column headers"
```

---

## Task 5: `cols_align()` — set column alignment

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "cols_align" begin
    df = DataFrame(x = [1, 2], y = [3, 4])
    tbl = gt(df) |> cols_align(:center, [:x, :y])
    result = render(tbl)
    # header alignment
    @test result.cells[1, 1].style.halign == :center
    @test result.cells[1, 2].style.halign == :center
    # body alignment
    @test result.cells[2, 1].style.halign == :center
    @test result.cells[2, 2].style.halign == :center
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: cols_align not defined`.

**Step 3: Implement `cols_align()` in `src/modifiers.jl`**

```julia
# Usage: gt(df) |> cols_align(:center, [:x, :y])
# or:    gt(df) |> cols_align(:right)   # applies to all columns
function cols_align(halign::Symbol, columns=nothing)
    return function (tbl::GTTable)
        cols = columns === nothing ? Symbol.(names(tbl.data)) : columns
        for col in cols
            tbl.col_alignments[col] = halign
        end
        return tbl
    end
end
```

**Step 4: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 5: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/modifiers.jl test/runtests.jl
git commit -m "feat: add cols_align() to set column alignment"
```

---

## Task 6: `tab_spanner()` — spanning column group headers

A spanner adds an extra row above the column headers that spans a subset of columns with a label. Multiple spanners may be added (they all appear in one additional header row). Columns not covered by any spanner get an empty cell in the spanner row.

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "tab_spanner" begin
    df = DataFrame(name = ["Alice"], dose = [10], response = [0.9])
    tbl = gt(df) |> tab_spanner("Treatment"; columns = [:dose, :response])
    result = render(tbl)

    # Spanner adds one extra header row → header = 2, total rows = 1+2 = 3 (not 4)
    # Actually: 1 spanner row + 1 col-header row + 1 body row = 3 rows total
    @test size(result.cells, 1) == 3
    @test result.header == 2

    # Spanner label appears above :dose (col 2)
    @test result.cells[1, 2].value == "Treatment"
    @test result.cells[1, 2].style.merge == true

    # :dose and :response share mergegroup 1; :name col has nothing in spanner row
    @test isnothing(result.cells[1, 1].value)

    # Column header row (row 2) is unaffected
    @test result.cells[2, 1].value == "name"
    @test result.cells[2, 2].value == "dose"
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: tab_spanner not defined`.

**Step 3: Implement `tab_spanner()` in `src/modifiers.jl`**

```julia
# Usage: gt(df) |> tab_spanner("Label"; columns = [:a, :b])
function tab_spanner(label; columns::Vector{Symbol})
    return function (tbl::GTTable)
        push!(tbl.spanners, Spanner(label, columns))
        return tbl
    end
end
```

**Step 4: Update `render()` in `src/render.jl` to emit a spanner row when spanners are present**

When spanners exist, insert one extra row above the column headers:

```julia
function render(tbl::GTTable)
    df = tbl.data
    colnames = Symbol.(names(df))
    n_cols = length(colnames)

    # --- Spanner row (optional) ---
    has_spanners = !isempty(tbl.spanners)
    spanner_row = has_spanners ? _build_spanner_row(tbl, colnames) : nothing

    # --- Column header row ---
    header_row = [_header_cell(tbl, col) for col in colnames]

    # --- Body rows ---
    body = Matrix{Cell}(undef, nrow(df), n_cols)
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i in 1:nrow(df)
            body[i, j] = Cell(df[i, col]; halign)
        end
    end

    n_header_rows = 1 + (has_spanners ? 1 : 0)

    cells = if has_spanners
        [spanner_row'; header_row'; body]
    else
        [header_row'; body]
    end

    return Table(cells; header = n_header_rows)
end

function _build_spanner_row(tbl::GTTable, colnames::Vector{Symbol})
    row = Cell[Cell(nothing) for _ in colnames]
    for (group_idx, spanner) in enumerate(tbl.spanners)
        for col in spanner.columns
            j = findfirst(==(col), colnames)
            j === nothing && continue
            row[j] = Cell(spanner.label; bold = true, merge = true, mergegroup = group_idx)
        end
    end
    return row
end
```

**Step 5: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/modifiers.jl src/render.jl test/runtests.jl
git commit -m "feat: add tab_spanner() for spanning column group headers"
```

---

## Task 7: `tab_stub()` — designate a stub (row label) column

The stub column is the leftmost "label" column. It is displayed without a column header label (empty cell in header row) and is not treated as a data column.

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "tab_stub" begin
    df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])
    tbl = gt(df) |> tab_stub(:rowname)
    result = render(tbl)

    # Still 2 columns in output (stub + data)
    @test size(result.cells, 2) == 2

    # Header for stub column is empty (nothing)
    @test isnothing(result.cells[1, 1].value)

    # Header for data column is present
    @test result.cells[1, 2].value == "score"

    # Body stub values are shown
    @test result.cells[2, 1].value == "Alice"
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: tab_stub not defined`.

**Step 3: Implement `tab_stub()` in `src/modifiers.jl`**

```julia
function tab_stub(col::Symbol)
    return function (tbl::GTTable)
        tbl.stub_col = col
        return tbl
    end
end
```

**Step 4: Update `_header_cell()` in `src/render.jl`** to return an empty cell for the stub column:

```julia
function _header_cell(tbl::GTTable, col::Symbol)
    # Stub column has no header label
    col == tbl.stub_col && return Cell(nothing)
    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    return Cell(label; bold = true, halign)
end
```

**Step 5: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/modifiers.jl src/render.jl test/runtests.jl
git commit -m "feat: add tab_stub() to designate the row label column"
```

---

## Task 8: `tab_row_group()` — row grouping with bold labels and indentation

This is the core feature from `draft.jl`, redesigned. A column in the DataFrame is used as a row group indicator. When rendering, consecutive rows with the same group value are gathered under a bold group header row. All data cells in those rows are indented. The group column itself is removed from the displayed output.

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "tab_row_group" begin
    df = DataFrame(
        arm   = ["A", "A", "B", "B"],
        name  = ["x1", "x2", "y1", "y2"],
        score = [1, 2, 3, 4],
    )
    tbl = gt(df) |> tab_row_group(:arm)
    result = render(tbl)

    # arm column is removed → 2 display columns
    @test size(result.cells, 2) == 2

    # 1 header row + 4 body rows + 2 group label rows = 7 rows total
    @test size(result.cells, 1) == 7

    # Group label rows are bold
    # Row 2 should be group label "A"
    @test result.cells[2, 1].value == "A"
    @test result.cells[2, 1].style.bold == true

    # Row 3 is first data row under group A, indented
    @test result.cells[3, 1].value == "x1"
    @test result.cells[3, 1].style.indent_pt > 0

    # Row 5 should be group label "B"
    @test result.cells[5, 1].value == "B"
    @test result.cells[5, 1].style.bold == true
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: tab_row_group not defined`.

**Step 3: Implement `tab_row_group()` in `src/modifiers.jl`**

```julia
function tab_row_group(col::Symbol; indent_pt::Real = 12)
    return function (tbl::GTTable)
        tbl.row_group_col = col
        return tbl
    end
end
```

Store `indent_pt` in `GTTable` too. Add field `row_group_indent_pt::Float64` (default `12.0`) to `GTTable` in `types.jl`, and update `gt()` accordingly.

Updated `GTTable` struct in `src/types.jl`:

```julia
mutable struct GTTable
    data::DataFrame
    col_labels::Dict{Symbol,Any}
    col_alignments::Dict{Symbol,Symbol}
    spanners::Vector{Spanner}
    row_group_col::Union{Nothing,Symbol}
    row_group_indent_pt::Float64
    stub_col::Union{Nothing,Symbol}
    header::Union{Nothing,TableHeader}
    footnotes::Vector{Any}
end
```

Updated `gt()` in `src/modifiers.jl`:

```julia
function gt(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return GTTable(df, Dict{Symbol,Any}(), Dict{Symbol,Symbol}(), Spanner[], nothing, 12.0, nothing, nothing, Any[])
end
```

Updated `tab_row_group()`:

```julia
function tab_row_group(col::Symbol; indent_pt::Real = 12)
    return function (tbl::GTTable)
        tbl.row_group_col = col
        tbl.row_group_indent_pt = Float64(indent_pt)
        return tbl
    end
end
```

**Step 4: Update `render()` in `src/render.jl`** to handle row groups

Add a helper `_build_body_with_groups()` and call it when `row_group_col` is set:

```julia
function render(tbl::GTTable)
    df = tbl.data

    # Remove row group column from displayed columns
    display_cols = if tbl.row_group_col !== nothing
        filter(!=(tbl.row_group_col), Symbol.(names(df)))
    else
        Symbol.(names(df))
    end

    n_cols = length(display_cols)
    has_spanners = !isempty(tbl.spanners)

    spanner_row = has_spanners ? _build_spanner_row(tbl, display_cols) : nothing
    header_row = [_header_cell(tbl, col) for col in display_cols]

    body = if tbl.row_group_col !== nothing
        _build_body_with_groups(tbl, df, display_cols)
    else
        _build_plain_body(tbl, df, display_cols)
    end

    n_header_rows = 1 + (has_spanners ? 1 : 0)

    cells = if has_spanners
        [spanner_row'; header_row'; body]
    else
        [header_row'; body]
    end

    return Table(cells; header = n_header_rows)
end

function _build_plain_body(tbl::GTTable, df::DataFrame, colnames::Vector{Symbol})
    body = Matrix{Cell}(undef, nrow(df), length(colnames))
    for (j, col) in enumerate(colnames)
        halign = get(tbl.col_alignments, col, :left)
        for i in 1:nrow(df)
            body[i, j] = Cell(df[i, col]; halign)
        end
    end
    return body
end

function _build_body_with_groups(tbl::GTTable, df::DataFrame, display_cols::Vector{Symbol})
    group_col = tbl.row_group_col
    indent = tbl.row_group_indent_pt
    group_vals = string.(df[!, group_col])

    # Identify where group labels should be inserted (first occurrence of each new group)
    group_insert_positions = _find_group_boundaries(group_vals)
    n_extra = length(group_insert_positions)
    n_display_rows = nrow(df) + n_extra
    n_cols = length(display_cols)

    body = Matrix{Cell}(undef, n_display_rows, n_cols)
    offset = 0

    for i in 1:nrow(df)
        if haskey(group_insert_positions, i)
            # Insert bold group label row
            label = group_insert_positions[i]
            for j in 1:n_cols
                body[i + offset, j] = j == 1 ? Cell(label; bold = true) : Cell(nothing)
            end
            offset += 1
        end
        # Insert data row (with indentation on first column)
        for (j, col) in enumerate(display_cols)
            halign = get(tbl.col_alignments, col, :left)
            indent_pt = j == 1 ? indent : 0.0
            body[i + offset, j] = Cell(df[i, col]; halign, indent_pt)
        end
    end

    return body
end

# Returns Dict(row_index => group_label) for rows that start a new group
function _find_group_boundaries(group_vals::Vector{<:AbstractString})
    result = Dict{Int,String}()
    prev = nothing
    for (i, v) in enumerate(group_vals)
        if v != prev
            result[i] = v
            prev = v
        end
    end
    return result
end
```

**Step 5: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/types.jl src/modifiers.jl src/render.jl test/runtests.jl
git commit -m "feat: add tab_row_group() for row grouping with indentation"
```

---

## Task 9: `tab_header()` — title and subtitle rows

Adds title (and optional subtitle) rows spanning all columns above the column headers.

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "tab_header" begin
    df = DataFrame(x = [1, 2], y = [3, 4])

    # Title only
    tbl = gt(df) |> tab_header("My Table")
    result = render(tbl)
    # 1 title row + 1 col-header row + 2 body rows = 4
    @test size(result.cells, 1) == 4
    @test result.header == 2
    @test result.cells[1, 1].value == "My Table"
    @test result.cells[1, 1].style.merge == true
    @test result.cells[1, 2].value == "My Table"  # merged cells have same value

    # Title + subtitle
    tbl2 = gt(df) |> tab_header("My Table"; subtitle = "A subtitle")
    result2 = render(tbl2)
    # 1 title + 1 subtitle + 1 col-header + 2 body = 5
    @test size(result2.cells, 1) == 5
    @test result2.header == 3
    @test result2.cells[1, 1].value == "My Table"
    @test result2.cells[2, 1].value == "A subtitle"
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: tab_header not defined`.

**Step 3: Implement `tab_header()` in `src/modifiers.jl`**

```julia
function tab_header(title; subtitle = nothing)
    return function (tbl::GTTable)
        tbl.header = TableHeader(title, subtitle)
        return tbl
    end
end
```

**Step 4: Update `render()` in `src/render.jl`** to prepend title/subtitle rows

Add a `_build_title_rows()` helper and prepend them in `render()`:

```julia
function _build_title_rows(tbl::GTTable, n_cols::Int)
    rows = Matrix{Cell}[]
    hdr = tbl.header
    hdr === nothing && return rows

    title_row = [Cell(hdr.title; bold = true, merge = true) for _ in 1:n_cols]
    push!(rows, reshape(title_row, 1, n_cols))

    if hdr.subtitle !== nothing
        subtitle_row = [Cell(hdr.subtitle; italic = true, merge = true) for _ in 1:n_cols]
        push!(rows, reshape(subtitle_row, 1, n_cols))
    end

    return rows
end
```

Update the header row count and cell assembly in `render()`:

```julia
function render(tbl::GTTable)
    df = tbl.data

    display_cols = if tbl.row_group_col !== nothing
        filter(!=(tbl.row_group_col), Symbol.(names(df)))
    else
        Symbol.(names(df))
    end

    n_cols = length(display_cols)
    has_spanners = !isempty(tbl.spanners)
    has_title    = tbl.header !== nothing
    has_subtitle = has_title && tbl.header.subtitle !== nothing

    title_rows   = _build_title_rows(tbl, n_cols)
    spanner_row  = has_spanners ? _build_spanner_row(tbl, display_cols) : nothing
    header_row   = [_header_cell(tbl, col) for col in display_cols]

    body = if tbl.row_group_col !== nothing
        _build_body_with_groups(tbl, df, display_cols)
    else
        _build_plain_body(tbl, df, display_cols)
    end

    n_header_rows = (has_title ? 1 : 0) +
                    (has_subtitle ? 1 : 0) +
                    (has_spanners ? 1 : 0) +
                    1  # column header row

    parts = Matrix{Cell}[rows for rows in title_rows]
    has_spanners && push!(parts, reshape(spanner_row, 1, n_cols))
    push!(parts, reshape(header_row, 1, n_cols))
    push!(parts, body)

    cells = reduce(vcat, parts)
    return Table(cells; header = n_header_rows)
end
```

**Step 5: Run tests to verify they pass**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/modifiers.jl src/render.jl test/runtests.jl
git commit -m "feat: add tab_header() for title and subtitle rows"
```

---

## Task 10: `tab_footnote()` — table-level footnotes

Adds footnote strings passed to `SummaryTables.Table`'s `footnotes` keyword argument.

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write failing test**

```julia
@testset "tab_footnote" begin
    df = DataFrame(x = [1])
    tbl = gt(df) |> tab_footnote("Source: internal data") |> tab_footnote("n = 1")
    result = render(tbl)
    @test length(result.footnotes) == 2
    @test result.footnotes[1] == "Source: internal data"
    @test result.footnotes[2] == "n = 1"
end
```

**Step 2: Run to verify it fails**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: `UndefVarError: tab_footnote not defined`.

**Step 3: Implement `tab_footnote()` in `src/modifiers.jl`**

```julia
function tab_footnote(text)
    return function (tbl::GTTable)
        push!(tbl.footnotes, text)
        return tbl
    end
end
```

**Step 4: Update `render()` to pass footnotes to `Table()`**

Change the final `Table(...)` call:

```julia
return Table(cells; header = n_header_rows, footnotes = tbl.footnotes)
```

**Step 5: Run all tests**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. test/runtests.jl
```

Expected: all tests pass.

**Step 6: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/modifiers.jl src/render.jl test/runtests.jl
git commit -m "feat: add tab_footnote() for table-level footnotes"
```

---

## Task 11: Delete draft.jl and run full CI check

**Step 1: Delete the draft file**

```bash
rm /Users/simonsteiger/.julia/dev/SummaryTablesExtras/src/draft.jl
```

**Step 2: Run the full test suite one final time**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras && julia --project=. -e 'using Pkg; Pkg.test()'
```

Expected: all tests pass with no warnings about missing exports.

**Step 3: Commit**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add src/draft.jl
git commit -m "chore: remove draft.jl prototype"
```

---

## Out of Scope (Future Work)

- `tab_style(style, location)` — applying arbitrary cell styles to body/header locations
- `fmt_number()`, `fmt_percent()` — numeric formatting helpers
- `cols_move()`, `cols_hide()` — column reordering and hiding
- `tab_source_note()` — styled source attribution (distinct from footnotes)
- HTML/LaTeX-specific rendering options
- `tab_row_group(label, rows)` — gt-style explicit row group assignment (vs column-based)
