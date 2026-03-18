import{_ as p,C as d,o as r,c as h,aA as a,j as i,a as e,E as n,w as l}from"./chunks/framework.DeH5H0ZK.js";const _=JSON.parse('{"title":"Formatting","description":"","frontmatter":{},"headers":[],"relativePath":"reference/formatting.md","filePath":"reference/formatting.md","lastUpdated":null}'),k={name:"reference/formatting.md"},o={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},E={class:"jldocstring custom-block",open:""},c={class:"jldocstring custom-block",open:""};function y(b,s,u,m,f,F){const t=d("Badge");return r(),h("div",null,[s[16]||(s[16]=a(`<h1 id="Formatting" tabindex="-1">Formatting <a class="header-anchor" href="#Formatting" aria-label="Permalink to &quot;Formatting {#Formatting}&quot;">​</a></h1><p>Formatter functions convert raw cell values to display strings <strong>before</strong> styling is applied. They are column-scoped: each formatter is associated with one or more columns.</p><blockquote><p><code>fmt_*</code> functions do not change the underlying <code>DataFrame</code> — they only affect how values look in the rendered output.</p></blockquote><hr><h2 id="fmt_number!" tabindex="-1"><code>fmt_number!</code> <a class="header-anchor" href="#fmt_number!" aria-label="Permalink to &quot;\`fmt_number!\` {#fmt_number!}&quot;">​</a></h2><p>Format to a fixed number of decimal places.</p><p><strong>Signature:</strong> <code>fmt_number!(tbl, cols; digits=2, trailing_zeros=true)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.2345</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6.789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.001</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_number!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_number!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-d7f652b3">
    <style>
        #st-d7f652b3 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-d7f652b3 tr {
            background-color: transparent;
            border: none;
        }
        #st-d7f652b3 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-d7f652b3 br {
            line-height: 0em;
            margin: 0;
        }
        #st-d7f652b3 sub {
            line-height: 0;
        }
        #st-d7f652b3 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">x</td>
        <td style="font-weight:bold;text-align:left;">y</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">1.234</td>
        <td style="text-align:left;">100.00</td>
    </tr>
    <tr>
        <td style="text-align:left;">6.789</td>
        <td style="text-align:left;">0.00</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,9)),i("details",o,[i("summary",null,[s[0]||(s[0]=i("a",{id:"StyledTables.fmt_number!",href:"#StyledTables.fmt_number!"},[i("span",{class:"jlbinding"},"StyledTables.fmt_number!")],-1)),s[1]||(s[1]=e()),n(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[3]||(s[3]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_number!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cols;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    digits,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    trailing_zeros</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Format numeric values in <code>cols</code> to a fixed number of decimal places.</p><p><code>cols</code> can be a single <code>Symbol</code> or an <code>AbstractVector{Symbol}</code>.</p><p><strong>Arguments</strong></p><ul><li><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</li></ul><p><strong>Keywords</strong></p><ul><li><p><code>digits</code>: number of decimal places (default <code>2</code>).</p></li><li><p><code>trailing_zeros</code>: keep trailing zeros (default <code>true</code>).</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/formatting#fmt_percent!"><code>fmt_percent!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_integer!"><code>fmt_integer!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt!"><code>fmt!</code></a>, <a href="/StyledTables.jl/dev/reference/styling#tab_options!"><code>tab_options!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_number!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),n(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[2]||(s[2]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9c688caf4aadab4065f3bf8ae49aa79867639940/src/fmt.jl#L16",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[17]||(s[17]=a(`<hr><h2 id="fmt_percent!" tabindex="-1"><code>fmt_percent!</code> <a class="header-anchor" href="#fmt_percent!" aria-label="Permalink to &quot;\`fmt_percent!\` {#fmt_percent!}&quot;">​</a></h2><p>Multiply by <code>scale</code> (default <code>100</code>) and append <code>suffix</code> (default <code>&quot;%&quot;</code>).</p><p><strong>Signature:</strong> <code>fmt_percent!(tbl, cols; digits=1, scale=100, suffix=&quot;%&quot;)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.456</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:rate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-04268ea9">
    <style>
        #st-04268ea9 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-04268ea9 tr {
            background-color: transparent;
            border: none;
        }
        #st-04268ea9 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-04268ea9 br {
            line-height: 0em;
            margin: 0;
        }
        #st-04268ea9 sub {
            line-height: 0;
        }
        #st-04268ea9 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">rate</td>
    </tr>
        <tr><td colspan="1" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">12.3%</td>
    </tr>
    <tr>
        <td style="text-align:left;">45.6%</td>
    </tr>
    <tr>
        <td style="text-align:left;">78.9%</td>
    </tr>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Already-scaled values (e.g., stored as 12.3 meaning 12.3%):</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">45.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">78.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df2)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:rate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, scale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-04268ea9">
    <style>
        #st-04268ea9 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-04268ea9 tr {
            background-color: transparent;
            border: none;
        }
        #st-04268ea9 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-04268ea9 br {
            line-height: 0em;
            margin: 0;
        }
        #st-04268ea9 sub {
            line-height: 0;
        }
        #st-04268ea9 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">rate</td>
    </tr>
        <tr><td colspan="1" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">12.3%</td>
    </tr>
    <tr>
        <td style="text-align:left;">45.6%</td>
    </tr>
    <tr>
        <td style="text-align:left;">78.9%</td>
    </tr>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,9)),i("details",g,[i("summary",null,[s[4]||(s[4]=i("a",{id:"StyledTables.fmt_percent!",href:"#StyledTables.fmt_percent!"},[i("span",{class:"jlbinding"},"StyledTables.fmt_percent!")],-1)),s[5]||(s[5]=e()),n(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[7]||(s[7]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    cols;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    digits,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    scale,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    suffix</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Format values in <code>cols</code> as percentage strings.</p><p>Multiplies each value by <code>scale</code> and appends <code>suffix</code>.</p><p><strong>Arguments</strong></p><ul><li><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</li></ul><p><strong>Keywords</strong></p><ul><li><p><code>digits</code>: decimal places for the percentage (default <code>1</code>).</p></li><li><p><code>scale</code>: multiplier applied before formatting (default <code>100</code>).</p></li><li><p><code>suffix</code>: string appended after the number (default <code>&quot;%&quot;</code>).</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/formatting#fmt_number!"><code>fmt_number!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_integer!"><code>fmt_integer!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt!"><code>fmt!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:rate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),n(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[6]||(s[6]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9c688caf4aadab4065f3bf8ae49aa79867639940/src/fmt.jl#L59",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[18]||(s[18]=a(`<hr><h2 id="fmt_integer!" tabindex="-1"><code>fmt_integer!</code> <a class="header-anchor" href="#fmt_integer!" aria-label="Permalink to &quot;\`fmt_integer!\` {#fmt_integer!}&quot;">​</a></h2><p>Round to the nearest integer and display without a decimal point.</p><p><strong>Signature:</strong> <code>fmt_integer!(tbl, cols)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(count </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_integer!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-f7d85d67">
    <style>
        #st-f7d85d67 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-f7d85d67 tr {
            background-color: transparent;
            border: none;
        }
        #st-f7d85d67 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-f7d85d67 br {
            line-height: 0em;
            margin: 0;
        }
        #st-f7d85d67 sub {
            line-height: 0;
        }
        #st-f7d85d67 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">count</td>
    </tr>
        <tr><td colspan="1" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">13</td>
    </tr>
    <tr>
        <td style="text-align:left;">7</td>
    </tr>
    <tr>
        <td style="text-align:left;">101</td>
    </tr>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,6)),i("details",E,[i("summary",null,[s[8]||(s[8]=i("a",{id:"StyledTables.fmt_integer!",href:"#StyledTables.fmt_integer!"},[i("span",{class:"jlbinding"},"StyledTables.fmt_integer!")],-1)),s[9]||(s[9]=e()),n(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[11]||(s[11]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_integer!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, cols) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Format numeric values in <code>cols</code> as integers (rounds to nearest).</p><p><strong>Arguments</strong></p><ul><li><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/formatting#fmt_number!"><code>fmt_number!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_percent!"><code>fmt_percent!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt!"><code>fmt!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_integer!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),n(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[10]||(s[10]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9c688caf4aadab4065f3bf8ae49aa79867639940/src/fmt.jl#L96",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[19]||(s[19]=a(`<hr><h2 id="fmt!" tabindex="-1"><code>fmt!</code> <a class="header-anchor" href="#fmt!" aria-label="Permalink to &quot;\`fmt!\` {#fmt!}&quot;">​</a></h2><p>Apply a fully custom formatter function.</p><p><strong>Signature:</strong> <code>fmt!(tbl, cols, f::Function)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p_value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.032</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.001</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.245</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:p_value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.05</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$(round(x; digits</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3))</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">*&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x; digits</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e5fa8c25">
    <style>
        #st-e5fa8c25 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e5fa8c25 tr {
            background-color: transparent;
            border: none;
        }
        #st-e5fa8c25 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e5fa8c25 br {
            line-height: 0em;
            margin: 0;
        }
        #st-e5fa8c25 sub {
            line-height: 0;
        }
        #st-e5fa8c25 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">p_value</td>
    </tr>
        <tr><td colspan="1" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">0.032*</td>
    </tr>
    <tr>
        <td style="text-align:left;">0.001*</td>
    </tr>
    <tr>
        <td style="text-align:left;">0.245</td>
    </tr>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Apply the same formatter to multiple columns at once:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], b </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$(Int(x))</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pts&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-de309a8c">
    <style>
        #st-de309a8c {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-de309a8c tr {
            background-color: transparent;
            border: none;
        }
        #st-de309a8c tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-de309a8c br {
            line-height: 0em;
            margin: 0;
        }
        #st-de309a8c sub {
            line-height: 0;
        }
        #st-de309a8c sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">a</td>
        <td style="font-weight:bold;text-align:left;">b</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">1 pts</td>
        <td style="text-align:left;">3 pts</td>
    </tr>
    <tr>
        <td style="text-align:left;">2 pts</td>
        <td style="text-align:left;">4 pts</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,9)),i("details",c,[i("summary",null,[s[12]||(s[12]=i("a",{id:"StyledTables.fmt!",href:"#StyledTables.fmt!"},[i("span",{class:"jlbinding"},"StyledTables.fmt!")],-1)),s[13]||(s[13]=e()),n(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[15]||(s[15]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, cols, f</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Apply a custom formatter function to values in <code>cols</code>.</p><p><code>f</code> receives the raw cell value and should return a display-ready value. Return <code>x</code> unchanged for <code>missing</code> if you want <a href="/StyledTables.jl/dev/reference/styling#sub_missing!"><code>sub_missing!</code></a> to handle it.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>cols</code>: column name(s) to format.</p></li><li><p><code>f</code>: formatter with signature <code>f(value) -&gt; Any</code>.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/formatting#fmt_number!"><code>fmt_number!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_percent!"><code>fmt_percent!</code></a>, <a href="/StyledTables.jl/dev/reference/formatting#fmt_integer!"><code>fmt_integer!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;≈</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$(round(Int, x))</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),n(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[14]||(s[14]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9c688caf4aadab4065f3bf8ae49aa79867639940/src/fmt.jl#L124",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})])])}const v=p(k,[["render",y]]);export{_ as __pageData,v as default};
