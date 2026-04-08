# Styling and Options

## `tab_style!`

Apply inline styling to body cells in the specified columns. Colors are hex strings (`"#RRGGBB"`).

**Signatures:**
```julia
tab_style!(tbl, columns::Symbol...; color=nothing, bold=nothing, italic=nothing, underline=nothing)
tab_style!(tbl, columns::AbstractVector{Symbol}; color=nothing, bold=nothing, italic=nothing, underline=nothing)
```

```@example styling
using StyledTables, DataFrames

df = DataFrame(
    metric = ["Revenue", "EBITDA", "Net Income"],
    q1 = [1.2, 0.3, 0.18],
    q2 = [1.4, 0.35, 0.21],
    yoy_pct = [0.12, 0.08, 0.14],
)

tbl = StyledTable(df)
tab_header!(tbl, "Q2 2026 Financial Summary")
tab_style!(tbl, :yoy_pct; color = "#1a7340", bold = true)
fmt_percent!(tbl, :yoy_pct; digits = 1)
cols_label!(tbl,
    :metric => "Metric",
    :q1 => "Q1 (€B)",
    :q2 => "Q2 (€B)",
    :yoy_pct => "YoY Change",
)
render(tbl)
```

```@docs
StyledTables.tab_style!(::StyledTables.StyledTable, ::Symbol...)
```

```@docs
StyledTables.tab_style!(::StyledTables.StyledTable, ::AbstractVector{Symbol})
```

### Conditional styling

Pass a function as the first argument to style cells based on their raw DataFrame value (before any formatter is applied).

`f(raw_value) -> Union{Nothing, NamedTuple}` — return `nothing` for no style override, or a `NamedTuple` with any subset of `color`, `bold`, `italic`, `underline` keys.
The `color` key accepts the same types as the `color` keyword in [`tab_style!`](@ref): a hex string (`"#RRGGBB"`), a CSS name (`"green"`), a `Symbol` (`:green`), or a `Colors.Colorant`.

Optional keyword arguments set a static per-column *baseline*. The function result
**overrides** any baseline key that appears in the returned `NamedTuple`; keys absent
from the `NamedTuple` inherit the baseline.

**Signatures:**
```julia
tab_style!(f, tbl, columns::Symbol...; color=nothing, bold=nothing, italic=nothing, underline=nothing)
tab_style!(f, tbl, columns::AbstractVector{Symbol}; color=nothing, bold=nothing, italic=nothing, underline=nothing)
```

```@example styling
df_cond = DataFrame(
    metric = ["Revenue", "EBITDA", "Net Income"],
    change = [0.12, -0.03, 0.07],
)

tbl = StyledTable(df_cond)
tab_style!(tbl, :change) do val
    val > 0 ? (; color = :green, bold = true) :
    val < 0 ? (; color = :red) :
    nothing
end
cols_label!(tbl, :metric => "Metric", :change => "YoY Change")
fmt_percent!(tbl, :change; digits = 1)
render(tbl)
```

A static baseline can be combined with a function override. Here every cell in `:change`
is italic by default, but positive values are also bolded:

```@example styling
tbl = StyledTable(df_cond)
tab_style!(tbl, :change; italic = true) do val
    val > 0 ? (; bold = true) : nothing
end
cols_label!(tbl, :metric => "Metric", :change => "YoY Change")
fmt_percent!(tbl, :change; digits = 1)
render(tbl)
```

```@docs
StyledTables.tab_style!(::Any, ::StyledTables.StyledTable, ::Symbol...)
```

```@docs
StyledTables.tab_style!(::Any, ::StyledTables.StyledTable, ::AbstractVector{Symbol})
```

## `sub_missing!`

Replace `missing` values with a placeholder string for display. Defaults to
`"—"` (em dash).

**Signature:** `sub_missing!(tbl; with = "—")`

```@example styling
df = DataFrame(
    group = ["A", "A", "B", "B"],
    value = [1.2, missing, 3.4, missing],
)

tbl = StyledTable(df)
sub_missing!(tbl)
render(tbl)
```

To use a custom placeholder:

```@example styling
tbl = StyledTable(df)
sub_missing!(tbl, with = "N/A")
render(tbl)
```

```@docs
StyledTables.sub_missing!
```
