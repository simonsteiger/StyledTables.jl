# StyledTables Rename Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rename the package from `SummaryTablesExtras` to `StyledTables`, replacing `GTTable`/`gt()` with `StyledTable`/`styled_table()` while keeping all `tab_*` and `cols_*` function names intact.

**Architecture:** Mechanical find-and-replace across source, test, and project config files. The rendering logic and public API surface (except the constructor and struct) are unchanged. Reference files for the `gt/basic` test group must be moved to `styled_table/basic` to match the renamed test.

**Tech Stack:** Julia, SummaryTables.jl, DataFrames.jl, ReferenceTests.jl

---

### Task 1: Rename the module file

**Files:**
- Rename: `src/SummaryTablesExtras.jl` → `src/StyledTables.jl`

**Step 1: Rename the file**

```bash
mv src/SummaryTablesExtras.jl src/StyledTables.jl
```

**Step 2: Update the module declaration and exports**

Open `src/StyledTables.jl` and apply these changes:

```julia
module StyledTables

using DataFrames
using SummaryTables

include("types.jl")
include("modifiers.jl")
include("render.jl")

export StyledTable
export styled_table, render
export cols_label, cols_align
export tab_spanner, tab_row_group, tab_stub, tab_header, tab_footnote

end
```

**Step 3: Commit**

```bash
git add src/StyledTables.jl src/SummaryTablesExtras.jl
git commit -m "refactor: rename module file SummaryTablesExtras.jl -> StyledTables.jl"
```

---

### Task 2: Rename GTTable to StyledTable in types.jl

**Files:**
- Modify: `src/types.jl`

**Step 1: Replace `GTTable` with `StyledTable` throughout the file**

The file currently reads:

```julia
mutable struct GTTable
    ...
end
```

Change to:

```julia
mutable struct StyledTable
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

**Step 2: Commit**

```bash
git add src/types.jl
git commit -m "refactor: rename GTTable -> StyledTable"
```

---

### Task 3: Update modifiers.jl — rename gt() and update type annotations

**Files:**
- Modify: `src/modifiers.jl`

**Step 1: Replace all `GTTable` type annotations with `StyledTable`**

Every function closure uses `tbl::GTTable`. Replace all occurrences.

**Step 2: Replace the `gt()` constructor with `styled_table()`**

Old:
```julia
function gt(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return GTTable(
        df,
        Dict{Symbol,Any}(),
        Dict{Symbol,Symbol}(),
        Spanner[],
        nothing,
        12.0,
        nothing,
        nothing,
        Any[],
    )
end
```

New:
```julia
function styled_table(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(
        df,
        Dict{Symbol,Any}(),
        Dict{Symbol,Symbol}(),
        Spanner[],
        nothing,
        12.0,
        nothing,
        nothing,
        Any[],
    )
end
```

**Step 3: Verify no `GTTable` or `gt(` references remain**

```bash
grep -n "GTTable\|gt(" src/modifiers.jl
```

Expected: no output.

**Step 4: Commit**

```bash
git add src/modifiers.jl
git commit -m "refactor: rename gt() -> styled_table(), GTTable -> StyledTable in modifiers"
```

---

### Task 4: Update render.jl — replace GTTable type annotations

**Files:**
- Modify: `src/render.jl`

**Step 1: Replace all `GTTable` with `StyledTable`**

Every function signature uses `tbl::GTTable`. Replace all four occurrences:
- `render(tbl::GTTable)`
- `_build_title_rows(tbl::GTTable, n_cols::Int)`
- `_build_plain_body(tbl::GTTable, df::DataFrame, colnames::Vector{Symbol})`
- `_build_body_with_groups(tbl::GTTable, df::DataFrame, display_cols::Vector{Symbol})`
- `_build_spanner_row(tbl::GTTable, colnames::Vector{Symbol})`
- `_header_cell(tbl::GTTable, col::Symbol)`

**Step 2: Verify no `GTTable` references remain**

```bash
grep -n "GTTable" src/render.jl
```

Expected: no output.

**Step 3: Commit**

```bash
git add src/render.jl
git commit -m "refactor: replace GTTable -> StyledTable in render.jl"
```

---

### Task 5: Update Project.toml files

**Files:**
- Modify: `Project.toml`
- Modify: `test/Project.toml`

**Step 1: Update the root Project.toml**

Change `name` from `"SummaryTablesExtras"` to `"StyledTables"`. Keep the UUID unchanged.

```toml
name = "StyledTables"
uuid = "b1e5a2b9-85de-45c7-a260-4d8dda977783"
authors = ["simonsteiger <simon.j.steiger@gmail.com> and contributors"]
version = "1.0.0-DEV"
```

**Step 2: Update test/Project.toml**

Change the package reference:

```toml
[deps]
DataFrames = "a93c6f00-e57d-5684-b7b6-d8193f3e46c0"
ReferenceTests = "324d217c-45ce-50fc-942e-d289b448e8cf"
StyledTables = "b1e5a2b9-85de-45c7-a260-4d8dda977783"
SummaryTables = "6ce4ecf0-73a7-4ce3-9fb4-80ebfe887b60"
Test = "8dfed614-e22c-5e08-85e1-65c5234f0b40"
```

**Step 3: Commit**

```bash
git add Project.toml test/Project.toml
git commit -m "chore: rename package to StyledTables in Project.toml files"
```

---

### Task 6: Update test/runtests.jl

**Files:**
- Modify: `test/runtests.jl`

**Step 1: Update the using statement and docstring**

- `using SummaryTablesExtras` → `using StyledTables`
- Docstring: `tbl::GTTable` → `tbl::StyledTable`
- Top-level `@testset "SummaryTablesExtras"` → `@testset "StyledTables"`

**Step 2: Replace the "gt / basic render" test**

Old:
```julia
@testset "gt / basic render" begin
    df = DataFrame(a = [1, 2], b = ["x", "y"])
    run_reftest(gt(df), "references/gt/basic")
end
```

New:
```julia
@testset "styled_table / basic render" begin
    df = DataFrame(a = [1, 2], b = ["x", "y"])
    run_reftest(styled_table(df), "references/styled_table/basic")
end
```

**Step 3: Replace all remaining `gt(df)` and `gt(` calls with `styled_table(df)` / `styled_table(`**

Every call in the test file like `gt(df) |> ...` becomes `styled_table(df) |> ...`.

**Step 4: Verify no `gt(` or `GTTable` remain**

```bash
grep -n "GTTable\|gt(" test/runtests.jl
```

Expected: no output.

**Step 5: Commit**

```bash
git add test/runtests.jl
git commit -m "test: update runtests.jl for StyledTables rename"
```

---

### Task 7: Rename reference test files for the renamed test group

**Files:**
- Move: `test/references/gt/` → `test/references/styled_table/`

**Step 1: Move the directory**

```bash
mv test/references/gt test/references/styled_table
```

**Step 2: Verify the move**

```bash
ls test/references/styled_table/
```

Expected output:
```
basic.latex.txt  basic.txt  basic.typ.txt
```

**Step 3: Commit**

```bash
git add test/references/styled_table test/references/gt
git commit -m "test: move reference files gt/ -> styled_table/"
```

---

### Task 8: Run the full test suite to verify correctness

**Step 1: Run tests via the Julia MCP server**

```julia
using Pkg
Pkg.activate(".")
Pkg.test()
```

Expected: all 54 tests pass (16 HTML + 16 LaTeX + 16 Typst reference tests + 6 `@test_throws`).

**Step 2: If any reference test fails with "file not found" or "mismatch"**

Check that the reference file paths in the test match the actual file paths on disk. The only moved files are the three under `references/gt/` → `references/styled_table/`.

**Step 3: Commit a fix if needed, otherwise proceed**

---

### Task 9: Rename the repository directory (manual step — inform user)

The on-disk directory `/Users/simonsteiger/.julia/dev/SummaryTablesExtras/` can be renamed to `StyledTables/` after the above steps. Julia dev environments resolve packages by UUID, so as long as `Pkg.develop` is re-run pointing at the new path, everything continues to work.

```bash
# From the parent directory:
mv /Users/simonsteiger/.julia/dev/SummaryTablesExtras /Users/simonsteiger/.julia/dev/StyledTables
cd /Users/simonsteiger/.julia/dev/StyledTables
julia -e 'using Pkg; Pkg.develop(path=".")'
```

This step is optional and can be deferred until ready to register.

---

### Task 10: Update MEMORY.md

Update the auto-memory to reflect the new package name, module file path, and API entry point.

Key changes:
- Project name: `StyledTables`
- Module file: `src/StyledTables.jl`
- Main struct: `StyledTable`
- Constructor: `styled_table()`
- API entry: `df |> styled_table() |> tab_spanner(...) |> render()`
