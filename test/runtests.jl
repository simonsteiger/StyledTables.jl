using SummaryTablesExtras
using SummaryTables
using DataFrames
using Test

@testset "SummaryTablesExtras.jl" begin

    df = DataFrame(group = ["A","A","B","B"], x = [1,2,3,4], y = [5.0,6.0,7.0,8.0])

    @testset "GTTable construction" begin
        tbl = gt(df)
        @test tbl isa GTTable
        @test tbl.data == df
        @test isempty(tbl.col_labels)
        @test isempty(tbl.col_alignments)
        @test isempty(tbl.spanners)
        @test isnothing(tbl.row_group_col)
        @test isnothing(tbl.stub_col)
        @test isnothing(tbl.header)
        @test isempty(tbl.footnotes)
    end

    @testset "cols_label" begin
        df = DataFrame(x = [1], y = [2])
        tbl = gt(df) |> cols_label(x = "Variable X", y = "Variable Y")
        result = render(tbl)
        @test result.cells[1, 1].value == "Variable X"
        @test result.cells[1, 2].value == "Variable Y"
    end

    @testset "cols_align" begin
        df = DataFrame(x = [1, 2], y = [3, 4])
        tbl = gt(df) |> cols_align(:center, [:x, :y])
        result = render(tbl)
        # header alignment
        @test result.cells[1, 1].style.halign == :center
        @test result.cells[1, 2].style.halign == :center
        # body alignment
        @test result.cells[2, 1].style.halign == :center
        @test result.cells[2, 2].style.halign == :center
    end

    @testset "basic render" begin
        df = DataFrame(a = [1, 2], b = ["x", "y"])
        tbl = gt(df)
        result = render(tbl)
        @test result isa SummaryTables.Table

        cells = result.cells
        # 3 rows: 1 header + 2 body; 2 columns
        @test size(cells) == (3, 2)

        # header row is bold
        @test cells[1, 1].style.bold == true
        @test cells[1, 2].style.bold == true

        # header row values are column names
        @test cells[1, 1].value == "a"
        @test cells[1, 2].value == "b"

        # body values match DataFrame
        @test cells[2, 1].value == 1
        @test cells[3, 1].value == 2
        @test cells[2, 2].value == "x"
        @test cells[3, 2].value == "y"

        # Table header marker is 1
        @test result.header == 1
    end

end
