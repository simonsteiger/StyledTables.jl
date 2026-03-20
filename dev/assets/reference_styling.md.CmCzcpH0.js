import{_ as p,C as h,o as d,c as k,aA as n,j as i,a as e,E as a,w as l}from"./chunks/framework.DeH5H0ZK.js";const _=JSON.parse('{"title":"Styling and Options","description":"","frontmatter":{},"headers":[],"relativePath":"reference/styling.md","filePath":"reference/styling.md","lastUpdated":null}'),r={name:"reference/styling.md"},o={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},E={class:"jldocstring custom-block",open:""},y={class:"jldocstring custom-block",open:""};function c(b,s,u,F,C,m){const t=h("Badge");return d(),k("div",null,[s[16]||(s[16]=n(`<h1 id="Styling-and-Options" tabindex="-1">Styling and Options <a class="header-anchor" href="#Styling-and-Options" aria-label="Permalink to &quot;Styling and Options {#Styling-and-Options}&quot;">​</a></h1><hr><h2 id="tab_style!" tabindex="-1"><code>tab_style!</code> <a class="header-anchor" href="#tab_style!" aria-label="Permalink to &quot;\`tab_style!\` {#tab_style!}&quot;">​</a></h2><p>Apply inline styling to body cells in the specified columns. Colors are hex strings (<code>&quot;#RRGGBB&quot;</code>).</p><p><strong>Signatures:</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; color</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, bold</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, italic</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, underline</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AbstractVector{Symbol}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; color</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, bold</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, italic</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, underline</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    metric  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Revenue&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;EBITDA&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Net Income&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    q1      </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    q2      </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.35</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.21</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    yoy_pct </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.08</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.14</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Q2 2026 Financial Summary&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:yoy_pct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;#1a7340&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, bold </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:yoy_pct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :metric</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Metric&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :q1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Q1 (€B)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :q2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Q2 (€B)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :yoy_pct</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;YoY Change&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-264c7151">
    <style>
        #st-264c7151 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-264c7151 tr {
            background-color: transparent;
            border: none;
        }
        #st-264c7151 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-264c7151 br {
            line-height: 0em;
            margin: 0;
        }
        #st-264c7151 sub {
            line-height: 0;
        }
        #st-264c7151 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="4" style="font-weight:bold;text-align:center;">Q2 2026 Financial Summary</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Metric</td>
        <td style="font-weight:bold;text-align:left;">Q1 (€B)</td>
        <td style="font-weight:bold;text-align:left;">Q2 (€B)</td>
        <td style="font-weight:bold;text-align:left;">YoY Change</td>
    </tr>
        <tr><td colspan="4" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Revenue</td>
        <td style="text-align:left;">1.2</td>
        <td style="text-align:left;">1.4</td>
        <td style="text-align:left;"><span style="font-weight:bold;color:rgb(26,115,64);">12.0%</span></td>
    </tr>
    <tr>
        <td style="text-align:left;">EBITDA</td>
        <td style="text-align:left;">0.3</td>
        <td style="text-align:left;">0.35</td>
        <td style="text-align:left;"><span style="font-weight:bold;color:rgb(26,115,64);">8.0%</span></td>
    </tr>
    <tr>
        <td style="text-align:left;">Net Income</td>
        <td style="text-align:left;">0.18</td>
        <td style="text-align:left;">0.21</td>
        <td style="text-align:left;"><span style="font-weight:bold;color:rgb(26,115,64);">14.0%</span></td>
    </tr>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,8)),i("details",o,[i("summary",null,[s[0]||(s[0]=i("a",{id:"StyledTables.tab_style!-Tuple{StyledTable, Vararg{Symbol}}",href:"#StyledTables.tab_style!-Tuple{StyledTable, Vararg{Symbol}}"},[i("span",{class:"jlbinding"},"StyledTables.tab_style!")],-1)),s[1]||(s[1]=e()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[3]||(s[3]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    color,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    bold,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    italic,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    underline</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Apply inline styling to body cells in the listed columns (variadic form).</p><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Keywords</strong></p><ul><li><p><code>color</code>: hex color string (<code>&quot;#RRGGBB&quot;</code>), or <code>nothing</code>.</p></li><li><p><code>bold</code>: <code>true</code>/<code>false</code>, or <code>nothing</code>.</p></li><li><p><code>italic</code>: <code>true</code>/<code>false</code>, or <code>nothing</code>.</p></li><li><p><code>underline</code>: <code>true</code>/<code>false</code>, or <code>nothing</code>.</p></li></ul><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;#1a7340&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, bold </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,8)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[2]||(s[2]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/ece4aef7408e5d79de01950a4b65eb4b1e862359/src/modifiers.jl#L590",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),i("details",g,[i("summary",null,[s[4]||(s[4]=i("a",{id:"StyledTables.tab_style!-Tuple{StyledTable, AbstractVector{Symbol}}",href:"#StyledTables.tab_style!-Tuple{StyledTable, AbstractVector{Symbol}}"},[i("span",{class:"jlbinding"},"StyledTables.tab_style!")],-1)),s[5]||(s[5]=e()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[7]||(s[7]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AbstractVector{Symbol}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    color,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    bold,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    italic,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    underline</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Apply inline styling to all body cells in the specified columns.</p><p>Any keyword left as <code>nothing</code> is inherited from the cell default.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>columns</code>: column names to style.</p></li></ul><p><strong>Keywords</strong></p><ul><li><p><code>color</code>: hex color string (<code>&quot;#RRGGBB&quot;</code>), or <code>nothing</code>.</p></li><li><p><code>bold</code>: <code>true</code>/<code>false</code>, or <code>nothing</code>.</p></li><li><p><code>italic</code>: <code>true</code>/<code>false</code>, or <code>nothing</code>.</p></li><li><p><code>underline</code>: <code>true</code>/<code>false</code>, or <code>nothing</code>.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/formatting#fmt!"><code>fmt!</code></a>, <a href="/StyledTables.jl/dev/reference/columns#cols_align!"><code>cols_align!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;#1a7340&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, bold </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[6]||(s[6]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/ece4aef7408e5d79de01950a4b65eb4b1e862359/src/modifiers.jl#L539",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[17]||(s[17]=n(`<hr><h2 id="sub_missing!" tabindex="-1"><code>sub_missing!</code> <a class="header-anchor" href="#sub_missing!" aria-label="Permalink to &quot;\`sub_missing!\` {#sub_missing!}&quot;">​</a></h2><p>Replace <code>missing</code> values with a placeholder string for display. Defaults to <code>&quot;—&quot;</code> (em dash).</p><p><strong>Signature:</strong> <code>sub_missing!(tbl; with = &quot;—&quot;)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    group </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">missing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">missing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sub_missing!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-62be3ba5">
    <style>
        #st-62be3ba5 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-62be3ba5 tr {
            background-color: transparent;
            border: none;
        }
        #st-62be3ba5 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-62be3ba5 br {
            line-height: 0em;
            margin: 0;
        }
        #st-62be3ba5 sub {
            line-height: 0;
        }
        #st-62be3ba5 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">group</td>
        <td style="font-weight:bold;text-align:left;">value</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">A</td>
        <td style="text-align:left;">1.2</td>
    </tr>
    <tr>
        <td style="text-align:left;">A</td>
        <td style="text-align:left;">—</td>
    </tr>
    <tr>
        <td style="text-align:left;">B</td>
        <td style="text-align:left;">3.4</td>
    </tr>
    <tr>
        <td style="text-align:left;">B</td>
        <td style="text-align:left;">—</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>To use a custom placeholder:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sub_missing!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, with </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;N/A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-de68eab8">
    <style>
        #st-de68eab8 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-de68eab8 tr {
            background-color: transparent;
            border: none;
        }
        #st-de68eab8 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-de68eab8 br {
            line-height: 0em;
            margin: 0;
        }
        #st-de68eab8 sub {
            line-height: 0;
        }
        #st-de68eab8 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">group</td>
        <td style="font-weight:bold;text-align:left;">value</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">A</td>
        <td style="text-align:left;">1.2</td>
    </tr>
    <tr>
        <td style="text-align:left;">A</td>
        <td style="text-align:left;">N/A</td>
    </tr>
    <tr>
        <td style="text-align:left;">B</td>
        <td style="text-align:left;">3.4</td>
    </tr>
    <tr>
        <td style="text-align:left;">B</td>
        <td style="text-align:left;">N/A</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,9)),i("details",E,[i("summary",null,[s[8]||(s[8]=i("a",{id:"StyledTables.sub_missing!",href:"#StyledTables.sub_missing!"},[i("span",{class:"jlbinding"},"StyledTables.sub_missing!")],-1)),s[9]||(s[9]=e()),a(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[11]||(s[11]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sub_missing!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; with) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Replace <code>missing</code> values with a display placeholder.</p><p><strong>Arguments</strong></p><ul><li><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</li></ul><p><strong>Keywords</strong></p><ul><li><code>with</code>: replacement display value (default <code>&quot;—&quot;</code>, an em dash).</li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/styling#tab_options!"><code>tab_options!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt!"><code>fmt!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sub_missing!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,11)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[10]||(s[10]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/ece4aef7408e5d79de01950a4b65eb4b1e862359/src/modifiers.jl#L626",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[18]||(s[18]=n(`<hr><h2 id="tab_options!" tabindex="-1"><code>tab_options!</code> <a class="header-anchor" href="#tab_options!" aria-label="Permalink to &quot;\`tab_options!\` {#tab_options!}&quot;">​</a></h2><p>Set global rounding options for all numeric cells in the table. Per-column formatters (<code>fmt_number!</code>, <code>fmt!</code>) take precedence over these options.</p><p><strong>Signature:</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_options!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl; round_digits</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, round_mode</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, trailing_zeros</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nothing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><ul><li><p><code>round_digits</code> — number of decimal places or significant digits</p></li><li><p><code>round_mode</code> — <code>:auto</code>, <code>:digits</code>, or <code>:sigdigits</code></p></li><li><p><code>trailing_zeros</code> — if <code>true</code>, pad with zeros to <code>round_digits</code> places</p></li></ul><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.23456</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7.891</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Round to 2 significant digits</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_options!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, round_digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, round_mode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :sigdigits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e9e7328d">
    <style>
        #st-e9e7328d {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e9e7328d tr {
            background-color: transparent;
            border: none;
        }
        #st-e9e7328d tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e9e7328d br {
            line-height: 0em;
            margin: 0;
        }
        #st-e9e7328d sub {
            line-height: 0;
        }
        #st-e9e7328d sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">a</td>
        <td style="font-weight:bold;text-align:left;">b</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">1.2</td>
        <td style="text-align:left;">100</td>
    </tr>
    <tr>
        <td style="text-align:left;">7.9</td>
        <td style="text-align:left;">200</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Fixed 3 decimal places with trailing zeros</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_options!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, round_digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, round_mode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :digits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, trailing_zeros </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e0d521b1">
    <style>
        #st-e0d521b1 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e0d521b1 tr {
            background-color: transparent;
            border: none;
        }
        #st-e0d521b1 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e0d521b1 br {
            line-height: 0em;
            margin: 0;
        }
        #st-e0d521b1 sub {
            line-height: 0;
        }
        #st-e0d521b1 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">a</td>
        <td style="font-weight:bold;text-align:left;">b</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">1.235</td>
        <td style="text-align:left;">100.000</td>
    </tr>
    <tr>
        <td style="text-align:left;">7.891</td>
        <td style="text-align:left;">200.000</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,10)),i("details",y,[i("summary",null,[s[12]||(s[12]=i("a",{id:"StyledTables.tab_options!",href:"#StyledTables.tab_options!"},[i("span",{class:"jlbinding"},"StyledTables.tab_options!")],-1)),s[13]||(s[13]=e()),a(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[15]||(s[15]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_options!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    round_digits,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    round_mode,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    trailing_zeros</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Set global rounding options for all numeric cells.</p><p>Options pass to <code>SummaryTables.Table</code> at render time. Per-column formatters (see <a href="/StyledTables.jl/dev/reference/formatting#fmt_number!"><code>fmt_number!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt!"><code>fmt!</code></a>) take precedence.</p><p><strong>Arguments</strong></p><ul><li><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</li></ul><p><strong>Keywords</strong></p><ul><li><p><code>round_digits</code>: number of digits to round to.</p></li><li><p><code>round_mode</code>: <code>:auto</code>, <code>:digits</code>, or <code>:sigdigits</code>.</p></li><li><p><code>trailing_zeros</code>: whether to keep trailing zeros after rounding.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/formatting#fmt_number!"><code>fmt_number!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_percent!"><code>fmt_percent!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_integer!"><code>fmt_integer!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_options!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, round_digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, round_mode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :digits</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[14]||(s[14]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/ece4aef7408e5d79de01950a4b65eb4b1e862359/src/modifiers.jl#L658",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})])])}const B=p(r,[["render",c]]);export{_ as __pageData,B as default};
