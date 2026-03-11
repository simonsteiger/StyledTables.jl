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
demo |> StyledTable |>
    tab_stub(:category) |>
    tab_row_group(:variable) |>
    cols_hide(:variable) |>
    tab_spanner("Placebo (N=50)"; columns = [:placebo_n]) |>
    tab_spanner("Treatment (N=50)"; columns = [:treatment_n]) |>
    cols_label(
        placebo_n   = "n (%)",
        treatment_n = "n (%)",
    ) |> render
```

## Step 2: Add header, stub label, missing handling, and notes

```@example clinical
demo |> StyledTable |>
    tab_header(
        "Baseline Demographic Characteristics";
        subtitle = "Safety Analysis Population",
    ) |>
    tab_stub(:category) |>
    tab_stubhead("Characteristic") |>
    tab_row_group(:variable) |>
    cols_hide(:variable) |>
    tab_spanner("Placebo (N=50)"; columns = [:placebo_n]) |>
    tab_spanner("Treatment (N=50)"; columns = [:treatment_n]) |>
    cols_label(
        placebo_n   = "n (%)",
        treatment_n = "n (%)",
    ) |>
    sub_missing(with = "—") |>
    tab_footnote(
        "Percentages computed on non-missing observations";
        columns = [:placebo_n, :treatment_n],
    ) |>
    tab_source_note("Abbreviations: SD = standard deviation; N = total per arm") |> render
```

The final table presents demographic data in the standard clinical format:
row groups label the variable category, the stub column names the subgroup,
and spanner headers identify each treatment arm. The missing `Unknown` count
in the Placebo arm is replaced with an em dash by `sub_missing`.
