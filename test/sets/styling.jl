@testset "tab_style! reference tests" begin
    df = DataFrame(;
        label = ["A", "B", "C"],
        change = [-0.12, 0.0, 0.34],
        score = [0.2, 0.5, 0.9],
    )

    # Conditional color only
    tbl = StyledTable(df)
    tab_style!(tbl, :change) do val
        if val > 0
            (; color = :green)
        elseif val < 0
            (; color = :red)
        else
            nothing
        end
    end
    run_reftest(tbl, "references/tab_style/conditional_color")

    # Conditional bold only (no color)
    tbl = StyledTable(df)
    tab_style!(tbl, :change) do val
        val > 0 ? (; bold = true) : nothing
    end
    run_reftest(tbl, "references/tab_style/conditional_bold")

    # Composition: static bold baseline + conditional color
    tbl = StyledTable(df)
    tab_style!(tbl, :change; bold = true) do val
        if val > 0
            (; color = :green)
        elseif val < 0
            (; color = :red)
        else
            nothing
        end
    end
    run_reftest(tbl, "references/tab_style/composition_bold_and_color")

    # Function explicitly clears baseline bold on the zero cell
    tbl = StyledTable(df)
    tab_style!(tbl, :change; bold = true) do val
        val == 0.0 ? (; bold = nothing) : nothing
    end
    run_reftest(tbl, "references/tab_style/clear_baseline_bold")

    # Function explicitly clears baseline color on negative cells
    tbl = StyledTable(df)
    tab_style!(tbl, :change; color = :green) do val
        val < 0 ? (; color = nothing) : nothing
    end
    run_reftest(tbl, "references/tab_style/clear_baseline_color")

    # Gradient via Colors.jl range
    GRADIENT = range(colorant"white"; stop = colorant"#1a7340", length = 100)
    tbl = StyledTable(df)
    tab_style!(tbl, :score) do val
        idx = round(Int, clamp(val, 0.0, 1.0) * 99) + 1
        (; color = GRADIENT[idx])
    end
    run_reftest(tbl, "references/tab_style/gradient")

    # Static Symbol color input
    tbl = StyledTable(df)
    tab_style!(tbl, :change; color = :blue)
    run_reftest(tbl, "references/tab_style/static_symbol_color")

    # Static AbstractString color input (CSS name)
    tbl = StyledTable(df)
    tab_style!(tbl, :change; color = "green")
    run_reftest(tbl, "references/tab_style/static_string_color")

    # Static Colorant input
    tbl = StyledTable(df)
    tab_style!(tbl, :change; color = colorant"#1a7340")
    run_reftest(tbl, "references/tab_style/static_colorant")

    # Function returns nothing on all cells; static baseline still applies
    tbl = StyledTable(df)
    tab_style!(tbl, :change; color = :blue) do val
        nothing
    end
    run_reftest(tbl, "references/tab_style/fn_nothing_with_baseline")

    # Repeated calls: second function-only call overwrites function, static baseline survives
    tbl = StyledTable(df)
    f1 = val -> (; color = :red)
    f2 = val -> (; color = :green)
    tab_style!(f1, tbl, :change; bold = true)
    tab_style!(f2, tbl, :change)
    @test tbl.col_style_fns[:change] === f2
    @test tbl.col_styles[:change].bold == true
    run_reftest(tbl, "references/tab_style/repeated_fn_overwrites")

    # Repeated calls: second static-only call updates style, previous function survives
    tbl = StyledTable(df)
    f = val -> (; color = :green)
    tab_style!(f, tbl, :change; bold = true)
    tab_style!(tbl, :change; bold = false)
    @test tbl.col_style_fns[:change] === f
    @test tbl.col_styles[:change].bold == false
    run_reftest(tbl, "references/tab_style/repeated_static_overwrites")
end

@testset "tab_style!" begin
    df = DataFrame(; label = ["A", "B"], value = [1.0, 2.0])

    tbl = StyledTable(df)
    tab_style!(tbl, [:value]; bold = true)
    run_reftest(tbl, "references/tab_style/bold_col")

    tbl = StyledTable(df)
    tab_style!(tbl, [:label]; color = "#FF0000", italic = true)
    run_reftest(tbl, "references/tab_style/color_italic")

    @test_throws ArgumentError tab_style!(StyledTable(df), [:nonexistent]; bold = true)

    # varargs form — must produce identical output to vector form
    let df = DataFrame(; label = ["A", "B"], value = [1.0, 2.0])
        ref = let tbl = StyledTable(df)
            tab_style!(tbl, [:value]; bold = true)
            html_str(tbl)
        end

        # single-symbol varargs
        tbl = StyledTable(df)
        tab_style!(tbl, :value; bold = true)
        @test html_str(tbl) == ref

        # multi-symbol varargs
        tbl = StyledTable(df)
        tab_style!(tbl, :label, :value; bold = true)
        ref2 = let t = StyledTable(df)
            tab_style!(t, [:label, :value]; bold = true)
            html_str(t)
        end
        @test html_str(tbl) == ref2
    end
end

@testset "tab_style! static — widened color type" begin
    df = DataFrame(; x = [1, 2, 3])

    tbl = StyledTable(df)
    tab_style!(tbl, :x; color = :red)
    @test tbl.col_styles[:x].color isa String
    @test startswith(tbl.col_styles[:x].color, "#")

    tbl2 = StyledTable(df)
    tab_style!(tbl2, :x; color = colorant"#1a7340")
    @test tbl2.col_styles[:x].color isa String
    @test startswith(tbl2.col_styles[:x].color, "#")

    @test_throws ArgumentError tab_style!(StyledTable(df), :x; color = 42)
end

@testset "tab_style! function form — call time" begin
    df = DataFrame(; change = [-0.1, 0.0, 0.3])
    f = val -> val > 0 ? (; color = :green) : nothing

    # Column validation
    @test_throws ArgumentError tab_style!(x -> nothing, StyledTable(df), [:nonexistent])

    # Function is stored
    tbl = StyledTable(df)
    tab_style!(f, tbl, :change)
    @test haskey(tbl.col_style_fns, :change)
    @test tbl.col_style_fns[:change] === f

    # Static baseline stored alongside function
    tbl2 = StyledTable(df)
    tab_style!(f, tbl2, :change; bold = true)
    @test haskey(tbl2.col_style_fns, :change)
    @test haskey(tbl2.col_styles, :change)
    @test tbl2.col_styles[:change].bold == true

    # Function-only call leaves previous static baseline intact
    tbl3 = StyledTable(df)
    tab_style!(tbl3, :change; bold = true)
    tab_style!(x -> nothing, tbl3, :change)
    @test haskey(tbl3.col_styles, :change)
    @test tbl3.col_styles[:change].bold == true

    # Static-only call leaves previous function intact
    tbl4 = StyledTable(df)
    tab_style!(f, tbl4, :change)
    tab_style!(tbl4, :change; bold = true)
    @test haskey(tbl4.col_style_fns, :change)
    @test tbl4.col_style_fns[:change] === f
end

@testset "tab_style! render-time errors" begin
    df = DataFrame(; x = [1, 2, 3])

    # Unrecognised NamedTuple key
    tbl = StyledTable(df)
    tab_style!(tbl, :x) do val
        (; color = :red, align = :center)
    end
    @test_throws ArgumentError render(tbl)

    # Unsupported color type in function return value
    tbl2 = StyledTable(df)
    tab_style!(tbl2, :x) do val
        (; color = 42)
    end
    @test_throws ArgumentError render(tbl2)
end
