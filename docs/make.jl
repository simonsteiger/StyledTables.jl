using Documenter
using DocumenterVitepress
using StyledTables
using DataFrames

makedocs(;
    sitename = "StyledTables.jl",
    authors = "Simon Steiger",
    modules = [StyledTables],
    format = DocumenterVitepress.MarkdownVitepress(
        repo = "github.com/simonsteiger/StyledTables.jl",
        build_vitepress = false,
    ),
    pages = [
        "Home" => "index.md",
        "Getting Started" => "getting_started.md",
        "Reference" => [
            "Column Modifiers" => "reference/columns.md",
            "Table Structure" => "reference/structure.md",
            "Annotations" => "reference/annotations.md",
            "Styling & Options" => "reference/styling.md",
            "Formatting" => "reference/formatting.md",
            "Rendering" => "reference/rendering.md",
        ],
        "Examples" => [
            "Overview" => "examples/index.md",
            "Sports Cars Table" => "examples/cars.md",
            "Clinical Demographics" => "examples/clinical.md",
            "Quarterly Report" => "examples/report.md",
        ],
        "Resources" => [
            "API" => "resources/api.md",
        ],
    ],
    warnonly = true,
)
