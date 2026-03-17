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

function html_str(tbl)
    io = IOBuffer()
    show(io, MIME("text/html"), render(tbl))
    String(take!(io))
end

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
        cols_label!(tbl, :x => "Variable X", :y => "Variable Y")
        run_reftest(tbl, "references/cols_label/relabeled_two_cols")

        tbl = StyledTable(df)
        cols_label!(tbl, :x => "Only X")
        run_reftest(tbl, "references/cols_label/relabeled_one_col")

        @test_throws ArgumentError cols_label!(StyledTable(df), :typo => "Label")
    end

    # -----------------------------------------------------------------------
    @testset "cols_label! input types" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        # Canonical reference: Pair... varargs method with Symbol => String pairs
        ref = let tbl = StyledTable(df)
            cols_label!(tbl, :x => "VarX", :y => "VarY")
            html_str(tbl)
        end

        # AbstractVector{<:Pair{Symbol, Symbol}}
        # Vector{Pair{Symbol,Symbol}} (invariant) hits the standalone method;
        # covariant subtype also exercises the Union path.
        let tbl = StyledTable(df)
            cols_label!(tbl, Pair{Symbol,Symbol}[:x => :VarX, :y => :VarY])
            @test html_str(tbl) == ref
        end

        # AbstractVector{<:Pair{AbstractString, AbstractString}}
        let tbl = StyledTable(df)
            cols_label!(tbl, ["x" => "VarX", "y" => "VarY"])
            @test html_str(tbl) == ref
        end

        # AbstractVector{<:Pair{AbstractString, Symbol}}
        let tbl = StyledTable(df)
            cols_label!(tbl, Pair{String,Symbol}["x" => :VarX, "y" => :VarY])
            @test html_str(tbl) == ref
        end

        # AbstractVector{<:Pair{Symbol, AbstractString}}
        let tbl = StyledTable(df)
            cols_label!(tbl, [:x => "VarX", :y => "VarY"])
            @test html_str(tbl) == ref
        end

        # AbstractDict{Symbol, Symbol}
        let tbl = StyledTable(df)
            cols_label!(tbl, Dict{Symbol,Symbol}(:x => :VarX, :y => :VarY))
            @test html_str(tbl) == ref
        end

        # AbstractDict{AbstractString, AbstractString}
        let tbl = StyledTable(df)
            cols_label!(tbl, Dict{String,String}("x" => "VarX", "y" => "VarY"))
            @test html_str(tbl) == ref
        end

        # AbstractDict{AbstractString, Symbol}
        let tbl = StyledTable(df)
            cols_label!(tbl, Dict{String,Symbol}("x" => :VarX, "y" => :VarY))
            @test html_str(tbl) == ref
        end

        # AbstractDict{Symbol, AbstractString}
        let tbl = StyledTable(df)
            cols_label!(tbl, Dict{Symbol,String}(:x => "VarX", :y => "VarY"))
            @test html_str(tbl) == ref
        end
    end

    # -----------------------------------------------------------------------
    @testset "cols_label! Multiline" begin
        df = DataFrame(
            placebo_n   = ["12 (24%)", "18 (36%)"],
            treatment_n = ["15 (30%)", "20 (40%)"],
        )

        tbl = StyledTable(df)
        cols_label!(tbl,
            :placebo_n   => Multiline("Placebo (N=50)", "n (%)"),
            :treatment_n => Multiline("Treatment (N=50)", "n (%)"),
        )
        run_reftest(tbl, "references/cols_label/multiline_label")

        # Multiline label + column footnote: SummaryTables.Annotated(Multiline(...))
        # renders correctly (verified: shows multiline text + superscript footnote number).
        tbl2 = StyledTable(df)
        cols_label!(tbl2, :placebo_n => Multiline("Placebo (N=50)", "n (%)"))
        tab_footnote!(tbl2, "Percentages based on safety population"; columns = [:placebo_n])
        run_reftest(tbl2, "references/cols_label/multiline_label_annotated")
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
        tab_spanner!(tbl, "Treatment" => [:dose, :response], "Participant" => [:name])
        run_reftest(tbl, "references/tab_spanner/basic")

        tbl = StyledTable(df)
        tab_spanner!(tbl, Dict("Treatment" => [:dose, :response], "Participant" => [:name]))
        run_reftest(tbl, "references/tab_spanner/two_spanners")

        @test_throws ArgumentError tab_spanner!(StyledTable(df), "X" => [:typo])
    end

    # -----------------------------------------------------------------------
    @testset "tab_spanner! input types" begin
        df = DataFrame(name = ["Alice"], dose = [10], response = [0.9])

        # Canonical reference: Pair... varargs method
        ref = let tbl = StyledTable(df)
            tab_spanner!(tbl, "Treatment" => [:dose, :response])
            html_str(tbl)
        end

        # AbstractVector{<:Pair{AbstractString, Vector{AbstractString}}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, ["Treatment" => ["dose", "response"]])
            @test html_str(tbl) == ref
        end

        # AbstractVector{<:Pair{Symbol, Vector{Symbol}}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, [:Treatment => [:dose, :response]])
            @test html_str(tbl) == ref
        end

        # AbstractVector{<:Pair{Symbol, Vector{AbstractString}}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Pair{Symbol,Vector{String}}[:Treatment => ["dose", "response"]])
            @test html_str(tbl) == ref
        end

        # AbstractVector{<:Pair{AbstractString, Vector{Symbol}}}
        # Vector{Pair{String,Vector{Symbol}}} hits the standalone method;
        # covariant type annotation exercises the Union path.
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Pair{String,Vector{Symbol}}["Treatment" => [:dose, :response]])
            @test html_str(tbl) == ref
        end

        # AbstractDict{AbstractString, Vector{AbstractString}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict{String,Vector{String}}("Treatment" => ["dose", "response"]))
            @test html_str(tbl) == ref
        end

        # AbstractDict{Symbol, Vector{AbstractString}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict{Symbol,Vector{String}}(:Treatment => ["dose", "response"]))
            @test html_str(tbl) == ref
        end

        # AbstractDict{AbstractString, Vector{Symbol}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict{String,Vector{Symbol}}("Treatment" => [:dose, :response]))
            @test html_str(tbl) == ref
        end

        # AbstractDict{Symbol, Vector{Symbol}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict{Symbol,Vector{Symbol}}(:Treatment => [:dose, :response]))
            @test html_str(tbl) == ref
        end
    end

    # -----------------------------------------------------------------------
    @testset "tab_spanner! Multiline" begin
        df = DataFrame(dose = [10, 20], response = [0.9, 0.8])

        tbl = StyledTable(df)
        tab_spanner!(tbl, Multiline("Treatment", "(N=50)") => [:dose, :response])
        run_reftest(tbl, "references/tab_spanner/multiline_label")
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
        tab_spanner!(tbl, "XY" => [:x, :y])
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

        # varargs form — must produce identical output to vector form
        let df = DataFrame(label = ["A", "B"], value = [1.0, 2.0])
            ref = let tbl = StyledTable(df)
                tab_style!(tbl, [:value]; bold = true)
                html_str(tbl)
            end

            # single-symbol varargs
            tbl = StyledTable(df)
            tab_style!(tbl, :value; bold = true)
            @test html_str(tbl) == ref

            # multi-symbol varargs
            tbl = StyledTable(df)
            tab_style!(tbl, :label, :value; bold = true)
            ref2 = let t = StyledTable(df)
                tab_style!(t, [:label, :value]; bold = true)
                html_str(t)
            end
            @test html_str(tbl) == ref2
        end
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
