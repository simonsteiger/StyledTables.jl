# Formatting

Formatters convert raw cell values into display strings **before** styling is applied.
They leave the underlying `DataFrame` unchanged — they only affect the rendered output.

## `format!`

The entry point for all formatting. Pass the table and one or more formatters;
each formatter carries its own target column(s).

```@docs
StyledTables.format!
```

## Built-in formatters

### `AbstractFormatter`

```@docs
StyledTables.AbstractFormatter
```

### `NumberFormatter`

```@example formatting
using StyledTables, DataFrames

df = DataFrame(x = [1.2345, 6.789], y = [100.0, 0.001])

tbl = StyledTable(df)
format!(tbl, NumberFormatter(:x; digits = 3), NumberFormatter(:y; digits = 2))
render(tbl)
```

```@docs
StyledTables.NumberFormatter
```

### `PercentFormatter`

```@example formatting
df = DataFrame(rate = [0.123, 0.456, 0.789])

tbl = StyledTable(df)
format!(tbl, PercentFormatter(:rate; digits = 1))
render(tbl)
```

For already-scaled values (e.g., 12.3 stored as 12.3%):

```@example formatting
df2 = DataFrame(rate = [12.3, 45.6, 78.9])

tbl = StyledTable(df2)
format!(tbl, PercentFormatter(:rate; digits = 1, scale = 1))
render(tbl)
```

```@docs
StyledTables.PercentFormatter
```

### `IntegerFormatter`

```@example formatting
df = DataFrame(count = [12.6, 7.2, 100.9])

tbl = StyledTable(df)
format!(tbl, IntegerFormatter(:count))
render(tbl)
```

```@docs
StyledTables.IntegerFormatter
```

### `MissingFormatter`

Stack `MissingFormatter` last so that earlier numeric formatters run first on non-missing values.

```@docs
StyledTables.MissingFormatter
```

### Bare callables and `do`-blocks

Pass a bare `Function` to `format!` — it is wrapped internally and applied like any other formatter. Useful for one-off logic that doesn't need a reusable formatter type:

```@example formatting
df = DataFrame(p_value = [0.032, 0.001, 0.245])

tbl = StyledTable(df)
format!(tbl, :p_value) do pval
    pval < 0.05 ? "< 0.05" : "n.s."
end
render(tbl)
```

## Stacking formatters

Each `format!` call appends to the formatter stack for a column. Formatters run in call order at render time. Each formatter in the stack receives the output of the previous one, not the original raw value. Formatters targeting different columns can be combined in a single call — use this to combine a numeric formatter with a fallback for missing values:

```@example formatting
df = DataFrame(x = [1.5, missing, 3.0])

tbl = StyledTable(df)
format!(tbl, NumberFormatter(:x; digits = 1), MissingFormatter(:x, "—"))
render(tbl)
```

## Custom formatters

Implement `AbstractFormatter` to define reusable custom formatters. Every subtype needs a `syms::Vector{Symbol}` field naming its target column(s):

```julia
struct PrefixFormatter <: AbstractFormatter
    syms::Vector{Symbol}
    prefix::String
end
(f::PrefixFormatter)(x) = ismissing(x) ? x : f.prefix * string(x)
```

Then use it like any built-in formatter:

```julia
format!(tbl, PrefixFormatter([:price], "€"))
```
