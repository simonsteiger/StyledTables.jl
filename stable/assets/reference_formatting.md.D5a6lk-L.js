import{_ as r,C as h,o as p,c as d,aA as n,j as i,a as e,E as a,w as l}from"./chunks/framework.hJCjvgaE.js";const x=JSON.parse('{"title":"Formatting","description":"","frontmatter":{},"headers":[],"relativePath":"reference/formatting.md","filePath":"reference/formatting.md","lastUpdated":null}'),k={name:"reference/formatting.md"},o={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},E={class:"jldocstring custom-block",open:""},y={class:"jldocstring custom-block",open:""},c={class:"jldocstring custom-block",open:""},b={class:"jldocstring custom-block",open:""},F={class:"jldocstring custom-block",open:""};function m(u,s,C,f,T,v){const t=h("Badge");return p(),d("div",null,[s[28]||(s[28]=n('<h1 id="Formatting" tabindex="-1">Formatting <a class="header-anchor" href="#Formatting" aria-label="Permalink to &quot;Formatting {#Formatting}&quot;">​</a></h1><p>Formatters convert raw cell values into display strings <strong>before</strong> styling is applied. They leave the underlying <code>DataFrame</code> unchanged — they only affect the rendered output.</p><h2 id="format!" tabindex="-1"><code>format!</code> <a class="header-anchor" href="#format!" aria-label="Permalink to &quot;`format!` {#format!}&quot;">​</a></h2><p>The entry point for all formatting. Pass a formatter object and the columns to apply it to.</p>',4)),i("details",o,[i("summary",null,[s[0]||(s[0]=i("a",{id:"StyledTables.format!",href:"#StyledTables.format!"},[i("span",{class:"jlbinding"},"StyledTables.format!")],-1)),s[1]||(s[1]=e()),a(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[3]||(s[3]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(formatter, tbl, cols</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(formatter, tbl, cols</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AbstractVector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Append <code>formatter</code> to the format stack for each column in <code>cols</code>.</p><p><code>formatter</code> may be any <a href="/StyledTables.jl/stable/reference/formatting#AbstractFormatter"><code>AbstractFormatter</code></a> or a bare callable (automatically wrapped in <a href="/StyledTables.jl/stable/reference/formatting#FunctionFormatter"><code>FunctionFormatter</code></a>).</p><p>Formatters are applied in call order at render time: the first <code>format!</code> call runs first on the raw value. Stack <a href="/StyledTables.jl/stable/reference/formatting#MissingFormatter"><code>MissingFormatter</code></a> last to intercept any <code>missing</code> values that remain after earlier formatters.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NumberFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MissingFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;—&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,6)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[2]||(s[2]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/formatting.jl#L110-L131",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[29]||(s[29]=i("h2",{id:"Built-in-formatters",tabindex:"-1"},[e("Built-in formatters "),i("a",{class:"header-anchor",href:"#Built-in-formatters","aria-label":'Permalink to "Built-in formatters {#Built-in-formatters}"'},"​")],-1)),s[30]||(s[30]=i("h3",{id:"AbstractFormatter",tabindex:"-1"},[i("code",null,"AbstractFormatter"),e(),i("a",{class:"header-anchor",href:"#AbstractFormatter","aria-label":'Permalink to "`AbstractFormatter` {#AbstractFormatter}"'},"​")],-1)),i("details",g,[i("summary",null,[s[4]||(s[4]=i("a",{id:"StyledTables.AbstractFormatter",href:"#StyledTables.AbstractFormatter"},[i("span",{class:"jlbinding"},"StyledTables.AbstractFormatter")],-1)),s[5]||(s[5]=e()),a(t,{type:"info",class:"jlObjectType jlType",text:"Type"})]),s[7]||(s[7]=n(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">AbstractFormatter</span></span></code></pre></div><p>Supertype for all formatters used with <a href="/StyledTables.jl/stable/reference/formatting#format!"><code>format!</code></a>.</p><p>Implement <code>(f::MyFormatter)(x)</code> to define a custom formatter:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PrefixFormatter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> AbstractFormatter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    prefix</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">String</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(f</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PrefixFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)(x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ismissing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> f</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">prefix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x)</span></span></code></pre></div>`,4)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[6]||(s[6]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/types.jl#L1-L14",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[31]||(s[31]=n(`<h3 id="NumberFormatter" tabindex="-1"><code>NumberFormatter</code> <a class="header-anchor" href="#NumberFormatter" aria-label="Permalink to &quot;\`NumberFormatter\` {#NumberFormatter}&quot;">​</a></h3><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.2345</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6.789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.001</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NumberFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NumberFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
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
</table></div>`,3)),i("details",E,[i("summary",null,[s[8]||(s[8]=i("a",{id:"StyledTables.NumberFormatter",href:"#StyledTables.NumberFormatter"},[i("span",{class:"jlbinding"},"StyledTables.NumberFormatter")],-1)),s[9]||(s[9]=e()),a(t,{type:"info",class:"jlObjectType jlType",text:"Type"})]),s[11]||(s[11]=n('<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NumberFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, trailing_zeros </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Format numeric values to a fixed number of decimal places.</p><ul><li><p><code>digits</code>: number of decimal places.</p></li><li><p><code>trailing_zeros</code>: when <code>false</code>, strip trailing zeros after the decimal point.</p></li></ul>',3)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[10]||(s[10]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/formatting.jl#L14-L21",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[32]||(s[32]=n(`<h3 id="PercentFormatter" tabindex="-1"><code>PercentFormatter</code> <a class="header-anchor" href="#PercentFormatter" aria-label="Permalink to &quot;\`PercentFormatter\` {#PercentFormatter}&quot;">​</a></h3><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.123</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.456</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.789</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PercentFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:rate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
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
</table></div><p>For already-scaled values (e.g., 12.3 stored as 12.3%):</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rate </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">45.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">78.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df2)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PercentFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, scale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:rate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
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
</table></div>`,6)),i("details",y,[i("summary",null,[s[12]||(s[12]=i("a",{id:"StyledTables.PercentFormatter",href:"#StyledTables.PercentFormatter"},[i("span",{class:"jlbinding"},"StyledTables.PercentFormatter")],-1)),s[13]||(s[13]=e()),a(t,{type:"info",class:"jlObjectType jlType",text:"Type"})]),s[15]||(s[15]=n('<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PercentFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, scale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 100</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, suffix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;%&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>Multiply a value by <code>scale</code>, format to <code>digits</code> decimal places, and append <code>suffix</code>.</p>',2)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[14]||(s[14]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/formatting.jl#L39-L43",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[33]||(s[33]=n(`<h3 id="IntegerFormatter" tabindex="-1"><code>IntegerFormatter</code> <a class="header-anchor" href="#IntegerFormatter" aria-label="Permalink to &quot;\`IntegerFormatter\` {#IntegerFormatter}&quot;">​</a></h3><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(count </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100.9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IntegerFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
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
</table></div>`,3)),i("details",c,[i("summary",null,[s[16]||(s[16]=i("a",{id:"StyledTables.IntegerFormatter",href:"#StyledTables.IntegerFormatter"},[i("span",{class:"jlbinding"},"StyledTables.IntegerFormatter")],-1)),s[17]||(s[17]=e()),a(t,{type:"info",class:"jlObjectType jlType",text:"Type"})]),s[19]||(s[19]=n('<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">IntegerFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><p>Round numeric values to the nearest integer and format without a decimal point.</p>',2)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[18]||(s[18]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/formatting.jl#L58-L62",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[34]||(s[34]=i("h3",{id:"MissingFormatter",tabindex:"-1"},[i("code",null,"MissingFormatter"),e(),i("a",{class:"header-anchor",href:"#MissingFormatter","aria-label":'Permalink to "`MissingFormatter` {#MissingFormatter}"'},"​")],-1)),s[35]||(s[35]=i("p",null,[e("Stack "),i("code",null,"MissingFormatter"),e(" last so that earlier numeric formatters run first on non-missing values.")],-1)),i("details",b,[i("summary",null,[s[20]||(s[20]=i("a",{id:"StyledTables.MissingFormatter",href:"#StyledTables.MissingFormatter"},[i("span",{class:"jlbinding"},"StyledTables.MissingFormatter")],-1)),s[21]||(s[21]=e()),a(t,{type:"info",class:"jlObjectType jlType",text:"Type"})]),s[23]||(s[23]=n('<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MissingFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(replacement)</span></span></code></pre></div><p>Return <code>replacement</code> when a value <code>ismissing</code>; otherwise pass it through unchanged. Stack this last so earlier numeric formatters run first.</p>',2)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[22]||(s[22]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/formatting.jl#L67-L72",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[36]||(s[36]=n(`<h3 id="FunctionFormatter" tabindex="-1"><code>FunctionFormatter</code> <a class="header-anchor" href="#FunctionFormatter" aria-label="Permalink to &quot;\`FunctionFormatter\` {#FunctionFormatter}&quot;">​</a></h3><p>Pass a bare callable to <code>format!</code> — it is wrapped in a <code>FunctionFormatter</code> automatically. You rarely need to construct <code>FunctionFormatter</code> directly.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(p_value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.032</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.001</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.245</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:p_value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pval</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    pval </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.05</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&lt; 0.05&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;n.s.&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-d9e84e8e">
    <style>
        #st-d9e84e8e {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-d9e84e8e tr {
            background-color: transparent;
            border: none;
        }
        #st-d9e84e8e tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-d9e84e8e br {
            line-height: 0em;
            margin: 0;
        }
        #st-d9e84e8e sub {
            line-height: 0;
        }
        #st-d9e84e8e sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">p_value</td>
    </tr>
        <tr><td colspan="1" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">&lt; 0.05</td>
    </tr>
    <tr>
        <td style="text-align:left;">&lt; 0.05</td>
    </tr>
    <tr>
        <td style="text-align:left;">n.s.</td>
    </tr>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,4)),i("details",F,[i("summary",null,[s[24]||(s[24]=i("a",{id:"StyledTables.FunctionFormatter",href:"#StyledTables.FunctionFormatter"},[i("span",{class:"jlbinding"},"StyledTables.FunctionFormatter")],-1)),s[25]||(s[25]=e()),a(t,{type:"info",class:"jlObjectType jlType",text:"Type"})]),s[27]||(s[27]=n('<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">FunctionFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(f)</span></span></code></pre></div><p>Wraps a bare callable <code>f</code> as an <a href="/StyledTables.jl/stable/reference/formatting#AbstractFormatter"><code>AbstractFormatter</code></a>. Created automatically when a <code>Function</code> is passed to <a href="/StyledTables.jl/stable/reference/formatting#format!"><code>format!</code></a>.</p>',2)),a(t,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...s[26]||(s[26]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/9dad4dae0f6b716949b8a54c81b1acf8dfb5f6f4/src/formatting.jl#L3-L8",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[37]||(s[37]=n(`<h2 id="Stacking-formatters" tabindex="-1">Stacking formatters <a class="header-anchor" href="#Stacking-formatters" aria-label="Permalink to &quot;Stacking formatters {#Stacking-formatters}&quot;">​</a></h2><p>Each <code>format!</code> call appends to the formatter stack for a column. Formatters run in call order at render time. Each formatter in the stack receives the output of the previous one, not the original raw value. Use this to combine a numeric formatter with a fallback for missing values:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">missing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NumberFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># runs first on non-missing</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MissingFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;—&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># intercepts any remaining missing</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-5aa81708">
    <style>
        #st-5aa81708 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-5aa81708 tr {
            background-color: transparent;
            border: none;
        }
        #st-5aa81708 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-5aa81708 br {
            line-height: 0em;
            margin: 0;
        }
        #st-5aa81708 sub {
            line-height: 0;
        }
        #st-5aa81708 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">x</td>
    </tr>
        <tr><td colspan="1" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">1.5</td>
    </tr>
    <tr>
        <td style="text-align:left;">—</td>
    </tr>
    <tr>
        <td style="text-align:left;">3.0</td>
    </tr>
    <tr><td colspan="1" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Custom-formatters" tabindex="-1">Custom formatters <a class="header-anchor" href="#Custom-formatters" aria-label="Permalink to &quot;Custom formatters {#Custom-formatters}&quot;">​</a></h2><p>Implement <code>AbstractFormatter</code> to define reusable custom formatters:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PrefixFormatter </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> AbstractFormatter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    prefix</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">String</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(f</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PrefixFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)(x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ismissing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> f</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">prefix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x)</span></span></code></pre></div><p>Then use it like any built-in formatter:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PrefixFormatter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;€&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:price</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div>`,9))])}const A=r(k,[["render",m]]);export{x as __pageData,A as default};
