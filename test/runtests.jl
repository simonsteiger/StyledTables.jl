using StyledTables
using SummaryTables
using DataFrames
using Test
using ReferenceTests
using Colors

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
    @testset "cols_label! function form" begin
        df = DataFrame(first_name = ["Alice", "Bob"], last_name = ["Smith", "Jones"])

        # Reference test 1: uppercase applied to all columns
        tbl = StyledTable(df)
        cols_label!(uppercase, tbl)
        run_reftest(tbl, "references/cols_label/fn_uppercase_all")

        # Reference test 2: do-block with titlecase + underscore replacement, all columns
        tbl = StyledTable(df)
        cols_label!(tbl) do col
            titlecase(replace(col, "_" => " "))
        end
        run_reftest(tbl, "references/cols_label/fn_titlecase_all")

        # Reference test 3: Symbol selector — relabel only a subset
        tbl = StyledTable(df)
        cols_label!(tbl, [:first_name]) do col
            titlecase(replace(col, "_" => " "))
        end
        run_reftest(tbl, "references/cols_label/fn_symbol_selector")

        # Equality test: String selector produces same output as Symbol selector
        ref = let t = StyledTable(df)
            cols_label!(t, [:first_name]) do col
                titlecase(replace(col, "_" => " "))
            end
            html_str(t)
        end
        tbl = StyledTable(df)
        cols_label!(tbl, ["first_name"]) do col
            titlecase(replace(col, "_" => " "))
        end
        @test html_str(tbl) == ref

        # Unit test: unknown column in selector → ArgumentError
        @test_throws ArgumentError cols_label!(uppercase, StyledTable(df), [:typo])

        # Unit test: empty selector is a silent no-op (no entries written to col_labels)
        tbl = StyledTable(df)
        cols_label!(uppercase, tbl, Symbol[])
        @test isempty(tbl.col_labels)
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

        tbl2 = StyledTable(df)
        tab_spanner!(tbl2, "Treatment" => [:dose, :response])
        @test tbl2.spanners[1].level == 1

        tbl3 = StyledTable(df)
        tab_spanner!(tbl3, "Treatment" => [:dose, :response]; level = 2)
        @test tbl3.spanners[1].level == 2

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
    @testset "tab_spanner! nested" begin
        df = DataFrame(
            species    = ["Adelie", "Chinstrap"],
            bill_len   = [38.9, 48.7],
            bill_depth = [17.8, 18.3],
            flipper_len = [181, 195],
            body_mass  = [3750, 3800],
        )

        # Error: non-contiguous levels (1 and 3, no level 2)
        @test_throws ArgumentError begin
            tbl = StyledTable(df)
            tab_spanner!(tbl, "A"; columns = [:bill_len], level = 1)
            tab_spanner!(tbl, "B"; columns = [:bill_depth], level = 3)
            render(tbl)
        end

        # Error: same-level partial overlap
        @test_throws ArgumentError begin
            tbl = StyledTable(df)
            tab_spanner!(tbl, "A"; columns = [:bill_len, :bill_depth])
            tab_spanner!(tbl, "B"; columns = [:bill_depth, :flipper_len])
            render(tbl)
        end

        # Error: cross-level partial overlap
        @test_throws ArgumentError begin
            tbl = StyledTable(df)
            tab_spanner!(tbl, "A"; columns = [:bill_len, :bill_depth, :flipper_len])
            tab_spanner!(tbl, "B"; columns = [:bill_depth, :flipper_len, :body_mass], level = 2)
            render(tbl)
        end

        # Scenario A: level-2 spanner covers exactly the same columns as level-1
        tbl = StyledTable(df)
        tab_spanner!(tbl, "Length (mm)";
            columns = [:bill_len, :bill_depth, :flipper_len])
        tab_spanner!(tbl, "Physical measurements";
            columns = [:bill_len, :bill_depth, :flipper_len], level = 2)
        run_reftest(tbl, "references/tab_spanner/nested_two_levels")

        # Scenario B: level-2 spanner covers level-1 columns PLUS an extra ungrouped column
        tbl = StyledTable(df)
        tab_spanner!(tbl, "Length (mm)";
            columns = [:bill_len, :bill_depth, :flipper_len])
        tab_spanner!(tbl, "Physical measurements";
            columns = [:bill_len, :bill_depth, :flipper_len, :body_mass], level = 2)
        run_reftest(tbl, "references/tab_spanner/nested_uncovered_col")
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
        fmt!(x -> "≈$(round(Int, x))", tbl, :x)
        run_reftest(tbl, "references/fmt/custom")

        @test_throws ArgumentError fmt!(StyledTable(df), :nonexistent, identity)
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

    # -----------------------------------------------------------------------
    @testset "tab_style! static — widened color type" begin
        df = DataFrame(x = [1, 2, 3])

        tbl = StyledTable(df)
        tab_style!(tbl, :x; color=:red)
        @test tbl.col_styles[:x].color isa String
        @test startswith(tbl.col_styles[:x].color, "#")

        tbl2 = StyledTable(df)
        tab_style!(tbl2, :x; color=colorant"#1a7340")
        @test tbl2.col_styles[:x].color isa String
        @test startswith(tbl2.col_styles[:x].color, "#")

        @test_throws ArgumentError tab_style!(StyledTable(df), :x; color=42)
    end

    # -----------------------------------------------------------------------
    @testset "tab_style! function form — call time" begin
        df = DataFrame(change = [-0.1, 0.0, 0.3])
        f = val -> val > 0 ? (; color=:green) : nothing

        # Column validation
        @test_throws ArgumentError tab_style!(x -> nothing, StyledTable(df), [:nonexistent])

        # Function is stored
        tbl = StyledTable(df)
        tab_style!(f, tbl, :change)
        @test haskey(tbl.col_style_fns, :change)
        @test tbl.col_style_fns[:change] === f

        # Static baseline stored alongside function
        tbl2 = StyledTable(df)
        tab_style!(f, tbl2, :change; bold=true)
        @test haskey(tbl2.col_style_fns, :change)
        @test haskey(tbl2.col_styles, :change)
        @test tbl2.col_styles[:change].bold == true

        # Function-only call leaves previous static baseline intact
        tbl3 = StyledTable(df)
        tab_style!(tbl3, :change; bold=true)
        tab_style!(x -> nothing, tbl3, :change)
        @test haskey(tbl3.col_styles, :change)
        @test tbl3.col_styles[:change].bold == true

        # Static-only call leaves previous function intact
        tbl4 = StyledTable(df)
        tab_style!(f, tbl4, :change)
        tab_style!(tbl4, :change; bold=true)
        @test haskey(tbl4.col_style_fns, :change)
        @test tbl4.col_style_fns[:change] === f
    end

    # -----------------------------------------------------------------------
    @testset "tab_style! reference tests" begin
        df = DataFrame(
            label  = ["A", "B", "C"],
            change = [-0.12, 0.0, 0.34],
            score  = [0.2, 0.5, 0.9],
        )

        # Conditional color only
        tbl = StyledTable(df)
        tab_style!(tbl, :change) do val
            val > 0 ? (; color=:green) : val < 0 ? (; color=:red) : nothing
        end
        run_reftest(tbl, "references/tab_style/conditional_color")

        # Conditional bold only (no color)
        tbl = StyledTable(df)
        tab_style!(tbl, :change) do val
            val > 0 ? (; bold=true) : nothing
        end
        run_reftest(tbl, "references/tab_style/conditional_bold")

        # Composition: static bold baseline + conditional color
        tbl = StyledTable(df)
        tab_style!(tbl, :change; bold=true) do val
            val > 0 ? (; color=:green) : val < 0 ? (; color=:red) : nothing
        end
        run_reftest(tbl, "references/tab_style/composition_bold_and_color")

        # Function explicitly clears baseline bold on the zero cell
        tbl = StyledTable(df)
        tab_style!(tbl, :change; bold=true) do val
            val == 0.0 ? (; bold=nothing) : nothing
        end
        run_reftest(tbl, "references/tab_style/clear_baseline_bold")

        # Function explicitly clears baseline color on negative cells
        tbl = StyledTable(df)
        tab_style!(tbl, :change; color=:green) do val
            val < 0 ? (; color=nothing) : nothing
        end
        run_reftest(tbl, "references/tab_style/clear_baseline_color")

        # Gradient via Colors.jl range
        GRADIENT = range(colorant"white", stop=colorant"#1a7340", length=100)
        tbl = StyledTable(df)
        tab_style!(tbl, :score) do val
            idx = round(Int, clamp(val, 0.0, 1.0) * 99) + 1
            (; color=GRADIENT[idx])
        end
        run_reftest(tbl, "references/tab_style/gradient")

        # Static Symbol color input
        tbl = StyledTable(df)
        tab_style!(tbl, :change; color=:blue)
        run_reftest(tbl, "references/tab_style/static_symbol_color")

        # Static AbstractString color input (CSS name)
        tbl = StyledTable(df)
        tab_style!(tbl, :change; color="green")
        run_reftest(tbl, "references/tab_style/static_string_color")

        # Static Colorant input
        tbl = StyledTable(df)
        tab_style!(tbl, :change; color=colorant"#1a7340")
        run_reftest(tbl, "references/tab_style/static_colorant")

        # Function returns nothing on all cells; static baseline still applies
        tbl = StyledTable(df)
        tab_style!(tbl, :change; color=:blue) do val
            nothing
        end
        run_reftest(tbl, "references/tab_style/fn_nothing_with_baseline")

        # Repeated calls: second function-only call overwrites function, static baseline survives
        tbl = StyledTable(df)
        f1 = val -> (; color=:red)
        f2 = val -> (; color=:green)
        tab_style!(f1, tbl, :change; bold=true)
        tab_style!(f2, tbl, :change)
        @test tbl.col_style_fns[:change] === f2
        @test tbl.col_styles[:change].bold == true
        run_reftest(tbl, "references/tab_style/repeated_fn_overwrites")

        # Repeated calls: second static-only call updates style, previous function survives
        tbl = StyledTable(df)
        f = val -> (; color=:green)
        tab_style!(f, tbl, :change; bold=true)
        tab_style!(tbl, :change; bold=false)
        @test tbl.col_style_fns[:change] === f
        @test tbl.col_styles[:change].bold == false
        run_reftest(tbl, "references/tab_style/repeated_static_overwrites")
    end

    # -----------------------------------------------------------------------
    @testset "tab_style! render-time errors" begin
        df = DataFrame(x = [1, 2, 3])

        # Unrecognised NamedTuple key
        tbl = StyledTable(df)
        tab_style!(tbl, :x) do val
            (; color=:red, align=:center)
        end
        @test_throws ArgumentError render(tbl)

        # Unsupported color type in function return value
        tbl2 = StyledTable(df)
        tab_style!(tbl2, :x) do val
            (; color=42)
        end
        @test_throws ArgumentError render(tbl2)
    end

    # -----------------------------------------------------------------------
    @testset "_resolve_color" begin
        @test StyledTables._resolve_color(nothing) === nothing
        @test StyledTables._resolve_color(:red) isa String
        @test startswith(StyledTables._resolve_color(:red), "#")
        @test StyledTables._resolve_color("green") isa String
        @test startswith(StyledTables._resolve_color("green"), "#")
        @test StyledTables._resolve_color("#1a7340") isa String
        @test startswith(StyledTables._resolve_color("#1a7340"), "#")
        @test StyledTables._resolve_color(colorant"blue") isa String
        @test startswith(StyledTables._resolve_color(colorant"blue"), "#")
        @test_throws ArgumentError StyledTables._resolve_color(42)
    end

end
