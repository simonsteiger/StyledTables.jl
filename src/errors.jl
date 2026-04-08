# Shared catch-all helper for pair-accepting functions.
# Inspects runtime key and value types; throws an informative ArgumentError for mixed types.
# check_keys=false skips key inspection (used by tab_spanner!, where label-type mixing
# is not the documented error case).
function _throw_mixed_pair_values(
    f::Function,
    ktypes,
    vtypes,
    tbl,
    d;
    check_keys::Bool = true,
)
    if check_keys && length(ktypes) > 1
        throw(
            ArgumentError(
                "Mixed key types in pairs: $(join(ktypes, ", ")). " *
                "All keys must share the same type.",
            ),
        )
    end
    if length(vtypes) > 1
        throw(
            ArgumentError(
                "Mixed value types in pairs: $(join(vtypes, ", ")). " *
                "All values must share the same type.",
            ),
        )
    end
    throw(MethodError(f, (tbl, d)))
end
