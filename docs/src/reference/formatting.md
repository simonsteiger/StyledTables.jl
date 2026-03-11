# Formatting

Formatter functions convert raw cell values to display strings **before** styling
is applied. They are column-scoped: each formatter is associated with one or more
columns.

> `fmt_*` functions do not change the underlying `DataFrame` — they only affect
> how values look in the rendered output.

---

## `fmt_number`

Format to a fixed number of decimal places.

**Signature:** `fmt_number(cols; digits=2, trailing_zeros=true)`

```julia
using StyledTables, DataFrames

df = DataFrame(x = [1.2345, 6.789], y = [100.0, 0.001])

df |> StyledTable() |>
    fmt_number(:x; digits = 3) |>
    fmt_number(:y; digits = 2) |>
    render()
```

```@docs
StyledTables.fmt_number
```

---

## `fmt_percent`

Multiply by `scale` (default `100`) and append `suffix` (default `"%"`).

**Signature:** `fmt_percent(cols; digits=1, scale=100, suffix="%")`

```julia
df = DataFrame(rate = [0.123, 0.456, 0.789])

df |> StyledTable() |>
    fmt_percent(:rate; digits = 1) |>
    render()
```

Already-scaled values (e.g., stored as 12.3 meaning 12.3%):

```julia
df2 = DataFrame(rate = [12.3, 45.6, 78.9])

df2 |> StyledTable() |>
    fmt_percent(:rate; digits = 1, scale = 1) |>
    render()
```

```@docs
StyledTables.fmt_percent
```

---

## `fmt_integer`

Round to the nearest integer and display without a decimal point.

**Signature:** `fmt_integer(cols)`

```julia
df = DataFrame(count = [12.6, 7.2, 100.9])

df |> StyledTable() |>
    fmt_integer(:count) |>
    render()
```

```@docs
StyledTables.fmt_integer
```

---

## `fmt`

Apply a fully custom formatter function.

**Signature:** `fmt(cols, f::Function)`

```julia
df = DataFrame(p_value = [0.032, 0.001, 0.245])

df |> StyledTable() |>
    fmt(:p_value, x -> x < 0.05 ? "$(round(x; digits=3))*" : string(round(x; digits=3))) |>
    render()
```

Apply the same formatter to multiple columns at once:

```julia
df = DataFrame(a = [1.0, 2.0], b = [3.0, 4.0])

df |> StyledTable() |>
    fmt([:a, :b], x -> "$(Int(x)) pts") |>
    render()
```

```@docs
StyledTables.fmt
```
