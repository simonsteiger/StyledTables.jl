@testset "NumberFormatter" begin
    df = DataFrame(; x = [1.23456, 2.34567], y = [10.0, 20.0])

    tbl = StyledTable(df)
    format!(tbl, NumberFormatter([:x]; digits = 2))
    run_reftest(tbl, "references/fmt/number_two_digits")

    tbl = StyledTable(df)
    format!(tbl, NumberFormatter([:x, :y]; digits = 1, trailing_zeros = true))
    run_reftest(tbl, "references/fmt/number_trailing_zeros")

    @test_throws ArgumentError format!(StyledTable(df), NumberFormatter(:nonexistent))

    let df = DataFrame(; x = [1.5, 2.5])
        tbl = StyledTable(df)
        format!(tbl, NumberFormatter("x"; digits = 1))
        @test only(tbl.col_formatters[:x])(1.5) == "1.5"
    end

    let df = DataFrame(; x = [1.5, 2.0])
        tbl = StyledTable(df)
        format!(tbl, NumberFormatter(:x; digits = 3, trailing_zeros = false))
        f = only(tbl.col_formatters[:x])
        @test f(1.5) == "1.5"
        @test f(2.0) == "2"
    end

    @testset "type check" begin
        df_str = DataFrame(; label = ["a", "b"], x = [1.0, 2.0])
        @test_throws ArgumentError format!(StyledTable(df_str), NumberFormatter(:label))
        @test_throws ArgumentError format!(StyledTable(df_str), PercentFormatter(:label))
        @test_throws ArgumentError format!(StyledTable(df_str), IntegerFormatter(:label))
        @test format!(StyledTable(df_str), NumberFormatter(:x)) isa StyledTable
        df_missing = DataFrame(; x = [1.0, missing])
        @test format!(StyledTable(df_missing), NumberFormatter(:x)) isa StyledTable
    end
end

@testset "PercentFormatter" begin
    df = DataFrame(; rate = [0.123, 0.456])

    tbl = StyledTable(df)
    format!(tbl, PercentFormatter(:rate; digits = 1))
    run_reftest(tbl, "references/fmt/percent_default")

    let df = DataFrame(; x = [0.5])
        tbl = StyledTable(df)
        format!(tbl, PercentFormatter(:x; scale = 1))
        @test only(tbl.col_formatters[:x])(0.5) == "0.5%"
    end

    let df = DataFrame(; x = [0.5])
        tbl = StyledTable(df)
        format!(tbl, PercentFormatter(:x; suffix = " pct"))
        @test only(tbl.col_formatters[:x])(0.5) == "50.0 pct"
    end
end

@testset "IntegerFormatter" begin
    df = DataFrame(; n = [1.7, 2.3])

    tbl = StyledTable(df)
    format!(tbl, IntegerFormatter(:n))
    run_reftest(tbl, "references/fmt/integer")
end

@testset "MissingFormatter" begin
    df = DataFrame(; x = [1, missing, 3], y = ["a", "b", missing])

    tbl = StyledTable(df)
    format!(tbl, MissingFormatter([:x, :y], "–"))
    run_reftest(tbl, "references/fmt/missing_default")

    tbl = StyledTable(df)
    format!(tbl, MissingFormatter([:x, :y], "N/A"))
    run_reftest(tbl, "references/fmt/missing_custom_text")

    let f = MissingFormatter(:x, "—")
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
    format!(tbl, NumberFormatter(:x; digits = 2))
    format!(tbl, MissingFormatter(:x, "—"))

    @test length(tbl.col_formatters[:x]) == 2
    fs = tbl.col_formatters[:x]
    @test fs[2](fs[1](1.5)) == "1.50"
    @test fs[2](fs[1](missing)) == "—"

    @testset "multiple formatters in one call" begin
        tbl2 = StyledTable(df)
        format!(tbl2, NumberFormatter(:x; digits = 2), MissingFormatter(:x, "—"))
        @test length(tbl2.col_formatters[:x]) == 2
        fs2 = tbl2.col_formatters[:x]
        @test fs2[2](fs2[1](1.5)) == "1.50"
        @test fs2[2](fs2[1](missing)) == "—"
    end
end

@testset "custom AbstractFormatter" begin
    struct BracketFormatter <: AbstractFormatter
        syms::Vector{Symbol}
    end
    (f::BracketFormatter)(x) = ismissing(x) ? x : "($x)"

    df = DataFrame(; x = [1, 2])
    tbl = StyledTable(df)
    format!(tbl, BracketFormatter([:x]))
    @test only(tbl.col_formatters[:x])(42) == "(42)"
end

@testset "old formatter-first call form removed" begin
    df = DataFrame(; x = [1.0])
    # AbstractFormatter structs are callable but not `isa Function`, so the
    # bare-callable methods (typed on `Function`) never match — this is a
    # plain dispatch failure, not a custom error.
    @test_throws MethodError format!(NumberFormatter(:x), StyledTable(df), :x)
    @test_throws MethodError format!(NumberFormatter(:x), StyledTable(df), [:x])
end
