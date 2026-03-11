using StyledTables
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
as_latex(object) = AsMIME{MIME"text/latex"}(object)
as_typst(object) = AsMIME{MIME"text/typst"}(object)

"""
    run_reftest(tbl::StyledTable, relpath::AbstractString)

Render `tbl` to a SummaryTables.Table, then compare its HTML, LaTeX, and
Typst output against reference files at `test/<relpath>.txt`,
`test/<relpath>.latex.txt`, and `test/<relpath>.typ.txt` respectively.
If a file does not yet exist, ReferenceTests creates it on the first run.
"""
function run_reftest(tbl, relpath)
    rendered = render(tbl)
    @test_reference joinpath(@__DIR__, relpath * ".txt") as_html(rendered)
    @test_reference joinpath(@__DIR__, relpath * ".latex.txt") as_latex(rendered)
    @test_reference joinpath(@__DIR__, relpath * ".typ.txt") as_typst(rendered)
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
    @testset "cols_label" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            StyledTable(df) |> cols_label(x = "Variable X", y = "Variable Y"),
            "references/cols_label/relabeled_two_cols",
        )

        run_reftest(
            StyledTable(df) |> cols_label(x = "Only X"),
            "references/cols_label/relabeled_one_col",
        )

        # Error path: unknown column name
        @test_throws ArgumentError StyledTable(df) |> cols_label(typo = "Label")
    end

    # -----------------------------------------------------------------------
    @testset "cols_align" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            StyledTable(df) |> cols_align(:center, [:x, :y]),
            "references/cols_align/center_both",
        )

        run_reftest(
            StyledTable(df) |> cols_align(:right),
            "references/cols_align/right_all",
        )

        run_reftest(
            StyledTable(df) |> cols_align(:left, [:x]),
            "references/cols_align/left_one_col",
        )

        # Error paths
        @test_throws ArgumentError cols_align(:centre)
        @test_throws ArgumentError StyledTable(df) |> cols_align(:left, [:nonexistent])
    end

    # -----------------------------------------------------------------------
    @testset "tab_spanner" begin
        df = DataFrame(name = ["Alice", "Bob"], dose = [10, 20], response = [0.9, 0.8])

        run_reftest(
            StyledTable(df) |> tab_spanner("Treatment"; columns = [:dose, :response]),
            "references/tab_spanner/basic",
        )

        run_reftest(
            StyledTable(df) |> tab_spanner("Treatment"; columns = [:dose, :response])
                    |> tab_spanner("Participant"; columns = [:name]),
            "references/tab_spanner/two_spanners",
        )

        # Error path: unknown column
        @test_throws ArgumentError StyledTable(df) |> tab_spanner("X"; columns = [:typo])
    end

    # -----------------------------------------------------------------------
    @testset "tab_stub" begin
        df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])

        run_reftest(
            StyledTable(df) |> tab_stub(:rowname),
            "references/tab_stub/basic",
        )

        # Error path
        @test_throws ArgumentError StyledTable(df) |> tab_stub(:nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "tab_header" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            StyledTable(df) |> tab_header("My Table"),
            "references/tab_header/title_only",
        )

        run_reftest(
            StyledTable(df) |> tab_header("My Table"; subtitle = "A subtitle"),
            "references/tab_header/title_and_subtitle",
        )

        run_reftest(
            StyledTable(df) |> tab_header("My Table"; subtitle = "Subtitle")
                    |> tab_spanner("XY"; columns = [:x, :y]),
            "references/tab_header/with_spanner",
        )
    end

    # -----------------------------------------------------------------------
    @testset "tab_footnote" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            StyledTable(df) |> tab_footnote("Source: internal data"),
            "references/tab_footnote/single",
        )

        run_reftest(
            StyledTable(df) |> tab_footnote("Source: internal data") |> tab_footnote("n = 2"),
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
            StyledTable(df) |> tab_row_group(:arm),
            "references/tab_row_group/basic",
        )

        run_reftest(
            StyledTable(df) |> tab_row_group(:arm; indent_pt = 24),
            "references/tab_row_group/custom_indent",
        )

        # Error path
        @test_throws ArgumentError StyledTable(df) |> tab_row_group(:nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "cols_hide" begin
        df = DataFrame(a = [1, 2], b = [3, 4], c = [5, 6])

        run_reftest(
            StyledTable(df) |> cols_hide(:c),
            "references/cols_hide/single",
        )

        run_reftest(
            StyledTable(df) |> cols_hide(:a, :c),
            "references/cols_hide/multiple",
        )

        @test_throws ArgumentError StyledTable(df) |> cols_hide(:nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "cols_move" begin
        df = DataFrame(a = [1, 2], b = [3, 4], c = [5, 6])

        run_reftest(
            StyledTable(df) |> cols_move([:c, :b]),
            "references/cols_move/to_start",
        )

        run_reftest(
            StyledTable(df) |> cols_move([:c]; after = :a),
            "references/cols_move/after_col",
        )

        @test_throws ArgumentError StyledTable(df) |> cols_move([:nonexistent])
        @test_throws ArgumentError StyledTable(df) |> cols_move([:c]; after = :nonexistent)
        @test_throws ArgumentError StyledTable(df) |> cols_move([:c]; after = :c)
    end

    # -----------------------------------------------------------------------
    @testset "tab_stubhead" begin
        df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])

        run_reftest(
            StyledTable(df) |> tab_stub(:rowname) |> tab_stubhead("Name"),
            "references/tab_stubhead/basic",
        )
    end

    # -----------------------------------------------------------------------
    @testset "tab_source_note" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            StyledTable(df) |> tab_source_note("Source: internal data"),
            "references/tab_source_note/single",
        )

        run_reftest(
            StyledTable(df) |> tab_source_note("Source: A") |> tab_source_note("Note: B"),
            "references/tab_source_note/multiple",
        )
    end

    # -----------------------------------------------------------------------
    @testset "sub_missing" begin
        df = DataFrame(x = [1, missing, 3], y = ["a", "b", missing])

        run_reftest(
            StyledTable(df) |> sub_missing(),
            "references/sub_missing/default",
        )

        run_reftest(
            StyledTable(df) |> sub_missing(with = "N/A"),
            "references/sub_missing/custom_text",
        )
    end

    # -----------------------------------------------------------------------
    @testset "tab_options" begin
        df = DataFrame(x = [1.23456, 2.34567], y = [0.001, 999.9])

        run_reftest(
            StyledTable(df) |> tab_options(round_digits = 2, round_mode = :digits),
            "references/tab_options/round_digits",
        )

        run_reftest(
            StyledTable(df) |> tab_options(round_digits = 4, round_mode = :sigdigits, trailing_zeros = true),
            "references/tab_options/sigdigits_trailing",
        )

        @test_throws ArgumentError StyledTable(df) |> tab_options(round_mode = :invalid)
    end

    # -----------------------------------------------------------------------
    @testset "tab_footnote column location" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        run_reftest(
            StyledTable(df) |> tab_footnote("See methods"; columns = [:x]),
            "references/tab_footnote/col_single",
        )

        run_reftest(
            StyledTable(df) |> tab_footnote("Measured at baseline"; columns = [:x, :y]),
            "references/tab_footnote/col_multiple",
        )

        @test_throws ArgumentError StyledTable(df) |> tab_footnote("Note"; columns = [:nonexistent])
    end

    # -----------------------------------------------------------------------
    @testset "tab_style" begin
        df = DataFrame(label = ["A", "B"], value = [1.0, 2.0])

        run_reftest(
            StyledTable(df) |> tab_style([:value]; bold = true),
            "references/tab_style/bold_col",
        )

        run_reftest(
            StyledTable(df) |> tab_style([:label]; color = "#FF0000", italic = true),
            "references/tab_style/color_italic",
        )

        @test_throws ArgumentError StyledTable(df) |> tab_style([:nonexistent]; bold = true)
    end

    # -----------------------------------------------------------------------
    @testset "fmt_number" begin
        df = DataFrame(x = [1.23456, 2.34567], y = [10.0, 20.0])

        run_reftest(
            StyledTable(df) |> fmt_number([:x]; digits = 2),
            "references/fmt/number_two_digits",
        )

        run_reftest(
            StyledTable(df) |> fmt_number([:x, :y]; digits = 1, trailing_zeros = true),
            "references/fmt/number_trailing_zeros",
        )

        @test_throws ArgumentError StyledTable(df) |> fmt_number([:nonexistent]; digits = 2)
    end

    @testset "fmt_percent" begin
        df = DataFrame(rate = [0.123, 0.456])

        run_reftest(
            StyledTable(df) |> fmt_percent([:rate]; digits = 1),
            "references/fmt/percent_default",
        )
    end

    @testset "fmt_integer" begin
        df = DataFrame(n = [1.7, 2.3])

        run_reftest(
            StyledTable(df) |> fmt_integer([:n]),
            "references/fmt/integer",
        )
    end

    @testset "fmt (custom)" begin
        df = DataFrame(x = [1.0, 2.0])

        run_reftest(
            StyledTable(df) |> fmt([:x], x -> "≈$(round(Int, x))"),
            "references/fmt/custom",
        )

        @test_throws ArgumentError StyledTable(df) |> fmt([:nonexistent], identity)
    end

end
