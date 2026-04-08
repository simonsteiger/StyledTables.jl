@testset "cols_label!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    tbl = StyledTable(df)
    cols_label!(tbl, :x => "Variable X", :y => "Variable Y")
    run_reftest(tbl, "references/cols_label/relabeled_two_cols")

    tbl = StyledTable(df)
    cols_label!(tbl, :x => "Only X")
    run_reftest(tbl, "references/cols_label/relabeled_one_col")

    @test_throws ArgumentError cols_label!(StyledTable(df), :typo => "Label")

    @testset "mixed-type pairs error" begin
        let df = DataFrame(; a = [1], b = [2])
            # Mixed value types: String and Multiline labels
            @test_throws ArgumentError cols_label!(
                StyledTable(df),
                Dict{Symbol,Any}(:a => Multiline("A", "(units)"), :b => "B"),
            )
            # Mixed key types: Symbol and String column names
            @test_throws ArgumentError cols_label!(
                StyledTable(df),
                Dict{Any,String}(:a => "A", "b" => "B"),
            )
        end
    end
end

# -----------------------------------------------------------------------
@testset "cols_label! input types" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

    # Canonical reference: Pair... varargs method with Symbol => String pairs
    ref = let tbl = StyledTable(df)
        cols_label!(tbl, :x => "VarX", :y => "VarY")
        html_str(tbl)
    end

    # AbstractVector{<:Pair{Symbol, Symbol}}
    # Vector{Pair{Symbol,Symbol}} (invariant) hits the standalone method;
    # covariant subtype also exercises the Union path.
    let tbl = StyledTable(df)
        cols_label!(tbl, Pair{Symbol,Symbol}[:x=>:VarX, :y=>:VarY])
        @test html_str(tbl) == ref
    end

    # AbstractVector{<:Pair{AbstractString, AbstractString}}
    let tbl = StyledTable(df)
        cols_label!(tbl, ["x" => "VarX", "y" => "VarY"])
        @test html_str(tbl) == ref
    end

    # AbstractVector{<:Pair{AbstractString, Symbol}}
    let tbl = StyledTable(df)
        cols_label!(tbl, Pair{String,Symbol}["x"=>:VarX, "y"=>:VarY])
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
    df = DataFrame(;
        placebo_n = ["12 (24%)", "18 (36%)"],
        treatment_n = ["15 (30%)", "20 (40%)"],
    )

    tbl = StyledTable(df)
    cols_label!(
        tbl,
        :placebo_n => Multiline("Placebo (N=50)", "n (%)"),
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
    df = DataFrame(; first_name = ["Alice", "Bob"], last_name = ["Smith", "Jones"])

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
    let df = DataFrame(; first_name = ["Alice"], last_name = ["Smith"])
        tbl = StyledTable(df)
        cols_label!(uppercase, tbl, :first_name)
        @test tbl.col_labels[:first_name] == "FIRST_NAME"
        @test !haskey(tbl.col_labels, :last_name)
    end

    # Scalar String selector — delegates to Symbol then vector form
    let df = DataFrame(; first_name = ["Alice"], last_name = ["Smith"])
        tbl = StyledTable(df)
        cols_label!(uppercase, tbl, "first_name")
        @test tbl.col_labels[:first_name] == "FIRST_NAME"
        @test !haskey(tbl.col_labels, :last_name)
    end
end

# -----------------------------------------------------------------------
@testset "cols_align!" begin
    df = DataFrame(; x = [1, 2], y = [3, 4])

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

    # --- error cases ---
    @test_throws ArgumentError cols_align!(StyledTable(df), :centre)
    @test_throws ArgumentError cols_align!(StyledTable(df), :x => :centre)
    @test_throws ArgumentError cols_align!(StyledTable(df), :nonexistent => :left)

    @testset "mixed-type pairs error" begin
        let df = DataFrame(; x = [1], y = [2])
            # Mixed value types: Symbol and String alignment values
            @test_throws ArgumentError cols_align!(
                StyledTable(df),
                Dict{Symbol,Any}(:x => :right, :y => "center"),
            )
            # Mixed value types in a vector of pairs
            @test_throws ArgumentError cols_align!(
                StyledTable(df),
                Pair{Any,Any}[:x=>:right, :y=>"center"],
            )
        end
    end

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

@testset "cols_hide!" begin
    df = DataFrame(; a = [1, 2], b = [3, 4], c = [5, 6])

    tbl = StyledTable(df)
    cols_hide!(tbl, :c)
    run_reftest(tbl, "references/cols_hide/single")

    tbl = StyledTable(df)
    cols_hide!(tbl, :a, :c)
    run_reftest(tbl, "references/cols_hide/multiple")

    @test_throws ArgumentError cols_hide!(StyledTable(df), :nonexistent)
end

@testset "sub_missing!" begin
    df = DataFrame(; x = [1, missing, 3], y = ["a", "b", missing])

    tbl = StyledTable(df)
    sub_missing!(tbl)
    run_reftest(tbl, "references/sub_missing/default")

    tbl = StyledTable(df)
    sub_missing!(tbl; with = "N/A")
    run_reftest(tbl, "references/sub_missing/custom_text")
end
