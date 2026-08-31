# Clinical Demographics Table

This example creates a clinical demographics table.

Styling elements used in this example are:

- Stubs
- Rowgroups
- Hidden columns
- Column labels
- Formatting missing values
- Footnotes
- Source notes

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

We first mark the `category` column as the stub, then group rows by `variable`.
We also use `Multiline` for two-line column headers.

```@example clinical
tbl = StyledTable(demo)
stub!(tbl, :category)
rowgroup!(tbl, :variable)
hide!(tbl, :variable)
relabel!(tbl,
    :placebo_n => Multiline("Placebo (N=50)", "n (%)"),
    :treatment_n => Multiline("Treatment (N=50)", "n (%)"),
)
render(tbl)
```

## Step 2: Add header, stub label, missing handling, and notes

Now we handle missing values by replacing them with a dash, and finally add a footnote and a source note.

```@example clinical
format!(tbl, MissingFormatter([:placebo_n, :treatment_n], "—"))
footnote!(tbl, [:placebo_n, :treatment_n] => "Percentages computed on non-missing observations")
sourcenote!(tbl, "Abbreviations: SD = standard deviation; N = total per arm")
render(tbl)
```
