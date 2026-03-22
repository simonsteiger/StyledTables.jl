# Multi-tier spanners

The following example shows how layouts with several tiers of column spanners can be achieved.

## The data

We will use the [`PalmerPenguins`](https://github.com/devmotion/PalmerPenguins.jl) data.

```@example penguins
using DataFrames, PalmerPenguins

df = DataFrame(PalmerPenguins.load())

describe(df)
```

Our goal is to summarise the data by island, species, and sex. 

```@example penguins
using Chain
using Statistics: mean

bill_cols = [:bill_length_mm, :bill_depth_mm]
number_cols = [string.(bill_cols)..., "flipper_length_mm"] # , "body_mass_g"
male_ordered = ["male_" * colname for colname in number_cols]
female_ordered = ["female_" * colname for colname in number_cols]

summary = @chain df begin
    select(_, :island, :species, :sex, number_cols...)
    dropmissing(_)
    groupby(_, [:island, :species, :sex])
    combine(_, Cols(r"_mm$|_g$") .=> mean => identity)
    stack(_, number_cols)
    transform(_, [:sex, :variable] => ByRow((s, v) -> join([s, v], "_")) => :sex_variable)
    select(_, Not(:sex, :variable))
    unstack(_, :sex_variable, :value)
    transform(_, :island => ByRow(x -> "$x Is.") => identity)
    select(_, :island, :species, male_ordered..., female_ordered...)
end
```

The table we want to create will feature island as the row group, and the species present on each island are listed in each group.
As some of the length measurements we summarised describe the bill, we will group these as a column spanner.
Finally, a higher-order column spanner will indicate which measurements are from female and which from male penguins.

## Step 1: Row groups

```@example penguins
using StyledTables

tbl = StyledTable(summary)
tab_row_group!(tbl, :island)
cols_hide!(tbl, :island)
render(tbl)
```

## Step 2: Level one spanner

```@example penguins
tab_spanner!(tbl, "Bill measures" => "male_" .* string.(bill_cols))
tab_spanner!(tbl, "Bill measures" => "female_" .* string.(bill_cols))
render(tbl)
```

## Step 3: Level two spanner

```@example penguins
tab_spanner!(tbl, "Male" => male_ordered, level=2)
tab_spanner!(tbl, "Female" => female_ordered, level=2)
render(tbl)
```

## Step 4: Add column labels

```@example penguins
label_dict = Dict(
    :species => "Species",
    :male_bill_length_mm => "Length",
    :male_bill_depth_mm => "Depth",
    :male_flipper_length_mm => "Flipper length",
    :female_bill_length_mm => "Length",
    :female_bill_depth_mm => "Depth",
    :female_flipper_length_mm => "Flipper length",
)

cols_label!(tbl, label_dict)
fmt_integer!(tbl, [male_ordered..., female_ordered...])
render(tbl)
```
