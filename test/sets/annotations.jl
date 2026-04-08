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

@testset "tab_source_note!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    tbl = StyledTable(df)
    tab_source_note!(tbl, "Source: internal data")
    run_reftest(tbl, "references/tab_source_note/single")

    tbl = StyledTable(df)
    tab_source_note!(tbl, "Source: A")
    tab_source_note!(tbl, "Note: B")
    run_reftest(tbl, "references/tab_source_note/multiple")
end
