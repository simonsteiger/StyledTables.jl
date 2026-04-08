import{_ as p,C as h,o as d,c as r,aA as a,j as t,a as l,E as n,w as e}from"./chunks/framework.BA2Bz2Jl.js";const _=JSON.parse('{"title":"Annotations","description":"","frontmatter":{},"headers":[],"relativePath":"reference/annotations.md","filePath":"reference/annotations.md","lastUpdated":null}'),o={name:"reference/annotations.md"},k={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},E={class:"jldocstring custom-block",open:""};function c(y,s,b,u,F,f){const i=h("Badge");return d(),r("div",null,[s[14]||(s[14]=a(`<h1 id="Annotations" tabindex="-1">Annotations <a class="header-anchor" href="#Annotations" aria-label="Permalink to &quot;Annotations {#Annotations}&quot;">​</a></h1><p>These functions annotate the table: a title and subtitle appear at the top, footnotes and source notes at the bottom.</p><h2 id="tab_header!" tabindex="-1"><code>tab_header!</code> <a class="header-anchor" href="#tab_header!" aria-label="Permalink to &quot;\`tab_header!\` {#tab_header!}&quot;">​</a></h2><p>Add a title (and optional subtitle) above the column headers.</p><p><strong>Signature:</strong> <code>tab_header!(tbl, title; subtitle = nothing)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
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
</table></div>`,7)),t("details",k,[t("summary",null,[s[0]||(s[0]=t("a",{id:"StyledTables.tab_header!",href:"#StyledTables.tab_header!"},[t("span",{class:"jlbinding"},"StyledTables.tab_header!")],-1)),s[1]||(s[1]=l()),n(i,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[3]||(s[3]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subtitle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add a title and optional subtitle above the column headers.</p><p>The title renders bold; the subtitle renders italic.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR20/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>title</code>: main heading text.</p></li></ul><p><strong>Keywords</strong></p><ul><li><code>subtitle</code>: secondary heading text, or <code>nothing</code> (default).</li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR20/reference/structure#tab_spanner!"><code>tab_spanner!</code></a>, <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_source_note!"><code>tab_source_note!</code></a>, <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_footnote!"><code>tab_footnote!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;My Table&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; subtitle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Subtitle here&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,12)),n(i,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[2]||(s[2]=[t("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/bc2fe5b886915d9f6603f7acf4dc943aab3e3779/src/annotations.jl#L1",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[15]||(s[15]=a(`<h2 id="tab_footnote!" tabindex="-1"><code>tab_footnote!</code> <a class="header-anchor" href="#tab_footnote!" aria-label="Permalink to &quot;\`tab_footnote!\` {#tab_footnote!}&quot;">​</a></h2><p>Add column-annotated footnotes. An auto-numbered superscript attaches to the specified column header(s); the footnote text appears in the footnote area below the table. For general notes not attached to any column, use <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_source_note!"><code>tab_source_note!</code></a>.</p><p><strong>Signatures:</strong></p><ul><li><p><code>tab_footnote!(tbl, text =&gt; col)</code></p></li><li><p><code>tab_footnote!(tbl, text =&gt; [col1, col2])</code></p></li><li><p><code>tab_footnote!(tbl, text1 =&gt; col1, text2 =&gt; col2, ...)</code></p></li><li><p><code>tab_footnote!(tbl, d::AbstractDict)</code></p></li></ul><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GDP by Country&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Purchasing power parity adjusted&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-31e109aa">
    <style>
        #st-31e109aa {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-31e109aa tr {
            background-color: transparent;
            border: none;
        }
        #st-31e109aa tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-31e109aa br {
            line-height: 0em;
            margin: 0;
        }
        #st-31e109aa sub {
            line-height: 0;
        }
        #st-31e109aa sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="2" style="font-weight:bold;text-align:center;">GDP by Country</td>
    </tr>
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
</table></div><p>Annotate multiple columns with the same footnote:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Source: World Bank (2025)&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:country</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-34299f39">
    <style>
        #st-34299f39 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-34299f39 tr {
            background-color: transparent;
            border: none;
        }
        #st-34299f39 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-34299f39 br {
            line-height: 0em;
            margin: 0;
        }
        #st-34299f39 sub {
            line-height: 0;
        }
        #st-34299f39 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country<sup>1</sup></td>
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
    <tr><td colspan="2" style="font-size: 0.8em;"><sup>1</sup> Source: World Bank (2025)</td></tr>
</table></div><p>Multiple independent footnotes in one call:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(country </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;US&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;DE&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], gdp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], pop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">331</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">84</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df2)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;Purchasing power parity adjusted&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;Population in millions&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :pop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e32bf28f">
    <style>
        #st-e32bf28f {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e32bf28f tr {
            background-color: transparent;
            border: none;
        }
        #st-e32bf28f tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e32bf28f br {
            line-height: 0em;
            margin: 0;
        }
        #st-e32bf28f sub {
            line-height: 0;
        }
        #st-e32bf28f sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp<sup>1</sup></td>
        <td style="font-weight:bold;text-align:left;">pop<sup>2</sup></td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">US</td>
        <td style="text-align:left;">25.5</td>
        <td style="text-align:left;">331</td>
    </tr>
    <tr>
        <td style="text-align:left;">DE</td>
        <td style="text-align:left;">4.1</td>
        <td style="text-align:left;">84</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="3" style="font-size: 0.8em;"><sup>1</sup> Purchasing power parity adjusted<br/><sup>2</sup> Population in millions</td></tr>
</table></div>`,12)),t("details",g,[t("summary",null,[s[4]||(s[4]=t("a",{id:"StyledTables.tab_footnote!",href:"#StyledTables.tab_footnote!"},[t("span",{class:"jlbinding"},"StyledTables.tab_footnote!")],-1)),s[5]||(s[5]=l()),n(i,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[8]||(s[8]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pair...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add footnotes to the table.</p><p>Footnotes refer to specific columns. For placing general notes under the table, see <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_source_note!"><code>tab_source_note!</code></a>.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR20/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>args</code>: one or more <code>text =&gt; column(s)</code> pairs.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_source_note!"><code>tab_source_note!</code></a>, <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_header!"><code>tab_header!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;PPP adjusted&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :gdp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),n(i,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[6]||(s[6]=[t("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/bc2fe5b886915d9f6603f7acf4dc943aab3e3779/src/annotations.jl#L36",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1}),s[9]||(s[9]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Union</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{AbstractDict{</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AbstractString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Union{Vector{Symbol}, Vector{&lt;:AbstractString}}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}, AbstractVector{</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pair{&lt;:AbstractString, &lt;:Union{Vector{Symbol}, Vector{&lt;:AbstractString}}}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add footnotes from a dict or vector of pairs.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR20/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>d</code>: an <code>AbstractDict</code> or <code>AbstractVector</code> of <code>Pair</code>s mapping text to column names.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR20/reference/structure#tab_spanner!"><code>tab_spanner!</code></a>, <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_header!"><code>tab_header!</code></a>, <a href="/StyledTables.jl/previews/PR20/reference/structure#tab_stub!"><code>tab_stub!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;measured each month&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:efficacy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:safety</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;in years&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:age</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),n(i,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[7]||(s[7]=[t("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/bc2fe5b886915d9f6603f7acf4dc943aab3e3779/src/annotations.jl#L128",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[16]||(s[16]=a(`<h2 id="tab_source_note!" tabindex="-1"><code>tab_source_note!</code> <a class="header-anchor" href="#tab_source_note!" aria-label="Permalink to &quot;\`tab_source_note!\` {#tab_source_note!}&quot;">​</a></h2><p>Add a source-note line in the footer. Source notes span the full table width and are left-aligned. Each call appends another line.</p><p><strong>Signature:</strong> <code>tab_source_note!(tbl, text)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SummaryTables</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Multiline</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">note </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Multiline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Data: World Bank Open Data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Values in trillions USD&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GDP by Country&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, note)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-4f30bbc4">
    <style>
        #st-4f30bbc4 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-4f30bbc4 tr {
            background-color: transparent;
            border: none;
        }
        #st-4f30bbc4 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-4f30bbc4 br {
            line-height: 0em;
            margin: 0;
        }
        #st-4f30bbc4 sub {
            line-height: 0;
        }
        #st-4f30bbc4 sup {
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
        <td style="text-align:left;">Data: World Bank Open Data<br>Values in trillions USD</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    </tfoot>
</table></div>`,5)),t("details",E,[t("summary",null,[s[10]||(s[10]=t("a",{id:"StyledTables.tab_source_note!",href:"#StyledTables.tab_source_note!"},[t("span",{class:"jlbinding"},"StyledTables.tab_source_note!")],-1)),s[11]||(s[11]=l()),n(i,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[13]||(s[13]=a(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, text) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Add a source-note line in the table footer.</p><p>Source notes span the full table width and are left-aligned. Each call appends another line.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/previews/PR20/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>text</code>: source note text.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_footnote!"><code>tab_footnote!</code></a>, <a href="/StyledTables.jl/previews/PR20/reference/annotations#tab_header!"><code>tab_header!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Data: World Bank Open Data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),n(i,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[12]||(s[12]=[t("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/bc2fe5b886915d9f6603f7acf4dc943aab3e3779/src/annotations.jl#L169",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})])])}const m=p(o,[["render",c]]);export{_ as __pageData,m as default};
