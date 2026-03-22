# Column Modifiers

These functions control column display names, alignment, and visibility.

## `cols_label!`

Rename one or more columns for display. The underlying `DataFrame` is unchanged.

**Signature:** `cols_label!(tbl, (col => label)::Pair...)`

```@example columns
using StyledTables, SummaryTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

tbl = StyledTable(df)
cols_label!(tbl, :bmi => "BMI (kg/m²)", :sbp => "Systolic BP (mmHg)")
render(tbl)
```

Multi-line column headers using `Multiline`:

```@example columns
tbl = StyledTable(df)
cols_label!(tbl,
    :bmi => Multiline("BMI", "(kg/m²)"),
    :sbp => Multiline("Systolic BP", "(mmHg)"),
)
render(tbl)
```

Apply a function uniformly to all column names — useful for `titlecase`, `uppercase`, or any
underscore-replacement rule:

```@example columns
df2 = DataFrame(bmi_score = [22.1, 27.4], sbp_mmhg = [118, 135])

tbl = StyledTable(df2)
cols_label!(col -> titlecase(replace(col, "_" => " ")), tbl)
render(tbl)
```

Restrict to a subset of columns with a `Symbol`, `String` or `Vector`s thereof:

```@example columns
tbl = StyledTable(df2)
cols_label!(tbl, :bmi_score) do col
    titlecase(replace(col, "_" => " "))
end
render(tbl)
```

More complicated transformations can make use of `do` blocks.

```@docs
StyledTables.cols_label!(tbl::StyledTable, args::Pair...)
```

```@docs
StyledTables.cols_label!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}},
    AbstractVector{<:Pair{<:AbstractString, Symbol}}, AbstractDict{Symbol, Symbol},
    AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}})
```

```@docs
StyledTables.cols_label!(f, tbl::StyledTable, columns::AbstractVector{Symbol})
```

---

## `cols_align!`

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

## `cols_hide!`

Remove columns from the rendered table without dropping them from the data.
Use this when a column drives grouping (via `tab_row_group!`) but should not appear.

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
cols_label!(tbl, :subject => "Subject", :score => "Score", :pct_score => "Score (%)")
fmt_percent!(tbl, :pct_score; digits = 0)
render(tbl)
```

```@docs
StyledTables.cols_hide!
```
