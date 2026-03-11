# Styling & Options

---

## `tab_style`

Apply inline styling (color, bold, italic, underline) to all body cells in
specified columns. Colors are hex strings (`"#RRGGBB"`).

**Signature:**
```julia
tab_style(columns; color=nothing, bold=nothing, italic=nothing, underline=nothing)
```

```@example styling
using StyledTables, DataFrames

df = DataFrame(
    metric  = ["Revenue", "EBITDA", "Net Income"],
    q1      = [1.2, 0.3, 0.18],
    q2      = [1.4, 0.35, 0.21],
    yoy_pct = [0.12, 0.08, 0.14],
)

df |> StyledTable |>
    tab_header("Q2 2026 Financial Summary") |>
    tab_style([:yoy_pct]; color = "#1a7340", bold = true) |>
    fmt_percent(:yoy_pct; digits = 1) |>
    cols_label(
        metric  = "Metric",
        q1      = "Q1 (€B)",
        q2      = "Q2 (€B)",
        yoy_pct = "YoY Change",
    ) |> render
```

```@docs
StyledTables.tab_style
```

---

## `sub_missing`

Replace `missing` values with a placeholder string for display. Defaults to
`"—"` (em dash).

**Signature:** `sub_missing(; with = "—")`

```@example styling
df = DataFrame(
    group = ["A", "A", "B", "B"],
    value = [1.2, missing, 3.4, missing],
)

df |> StyledTable |>
    sub_missing() |> render
```

Custom placeholder:

```@example styling
df |> StyledTable |>
    sub_missing(with = "N/A") |> render
```

```@docs
StyledTables.sub_missing
```

---

## `tab_options`

Set global rounding options for all numeric cells in the table.

**Signature:**
```julia
tab_options(; round_digits=nothing, round_mode=nothing, trailing_zeros=nothing)
```

- `round_digits` — number of decimal places or significant digits
- `round_mode` — `:auto`, `:digits`, or `:sigdigits`
- `trailing_zeros` — if `true`, pad with zeros to `round_digits` places

```@example styling
df = DataFrame(a = [1.23456, 7.891], b = [100.0, 200.0])

# Round to 2 significant digits
df |> StyledTable |>
    tab_options(round_digits = 2, round_mode = :sigdigits) |> render
```

```@example styling
# Fixed 3 decimal places with trailing zeros
df |> StyledTable |>
    tab_options(round_digits = 3, round_mode = :digits, trailing_zeros = true) |> render
```

```@docs
StyledTables.tab_options
```
