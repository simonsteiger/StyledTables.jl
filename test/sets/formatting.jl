@testset "fmt_number!" begin
    df = DataFrame(; x = [1.23456, 2.34567], y = [10.0, 20.0])

    tbl = StyledTable(df)
    fmt_number!(tbl, [:x]; digits = 2)
    run_reftest(tbl, "references/fmt/number_two_digits")

    tbl = StyledTable(df)
    fmt_number!(tbl, [:x, :y]; digits = 1, trailing_zeros = true)
    run_reftest(tbl, "references/fmt/number_trailing_zeros")

    @test_throws ArgumentError fmt_number!(StyledTable(df), [:nonexistent]; digits = 2)

    # Vector{String} column selector (AbstractVector{<:AbstractString} overload)
    let df = DataFrame(; x = [1.5, 2.5])
        tbl = StyledTable(df)
        fmt_number!(tbl, ["x"]; digits = 1)
        @test tbl.col_formatters[:x](1.5) == "1.5"
    end

    # Single String column selector (AbstractString overload)
    let df = DataFrame(; x = [1.5])
        tbl = StyledTable(df)
        fmt_number!(tbl, "x"; digits = 1)
        @test tbl.col_formatters[:x](1.5) == "1.5"
    end

    # trailing_zeros=false — rstrip path
    let df = DataFrame(; x = [1.5, 2.0])
        tbl = StyledTable(df)
        fmt_number!(tbl, [:x]; digits = 3, trailing_zeros = false)
        @test tbl.col_formatters[:x](1.5) == "1.5"    # trailing zero stripped: 1.500 → 1.5
        @test tbl.col_formatters[:x](2.0) == "2"       # trailing zeros + dot stripped: 2.000 → 2
    end

    @testset "type check" begin
        df_str = DataFrame(; label = ["a", "b"], x = [1.0, 2.0])
        @test_throws ArgumentError fmt_number!(StyledTable(df_str), [:label])
        @test_throws ArgumentError fmt_percent!(StyledTable(df_str), [:label])
        @test_throws ArgumentError fmt_integer!(StyledTable(df_str), [:label])
        # Numeric columns must still work
        @test fmt_number!(StyledTable(df_str), [:x]) isa StyledTable
        # Nullable numeric columns must still work
        df_missing = DataFrame(; x = [1.0, missing])
        @test fmt_number!(StyledTable(df_missing), [:x]) isa StyledTable
    end
end

@testset "fmt_percent!" begin
    df = DataFrame(; rate = [0.123, 0.456])

    tbl = StyledTable(df)
    fmt_percent!(tbl, [:rate]; digits = 1)
    run_reftest(tbl, "references/fmt/percent_default")

    # scale kwarg — scale=1 means no multiplication (value stays as-is)
    let df = DataFrame(; x = [0.5])
        tbl = StyledTable(df)
        fmt_percent!(tbl, [:x]; scale = 1)
        @test tbl.col_formatters[:x](0.5) == "0.5%"   # 0.5 * 1 = 0.5, not 50.0%
    end

    # suffix kwarg — non-default suffix
    let df = DataFrame(; x = [0.5])
        tbl = StyledTable(df)
        fmt_percent!(tbl, [:x]; suffix = " pct")
        @test tbl.col_formatters[:x](0.5) == "50.0 pct"  # 0.5 * 100 = 50.0 + " pct"
    end
end

@testset "fmt_integer!" begin
    df = DataFrame(; n = [1.7, 2.3])

    tbl = StyledTable(df)
    fmt_integer!(tbl, [:n])
    run_reftest(tbl, "references/fmt/integer")
end

@testset "fmt! (custom)" begin
    df = DataFrame(; x = [1.0, 2.0])

    tbl = StyledTable(df)
    fmt!(x -> "≈$(round(Int, x))", tbl, :x)
    run_reftest(tbl, "references/fmt/custom")

    @test_throws ArgumentError fmt!(identity, StyledTable(df), :nonexistent)
end
