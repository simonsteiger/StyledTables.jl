# Table Structure

These functions control the high-level layout: grouped column headers, a stub
(row label) column, and grouped row sections.

---

## `tab_spanner!`

Add a spanning header above a group of columns.

**Signature:** `tab_spanner!(tbl, (label => colgroup)::Pair...)`

```@example structure
using StyledTables, DataFrames

df = DataFrame(
    drug     = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
    safety   = [0.91, 0.84, 0.88],
)

tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes" => [:efficacy, :safety])
cols_label!(tbl,
    :drug     => "Drug",
    :dose_mg  => "Dose (mg)",
    :efficacy => "Efficacy",
    :safety   => "Safety",
)
fmt_percent!(tbl, [:efficacy, :safety]; digits = 1)
render(tbl)
```

Multiple spanners can be added at once:

```@example structure
tbl = StyledTable(df)
tab_spanner!(tbl, "Dosing" => [:dose_mg], "Outcomes" => [:efficacy, :safety])
render(tbl)
```

```@docs
StyledTables.tab_spanner!(tbl::StyledTable, args::Pair...)
```

```@docs
StyledTables.tab_spanner!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{T, Vector{T}}}, AbstractVector{<:Pair{Symbol, Vector{Symbol}}}, AbstractVector{<:Pair{Symbol, Vector{T}}}, AbstractVector{<:Pair{T, Vector{Symbol}}}, AbstractDict{Symbol, Vector{Symbol}}, AbstractDict{T, Vector{T}}, AbstractDict{Symbol, Vector{T}}, AbstractDict{T, Vector{Symbol}}}) where T<:AbstractString
```

---

## `tab_stub!`

Designate one column as the **stub** — a row-label column rendered with special
formatting (no bold header by default, distinct from data columns).

**Signature:** `tab_stub!(tbl, col::Symbol)`

```@example structure
tbl = StyledTable(df)
tab_stub!(tbl, :drug)
cols_label!(tbl, :dose_mg => "Dose (mg)", :efficacy => "Efficacy", :safety => "Safety")
render(tbl)
```

```@docs
StyledTables.tab_stub!
```

---

## `tab_stubhead!`

Set a label for the stub column header. Only takes effect when `tab_stub` has
been applied.

**Signature:** `tab_stubhead!(tbl, label)`

```@example structure
tbl = StyledTable(df)
tab_stub!(tbl, :drug)
tab_stubhead!(tbl, "Drug Name")
render(tbl)
```

```@docs
StyledTables.tab_stubhead!
```

---

## `tab_row_group!`

Group rows by the values of a column. A bold group-label row is inserted before
each new group value. Data rows are indented.

**Signature:** `tab_row_group!(tbl, col::Symbol; indent_pt = 12)`

```@example structure
df = DataFrame(
    category = ["Analgesic", "Analgesic", "NSAID", "NSAID"],
    drug     = ["Aspirin", "Paracetamol", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 500, 200, 250],
)

tbl = StyledTable(df)
tab_row_group!(tbl, :category)
cols_hide!(tbl, :category)
cols_label!(tbl, :drug => "Drug", :dose_mg => "Dose (mg)")
render(tbl)
```

Increase indentation:

```@example structure
tbl = StyledTable(df)
tab_row_group!(tbl, :category; indent_pt = 20)
cols_hide!(tbl, :category)
render(tbl)
```

```@docs
StyledTables.tab_row_group!
```
