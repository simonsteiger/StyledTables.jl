@testset "spanner!" begin
    df = DataFrame(; name = ["Alice", "Bob"], dose = [10, 20], response = [0.9, 0.8])

    tbl = StyledTable(df)
    spanner!(tbl, [:dose, :response] => "Treatment", [:name] => "Participant")
    run_reftest(tbl, "references/spanner/basic")

    tbl2 = StyledTable(df)
    spanner!(tbl2, [:dose, :response] => "Treatment")
    @test tbl2.spanners[1].level == 1

    tbl3 = StyledTable(df)
    spanner!(tbl3, [:dose, :response] => "Treatment"; level = 2)
    @test tbl3.spanners[1].level == 2

    tbl = StyledTable(df)
    spanner!(tbl, Dict([:dose, :response] => "Treatment", [:name] => "Participant"))
    run_reftest(tbl, "references/spanner/two_spanners")

    @test_throws ArgumentError spanner!(StyledTable(df), [:typo] => "X")

    @testset "mixed-type pairs error" begin
        let df = DataFrame(; a = [1], b = [2], c = [3])
            # Mixed key types: Vector{Symbol} and Symbol column selectors
            @test_throws ArgumentError spanner!(
                StyledTable(df),
                Dict{Any,String}([:a, :b] => "AB", :c => "C"),
            )
        end
    end
end

@testset "spanner! input types" begin
    df = DataFrame(; name = ["Alice"], dose = [10], response = [0.9])

    # Canonical reference: Pair... varargs method
    ref = let tbl = StyledTable(df)
        spanner!(tbl, [:dose, :response] => "Treatment")
        html_str(tbl)
    end

    # AbstractVector{<:Pair{Vector{AbstractString}, AbstractString}}
    let tbl = StyledTable(df)
        spanner!(tbl, [["dose", "response"] => "Treatment"])
        @test html_str(tbl) == ref
    end

    # AbstractVector{<:Pair{Vector{Symbol}, Symbol}}
    let tbl = StyledTable(df)
        spanner!(tbl, [[:dose, :response] => :Treatment])
        @test html_str(tbl) == ref
    end

    # AbstractVector{<:Pair{Vector{AbstractString}, Symbol}}
    let tbl = StyledTable(df)
        spanner!(tbl, ["dose", "response"] => :Treatment)
        @test html_str(tbl) == ref
    end

    let tbl = StyledTable(df)
        spanner!(tbl, [:dose, :response] => "Treatment")
        @test html_str(tbl) == ref
    end

    # AbstractDict{Vector{AbstractString}, AbstractString}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict(["dose", "response"] => "Treatment"))
        @test html_str(tbl) == ref
    end

    # AbstractDict{Vector{AbstractString}, Symbol}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict(["dose", "response"] => :Treatment))
        @test html_str(tbl) == ref
    end

    # AbstractDict{Vector{Symbol}, AbstractString}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict([:dose, :response] => "Treatment"))
        @test html_str(tbl) == ref
    end

    # AbstractDict{Vector{Symbol}, Symbol}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict([:dose, :response] => :Treatment))
        @test html_str(tbl) == ref
    end

    # Single pair
    ref = let tbl = StyledTable(df)
        spanner!(tbl, :dose => "Treatment")
        html_str(tbl)
    end

    # AbstractDict{Symbol, Symbol}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict(:dose => :Treatment))
        @test html_str(tbl) == ref
    end

    # AbstractDict{Symbol, String}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict(:dose => :Treatment))
        @test html_str(tbl) == ref
    end

    # AbstractDict{String, String}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict("dose" => "Treatment"))
        @test html_str(tbl) == ref
    end

    # AbstractDict{String, Symbol}
    let tbl = StyledTable(df)
        spanner!(tbl, Dict(:dose => "Treatment"))
        @test html_str(tbl) == ref
    end

    # Single Multiline spanner
    ref = let tbl = StyledTable(df)
        spanner!(tbl, :dose => Multiline("Treatment", "(mg)"))
        html_str(tbl)
    end

    # Single Multiline inside Dict
    let tbl = StyledTable(df)
        spanner!(tbl, Dict(:dose => Multiline("Treatment", "(mg)")))
        @test html_str(tbl) == ref
    end

    # Single Multiline inside Vector
    let tbl = StyledTable(df)
        spanner!(tbl, [:dose => Multiline("Treatment", "(mg)")])
        @test html_str(tbl) == ref
    end

    # Mixed key types — Dict{Any, String} → ArgumentError
    @test_throws ArgumentError spanner!(
        StyledTable(df),
        Dict{Any,String}([:dose, :response] => "Treatment", :name => "Participant"),
    )

    # Mixed key types — Vector{Pair{Any, String}} → ArgumentError
    @test_throws ArgumentError spanner!(
        StyledTable(df),
        Pair[[:dose, :response]=>"Treatment", :name=>"Participant"],
    )
end

@testset "spanner! nested" begin
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
        spanner!(tbl, [:bill_len] => "A"; level = 1)
        spanner!(tbl, [:bill_depth] => "B"; level = 3)
        render(tbl)
    end

    # Error: same-level partial overlap
    @test_throws ArgumentError begin
        tbl = StyledTable(df)
        spanner!(tbl, [:bill_len, :bill_depth] => "A")
        spanner!(tbl, [:bill_depth, :flipper_len] => "B")
        render(tbl)
    end

    # Error: cross-level partial overlap
    @test_throws ArgumentError begin
        tbl = StyledTable(df)
        spanner!(tbl, [:bill_len, :bill_depth, :flipper_len] => "A")
        spanner!(tbl, [:bill_depth, :flipper_len, :body_mass] => "B"; level = 2)
        render(tbl)
    end

    # Scenario A: level-2 spanner covers exactly the same columns as level-1
    tbl = StyledTable(df)
    spanner!(tbl, [:bill_len, :bill_depth, :flipper_len] => "Length (mm)")
    spanner!(
        tbl,
        [:bill_len, :bill_depth, :flipper_len] => "Physical measurements";
        level = 2,
    )
    run_reftest(tbl, "references/spanner/nested_two_levels")

    # Scenario B: level-2 spanner covers level-1 columns PLUS an extra ungrouped column
    tbl = StyledTable(df)
    spanner!(tbl, [:bill_len, :bill_depth, :flipper_len] => "Length (mm)")
    spanner!(
        tbl,
        [:bill_len, :bill_depth, :flipper_len, :body_mass] => "Physical measurements";
        level = 2,
    )
    run_reftest(tbl, "references/spanner/nested_uncovered_col")
end

@testset "spanner! Multiline" begin
    df = DataFrame(; dose = [10, 20], response = [0.9, 0.8])

    tbl = StyledTable(df)
    spanner!(tbl, [:dose, :response] => Multiline("Treatment", "(N=50)"))
    run_reftest(tbl, "references/spanner/multiline_label")
end

@testset "stub!" begin
    df = DataFrame(; rowname = ["Alice", "Bob"], score = [90, 85])

    tbl = StyledTable(df)
    stub!(tbl, :rowname)
    run_reftest(tbl, "references/stub/basic")

    @test_throws ArgumentError stub!(StyledTable(df), :nonexistent)
end

@testset "header!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    tbl = StyledTable(df)
    header!(tbl, "My Table")
    run_reftest(tbl, "references/header/title_only")

    tbl = StyledTable(df)
    header!(tbl, "My Table"; subtitle = "A subtitle")
    run_reftest(tbl, "references/header/title_and_subtitle")

    tbl = StyledTable(df)
    header!(tbl, "My Table"; subtitle = "Subtitle")
    spanner!(tbl, [:x, :y] => "XY")
    run_reftest(tbl, "references/header/with_spanner")
end

@testset "rowgroup!" begin
    df = DataFrame(;
        arm = ["A", "A", "B", "B"],
        name = ["x1", "x2", "y1", "y2"],
        score = [1, 2, 3, 4],
    )

    tbl = StyledTable(df)
    rowgroup!(tbl, :arm)
    run_reftest(tbl, "references/rowgroup/basic")

    tbl = StyledTable(df)
    rowgroup!(tbl, :arm; indent_pt = 24)
    run_reftest(tbl, "references/rowgroup/custom_indent")

    tbl = StyledTable(df)
    rowgroup!(tbl, :arm; full_width = true)
    run_reftest(tbl, "references/rowgroup/full_width")

    @test_throws ArgumentError rowgroup!(StyledTable(df), :nonexistent)
end

@testset "stubhead!" begin
    df = DataFrame(; rowname = ["Alice", "Bob"], score = [90, 85])

    tbl = StyledTable(df)
    stub!(tbl, :rowname)
    stubhead!(tbl, "Name")
    run_reftest(tbl, "references/stubhead/basic")

    @testset "warns without stub!" begin
        df = DataFrame(; x = [1, 2])
        tbl = StyledTable(df)
        @test_logs (:warn, r"no effect") stubhead!(tbl, "Row")
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
    rowgroup!(tbl_unsorted, :g)
    @test StyledTables._duplicate_group_labels(tbl_unsorted) == ["A"]

    # Sorted with adjacent repeats: no duplicates
    df_sorted = DataFrame(; g = ["A", "A", "B", "B"], x = [1, 2, 3, 4])
    tbl_sorted = StyledTable(df_sorted)
    rowgroup!(tbl_sorted, :g)
    @test isempty(StyledTables._duplicate_group_labels(tbl_sorted))

    # Fully unique: no duplicates
    df_unique = DataFrame(; g = ["A", "B", "C"], x = [1, 2, 3])
    tbl_unique = StyledTable(df_unique)
    rowgroup!(tbl_unique, :g)
    @test isempty(StyledTables._duplicate_group_labels(tbl_unique))

    # No rowgroup_col set: returns empty
    df_no_group = DataFrame(; x = [1, 2])
    tbl_no_group = StyledTable(df_no_group)
    @test isempty(StyledTables._duplicate_group_labels(tbl_no_group))

    # Adjacent repeated values are not duplicates
    df_adj = DataFrame(; g = ["A", "A", "B"], x = [1, 2, 3])
    tbl_adj = StyledTable(df_adj)
    rowgroup!(tbl_adj, :g)
    @test isempty(StyledTables._duplicate_group_labels(tbl_adj))
end
