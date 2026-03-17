import{_ as d,C as o,o as p,c as r,aA as e,j as s,a as n,E as a,w as l}from"./chunks/framework.CJc6AJio.js";const _=JSON.parse('{"title":"Annotations","description":"","frontmatter":{},"headers":[],"relativePath":"reference/annotations.md","filePath":"reference/annotations.md","lastUpdated":null}'),h={name:"reference/annotations.md"},k={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},c={class:"jldocstring custom-block",open:""};function E(b,t,y,u,f,F){const i=o("Badge");return p(),r("div",null,[t[12]||(t[12]=e(`<h1 id="Annotations" tabindex="-1">Annotations <a class="header-anchor" href="#Annotations" aria-label="Permalink to &quot;Annotations {#Annotations}&quot;">​</a></h1><p>These functions add metadata to the table: a title and subtitle at the top, footnotes at the bottom, and source notes in the footer.</p><hr><h2 id="tab_header!" tabindex="-1"><code>tab_header!</code> <a class="header-anchor" href="#tab_header!" aria-label="Permalink to &quot;\`tab_header!\` {#tab_header!}&quot;">​</a></h2><p>Add a title (and optional subtitle) above the column headers.</p><p><strong>Signature:</strong> <code>tab_header!(tbl, title; subtitle = nothing)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(country </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;US&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DE&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;JP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], gdp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GDP by Country&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; subtitle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Trillions USD, 2025&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:country</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Country&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;GDP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_number!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-ec03239d">
    <style>
        #st-ec03239d {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-ec03239d tr {
            background-color: transparent;
            border: none;
        }
        #st-ec03239d tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-ec03239d br {
            line-height: 0em;
            margin: 0;
        }
        #st-ec03239d sub {
            line-height: 0;
        }
        #st-ec03239d sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="2" style="font-weight:bold;text-align:center;">GDP by Country</td>
    </tr>
    <tr>
        <td colspan="2" style="font-style:italic;text-align:center;">Trillions USD, 2025</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Country</td>
        <td style="font-weight:bold;text-align:left;">GDP</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">US</td>
        <td style="text-align:left;">25.5</td>
    </tr>
    <tr>
        <td style="text-align:left;">DE</td>
        <td style="text-align:left;">4.1</td>
    </tr>
    <tr>
        <td style="text-align:left;">JP</td>
        <td style="text-align:left;">4.2</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,8)),s("details",k,[s("summary",null,[t[0]||(t[0]=s("a",{id:"StyledTables.tab_header!",href:"#StyledTables.tab_header!"},[s("span",{class:"jlbinding"},"StyledTables.tab_header!")],-1)),t[1]||(t[1]=n()),a(i,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),t[3]||(t[3]=e(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subtitle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add a title and optional subtitle above the column headers.</p><p>The title is rendered bold; the subtitle is rendered italic.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR6/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>title</code>: main heading text.</p></li></ul><p><strong>Keywords</strong></p><ul><li><code>subtitle</code>: secondary heading text, or <code>nothing</code> (default).</li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR6/reference/structure#tab_spanner!"><code>tab_spanner!</code></a>, <a href="/StyledTables.jl/previews/PR6/reference/annotations#tab_source_note!"><code>tab_source_note!</code></a>, <a href="/StyledTables.jl/previews/PR6/reference/annotations#tab_footnote!"><code>tab_footnote!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;My Table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; subtitle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Subtitle here&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),a(i,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...t[2]||(t[2]=[s("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/206927c2b6fe75bb16e410acce63b02be31f0a22/src/modifiers.jl#L297",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),t[13]||(t[13]=e(`<hr><h2 id="tab_footnote!" tabindex="-1"><code>tab_footnote!</code> <a class="header-anchor" href="#tab_footnote!" aria-label="Permalink to &quot;\`tab_footnote!\` {#tab_footnote!}&quot;">​</a></h2><p>Add a footnote. Without <code>columns</code>, the text appears as a table-level note. With <code>columns</code>, an auto-numbered superscript is appended to those column headers and the footnote text is listed below.</p><p><strong>Signatures:</strong></p><ul><li><p><code>tab_footnote!(tbl, text)</code> — table-level footnote</p></li><li><p><code>tab_footnote!(tbl, text; columns = [:col1, :col2])</code> — column-annotated footnote</p></li></ul><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GDP by Country&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Source: World Bank (2025)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-5c4b9d08">
    <style>
        #st-5c4b9d08 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-5c4b9d08 tr {
            background-color: transparent;
            border: none;
        }
        #st-5c4b9d08 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-5c4b9d08 br {
            line-height: 0em;
            margin: 0;
        }
        #st-5c4b9d08 sub {
            line-height: 0;
        }
        #st-5c4b9d08 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="2" style="font-weight:bold;text-align:center;">GDP by Country</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">US</td>
        <td style="text-align:left;">25.5</td>
    </tr>
    <tr>
        <td style="text-align:left;">DE</td>
        <td style="text-align:left;">4.1</td>
    </tr>
    <tr>
        <td style="text-align:left;">JP</td>
        <td style="text-align:left;">4.2</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="2" style="font-size: 0.8em;">Source: World Bank (2025)</td></tr>
</table></div><p>Annotating a specific column:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Purchasing power parity adjusted&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; columns </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-953903f6">
    <style>
        #st-953903f6 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-953903f6 tr {
            background-color: transparent;
            border: none;
        }
        #st-953903f6 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-953903f6 br {
            line-height: 0em;
            margin: 0;
        }
        #st-953903f6 sub {
            line-height: 0;
        }
        #st-953903f6 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp<sup>1</sup></td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">US</td>
        <td style="text-align:left;">25.5</td>
    </tr>
    <tr>
        <td style="text-align:left;">DE</td>
        <td style="text-align:left;">4.1</td>
    </tr>
    <tr>
        <td style="text-align:left;">JP</td>
        <td style="text-align:left;">4.2</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="2" style="font-size: 0.8em;"><sup>1</sup> Purchasing power parity adjusted</td></tr>
</table></div>`,10)),s("details",g,[s("summary",null,[t[4]||(t[4]=s("a",{id:"StyledTables.tab_footnote!",href:"#StyledTables.tab_footnote!"},[s("span",{class:"jlbinding"},"StyledTables.tab_footnote!")],-1)),t[5]||(t[5]=n()),a(i,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),t[7]||(t[7]=e(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    text;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    columns</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add a footnote to the table.</p><p>Without <code>columns</code>, <code>text</code> is a table-level note appended below the body. With <code>columns</code>, an auto-numbered superscript is attached to those column headers and <code>text</code> appears in the footnote area.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR6/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>text</code>: footnote text.</p></li></ul><p><strong>Keywords</strong></p><ul><li><code>columns</code>: column names to annotate with a superscript, or <code>nothing</code> (default).</li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR6/reference/annotations#tab_source_note!"><code>tab_source_note!</code></a>, <a href="/StyledTables.jl/previews/PR6/reference/annotations#tab_header!"><code>tab_header!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Source: World Bank&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;PPP adjusted&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; columns </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),a(i,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...t[6]||(t[6]=[s("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/206927c2b6fe75bb16e410acce63b02be31f0a22/src/modifiers.jl#L332",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),t[14]||(t[14]=e(`<hr><h2 id="tab_source_note!" tabindex="-1"><code>tab_source_note!</code> <a class="header-anchor" href="#tab_source_note!" aria-label="Permalink to &quot;\`tab_source_note!\` {#tab_source_note!}&quot;">​</a></h2><p>Add a source-note line in the table footer. Source notes appear below any data rows and span the full table width. Multiple calls stack additional lines.</p><p><strong>Signature:</strong> <code>tab_source_note!(tbl, text)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GDP by Country&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Data: World Bank Open Data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Values in trillions USD&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-9e5348f9">
    <style>
        #st-9e5348f9 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-9e5348f9 tr {
            background-color: transparent;
            border: none;
        }
        #st-9e5348f9 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-9e5348f9 br {
            line-height: 0em;
            margin: 0;
        }
        #st-9e5348f9 sub {
            line-height: 0;
        }
        #st-9e5348f9 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="2" style="font-weight:bold;text-align:center;">GDP by Country</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">US</td>
        <td style="text-align:left;">25.5</td>
    </tr>
    <tr>
        <td style="text-align:left;">DE</td>
        <td style="text-align:left;">4.1</td>
    </tr>
    <tr>
        <td style="text-align:left;">JP</td>
        <td style="text-align:left;">4.2</td>
    </tr>
    <tfoot>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Data: World Bank Open Data</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="text-align:left;">Values in trillions USD</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    </tfoot>
</table></div>`,6)),s("details",c,[s("summary",null,[t[8]||(t[8]=s("a",{id:"StyledTables.tab_source_note!",href:"#StyledTables.tab_source_note!"},[s("span",{class:"jlbinding"},"StyledTables.tab_source_note!")],-1)),t[9]||(t[9]=n()),a(i,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),t[11]||(t[11]=e(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, text) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add a source-note line in the table footer.</p><p>Source notes span the full table width and are left-aligned. Multiple calls stack additional lines in the order they are added.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR6/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>text</code>: source note text.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR6/reference/annotations#tab_footnote!"><code>tab_footnote!</code></a>, <a href="/StyledTables.jl/previews/PR6/reference/annotations#tab_header!"><code>tab_header!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Data: World Bank Open Data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),a(i,{type:"info",class:"source-link",text:"source"},{default:l(()=>[...t[10]||(t[10]=[s("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/206927c2b6fe75bb16e410acce63b02be31f0a22/src/modifiers.jl#L453",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})])])}const m=d(h,[["render",E]]);export{_ as __pageData,m as default};
