# Multi-tier spanners

The following example shows how you can create layouts with several tiers of column spanners.

We will use the [`PalmerPenguins`](https://allisonhorst.github.io/palmerpenguins/) data.

```@example penguins
using DataFrames, Chain, StyledTables
using Statistics: mean

df = DataFrame(StyledTables.penguins())

describe(df)
```

Our goal is to summarise the data by island, species, and sex. 

```@example penguins
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
    sort(_, :island)
end
```

The table we want to create will feature island as the row group, and the species present on each island are listed in each group.
As some of the length measurements we summarised describe the bill, we will group these as a column spanner.
Finally, a higher-order column spanner will indicate which measurements are from female and which from male penguins.

## Step 1: Row groups

We begin by setting row groups and hiding the grouping column:

```@example penguins
tbl = StyledTable(summary)
rowgroup!(tbl, :island)
hide!(tbl, :island)
render(tbl)
```

## Step 2: Level one spanner

Next, we add the level one spanner, grouping all columns with bill measures together:

```@example penguins
spanner!(tbl, "male_" .* string.(bill_cols) => "Bill measures")
spanner!(tbl, "female_" .* string.(bill_cols) => "Bill measures")
render(tbl)
```

## Step 3: Level two spanner

On top of the level one spanner, we'll add a spanner grouping columns of males and females together:

```@example penguins
spanner!(tbl, male_ordered => "Male"; level = 2)
spanner!(tbl, female_ordered => "Female"; level = 2)
render(tbl)
```

## Step 4: Add column labels

Now we can simplify the names of the columns because the information about bill measures and sex is contained in our column spanners:

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

relabel!(tbl, label_dict)
format!(tbl, IntegerFormatter([male_ordered..., female_ordered...]))
render(tbl)
```
