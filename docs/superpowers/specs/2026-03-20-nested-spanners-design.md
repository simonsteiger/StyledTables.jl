# Nested/Stacked Spanners Design

**Date:** 2026-03-20
**Status:** Approved

## Summary

Extend `tab_spanner!` to support multi-level (nested) column spanners. A level-2 spanner
sits above one or more level-1 spanners and/or ungrouped columns, producing multiple spanner
rows in the rendered table header.

## Motivation

Users summarising multi-dimensional datasets — for example PalmerPenguins measurements
grouped by island and species — need to express a two-tier grouping in the header. A parent
spanner (e.g., "Physical measurements") should be able to span both a child spanner (e.g.,
"Length (mm)") and a plain column (e.g., `body_mass`) without any awkward workarounds.

## API

### `tab_spanner!` signature change

Add an optional `level::Int = 1` keyword argument:

```julia
tab_spanner!(tbl, "Length (mm)"; columns = [:bill_len, :bill_depth, :flipper_len])
tab_spanner!(tbl, "Physical measurements"; columns = [:bill_len, :bill_depth, :flipper_len, :body_mass], level = 2)
```

`level = 1` is the default and preserves existing behaviour. Level 1 is the bottom-most
spanner row (closest to the column-label row); level 2 sits above it, and so on.

### Column references always use data column names

The `columns` argument always contains `Symbol`s naming DataFrame columns, regardless of
level. The system infers nesting from column-set containment — no spanner IDs or references
to other spanners are needed.

## Data Model

### `Spanner` struct

Add a `level::Int` field:

```julia
struct Spanner
    label::Any
    columns::Vector{Symbol}
    level::Int   # 1 = bottom-most spanner row
end
```

`StyledTable.spanners` remains `Vector{Spanner}`. No change to the field type.

## Validation (at `render()` time)

Two checks, raised as `ArgumentError` with descriptive messages:

1. **No partial overlaps** — for any two spanners at *different* levels, their column sets
   must be either fully disjoint or one must be a strict subset of the other. Partial overlaps
   (e.g., level-1 covers `[:a, :b, :c]` while level-2 covers `[:b, :c, :d]`) are invalid.

2. **Contiguous levels** — if the highest level in use is N, every integer 1…N must have at
   least one spanner. Gaps (e.g., level 1 and level 3 present but level 2 absent) are invalid.

Both checks run once at the start of `render()`, before any cell is built.

## Rendering

Replace `_build_spanner_row` (returns one `Vector{Cell}`) with `_build_spanner_rows`
(returns `Vector{Vector{Cell}}`, one entry per level, ordered level 1 first):

- Iterate levels 1…N.
- At each level, assign `Cell(label; bold = true, merge = true, mergegroup = idx)` to
  columns covered by a spanner at that level; `Cell(nothing)` to all other columns.
- `mergegroup` indices are local to each level row (restart at 1 per level) to prevent
  unintended merging across rows.
- `n_header_rows` increases by `N - 1` to account for the additional spanner rows.

Columns not covered by any spanner at an intermediate level render as `Cell(nothing)`,
consistent with GT behaviour.

## Backward Compatibility

- Existing `tab_spanner!` calls without `level` continue to work unchanged (`level = 1`
  is the default).
- `_build_spanner_row` is replaced by `_build_spanner_rows`; no public API is removed.
- `Spanner` gains a field — since the package is unregistered with no external users, this
  is a non-issue.

## Out of Scope

- Spanners referencing other spanners by ID (rejected in favour of column-set inference).
- Validation at `tab_spanner!` call time (call-order dependency makes this fragile; deferred
  to `render()`).
- Vertical cell spanning for columns skipped at an intermediate level (not supported by
  `SummaryTables.Cell`; empty cells are the correct behaviour).
