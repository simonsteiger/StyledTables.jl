# Reference-Based Test Suite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current unit-test suite with a reference-based test suite that mirrors the SummaryTables.jl approach, using ReferenceTests.jl to compare HTML output against stored `.txt` reference files.

**Architecture:** Each feature gets a subdirectory under `test/references/`, containing one `.txt` file per test scenario. A thin `run_reftest` helper renders the `GTTable` to a `SummaryTables.Table`, wraps it in an `AsMIME{MIME"text/html"}` struct, and calls `@test_reference`. Error-path cases (those that `@test_throws`) are kept as regular `@test_throws` assertions in the test file because they produce no rendered output. Reference files are generated automatically on the first test run when they do not yet exist.

**Tech Stack:** Julia, ReferenceTests.jl, SummaryTables.jl (HTML rendering), DataFrames.jl, Test

---

### Task 1: Create the feature branch

**Files:**
- No file changes — git only.

**Step 1: Create and switch to `reference-tests` branch**

```bash
git checkout -b reference-tests
```

Expected: `Switched to a new branch 'reference-tests'`

**Step 2: Verify you are on the right branch**

```bash
git branch --show-current
```

Expected: `reference-tests`

---

### Task 2: Add ReferenceTests.jl as a test dependency

**Files:**
- Modify: `Project.toml`

**Step 1: Add the dependency via the Julia MCP server**

Run in the Julia MCP server (`mcp__julia__julia_eval`):

```julia
import Pkg
Pkg.activate("/Users/simonsteiger/.julia/dev/SummaryTablesExtras")
Pkg.add(; name = "ReferenceTests", uuid = "3d0afe11-e35d-4a68-ac66-17789b0f6f47")
```

> Note: `Pkg.add` on a registered package will resolve the UUID automatically. If it fails, use `Pkg.add("ReferenceTests")`.

**Step 2: Edit `Project.toml` to move ReferenceTests into `[extras]` and `[targets]`**

After `Pkg.add`, the package appears in `[deps]`. Move it to `[extras]` so it is a test-only dep.

The final `[extras]` and `[targets]` sections should look like:

```toml
[extras]
DataFrames = "a93c6f00-e57d-5684-b7b6-d8193f3e46c0"
ReferenceTests = "3d0afe11-e35d-4a68-ac66-17789b0f6f47"
Test = "8dfed614-e22c-5e08-85e1-65c5234f0b40"

[targets]
test = ["DataFrames", "ReferenceTests", "Test"]
```

> `DataFrames` is already in `[deps]` (a real dependency) so also listing it in `[extras]` is harmless but not strictly required. Adding it is fine.

**Step 3: Verify Project.toml is valid**

```julia
import Pkg
Pkg.activate("/Users/simonsteiger/.julia/dev/SummaryTablesExtras")
Pkg.resolve()
```

Expected: no errors.

---

### Task 3: Create the `test/references` directory tree

**Files:**
- Create (directories): `test/references/gt/`, `test/references/cols_label/`, `test/references/cols_align/`, `test/references/tab_spanner/`, `test/references/tab_stub/`, `test/references/tab_header/`, `test/references/tab_footnote/`, `test/references/tab_row_group/`

**Step 1: Create directories via Bash**

```bash
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/gt
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/cols_label
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/cols_align
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/tab_spanner
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/tab_stub
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/tab_header
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/tab_footnote
mkdir -p /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/tab_row_group
```

**Step 2: Verify the directories exist**

```bash
ls /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references/
```

Expected: 8 subdirectory names listed.

---

### Task 4: Rewrite `test/runtests.jl`

**Files:**
- Modify: `test/runtests.jl` (complete overwrite)

**Step 1: Read the existing file first** (required before Edit/Write)

Read `test/runtests.jl`.

**Step 2: Replace the entire file with the new content**

Write the following as the complete new `test/runtests.jl`:

```julia
using SummaryTablesExtras
using SummaryTables
using DataFrames
using Test
using ReferenceTests

# ---------------------------------------------------------------------------
# Helpers — mirrors the AsMIME pattern from SummaryTables.jl test suite
# ---------------------------------------------------------------------------

struct AsMIME{M}
    object
end
Base.show(io::IO, m::AsMIME{M}) where {M} = show(io, M(), m.object)

as_html(object) = AsMIME{MIME"text/html"}(object)

"""
    run_reftest(tbl::GTTable, relpath::AbstractString)

Render `tbl` to a SummaryTables.Table, then compare its HTML output against
the reference file at `test/<relpath>.txt`.  If the file does not yet exist,
ReferenceTests creates it on the first run.
"""
function run_reftest(tbl, relpath)
    rendered = render(tbl)
    path_full = joinpath(@__DIR__, relpath * ".txt")
    @test_reference path_full as_html(rendered)
end

# ---------------------------------------------------------------------------
# Test suite
# ---------------------------------------------------------------------------

@testset "SummaryTablesExtras" begin

    # -----------------------------------------------------------------------
    @testset "gt / basic render" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        run_reftest(gt(df), "references/gt/basic")
    end

    # -----------------------------------------------------------------------
    @testset "cols_label" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            gt(df) |> cols_label(x = "Variable X", y = "Variable Y"),
            "references/cols_label/relabeled_two_cols",
        )

        run_reftest(
            gt(df) |> cols_label(x = "Only X"),
            "references/cols_label/relabeled_one_col",
        )

        # Error path: unknown column name
        @test_throws ArgumentError gt(df) |> cols_label(typo = "Label")
    end

    # -----------------------------------------------------------------------
    @testset "cols_align" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            gt(df) |> cols_align(:center, [:x, :y]),
            "references/cols_align/center_both",
        )

        run_reftest(
            gt(df) |> cols_align(:right),
            "references/cols_align/right_all",
        )

        run_reftest(
            gt(df) |> cols_align(:left, [:x]),
            "references/cols_align/left_one_col",
        )

        # Error paths
        @test_throws ArgumentError cols_align(:centre)
        @test_throws ArgumentError gt(df) |> cols_align(:left, [:nonexistent])
    end

    # -----------------------------------------------------------------------
    @testset "tab_spanner" begin
        df = DataFrame(name = ["Alice", "Bob"], dose = [10, 20], response = [0.9, 0.8])

        run_reftest(
            gt(df) |> tab_spanner("Treatment"; columns = [:dose, :response]),
            "references/tab_spanner/basic",
        )

        run_reftest(
            gt(df) |> tab_spanner("Treatment"; columns = [:dose, :response])
                    |> tab_spanner("Participant"; columns = [:name]),
            "references/tab_spanner/two_spanners",
        )

        # Error path: unknown column
        @test_throws ArgumentError gt(df) |> tab_spanner("X"; columns = [:typo])
    end

    # -----------------------------------------------------------------------
    @testset "tab_stub" begin
        df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])

        run_reftest(
            gt(df) |> tab_stub(:rowname),
            "references/tab_stub/basic",
        )

        # Error path
        @test_throws ArgumentError gt(df) |> tab_stub(:nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "tab_header" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            gt(df) |> tab_header("My Table"),
            "references/tab_header/title_only",
        )

        run_reftest(
            gt(df) |> tab_header("My Table"; subtitle = "A subtitle"),
            "references/tab_header/title_and_subtitle",
        )

        run_reftest(
            gt(df) |> tab_header("My Table"; subtitle = "Subtitle")
                    |> tab_spanner("XY"; columns = [:x, :y]),
            "references/tab_header/with_spanner",
        )
    end

    # -----------------------------------------------------------------------
    @testset "tab_footnote" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            gt(df) |> tab_footnote("Source: internal data"),
            "references/tab_footnote/single",
        )

        run_reftest(
            gt(df) |> tab_footnote("Source: internal data") |> tab_footnote("n = 2"),
            "references/tab_footnote/multiple",
        )
    end

    # -----------------------------------------------------------------------
    @testset "tab_row_group" begin
        df = DataFrame(
            arm   = ["A", "A", "B", "B"],
            name  = ["x1", "x2", "y1", "y2"],
            score = [1, 2, 3, 4],
        )

        run_reftest(
            gt(df) |> tab_row_group(:arm),
            "references/tab_row_group/basic",
        )

        run_reftest(
            gt(df) |> tab_row_group(:arm; indent_pt = 24),
            "references/tab_row_group/custom_indent",
        )

        # Error path
        @test_throws ArgumentError gt(df) |> tab_row_group(:nonexistent)
    end

end
```

---

### Task 5: Run the tests to generate reference files

**Step 1: Run the test suite via the Julia MCP server**

```julia
import Pkg
Pkg.activate("/Users/simonsteiger/.julia/dev/SummaryTablesExtras")
Pkg.test("SummaryTablesExtras")
```

On the **first run**, `@test_reference` will write each `.txt` file to disk and mark the test as passed (ReferenceTests default behavior). You should see output like:

```
Reference file does not exist. Writing it now...
```

for each scenario, followed by all tests passing.

**Step 2: Verify that reference files were created**

```bash
find /Users/simonsteiger/.julia/dev/SummaryTablesExtras/test/references -name "*.txt" | sort
```

Expected: one `.txt` file per scenario (15 files total):
```
test/references/cols_align/center_both.txt
test/references/cols_align/left_one_col.txt
test/references/cols_align/right_all.txt
test/references/cols_label/relabeled_one_col.txt
test/references/cols_label/relabeled_two_cols.txt
test/references/gt/basic.txt
test/references/tab_footnote/multiple.txt
test/references/tab_footnote/single.txt
test/references/tab_header/title_and_subtitle.txt
test/references/tab_header/title_only.txt
test/references/tab_header/with_spanner.txt
test/references/tab_row_group/basic.txt
test/references/tab_row_group/custom_indent.txt
test/references/tab_spanner/basic.txt
test/references/tab_spanner/two_spanners.txt
test/references/tab_stub/basic.txt
```

**Step 3: Inspect a reference file to confirm it contains valid HTML**

Read any one of the generated `.txt` files (e.g. `test/references/gt/basic.txt`) and confirm it contains an HTML `<table>` element.

---

### Task 6: Run the tests a second time to confirm they pass against references

**Step 1: Run tests again**

```julia
import Pkg
Pkg.activate("/Users/simonsteiger/.julia/dev/SummaryTablesExtras")
Pkg.test("SummaryTablesExtras")
```

Expected: **all tests pass**, no "Reference file does not exist" messages this time.

---

### Task 7: Commit

**Step 1: Stage all changes**

```bash
cd /Users/simonsteiger/.julia/dev/SummaryTablesExtras
git add Project.toml test/runtests.jl test/references/
```

**Step 2: Commit**

```bash
git commit -m "$(cat <<'EOF'
test: replace unit tests with reference-based HTML tests

Uses ReferenceTests.jl and an AsMIME wrapper (matching SummaryTables.jl
convention) to compare rendered HTML output against stored .txt reference
files. Reference files live in test/references/<feature>/.
EOF
)"
```

**Step 3: Verify clean state**

```bash
git status
```

Expected: `nothing to commit, working tree clean`
