# Table Structure

These functions control the high-level layout: grouped column headers, a stub
(row label) column, and grouped row sections.

---

## `tab_spanner`

Add a spanning header above a group of columns.

**Signature:** `tab_spanner(label; columns::Vector{Symbol})`

```@example structure
using StyledTables, DataFrames

df = DataFrame(
    drug     = ["Aspirin", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 200, 250],
    efficacy = [0.72, 0.81, 0.78],
    safety   = [0.91, 0.84, 0.88],
)

df |> StyledTable |>
    tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |>
    cols_label(
        drug     = "Drug",
        dose_mg  = "Dose (mg)",
        efficacy = "Efficacy",
        safety   = "Safety",
    ) |>
    fmt_percent([:efficacy, :safety]; digits = 1) |> render
```

Multiple spanners can be chained:

```@example structure
df |> StyledTable |>
    tab_spanner("Dosing"; columns = [:dose_mg]) |>
    tab_spanner("Outcomes"; columns = [:efficacy, :safety]) |> render
```

```@docs
StyledTables.tab_spanner
```

---

## `tab_stub`

Designate one column as the **stub** — a row-label column rendered with special
formatting (no bold header by default, distinct from data columns).

**Signature:** `tab_stub(col::Symbol)`

```@example structure
df |> StyledTable |>
    tab_stub(:drug) |>
    cols_label(dose_mg = "Dose (mg)", efficacy = "Efficacy", safety = "Safety") |> render
```

```@docs
StyledTables.tab_stub
```

---

## `tab_stubhead`

Set a label for the stub column header. Only takes effect when `tab_stub` has
been applied.

**Signature:** `tab_stubhead(label)`

```@example structure
df |> StyledTable |>
    tab_stub(:drug) |>
    tab_stubhead("Drug Name") |> render
```

```@docs
StyledTables.tab_stubhead
```

---

## `tab_row_group`

Group rows by the values of a column. A bold group-label row is inserted before
each new group value. Data rows are indented.

**Signature:** `tab_row_group(col::Symbol; indent_pt = 12)`

```@example structure
df = DataFrame(
    category = ["Analgesic", "Analgesic", "NSAID", "NSAID"],
    drug     = ["Aspirin", "Paracetamol", "Ibuprofen", "Naproxen"],
    dose_mg  = [100, 500, 200, 250],
)

df |> StyledTable |>
    tab_row_group(:category) |>
    cols_hide(:category) |>
    cols_label(drug = "Drug", dose_mg = "Dose (mg)") |> render
```

Increase indentation:

```@example structure
df |> StyledTable |>
    tab_row_group(:category; indent_pt = 20) |>
    cols_hide(:category) |> render
```

```@docs
StyledTables.tab_row_group
```
