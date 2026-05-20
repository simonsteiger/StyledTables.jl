import{_ as s,o as i,c as a,aA as n}from"./chunks/framework.hJCjvgaE.js";const y=JSON.parse('{"title":"Sports Cars Performance Table","description":"","frontmatter":{},"headers":[],"relativePath":"examples/cars.md","filePath":"examples/cars.md","lastUpdated":null}'),e={name:"examples/cars.md"};function l(h,t,d,r,p,g){return i(),a("div",null,[...t[0]||(t[0]=[n(`<h1 id="Sports-Cars-Performance-Table" tabindex="-1">Sports Cars Performance Table <a class="header-anchor" href="#Sports-Cars-Performance-Table" aria-label="Permalink to &quot;Sports Cars Performance Table {#Sports-Cars-Performance-Table}&quot;">​</a></h1><p>This example compares sports cars across performance metrics. We hide auxiliary columns, group by origin country, add a performance spanner, format prices, and highlight them with bold styling.</p><h2 id="The-data" tabindex="-1">The data <a class="header-anchor" href="#The-data" aria-label="Permalink to &quot;The data {#The-data}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cars </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    origin </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Italy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Italy&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Germany&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Germany&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UK&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;UK&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    make </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Ferrari&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Lamborghini&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Porsche&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BMW&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;McLaren&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Aston Martin&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    model </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;488 GTB&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Huracán&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;911 GT3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;M8&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;720S&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Vantage&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    msrp_eur </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">280_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">210_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">180_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">130_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">220_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">155_000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    year </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2022</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    hp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">660</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">610</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">503</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">617</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">710</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">503</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    trq_nm </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">760</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">560</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">470</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">750</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">770</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">625</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    mpg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">13</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">22</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">19</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">21</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div><div><div style = "float: left;"><span>6×8 DataFrame</span></div><div style = "clear: both;"></div></div><div class = "data-frame" style = "overflow-x: scroll;"><table class = "data-frame" style = "margin-bottom: 6px;"><thead><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;">Row</th><th style = "text-align: left;">origin</th><th style = "text-align: left;">make</th><th style = "text-align: left;">model</th><th style = "text-align: left;">msrp_eur</th><th style = "text-align: left;">year</th><th style = "text-align: left;">hp</th><th style = "text-align: left;">trq_nm</th><th style = "text-align: left;">mpg</th></tr><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;"></th><th title = "String" style = "text-align: left;">String</th><th title = "String" style = "text-align: left;">String</th><th title = "String" style = "text-align: left;">String</th><th title = "Int64" style = "text-align: left;">Int64</th><th title = "Int64" style = "text-align: left;">Int64</th><th title = "Int64" style = "text-align: left;">Int64</th><th title = "Int64" style = "text-align: left;">Int64</th><th title = "Int64" style = "text-align: left;">Int64</th></tr></thead><tbody><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">1</td><td style = "text-align: left;">Italy</td><td style = "text-align: left;">Ferrari</td><td style = "text-align: left;">488 GTB</td><td style = "text-align: right;">280000</td><td style = "text-align: right;">2022</td><td style = "text-align: right;">660</td><td style = "text-align: right;">760</td><td style = "text-align: right;">15</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">2</td><td style = "text-align: left;">Italy</td><td style = "text-align: left;">Lamborghini</td><td style = "text-align: left;">Huracán</td><td style = "text-align: right;">210000</td><td style = "text-align: right;">2022</td><td style = "text-align: right;">610</td><td style = "text-align: right;">560</td><td style = "text-align: right;">13</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">3</td><td style = "text-align: left;">Germany</td><td style = "text-align: left;">Porsche</td><td style = "text-align: left;">911 GT3</td><td style = "text-align: right;">180000</td><td style = "text-align: right;">2022</td><td style = "text-align: right;">503</td><td style = "text-align: right;">470</td><td style = "text-align: right;">22</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">4</td><td style = "text-align: left;">Germany</td><td style = "text-align: left;">BMW</td><td style = "text-align: left;">M8</td><td style = "text-align: right;">130000</td><td style = "text-align: right;">2022</td><td style = "text-align: right;">617</td><td style = "text-align: right;">750</td><td style = "text-align: right;">19</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">5</td><td style = "text-align: left;">UK</td><td style = "text-align: left;">McLaren</td><td style = "text-align: left;">720S</td><td style = "text-align: right;">220000</td><td style = "text-align: right;">2022</td><td style = "text-align: right;">710</td><td style = "text-align: right;">770</td><td style = "text-align: right;">21</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">6</td><td style = "text-align: left;">UK</td><td style = "text-align: left;">Aston Martin</td><td style = "text-align: left;">Vantage</td><td style = "text-align: right;">155000</td><td style = "text-align: right;">2022</td><td style = "text-align: right;">503</td><td style = "text-align: right;">625</td><td style = "text-align: right;">20</td></tr></tbody></table></div></div><h2 id="Step-1:-Basic-table-with-row-groups" tabindex="-1">Step 1: Basic table with row groups <a class="header-anchor" href="#Step-1:-Basic-table-with-row-groups" aria-label="Permalink to &quot;Step 1: Basic table with row groups {#Step-1:-Basic-table-with-row-groups}&quot;">​</a></h2><p>Group by <code>:origin</code> and hide the origin and year columns.</p><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>label_dict = Dict(</span></span>
<span class="line"><span>    :make =&gt; &quot;Make&quot;,</span></span>
<span class="line"><span>    :model =&gt; &quot;Model&quot;,</span></span>
<span class="line"><span>    :msrp_eur =&gt; &quot;MSRP (€)&quot;,</span></span>
<span class="line"><span>    :hp =&gt; &quot;HP&quot;,</span></span>
<span class="line"><span>    :trq_nm =&gt; &quot;Torque (Nm)&quot;,</span></span>
<span class="line"><span>    :mpg =&gt; &quot;MPG&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tbl = StyledTable(cars)</span></span>
<span class="line"><span>rowgroup!(tbl, :origin)</span></span>
<span class="line"><span>hide!(tbl, :origin, :year)</span></span>
<span class="line"><span>label!(tbl, label_dict)</span></span>
<span class="line"><span>render(tbl)</span></span></code></pre></div><h2 id="Step-2:-Add-a-spanner-for-performance-metrics" tabindex="-1">Step 2: Add a spanner for performance metrics <a class="header-anchor" href="#Step-2:-Add-a-spanner-for-performance-metrics" aria-label="Permalink to &quot;Step 2: Add a spanner for performance metrics {#Step-2:-Add-a-spanner-for-performance-metrics}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:hp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:trq_nm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:mpg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Performance&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-540b0f59">
    <style>
        #st-540b0f59 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-540b0f59 tr {
            background-color: transparent;
            border: none;
        }
        #st-540b0f59 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-540b0f59 br {
            line-height: 0em;
            margin: 0;
        }
        #st-540b0f59 sub {
            line-height: 0;
        }
        #st-540b0f59 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td colspan="3" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Performance</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">make</td>
        <td style="font-weight:bold;text-align:left;">model</td>
        <td style="font-weight:bold;text-align:left;">msrp_eur</td>
        <td style="font-weight:bold;text-align:left;">hp</td>
        <td style="font-weight:bold;text-align:left;">trq_nm</td>
        <td style="font-weight:bold;text-align:left;">mpg</td>
    </tr>
        <tr><td colspan="6" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Italy</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Ferrari</td>
        <td style="text-align:left;">488 GTB</td>
        <td style="text-align:left;">280000</td>
        <td style="text-align:left;">660</td>
        <td style="text-align:left;">760</td>
        <td style="text-align:left;">15</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Lamborghini</td>
        <td style="text-align:left;">Huracán</td>
        <td style="text-align:left;">210000</td>
        <td style="text-align:left;">610</td>
        <td style="text-align:left;">560</td>
        <td style="text-align:left;">13</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Germany</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Porsche</td>
        <td style="text-align:left;">911 GT3</td>
        <td style="text-align:left;">180000</td>
        <td style="text-align:left;">503</td>
        <td style="text-align:left;">470</td>
        <td style="text-align:left;">22</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">BMW</td>
        <td style="text-align:left;">M8</td>
        <td style="text-align:left;">130000</td>
        <td style="text-align:left;">617</td>
        <td style="text-align:left;">750</td>
        <td style="text-align:left;">19</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">UK</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">McLaren</td>
        <td style="text-align:left;">720S</td>
        <td style="text-align:left;">220000</td>
        <td style="text-align:left;">710</td>
        <td style="text-align:left;">770</td>
        <td style="text-align:left;">21</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Aston Martin</td>
        <td style="text-align:left;">Vantage</td>
        <td style="text-align:left;">155000</td>
        <td style="text-align:left;">503</td>
        <td style="text-align:left;">625</td>
        <td style="text-align:left;">20</td>
    </tr>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Step-3:-Reorder,-format,-and-highlight" tabindex="-1">Step 3: Reorder, format, and highlight <a class="header-anchor" href="#Step-3:-Reorder,-format,-and-highlight" aria-label="Permalink to &quot;Step 3: Reorder, format, and highlight {#Step-3:-Reorder,-format,-and-highlight}&quot;">​</a></h2><p>Format MSRP with a currency prefix, right-align numeric columns, bold the price values, and annotate the MPG column.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">format!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:msrp_eur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x), </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">r&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">(</span><span style="--shiki-light:#22863A;--shiki-light-font-weight:bold;--shiki-dark:#85E89D;--shiki-dark-font-weight:bold;">\\d</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">)(?=(</span><span style="--shiki-light:#22863A;--shiki-light-font-weight:bold;--shiki-dark:#85E89D;--shiki-dark-font-weight:bold;">\\d</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">{3})+$)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> s</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">,&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;€&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:msrp_eur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:hp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:trq_nm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:mpg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:msrp_eur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; bold </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:mpg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;City/highway combined estimate&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">sourcenote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Source: manufacturer specifications&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-83cc940c">
    <style>
        #st-83cc940c {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-83cc940c tr {
            background-color: transparent;
            border: none;
        }
        #st-83cc940c tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-83cc940c br {
            line-height: 0em;
            margin: 0;
        }
        #st-83cc940c sub {
            line-height: 0;
        }
        #st-83cc940c sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td colspan="3" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Performance</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">make</td>
        <td style="font-weight:bold;text-align:left;">model</td>
        <td style="font-weight:bold;text-align:right;">msrp_eur</td>
        <td style="font-weight:bold;text-align:right;">hp</td>
        <td style="font-weight:bold;text-align:right;">trq_nm</td>
        <td style="font-weight:bold;text-align:right;">mpg<sup>1</sup></td>
    </tr>
        <tr><td colspan="6" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Italy</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Ferrari</td>
        <td style="text-align:left;">488 GTB</td>
        <td style="text-align:right;"><span style="font-weight:bold;">280,000€</span></td>
        <td style="text-align:right;">660</td>
        <td style="text-align:right;">760</td>
        <td style="text-align:right;">15</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Lamborghini</td>
        <td style="text-align:left;">Huracán</td>
        <td style="text-align:right;"><span style="font-weight:bold;">210,000€</span></td>
        <td style="text-align:right;">610</td>
        <td style="text-align:right;">560</td>
        <td style="text-align:right;">13</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Germany</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Porsche</td>
        <td style="text-align:left;">911 GT3</td>
        <td style="text-align:right;"><span style="font-weight:bold;">180,000€</span></td>
        <td style="text-align:right;">503</td>
        <td style="text-align:right;">470</td>
        <td style="text-align:right;">22</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">BMW</td>
        <td style="text-align:left;">M8</td>
        <td style="text-align:right;"><span style="font-weight:bold;">130,000€</span></td>
        <td style="text-align:right;">617</td>
        <td style="text-align:right;">750</td>
        <td style="text-align:right;">19</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">UK</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">McLaren</td>
        <td style="text-align:left;">720S</td>
        <td style="text-align:right;"><span style="font-weight:bold;">220,000€</span></td>
        <td style="text-align:right;">710</td>
        <td style="text-align:right;">770</td>
        <td style="text-align:right;">21</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Aston Martin</td>
        <td style="text-align:left;">Vantage</td>
        <td style="text-align:right;"><span style="font-weight:bold;">155,000€</span></td>
        <td style="text-align:right;">503</td>
        <td style="text-align:right;">625</td>
        <td style="text-align:right;">20</td>
    </tr>
    <tfoot>
        <tr><td colspan="6" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td colspan="6" style="text-align:left;">Source: manufacturer specifications</td>
    </tr>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="6" style="font-size: 0.8em;"><sup>1</sup> City/highway combined estimate</td></tr>
    </tfoot>
</table></div><p>The table groups cars by origin, spans the three performance columns, formats MSRP with a thousands separator and currency symbol, and bolds prices for emphasis. The MPG footnote clarifies the measurement basis.</p>`,16)])])}const o=s(e,[["render",l]]);export{y as __pageData,o as default};
