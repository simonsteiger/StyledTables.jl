# Clinical Demographics Table

Demographic summary tables appear in nearly every clinical trial report. 
This example builds one from scratch with two treatment arms, categorical and continuous variables, missing data, and regulatory-style footnotes.

## The data

```@example clinical
using StyledTables, DataFrames, SummaryTables

demo = DataFrame(
    variable = [
        "Sex", "Sex", "Sex",
        "Age (years)", "Age (years)", "Age (years)",
        "Race", "Race", "Race", "Race",
    ],
    category = [
        "Male", "Female", "Unknown",
        "Mean (SD)", "Median", "Range",
        "White", "Black or African American", "Asian", "Other/Unknown",
    ],
    placebo_n = [22, 28, missing, "48.3 (12.1)", "47", "24–72", 36, 8, 3, 3],
    treatment_n = [19, 30, 1, "49.7 (11.8)", "50", "22–74", 32, 9, 5, 4],
)
```

## Step 1: Basic stub table with multiline column labels

Mark `:category` as the stub, group rows by `:variable`, and use `Multiline` for two-line column headers.

```@example clinical
tbl = StyledTable(demo)
tab_stub!(tbl, :category)
tab_rowgroup!(tbl, :variable)
cols_hide!(tbl, :variable)
cols_label!(tbl,
    :placebo_n => Multiline("Placebo (N=50)", "n (%)"),
    :treatment_n => Multiline("Treatment (N=50)", "n (%)"),
)
render(tbl)
```

## Step 2: Add header, stub label, missing handling, and notes

```@example clinical
sub_missing!(tbl, "—")
tab_footnote!(tbl, "Percentages computed on non-missing observations" => [:placebo_n, :treatment_n])
tab_sourcenote!(tbl, "Abbreviations: SD = standard deviation; N = total per arm")
render(tbl)
```

Row groups label the variable category, the stub column names each subgroup, and multiline headers identify each treatment arm and statistic type. The missing Placebo `Unknown` count appears as an em dash.
