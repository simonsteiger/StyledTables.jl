# Clinical Demographics Table

Demographic summary tables appear in nearly every clinical trial report. This
example builds one from scratch: two treatment arms, categorical and continuous
variables, missing data, and regulatory-style footnotes.

## The data

```@example clinical
using StyledTables, DataFrames

demo = DataFrame(
    variable  = [
        "Sex", "Sex", "Sex",
        "Age (years)", "Age (years)", "Age (years)",
        "Race", "Race", "Race", "Race",
    ],
    category  = [
        "Male", "Female", "Unknown",
        "Mean (SD)", "Median", "Range",
        "White", "Black or African American", "Asian", "Other/Unknown",
    ],
    placebo_n   = [22, 28, missing, "48.3 (12.1)", "47", "24–72", 36, 8, 3, 3],
    treatment_n = [19, 30, 1,       "49.7 (11.8)", "50", "22–74", 32, 9, 5, 4],
)
```

## Step 1: Basic stub table with treatment spanners

Designate `:category` as the stub (row-label column), group rows by `:variable`,
and add a spanner over each treatment arm column.

```@example clinical
tbl = StyledTable(demo)
tab_stub!(tbl, :category)
tab_row_group!(tbl, :variable)
cols_hide!(tbl, :variable)
tab_spanner!(tbl, "Placebo (N=50)" => [:placebo_n], "Treatment (N=50)" => [:treatment_n])
cols_label!(tbl, :placebo_n => "n (%)", :treatment_n => "n (%)")
render(tbl)
```

## Step 2: Add header, stub label, missing handling, and notes

```@example clinical
tbl = StyledTable(demo)
tab_header!(tbl,
    "Baseline Demographic Characteristics";
    subtitle = "Safety Analysis Population",
)
tab_stub!(tbl, :category)
tab_stubhead!(tbl, "Characteristic")
tab_row_group!(tbl, :variable)
cols_hide!(tbl, :variable)
tab_spanner!(tbl, "Placebo (N=50)" => [:placebo_n])
tab_spanner!(tbl, "Treatment (N=50)" => [:treatment_n])
cols_label!(tbl, :placebo_n   => "n (%)", :treatment_n => "n (%)")
sub_missing!(tbl, with = "—")
tab_footnote!(tbl,
    "Percentages computed on non-missing observations";
    columns = [:placebo_n, :treatment_n],
)
tab_source_note!(tbl, "Abbreviations: SD = standard deviation; N = total per arm")
render(tbl)
```

The final table presents demographic data in the standard clinical format:
row groups label the variable category, the stub column names the subgroup,
and spanner headers identify each treatment arm. The missing `Unknown` count
in the Placebo arm is replaced with an em dash by `sub_missing`.
