# Quarterly Financial Report Table

This example builds a regional quarterly revenue table with consistent number formatting, a highlighted totals column, and annotated footnotes.

## The data

```@example report
using StyledTables, DataFrames

report = DataFrame(
    region = ["North America", "Europe", "Asia-Pacific", "Latin America", "Total"],
    q1     = [4.21, 2.83, 1.94, 0.72, 9.70],
    q2     = [4.55, 3.02, 2.10, 0.81, 10.48],
    q3     = [4.38, 2.91, 2.22, 0.79, 10.30],
    q4     = [5.12, 3.45, 2.67, 0.94, 12.18],
    total  = [18.26, 12.21, 8.93, 3.26, 42.66],
)
```

## Step 1: Headers, spanner, alignment, and formatting

Group quarterly columns under a spanner, right-align numeric columns, and format every number to two decimal places.

```@example report
label_dict = Dict(
    :region => "Region",
    :q1 => "Q1",
    :q2 => "Q2",
    :q3 => "Q3",
    :q4 => "Q4",
    :total => "Full Year"
)

tbl = StyledTable(report)
tab_header!(tbl, "Annual Revenue by Region"; subtitle = "Figures in USD billions")
cols_label!(tbl, label_dict)
tab_spanner!(tbl, "Quarterly" => [:q1, :q2, :q3, :q4])
cols_align!(tbl, :right, [:q1, :q2, :q3, :q4, :total])
fmt_number!(tbl, [:q1, :q2, :q3, :q4, :total]; digits = 2)
render(tbl)
```

## Step 2: Highlight the totals column and annotate Q4

Bold the "Full Year" column, flag Q4 figures as preliminary, and credit the data source.

```@example report
tab_style!(tbl, :total; bold = true)
tab_footnote!(tbl, "Preliminary figures, subject to audit" => [:q4])
tab_source_note!(tbl, "Source: Internal Finance, March 2026")
render(tbl)
```

The bolded "Full Year" column draws the eye to the aggregate. An auto-numbered superscript on Q4 flags preliminary figures; the source note credits the data origin.
