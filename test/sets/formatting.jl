@testset "NumberFormatter" begin
    df = DataFrame(; x = [1.23456, 2.34567], y = [10.0, 20.0])

    tbl = StyledTable(df)
    format!(NumberFormatter(digits = 2), tbl, [:x])
    run_reftest(tbl, "references/fmt/number_two_digits")

    tbl = StyledTable(df)
    format!(NumberFormatter(digits = 1, trailing_zeros = true), tbl, [:x, :y])
    run_reftest(tbl, "references/fmt/number_trailing_zeros")

    @test_throws ArgumentError format!(NumberFormatter(), StyledTable(df), :nonexistent)

    let df = DataFrame(; x = [1.5, 2.5])
        tbl = StyledTable(df)
        format!(NumberFormatter(digits = 1), tbl, ["x"])
        @test only(tbl.col_formatters[:x])(1.5) == "1.5"
    end

    let df = DataFrame(; x = [1.5, 2.0])
        tbl = StyledTable(df)
        format!(NumberFormatter(digits = 3, trailing_zeros = false), tbl, [:x])
        f = only(tbl.col_formatters[:x])
        @test f(1.5) == "1.5"
        @test f(2.0) == "2"
    end

    @testset "type check" begin
        df_str = DataFrame(; label = ["a", "b"], x = [1.0, 2.0])
        @test_throws ArgumentError format!(NumberFormatter(), StyledTable(df_str), :label)
        @test_throws ArgumentError format!(PercentFormatter(), StyledTable(df_str), :label)
        @test_throws ArgumentError format!(IntegerFormatter(), StyledTable(df_str), :label)
        @test format!(NumberFormatter(), StyledTable(df_str), :x) isa StyledTable
        df_missing = DataFrame(; x = [1.0, missing])
        @test format!(NumberFormatter(), StyledTable(df_missing), :x) isa StyledTable
    end
end

@testset "PercentFormatter" begin
    df = DataFrame(; rate = [0.123, 0.456])

    tbl = StyledTable(df)
    format!(PercentFormatter(digits = 1), tbl, [:rate])
    run_reftest(tbl, "references/fmt/percent_default")

    let df = DataFrame(; x = [0.5])
        tbl = StyledTable(df)
        format!(PercentFormatter(scale = 1), tbl, :x)
        @test only(tbl.col_formatters[:x])(0.5) == "0.5%"
    end

    let df = DataFrame(; x = [0.5])
        tbl = StyledTable(df)
        format!(PercentFormatter(suffix = " pct"), tbl, :x)
        @test only(tbl.col_formatters[:x])(0.5) == "50.0 pct"
    end
end

@testset "IntegerFormatter" begin
    df = DataFrame(; n = [1.7, 2.3])

    tbl = StyledTable(df)
    format!(IntegerFormatter(), tbl, [:n])
    run_reftest(tbl, "references/fmt/integer")
end

@testset "MissingFormatter" begin
    df = DataFrame(; x = [1, missing, 3], y = ["a", "b", missing])

    tbl = StyledTable(df)
    format!(MissingFormatter("–"), tbl, :x, :y)
    run_reftest(tbl, "references/fmt/missing_default")

    tbl = StyledTable(df)
    format!(MissingFormatter("N/A"), tbl, :x, :y)
    run_reftest(tbl, "references/fmt/missing_custom_text")

    let f = MissingFormatter("—")
        @test f(42) == 42
        @test f("hello") == "hello"
        @test f(missing) == "—"
    end
end

@testset "FunctionFormatter (bare callable)" begin
    df = DataFrame(; x = [1.0, 2.0])

    tbl = StyledTable(df)
    format!(x -> "≈$(round(Int, x))", tbl, :x)
    run_reftest(tbl, "references/fmt/custom")

    @test_throws ArgumentError format!(identity, StyledTable(df), :nonexistent)
end

@testset "stacked formatters" begin
    df = DataFrame(; x = [1.5, missing])

    tbl = StyledTable(df)
    format!(NumberFormatter(digits = 2), tbl, :x)
    format!(MissingFormatter("—"), tbl, :x)

    @test length(tbl.col_formatters[:x]) == 2
    fs = tbl.col_formatters[:x]
    @test fs[2](fs[1](1.5)) == "1.50"
    @test fs[2](fs[1](missing)) == "—"
end

@testset "custom AbstractFormatter" begin
    struct BracketFormatter <: AbstractFormatter end
    (::BracketFormatter)(x) = ismissing(x) ? x : "($x)"

    df = DataFrame(; x = [1, 2])
    tbl = StyledTable(df)
    format!(BracketFormatter(), tbl, :x)
    @test only(tbl.col_formatters[:x])(42) == "(42)"
end
