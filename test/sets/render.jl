@testset "StyledTable / basic render" begin
    df = DataFrame(; a = [1, 2], b = ["x", "y"])
    run_reftest(StyledTable(df), "references/styled_table/basic")

    # Non-DataFrame Tables.jl-compatible input is converted to DataFrame
    let nt = [(x = 1, y = 2), (x = 3, y = 4)]
        tbl = StyledTable(nt)
        @test tbl.data isa DataFrame
        @test names(tbl.data) == ["x", "y"]
        @test nrow(tbl.data) == 2
    end
end

@testset "render() warnings" begin
    # Non-contiguous spanner: warn
    df = DataFrame(; x = [1], y = [2], z = [3])
    tbl = StyledTable(df)
    tab_spanner!(tbl, "XZ" => [:x, :z])
    @test_logs (:warn, r"gap") render(tbl)

    # Unsorted row groups: warn
    df2 = DataFrame(; g = ["A", "B", "A"], v = [1, 2, 3])
    tbl2 = StyledTable(df2)
    tab_row_group!(tbl2, :g)
    @test_logs (:warn, r"not sorted") render(tbl2)

    # Well-formed table: no warnings
    df3 = DataFrame(; a = [1, 2], b = [3, 4], g = ["X", "X"])
    tbl3 = StyledTable(df3)
    tab_spanner!(tbl3, "AB" => [:a, :b])
    tab_row_group!(tbl3, :g)
    @test_logs min_level = Logging.Warn render(tbl3)

    # Hiding an edge column of a spanner: warn
    df_edge = DataFrame(; x = [1], y = [2], z = [3])
    tbl_edge = StyledTable(df_edge)
    tab_spanner!(tbl_edge, "XY" => [:x, :y])
    cols_hide!(tbl_edge, :x)                     # :x is the left edge of spanner "XY"
    @test_logs (:warn, r"hidden") render(tbl_edge)

    # Hiding all columns of a spanner: warn
    df_all = DataFrame(; x = [1], y = [2], z = [3])
    tbl_all = StyledTable(df_all)
    tab_spanner!(tbl_all, "XY" => [:x, :y])
    cols_hide!(tbl_all, :x, :y)
    @test_logs (:warn, r"hidden") render(tbl_all)

    # Hiding a column not in any spanner: no spanner-hidden warning
    df_ok = DataFrame(; x = [1], y = [2], z = [3])
    tbl_ok = StyledTable(df_ok)
    tab_spanner!(tbl_ok, "XY" => [:x, :y])
    cols_hide!(tbl_ok, :z)
    @test_logs min_level = Logging.Warn render(tbl_ok)
end
