import{_ as p,C as h,o as r,c as d,aA as n,j as i,a as l,E as a,w as e}from"./chunks/framework.DMiws6cs.js";const S=JSON.parse('{"title":"Column Modifiers","description":"","frontmatter":{},"headers":[],"relativePath":"reference/columns.md","filePath":"reference/columns.md","lastUpdated":null}'),k={name:"reference/columns.md"},o={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},c={class:"jldocstring custom-block",open:""},E={class:"jldocstring custom-block",open:""};function y(b,s,u,F,C,m){const t=h("Badge");return r(),d("div",null,[s[16]||(s[16]=n(`<h1 id="Column-Modifiers" tabindex="-1">Column Modifiers <a class="header-anchor" href="#Column-Modifiers" aria-label="Permalink to &quot;Column Modifiers {#Column-Modifiers}&quot;">​</a></h1><p>These functions control column display names, alignment, and visibility.</p><hr><h2 id="cols_label!" tabindex="-1"><code>cols_label!</code> <a class="header-anchor" href="#cols_label!" aria-label="Permalink to &quot;\`cols_label!\` {#cols_label!}&quot;">​</a></h2><p>Rename one or more columns for display. The underlying <code>DataFrame</code> is unchanged.</p><p><strong>Signature:</strong> <code>cols_label!(tbl, (col =&gt; label)::Pair...)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, SummaryTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bmi </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">22.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">27.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">31.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], sbp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">118</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">135</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">142</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BMI (kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Systolic BP (mmHg)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-35bbac47">
    <style>
        #st-35bbac47 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-35bbac47 tr {
            background-color: transparent;
            border: none;
        }
        #st-35bbac47 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-35bbac47 br {
            line-height: 0em;
            margin: 0;
        }
        #st-35bbac47 sub {
            line-height: 0;
        }
        #st-35bbac47 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">BMI (kg/m²)</td>
        <td style="font-weight:bold;text-align:left;">Systolic BP (mmHg)</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr>
        <td style="text-align:left;">31</td>
        <td style="text-align:left;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Multi-line column headers using <code>Multiline</code>:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Multiline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BMI&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Multiline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Systolic BP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(mmHg)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-47adf3ff">
    <style>
        #st-47adf3ff {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-47adf3ff tr {
            background-color: transparent;
            border: none;
        }
        #st-47adf3ff tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-47adf3ff br {
            line-height: 0em;
            margin: 0;
        }
        #st-47adf3ff sub {
            line-height: 0;
        }
        #st-47adf3ff sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">BMI<br>(kg/m²)</td>
        <td style="font-weight:bold;text-align:left;">Systolic BP<br>(mmHg)</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr>
        <td style="text-align:left;">31</td>
        <td style="text-align:left;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,11)),i("details",o,[i("summary",null,[s[0]||(s[0]=i("a",{id:"StyledTables.cols_label!-Tuple{StyledTable, Vararg{Pair}}",href:"#StyledTables.cols_label!-Tuple{StyledTable, Vararg{Pair}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_label!")],-1)),s[1]||(s[1]=l()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[3]||(s[3]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pair...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Rename one or more columns in the rendered output.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR11/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>args</code>: any number of <code>col =&gt; label</code> pairs. <code>col</code> must be a <code>Symbol</code> matching a column name; <code>label</code> can be a plain <code>String</code> or any value accepted by <code>SummaryTables.Cell</code>, including <code>Multiline</code> for multi-line headers.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Notes</strong></p><p>The underlying <code>DataFrame</code> is unchanged.</p><p>See also: <a href="/StyledTables.jl/previews/PR11/reference/columns#cols_align!"><code>cols_align!</code></a>, <a href="/StyledTables.jl/previews/PR11/reference/columns#cols_hide!"><code>cols_hide!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BMI (kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Systolic BP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,11)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[2]||(s[2]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/6fb90b07341e996463c8cc01ece95cabd2b617a2/src/modifiers.jl#L23",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),i("details",g,[i("summary",null,[s[4]||(s[4]=i("a",{id:"StyledTables.cols_label!-Tuple{StyledTable, Union{AbstractDict{Symbol, Symbol}, AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}, AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}}, AbstractVector{<:Pair{<:AbstractString, Symbol}}}}",href:"#StyledTables.cols_label!-Tuple{StyledTable, Union{AbstractDict{Symbol, Symbol}, AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}, AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}}, AbstractVector{<:Pair{<:AbstractString, Symbol}}}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_label!")],-1)),s[5]||(s[5]=l()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[7]||(s[7]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Union{AbstractDict{Symbol, Symbol}, AbstractDict{&lt;:AbstractString, &lt;:AbstractString}, AbstractDict{&lt;:AbstractString, Symbol}, AbstractDict{Symbol, &lt;:AbstractString}, AbstractVector{&lt;:Pair{Symbol, Symbol}}, AbstractVector{&lt;:Pair{&lt;:AbstractString, &lt;:AbstractString}}, AbstractVector{&lt;:Pair{&lt;:AbstractString, Symbol}}}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Rename columns using a dict or vector of pairs.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR11/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>d</code>: a <code>Dict</code> or vector of <code>col =&gt; label</code> pairs specifying columns and their labels.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR11/reference/columns#cols_align!"><code>cols_align!</code></a>, <a href="/StyledTables.jl/previews/PR11/reference/columns#cols_hide!"><code>cols_hide!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">label_dict </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BMI (kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Systolic BP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, label_dict)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[6]||(s[6]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/6fb90b07341e996463c8cc01ece95cabd2b617a2/src/modifiers.jl#L71",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[17]||(s[17]=n(`<hr><h2 id="cols_align!" tabindex="-1"><code>cols_align!</code> <a class="header-anchor" href="#cols_align!" aria-label="Permalink to &quot;\`cols_align!\` {#cols_align!}&quot;">​</a></h2><p>Set horizontal alignment for one or more columns. Valid values: <code>:left</code>, <code>:center</code>, <code>:right</code>.</p><p><strong>Signatures:</strong></p><ul><li><p><code>cols_align!(tbl, halign, columns)</code> — apply to specific columns</p></li><li><p><code>cols_align!(tbl, halign)</code> — apply to all columns</p></li></ul><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e70ef181">
    <style>
        #st-e70ef181 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e70ef181 tr {
            background-color: transparent;
            border: none;
        }
        #st-e70ef181 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e70ef181 br {
            line-height: 0em;
            margin: 0;
        }
        #st-e70ef181 sub {
            line-height: 0;
        }
        #st-e70ef181 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:right;">bmi</td>
        <td style="font-weight:bold;text-align:right;">sbp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:right;">22.1</td>
        <td style="text-align:right;">118</td>
    </tr>
    <tr>
        <td style="text-align:right;">27.4</td>
        <td style="text-align:right;">135</td>
    </tr>
    <tr>
        <td style="text-align:right;">31</td>
        <td style="text-align:right;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Align all columns at once:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-564b5577">
    <style>
        #st-564b5577 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-564b5577 tr {
            background-color: transparent;
            border: none;
        }
        #st-564b5577 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-564b5577 br {
            line-height: 0em;
            margin: 0;
        }
        #st-564b5577 sub {
            line-height: 0;
        }
        #st-564b5577 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:center;">bmi</td>
        <td style="font-weight:bold;text-align:center;">sbp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:center;">22.1</td>
        <td style="text-align:center;">118</td>
    </tr>
    <tr>
        <td style="text-align:center;">27.4</td>
        <td style="text-align:center;">135</td>
    </tr>
    <tr>
        <td style="text-align:center;">31</td>
        <td style="text-align:center;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,10)),i("details",c,[i("summary",null,[s[8]||(s[8]=i("a",{id:"StyledTables.cols_align!",href:"#StyledTables.cols_align!"},[i("span",{class:"jlbinding"},"StyledTables.cols_align!")],-1)),s[9]||(s[9]=l()),a(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[11]||(s[11]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, halign</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    halign</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    columns</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Set horizontal alignment for one or more columns.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR11/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>halign</code>: one of <code>:left</code>, <code>:center</code>, or <code>:right</code>.</p></li><li><p><code>columns</code>: vector of column names to align. Omit to apply to all columns.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,8)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[10]||(s[10]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/6fb90b07341e996463c8cc01ece95cabd2b617a2/src/modifiers.jl#L104",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[18]||(s[18]=n(`<hr><h2 id="cols_hide!" tabindex="-1"><code>cols_hide!</code> <a class="header-anchor" href="#cols_hide!" aria-label="Permalink to &quot;\`cols_hide!\` {#cols_hide!}&quot;">​</a></h2><p>Remove columns from the rendered table without dropping them from the data. Use this when a column drives grouping (via <code>tab_row_group!</code>) but should not appear.</p><p><strong>Signature:</strong> <code>cols_hide!(tbl, cols::Symbol...)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    group     </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subject   </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    score     </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">88</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">92</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">75</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">84</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    pct_score </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.88</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.92</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.75</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.84</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_row_group!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:subject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Subject&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:score</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Score&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pct_score</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Score (%)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pct_score</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-258c3e45">
    <style>
        #st-258c3e45 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-258c3e45 tr {
            background-color: transparent;
            border: none;
        }
        #st-258c3e45 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-258c3e45 br {
            line-height: 0em;
            margin: 0;
        }
        #st-258c3e45 sub {
            line-height: 0;
        }
        #st-258c3e45 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Subject</td>
        <td style="font-weight:bold;text-align:left;">Score</td>
        <td style="font-weight:bold;text-align:left;">Score (%)</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">A</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S1</td>
        <td style="text-align:left;">88</td>
        <td style="text-align:left;">88%</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S2</td>
        <td style="text-align:left;">92</td>
        <td style="text-align:left;">92%</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">B</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S3</td>
        <td style="text-align:left;">75</td>
        <td style="text-align:left;">75%</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S4</td>
        <td style="text-align:left;">84</td>
        <td style="text-align:left;">84%</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,6)),i("details",E,[i("summary",null,[s[12]||(s[12]=i("a",{id:"StyledTables.cols_hide!",href:"#StyledTables.cols_hide!"},[i("span",{class:"jlbinding"},"StyledTables.cols_hide!")],-1)),s[13]||(s[13]=l()),a(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[15]||(s[15]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, cols</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Remove columns from the rendered output without modifying the <code>DataFrame</code>.</p><p>Hidden columns remain accessible for grouping or formatting, but do not appear in the rendered table. Commonly paired with <a href="/StyledTables.jl/previews/PR11/reference/structure#tab_row_group!"><code>tab_row_group!</code></a>.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR11/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>cols</code>: one or more column names to hide.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR11/reference/structure#tab_row_group!"><code>tab_row_group!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_row_group!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[14]||(s[14]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/6fb90b07341e996463c8cc01ece95cabd2b617a2/src/modifiers.jl#L807",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})])])}const _=p(k,[["render",y]]);export{S as __pageData,_ as default};
