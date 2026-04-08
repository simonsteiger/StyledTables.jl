# Limitations

## Mixed-type Pairs do not work

The example below will fail because all `Pair`s must be of the same type.

```julia
using StyledTables, DataFrames

df = DataFrame(bmi = [22.1, 27.4, 31.0], sbp = [118, 135, 142])

tbl = StyledTable(df)
cols_label!(tbl, :bmi => Multiline("BMI", "(kg/m²)"), :sbp => "Systolic BP")
```

The same applies when working with a `Vector{Pair}` or a `Dict`: passing `Dict{Symbol, Any}` will error.

This limitation applies to all functions that allow you to pass `Pair`s, a `Vector{Pair}` or a `Dict`.

---

## Unsorted row-group data produces duplicate group headers

[`tab_rowgroup!`](@ref) inserts a bold group label whenever the grouping column value
*changes*. If the `DataFrame` is not sorted by the grouping column, the same label can appear
multiple times. A warning is emitted at `render()` time, but the table still renders with
the duplicate headers.

**Workaround:** sort the `DataFrame` by the grouping column before constructing the
`StyledTable`:

```julia
sort!(df, :group_col)
tbl = StyledTable(df)
tab_rowgroup!(tbl, :group_col)
```

---

## `tab_style!` conditional functions receive raw values, not formatted strings

When both `fmt_number!` and `tab_style!(f, ...)` are applied to the same column, the
function `f` receives the raw `DataFrame` value (e.g. `0.042`), **not** the formatted
string (`"0.04"`). This is intentional — styling operates on the original value so that
numeric comparisons remain meaningful — but it surprises users who write:

```julia
# Wrong: val is 0.042, not "0.04"
tab_style!(tbl, :pvalue) do val
    val == "< 0.05" ? (; color = :red) : nothing
end
```

**Workaround:** compare against the raw numeric value:

```julia
tab_style!(tbl, :pvalue) do val
    !ismissing(val) && val < 0.05 ? (; color = :red) : nothing
end
```

---

## Repeated calls to `tab_rowgroup!` or `tab_header!` replace the previous setting

Both functions write to a single field (`tbl.rowgroup_col` or `tbl.header`). Only the last
call takes effect. This is consistent with the mutating API convention, but differs from
[`tab_spanner!`](@ref), which *appends* each spanner.

No warning is emitted. If you call `tab_header!` twice, the first title is silently replaced.
