@testset "MIME show" begin
    df = DataFrame(; a = [1, 2], b = ["x", "y"])
    tbl = StyledTable(df)

    buf = IOBuffer()
    show(buf, MIME"text/html"(), tbl)
    @test occursin("<table", String(take!(buf)))

    buf = IOBuffer()
    show(buf, MIME"text/latex"(), tbl)
    @test occursin("tabular", String(take!(buf)))
end

@testset "Base.show" begin
    df = DataFrame(; a = 1:3, b = ["x", "y", "z"], c = [1.0, 2.0, 3.0])

    # Unconfigured: single-line output
    tbl = StyledTable(df)
    @test sprint(show, tbl) == "StyledTable  3 × 3  (unconfigured)"

    # Header: shows label and truncated title
    tbl = StyledTable(df)
    header!(tbl, "My Title")
    out = sprint(show, tbl)
    @test contains(out, "header")
    @test contains(out, "\"My Title\"")
    @test !contains(out, "(unconfigured)")

    # Header: title longer than 20 chars is truncated
    tbl = StyledTable(df)
    header!(tbl, "A very long title that exceeds twenty")
    out = sprint(show, tbl)
    @test contains(out, "\"A very long title th…\"")

    # Header: subtitle appended after /
    tbl = StyledTable(df)
    header!(tbl, "Title"; subtitle = "Sub")
    out = sprint(show, tbl)
    @test contains(out, "\"Title\" / \"Sub\"")

    # Spanners: single level shows count and col count
    tbl = StyledTable(df)
    spanner!(tbl, [:a, :b] => "Group")
    out = sprint(show, tbl)
    @test contains(out, "span")
    @test contains(out, "1 (2 cols)")

    # Spanners: multiple levels show per-level breakdown
    tbl = StyledTable(df)
    spanner!(tbl, [:a, :b] => "L1a"; level = 1)
    spanner!(tbl, [:a, :b, :c] => "L2"; level = 2)
    out = sprint(show, tbl)
    @test contains(out, "L1: 2 cols")
    @test contains(out, "L2: 3 cols")

    # Stub and groups
    tbl = StyledTable(df)
    stub!(tbl, :a)
    out = sprint(show, tbl)
    @test contains(out, "stub")
    @test contains(out, ":a")

    tbl = StyledTable(df)
    rowgroup!(tbl, :b)
    out = sprint(show, tbl)
    @test contains(out, "groups")
    @test contains(out, ":b")

    # Column counts: labels, align, fmt, hidden
    tbl = StyledTable(df)
    relabel!(tbl, :a => "A", :b => "B")
    out = sprint(show, tbl)
    @test contains(out, "labels")
    @test contains(out, "2 cols")

    tbl = StyledTable(df)
    relabel!(tbl, :a => "A")
    out = sprint(show, tbl)
    @test contains(out, "1 col")

    tbl = StyledTable(df)
    hide!(tbl, :c)
    out = sprint(show, tbl)
    @test contains(out, "hidden")
    @test contains(out, "1 col")

    # Notes: singular and plural
    tbl = StyledTable(df)
    footnote!(tbl, [:a] => "Note 1")
    out = sprint(show, tbl)
    @test contains(out, "1 note")
    @test !contains(out, "notes")

    tbl = StyledTable(df)
    footnote!(tbl, [:a] => "Note 1")
    footnote!(tbl, [:b] => "Note 2")
    out = sprint(show, tbl)
    @test contains(out, "2 notes")

    # Source notes
    tbl = StyledTable(df)
    sourcenote!(tbl, "Source A")
    out = sprint(show, tbl)
    @test contains(out, "1 source")

    # align: produces align row
    tbl = StyledTable(df)
    align!(tbl, :a => :right)
    out = sprint(show, tbl)
    @test contains(out, "align")
    @test contains(out, "1 col")

    # Source notes: plural
    tbl = StyledTable(df)
    sourcenote!(tbl, "Source A")
    sourcenote!(tbl, "Source B")
    out = sprint(show, tbl)
    @test contains(out, "2 sources")

    # fmt row appears when col_formatters is non-empty
    let tbl = StyledTable(df)
        format!(NumberFormatter(digits = 2), tbl, :a)
        out = sprint(show, tbl)
        @test contains(out, "fmt")
    end

    # styles row appears when col_styles or col_style_fns is non-empty
    let tbl = StyledTable(df)
        style!(tbl, [:a]; bold = true)
        out = sprint(show, tbl)
        @test contains(out, "styles")
    end

    # postprocessors row appears when postprocessors is non-empty
    let tbl = StyledTable(df)
        push!(tbl.postprocessors, SummaryTables.Replace(ismissing, "–", true))
        out = sprint(show, tbl)
        @test contains(out, "postprocessors")
    end
end
