import{_ as i,o as t,c as a,aA as n}from"./chunks/framework.Cq-G94Lz.js";const o=JSON.parse('{"title":"StyledTables","description":"","frontmatter":{"layout":"home","hero":{"name":"StyledTables","text":null,"tagline":"Apply custom formatting to tables in Julia - render HTML, docx, LaTeX and Typst","image":{"src":"logo.svg","alt":"StyledTables"},"actions":[{"theme":"brand","text":"Get started","link":"/getting_started"},{"theme":"alt","text":"View on Github","link":"https://github.com/simonsteiger/StyledTables.jl"},{"theme":"alt","text":"API Reference","link":"/resources/api"}]}},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":null}'),e={name:"index.md"};function l(h,s,p,d,k,r){return t(),a("div",null,[...s[0]||(s[0]=[n(`<h1 id="StyledTables" tabindex="-1">StyledTables <a class="header-anchor" href="#StyledTables" aria-label="Permalink to &quot;StyledTables {#StyledTables}&quot;">​</a></h1><p>StyledTables provides flexible formatting functionality for tabular data. Tables can be exported as HTML, docx, LaTeX, and Typst files. It builds on data structures defined in <a href="https://pumasai.github.io/SummaryTables.jl/stable/" target="_blank" rel="noreferrer">SummaryTables.jl</a>, with an API inspired by R&#39;s <a href="https://gt.rstudio.com/" target="_blank" rel="noreferrer">gt</a> package.</p><p>The premise of <code>StyledTables.jl</code> is that your data come summarised; this package only includes formatting and styling functionality and never modifies the underlying dataset.</p><h2 id="Examples" tabindex="-1">Examples <a class="header-anchor" href="#Examples" aria-label="Permalink to &quot;Examples {#Examples}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames, Chain</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Statistics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mean</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @chain</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(StyledTables</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">penguins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">begin</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    dropmissing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    groupby</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:species</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    combine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Cols</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">r&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">bill</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mean </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> identity)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    sort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_row_group!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Bill measures&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bill_length_mm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bill_depth_mm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">labels </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :species</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Species&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :bill_length_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Length&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :bill_depth_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Depth&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, labels)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e63e4bdb">
    <style>
        #st-e63e4bdb {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e63e4bdb tr {
            background-color: transparent;
            border: none;
        }
        #st-e63e4bdb tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e63e4bdb br {
            line-height: 0em;
            margin: 0;
        }
        #st-e63e4bdb sub {
            line-height: 0;
        }
        #st-e63e4bdb sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Species</td>
        <td style="font-weight:bold;text-align:left;">Length</td>
        <td style="font-weight:bold;text-align:left;">Depth</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">39</td>
        <td style="text-align:left;">18.4</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Gentoo</td>
        <td style="text-align:left;">47.6</td>
        <td style="text-align:left;">15</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">38.5</td>
        <td style="text-align:left;">18.2</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Chinstrap</td>
        <td style="text-align:left;">48.8</td>
        <td style="text-align:left;">18.4</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Torgersen</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">39</td>
        <td style="text-align:left;">18.5</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Installation" tabindex="-1">Installation <a class="header-anchor" href="#Installation" aria-label="Permalink to &quot;Installation {#Installation}&quot;">​</a></h2><p>StyledTables is not yet registered. Install from GitHub:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Pkg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Pkg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://github.com/simonsteiger/StyledTables.jl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div>`,9)])])}const E=i(e,[["render",l]]);export{o as __pageData,E as default};
