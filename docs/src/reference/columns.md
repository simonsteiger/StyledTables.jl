# Column Modifiers

These functions control column display names, alignment, visibility, and order.

---

## `cols_label`

Rename one or more columns for display. Column names in the underlying
`DataFrame` are not changed.

**Signature:** `cols_label!(tbl; kwargs...)`

Each keyword argument maps a column `Symbol` to its display label. Labels can
be plain strings or any value supported by `SummaryTables.Cell`.

```@example columns
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

tbl = StyledTable(df)
cols_label!(tbl, bmi = "BMI (kg/m²)", sbp = "Systolic BP (mmHg)")
render(tbl)
```

```@docs
StyledTables.cols_label!
```

---

## `cols_align`

Set horizontal alignment for one or more columns. Valid values: `:left`,
`:center`, `:right`.

**Signatures:**
- `cols_align!(tbl, halign, columns)` — apply to specific columns
- `cols_align!(tbl, halign)` — apply to all columns

```@example columns
tbl = StyledTable(df)
cols_align!(tbl, :right, [:bmi, :sbp])
render(tbl)
```

Align all columns at once:

```@example columns
tbl = StyledTable(df)
cols_align!(tbl, :center)
render(tbl)
```

```@docs
StyledTables.cols_align!
```

---

## `cols_hide`

Remove columns from the rendered table without dropping them from the data.
Useful when a column is needed for grouping (`tab_row_group`) but should not
appear in the output.

**Signature:** `cols_hide!(tbl, cols::Symbol...)`

```@example columns
df = DataFrame(
    group     = ["A", "A", "B", "B"],
    subject   = ["S1", "S2", "S3", "S4"],
    score     = [88, 92, 75, 84],
    pct_score = [0.88, 0.92, 0.75, 0.84],
)

tbl = StyledTable(df)
tab_row_group!(tbl, :group)
cols_hide!(tbl, :group)
cols_label!(tbl, subject = "Subject", score = "Score", pct_score = "Score (%)")
fmt_percent!(tbl, :pct_score; digits = 0)
render(tbl)
```

```@docs
StyledTables.cols_hide!
```

---

## `cols_move`

Reorder columns. By default, the specified columns are moved to the front.
Use `after = :col` to insert them after a specific column.

**Signatures:**
- `cols_move!(tbl, cols)` — move `cols` to the beginning
- `cols_move!(tbl, cols; after = :anchor_col)` — move `cols` after `:anchor_col`

```@example columns
df = DataFrame(id = 1:3, name = ["A","B","C"], value = [10, 20, 30])

# Move :name to front
tbl = StyledTable(df)
cols_move!(tbl, [:name])
render(tbl)
```

```@example columns
# Move :value after :name
tbl = StyledTable(df)
cols_move!(tbl, [:value]; after = :name)
render(tbl)
```

```@docs
StyledTables.cols_move!
```
