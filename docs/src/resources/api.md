# API

Complete API reference for StyledTables.jl. All exported symbols are listed
below, grouped by kind.

```@autodocs
Modules = [StyledTables]
Private = false
Order = [:type, :function]
```

## Conventions

StyledTables.jl uses two conventions for specifying columns with `=>` pairs, each reflecting a different kind of operation.

**`cols_*` functions: column → value**

Column modifier functions take the column as subject. Target a column and assign a property to it:

```julia
cols_label!(tbl, :bmi => "BMI (kg/m²)")
```

This mirrors the `old => new` convention of `DataFrames.rename!`: what's being modified comes first.

**`tab_*` functions: annotation → columns**

Table-level annotation functions take the annotation as subject. Define an annotation and specify which columns it covers:

```julia
tab_spanner!(tbl, "Demographics" => [:age, :sex])
tab_footnote!(tbl, "PPP adjusted" => [:gdp, :gni])
```

The annotation comes first because it is the entity being created; the columns define its scope (and apart from that, it is also a whole lot more readable!).

In short, `cols_*` functions put the column first; `tab_*` functions put the label or annotation first.
