"""
$TYPEDSIGNATURES

Replace `missing` values with a display placeholder.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `r`: replacement display value

# Returns

`tbl` (modified in place).

See also: [`fmt!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
sub_missing!(tbl)
render(tbl)
```
"""
function sub_missing!(tbl::StyledTable, r)
    push!(tbl.postprocessors, SummaryTables.Replace(ismissing, r, true))
    return tbl
end

"""
$TYPEDSIGNATURES

Apply inline styling to all body cells in the specified columns.

Any keyword left as `nothing` is inherited from the cell default.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `columns`: column names to style.

# Keywords

- `color`: color value — hex string (`"#RRGGBB"`), CSS name (`"green"`), symbol (`:green`),
  or a `Colors.Colorant`. `nothing` inherits the default. Alpha channels are silently dropped.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

# Returns

`tbl` (modified in place).

See also: [`fmt!`](@ref), [`cols_align!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, [:pct, :n]; color = "#1a7340", bold = true)
render(tbl)
```
"""
function tab_style!(
    tbl::StyledTable,
    columns::AbstractVector{Symbol};
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    colnames = Symbol.(names(tbl.data))
    for col in columns
        if col ∉ colnames
            throw(ArgumentError("Column :$col not found in DataFrame"))
        end
    end
    for col in columns
        tbl.col_styles[col] =
            ColStyleOverride(_resolve_color(color), bold, italic, underline)
    end

    return tbl
end

"""
$TYPEDSIGNATURES

Apply inline styling to body cells in the listed columns (variadic form).

# Returns

`tbl` (modified in place).

# Keywords

- `color`: color value — hex string (`"#RRGGBB"`), CSS name (`"green"`), symbol (`:green`),
  or a `Colors.Colorant`. `nothing` inherits the default. Alpha channels are silently dropped.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, :pct; color = "#1a7340", bold = true)
render(tbl)
```
"""
function tab_style!(
    tbl::StyledTable,
    columns::Symbol...;
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    tab_style!(tbl, collect(columns); color, bold, italic, underline)
    return tbl
end

"""
$TYPEDSIGNATURES

Apply conditional inline styling to body cells in the listed columns.

`f(x) -> Union{Nothing, NamedTuple}` receives each cell's raw DataFrame value
(before any formatter) and returns either `nothing` (no conditional style) or a `NamedTuple`
with any of `color`, `bold`, `italic`, `underline`.

Optional kwargs set a per-column baseline. The function result overrides any
baseline property whose key is present in the returned `NamedTuple`.

Setting a key to `nothing` explicitly clears the static baseline for that property.

# Returns

`tbl` (modified in place).

# Keywords

- `color`: baseline color — hex string, CSS name, `Symbol`, or `Colors.Colorant`.
- `bold`: `true`/`false`, or `nothing`.
- `italic`: `true`/`false`, or `nothing`.
- `underline`: `true`/`false`, or `nothing`.

# Examples

```julia
tbl = StyledTable(df)
tab_style!(tbl, :change) do val
    val > 0 ? (; color=:green, bold=true) :
    val < 0 ? (; color=:red) :
    nothing
end
render(tbl)
```
"""
function tab_style!(
    f::Function,
    tbl::StyledTable,
    columns::AbstractVector{Symbol};
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    colnames = Symbol.(names(tbl.data))
    for col in columns
        if col ∉ colnames
            throw(ArgumentError("Column :$col not found in DataFrame"))
        end
    end

    for col in columns
        tbl.col_style_fns[col] = f
        if any(!isnothing, (color, bold, italic, underline))
            tbl.col_styles[col] =
                ColStyleOverride(_resolve_color(color), bold, italic, underline)
        end
    end

    return tbl
end

"""
$TYPEDSIGNATURES

Apply conditional inline styling to body cells (variadic / do-block form).

See the vector form for full documentation.
"""
function tab_style!(
    f::Function,
    tbl::StyledTable,
    columns::Symbol...;
    color = nothing,
    bold::Union{Nothing,Bool} = nothing,
    italic::Union{Nothing,Bool} = nothing,
    underline::Union{Nothing,Bool} = nothing,
)
    tab_style!(f, tbl, collect(columns); color, bold, italic, underline)
    return tbl
end
