using StyledTables
using SummaryTables
using DataFrames
using Test
using ReferenceTests
using Colors
using Logging

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

    @testset "Aqua.jl" begin
        include("Aqua.jl")
    end

    # -----------------------------------------------------------------------
    @testset "StyledTable / basic render" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        run_reftest(StyledTable(df), "references/styled_table/basic")

        # Non-DataFrame Tables.jl-compatible input is converted to DataFrame
        let nt = [(x = 1, y = 2), (x = 3, y = 4)]
            tbl = StyledTable(nt)
            @test tbl.data isa DataFrame
            @test names(tbl.data) == ["x", "y"]
            @test nrow(tbl.data) == 2
        end
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
        # renders correctly (shows multiline text + superscript footnote number).
        let tbl2 = StyledTable(df)
            cols_label!(tbl2, :placebo_n => Multiline("Placebo (N=50)", "n (%)"))
            tab_footnote!(tbl2, "Percentages based on safety population" => :placebo_n)
            run_reftest(tbl2, "references/cols_label/multiline_label_annotated")
        end
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

        # Scalar Symbol selector — delegates to vector form
        let df = DataFrame(first_name = ["Alice"], last_name = ["Smith"])
            tbl = StyledTable(df)
            cols_label!(uppercase, tbl, :first_name)
            @test tbl.col_labels[:first_name] == "FIRST_NAME"
            @test !haskey(tbl.col_labels, :last_name)
        end

        # Scalar String selector — delegates to Symbol then vector form
        let df = DataFrame(first_name = ["Alice"], last_name = ["Smith"])
            tbl = StyledTable(df)
            cols_label!(uppercase, tbl, "first_name")
            @test tbl.col_labels[:first_name] == "FIRST_NAME"
            @test !haskey(tbl.col_labels, :last_name)
        end
    end

    # -----------------------------------------------------------------------
    @testset "cols_align!" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        # --- pair form: multiple cols, same alignment ---
        tbl = StyledTable(df)
        cols_align!(tbl, :x => :center, :y => :center)
        run_reftest(tbl, "references/cols_align/center_both")

        # --- apply-to-all form ---
        tbl = StyledTable(df)
        cols_align!(tbl, :right)
        run_reftest(tbl, "references/cols_align/right_all")

        # --- pair form: single col ---
        tbl = StyledTable(df)
        cols_align!(tbl, :x => :left)
        run_reftest(tbl, "references/cols_align/left_one_col")

        # --- dict / vector-of-pairs form ---
        tbl = StyledTable(df)
        cols_align!(tbl, Dict(:x => :center, :y => :center))
        run_reftest(tbl, "references/cols_align/center_both")

        tbl = StyledTable(df)
        cols_align!(tbl, [:x => :center, :y => :center])
        run_reftest(tbl, "references/cols_align/center_both")

        # --- type-predicate form ---
        df2 = DataFrame(label = ["a", "b"], count = [1, 2], score = [0.5, 0.9])
        tbl = StyledTable(df2)
        cols_align!(tbl, :right) do T
            T <: Real
        end
        @test tbl.col_alignments[:count] == :right
        @test tbl.col_alignments[:score] == :right
        @test !haskey(tbl.col_alignments, :label)

        # --- error cases ---
        @test_throws ArgumentError cols_align!(StyledTable(df), :centre)
        @test_throws ArgumentError cols_align!(StyledTable(df), :x => :centre)
        @test_throws ArgumentError cols_align!(StyledTable(df), :nonexistent => :left)

        # --- vector-key pair form: Symbol vector ---
        tbl = StyledTable(df)
        cols_align!(tbl, [:x, :y] => :center)
        run_reftest(tbl, "references/cols_align/center_both")

        # --- vector-key pair form: String vector ---
        tbl = StyledTable(df)
        cols_align!(tbl, ["x", "y"] => :center)
        run_reftest(tbl, "references/cols_align/center_both")

        # --- vector-key pair form: multiple pairs ---
        tbl = StyledTable(df)
        cols_align!(tbl, [:x] => :left, [:y] => :right)
        @test tbl.col_alignments[:x] == :left
        @test tbl.col_alignments[:y] == :right

        # --- vector-key error: invalid column ---
        @test_throws ArgumentError cols_align!(StyledTable(df), [:nonexistent] => :left)

        # --- vector-key error: invalid alignment ---
        @test_throws ArgumentError cols_align!(StyledTable(df), [:x] => :centre)
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
            tab_spanner!(tbl, :Treatment => ["dose", "response"])
            @test html_str(tbl) == ref
        end


        let tbl = StyledTable(df)
            tab_spanner!(tbl, "Treatment" => [:dose, :response])
            @test html_str(tbl) == ref
        end

        # AbstractDict{AbstractString, Vector{AbstractString}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict("Treatment" => ["dose", "response"]))
            @test html_str(tbl) == ref
        end

        # AbstractDict{Symbol, Vector{AbstractString}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict(:Treatment => ["dose", "response"]))
            @test html_str(tbl) == ref
        end

        # AbstractDict{AbstractString, Vector{Symbol}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict("Treatment" => [:dose, :response]))
            @test html_str(tbl) == ref
        end

        # AbstractDict{Symbol, Vector{Symbol}}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict(:Treatment => [:dose, :response]))
            @test html_str(tbl) == ref
        end

        # Single pair
        ref = let tbl = StyledTable(df)
            tab_spanner!(tbl, "Treatment" => :dose)
            html_str(tbl)
        end
        
        # AbstractDict{Symbol, Symbol}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict(:Treatment => :dose))
            @test html_str(tbl) == ref
        end
        
        # AbstractDict{String, Symbol}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict(:Treatment => :dose))
            @test html_str(tbl) == ref
        end
        
        # AbstractDict{String, String}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict("Treatment" => "dose"))
            @test html_str(tbl) == ref
        end
        
        # AbstractDict{Symbol, String}
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict("Treatment" => :dose))
            @test html_str(tbl) == ref
        end

        # Single Multiline spanner
        ref = let tbl = StyledTable(df)
            tab_spanner!(tbl, Multiline("Treatment", "(mg)") => :dose)
            html_str(tbl)
        end
        
        # Single Multiline inside Dict
        let tbl = StyledTable(df)
            tab_spanner!(tbl, Dict(Multiline("Treatment", "(mg)") => :dose))
            @test html_str(tbl) == ref
        end
        
        # Single Multiline inside Vector
        let tbl = StyledTable(df)
            tab_spanner!(tbl, [Multiline("Treatment", "(mg)") => :dose])
            @test html_str(tbl) == ref
        end

        # Mixed value types — Dict{String, Any} → ArgumentError
        @test_throws ArgumentError tab_spanner!(
            StyledTable(df),
            Dict("Treatment" => [:dose, :response], "Participant" => :name)
        )

        # Mixed value types — Vector{Pair{String, Any}} → ArgumentError
        @test_throws ArgumentError tab_spanner!(
            StyledTable(df),
            Pair["Treatment" => [:dose, :response], "Participant" => :name]
        )
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
            tab_spanner!(tbl, "A" => [:bill_len]; level = 1)
            tab_spanner!(tbl, "B" => [:bill_depth]; level = 3)
            render(tbl)
        end

        # Error: same-level partial overlap
        @test_throws ArgumentError begin
            tbl = StyledTable(df)
            tab_spanner!(tbl, "A" => [:bill_len, :bill_depth])
            tab_spanner!(tbl, "B" => [:bill_depth, :flipper_len])
            render(tbl)
        end

        # Error: cross-level partial overlap
        @test_throws ArgumentError begin
            tbl = StyledTable(df)
            tab_spanner!(tbl, "A" => [:bill_len, :bill_depth, :flipper_len])
            tab_spanner!(tbl, "B" => [:bill_depth, :flipper_len, :body_mass]; level = 2)
            render(tbl)
        end

        # Scenario A: level-2 spanner covers exactly the same columns as level-1
        tbl = StyledTable(df)
        tab_spanner!(tbl, "Length (mm)" => [:bill_len, :bill_depth, :flipper_len])
        tab_spanner!(tbl, "Physical measurements" => [:bill_len, :bill_depth, :flipper_len]; level = 2)
        run_reftest(tbl, "references/tab_spanner/nested_two_levels")

        # Scenario B: level-2 spanner covers level-1 columns PLUS an extra ungrouped column
        tbl = StyledTable(df)
        tab_spanner!(tbl, "Length (mm)" => [:bill_len, :bill_depth, :flipper_len])
        tab_spanner!(tbl, "Physical measurements" => [:bill_len, :bill_depth, :flipper_len, :body_mass]; level = 2)
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

        # ── Single-column pair, Symbol col ──────────────────────────────
        let tbl = StyledTable(df)
            tab_footnote!(tbl, "Fascinating values" => :x)
            @test haskey(tbl.col_footnotes, :x)
            @test tbl.col_footnotes[:x] == "Fascinating values"
            @test !haskey(tbl.col_footnotes, :y)
        end

        # ── Multi-column pair, Vector{Symbol} ───────────────────────────
        let tbl = StyledTable(df)
            tab_footnote!(tbl, "Both columns" => [:x, :y])
            @test haskey(tbl.col_footnotes, :x)
            @test haskey(tbl.col_footnotes, :y)
            run_reftest(tbl, "references/tab_footnote/single")
        end

        # ── Multiple pairs (varargs) ────────────────────────────────────
        let tbl = StyledTable(df)
            tab_footnote!(tbl, "Note X" => [:x], "Note Y" => [:y])
            @test tbl.col_footnotes[:x] == "Note X"
            @test tbl.col_footnotes[:y] == "Note Y"
            run_reftest(tbl, "references/tab_footnote/multiple")
        end

        # ── Vector-of-pairs form ─────────────────────────────────────────
        let tbl = StyledTable(df)
            tab_footnote!(tbl, ["Both columns" => [:x, :y]])
            @test haskey(tbl.col_footnotes, :x)
            @test haskey(tbl.col_footnotes, :y)
        end

        # ── Dict form ────────────────────────────────────────────────────
        let tbl = StyledTable(df)
            tab_footnote!(tbl, Dict("Both columns" => [:x, :y]))
            @test haskey(tbl.col_footnotes, :x)
            @test haskey(tbl.col_footnotes, :y)
        end

        # ── Multiline key form ────────────────────────────────────────────
        let tbl = StyledTable(df)
            tab_footnote!(tbl, [Multiline("measured", "monthly") => [:x, :y]])
            @test haskey(tbl.col_footnotes, :x)
            @test haskey(tbl.col_footnotes, :y)
        end

        # ── Overwrite warning ────────────────────────────────────────────
        @testset "overwrite warning" begin
            df = DataFrame(x = [1, 2], y = [3, 4])
            tbl = StyledTable(df)
            tab_footnote!(tbl, "First note" => :x)
            @test_logs (:warn, r"already has a footnote") tab_footnote!(tbl, "Second note" => :x)
            # Second note should win
            @test tbl.col_footnotes[:x] == "Second note"
        end

        # ── Error cases ──────────────────────────────────────────────────
        @test_throws ArgumentError tab_footnote!(StyledTable(df), "Note" => :nonexistent)
        # Vector{Symbol} col error — correct path via _push_footnotes!
        @test_throws ArgumentError tab_footnote!(StyledTable(df), "Note" => [:nonexistent])
        @test_throws ArgumentError tab_footnote!(StyledTable(df), Dict("Note" => [:nonexistent]))
        @test_throws ArgumentError tab_footnote!(StyledTable(df), ["Note" => [:nonexistent]])
    end

    # -----------------------------------------------------------------------
    @testset "tab_footnote! input types" begin
        df = DataFrame(x = [1, 2], y = [3, 4])

        # Canonical reference: varargs with Vector{Symbol} → method 4
        ref_multi = let tbl = StyledTable(df)
            tab_footnote!(tbl, "Note" => [:x, :y])
            html_str(tbl)
        end

        # Vector{String} cols (method 6 conversion) → same output
        let tbl = StyledTable(df)
            tab_footnote!(tbl, "Note" => ["x", "y"])
            @test html_str(tbl) == ref_multi
        end

        # Vector-of-pairs with Vector{Symbol} (method 4)
        let tbl = StyledTable(df)
            tab_footnote!(tbl, ["Note" => [:x, :y]])
            @test html_str(tbl) == ref_multi
        end

        # Vector-of-pairs with Vector{String} (method 6 conversion)
        let tbl = StyledTable(df)
            tab_footnote!(tbl, ["Note" => ["x", "y"]])
            @test html_str(tbl) == ref_multi
        end

        # Dict{String,Vector{Symbol}} (method 6 conversion)
        let tbl = StyledTable(df)
            tab_footnote!(tbl, Dict("Note" => [:x, :y]))
            @test html_str(tbl) == ref_multi
        end

        # Dict{String,Vector{String}} (method 6 conversion)
        let tbl = StyledTable(df)
            tab_footnote!(tbl, Dict("Note" => ["x", "y"]))
            @test html_str(tbl) == ref_multi
        end

        # ── Single-column canonical: varargs with Symbol ─────────────────
        # Replaces the @test_broken blocks — dispatch is fixed.
        ref_single = let tbl = StyledTable(df)
            tab_footnote!(tbl, "Note" => :x)
            html_str(tbl)
        end

        # Single String col → same output
        let tbl = StyledTable(df)
            tab_footnote!(tbl, "Note" => "x")
            @test html_str(tbl) == ref_single
        end

        # Symbol key rejected (varargs path)
        @test_throws MethodError tab_footnote!(StyledTable(df), :note => :x)
        # Symbol key rejected (vector path — old <:Any bypass is closed)
        @test_throws MethodError tab_footnote!(StyledTable(df), [:note => [:x]])
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

        tbl = StyledTable(df)
        tab_options!(tbl; round_mode = :auto)
        run_reftest(tbl, "references/tab_options/round_auto")

        tbl = StyledTable(df)
        tab_options!(tbl; round_digits = 2, trailing_zeros = false)
        run_reftest(tbl, "references/tab_options/trailing_zeros_false")
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

        # Vector{String} column selector (AbstractVector{<:AbstractString} overload)
        let df = DataFrame(x = [1.5, 2.5])
            tbl = StyledTable(df)
            fmt_number!(tbl, ["x"]; digits = 1)
            @test tbl.col_formatters[:x](1.5) == "1.5"
        end

        # Single String column selector (AbstractString overload)
        let df = DataFrame(x = [1.5])
            tbl = StyledTable(df)
            fmt_number!(tbl, "x"; digits = 1)
            @test tbl.col_formatters[:x](1.5) == "1.5"
        end

        # trailing_zeros=false — rstrip path
        let df = DataFrame(x = [1.5, 2.0])
            tbl = StyledTable(df)
            fmt_number!(tbl, [:x]; digits = 3, trailing_zeros = false)
            @test tbl.col_formatters[:x](1.5) == "1.5"    # trailing zero stripped: 1.500 → 1.5
            @test tbl.col_formatters[:x](2.0) == "2"       # trailing zeros + dot stripped: 2.000 → 2
        end

        @testset "type check" begin
            df_str = DataFrame(label = ["a", "b"], x = [1.0, 2.0])
            @test_throws ArgumentError fmt_number!(StyledTable(df_str), [:label])
            @test_throws ArgumentError fmt_percent!(StyledTable(df_str), [:label])
            @test_throws ArgumentError fmt_integer!(StyledTable(df_str), [:label])
            # Numeric columns must still work
            @test fmt_number!(StyledTable(df_str), [:x]) isa StyledTable
            # Nullable numeric columns must still work
            df_missing = DataFrame(x = [1.0, missing])
            @test fmt_number!(StyledTable(df_missing), [:x]) isa StyledTable
        end
    end

    @testset "fmt_percent!" begin
        df = DataFrame(rate = [0.123, 0.456])

        tbl = StyledTable(df)
        fmt_percent!(tbl, [:rate]; digits = 1)
        run_reftest(tbl, "references/fmt/percent_default")

        # scale kwarg — scale=1 means no multiplication (value stays as-is)
        let df = DataFrame(x = [0.5])
            tbl = StyledTable(df)
            fmt_percent!(tbl, [:x]; scale = 1)
            @test tbl.col_formatters[:x](0.5) == "0.5%"   # 0.5 * 1 = 0.5, not 50.0%
        end

        # suffix kwarg — non-default suffix
        let df = DataFrame(x = [0.5])
            tbl = StyledTable(df)
            fmt_percent!(tbl, [:x]; suffix = " pct")
            @test tbl.col_formatters[:x](0.5) == "50.0 pct"  # 0.5 * 100 = 50.0 + " pct"
        end
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

        @test_throws ArgumentError fmt!(identity, StyledTable(df), :nonexistent)
    end

    # -----------------------------------------------------------------------
    @testset "MIME show" begin
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

    # -----------------------------------------------------------------------
    @testset "_noncontiguous_spanner_gaps" begin
        display_cols = [:a, :b, :c, :d]

        # Basic gap: :b sits between :a and :c but is not in the spanner
        s_gap = StyledTables.Spanner("AB", [:a, :c], 1)
        result = StyledTables._noncontiguous_spanner_gaps([s_gap], display_cols)
        @test length(result) == 1
        @test result[1][1] == "AB"
        @test result[1][2] == [:b]

        # Contiguous spanner: no gap
        s_ok = StyledTables.Spanner("AB", [:a, :b], 1)
        @test isempty(StyledTables._noncontiguous_spanner_gaps([s_ok], display_cols))

        # Single-column spanner: no gap possible
        s_single = StyledTables.Spanner("A", [:a], 1)
        @test isempty(StyledTables._noncontiguous_spanner_gaps([s_single], display_cols))

        # All spanner columns hidden (absent from display_cols): no warning
        s_hidden = StyledTables.Spanner("XY", [:x, :y], 1)
        @test isempty(StyledTables._noncontiguous_spanner_gaps([s_hidden], display_cols))

        # Multiple non-contiguous spanners: both reported
        s1 = StyledTables.Spanner("AC", [:a, :c], 1)
        s2 = StyledTables.Spanner("BD", [:b, :d], 1)
        result2 = StyledTables._noncontiguous_spanner_gaps([s1, s2], display_cols)
        @test length(result2) == 2

        # Column order in spanner is irrelevant: [:c, :a] same as [:a, :c]
        s_rev = StyledTables.Spanner("CA", [:c, :a], 1)
        result3 = StyledTables._noncontiguous_spanner_gaps([s_rev], display_cols)
        @test length(result3) == 1
        @test result3[1][2] == [:b]

        # Hiding the gap column makes remaining spanner columns contiguous: no warning
        display_no_b = [:a, :c, :d]
        @test isempty(StyledTables._noncontiguous_spanner_gaps([s_gap], display_no_b))
    end

    # -----------------------------------------------------------------------
    @testset "_duplicate_group_labels" begin
        # Unsorted: "A" appears again after "B"
        df_unsorted = DataFrame(g = ["A", "B", "A"], x = [1, 2, 3])
        tbl_unsorted = StyledTable(df_unsorted)
        tab_row_group!(tbl_unsorted, :g)
        @test StyledTables._duplicate_group_labels(tbl_unsorted) == ["A"]

        # Sorted with adjacent repeats: no duplicates
        df_sorted = DataFrame(g = ["A", "A", "B", "B"], x = [1, 2, 3, 4])
        tbl_sorted = StyledTable(df_sorted)
        tab_row_group!(tbl_sorted, :g)
        @test isempty(StyledTables._duplicate_group_labels(tbl_sorted))

        # Fully unique: no duplicates
        df_unique = DataFrame(g = ["A", "B", "C"], x = [1, 2, 3])
        tbl_unique = StyledTable(df_unique)
        tab_row_group!(tbl_unique, :g)
        @test isempty(StyledTables._duplicate_group_labels(tbl_unique))

        # No row_group_col set: returns empty
        df_no_group = DataFrame(x = [1, 2])
        tbl_no_group = StyledTable(df_no_group)
        @test isempty(StyledTables._duplicate_group_labels(tbl_no_group))

        # Adjacent repeated values are not duplicates
        df_adj = DataFrame(g = ["A", "A", "B"], x = [1, 2, 3])
        tbl_adj = StyledTable(df_adj)
        tab_row_group!(tbl_adj, :g)
        @test isempty(StyledTables._duplicate_group_labels(tbl_adj))
    end

    # -----------------------------------------------------------------------
    @testset "render() warnings" begin
        # Non-contiguous spanner: warn
        df = DataFrame(x = [1], y = [2], z = [3])
        tbl = StyledTable(df)
        tab_spanner!(tbl, "XZ" => [:x, :z])
        @test_logs (:warn, r"gap") render(tbl)

        # Unsorted row groups: warn
        df2 = DataFrame(g = ["A", "B", "A"], v = [1, 2, 3])
        tbl2 = StyledTable(df2)
        tab_row_group!(tbl2, :g)
        @test_logs (:warn, r"not sorted") render(tbl2)

        # Well-formed table: no warnings
        df3 = DataFrame(a = [1, 2], b = [3, 4], g = ["X", "X"])
        tbl3 = StyledTable(df3)
        tab_spanner!(tbl3, "AB" => [:a, :b])
        tab_row_group!(tbl3, :g)
        @test_logs min_level=Logging.Warn render(tbl3)
    end

    # -----------------------------------------------------------------------
    @testset "Base.show" begin
        df = DataFrame(a = 1:3, b = ["x", "y", "z"], c = [1.0, 2.0, 3.0])

        # Unconfigured: single-line output
        tbl = StyledTable(df)
        @test sprint(show, tbl) == "StyledTable  3 × 3  (unconfigured)"

        # Header: shows label and truncated title
        tbl = StyledTable(df)
        tab_header!(tbl, "My Title")
        out = sprint(show, tbl)
        @test contains(out, "header")
        @test contains(out, "\"My Title\"")
        @test !contains(out, "(unconfigured)")

        # Header: title longer than 20 chars is truncated
        tbl = StyledTable(df)
        tab_header!(tbl, "A very long title that exceeds twenty")
        out = sprint(show, tbl)
        @test contains(out, "\"A very long title th…\"")

        # Header: subtitle appended after /
        tbl = StyledTable(df)
        tab_header!(tbl, "Title"; subtitle = "Sub")
        out = sprint(show, tbl)
        @test contains(out, "\"Title\" / \"Sub\"")

        # Spanners: single level shows count and col count
        tbl = StyledTable(df)
        tab_spanner!(tbl, "Group" => [:a, :b])
        out = sprint(show, tbl)
        @test contains(out, "span")
        @test contains(out, "1 (2 cols)")

        # Spanners: multiple levels show per-level breakdown
        tbl = StyledTable(df)
        tab_spanner!(tbl, "L1a" => [:a, :b]; level = 1)
        tab_spanner!(tbl, "L2" => [:a, :b, :c]; level = 2)
        out = sprint(show, tbl)
        @test contains(out, "L1: 2 cols")
        @test contains(out, "L2: 3 cols")

        # Stub and groups
        tbl = StyledTable(df)
        tab_stub!(tbl, :a)
        out = sprint(show, tbl)
        @test contains(out, "stub")
        @test contains(out, ":a")

        tbl = StyledTable(df)
        tab_row_group!(tbl, :b)
        out = sprint(show, tbl)
        @test contains(out, "groups")
        @test contains(out, ":b")

        # Column counts: labels, align, fmt, hidden
        tbl = StyledTable(df)
        cols_label!(tbl, :a => "A", :b => "B")
        out = sprint(show, tbl)
        @test contains(out, "labels")
        @test contains(out, "2 cols")

        tbl = StyledTable(df)
        cols_label!(tbl, :a => "A")
        out = sprint(show, tbl)
        @test contains(out, "1 col")

        tbl = StyledTable(df)
        cols_hide!(tbl, :c)
        out = sprint(show, tbl)
        @test contains(out, "hidden")
        @test contains(out, "1 col")

        # Notes: singular and plural
        tbl = StyledTable(df)
        tab_footnote!(tbl, "Note 1" => [:a])
        out = sprint(show, tbl)
        @test contains(out, "1 note")
        @test !contains(out, "notes")

        tbl = StyledTable(df)
        tab_footnote!(tbl, "Note 1" => [:a])
        tab_footnote!(tbl, "Note 2" => [:b])
        out = sprint(show, tbl)
        @test contains(out, "2 notes")

        # Source notes
        tbl = StyledTable(df)
        tab_source_note!(tbl, "Source A")
        out = sprint(show, tbl)
        @test contains(out, "1 source")

        # Round: digits only
        tbl = StyledTable(df)
        tab_options!(tbl; round_digits = 3)
        out = sprint(show, tbl)
        @test contains(out, "round")
        @test contains(out, "3 digits")

        # Round: mode only
        tbl = StyledTable(df)
        tab_options!(tbl; round_mode = :sigdigits)
        out = sprint(show, tbl)
        @test contains(out, "(sigdigits)")

        # Round: digits + mode
        tbl = StyledTable(df)
        tab_options!(tbl; round_digits = 3, round_mode = :auto)
        out = sprint(show, tbl)
        @test contains(out, "3 digits (auto)")

        # Round: digits + trailing zeros
        tbl = StyledTable(df)
        tab_options!(tbl; round_digits = 3, trailing_zeros = true)
        out = sprint(show, tbl)
        @test contains(out, "3 digits · trailing zeros")

        # Round: all three
        tbl = StyledTable(df)
        tab_options!(tbl; round_digits = 2, round_mode = :auto, trailing_zeros = true)
        out = sprint(show, tbl)
        @test contains(out, "2 digits (auto) · trailing zeros")

        # cols_align: produces align row
        tbl = StyledTable(df)
        cols_align!(tbl, :a => :right)
        out = sprint(show, tbl)
        @test contains(out, "align")
        @test contains(out, "1 col")

        # Source notes: plural
        tbl = StyledTable(df)
        tab_source_note!(tbl, "Source A")
        tab_source_note!(tbl, "Source B")
        out = sprint(show, tbl)
        @test contains(out, "2 sources")

        # fmt row appears when col_formatters is non-empty
        let tbl = StyledTable(df)
            fmt_number!(tbl, [:a]; digits = 2)
            out = sprint(show, tbl)
            @test contains(out, "fmt")
        end

        # styles row appears when col_styles or col_style_fns is non-empty
        let tbl = StyledTable(df)
            tab_style!(tbl, [:a]; bold = true)
            out = sprint(show, tbl)
            @test contains(out, "styles")
        end

        # postprocessors row appears when postprocessors is non-empty
        let tbl = StyledTable(df)
            sub_missing!(tbl)
            out = sprint(show, tbl)
            @test contains(out, "postprocessors")
        end
    end

end
