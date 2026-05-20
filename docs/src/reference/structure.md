# Table Structure

These functions control high-level layout: column spanners, the stub (row-label) column, and row groups.

## `spanner!`

Add a spanning header above a group of columns.

**Signatures:**
```julia
spanner!(tbl, (colgroup => label)::Pair...)
spanner!(tbl, d::AbstractDict)
spanner!(tbl, d::AbstractVector{<:Pair})
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
spanner!(tbl, [:efficacy, :safety] => "Outcomes")
relabel!(tbl,
    :drug => "Drug",
    :dose_mg => "Dose (mg)",
    :efficacy => "Efficacy",
    :safety => "Safety",
)
format!(PercentFormatter(digits = 1), tbl, [:efficacy, :safety])
render(tbl)
```

Multiple spanners can be added at once:

```@example structure
tbl = StyledTable(df)
spanner!(tbl, [:dose_mg] => "Dosing", [:efficacy, :safety] => "Outcomes")
render(tbl)
```

Multi-line spanner header using `Multiline`:

```@example structure
tbl = StyledTable(df)
spanner!(tbl, [:efficacy, :safety] => Multiline("Outcomes", "(primary)"))
render(tbl)
```

```@docs
StyledTables.spanner!(tbl::StyledTable, args::Pair...)
```

```@docs
StyledTables.spanner!(tbl::StyledTable, d::Union{AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}},
    AbstractVector{<:Pair{Symbol, <:AbstractString}}, AbstractDict{Symbol, Symbol},
    AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{Symbol, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}})
```

## `stub!`

Mark one column as the **stub**: a row-label column rendered apart from data columns. By default the stub header is not bolded; it gains a bold label if `stubhead!` is called.

**Signature:** `stub!(tbl, col::Symbol)`

```@example structure
tbl = StyledTable(df)
stub!(tbl, :drug)
relabel!(tbl, :dose_mg => "Dose (mg)", :efficacy => "Efficacy", :safety => "Safety")
render(tbl)
```

```@docs
StyledTables.stub!
```

## `stubhead!`

Label the stub column header. Has no effect without a prior call to `stub!`.

**Signature:** `stubhead!(tbl, label)`

```@example structure
tbl = StyledTable(df)
stub!(tbl, :drug)
stubhead!(tbl, "Drug Name")
render(tbl)
```

```@docs
StyledTables.stubhead!
```

## `rowgroup!`

Group rows by distinct values in a column. A bold group-label row precedes each new group. Data rows are indented.

**Signature:** `rowgroup!(tbl, col::Symbol; indent_pt = 12)`

```@example structure
df = DataFrame(
    category = ["Analgesic", "Analgesic", "NSAID", "NSAID"],
    drug = ["Aspirin", "Paracetamol", "Ibuprofen", "Naproxen"],
    dose_mg = [100, 500, 200, 250],
)

tbl = StyledTable(df)
rowgroup!(tbl, :category)
hide!(tbl, :category)
relabel!(tbl, :drug => "Drug", :dose_mg => "Dose (mg)")
render(tbl)
```

To increase indentation:

```@example structure
tbl = StyledTable(df)
rowgroup!(tbl, :category; indent_pt = 20)
hide!(tbl, :category)
render(tbl)
```

```@docs
StyledTables.rowgroup!
```
