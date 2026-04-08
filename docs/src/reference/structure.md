# Table Structure

These functions control high-level layout: column spanners, the stub (row-label) column, and row groups.

## `tab_spanner!`

Add a spanning header above a group of columns.

**Signatures:**
```julia
tab_spanner!(tbl, (label => colgroup)::Pair...)
tab_spanner!(tbl, d::AbstractDict)
tab_spanner!(tbl, d::AbstractVector{<:Pair})
```

```@example structure
using StyledTables, SummaryTables, DataFrames

df = DataFrame(
    drug = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
    safety = [0.91, 0.84, 0.88],
)

tbl = StyledTable(df)
tab_spanner!(tbl, "Outcomes" => [:efficacy, :safety])
cols_label!(tbl,
    :drug => "Drug",
    :dose_mg => "Dose (mg)",
    :efficacy => "Efficacy",
    :safety => "Safety",
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

Multi-line spanner header using `Multiline`:

```@example structure
tbl = StyledTable(df)
tab_spanner!(tbl, Multiline("Outcomes", "(primary)") => [:efficacy, :safety])
render(tbl)
```

```@docs
StyledTables.tab_spanner!(tbl::StyledTable, args::Pair...)
```

```@docs
StyledTables.tab_spanner!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}},
    AbstractVector{<:Pair{<:AbstractString, Symbol}}, AbstractDict{Symbol, Symbol},
    AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}})
```

```@docs
StyledTables.tab_spanner!(f, tbl::StyledTable, columns::AbstractVector{Symbol})
```

---

## `tab_stub!`

Mark one column as the **stub**: a row-label column rendered apart from data columns. By default the stub header is not bolded; it gains a bold label if `tab_stubhead!` is called.

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

Label the stub column header. Has no effect without a prior call to `tab_stub!`.

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

Group rows by distinct values in a column. A bold group-label row precedes each new group. Data rows are indented.

**Signature:** `tab_row_group!(tbl, col::Symbol; indent_pt = 12)`

```@example structure
df = DataFrame(
    category = ["Analgesic", "Analgesic", "NSAID", "NSAID"],
    drug = ["Aspirin", "Paracetamol", "Ibuprofen", "Naproxen"],
    dose_mg = [100, 500, 200, 250],
)

tbl = StyledTable(df)
tab_row_group!(tbl, :category)
cols_hide!(tbl, :category)
cols_label!(tbl, :drug => "Drug", :dose_mg => "Dose (mg)")
render(tbl)
```

To increase indentation:

```@example structure
tbl = StyledTable(df)
tab_row_group!(tbl, :category; indent_pt = 20)
cols_hide!(tbl, :category)
render(tbl)
```

```@docs
StyledTables.tab_row_group!
```
