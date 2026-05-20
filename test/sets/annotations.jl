@testset "header!" begin
    df = DataFrame(a = [1, 2])

    @testset "align validation" begin
        tbl = StyledTable(df)
        @test_throws ArgumentError header!(tbl, "T"; align = :diagonal)
    end

    @testset "header align left" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        tbl = StyledTable(df)
        header!(tbl, "My Table"; subtitle = "Details", align = :left)
        run_reftest(tbl, "references/header/header_align_left")
    end
end

# -----------------------------------------------------------------------
@testset "footnote!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    # ── Single-column pair, Symbol col ──────────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, :x => "Fascinating values")
        @test haskey(tbl.col_footnotes, :x)
        @test tbl.col_footnotes[:x] == "Fascinating values"
        @test !haskey(tbl.col_footnotes, :y)
    end

    # ── Multi-column pair, Vector{Symbol} ───────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, [:x, :y] => "Both columns")
        @test haskey(tbl.col_footnotes, :x)
        @test haskey(tbl.col_footnotes, :y)
        run_reftest(tbl, "references/footnote/single")
    end

    # ── Multiple pairs (varargs) ────────────────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, [:x] => "Note X", [:y] => "Note Y")
        @test tbl.col_footnotes[:x] == "Note X"
        @test tbl.col_footnotes[:y] == "Note Y"
        run_reftest(tbl, "references/footnote/multiple")
    end

    # ── Vector-of-pairs form ─────────────────────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, [[:x, :y] => "Both columns"])
        @test haskey(tbl.col_footnotes, :x)
        @test haskey(tbl.col_footnotes, :y)
    end

    # ── Dict form ────────────────────────────────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, Dict([:x, :y] => "Both columns"))
        @test haskey(tbl.col_footnotes, :x)
        @test haskey(tbl.col_footnotes, :y)
    end

    # ── Multiline key form ────────────────────────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, [[:x, :y] => Multiline("measured", "monthly")])
        @test haskey(tbl.col_footnotes, :x)
        @test haskey(tbl.col_footnotes, :y)
    end

    # ── Overwrite warning ────────────────────────────────────────────
    @testset "overwrite warning" begin
        df = DataFrame(; x = [1, 2], y = [3, 4])
        tbl = StyledTable(df)
        footnote!(tbl, :x => "First note")
        @test_logs (:warn, r"already has a footnote") footnote!(
            tbl,
            :x => "Second note",
        )
        # Second note should win
        @test tbl.col_footnotes[:x] == "Second note"
    end

    # ── Error cases ──────────────────────────────────────────────────
    @test_throws ArgumentError footnote!(StyledTable(df), :nonexistent => "Note")
    # Vector{Symbol} col error — correct path via _push_footnotes!
    @test_throws ArgumentError footnote!(StyledTable(df), [:nonexistent] => "Note")
    @test_throws ArgumentError footnote!(
        StyledTable(df),
        Dict([:nonexistent] => "Note"),
    )
    @test_throws ArgumentError footnote!(StyledTable(df), [[:nonexistent] => "Note"])

    @testset "mixed-type pairs error" begin
        let df = DataFrame(; x = [1], y = [2])
            # Mixed value types: Symbol and Vector{Symbol} column selectors
            @test_throws ArgumentError footnote!(
                StyledTable(df),
                Dict{Any,String}(:x => "Note", [:x, :y] => "Other"),
            )
        end
    end
end

# -----------------------------------------------------------------------
@testset "footnote! input types" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    # Canonical reference: varargs with Vector{Symbol} → method 4
    ref_multi = let tbl = StyledTable(df)
        footnote!(tbl, [:x, :y] => "Note")
        html_str(tbl)
    end

    # Vector{String} cols (method 6 conversion) → same output
    let tbl = StyledTable(df)
        footnote!(tbl, ["x", "y"] => "Note")
        @test html_str(tbl) == ref_multi
    end

    # Vector-of-pairs with Vector{Symbol} (method 4)
    let tbl = StyledTable(df)
        footnote!(tbl, [[:x, :y] => "Note"])
        @test html_str(tbl) == ref_multi
    end

    # Vector-of-pairs with Vector{String} (method 6 conversion)
    let tbl = StyledTable(df)
        footnote!(tbl, [["x", "y"] => "Note"])
        @test html_str(tbl) == ref_multi
    end

    # Dict{Vector{Symbol},String} (method 6 conversion)
    let tbl = StyledTable(df)
        footnote!(tbl, Dict([:x, :y] => "Note"))
        @test html_str(tbl) == ref_multi
    end

    # Dict{Vector{String},String} (method 6 conversion)
    let tbl = StyledTable(df)
        footnote!(tbl, Dict(["x", "y"] => "Note"))
        @test html_str(tbl) == ref_multi
    end

    # ── Single-column canonical: varargs with Symbol ─────────────────
    # Replaces the @test_broken blocks — dispatch is fixed.
    ref_single = let tbl = StyledTable(df)
        footnote!(tbl, :x => "Note")
        html_str(tbl)
    end

    # Single String col → same output
    let tbl = StyledTable(df)
        footnote!(tbl, "x" => "Note")
        @test html_str(tbl) == ref_single
    end

    # Symbol text rejected (varargs path)
    @test_throws MethodError footnote!(StyledTable(df), :x => :note)
    # Symbol text rejected (vector path — old <:Any bypass is closed)
    @test_throws MethodError footnote!(StyledTable(df), [:x => [:note]])
end

@testset "sourcenote!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    tbl = StyledTable(df)
    sourcenote!(tbl, "Source: internal data")
    run_reftest(tbl, "references/sourcenote/single")

    tbl = StyledTable(df)
    sourcenote!(tbl, "Source: A")
    sourcenote!(tbl, "Note: B")
    run_reftest(tbl, "references/sourcenote/multiple")
end

# -----------------------------------------------------------------------
@testset "footnote! SpannerTarget" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    # ── Basic: string label, no level ───────────────────────────────────
    let tbl = StyledTable(df)
        spanner!(tbl, [:x, :y] => "Outcomes")
        footnote!(tbl, SpannerTarget("Outcomes") => "Source: WHO")
        @test length(tbl.spanner_footnotes) == 1
        @test tbl.spanner_footnotes[1] == (SpannerTarget("Outcomes", nothing) => "Source: WHO")
        run_reftest(tbl, "references/footnote/spanner_basic")
    end

    # ── Multi-pair varargs form dispatches to SpannerTarget overload ────────
    let tbl = StyledTable(df)
        spanner!(tbl, [:x] => "A")
        spanner!(tbl, [:y] => "B")
        footnote!(tbl, SpannerTarget("A") => "Note A", SpannerTarget("B") => "Note B")
        @test length(tbl.spanner_footnotes) == 2
        @test tbl.spanner_footnotes[1] == (SpannerTarget("A", nothing) => "Note A")
        @test tbl.spanner_footnotes[2] == (SpannerTarget("B", nothing) => "Note B")
    end

    # ── level= kwarg targets only the matching level ────────────────────
    let tbl = StyledTable(df)
        spanner!(tbl, [:x] => "Low"; level = 1)
        spanner!(tbl, [:x, :y] => "Low"; level = 2)
        footnote!(tbl, SpannerTarget("Low"; level = 2) => "Level 2 note")
        @test length(tbl.spanner_footnotes) == 1
        @test tbl.spanner_footnotes[1] == (SpannerTarget("Low", 2) => "Level 2 note")
        run_reftest(tbl, "references/footnote/spanner_level")
    end

    # ── level = nothing annotates all matching spanners ─────────────────
    let tbl = StyledTable(df)
        spanner!(tbl, [:x] => "Low"; level = 1)
        spanner!(tbl, [:x, :y] => "Low"; level = 2)
        footnote!(tbl, SpannerTarget("Low") => "Shared note")
        @test length(tbl.spanner_footnotes) == 2
        @test tbl.spanner_footnotes[1] == (SpannerTarget("Low", 1) => "Shared note")
        @test tbl.spanner_footnotes[2] == (SpannerTarget("Low", 2) => "Shared note")
        run_reftest(tbl, "references/footnote/spanner_all_levels")
    end

    # ── Multiline label targetable ───────────────────────────────────────
    let tbl = StyledTable(df)
        spanner!(tbl, [:x, :y] => Multiline("Treatment", "(N=50)"))
        footnote!(tbl, SpannerTarget(Multiline("Treatment", "(N=50)")) => "Note")
        @test length(tbl.spanner_footnotes) == 1
        @test tbl.spanner_footnotes[1] == (SpannerTarget(Multiline("Treatment", "(N=50)"), nothing) => "Note")
        run_reftest(tbl, "references/footnote/spanner_multiline")
    end

    # ── Error: label not found ───────────────────────────────────────────
    @test_throws ArgumentError footnote!(
        StyledTable(df),
        SpannerTarget("Nonexistent") => "Note",
    )

    # ── Error: level specified but no matching spanner ───────────────────
    @test_throws ArgumentError let
        tbl = StyledTable(df)
        spanner!(tbl, [:x, :y] => "Outcomes")
        footnote!(tbl, SpannerTarget("Outcomes"; level = 99) => "Note")
    end

    # ── Warning: same spanner annotated twice ────────────────────────────
    @testset "overwrite warning" begin
        let tbl = StyledTable(df)
            spanner!(tbl, [:x, :y] => "Outcomes")
            footnote!(tbl, SpannerTarget("Outcomes") => "First")
            @test_logs (:warn, r"already has a footnote") footnote!(
                tbl,
                SpannerTarget("Outcomes") => "Second",
            )
            @test length(tbl.spanner_footnotes) == 2
        end
    end
end

# -----------------------------------------------------------------------
@testset "footnote! CellTarget" begin
    df = DataFrame(; x = [1, 2, 3], y = [10, 20, 30])

    # ── Row-index form: basic storage ───────────────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, CellTarget(2, :x) => "Important value")
        @test haskey(tbl.cell_footnotes, (2, :x))
        @test tbl.cell_footnotes[(2, :x)] == "Important value"
        @test !haskey(tbl.cell_footnotes, (1, :x))
        @test !haskey(tbl.cell_footnotes, (2, :y))
    end

    # ── Row-index form: multiple pairs (varargs) ────────────────────────
    let tbl = StyledTable(df)
        footnote!(tbl, CellTarget(1, :x) => "Note A", CellTarget(3, :y) => "Note B")
        @test tbl.cell_footnotes[(1, :x)] == "Note A"
        @test tbl.cell_footnotes[(3, :y)] == "Note B"
    end

    # ── Row-index form: overwrite warning ───────────────────────────────
    @testset "row-index overwrite warning" begin
        let tbl = StyledTable(df)
            footnote!(tbl, CellTarget(1, :x) => "First")
            @test_logs (:warn, r"already has a footnote") footnote!(
                tbl, CellTarget(1, :x) => "Second",
            )
            @test tbl.cell_footnotes[(1, :x)] == "Second"
        end
    end

    # ── Row-index form: error cases ─────────────────────────────────────
    @test_throws ArgumentError footnote!(
        StyledTable(df), CellTarget(1, :nonexistent) => "Note",
    )
    @test_throws ArgumentError footnote!(
        StyledTable(df), CellTarget(0, :x) => "Note",
    )
    @test_throws ArgumentError footnote!(
        StyledTable(df), CellTarget(4, :x) => "Note",  # nrow = 3
    )

    # ── Stub form: requires stub! ───────────────────────────────────
    @test_throws ArgumentError footnote!(
        StyledTable(df), CellTarget(Stub(1), :x) => "Note",
    )

    # ── Stub form: basic storage (single match) ──────────────────────────
    let tbl = StyledTable(df)
        stub!(tbl, :x)
        footnote!(tbl, CellTarget(Stub(2), :y) => "Stub note")
        @test haskey(tbl.cell_footnotes, (2, :y))
        @test tbl.cell_footnotes[(2, :y)] == "Stub note"
        @test !haskey(tbl.cell_footnotes, (1, :y))
    end

    # ── Stub form: multiple matching rows ────────────────────────────────
    let tbl = StyledTable(DataFrame(; id = ["A", "A", "B"], v = [1, 2, 3]))
        stub!(tbl, :id)
        footnote!(tbl, CellTarget(Stub("A"), :v) => "Repeated stub")
        @test haskey(tbl.cell_footnotes, (1, :v))
        @test haskey(tbl.cell_footnotes, (2, :v))
        @test !haskey(tbl.cell_footnotes, (3, :v))
        @test tbl.cell_footnotes[(1, :v)] == "Repeated stub"
        @test tbl.cell_footnotes[(2, :v)] == "Repeated stub"
    end

    # ── Stub form: overwrite warning ─────────────────────────────────────
    @testset "stub overwrite warning" begin
        let tbl = StyledTable(df)
            stub!(tbl, :x)
            footnote!(tbl, CellTarget(Stub(1), :y) => "First")
            @test_logs (:warn, r"already has a footnote") footnote!(
                tbl, CellTarget(Stub(1), :y) => "Second",
            )
            @test tbl.cell_footnotes[(1, :y)] == "Second"
        end
    end

    # ── Stub form: value not found ───────────────────────────────────────
    @test_throws ArgumentError let
        tbl = StyledTable(df)
        stub!(tbl, :x)
        footnote!(tbl, CellTarget(Stub(99), :y) => "Note")
    end

    # ── Stub form: column not found ──────────────────────────────────────
    @test_throws ArgumentError let
        tbl = StyledTable(df)
        stub!(tbl, :x)
        footnote!(tbl, CellTarget(Stub(1), :nonexistent) => "Note")
    end

    # ── Reference: row-index form renders correctly ──────────────────────
    let tbl = StyledTable(DataFrame(; x = [1, 2, 3], y = [10, 20, 30]))
        footnote!(tbl, CellTarget(2, :x) => "Important")
        run_reftest(tbl, "references/footnote/cell_row_index")
    end

    # ── Reference: Stub form renders correctly ───────────────────────────
    let tbl = StyledTable(DataFrame(; x = [1, 2, 3], y = [10, 20, 30]))
        stub!(tbl, :x)
        footnote!(tbl, CellTarget(Stub(2), :y) => "Stub note")
        run_reftest(tbl, "references/footnote/cell_stub_single")
    end

    # ── Reference: Stub form, multiple matching rows ─────────────────────
    let tbl = StyledTable(DataFrame(; id = ["A", "A", "B"], v = [1, 2, 3]))
        stub!(tbl, :id)
        footnote!(tbl, CellTarget(Stub("A"), :v) => "Repeated")
        run_reftest(tbl, "references/footnote/cell_stub_multi")
    end
end
