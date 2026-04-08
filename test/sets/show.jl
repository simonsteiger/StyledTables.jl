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
