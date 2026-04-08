using StyledTables
using SummaryTables
using DataFrames
using Test
using ReferenceTests
using Colors
using Logging

struct AsMIME{M}
    object::Any
end
Base.show(io::IO, m::AsMIME{M}) where {M} = show(io, M(), m.object)

as_html(object) = AsMIME{MIME"text/html"}(object)
as_latex(object) = AsMIME{MIME"text/latex"}(object)
as_typst(object) = AsMIME{MIME"text/typst"}(object)

function html_str(tbl)
    io = IOBuffer()
    show(io, MIME("text/html"), render(tbl))
    String(take!(io))
end

function run_reftest(tbl, relpath)
    rendered = render(tbl)
    @test_reference joinpath(@__DIR__, relpath * ".txt") as_html(rendered)
    @test_reference joinpath(@__DIR__, relpath * ".latex.txt") as_latex(rendered)
    @test_reference joinpath(@__DIR__, relpath * ".typ.txt") as_typst(rendered)
end

@testset "StyledTables" begin
    include("sets/annotations.jl")
    include("sets/Aqua.jl")
    include("sets/colors.jl")
    include("sets/formatting.jl")
    include("sets/modifiers.jl")
    include("sets/render.jl")
    include("sets/show.jl")
    include("sets/structure.jl")
    include("sets/styling.jl")
end
