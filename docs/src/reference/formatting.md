# Formatting

Formatters convert raw cell values to display strings **before** styling is applied. Each formatter applies to one or more columns.

`fmt_*` functions leave the underlying `DataFrame` unchanged — they affect only the rendered output.

## `fmt_number!`

Format to a fixed number of decimal places.

**Signature:** `fmt_number!(tbl, cols; digits=2, trailing_zeros=true)`

```@example formatting
using StyledTables, DataFrames

df = DataFrame(x = [1.2345, 6.789], y = [100.0, 0.001])

tbl = StyledTable(df)
fmt_number!(tbl, :x; digits = 3)
fmt_number!(tbl, :y; digits = 2)
render(tbl)
```

```@docs
StyledTables.fmt_number!
```

## `fmt_percent!`

Multiply by `scale` (default `100`) and append `suffix` (default `"%"`).

**Signature:** `fmt_percent!(tbl, cols; digits=1, scale=100, suffix="%")`

```@example formatting
df = DataFrame(rate = [0.123, 0.456, 0.789])

tbl = StyledTable(df)
fmt_percent!(tbl, :rate; digits = 1)
render(tbl)
```

For already-scaled values (e.g., 12.3 stored as 12.3%):

```@example formatting
df2 = DataFrame(rate = [12.3, 45.6, 78.9])

tbl = StyledTable(df2)
fmt_percent!(tbl, :rate; digits = 1, scale = 1)
render(tbl)
```

```@docs
StyledTables.fmt_percent!
```

## `fmt_integer!`

Round to the nearest integer and display without a decimal point.

**Signature:** `fmt_integer!(tbl, cols)`

```@example formatting
df = DataFrame(count = [12.6, 7.2, 100.9])

tbl = StyledTable(df)
fmt_integer!(tbl, :count)
render(tbl)
```

```@docs
StyledTables.fmt_integer!
```

## `fmt!`

Apply a custom formatter function.

**Signature:** `fmt!(f, tbl, cols)`

```@example formatting
df = DataFrame(p_value = [0.032, 0.001, 0.245])

tbl = StyledTable(df)
fmt!(tbl, :p_value) do pval
    pval < 0.05 ? "< 0.05" : "n.s."
end
render(tbl)
```

Apply one formatter to multiple columns:

```@example formatting
df = DataFrame(a = [1.0, 2.0], b = [3.0, 4.0])

tbl = StyledTable(df)
fmt!(tbl, [:a, :b]) do x
    "$(round(Int, x)) pts"
end
render(tbl)
```

```@docs
StyledTables.fmt!
```
