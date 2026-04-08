@testset "tab_spanner!" begin
    df = DataFrame(; name = ["Alice", "Bob"], dose = [10, 20], response = [0.9, 0.8])

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

    @testset "mixed-type pairs error" begin
        let df = DataFrame(; a = [1], b = [2], c = [3])
            # Mixed value types: Symbol and Vector{Symbol} column selectors
            @test_throws ArgumentError tab_spanner!(
                StyledTable(df),
                Dict{String,Any}("AB" => [:a, :b], "C" => :c),
            )
        end
    end
end

@testset "tab_spanner! input types" begin
    df = DataFrame(; name = ["Alice"], dose = [10], response = [0.9])

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
        Dict("Treatment" => [:dose, :response], "Participant" => :name),
    )

    # Mixed value types — Vector{Pair{String, Any}} → ArgumentError
    @test_throws ArgumentError tab_spanner!(
        StyledTable(df),
        Pair["Treatment"=>[:dose, :response], "Participant"=>:name],
    )
end

@testset "tab_spanner! nested" begin
    df = DataFrame(;
        species = ["Adelie", "Chinstrap"],
        bill_len = [38.9, 48.7],
        bill_depth = [17.8, 18.3],
        flipper_len = [181, 195],
        body_mass = [3750, 3800],
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
    tab_spanner!(
        tbl,
        "Physical measurements" => [:bill_len, :bill_depth, :flipper_len];
        level = 2,
    )
    run_reftest(tbl, "references/tab_spanner/nested_two_levels")

    # Scenario B: level-2 spanner covers level-1 columns PLUS an extra ungrouped column
    tbl = StyledTable(df)
    tab_spanner!(tbl, "Length (mm)" => [:bill_len, :bill_depth, :flipper_len])
    tab_spanner!(
        tbl,
        "Physical measurements" => [:bill_len, :bill_depth, :flipper_len, :body_mass];
        level = 2,
    )
    run_reftest(tbl, "references/tab_spanner/nested_uncovered_col")
end

@testset "tab_spanner! Multiline" begin
    df = DataFrame(; dose = [10, 20], response = [0.9, 0.8])

    tbl = StyledTable(df)
    tab_spanner!(tbl, Multiline("Treatment", "(N=50)") => [:dose, :response])
    run_reftest(tbl, "references/tab_spanner/multiline_label")
end

@testset "tab_stub!" begin
    df = DataFrame(; rowname = ["Alice", "Bob"], score = [90, 85])

    tbl = StyledTable(df)
    tab_stub!(tbl, :rowname)
    run_reftest(tbl, "references/tab_stub/basic")

    @test_throws ArgumentError tab_stub!(StyledTable(df), :nonexistent)
end

@testset "tab_header!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

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

@testset "tab_rowgroup!" begin
    df = DataFrame(;
        arm = ["A", "A", "B", "B"],
        name = ["x1", "x2", "y1", "y2"],
        score = [1, 2, 3, 4],
    )

    tbl = StyledTable(df)
    tab_rowgroup!(tbl, :arm)
    run_reftest(tbl, "references/tab_rowgroup/basic")

    tbl = StyledTable(df)
    tab_rowgroup!(tbl, :arm; indent_pt = 24)
    run_reftest(tbl, "references/tab_rowgroup/custom_indent")

    @test_throws ArgumentError tab_rowgroup!(StyledTable(df), :nonexistent)
end

@testset "tab_stubhead!" begin
    df = DataFrame(; rowname = ["Alice", "Bob"], score = [90, 85])

    tbl = StyledTable(df)
    tab_stub!(tbl, :rowname)
    tab_stubhead!(tbl, "Name")
    run_reftest(tbl, "references/tab_stubhead/basic")

    @testset "warns without tab_stub!" begin
        df = DataFrame(; x = [1, 2])
        tbl = StyledTable(df)
        @test_logs (:warn, r"no effect") tab_stubhead!(tbl, "Row")
    end
end

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

@testset "_duplicate_group_labels" begin
    # Unsorted: "A" appears again after "B"
    df_unsorted = DataFrame(; g = ["A", "B", "A"], x = [1, 2, 3])
    tbl_unsorted = StyledTable(df_unsorted)
    tab_rowgroup!(tbl_unsorted, :g)
    @test StyledTables._duplicate_group_labels(tbl_unsorted) == ["A"]

    # Sorted with adjacent repeats: no duplicates
    df_sorted = DataFrame(; g = ["A", "A", "B", "B"], x = [1, 2, 3, 4])
    tbl_sorted = StyledTable(df_sorted)
    tab_rowgroup!(tbl_sorted, :g)
    @test isempty(StyledTables._duplicate_group_labels(tbl_sorted))

    # Fully unique: no duplicates
    df_unique = DataFrame(; g = ["A", "B", "C"], x = [1, 2, 3])
    tbl_unique = StyledTable(df_unique)
    tab_rowgroup!(tbl_unique, :g)
    @test isempty(StyledTables._duplicate_group_labels(tbl_unique))

    # No rowgroup_col set: returns empty
    df_no_group = DataFrame(; x = [1, 2])
    tbl_no_group = StyledTable(df_no_group)
    @test isempty(StyledTables._duplicate_group_labels(tbl_no_group))

    # Adjacent repeated values are not duplicates
    df_adj = DataFrame(; g = ["A", "A", "B"], x = [1, 2, 3])
    tbl_adj = StyledTable(df_adj)
    tab_rowgroup!(tbl_adj, :g)
    @test isempty(StyledTables._duplicate_group_labels(tbl_adj))
end
