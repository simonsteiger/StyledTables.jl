# Column Modifiers

These functions control column display names, alignment, visibility, and order.

---

## `cols_label`

Rename one or more columns for display. Column names in the underlying
`DataFrame` are not changed.

**Signature:** `cols_label(; kwargs...)`

Each keyword argument maps a column `Symbol` to its display label. Labels can
be plain strings or any value supported by `SummaryTables.Cell`.

```julia
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

df |> StyledTable() |>
    cols_label(bmi = "BMI (kg/m²)", sbp = "Systolic BP (mmHg)") |>
    render()
```

```@docs
StyledTables.cols_label
```

---

## `cols_align`

Set horizontal alignment for one or more columns. Valid values: `:left`,
`:center`, `:right`.

**Signatures:**
- `cols_align(halign, columns)` — apply to specific columns
- `cols_align(halign)` — apply to all columns

```julia
df |> StyledTable() |>
    cols_align(:right, [:bmi, :sbp]) |>
    render()
```

Align all columns at once:

```julia
df |> StyledTable() |>
    cols_align(:center) |>
    render()
```

```@docs
StyledTables.cols_align
```

---

## `cols_hide`

Remove columns from the rendered table without dropping them from the data.
Useful when a column is needed for grouping (`tab_row_group`) but should not
appear in the output.

**Signature:** `cols_hide(cols::Symbol...)`

```julia
df = DataFrame(
    group     = ["A", "A", "B", "B"],
    subject   = ["S1", "S2", "S3", "S4"],
    score     = [88, 92, 75, 84],
    pct_score = [0.88, 0.92, 0.75, 0.84],
)

df |> StyledTable() |>
    tab_row_group(:group) |>
    cols_hide(:group) |>
    cols_label(subject = "Subject", score = "Score", pct_score = "Score (%)") |>
    fmt_percent(:pct_score; digits = 0) |>
    render()
```

```@docs
StyledTables.cols_hide
```

---

## `cols_move`

Reorder columns. By default, the specified columns are moved to the front.
Use `after = :col` to insert them after a specific column.

**Signatures:**
- `cols_move(cols)` — move `cols` to the beginning
- `cols_move(cols; after = :anchor_col)` — move `cols` after `:anchor_col`

```julia
df = DataFrame(id = 1:3, name = ["A","B","C"], value = [10, 20, 30])

# Move :name to front
df |> StyledTable() |>
    cols_move([:name]) |>
    render()

# Move :value after :name
df |> StyledTable() |>
    cols_move([:value]; after = :name) |>
    render()
```

```@docs
StyledTables.cols_move
```
