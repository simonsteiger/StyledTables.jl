# Bang API Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the closure-returning modifier API with a tbl-first mutating bang API (`modifier!(tbl, args...)`) that is idiomatic Julia and works naturally both with and without piping.

**Architecture:** Every modifier function gains a `!` suffix and takes `tbl::StyledTable` as its first positional argument. The function mutates `tbl` in place and returns it. The internal `_apply_formatter_modifier` closure helper in `fmt.jl` is replaced with a direct `_apply_formatter!` function. Exports are updated to export only the `!` names. Tests and docs are updated to match.

**Tech Stack:** Julia 1.10+, SummaryTables.jl, DataFrames.jl, ReferenceTests.jl, DocStringExtensions.jl

---

## Chunk 1: Core API — modifiers.jl, fmt.jl, StyledTables.jl

### Task 1: Write failing tests for new bang API

**Files:**
- Modify: `test/runtests.jl`

The reference files under `test/references/` do **not** change — the rendered output is identical. Only the Julia call syntax changes.

- [ ] **Step 1: Replace the body of `test/runtests.jl` with the new bang-API version below**

```julia
using StyledTables
using SummaryTables
using DataFrames
using Test
using ReferenceTests

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

struct AsMIME{M}
    object
end
Base.show(io::IO, m::AsMIME{M}) where {M} = show(io, M(), m.object)

as_html(object)  = AsMIME{MIME"text/html"}(object)
as_latex(object) = AsMIME{MIME"text/latex"}(object)
as_typst(object) = AsMIME{MIME"text/typst"}(object)

function run_reftest(tbl, relpath)
    rendered = render(tbl)
    @test_reference joinpath(@__DIR__, relpath * ".txt")       as_html(rendered)
    @test_reference joinpath(@__DIR__, relpath * ".latex.txt") as_latex(rendered)
    @test_reference joinpath(@__DIR__, relpath * ".typ.txt")   as_typst(rendered)
end

# ---------------------------------------------------------------------------
# Test suite
# ---------------------------------------------------------------------------

@testset "StyledTables" begin

    # -----------------------------------------------------------------------
    @testset "StyledTable / basic render" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        run_reftest(StyledTable(df), "references/styled_table/basic")
    end

    # -----------------------------------------------------------------------
    @testset "cols_label!" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        tbl = StyledTable(df)
        cols_label!(tbl, x = "Variable X", y = "Variable Y")
        run_reftest(tbl, "references/cols_label/relabeled_two_cols")

        tbl = StyledTable(df)
        cols_label!(tbl, x = "Only X")
        run_reftest(tbl, "references/cols_label/relabeled_one_col")

        @test_throws ArgumentError cols_label!(StyledTable(df), typo = "Label")
    end

    # -----------------------------------------------------------------------
    @testset "cols_align!" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        tbl = StyledTable(df)
        cols_align!(tbl, :center, [:x, :y])
        run_reftest(tbl, "references/cols_align/center_both")

        tbl = StyledTable(df)
        cols_align!(tbl, :right)
        run_reftest(tbl, "references/cols_align/right_all")

        tbl = StyledTable(df)
        cols_align!(tbl, :left, [:x])
        run_reftest(tbl, "references/cols_align/left_one_col")

        @test_throws ArgumentError cols_align!(StyledTable(df), :centre)
        @test_throws ArgumentError cols_align!(StyledTable(df), :left, [:nonexistent])
    end

    # -----------------------------------------------------------------------
    @testset "tab_spanner!" begin
        df = DataFrame(name = ["Alice", "Bob"], dose = [10, 20], response = [0.9, 0.8])

        tbl = StyledTable(df)
        tab_spanner!(tbl, "Treatment"; columns = [:dose, :response])
        run_reftest(tbl, "references/tab_spanner/basic")

        tbl = StyledTable(df)
        tab_spanner!(tbl, "Treatment"; columns = [:dose, :response])
        tab_spanner!(tbl, "Participant"; columns = [:name])
        run_reftest(tbl, "references/tab_spanner/two_spanners")

        @test_throws ArgumentError tab_spanner!(StyledTable(df), "X"; columns = [:typo])
    end

    # -----------------------------------------------------------------------
    @testset "tab_stub!" begin
        df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])

        tbl = StyledTable(df)
        tab_stub!(tbl, :rowname)
        run_reftest(tbl, "references/tab_stub/basic")

        @test_throws ArgumentError tab_stub!(StyledTable(df), :nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "tab_header!" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        tbl = StyledTable(df)
        tab_header!(tbl, "My Table")
        run_reftest(tbl, "references/tab_header/title_only")

        tbl = StyledTable(df)
        tab_header!(tbl, "My Table"; subtitle = "A subtitle")
        run_reftest(tbl, "references/tab_header/title_and_subtitle")

        tbl = StyledTable(df)
        tab_header!(tbl, "My Table"; subtitle = "Subtitle")
        tab_spanner!(tbl, "XY"; columns = [:x, :y])
        run_reftest(tbl, "references/tab_header/with_spanner")
    end

    # -----------------------------------------------------------------------
    @testset "tab_footnote!" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        tbl = StyledTable(df)
        tab_footnote!(tbl, "Source: internal data")
        run_reftest(tbl, "references/tab_footnote/single")

        tbl = StyledTable(df)
        tab_footnote!(tbl, "Source: internal data")
        tab_footnote!(tbl, "n = 2")
        run_reftest(tbl, "references/tab_footnote/multiple")
    end

    # -----------------------------------------------------------------------
    @testset "tab_row_group!" begin
        df = DataFrame(
            arm   = ["A", "A", "B", "B"],
            name  = ["x1", "x2", "y1", "y2"],
            score = [1, 2, 3, 4],
        )

        tbl = StyledTable(df)
        tab_row_group!(tbl, :arm)
        run_reftest(tbl, "references/tab_row_group/basic")

        tbl = StyledTable(df)
        tab_row_group!(tbl, :arm; indent_pt = 24)
        run_reftest(tbl, "references/tab_row_group/custom_indent")

        @test_throws ArgumentError tab_row_group!(StyledTable(df), :nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "cols_hide!" begin
        df = DataFrame(a = [1, 2], b = [3, 4], c = [5, 6])

        tbl = StyledTable(df)
        cols_hide!(tbl, :c)
        run_reftest(tbl, "references/cols_hide/single")

        tbl = StyledTable(df)
        cols_hide!(tbl, :a, :c)
        run_reftest(tbl, "references/cols_hide/multiple")

        @test_throws ArgumentError cols_hide!(StyledTable(df), :nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "cols_move!" begin
        df = DataFrame(a = [1, 2], b = [3, 4], c = [5, 6])

        tbl = StyledTable(df)
        cols_move!(tbl, [:c, :b])
        run_reftest(tbl, "references/cols_move/to_start")

        tbl = StyledTable(df)
        cols_move!(tbl, [:c]; after = :a)
        run_reftest(tbl, "references/cols_move/after_col")

        @test_throws ArgumentError cols_move!(StyledTable(df), [:nonexistent])
        @test_throws ArgumentError cols_move!(StyledTable(df), [:c]; after = :nonexistent)
        @test_throws ArgumentError cols_move!(StyledTable(df), [:c]; after = :c)
    end

    # -----------------------------------------------------------------------
    @testset "tab_stubhead!" begin
        df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])

        tbl = StyledTable(df)
        tab_stub!(tbl, :rowname)
        tab_stubhead!(tbl, "Name")
        run_reftest(tbl, "references/tab_stubhead/basic")
    end

    # -----------------------------------------------------------------------
    @testset "tab_source_note!" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        tbl = StyledTable(df)
        tab_source_note!(tbl, "Source: internal data")
        run_reftest(tbl, "references/tab_source_note/single")

        tbl = StyledTable(df)
        tab_source_note!(tbl, "Source: A")
        tab_source_note!(tbl, "Note: B")
        run_reftest(tbl, "references/tab_source_note/multiple")
    end

    # -----------------------------------------------------------------------
    @testset "sub_missing!" begin
        df = DataFrame(x = [1, missing, 3], y = ["a", "b", missing])

        tbl = StyledTable(df)
        sub_missing!(tbl)
        run_reftest(tbl, "references/sub_missing/default")

        tbl = StyledTable(df)
        sub_missing!(tbl, with = "N/A")
        run_reftest(tbl, "references/sub_missing/custom_text")
    end

    # -----------------------------------------------------------------------
    @testset "tab_options!" begin
        df = DataFrame(x = [1.23456, 2.34567], y = [0.001, 999.9])

        tbl = StyledTable(df)
        tab_options!(tbl, round_digits = 2, round_mode = :digits)
        run_reftest(tbl, "references/tab_options/round_digits")

        tbl = StyledTable(df)
        tab_options!(tbl, round_digits = 4, round_mode = :sigdigits, trailing_zeros = true)
        run_reftest(tbl, "references/tab_options/sigdigits_trailing")

        @test_throws ArgumentError tab_options!(StyledTable(df), round_mode = :invalid)
    end

    # -----------------------------------------------------------------------
    @testset "tab_footnote! column location" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        tbl = StyledTable(df)
        tab_footnote!(tbl, "See methods"; columns = [:x])
        run_reftest(tbl, "references/tab_footnote/col_single")

        tbl = StyledTable(df)
        tab_footnote!(tbl, "Measured at baseline"; columns = [:x, :y])
        run_reftest(tbl, "references/tab_footnote/col_multiple")

        @test_throws ArgumentError tab_footnote!(StyledTable(df), "Note"; columns = [:nonexistent])
    end

    # -----------------------------------------------------------------------
    @testset "tab_style!" begin
        df = DataFrame(label = ["A", "B"], value = [1.0, 2.0])

        tbl = StyledTable(df)
        tab_style!(tbl, [:value]; bold = true)
        run_reftest(tbl, "references/tab_style/bold_col")

        tbl = StyledTable(df)
        tab_style!(tbl, [:label]; color = "#FF0000", italic = true)
        run_reftest(tbl, "references/tab_style/color_italic")

        @test_throws ArgumentError tab_style!(StyledTable(df), [:nonexistent]; bold = true)
    end

    # -----------------------------------------------------------------------
    @testset "fmt_number!" begin
        df = DataFrame(x = [1.23456, 2.34567], y = [10.0, 20.0])

        tbl = StyledTable(df)
        fmt_number!(tbl, [:x]; digits = 2)
        run_reftest(tbl, "references/fmt/number_two_digits")

        tbl = StyledTable(df)
        fmt_number!(tbl, [:x, :y]; digits = 1, trailing_zeros = true)
        run_reftest(tbl, "references/fmt/number_trailing_zeros")

        @test_throws ArgumentError fmt_number!(StyledTable(df), [:nonexistent]; digits = 2)
    end

    @testset "fmt_percent!" begin
        df = DataFrame(rate = [0.123, 0.456])

        tbl = StyledTable(df)
        fmt_percent!(tbl, [:rate]; digits = 1)
        run_reftest(tbl, "references/fmt/percent_default")
    end

    @testset "fmt_integer!" begin
        df = DataFrame(n = [1.7, 2.3])

        tbl = StyledTable(df)
        fmt_integer!(tbl, [:n])
        run_reftest(tbl, "references/fmt/integer")
    end

    @testset "fmt! (custom)" begin
        df = DataFrame(x = [1.0, 2.0])

        tbl = StyledTable(df)
        fmt!(tbl, [:x], x -> "≈$(round(Int, x))")
        run_reftest(tbl, "references/fmt/custom")

        @test_throws ArgumentError fmt!(StyledTable(df), [:nonexistent], identity)
    end

    # -----------------------------------------------------------------------
    @testset "Base.show methods" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        tbl = StyledTable(df)

        buf = IOBuffer()
        show(buf, MIME"text/html"(), tbl)
        @test occursin("<table", String(take!(buf)))

        buf = IOBuffer()
        show(buf, MIME"text/latex"(), tbl)
        @test occursin("tabular", String(take!(buf)))
    end

end
```

- [ ] **Step 2: Run tests to confirm they fail with the current API**

```julia
using Pkg; Pkg.activate("test"); Pkg.test("StyledTables")
```

Expected: FAIL — `UndefVarError: cols_label! not defined` (or similar). This confirms the old names are gone and the new ones are not yet defined.

- [ ] **Step 3: Commit the failing tests**

```bash
git add test/runtests.jl
git commit -m "test: rewrite tests for tbl-first bang API (failing)"
```

---

### Task 2: Rewrite `src/modifiers.jl`

**Files:**
- Modify: `src/modifiers.jl`

Replace the entire file with the implementation below. Every function now takes `tbl::StyledTable` as its first positional argument, mutates `tbl`, and returns `tbl`. Closures are removed entirely. Two-pass validate-then-write is preserved throughout.

- [ ] **Step 1: Replace `src/modifiers.jl` with the following**

```julia
"""
$TYPEDSIGNATURES

Rename columns for display.

Each keyword argument maps a column `Symbol` to its display label.
Column names in the underlying `DataFrame` are not changed.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `kwargs`: pairs of `column_name = label`, where `label` is a plain `String`
  or any value accepted by `SummaryTables.Cell`.

# Returns

`tbl` (modified in place).

See also: [`cols_align!`](@ref), [`cols_hide!`](@ref), [`cols_move!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
cols_label!(tbl, bmi = "BMI (kg/m²)", sbp = "Systolic BP")
render(tbl)
```
"""
function cols_label!(tbl::StyledTable; kwargs...)
    colnames = Symbol.(names(tbl.data))
    for (col, _) in kwargs
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for (col, label) in kwargs
        tbl.col_labels[col] = label
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Set horizontal alignment for one or more columns.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `halign`: one of `:left`, `:center`, or `:right`.
- `columns`: vector of column names to align. Omit to apply to all columns.

# Returns

`tbl` (modified in place).

See also: [`cols_label!`](@ref), [`cols_hide!`](@ref), [`cols_move!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
cols_align!(tbl, :right, [:x, :y])
render(tbl)
```
"""
function cols_align!(tbl::StyledTable, halign::Symbol, columns=nothing)
    halign in (:left, :center, :right) ||
        throw(ArgumentError("halign must be :left, :center, or :right, got :$halign"))
    colnames = Symbol.(names(tbl.data))
    cols = columns === nothing ? colnames : columns
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in cols
        tbl.col_alignments[col] = halign
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Add a spanning header label above a group of columns.

Multiple calls create multiple spanners, rendered left-to-right in the order added.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `label`: display text for the span (plain `String` or rich value).

# Keywords

- `columns`: column names covered by this spanner.

# Returns

`tbl` (modified in place).

See also: [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes"; columns = [:efficacy, :safety])
render(tbl)
```
"""
function tab_spanner!(tbl::StyledTable, label; columns::Vector{Symbol})
    colnames = Symbol.(names(tbl.data))
    for col in columns
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    push!(tbl.spanners, Spanner(label, columns))
    return tbl
end

"""
$TYPEDSIGNATURES

Designate a column as the stub (row-label column).

The stub header cell is not bolded by default. Use [`tab_stubhead!`](@ref) to
provide a label for it.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `col`: name of the column to use as the stub.

# Returns

`tbl` (modified in place).

See also: [`tab_stubhead!`](@ref), [`tab_row_group!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_stub!(tbl, :drug)
render(tbl)
```
"""
function tab_stub!(tbl::StyledTable, col::Symbol)
    col in Symbol.(names(tbl.data)) ||
        throw(ArgumentError("Column :$col not found in DataFrame"))
    tbl.stub_col = col
    return tbl
end

"""
$TYPEDSIGNATURES

Construct a [`StyledTable`](@ref) from a `DataFrame` (or any Tables.jl-compatible source).

Returns a `StyledTable` with default settings. Apply modifier functions and
call [`render`](@ref) to produce a `SummaryTables.Table`.

# Arguments

- `data`: a `DataFrame` or any Tables.jl-compatible table.

# Returns

A [`StyledTable`](@ref).

See also: [`render`](@ref), [`cols_label!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_header!(tbl, "My Table")
render(tbl)
```
"""
function StyledTable(data)
    df = data isa DataFrame ? data : DataFrame(data)
    return StyledTable(
        df,                              # data
        Dict{Symbol,Any}(),              # col_labels
        Dict{Symbol,Symbol}(),           # col_alignments
        Spanner[],                       # spanners
        nothing,                         # row_group_col
        12.0,                            # row_group_indent_pt
        nothing,                         # stub_col
        nothing,                         # header
        Any[],                           # footnotes
        Dict{Symbol,Function}(),         # col_formatters
        Dict{Symbol,ColStyleOverride}(), # col_styles
        Dict{Symbol,Any}(),              # col_footnotes
        nothing,                         # col_order
        Set{Symbol}(),                   # hidden_cols
        nothing,                         # stubhead_label
        Any[],                           # source_notes
        Any[],                           # postprocessors
        nothing,                         # round_digits
        nothing,                         # round_mode
        nothing,                         # trailing_zeros
    )
end

"""
$TYPEDSIGNATURES

Add a title and optional subtitle above the column headers.

The title is rendered bold; the subtitle is rendered italic.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `title`: main heading text.

# Keywords

- `subtitle`: secondary heading text, or `nothing` (default).

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_source_note!`](@ref), [`tab_footnote!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_header!(tbl, "My Table"; subtitle = "Subtitle here")
render(tbl)
```
"""
function tab_header!(tbl::StyledTable, title; subtitle = nothing)
    tbl.header = TableHeader(title, subtitle)
    return tbl
end

"""
$TYPEDSIGNATURES

Add a footnote to the table.

Without `columns`, `text` is a table-level note appended below the body.
With `columns`, an auto-numbered superscript is attached to those column
headers and `text` appears in the footnote area.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `text`: footnote text.

# Keywords

- `columns`: column names to annotate with a superscript, or `nothing` (default).

# Returns

`tbl` (modified in place).

See also: [`tab_source_note!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_footnote!(tbl, "Source: World Bank")
tab_footnote!(tbl, "PPP adjusted"; columns = [:gdp])
render(tbl)
```
"""
function tab_footnote!(tbl::StyledTable, text; columns::Union{Nothing,AbstractVector{Symbol}} = nothing)
    if columns === nothing
        push!(tbl.footnotes, text)
    else
        colnames = Symbol.(names(tbl.data))
        for col in columns
            col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
        end
        for col in columns
            tbl.col_footnotes[col] = text
        end
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Group rows by the values of a column.

A bold group-label row is inserted before each new group value. Data rows are
indented by `indent_pt` points. The grouping column is typically hidden with
[`cols_hide!`](@ref) afterwards.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `col`: column whose distinct values define the groups.

# Keywords

- `indent_pt`: left indent for data rows within a group (default `12`).

# Returns

`tbl` (modified in place).

See also: [`cols_hide!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_row_group!(tbl, :category)
cols_hide!(tbl, :category)
render(tbl)
```
"""
function tab_row_group!(tbl::StyledTable, col::Symbol; indent_pt::Real = 12)
    col in Symbol.(names(tbl.data)) ||
        throw(ArgumentError("Column :$col not found in DataFrame"))
    tbl.row_group_col = col
    tbl.row_group_indent_pt = Float64(indent_pt)
    return tbl
end

"""
$TYPEDSIGNATURES

Set the label for the stub column header.

Only takes effect when [`tab_stub!`](@ref) has been called first.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `label`: display text for the stub header cell.

# Returns

`tbl` (modified in place).

See also: [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_stub!(tbl, :drug)
tab_stubhead!(tbl, "Drug Name")
render(tbl)
```
"""
function tab_stubhead!(tbl::StyledTable, label)
    tbl.stubhead_label = label
    return tbl
end

"""
$TYPEDSIGNATURES

Add a source-note line in the table footer.

Source notes span the full table width and are left-aligned. Multiple calls
stack additional lines in the order they are added.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `text`: source note text.

# Returns

`tbl` (modified in place).

See also: [`tab_footnote!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_source_note!(tbl, "Data: World Bank Open Data")
render(tbl)
```
"""
function tab_source_note!(tbl::StyledTable, text)
    push!(tbl.source_notes, text)
    return tbl
end

"""
$TYPEDSIGNATURES

Apply inline styling to all body cells in the specified columns.

Any keyword left as `nothing` is inherited from the cell default.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `columns`: column names to style.

# Keywords

- `color`: hex color string (`"#RRGGBB"`), or `nothing`.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

# Returns

`tbl` (modified in place).

See also: [`fmt!`](@ref), [`cols_align!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, [:pct]; color = "#1a7340", bold = true)
render(tbl)
```
"""
function tab_style!(
    tbl::StyledTable,
    columns::AbstractVector{Symbol};
    color::Union{Nothing,String} = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    colnames = Symbol.(names(tbl.data))
    for col in columns
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in columns
        tbl.col_styles[col] = ColStyleOverride(color, bold, italic, underline)
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Replace `missing` values with a display placeholder.

Applies a `SummaryTables.Replace` postprocessor that substitutes all `missing`
values before rendering.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `with`: replacement display value (default `"—"`, an em dash).

# Returns

`tbl` (modified in place).

See also: [`tab_options!`](@ref), [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
sub_missing!(tbl)
render(tbl)
```
"""
function sub_missing!(tbl::StyledTable; with::Any = "—")
    push!(tbl.postprocessors, SummaryTables.Replace(ismissing, with, true))
    return tbl
end

"""
$TYPEDSIGNATURES

Set global rounding options for all numeric cells.

These options are forwarded to `SummaryTables.Table` at render time.
Per-column formatters applied via [`fmt_number!`](@ref) or [`fmt!`](@ref) take
precedence over these global settings.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `round_digits`: number of digits to round to.
- `round_mode`: `:auto`, `:digits`, or `:sigdigits`.
- `trailing_zeros`: whether to keep trailing zeros after rounding.

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_percent!`](@ref), [`fmt_integer!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_options!(tbl, round_digits = 2, round_mode = :digits)
render(tbl)
```
"""
function tab_options!(tbl::StyledTable;
    round_digits::Union{Nothing,Int} = nothing,
    round_mode::Union{Nothing,Symbol} = nothing,
    trailing_zeros::Union{Nothing,Bool} = nothing,
)
    if round_mode !== nothing
        round_mode in (:auto, :digits, :sigdigits) ||
            throw(ArgumentError("round_mode must be :auto, :digits, or :sigdigits, got :$round_mode"))
    end
    round_digits !== nothing && (tbl.round_digits = round_digits)
    round_mode !== nothing && (tbl.round_mode = round_mode)
    trailing_zeros !== nothing && (tbl.trailing_zeros = trailing_zeros)
    return tbl
end

"""
$TYPEDSIGNATURES

Remove columns from the rendered output without modifying the `DataFrame`.

Hidden columns are still accessible for grouping or formatting; they just
do not appear in the final table. Commonly paired with [`tab_row_group!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: one or more column names to hide.

# Returns

`tbl` (modified in place).

See also: [`cols_move!`](@ref), [`tab_row_group!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_row_group!(tbl, :group)
cols_hide!(tbl, :group)
render(tbl)
```
"""
function cols_hide!(tbl::StyledTable, cols::Symbol...)
    colnames = Symbol.(names(tbl.data))
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in cols
        push!(tbl.hidden_cols, col)
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Reorder columns in the rendered output.

By default, `cols` are moved to the front. Use `after` to insert them after
a specific column.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: column names to move.

# Keywords

- `after`: column name to insert after, or `nothing` (move to front, default).

# Returns

`tbl` (modified in place).

See also: [`cols_hide!`](@ref), [`cols_align!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
cols_move!(tbl, [:name])
render(tbl)
```
"""
function cols_move!(tbl::StyledTable, cols::AbstractVector{Symbol}; after::Union{Nothing,Symbol} = nothing)
    colnames = Symbol.(names(tbl.data))
    for col in cols
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    if after !== nothing
        after in colnames || throw(ArgumentError("Column :$after not found in DataFrame"))
        after in cols && throw(ArgumentError("Column :$after cannot appear in both `cols` and `after`"))
    end
    remaining = filter(c -> c ∉ cols, colnames)
    if after === nothing
        tbl.col_order = vcat(cols, remaining)
    else
        idx = findfirst(==(after), remaining)
        tbl.col_order = vcat(remaining[1:idx], collect(cols), remaining[idx+1:end])
    end
    return tbl
end
```

- [ ] **Step 2: Commit**

```bash
git add src/modifiers.jl
git commit -m "refactor: rewrite modifiers as tbl-first bang functions"
```

---

### Task 3: Rewrite `src/fmt.jl`

**Files:**
- Modify: `src/fmt.jl`

The internal `_apply_formatter_modifier` closure helper is replaced by `_apply_formatter!`, which takes `tbl` directly. All four public functions gain `!` and `tbl` as first arg.

- [ ] **Step 1: Replace `src/fmt.jl` with the following**

```julia
using Printf

# Internal helper: validates cols and stores formatter function on tbl
function _apply_formatter!(tbl::StyledTable, cols, f::Function)
    col_vec = cols isa Symbol ? Symbol[cols] : collect(Symbol, cols)
    colnames = Symbol.(names(tbl.data))
    for col in col_vec
        col in colnames || throw(ArgumentError("Column :$col not found in DataFrame"))
    end
    for col in col_vec
        tbl.col_formatters[col] = f
    end
    return tbl
end

"""
$TYPEDSIGNATURES

Format numeric values in `cols` to a fixed number of decimal places.

`cols` can be a single `Symbol` or an `AbstractVector{Symbol}`.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `digits`: number of decimal places (default `2`).
- `trailing_zeros`: keep trailing zeros (default `true`).

# Returns

`tbl` (modified in place).

See also: [`fmt_percent!`](@ref), [`fmt_integer!`](@ref), [`fmt!`](@ref), [`tab_options!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt_number!(tbl, [:x]; digits = 2)
render(tbl)
```
"""
function fmt_number!(tbl::StyledTable, cols; digits::Int = 2, trailing_zeros::Bool = true)
    fmt_str = Printf.Format("%.$(digits)f")
    f = function (x)
        ismissing(x) && return x
        s = Printf.format(fmt_str, Float64(x))
        trailing_zeros && return s
        s = rstrip(s, '0')
        s = rstrip(s, '.')
        return String(s)
    end
    return _apply_formatter!(tbl, cols, f)
end

"""
$TYPEDSIGNATURES

Format values in `cols` as percentage strings.

Multiplies each value by `scale` and appends `suffix`.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Keywords

- `digits`: decimal places for the percentage (default `1`).
- `scale`: multiplier applied before formatting (default `100`).
- `suffix`: string appended after the number (default `"%"`).

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_integer!`](@ref), [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt_percent!(tbl, [:rate]; digits = 1)
render(tbl)
```
"""
function fmt_percent!(tbl::StyledTable, cols; digits::Int = 1, scale::Real = 100, suffix::String = "%")
    fmt_str = Printf.Format("%.$(digits)f")
    f = x -> ismissing(x) ? x : Printf.format(fmt_str, Float64(x) * scale) * suffix
    return _apply_formatter!(tbl, cols, f)
end

"""
$TYPEDSIGNATURES

Format numeric values in `cols` as integers (rounds to nearest).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_percent!`](@ref), [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt_integer!(tbl, [:count])
render(tbl)
```
"""
function fmt_integer!(tbl::StyledTable, cols)
    f = x -> ismissing(x) ? x : string(round(Int, x))
    return _apply_formatter!(tbl, cols, f)
end

"""
$TYPEDSIGNATURES

Apply a custom formatter function to values in `cols`.

`f` receives the raw cell value and should return a display-ready value.
Return `x` unchanged for `missing` if you want [`sub_missing!`](@ref) to handle it.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `cols`: column name(s) to format.
- `f`: formatter with signature `f(value) -> Any`.

# Returns

`tbl` (modified in place).

See also: [`fmt_number!`](@ref), [`fmt_percent!`](@ref), [`fmt_integer!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
fmt!(tbl, [:x], x -> "≈$(round(Int, x))")
render(tbl)
```
"""
function fmt!(tbl::StyledTable, cols, f::Function)
    return _apply_formatter!(tbl, cols, f)
end
```

- [ ] **Step 2: Commit**

```bash
git add src/fmt.jl
git commit -m "refactor: rewrite fmt functions as tbl-first bang functions"
```

---

### Task 4: Update exports in `src/StyledTables.jl` and run tests

**Files:**
- Modify: `src/StyledTables.jl`

- [ ] **Step 1: Replace `src/StyledTables.jl` with the following**

```julia
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
export cols_label!, cols_align!, cols_hide!, cols_move!
export tab_spanner!, tab_row_group!, tab_stub!, tab_stubhead!
export tab_header!, tab_footnote!, tab_source_note!
export tab_style!
export sub_missing!, tab_options!
export fmt!, fmt_number!, fmt_percent!, fmt_integer!

end
```

- [ ] **Step 2: Run the full test suite**

```julia
using Pkg; Pkg.activate("test"); Pkg.test("StyledTables")
```

Expected: `Test Summary: | Pass  Total  Time` — all 125 tests pass. Reference files are unchanged so no regeneration is needed.

- [ ] **Step 3: Commit**

```bash
git add src/StyledTables.jl
git commit -m "refactor: update exports to bang API names"
```

---

## Chunk 2: Documentation Update

### Task 5: Update `docs/src/` pages to use the bang API

**Files:**
- Modify: all `.md` files under `docs/src/` that contain `@example` blocks

Every `@example` block that currently builds a table with the old pipe pattern must be rewritten to the bang pattern:

**Old pattern (pipe):**
```julia
df |> StyledTable |> tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |> render
```

**New pattern (bang):**
```julia
tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes"; columns = [:efficacy, :safety])
render(tbl)
```

Key rules:
1. Single-modifier blocks: `tbl = StyledTable(df)` on line 1, then `modifier!(tbl, ...)`, then `render(tbl)` as the last line (auto-displays the table).
2. Multi-modifier blocks: same structure, one `modifier!` call per line.
3. `render(tbl)` must be the **last expression** so Documenter captures and displays its output.
4. Named `@example` environments still share state — `tbl` defined in one block is available in the next. Update subsequent blocks accordingly so they do not re-define `tbl` if they intend to build on the previous result; OR redefine `tbl` from scratch if each block should stand alone.
5. The `using StyledTables, DataFrames` line stays in the first `@example` block of each page.

**Files to update (read each, rewrite all `@example` blocks, verify with makedocs):**

- `docs/src/index.md`
- `docs/src/getting_started.md`
- `docs/src/reference/columns.md`
- `docs/src/reference/structure.md`
- `docs/src/reference/annotations.md`
- `docs/src/reference/styling.md`
- `docs/src/reference/formatting.md`
- `docs/src/reference/rendering.md`
- `docs/src/examples/cars.md`
- `docs/src/examples/clinical.md`
- `docs/src/examples/report.md`

- [ ] **Step 1: Update `docs/src/getting_started.md`**

Replace all `@example gettingstarted` blocks:

````markdown
```@example gettingstarted
using StyledTables, DataFrames

df = DataFrame(
    treatment = ["Placebo", "Low Dose", "High Dose"],
    n         = [30, 30, 30],
    response  = [0.12, 0.38, 0.61],
)

tbl = StyledTable(df)
render(tbl)
```

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response"; subtitle = "Phase II Clinical Trial")
render(tbl)
```

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, treatment = "Treatment Arm", n = "N", response = "Response Rate")
cols_align!(tbl, :center, [:n, :response])
render(tbl)
```

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, treatment = "Treatment Arm", n = "N", response = "Response Rate")
tab_spanner!(tbl, "Results"; columns = [:n, :response])
render(tbl)
```

```@example gettingstarted
tbl = StyledTable(df)
tab_header!(tbl, "Treatment Response")
cols_label!(tbl, treatment = "Treatment Arm", n = "N", response = "Response Rate")
tab_spanner!(tbl, "Results"; columns = [:n, :response])
fmt_percent!(tbl, [:response]; digits = 1)
render(tbl)
```
````

- [ ] **Step 2: Update all remaining docs pages**

Apply the same bang-pattern transformation to every `@example` block in the remaining 10 files listed above. The logic for each block is identical — only the modifier names and arguments change. Every block ends with `render(tbl)`.

For the example pages (`cars.md`, `clinical.md`, `report.md`), each "Step N" block currently builds on the same `tbl`. With the bang API, redefine `tbl` at the start of each "Step" block from scratch (the data variable persists in the named `@example` environment, but rebuild `tbl` so each step is self-contained and shows the full table state at that point).

- [ ] **Step 3: Verify makedocs runs without `@example` errors**

```julia
using Pkg; Pkg.activate("docs")
include("docs/make.jl")
```

Expected output: no `failed to run @example` warnings. Only expected warnings are the non-blocking ones about unresolved `@ref` for struct types and the deployment skipping message.

- [ ] **Step 4: Commit**

```bash
git add docs/src/
git commit -m "docs: update all @example blocks to bang API"
```

---

### Task 6: Final verification

- [ ] **Step 1: Run tests one final time**

```julia
using Pkg; Pkg.activate("test"); Pkg.test("StyledTables")
```

Expected: 125 tests, all passing.

- [ ] **Step 2: Update CLAUDE.md pipeline example**

In `CLAUDE.md`, find the pipeline API example and replace it with the bang style:

```markdown
**Pipeline API:**
```julia
tbl = StyledTable(df)
tab_spanner!(tbl, "Label"; columns=[:a,:b])
tab_header!(tbl, "Title")
render(tbl)
```
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md API example to bang style"
```
