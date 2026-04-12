using Documenter
using DocumenterVitepress
using StyledTables
using DataFrames
using SummaryTables

makedocs(;
    sitename="StyledTables.jl",
    authors="Simon Steiger",
    modules=[StyledTables],
    format=DocumenterVitepress.MarkdownVitepress(;
        repo="github.com/simonsteiger/StyledTables.jl", devbranch="main", devurl="dev"
    ),
    pages=[
        "Home" => "index.md",
        "Getting Started" => "getting_started.md",
        "Reference" => [
            "Column Modifiers" => "reference/modifiers.md",
            "Table Structure" => "reference/structure.md",
            "Annotations" => "reference/annotations.md",
            "Styling" => "reference/styling.md",
            "Formatting" => "reference/formatting.md",
            "Rendering" => "reference/rendering.md",
        ],
        "Examples" => [
            "Basic use" => [
                "Sports Cars Table" => "examples/cars.md",
                "Clinical Demographics" => "examples/clinical.md",
                "Quarterly Report" => "examples/report.md",
            ],
            "Advanced options" => [
                "Multilevel spanners" => "examples/multilevel_spanners.md",
                "Color gradients" => "examples/color_gradients.md",
                "Footnotes everywhere" => "examples/footnotes.md",
            ],
        ],
        "Resources" => [
            "Why StyledTables?" => "resources/why.md",
            # "Limitations" => "resources/limitations.md",
            "Export" => "resources/export.md",
            "API" => "resources/api.md",
        ],
    ],
    warnonly=true,
)

DocumenterVitepress.deploydocs(;
    repo="github.com/simonsteiger/StyledTables.jl",
    target=joinpath(@__DIR__, "build"),
    devbranch="main",
    push_preview=true,
)
