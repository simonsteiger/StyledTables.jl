import{_ as n,o as s,c as i,aA as e}from"./chunks/framework.DBCB9bvO.js";const g=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"getting_started.md","filePath":"getting_started.md","lastUpdated":null}'),a={name:"getting_started.md"};function l(r,t,d,h,p,o){return s(),i("div",null,[...t[0]||(t[0]=[e(`<h1 id="Getting-Started" tabindex="-1">Getting Started <a class="header-anchor" href="#Getting-Started" aria-label="Permalink to &quot;Getting Started {#Getting-Started}&quot;">​</a></h1><h2 id="Installation" tabindex="-1">Installation <a class="header-anchor" href="#Installation" aria-label="Permalink to &quot;Installation {#Installation}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Pkg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Pkg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;StyledTables&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="Your-first-table" tabindex="-1">Your first table <a class="header-anchor" href="#Your-first-table" aria-label="Permalink to &quot;Your first table {#Your-first-table}&quot;">​</a></h2><p>The workflow almost always starts with a <code>DataFrame</code> and ends with <code>render()</code>.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    treatment </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Placebo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Low Dose&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;High Dose&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    response </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.38</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.61</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-1734fac8">
    <style>
        #st-1734fac8 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-1734fac8 tr {
            background-color: transparent;
            border: none;
        }
        #st-1734fac8 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-1734fac8 br {
            line-height: 0em;
            margin: 0;
        }
        #st-1734fac8 sub {
            line-height: 0;
        }
        #st-1734fac8 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">treatment</td>
        <td style="font-weight:bold;text-align:left;">n</td>
        <td style="font-weight:bold;text-align:left;">response</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Placebo</td>
        <td style="text-align:left;">30</td>
        <td style="text-align:left;">0.12</td>
    </tr>
    <tr>
        <td style="text-align:left;">Low Dose</td>
        <td style="text-align:left;">30</td>
        <td style="text-align:left;">0.38</td>
    </tr>
    <tr>
        <td style="text-align:left;">High Dose</td>
        <td style="text-align:left;">30</td>
        <td style="text-align:left;">0.61</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p><code>StyledTable(df)</code> wraps the DataFrame. <code>render()</code> converts it to a <code>SummaryTables.Table</code> that can be saved as html, LaTeX, typst or docx (see the <a href="https://pumasai.github.io/SummaryTables.jl/stable/reference/renderers" target="_blank" rel="noreferrer">SummaryTables.jl docs</a> for further detail).</p><h2 id="Adding-a-title" tabindex="-1">Adding a title <a class="header-anchor" href="#Adding-a-title" aria-label="Permalink to &quot;Adding a title {#Adding-a-title}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Treatment Response&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; subtitle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Phase II Clinical Trial&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e175d99c">
    <style>
        #st-e175d99c {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e175d99c tr {
            background-color: transparent;
            border: none;
        }
        #st-e175d99c tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e175d99c br {
            line-height: 0em;
            margin: 0;
        }
        #st-e175d99c sub {
            line-height: 0;
        }
        #st-e175d99c sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="3" style="font-weight:bold;text-align:center;">Treatment Response</td>
    </tr>
    <tr>
        <td colspan="3" style="font-style:italic;text-align:center;">Phase II Clinical Trial</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">treatment</td>
        <td style="font-weight:bold;text-align:left;">n</td>
        <td style="font-weight:bold;text-align:left;">response</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Placebo</td>
        <td style="text-align:left;">30</td>
        <td style="text-align:left;">0.12</td>
    </tr>
    <tr>
        <td style="text-align:left;">Low Dose</td>
        <td style="text-align:left;">30</td>
        <td style="text-align:left;">0.38</td>
    </tr>
    <tr>
        <td style="text-align:left;">High Dose</td>
        <td style="text-align:left;">30</td>
        <td style="text-align:left;">0.61</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Relabeling-and-aligning-columns" tabindex="-1">Relabeling and aligning columns <a class="header-anchor" href="#Relabeling-and-aligning-columns" aria-label="Permalink to &quot;Relabeling and aligning columns {#Relabeling-and-aligning-columns}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">labels </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :treatment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Treatment arm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;N&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :response</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Response rate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Treatment Response&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, labels)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:response</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-f814bb65">
    <style>
        #st-f814bb65 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-f814bb65 tr {
            background-color: transparent;
            border: none;
        }
        #st-f814bb65 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-f814bb65 br {
            line-height: 0em;
            margin: 0;
        }
        #st-f814bb65 sub {
            line-height: 0;
        }
        #st-f814bb65 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="3" style="font-weight:bold;text-align:center;">Treatment Response</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Treatment arm</td>
        <td style="font-weight:bold;text-align:center;">N</td>
        <td style="font-weight:bold;text-align:center;">Response rate</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Placebo</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0.12</td>
    </tr>
    <tr>
        <td style="text-align:left;">Low Dose</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0.38</td>
    </tr>
    <tr>
        <td style="text-align:left;">High Dose</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0.61</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Grouping-columns-under-a-spanner" tabindex="-1">Grouping columns under a spanner <a class="header-anchor" href="#Grouping-columns-under-a-spanner" aria-label="Permalink to &quot;Grouping columns under a spanner {#Grouping-columns-under-a-spanner}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Results&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:response</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-1bb449f1">
    <style>
        #st-1bb449f1 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-1bb449f1 tr {
            background-color: transparent;
            border: none;
        }
        #st-1bb449f1 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-1bb449f1 br {
            line-height: 0em;
            margin: 0;
        }
        #st-1bb449f1 sub {
            line-height: 0;
        }
        #st-1bb449f1 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="3" style="font-weight:bold;text-align:center;">Treatment Response</td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Results</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Treatment arm</td>
        <td style="font-weight:bold;text-align:center;">N</td>
        <td style="font-weight:bold;text-align:center;">Response rate</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Placebo</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0.12</td>
    </tr>
    <tr>
        <td style="text-align:left;">Low Dose</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0.38</td>
    </tr>
    <tr>
        <td style="text-align:left;">High Dose</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">0.61</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Formatting-numbers" tabindex="-1">Formatting numbers <a class="header-anchor" href="#Formatting-numbers" aria-label="Permalink to &quot;Formatting numbers {#Formatting-numbers}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:response</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-3b829052">
    <style>
        #st-3b829052 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-3b829052 tr {
            background-color: transparent;
            border: none;
        }
        #st-3b829052 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-3b829052 br {
            line-height: 0em;
            margin: 0;
        }
        #st-3b829052 sub {
            line-height: 0;
        }
        #st-3b829052 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="3" style="font-weight:bold;text-align:center;">Treatment Response</td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Results</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Treatment arm</td>
        <td style="font-weight:bold;text-align:center;">N</td>
        <td style="font-weight:bold;text-align:center;">Response rate</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Placebo</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">12.0%</td>
    </tr>
    <tr>
        <td style="text-align:left;">Low Dose</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">38.0%</td>
    </tr>
    <tr>
        <td style="text-align:left;">High Dose</td>
        <td style="text-align:center;">30</td>
        <td style="text-align:center;">61.0%</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,20)])])}const c=n(a,[["render",l]]);export{g as __pageData,c as default};
