import{_ as i,o as s,c as a,aA as n}from"./chunks/framework.DeH5H0ZK.js";const o=JSON.parse('{"title":"Quarterly Financial Report Table","description":"","frontmatter":{},"headers":[],"relativePath":"examples/report.md","filePath":"examples/report.md","lastUpdated":null}'),l={name:"examples/report.md"};function e(h,t,d,r,p,k){return s(),a("div",null,[...t[0]||(t[0]=[n(`<h1 id="Quarterly-Financial-Report-Table" tabindex="-1">Quarterly Financial Report Table <a class="header-anchor" href="#Quarterly-Financial-Report-Table" aria-label="Permalink to &quot;Quarterly Financial Report Table {#Quarterly-Financial-Report-Table}&quot;">​</a></h1><p>This example builds a regional quarterly revenue table with consistent number formatting, a highlighted totals column, and annotated footnotes.</p><h2 id="The-data" tabindex="-1">The data <a class="header-anchor" href="#The-data" aria-label="Permalink to &quot;The data {#The-data}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">report </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    region </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;North America&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Europe&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Asia-Pacific&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Latin America&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Total&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    q1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.21</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.83</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.94</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.72</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9.70</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    q2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.55</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.02</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.81</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10.48</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    q3 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.38</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.91</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.22</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.79</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10.30</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    q4 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5.12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.45</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.67</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.94</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12.18</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    total </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">18.26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12.21</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8.93</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">42.66</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div><div><div style = "float: left;"><span>5×6 DataFrame</span></div><div style = "clear: both;"></div></div><div class = "data-frame" style = "overflow-x: scroll;"><table class = "data-frame" style = "margin-bottom: 6px;"><thead><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;">Row</th><th style = "text-align: left;">region</th><th style = "text-align: left;">q1</th><th style = "text-align: left;">q2</th><th style = "text-align: left;">q3</th><th style = "text-align: left;">q4</th><th style = "text-align: left;">total</th></tr><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;"></th><th title = "String" style = "text-align: left;">String</th><th title = "Float64" style = "text-align: left;">Float64</th><th title = "Float64" style = "text-align: left;">Float64</th><th title = "Float64" style = "text-align: left;">Float64</th><th title = "Float64" style = "text-align: left;">Float64</th><th title = "Float64" style = "text-align: left;">Float64</th></tr></thead><tbody><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">1</td><td style = "text-align: left;">North America</td><td style = "text-align: right;">4.21</td><td style = "text-align: right;">4.55</td><td style = "text-align: right;">4.38</td><td style = "text-align: right;">5.12</td><td style = "text-align: right;">18.26</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">2</td><td style = "text-align: left;">Europe</td><td style = "text-align: right;">2.83</td><td style = "text-align: right;">3.02</td><td style = "text-align: right;">2.91</td><td style = "text-align: right;">3.45</td><td style = "text-align: right;">12.21</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">3</td><td style = "text-align: left;">Asia-Pacific</td><td style = "text-align: right;">1.94</td><td style = "text-align: right;">2.1</td><td style = "text-align: right;">2.22</td><td style = "text-align: right;">2.67</td><td style = "text-align: right;">8.93</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">4</td><td style = "text-align: left;">Latin America</td><td style = "text-align: right;">0.72</td><td style = "text-align: right;">0.81</td><td style = "text-align: right;">0.79</td><td style = "text-align: right;">0.94</td><td style = "text-align: right;">3.26</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">5</td><td style = "text-align: left;">Total</td><td style = "text-align: right;">9.7</td><td style = "text-align: right;">10.48</td><td style = "text-align: right;">10.3</td><td style = "text-align: right;">12.18</td><td style = "text-align: right;">42.66</td></tr></tbody></table></div></div><h2 id="Step-1:-Headers,-spanner,-alignment,-and-formatting" tabindex="-1">Step 1: Headers, spanner, alignment, and formatting <a class="header-anchor" href="#Step-1:-Headers,-spanner,-alignment,-and-formatting" aria-label="Permalink to &quot;Step 1: Headers, spanner, alignment, and formatting {#Step-1:-Headers,-spanner,-alignment,-and-formatting}&quot;">​</a></h2><p>Group quarterly columns under a spanner, right-align numeric columns, and format every number to two decimal places.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">label_dict </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :region</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Region&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :q1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Q1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :q2</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Q2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :q3</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Q3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :q4</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Q4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :total</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Full Year&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(report)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_header!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Annual Revenue by Region&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; subtitle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Figures in USD billions&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, label_dict)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Quarterly&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:total</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_number!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:q4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:total</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-2f543210">
    <style>
        #st-2f543210 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-2f543210 tr {
            background-color: transparent;
            border: none;
        }
        #st-2f543210 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-2f543210 br {
            line-height: 0em;
            margin: 0;
        }
        #st-2f543210 sub {
            line-height: 0;
        }
        #st-2f543210 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="6" style="font-weight:bold;text-align:center;">Annual Revenue by Region</td>
    </tr>
    <tr>
        <td colspan="6" style="font-style:italic;text-align:center;">Figures in USD billions</td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="4" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Quarterly</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Region</td>
        <td style="font-weight:bold;text-align:right;">Q1</td>
        <td style="font-weight:bold;text-align:right;">Q2</td>
        <td style="font-weight:bold;text-align:right;">Q3</td>
        <td style="font-weight:bold;text-align:right;">Q4</td>
        <td style="font-weight:bold;text-align:right;">Full Year</td>
    </tr>
        <tr><td colspan="6" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">North America</td>
        <td style="text-align:right;">4.21</td>
        <td style="text-align:right;">4.55</td>
        <td style="text-align:right;">4.38</td>
        <td style="text-align:right;">5.12</td>
        <td style="text-align:right;">18.26</td>
    </tr>
    <tr>
        <td style="text-align:left;">Europe</td>
        <td style="text-align:right;">2.83</td>
        <td style="text-align:right;">3.02</td>
        <td style="text-align:right;">2.91</td>
        <td style="text-align:right;">3.45</td>
        <td style="text-align:right;">12.21</td>
    </tr>
    <tr>
        <td style="text-align:left;">Asia-Pacific</td>
        <td style="text-align:right;">1.94</td>
        <td style="text-align:right;">2.10</td>
        <td style="text-align:right;">2.22</td>
        <td style="text-align:right;">2.67</td>
        <td style="text-align:right;">8.93</td>
    </tr>
    <tr>
        <td style="text-align:left;">Latin America</td>
        <td style="text-align:right;">0.72</td>
        <td style="text-align:right;">0.81</td>
        <td style="text-align:right;">0.79</td>
        <td style="text-align:right;">0.94</td>
        <td style="text-align:right;">3.26</td>
    </tr>
    <tr>
        <td style="text-align:left;">Total</td>
        <td style="text-align:right;">9.70</td>
        <td style="text-align:right;">10.48</td>
        <td style="text-align:right;">10.30</td>
        <td style="text-align:right;">12.18</td>
        <td style="text-align:right;">42.66</td>
    </tr>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Step-2:-Highlight-the-totals-column-and-annotate-Q4" tabindex="-1">Step 2: Highlight the totals column and annotate Q4 <a class="header-anchor" href="#Step-2:-Highlight-the-totals-column-and-annotate-Q4" aria-label="Permalink to &quot;Step 2: Highlight the totals column and annotate Q4 {#Step-2:-Highlight-the-totals-column-and-annotate-Q4}&quot;">​</a></h2><p>Bold the &quot;Full Year&quot; column, flag Q4 figures as preliminary, and credit the data source.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:total</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; bold </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_footnote!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Preliminary figures, subject to audit&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :q4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_source_note!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Source: Internal Finance, March 2026&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-8d77b87b">
    <style>
        #st-8d77b87b {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-8d77b87b tr {
            background-color: transparent;
            border: none;
        }
        #st-8d77b87b tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-8d77b87b br {
            line-height: 0em;
            margin: 0;
        }
        #st-8d77b87b sub {
            line-height: 0;
        }
        #st-8d77b87b sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td colspan="6" style="font-weight:bold;text-align:center;">Annual Revenue by Region</td>
    </tr>
    <tr>
        <td colspan="6" style="font-style:italic;text-align:center;">Figures in USD billions</td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="4" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Quarterly</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Region</td>
        <td style="font-weight:bold;text-align:right;">Q1</td>
        <td style="font-weight:bold;text-align:right;">Q2</td>
        <td style="font-weight:bold;text-align:right;">Q3</td>
        <td style="font-weight:bold;text-align:right;">Q4<sup>1</sup></td>
        <td style="font-weight:bold;text-align:right;">Full Year</td>
    </tr>
        <tr><td colspan="6" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">North America</td>
        <td style="text-align:right;">4.21</td>
        <td style="text-align:right;">4.55</td>
        <td style="text-align:right;">4.38</td>
        <td style="text-align:right;">5.12</td>
        <td style="text-align:right;"><span style="font-weight:bold;">18.26</span></td>
    </tr>
    <tr>
        <td style="text-align:left;">Europe</td>
        <td style="text-align:right;">2.83</td>
        <td style="text-align:right;">3.02</td>
        <td style="text-align:right;">2.91</td>
        <td style="text-align:right;">3.45</td>
        <td style="text-align:right;"><span style="font-weight:bold;">12.21</span></td>
    </tr>
    <tr>
        <td style="text-align:left;">Asia-Pacific</td>
        <td style="text-align:right;">1.94</td>
        <td style="text-align:right;">2.10</td>
        <td style="text-align:right;">2.22</td>
        <td style="text-align:right;">2.67</td>
        <td style="text-align:right;"><span style="font-weight:bold;">8.93</span></td>
    </tr>
    <tr>
        <td style="text-align:left;">Latin America</td>
        <td style="text-align:right;">0.72</td>
        <td style="text-align:right;">0.81</td>
        <td style="text-align:right;">0.79</td>
        <td style="text-align:right;">0.94</td>
        <td style="text-align:right;"><span style="font-weight:bold;">3.26</span></td>
    </tr>
    <tr>
        <td style="text-align:left;">Total</td>
        <td style="text-align:right;">9.70</td>
        <td style="text-align:right;">10.48</td>
        <td style="text-align:right;">10.30</td>
        <td style="text-align:right;">12.18</td>
        <td style="text-align:right;"><span style="font-weight:bold;">42.66</span></td>
    </tr>
    <tfoot>
        <tr><td colspan="6" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">Source: Internal Finance, March 2026</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr><td colspan="6" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr><td colspan="6" style="font-size: 0.8em;"><sup>1</sup> Preliminary figures, subject to audit</td></tr>
    </tfoot>
</table></div><p>The bolded &quot;Full Year&quot; column draws the eye to the aggregate. An auto-numbered superscript on Q4 flags preliminary figures; the source note credits the data origin.</p>`,14)])])}const y=i(l,[["render",e]]);export{o as __pageData,y as default};
