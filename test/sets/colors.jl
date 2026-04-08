@testset "_resolve_color" begin
    @test StyledTables._resolve_color(nothing) === nothing
    @test StyledTables._resolve_color(:red) isa String
    @test startswith(StyledTables._resolve_color(:red), "#")
    @test StyledTables._resolve_color("green") isa String
    @test startswith(StyledTables._resolve_color("green"), "#")
    @test StyledTables._resolve_color("#1a7340") isa String
    @test startswith(StyledTables._resolve_color("#1a7340"), "#")
    @test StyledTables._resolve_color(colorant"blue") isa String
    @test startswith(StyledTables._resolve_color(colorant"blue"), "#")
    @test_throws ArgumentError StyledTables._resolve_color(42)
end
