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
        # boldness preserved when label override is active
        @test result.cells[1, 1].style.bold == true
        @test result.cells[1, 2].style.bold == true
        # unknown column raises ArgumentError
        @test_throws ArgumentError gt(df) |> cols_label(typo = "Label")
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
        # all-columns default path
        tbl2 = gt(df) |> cols_align(:right)
        result2 = render(tbl2)
        @test result2.cells[1, 1].style.halign == :right
        @test result2.cells[1, 2].style.halign == :right
        @test result2.cells[2, 1].style.halign == :right
        @test result2.cells[2, 2].style.halign == :right
        # invalid halign raises ArgumentError
        @test_throws ArgumentError cols_align(:centre)
        # nonexistent column raises ArgumentError
        @test_throws ArgumentError gt(df) |> cols_align(:left, [:nonexistent])
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

    @testset "tab_spanner" begin
        df = DataFrame(name = ["Alice"], dose = [10], response = [0.9])
        tbl = gt(df) |> tab_spanner("Treatment"; columns = [:dose, :response])
        result = render(tbl)

        # Spanner adds one extra header row → header = 2, total rows = 3 (1 spanner + 1 col-header + 1 body)
        @test size(result.cells, 1) == 3
        @test result.header == 2

        # Spanner label appears above :dose (col 2) and :response (col 3)
        @test result.cells[1, 2].value == "Treatment"
        @test result.cells[1, 2].style.merge == true
        @test result.cells[1, 2].style.mergegroup == 1
        @test result.cells[1, 3].value == "Treatment"
        @test result.cells[1, 3].style.merge == true
        @test result.cells[1, 3].style.mergegroup == 1

        # :name col has nothing in spanner row
        @test isnothing(result.cells[1, 1].value)
        # unknown column raises ArgumentError
        @test_throws ArgumentError gt(df) |> tab_spanner("X"; columns = [:typo])

        # Column header row (row 2) is unaffected
        @test result.cells[2, 1].value == "name"
        @test result.cells[2, 2].value == "dose"
    end

    @testset "tab_stub" begin
        df = DataFrame(rowname = ["Alice", "Bob"], score = [90, 85])
        tbl = gt(df) |> tab_stub(:rowname)
        result = render(tbl)

        # Still 2 columns in output (stub + data)
        @test size(result.cells, 2) == 2

        # Header for stub column is empty (nothing)
        @test isnothing(result.cells[1, 1].value)

        # Header for data column is present
        @test result.cells[1, 2].value == "score"

        # Body stub values are shown
        @test result.cells[2, 1].value == "Alice"

        # unknown column raises ArgumentError
        @test_throws ArgumentError gt(df) |> tab_stub(:nonexistent)
    end

end
