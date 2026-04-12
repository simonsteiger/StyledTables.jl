"""
$TYPEDSIGNATURES

Add a title and optional subtitle above the column headers.

The title renders bold; the subtitle renders italic.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `title`: main heading text.

# Keywords

- `subtitle`: secondary heading text, or `nothing` (default).
- `align`: horizontal alignment (`:left`, `:center`, `:right`), default `:center`.

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_sourcenote!`](@ref), [`tab_footnote!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_header!(tbl, "My Table"; subtitle = "Subtitle here")
render(tbl)

tbl = StyledTable(df)
tab_header!(tbl, "Left-aligned Title"; align = :left)
render(tbl)
```
"""
function tab_header!(tbl::StyledTable, title; subtitle = nothing, align::Symbol = :center)
    _validate_halign(align)
    tbl.header = TableHeader(title, subtitle, align)
    return tbl
end

"""
$TYPEDSIGNATURES

Add footnotes to the table.

Footnotes refer to specific columns. For placing general notes under the table, see [`tab_sourcenote!`](@ref).

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `args`: one or more `text => column(s)` pairs.

# Returns

`tbl` (modified in place).

See also: [`tab_sourcenote!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_footnote!(tbl, "PPP adjusted" => :gdp)
render(tbl)
```
"""
function tab_footnote!(tbl::StyledTable, args::Pair...)
    tab_footnote!(tbl, collect(args))
    return tbl
end

function tab_footnote!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{<:Pair{<:AbstractString,<:AbstractString}},
        AbstractVector{<:Pair{<:AbstractString,Symbol}},
        AbstractDict{<:AbstractString,<:AbstractString},
        AbstractDict{<:AbstractString,Symbol},
    },
)
    ps = [String(text) => [col isa Symbol ? col : Symbol(col)] for (text, col) in d]
    _push_footnotes!(tbl, ps)
    return tbl
end

function _push_footnotes!(tbl::StyledTable, d)
    colnames = Symbol.(names(tbl.data))

    for (_, columns) in d
        for col in columns
            if col ∉ colnames
                throw(ArgumentError("Column :$col not found in DataFrame"))
            end
        end
    end

    for (text, columns) in d
        for col in columns
            if haskey(tbl.col_footnotes, col)
                @warn "Column :$col already has a footnote " *
                      "(\"$(tbl.col_footnotes[col])\"); it will be replaced."
            end
            tbl.col_footnotes[col] = text
        end
    end

    return tbl
end

function _push_spanner_footnote!(tbl::StyledTable, annotation, target::SpannerTarget)
    matches = filter(tbl.spanners) do s
        s.label == target.label &&
            (target.level === nothing || s.level == target.level)
    end

    if isempty(matches)
        if target.level !== nothing
            throw(ArgumentError(
                "No spanner with label \"$(target.label)\" " *
                "at level $(target.level) found",
            ))
        else
            throw(ArgumentError(
                "No spanner with label \"$(target.label)\" found",
            ))
        end
    end

    if target.level === nothing && length(matches) > 1
        # Expand into one entry per matched spanner, each with a concrete level
        for s in matches
            concrete = SpannerTarget(s.label, s.level)
            if any(x -> x.first.label == concrete.label && x.first.level == concrete.level, tbl.spanner_footnotes)
                @warn "Spanner \"$(concrete.label)\" already has a footnote annotation; the new annotation will take precedence."
            end
            push!(tbl.spanner_footnotes, concrete => annotation)
        end
    else
        if any(x -> x.first.label == target.label && x.first.level == target.level, tbl.spanner_footnotes)
            @warn "Spanner \"$(target.label)\" already has a footnote annotation; the new annotation will take precedence."
        end
        push!(tbl.spanner_footnotes, target => annotation)
    end
    return tbl
end

function _push_cell_footnote!(tbl::StyledTable, annotation, target::CellTarget)
    colnames = Symbol.(names(tbl.data))
    target.col in colnames ||
        throw(ArgumentError("Column :$(target.col) not found in DataFrame"))

    if target.row isa Int
        row = target.row
        1 <= row <= nrow(tbl.data) || throw(
            ArgumentError(
                "Row $row is out of range (DataFrame has $(nrow(tbl.data)) rows)",
            ),
        )
        if haskey(tbl.cell_footnotes, (row, target.col))
            @warn "Cell ($row, :$(target.col)) already has a footnote annotation; " *
                  "the new annotation will take precedence."
        end
        tbl.cell_footnotes[(row, target.col)] = annotation
    else
        # Stub form — handled in Task 3
        throw(ArgumentError("CellTarget with Stub requires tab_stub! to be called first"))
    end

    return tbl
end

"""
$TYPEDSIGNATURES

Attach footnote annotations to spanner labels.

`d` is a vector of `annotation => SpannerTarget(label)` pairs.
Use [`SpannerTarget`](@ref) to target a spanner label; optionally pass `level` to restrict
the match to a specific spanner row.

Throws `ArgumentError` if no spanner matches the given label (and optional level).
Warns if the same spanner is annotated more than once; the last annotation takes precedence.
"""
function tab_footnote!(tbl::StyledTable, d::AbstractVector{<:Pair{<:Any,SpannerTarget}})
    for (annotation, target) in d
        _push_spanner_footnote!(tbl, annotation, target)
    end
    return tbl
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector{<:Pair{<:Any,CellTarget}})
    for (annotation, target) in d
        _push_cell_footnote!(tbl, annotation, target)
    end
    return tbl
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector{Pair{String,Vector{Symbol}}})
    _push_footnotes!(tbl, d)
    return tbl
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector{Pair{Multiline,Vector{Symbol}}})
    _push_footnotes!(tbl, d)
    return tbl
end

function tab_footnote!(tbl::StyledTable, d::AbstractDict)
    ktypes = unique(typeof(k) for k in keys(d))
    vtypes = unique(typeof(v) for v in values(d))
    _throw_mixed_pair_values(tab_footnote!, ktypes, vtypes, tbl, d)
end

function tab_footnote!(tbl::StyledTable, d::AbstractVector)
    if !isempty(d) && all(x -> x isa Pair, d)
        ktypes = unique(typeof(k) for (k, _) in d)
        vtypes = unique(typeof(v) for (_, v) in d)
        _throw_mixed_pair_values(tab_footnote!, ktypes, vtypes, tbl, d)
    end
    throw(MethodError(tab_footnote!, (tbl, d)))
end

"""
$TYPEDSIGNATURES

Add footnotes from a dict or vector of pairs.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `d`: an `AbstractDict` or `AbstractVector` of `Pair`s mapping text to column names.

# Returns

`tbl` (modified in place).

See also: [`tab_spanner!`](@ref), [`tab_header!`](@ref), [`tab_stub!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_footnote!(tbl, Dict(
    "measured each month" => [:efficacy, :safety],
    "in years" => [:age])
)
render(tbl)
```
"""
function tab_footnote!(
    tbl::StyledTable,
    d::Union{
        AbstractVector{
            <:Pair{<:AbstractString,<:Union{Vector{<:AbstractString},Vector{Symbol}}},
        },
        AbstractDict{<:AbstractString,<:Union{Vector{<:AbstractString},Vector{Symbol}}},
    },
)
    ps = [String(text) => Symbol.(columns) for (text, columns) in d]
    tab_footnote!(tbl, ps)
    return tbl
end

"""
$TYPEDSIGNATURES

Add a source-note line in the table footer.

Source notes span the full table width and are left-aligned. Each call appends another line.

# Arguments

- `tbl`: the [`StyledTable`](@ref) to modify.
- `text`: source note text.

# Returns

`tbl` (modified in place).

See also: [`tab_footnote!`](@ref), [`tab_header!`](@ref).

# Examples

```julia
tbl = StyledTable(df)
tab_sourcenote!(tbl, "Data: World Bank Open Data")
render(tbl)
```
"""
function tab_sourcenote!(tbl::StyledTable, text)
    push!(tbl.sourcenotes, text)
    return tbl
end
