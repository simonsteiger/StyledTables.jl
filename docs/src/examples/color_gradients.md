# Applying color gradients to columns

Numeric trends in larger tables can quickly become difficult to see.
Adding color to reveal these trends can be one way to make reading complex tables a little easier.

## The data

Clean gradients in real data can be hard to come by.
Excuse the contrived nature of the data below, but I really want to make a rainbow gradient!

```@example gradients
using StyledTables, DataFrames, Colors

df = DataFrame(id=1:8, score=rand(8))
```

So far so boring.

The gradient we'll be applying is the following:

```@example gradients
colors = range(HSV(0,1,1), stop=HSV(-360,1,1), length=nrow(df))
```

## Step 1: Styling function

The function below is more general than what would be required for the specific example here.
In our case, it would be possible to simply use the `id` variable to index into `colors`.

```@example gradients
function apply_gradient(x, xmax; colors)
    color = colors[round(Int, (x / xmax) * length(colors))]
    return (; color)
end
```

## Step 2: Apply styling

```@example gradients
tbl = StyledTable(df)
tab_style!(x -> apply_gradient(x, maximum(df.id); colors), tbl, :id)
render(tbl)
```

## Step 3: Column labels

```@example gradients
cols_label!(tbl, :id => "Student ID", :score => "Score")
render(tbl)
```
