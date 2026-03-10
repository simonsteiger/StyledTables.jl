# Feature Expansion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add eight new modifier features (cols_hide, cols_move, tab_stubhead, tab_source_note, sub_missing, tab_options, column-located footnotes, tab_style), per-column number formatting (fmt_number, fmt_percent, fmt_integer, fmt), and a save_docx convenience function.

**Architecture:** Each feature either (a) adds a field to `StyledTable` and a modifier closure in `modifiers.jl`, with corresponding changes to `render.jl`, or (b) introduces a new file (`src/fmt.jl`, `src/save.jl`). All features follow the existing pipe-friendly closure pattern. Tests are reference-based using `run_reftest` plus `@test_throws` for error paths.

**Tech Stack:** Julia 1.10+, SummaryTables.jl 3.5.1 (Cell/CellStyle/Table/Annotated/Styled/ReplaceMissing), WriteDocx.jl 1.1, Printf (stdlib), DataFrames.jl 1, ReferenceTests.jl (test only)

---

## Task 1: Extend StyledTable struct and constructor

**Files:**
- Modify: `src/types.jl`
- Modify: `src/modifiers.jl` (the `styled_table()` constructor only)

**Step 1: Update `src/types.jl`**

Replace the existing `StyledTable` definition with:

```julia
struct ColStyleOverride
    color::Union{Nothing,String}
    bold::Union{Nothing,Bool}
    italic::Union{Nothing,Bool}
    underline::Union{Nothing,Bool}
end

mutable struct StyledTable
    data::DataFrame
    col_labels::Dict{Symbol,Any}
    col_alignments::Dict{Symbol,Symbol}
    col_formatters::Dict{Symbol,Function}
    col_styles::Dict{Symbol,ColStyleOverride}
    col_footnotes::Dict{Symbol,Any}
    col_order::Union{Nothing,Vector{Symbol}}
    hidden_cols::Set{Symbol}
    spanners::Vector{Spanner}
    row_group_col::Union{Nothing,Symbol}
    row_group_indent_pt::Float64
    stub_col::Union{Nothing,Symbol}
    stubhead_label::Union{Nothing,Any}
    header::Union{Nothing,TableHeader}
    footnotes::Vector{Any}
    source_notes::Vector{Any}
    postprocessors::Vector{Any}
    round_digits::Union{Nothing,Int}
    round_mode::Union{Nothing,Symbol}
    trailing_zeros::Union{Nothing,Bool}
end
```

**Step 2: Update `styled_table()` constructor in `src/modifiers.jl`**

Replace the `styled_table` function body:

```julia
function styled_table(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(
        df,
        Dict{Symbol,Any}(),
        Dict{Symbol,Symbol}(),
        Dict{Symbol,Function}(),
        Dict{Symbol,ColStyleOverride}(),
        Dict{Symbol,Any}(),
        nothing,
        Set{Symbol}(),
        Spanner[],
        nothing,
        12.0,
        nothing,
        nothing,
        nothing,
        Any[],
        Any[],
        Any[],
        nothing,
        nothing,
        nothing,
    )
end
```

**Step 3: Verify the package still loads**

```julia
# In Julia MCP session:
using Pkg; Pkg.activate("."); using StyledTables
df = DataFrame(a=[1,2], b=["x","y"])
styled_table(df)
```

Expected: no errors, returns a `StyledTable`.

**Step 4: Commit**

```bash
git add src/types.jl src/modifiers.jl
git commit -m "refactor: extend StyledTable struct with fields for new features"
```

---

## Task 2: cols_hide and cols_move

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`
- Create reference files (auto-generated on first test run)

**Step 1: Write the failing tests**

Add to `test/runtests.jl` after the `tab_row_group` testset:

```julia
# -----------------------------------------------------------------------
@testset "cols_hide" begin
    df = DataFrame(a=[1,2], b=[3,4], c=[5,6])

    run_reftest(
        styled_table(df) |> cols_hide(:c),
        "references/cols_hide/single",
    )

    run_reftest(
        styled_table(df) |> cols_hide(:a, :c),
        "references/cols_hide/multiple",
    )

    # Error path: unknown column
    @test_throws ArgumentError styled_table(df) |> cols_hide(:nonexistent)
end

# -----------------------------------------------------------------------
@testset "cols_move" begin
    df = DataFrame(a=[1,2], b=[3,4], c=[5,6])

    run_reftest(
        styled_table(df) |> cols_move([:c, :b]; after=nothing),
        "references/cols_move/to_start",
    )

    run_reftest(
        styled_table(df) |> cols_move([:c]; after=:a),
        "references/cols_move/after_col",
    )

    # Error paths
    @test_throws ArgumentError styled_table(df) |> cols_move([:nonexistent])
    @test_throws ArgumentError styled_table(df) |> cols_move([:c]; after=:nonexistent)
end
```

**Step 2: Run to confirm failure**

```julia
using Pkg; Pkg.activate("test"); include("test/runtests.jl")
```

Expected: `UndefVarError: cols_hide not defined`

**Step 3: Implement in `src/modifiers.jl`**

```julia
# Usage: styled_table(df) |> cols_hide(:a, :b)
function cols_hide(cols::Symbol...)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            push!(tbl.hidden_cols, col)
        end
        return tbl
    end
end

# Usage: styled_table(df) |> cols_move([:c, :b])           # to start
#        styled_table(df) |> cols_move([:c]; after=:a)     # after :a
function cols_move(cols::AbstractVector{Symbol}; after::Union{Nothing,Symbol}=nothing)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in cols
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        if after !== nothing
            after in colnames || throw(ArgumentError("Column :$after not found in DataFrame"))
        end
        remaining = filter(c -> c ∉ cols, colnames)
        if after === nothing
            tbl.col_order = vcat(cols, remaining)
        else
            idx = findfirst(==(after), remaining)
            tbl.col_order = vcat(remaining[1:idx], cols, remaining[idx+1:end])
        end
        return tbl
    end
end
```

**Step 4: Update `render()` in `src/render.jl`**

Replace the `display_cols` computation block at the top of `render()`:

```julia
function render(tbl::StyledTable)
    df = tbl.data

    # Determine base column order (respecting cols_move, then remove row_group + hidden)
    base_order = tbl.col_order !== nothing ? tbl.col_order : Symbol.(names(df))
    display_cols = filter(base_order) do col
        col != tbl.row_group_col && col ∉ tbl.hidden_cols
    end

    # ... rest of render() unchanged
```

**Step 5: Run tests to confirm passing, generating reference files**

```julia
using Pkg; Pkg.activate("test"); include("test/runtests.jl")
```

Expected: new reference files created, all tests pass.

**Step 6: Commit**

```bash
git add src/modifiers.jl src/render.jl test/runtests.jl test/references/cols_hide/ test/references/cols_move/
git commit -m "feat: add cols_hide and cols_move modifiers"
```

---

## Task 3: tab_stubhead and tab_source_note

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write the failing tests**

```julia
# -----------------------------------------------------------------------
@testset "tab_stubhead" begin
    df = DataFrame(rowname=["Alice","Bob"], score=[90,85])

    run_reftest(
        styled_table(df) |> tab_stub(:rowname) |> tab_stubhead("Name"),
        "references/tab_stubhead/basic",
    )
end

# -----------------------------------------------------------------------
@testset "tab_source_note" begin
    df = DataFrame(x=[1,2], y=[3,4])

    run_reftest(
        styled_table(df) |> tab_source_note("Source: internal data"),
        "references/tab_source_note/single",
    )

    run_reftest(
        styled_table(df) |> tab_source_note("Source: A") |> tab_source_note("Note: B"),
        "references/tab_source_note/multiple",
    )
end
```

**Step 2: Run to confirm failure**

Expected: `UndefVarError: tab_stubhead not defined`

**Step 3: Implement modifiers in `src/modifiers.jl`**

```julia
function tab_stubhead(label)
    return function (tbl::StyledTable)
        tbl.stubhead_label = label
        return tbl
    end
end

function tab_source_note(text)
    return function (tbl::StyledTable)
        push!(tbl.source_notes, text)
        return tbl
    end
end
```

**Step 4: Update `render()` in `src/render.jl`**

a) Update `_header_cell` to use `stubhead_label`:

```julia
function _header_cell(tbl::StyledTable, col::Symbol)
    if col == tbl.stub_col
        label = tbl.stubhead_label
        halign = get(tbl.col_alignments, col, :left)
        return Cell(label; bold = label !== nothing, halign)
    end
    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    return Cell(label; bold = true, halign)
end
```

b) At the bottom of `render()`, add source notes as footer rows and pass `footer` to `Table`:

```julia
# After building `cells = reduce(vcat, parts)`:

has_source_notes = !isempty(tbl.source_notes)
footer_row_start = nothing

if has_source_notes
    footer_rows = map(tbl.source_notes) do note
        row = [Cell(j == 1 ? note : nothing; merge = j == 1, halign = :left) for j in 1:n_cols]
        # use merge=true on first cell to span all columns
        reshape([Cell(note; merge = true, halign = :left), [Cell(nothing) for _ in 2:n_cols]...], 1, n_cols)
    end
    footer_matrix = reduce(vcat, footer_rows)
    cells = vcat(cells, footer_matrix)
    footer_row_start = size(cells, 1) - length(tbl.source_notes) + 1
end

return Table(cells;
    header = n_header_rows,
    footer = footer_row_start,
    footnotes = tbl.footnotes,
)
```

**Step 5: Run tests**

Expected: reference files generated, all tests pass.

**Step 6: Commit**

```bash
git add src/modifiers.jl src/render.jl test/runtests.jl test/references/tab_stubhead/ test/references/tab_source_note/
git commit -m "feat: add tab_stubhead and tab_source_note modifiers"
```

---

## Task 4: sub_missing and tab_options

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write the failing tests**

```julia
# -----------------------------------------------------------------------
@testset "sub_missing" begin
    df = DataFrame(x=[1, missing, 3], y=["a", "b", missing])

    run_reftest(
        styled_table(df) |> sub_missing(),
        "references/sub_missing/default",
    )

    run_reftest(
        styled_table(df) |> sub_missing(with = "N/A"),
        "references/sub_missing/custom_text",
    )
end

# -----------------------------------------------------------------------
@testset "tab_options" begin
    df = DataFrame(x=[1.23456, 2.34567], y=[0.001, 999.9])

    run_reftest(
        styled_table(df) |> tab_options(round_digits=2, round_mode=:digits),
        "references/tab_options/round_digits",
    )

    run_reftest(
        styled_table(df) |> tab_options(round_digits=4, round_mode=:sigdigits, trailing_zeros=true),
        "references/tab_options/sigdigits_trailing",
    )

    # Error: invalid round_mode
    @test_throws ArgumentError styled_table(df) |> tab_options(round_mode=:invalid)
end
```

**Step 2: Run to confirm failure**

Expected: `UndefVarError: sub_missing not defined`

**Step 3: Implement in `src/modifiers.jl`**

```julia
# Usage: styled_table(df) |> sub_missing()
#        styled_table(df) |> sub_missing(with = "N/A")
function sub_missing(; with::Any = "—")
    return function (tbl::StyledTable)
        push!(tbl.postprocessors, SummaryTables.Replace(ismissing, with, true))
        return tbl
    end
end

# Usage: styled_table(df) |> tab_options(round_digits=2, round_mode=:digits)
function tab_options(;
    round_digits::Union{Nothing,Int} = nothing,
    round_mode::Union{Nothing,Symbol} = nothing,
    trailing_zeros::Union{Nothing,Bool} = nothing,
)
    if round_mode !== nothing
        round_mode in (:auto, :digits, :sigdigits) ||
            throw(ArgumentError("round_mode must be :auto, :digits, or :sigdigits, got :$round_mode"))
    end
    return function (tbl::StyledTable)
        round_digits !== nothing && (tbl.round_digits = round_digits)
        round_mode !== nothing && (tbl.round_mode = round_mode)
        trailing_zeros !== nothing && (tbl.trailing_zeros = trailing_zeros)
        return tbl
    end
end
```

**Step 4: Update `render()` in `src/render.jl`** to pass options to `Table`:

```julia
return Table(cells;
    header = n_header_rows,
    footer = footer_row_start,
    footnotes = tbl.footnotes,
    postprocess = tbl.postprocessors,
    round_digits = something(tbl.round_digits, 3),       # SummaryTables default is 3
    round_mode = something(tbl.round_mode, :auto),
    trailing_zeros = something(tbl.trailing_zeros, false),
)
```

Note: `something(x, default)` returns `x` if `x !== nothing`, else `default`.

**Step 5: Run tests**

Expected: reference files generated, all tests pass.

**Step 6: Commit**

```bash
git add src/modifiers.jl src/render.jl test/runtests.jl test/references/sub_missing/ test/references/tab_options/
git commit -m "feat: add sub_missing and tab_options modifiers"
```

---

## Task 5: tab_footnote with column location

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

This extends the existing `tab_footnote` to optionally annotate specific column header cells using SummaryTables' `Annotated` wrapper.

**Step 1: Write the failing tests**

```julia
# -----------------------------------------------------------------------
@testset "tab_footnote column location" begin
    df = DataFrame(x=[1,2], y=[3,4])

    run_reftest(
        styled_table(df) |> tab_footnote("See methods"; columns=[:x]),
        "references/tab_footnote/col_single",
    )

    run_reftest(
        styled_table(df) |> tab_footnote("Measured at baseline"; columns=[:x, :y]),
        "references/tab_footnote/col_multiple",
    )

    # Error path: unknown column
    @test_throws ArgumentError styled_table(df) |> tab_footnote("Note"; columns=[:nonexistent])
end
```

**Step 2: Run to confirm failure**

Expected: the new test cases fail because `tab_footnote` does not accept `columns=`.

**Step 3: Update `tab_footnote` in `src/modifiers.jl`**

Replace the existing `tab_footnote`:

```julia
# Usage: styled_table(df) |> tab_footnote("note")                        # table-level
#        styled_table(df) |> tab_footnote("note"; columns=[:x, :y])     # annotates column headers
function tab_footnote(text; columns::Union{Nothing,AbstractVector{Symbol}}=nothing)
    return function (tbl::StyledTable)
        if columns === nothing
            push!(tbl.footnotes, text)
        else
            colnames = Symbol.(names(tbl.data))
            for col in columns
                col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
                tbl.col_footnotes[col] = text
            end
        end
        return tbl
    end
end
```

**Step 4: Update `_header_cell` in `src/render.jl`**

Wrap the label in `Annotated` if the column has a footnote:

```julia
function _header_cell(tbl::StyledTable, col::Symbol)
    if col == tbl.stub_col
        label = tbl.stubhead_label
        halign = get(tbl.col_alignments, col, :left)
        return Cell(label; bold = label !== nothing, halign)
    end
    label = get(tbl.col_labels, col, string(col))
    halign = get(tbl.col_alignments, col, :left)
    if haskey(tbl.col_footnotes, col)
        label = SummaryTables.Annotated(label, tbl.col_footnotes[col])
    end
    return Cell(label; bold = true, halign)
end
```

**Step 5: Run tests**

Expected: reference files generated, all tests pass.

**Step 6: Commit**

```bash
git add src/modifiers.jl src/render.jl test/runtests.jl test/references/tab_footnote/
git commit -m "feat: extend tab_footnote to support column-located annotations"
```

---

## Task 6: tab_style (column body cell styling)

**Files:**
- Modify: `src/modifiers.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

Applies `SummaryTables.Styled` inline styling to body cell values for specified columns.

**Step 1: Write the failing tests**

```julia
# -----------------------------------------------------------------------
@testset "tab_style" begin
    df = DataFrame(label=["A","B"], value=[1.0, 2.0])

    run_reftest(
        styled_table(df) |> tab_style([:value]; bold=true),
        "references/tab_style/bold_col",
    )

    run_reftest(
        styled_table(df) |> tab_style([:label]; color="#FF0000", italic=true),
        "references/tab_style/color_italic",
    )

    # Error path
    @test_throws ArgumentError styled_table(df) |> tab_style([:nonexistent]; bold=true)
end
```

**Step 2: Run to confirm failure**

Expected: `UndefVarError: tab_style not defined`

**Step 3: Implement in `src/modifiers.jl`**

```julia
# Usage: styled_table(df) |> tab_style([:col]; color="#FF0000", bold=true, italic=false)
function tab_style(
    columns::AbstractVector{Symbol};
    color::Union{Nothing,String} = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            tbl.col_styles[col] = ColStyleOverride(color, bold, italic, underline)
        end
        return tbl
    end
end
```

**Step 4: Update body cell construction in `src/render.jl`**

In both `_build_plain_body` and `_build_body_with_groups`, wrap the cell value in `Styled` when a column style override is present. Add a helper:

```julia
function _apply_col_style(value, tbl::StyledTable, col::Symbol)
    haskey(tbl.col_styles, col) || return value
    s = tbl.col_styles[col]
    return SummaryTables.Styled(value; s.color, s.bold, s.italic, s.underline)
end
```

Then in `_build_plain_body`:

```julia
body[i, j] = Cell(_apply_col_style(df[i, col], tbl, col); halign)
```

And in `_build_body_with_groups`, the data row construction:

```julia
body[i + offset, j] = Cell(_apply_col_style(df[i, col], tbl, col); halign, indent_pt)
```

Note: pass `tbl` into both `_build_plain_body` and `_build_body_with_groups` — update their signatures and call sites in `render()` accordingly.

**Step 5: Run tests**

Expected: reference files generated, all tests pass.

**Step 6: Commit**

```bash
git add src/modifiers.jl src/render.jl test/runtests.jl test/references/tab_style/
git commit -m "feat: add tab_style modifier for column body cell styling"
```

---

## Task 7: Per-column number formatting (fmt.jl)

**Files:**
- Create: `src/fmt.jl`
- Modify: `src/StyledTables.jl`
- Modify: `src/render.jl`
- Modify: `test/runtests.jl`

**Step 1: Write the failing tests**

```julia
# -----------------------------------------------------------------------
@testset "fmt_number" begin
    df = DataFrame(x=[1.23456, 2.34567], y=[10.0, 20.0])

    run_reftest(
        styled_table(df) |> fmt_number([:x]; digits=2),
        "references/fmt/number_two_digits",
    )

    run_reftest(
        styled_table(df) |> fmt_number([:x, :y]; digits=1, trailing_zeros=true),
        "references/fmt/number_trailing_zeros",
    )

    @test_throws ArgumentError styled_table(df) |> fmt_number([:nonexistent]; digits=2)
end

@testset "fmt_percent" begin
    df = DataFrame(rate=[0.123, 0.456])

    run_reftest(
        styled_table(df) |> fmt_percent([:rate]; digits=1),
        "references/fmt/percent_default",
    )
end

@testset "fmt_integer" begin
    df = DataFrame(n=[1.7, 2.3])

    run_reftest(
        styled_table(df) |> fmt_integer([:n]),
        "references/fmt/integer",
    )
end

@testset "fmt (custom)" begin
    df = DataFrame(x=[1.0, 2.0])

    run_reftest(
        styled_table(df) |> fmt([:x], x -> "≈$(round(Int, x))"),
        "references/fmt/custom",
    )
end
```

**Step 2: Run to confirm failure**

Expected: `UndefVarError: fmt_number not defined`

**Step 3: Create `src/fmt.jl`**

```julia
using Printf

# Internal helper: validates cols and stores formatter function
function _apply_formatter(cols, f::Function)
    col_vec = cols isa Symbol ? Symbol[cols] : collect(Symbol, cols)
    return function (tbl::StyledTable)
        colnames = Symbol.(names(tbl.data))
        for col in col_vec
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
            tbl.col_formatters[col] = f
        end
        return tbl
    end
end

"""
    fmt_number(cols; digits=2, trailing_zeros=true)

Format numeric values in `cols` to a fixed number of decimal places.
`cols` can be a `Symbol` or `AbstractVector{Symbol}`.
"""
function fmt_number(cols; digits::Int=2, trailing_zeros::Bool=true)
    fmt_str = Printf.Format("%.$(digits)f")
    f = function(x)
        ismissing(x) && return x
        s = Printf.format(fmt_str, Float64(x))
        trailing_zeros && return s
        # Strip trailing zeros after decimal point
        s = rstrip(s, '0')
        s = rstrip(s, '.')
        return s
    end
    return _apply_formatter(cols, f)
end

"""
    fmt_percent(cols; digits=1, scale=100, suffix="%")

Multiply values by `scale` and format as a percentage string.
"""
function fmt_percent(cols; digits::Int=1, scale::Real=100, suffix::String="%")
    fmt_str = Printf.Format("%.$(digits)f")
    f = x -> ismissing(x) ? x : Printf.format(fmt_str, Float64(x) * scale) * suffix
    return _apply_formatter(cols, f)
end

"""
    fmt_integer(cols)

Format numeric values in `cols` as integers (rounds to nearest).
"""
function fmt_integer(cols)
    f = x -> ismissing(x) ? x : string(round(Int, x))
    return _apply_formatter(cols, f)
end

"""
    fmt(cols, f::Function)

Apply a custom formatter function `f(value) -> Any` to values in `cols`.
"""
function fmt(cols, f::Function)
    return _apply_formatter(cols, f)
end
```

**Step 4: Include `fmt.jl` in `src/StyledTables.jl`**

Add `include("fmt.jl")` after `include("modifiers.jl")`.

**Step 5: Apply formatters in `src/render.jl`**

Add a helper function:

```julia
function _apply_formatter(value, tbl::StyledTable, col::Symbol)
    haskey(tbl.col_formatters, col) || return value
    return tbl.col_formatters[col](value)
end
```

Then in `_build_plain_body`, chain with the style helper:

```julia
raw = _apply_formatter(df[i, col], tbl, col)
val = _apply_col_style(raw, tbl, col)
body[i, j] = Cell(val; halign)
```

Similarly in `_build_body_with_groups` for data rows.

**Step 6: Run tests**

Expected: reference files generated, all tests pass.

**Step 7: Commit**

```bash
git add src/fmt.jl src/StyledTables.jl src/render.jl test/runtests.jl test/references/fmt/
git commit -m "feat: add fmt_number, fmt_percent, fmt_integer, fmt per-column formatters"
```

---

## Task 8: save_docx convenience function

**Files:**
- Modify: `Project.toml`
- Create: `src/save.jl`
- Modify: `src/StyledTables.jl`
- Modify: `test/runtests.jl`
- Modify: `test/Project.toml` + `test/Manifest.toml`

**Step 1: Add WriteDocx to `Project.toml`**

In the `[deps]` section, add:
```toml
WriteDocx = "d049ceea-54ee-41d7-a26f-ba29db3b6599"
```

In the `[compat]` section, add:
```toml
WriteDocx = "1.1"
```

Then update the test environment:
```bash
cd test && julia --project=. -e 'using Pkg; Pkg.add("WriteDocx"); Pkg.resolve()'
```

Or via Julia MCP: `Pkg.activate("test"); Pkg.add("WriteDocx")`.

**Step 2: Write the failing test**

```julia
# -----------------------------------------------------------------------
@testset "save_docx" begin
    df = DataFrame(x=[1,2], y=["a","b"])
    tbl = styled_table(df) |> tab_header("Test Table")
    path = tempname() * ".docx"
    save_docx(path, tbl)
    @test isfile(path)
    @test filesize(path) > 0
    rm(path)
end
```

**Step 3: Run to confirm failure**

Expected: `UndefVarError: save_docx not defined`

**Step 4: Create `src/save.jl`**

```julia
import WriteDocx

"""
    save_docx(path, tbl::StyledTable)

Render `tbl` and save it as a Word (.docx) file at `path`.
Returns `path`.

## Example

```julia
df |> styled_table() |> tab_header("Results") |> save_docx("results.docx")
```
"""
function save_docx(path::AbstractString, tbl::StyledTable)
    rendered = render(tbl)
    doc = WriteDocx.Document(
        WriteDocx.Body([
            WriteDocx.Section([
                SummaryTables.to_docx(rendered)
            ])
        ])
    )
    WriteDocx.save(path, doc)
    return path
end
```

**Step 5: Update `src/StyledTables.jl`**

Add after the other includes:
```julia
include("save.jl")
```

Add to exports:
```julia
export save_docx
```

**Step 6: Run tests**

```julia
using Pkg; Pkg.activate("test"); include("test/runtests.jl")
```

Expected: `.docx` file created and removed, all tests pass.

**Step 7: Commit**

```bash
git add Project.toml src/save.jl src/StyledTables.jl test/Project.toml test/Manifest.toml test/runtests.jl
git commit -m "feat: add save_docx convenience function, add WriteDocx dependency"
```

---

## Task 9: Export all new symbols and run full test suite

**Files:**
- Modify: `src/StyledTables.jl`
- Modify: `docs/plans/` (update MEMORY.md after completion)

**Step 1: Verify all new symbols are exported in `src/StyledTables.jl`**

The exports block should contain:

```julia
export StyledTable
export styled_table, render, save_docx
export cols_label, cols_align, cols_hide, cols_move
export tab_spanner, tab_row_group, tab_stub, tab_stubhead
export tab_header, tab_footnote, tab_source_note, tab_style
export sub_missing, tab_options
export fmt, fmt_number, fmt_percent, fmt_integer
```

**Step 2: Run the full test suite**

```julia
using Pkg; Pkg.activate("test"); include("test/runtests.jl")
```

Expected: all tests pass, no regressions.

**Step 3: Commit**

```bash
git add src/StyledTables.jl
git commit -m "chore: finalize exports for all new features"
```

---

## Summary of New StyledTable Fields

| Field | Type | Default | Purpose |
|---|---|---|---|
| `col_formatters` | `Dict{Symbol,Function}` | `Dict()` | Per-column value formatters (fmt_*) |
| `col_styles` | `Dict{Symbol,ColStyleOverride}` | `Dict()` | Per-column inline Styled wrappers |
| `col_footnotes` | `Dict{Symbol,Any}` | `Dict()` | Column-located Annotated footnotes |
| `col_order` | `Union{Nothing,Vector{Symbol}}` | `nothing` | Column display order (cols_move) |
| `hidden_cols` | `Set{Symbol}` | `Set()` | Excluded display columns (cols_hide) |
| `stubhead_label` | `Union{Nothing,Any}` | `nothing` | Header label for stub column |
| `source_notes` | `Vector{Any}` | `[]` | Footer-section source/citation notes |
| `postprocessors` | `Vector{Any}` | `[]` | SummaryTables postprocess objects |
| `round_digits` | `Union{Nothing,Int}` | `nothing` | Override Table round_digits |
| `round_mode` | `Union{Nothing,Symbol}` | `nothing` | Override Table round_mode |
| `trailing_zeros` | `Union{Nothing,Bool}` | `nothing` | Override Table trailing_zeros |

## Key render() Changes Summary

- `display_cols` derived from `col_order` → filter `row_group_col` → filter `hidden_cols`
- `_header_cell`: uses `stubhead_label` for stub col; wraps label in `Annotated` for `col_footnotes`
- `_build_plain_body` / `_build_body_with_groups`: chain `_apply_formatter` then `_apply_col_style` on each value
- Footer rows appended to cell matrix for `source_notes`; `footer` kwarg set on `Table`
- `Table(...)` call gains `postprocess`, `round_digits`, `round_mode`, `trailing_zeros` kwargs
