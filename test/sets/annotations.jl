@testset "tab_header!" begin
    df = DataFrame(a = [1, 2])

    @testset "align validation" begin
        tbl = StyledTable(df)
        @test_throws ArgumentError tab_header!(tbl, "T"; align = :diagonal)
    end

    @testset "header align left" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        tbl = StyledTable(df)
        tab_header!(tbl, "My Table"; subtitle = "Details", align = :left)
        run_reftest(tbl, "references/tab_header/header_align_left")
    end
end

# -----------------------------------------------------------------------
@testset "tab_footnote!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

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
        df = DataFrame(; x = [1, 2], y = [3, 4])
        tbl = StyledTable(df)
        tab_footnote!(tbl, "First note" => :x)
        @test_logs (:warn, r"already has a footnote") tab_footnote!(
            tbl,
            "Second note" => :x,
        )
        # Second note should win
        @test tbl.col_footnotes[:x] == "Second note"
    end

    # ── Error cases ──────────────────────────────────────────────────
    @test_throws ArgumentError tab_footnote!(StyledTable(df), "Note" => :nonexistent)
    # Vector{Symbol} col error — correct path via _push_footnotes!
    @test_throws ArgumentError tab_footnote!(StyledTable(df), "Note" => [:nonexistent])
    @test_throws ArgumentError tab_footnote!(
        StyledTable(df),
        Dict("Note" => [:nonexistent]),
    )
    @test_throws ArgumentError tab_footnote!(StyledTable(df), ["Note" => [:nonexistent]])

    @testset "mixed-type pairs error" begin
        let df = DataFrame(; x = [1], y = [2])
            # Mixed value types: Symbol and Vector{Symbol} column selectors
            @test_throws ArgumentError tab_footnote!(
                StyledTable(df),
                Dict{String,Any}("Note" => :x, "Other" => [:x, :y]),
            )
        end
    end
end

# -----------------------------------------------------------------------
@testset "tab_footnote! input types" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

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

@testset "tab_sourcenote!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    tbl = StyledTable(df)
    tab_sourcenote!(tbl, "Source: internal data")
    run_reftest(tbl, "references/tab_sourcenote/single")

    tbl = StyledTable(df)
    tab_sourcenote!(tbl, "Source: A")
    tab_sourcenote!(tbl, "Note: B")
    run_reftest(tbl, "references/tab_sourcenote/multiple")
end

# -----------------------------------------------------------------------
@testset "tab_footnote! SpannerTarget" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    # ── Basic: string label, no level ───────────────────────────────────
    let tbl = StyledTable(df)
        tab_spanner!(tbl, "Outcomes" => [:x, :y])
        tab_footnote!(tbl, "Source: WHO" => SpannerTarget("Outcomes"))
        @test length(tbl.spanner_footnotes) == 1
        @test tbl.spanner_footnotes[1] == (SpannerTarget("Outcomes", nothing) => "Source: WHO")
        run_reftest(tbl, "references/tab_footnote/spanner_basic")
    end

    # ── Multi-pair varargs form dispatches to SpannerTarget overload ────────
    let tbl = StyledTable(df)
        tab_spanner!(tbl, "A" => [:x])
        tab_spanner!(tbl, "B" => [:y])
        tab_footnote!(tbl, "Note A" => SpannerTarget("A"), "Note B" => SpannerTarget("B"))
        @test length(tbl.spanner_footnotes) == 2
        @test tbl.spanner_footnotes[1] == (SpannerTarget("A", nothing) => "Note A")
        @test tbl.spanner_footnotes[2] == (SpannerTarget("B", nothing) => "Note B")
    end

    # ── level= kwarg targets only the matching level ────────────────────
    let tbl = StyledTable(df)
        tab_spanner!(tbl, "Low" => [:x]; level = 1)
        tab_spanner!(tbl, "Low" => [:x, :y]; level = 2)
        tab_footnote!(tbl, "Level 2 note" => SpannerTarget("Low"; level = 2))
        @test length(tbl.spanner_footnotes) == 1
        @test tbl.spanner_footnotes[1] == (SpannerTarget("Low", 2) => "Level 2 note")
        run_reftest(tbl, "references/tab_footnote/spanner_level")
    end

    # ── level = nothing annotates all matching spanners ─────────────────
    let tbl = StyledTable(df)
        tab_spanner!(tbl, "Low" => [:x]; level = 1)
        tab_spanner!(tbl, "Low" => [:x, :y]; level = 2)
        tab_footnote!(tbl, "Shared note" => SpannerTarget("Low"))
        @test length(tbl.spanner_footnotes) == 2
        @test tbl.spanner_footnotes[1] == (SpannerTarget("Low", 1) => "Shared note")
        @test tbl.spanner_footnotes[2] == (SpannerTarget("Low", 2) => "Shared note")
        run_reftest(tbl, "references/tab_footnote/spanner_all_levels")
    end

    # ── Multiline label targetable ───────────────────────────────────────
    let tbl = StyledTable(df)
        tab_spanner!(tbl, Multiline("Treatment", "(N=50)") => [:x, :y])
        tab_footnote!(tbl, "Note" => SpannerTarget(Multiline("Treatment", "(N=50)")))
        @test length(tbl.spanner_footnotes) == 1
        @test tbl.spanner_footnotes[1] == (SpannerTarget(Multiline("Treatment", "(N=50)"), nothing) => "Note")
        run_reftest(tbl, "references/tab_footnote/spanner_multiline")
    end

    # ── Error: label not found ───────────────────────────────────────────
    @test_throws ArgumentError tab_footnote!(
        StyledTable(df),
        "Note" => SpannerTarget("Nonexistent"),
    )

    # ── Error: level specified but no matching spanner ───────────────────
    @test_throws ArgumentError let
        tbl = StyledTable(df)
        tab_spanner!(tbl, "Outcomes" => [:x, :y])
        tab_footnote!(tbl, "Note" => SpannerTarget("Outcomes"; level = 99))
    end

    # ── Warning: same spanner annotated twice ────────────────────────────
    @testset "overwrite warning" begin
        let tbl = StyledTable(df)
            tab_spanner!(tbl, "Outcomes" => [:x, :y])
            tab_footnote!(tbl, "First" => SpannerTarget("Outcomes"))
            @test_logs (:warn, r"already has a footnote") tab_footnote!(
                tbl,
                "Second" => SpannerTarget("Outcomes"),
            )
            @test length(tbl.spanner_footnotes) == 2
        end
    end
end
