import{_ as s,o as i,c as n,aA as e}from"./chunks/framework.BbYWnrLV.js";const g=JSON.parse('{"title":"Footnotes everywhere","description":"","frontmatter":{},"headers":[],"relativePath":"examples/footnotes.md","filePath":"examples/footnotes.md","lastUpdated":null}'),a={name:"examples/footnotes.md"};function l(d,t,p,r,h,o){return i(),n("div",null,[...t[0]||(t[0]=[e(`<h1 id="Footnotes-everywhere" tabindex="-1">Footnotes everywhere <a class="header-anchor" href="#Footnotes-everywhere" aria-label="Permalink to &quot;Footnotes everywhere {#Footnotes-everywhere}&quot;">​</a></h1><p>Here we&#39;ll showcase how to place footnotes in three different places.</p><table tabindex="0"><thead><tr><th style="text-align:right;">Target</th><th style="text-align:right;">Constructor</th></tr></thead><tbody><tr><td style="text-align:right;">Column header</td><td style="text-align:right;"><code>:col =&gt; &quot;note&quot;</code></td></tr><tr><td style="text-align:right;">Spanner label</td><td style="text-align:right;"><code>SpannerTarget(label) =&gt; &quot;note&quot;</code></td></tr><tr><td style="text-align:right;">Body cell</td><td style="text-align:right;"><code>CellTarget(row, col) =&gt; &quot;note&quot;</code></td></tr></tbody></table><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    country  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;United States&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Germany&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Japan&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gdp_usd  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">25.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    gdp_ppp  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">27.3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6.2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    pop_m    </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">331</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">84</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">125</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="vp-raw-html"><div><div style = "float: left;"><span>3×4 DataFrame</span></div><div style = "clear: both;"></div></div><div class = "data-frame" style = "overflow-x: scroll;"><table class = "data-frame" style = "margin-bottom: 6px;"><thead><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;">Row</th><th style = "text-align: left;">country</th><th style = "text-align: left;">gdp_usd</th><th style = "text-align: left;">gdp_ppp</th><th style = "text-align: left;">pop_m</th></tr><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;"></th><th title = "String" style = "text-align: left;">String</th><th title = "Float64" style = "text-align: left;">Float64</th><th title = "Float64" style = "text-align: left;">Float64</th><th title = "Int64" style = "text-align: left;">Int64</th></tr></thead><tbody><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">1</td><td style = "text-align: left;">United States</td><td style = "text-align: right;">25.5</td><td style = "text-align: right;">27.3</td><td style = "text-align: right;">331</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">2</td><td style = "text-align: left;">Germany</td><td style = "text-align: right;">4.1</td><td style = "text-align: right;">5.2</td><td style = "text-align: right;">84</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">3</td><td style = "text-align: left;">Japan</td><td style = "text-align: right;">4.2</td><td style = "text-align: right;">6.2</td><td style = "text-align: right;">125</td></tr></tbody></table></div></div><h2 id="Column-footnotes" tabindex="-1">Column footnotes <a class="header-anchor" href="#Column-footnotes" aria-label="Permalink to &quot;Column footnotes {#Column-footnotes}&quot;">​</a></h2><p>Typically, all we want and need is to annotate a single column name:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp_usd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp_ppp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Trillions USD, 2025&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pop_m</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Millions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div class="vp-raw-html"><table id="st-30ec0ae8">
    <style>
        #st-30ec0ae8 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-30ec0ae8 tr {
            background-color: transparent;
            border: none;
        }
        #st-30ec0ae8 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-30ec0ae8 br {
            line-height: 0em;
            margin: 0;
        }
        #st-30ec0ae8 sub {
            line-height: 0;
        }
        #st-30ec0ae8 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp_usd<sup>1</sup></td>
        <td style="font-weight:bold;text-align:left;">gdp_ppp<sup>1</sup></td>
        <td style="font-weight:bold;text-align:left;">pop_m<sup>2</sup></td>
    </tr>
        <tr><td colspan="4" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">United States</td>
        <td style="text-align:left;">25.5</td>
        <td style="text-align:left;">27.3</td>
        <td style="text-align:left;">331</td>
    </tr>
    <tr>
        <td style="text-align:left;">Germany</td>
        <td style="text-align:left;">4.1</td>
        <td style="text-align:left;">5.2</td>
        <td style="text-align:left;">84</td>
    </tr>
    <tr>
        <td style="text-align:left;">Japan</td>
        <td style="text-align:left;">4.2</td>
        <td style="text-align:left;">6.2</td>
        <td style="text-align:left;">125</td>
    </tr>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="4" style="font-size: 0.8em;"><sup>1</sup> Trillions USD, 2025<br/><sup>2</sup> Millions</td></tr>
</table></div><h2 id="Spanner-footnotes" tabindex="-1">Spanner footnotes <a class="header-anchor" href="#Spanner-footnotes" aria-label="Permalink to &quot;Spanner footnotes {#Spanner-footnotes}&quot;">​</a></h2><p>When we&#39;re using column spanners and our footnote applies to all columns under that spanner, we of course don&#39;t want to target all these column names with the same footnote. Instead, we can use <a href="/StyledTables.jl/previews/PR46/resources/api#StyledTables.SpannerTarget"><code>SpannerTarget</code></a> to annotate only the spanner label:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp_usd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp_ppp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;GDP (Trillions)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SpannerTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;GDP (Trillions)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Estimated values&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div class="vp-raw-html"><table id="st-183a43c4">
    <style>
        #st-183a43c4 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-183a43c4 tr {
            background-color: transparent;
            border: none;
        }
        #st-183a43c4 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-183a43c4 br {
            line-height: 0em;
            margin: 0;
        }
        #st-183a43c4 sub {
            line-height: 0;
        }
        #st-183a43c4 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">GDP (Trillions)<sup>1</sup></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp_usd</td>
        <td style="font-weight:bold;text-align:left;">gdp_ppp</td>
        <td style="font-weight:bold;text-align:left;">pop_m</td>
    </tr>
        <tr><td colspan="4" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">United States</td>
        <td style="text-align:left;">25.5</td>
        <td style="text-align:left;">27.3</td>
        <td style="text-align:left;">331</td>
    </tr>
    <tr>
        <td style="text-align:left;">Germany</td>
        <td style="text-align:left;">4.1</td>
        <td style="text-align:left;">5.2</td>
        <td style="text-align:left;">84</td>
    </tr>
    <tr>
        <td style="text-align:left;">Japan</td>
        <td style="text-align:left;">4.2</td>
        <td style="text-align:left;">6.2</td>
        <td style="text-align:left;">125</td>
    </tr>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="4" style="font-size: 0.8em;"><sup>1</sup> Estimated values</td></tr>
</table></div><h2 id="Cell-footnotes" tabindex="-1">Cell footnotes <a class="header-anchor" href="#Cell-footnotes" aria-label="Permalink to &quot;Cell footnotes {#Cell-footnotes}&quot;">​</a></h2><p>Last but not least, we may also want to annotate specific values in our table. We do this by targetting cells using <a href="/StyledTables.jl/previews/PR46/resources/api#StyledTables.CellTarget"><code>CellTarget</code></a>. You can specify the cell location in two ways:</p><p><strong>By row index</strong> (1-based):</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">japan_gdp_ppp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> CellTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp_ppp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, japan_gdp_ppp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Preliminary estimate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div class="vp-raw-html"><table id="st-027359de">
    <style>
        #st-027359de {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-027359de tr {
            background-color: transparent;
            border: none;
        }
        #st-027359de tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-027359de br {
            line-height: 0em;
            margin: 0;
        }
        #st-027359de sub {
            line-height: 0;
        }
        #st-027359de sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">country</td>
        <td style="font-weight:bold;text-align:left;">gdp_usd</td>
        <td style="font-weight:bold;text-align:left;">gdp_ppp</td>
        <td style="font-weight:bold;text-align:left;">pop_m</td>
    </tr>
        <tr><td colspan="4" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">United States</td>
        <td style="text-align:left;">25.5</td>
        <td style="text-align:left;">27.3</td>
        <td style="text-align:left;">331</td>
    </tr>
    <tr>
        <td style="text-align:left;">Germany</td>
        <td style="text-align:left;">4.1</td>
        <td style="text-align:left;">5.2</td>
        <td style="text-align:left;">84</td>
    </tr>
    <tr>
        <td style="text-align:left;">Japan</td>
        <td style="text-align:left;">4.2</td>
        <td style="text-align:left;">6.2<sup>1</sup></td>
        <td style="text-align:left;">125</td>
    </tr>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="4" style="font-size: 0.8em;"><sup>1</sup> Preliminary estimate</td></tr>
</table></div><p><strong>By stub value</strong> (requires <a href="/StyledTables.jl/previews/PR46/reference/structure#StyledTables.stub!"><code>stub!</code></a>):</p><p>If a stub column exists, you may target rows by the stub value rather than the numeric index. This option offers better readability over numeric indices, and if you expect your rows to change order it is also the more robust and maintainable choice.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">stub!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:country</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">japan_gdp_ppp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> CellTarget</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Stub</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Japan&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:gdp_ppp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, japan_gdp_ppp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Preliminary estimate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div class="vp-raw-html"><table id="st-c0353f41">
    <style>
        #st-c0353f41 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-c0353f41 tr {
            background-color: transparent;
            border: none;
        }
        #st-c0353f41 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-c0353f41 br {
            line-height: 0em;
            margin: 0;
        }
        #st-c0353f41 sub {
            line-height: 0;
        }
        #st-c0353f41 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:left;"></td>
        <td style="font-weight:bold;text-align:left;">gdp_usd</td>
        <td style="font-weight:bold;text-align:left;">gdp_ppp</td>
        <td style="font-weight:bold;text-align:left;">pop_m</td>
    </tr>
        <tr><td colspan="4" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">United States</td>
        <td style="text-align:left;">25.5</td>
        <td style="text-align:left;">27.3</td>
        <td style="text-align:left;">331</td>
    </tr>
    <tr>
        <td style="text-align:left;">Germany</td>
        <td style="text-align:left;">4.1</td>
        <td style="text-align:left;">5.2</td>
        <td style="text-align:left;">84</td>
    </tr>
    <tr>
        <td style="text-align:left;">Japan</td>
        <td style="text-align:left;">4.2</td>
        <td style="text-align:left;">6.2<sup>1</sup></td>
        <td style="text-align:left;">125</td>
    </tr>
    <tr><td colspan="4" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="4" style="font-size: 0.8em;"><sup>1</sup> Preliminary estimate</td></tr>
</table></div>`,22)])])}const y=s(a,[["render",l]]);export{g as __pageData,y as default};
