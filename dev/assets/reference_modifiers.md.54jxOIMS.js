import{_ as p,C as h,o as d,c as r,aA as l,j as i,a as n,E as a,w as e}from"./chunks/framework.DeH5H0ZK.js";const A=JSON.parse('{"title":"Column Modifiers","description":"","frontmatter":{},"headers":[],"relativePath":"reference/modifiers.md","filePath":"reference/modifiers.md","lastUpdated":null}'),k={name:"reference/modifiers.md"},o={class:"jldocstring custom-block",open:""},g={class:"jldocstring custom-block",open:""},c={class:"jldocstring custom-block",open:""},E={class:"jldocstring custom-block",open:""},y={class:"jldocstring custom-block",open:""},b={class:"jldocstring custom-block",open:""},u={class:"jldocstring custom-block",open:""},F={class:"jldocstring custom-block",open:""};function C(m,s,f,S,T,_){const t=h("Badge");return d(),r("div",null,[s[32]||(s[32]=l(`<h1 id="Column-Modifiers" tabindex="-1">Column Modifiers <a class="header-anchor" href="#Column-Modifiers" aria-label="Permalink to &quot;Column Modifiers {#Column-Modifiers}&quot;">​</a></h1><p>These functions control column display names, alignment, and visibility.</p><h2 id="cols_label!" tabindex="-1"><code>cols_label!</code> <a class="header-anchor" href="#cols_label!" aria-label="Permalink to &quot;\`cols_label!\` {#cols_label!}&quot;">​</a></h2><p>Rename one or more columns for display. The underlying <code>DataFrame</code> is unchanged.</p><p><strong>Signature:</strong> <code>cols_label!(tbl, (col =&gt; label)::Pair...)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bmi </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">22.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">27.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">31.0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], sbp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">118</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">135</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">142</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BMI (kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Systolic BP (mmHg)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-35bbac47">
    <style>
        #st-35bbac47 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-35bbac47 tr {
            background-color: transparent;
            border: none;
        }
        #st-35bbac47 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-35bbac47 br {
            line-height: 0em;
            margin: 0;
        }
        #st-35bbac47 sub {
            line-height: 0;
        }
        #st-35bbac47 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">BMI (kg/m²)</td>
        <td style="font-weight:bold;text-align:left;">Systolic BP (mmHg)</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr>
        <td style="text-align:left;">31</td>
        <td style="text-align:left;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Use <code>Multiline</code> headers via <code>SummaryTables.Multiline</code>:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> SummaryTables</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Multiline</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Multiline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;BMI&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Multiline</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Systolic BP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;(mmHg)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-47adf3ff">
    <style>
        #st-47adf3ff {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-47adf3ff tr {
            background-color: transparent;
            border: none;
        }
        #st-47adf3ff tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-47adf3ff br {
            line-height: 0em;
            margin: 0;
        }
        #st-47adf3ff sub {
            line-height: 0;
        }
        #st-47adf3ff sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">BMI<br>(kg/m²)</td>
        <td style="font-weight:bold;text-align:left;">Systolic BP<br>(mmHg)</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr>
        <td style="text-align:left;">31</td>
        <td style="text-align:left;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Apply a function uniformly to all column names:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df2 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(bmi_score </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">22.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">27.4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], sbp_mmhg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">118</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">135</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df2)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(col </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> titlecase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(col, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)), tbl)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-ce13b1b3">
    <style>
        #st-ce13b1b3 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-ce13b1b3 tr {
            background-color: transparent;
            border: none;
        }
        #st-ce13b1b3 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-ce13b1b3 br {
            line-height: 0em;
            margin: 0;
        }
        #st-ce13b1b3 sub {
            line-height: 0;
        }
        #st-ce13b1b3 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Bmi Score</td>
        <td style="font-weight:bold;text-align:left;">Sbp Mmhg</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Restrict to a subset of columns with a <code>Symbol</code>, <code>String</code> or <code>Vector</code>s thereof:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df2)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi_score</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> col</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    titlecase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(col, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-02f841d3">
    <style>
        #st-02f841d3 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-02f841d3 tr {
            background-color: transparent;
            border: none;
        }
        #st-02f841d3 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-02f841d3 br {
            line-height: 0em;
            margin: 0;
        }
        #st-02f841d3 sub {
            line-height: 0;
        }
        #st-02f841d3 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Bmi Score</td>
        <td style="font-weight:bold;text-align:left;">sbp_mmhg</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,16)),i("details",o,[i("summary",null,[s[0]||(s[0]=i("a",{id:"StyledTables.cols_label!-Tuple{StyledTable, Vararg{Pair}}",href:"#StyledTables.cols_label!-Tuple{StyledTable, Vararg{Pair}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_label!")],-1)),s[1]||(s[1]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[3]||(s[3]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pair...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Rename one or more columns in the rendered output.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>args</code>: any number of <code>col =&gt; label</code> pairs. <code>col</code> must be a <code>Symbol</code> matching a column name; <code>label</code> can be a plain <code>String</code> or any value accepted by <code>SummaryTables.Cell</code>, including <code>Multiline</code> for multi-line headers.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Notes</strong></p><p>The underlying <code>DataFrame</code> is unchanged.</p><p>See also: <a href="/StyledTables.jl/dev/reference/modifiers#cols_align!"><code>cols_align!</code></a>, <a href="/StyledTables.jl/dev/reference/modifiers#cols_hide!"><code>cols_hide!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BMI (kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Systolic BP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,11)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[2]||(s[2]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L52",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),i("details",g,[i("summary",null,[s[4]||(s[4]=i("a",{id:"StyledTables.cols_label!-Tuple{StyledTable, Union{AbstractDict{Symbol, Symbol}, AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}, AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}}, AbstractVector{<:Pair{<:AbstractString, Symbol}}}}",href:"#StyledTables.cols_label!-Tuple{StyledTable, Union{AbstractDict{Symbol, Symbol}, AbstractDict{<:AbstractString, <:AbstractString}, AbstractDict{<:AbstractString, Symbol}, AbstractDict{Symbol, <:AbstractString}, AbstractVector{<:Pair{Symbol, Symbol}}, AbstractVector{<:Pair{<:AbstractString, <:AbstractString}}, AbstractVector{<:Pair{<:AbstractString, Symbol}}}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_label!")],-1)),s[5]||(s[5]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[7]||(s[7]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Union{AbstractDict{Symbol, Symbol}, AbstractDict{&lt;:AbstractString, &lt;:AbstractString}, AbstractDict{&lt;:AbstractString, Symbol}, AbstractDict{Symbol, &lt;:AbstractString}, AbstractVector{&lt;:Pair{Symbol, Symbol}}, AbstractVector{&lt;:Pair{&lt;:AbstractString, &lt;:AbstractString}}, AbstractVector{&lt;:Pair{&lt;:AbstractString, Symbol}}}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Rename columns using a dict or vector of pairs.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>d</code>: a <code>Dict</code> or vector of <code>col =&gt; label</code> pairs specifying columns and their labels.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/modifiers#cols_align!"><code>cols_align!</code></a>, <a href="/StyledTables.jl/dev/reference/modifiers#cols_hide!"><code>cols_hide!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">label_dict </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;BMI (kg/m²)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Systolic BP&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, label_dict)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[6]||(s[6]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L100",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),i("details",c,[i("summary",null,[s[8]||(s[8]=i("a",{id:"StyledTables.cols_label!-Tuple{Any, StyledTable, AbstractVector{Symbol}}",href:"#StyledTables.cols_label!-Tuple{Any, StyledTable, AbstractVector{Symbol}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_label!")],-1)),s[9]||(s[9]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[11]||(s[11]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    f,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    columns</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">AbstractVector{Symbol}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Relabel columns by applying a function to each column name.</p><p><code>f(col::String) -&gt; label</code> receives the column name as a <code>String</code> and returns any value accepted by the pair form: a <code>String</code>, or any <code>Cell</code>-compatible value such as <code>Multiline</code>.</p><p><strong>Arguments</strong></p><ul><li><p><code>f</code>: function mapping a column name <code>String</code> to a label value.</p></li><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>columns</code>: optional column selector. Pass a <code>Symbol</code>, <code>String</code>, or a <code>Vector</code> of either to restrict which columns are relabeled; omit to apply <code>f</code> to all columns.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/modifiers#cols_align!"><code>cols_align!</code></a>, <a href="/StyledTables.jl/dev/reference/modifiers#cols_hide!"><code>cols_hide!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Apply uppercase to every column header</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(uppercase, tbl)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># do-block: titlecase + underscore removal for selected columns</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi_score</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp_mmhg</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> col</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    titlecase</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(col, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot; &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[10]||(s[10]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L143",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[33]||(s[33]=l(`<hr><h2 id="cols_align!" tabindex="-1"><code>cols_align!</code> <a class="header-anchor" href="#cols_align!" aria-label="Permalink to &quot;\`cols_align!\` {#cols_align!}&quot;">​</a></h2><p>Set horizontal alignment for one or more columns. Valid values: <code>:left</code>, <code>:center</code>, <code>:right</code>.</p><p><strong>Signatures:</strong></p><ul><li><p><code>cols_align!(tbl, col =&gt; halign, ...)</code></p></li><li><p><code>cols_align!(tbl, [cols...] =&gt; halign, ...)</code> — same alignment for a group of columns</p></li><li><p><code>cols_align!(tbl, dict_or_vector)</code></p></li><li><p><code>cols_align!(tbl, halign)</code> — apply to all columns</p></li><li><p><code>cols_align!(f, tbl, halign)</code> — apply to columns where <code>f(eltype) == true</code></p></li></ul><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e70ef181">
    <style>
        #st-e70ef181 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e70ef181 tr {
            background-color: transparent;
            border: none;
        }
        #st-e70ef181 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e70ef181 br {
            line-height: 0em;
            margin: 0;
        }
        #st-e70ef181 sub {
            line-height: 0;
        }
        #st-e70ef181 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:right;">bmi</td>
        <td style="font-weight:bold;text-align:right;">sbp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:right;">22.1</td>
        <td style="text-align:right;">118</td>
    </tr>
    <tr>
        <td style="text-align:right;">27.4</td>
        <td style="text-align:right;">135</td>
    </tr>
    <tr>
        <td style="text-align:right;">31</td>
        <td style="text-align:right;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Align a group of columns to the same alignment in one call:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bmi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sbp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-e70ef181">
    <style>
        #st-e70ef181 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-e70ef181 tr {
            background-color: transparent;
            border: none;
        }
        #st-e70ef181 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-e70ef181 br {
            line-height: 0em;
            margin: 0;
        }
        #st-e70ef181 sub {
            line-height: 0;
        }
        #st-e70ef181 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:right;">bmi</td>
        <td style="font-weight:bold;text-align:right;">sbp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:right;">22.1</td>
        <td style="text-align:right;">118</td>
    </tr>
    <tr>
        <td style="text-align:right;">27.4</td>
        <td style="text-align:right;">135</td>
    </tr>
    <tr>
        <td style="text-align:right;">31</td>
        <td style="text-align:right;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Align all columns at once:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-564b5577">
    <style>
        #st-564b5577 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-564b5577 tr {
            background-color: transparent;
            border: none;
        }
        #st-564b5577 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-564b5577 br {
            line-height: 0em;
            margin: 0;
        }
        #st-564b5577 sub {
            line-height: 0;
        }
        #st-564b5577 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:center;">bmi</td>
        <td style="font-weight:bold;text-align:center;">sbp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:center;">22.1</td>
        <td style="text-align:center;">118</td>
    </tr>
    <tr>
        <td style="text-align:center;">27.4</td>
        <td style="text-align:center;">135</td>
    </tr>
    <tr>
        <td style="text-align:center;">31</td>
        <td style="text-align:center;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><p>Align all <code>Real</code> valued columns right using the type-predicate form:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isreal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> T </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Real</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">isreal</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(isreal, tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-fba16a6c">
    <style>
        #st-fba16a6c {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-fba16a6c tr {
            background-color: transparent;
            border: none;
        }
        #st-fba16a6c tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-fba16a6c br {
            line-height: 0em;
            margin: 0;
        }
        #st-fba16a6c sub {
            line-height: 0;
        }
        #st-fba16a6c sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">bmi</td>
        <td style="font-weight:bold;text-align:left;">sbp</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;">22.1</td>
        <td style="text-align:left;">118</td>
    </tr>
    <tr>
        <td style="text-align:left;">27.4</td>
        <td style="text-align:left;">135</td>
    </tr>
    <tr>
        <td style="text-align:left;">31</td>
        <td style="text-align:left;">142</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,16)),i("details",E,[i("summary",null,[s[12]||(s[12]=i("a",{id:"StyledTables.cols_align!-Tuple{StyledTable, Vararg{Pair{Symbol, Symbol}}}",href:"#StyledTables.cols_align!-Tuple{StyledTable, Vararg{Pair{Symbol, Symbol}}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_align!")],-1)),s[13]||(s[13]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[15]||(s[15]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pair{Symbol, Symbol}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Set horizontal alignment for one or more columns.</p><p>Each argument is a <code>col =&gt; halign</code> pair, where <code>col</code> is a <code>Symbol</code> matching a column name and <code>halign</code> is one of <code>:left</code>, <code>:center</code>, or <code>:right</code>.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>args</code>: one or more <code>col =&gt; halign</code> pairs.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[14]||(s[14]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L220",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),i("details",y,[i("summary",null,[s[16]||(s[16]=i("a",{id:"StyledTables.cols_align!-Tuple{StyledTable, Vararg{Pair{<:AbstractVector, Symbol}}}",href:"#StyledTables.cols_align!-Tuple{StyledTable, Vararg{Pair{<:AbstractVector, Symbol}}}"},[i("span",{class:"jlbinding"},"StyledTables.cols_align!")],-1)),s[17]||(s[17]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[19]||(s[19]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    args</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Pair{&lt;:AbstractVector, Symbol}</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Set the same horizontal alignment for a group of columns given as a vector.</p><p>Each argument is a <code>cols =&gt; halign</code> pair, where <code>cols</code> is a vector of column names (as <code>Symbol</code>s or <code>AbstractString</code>s) and <code>halign</code> is one of <code>:left</code>, <code>:center</code>, or <code>:right</code>.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>args</code>: one or more <code>cols =&gt; halign</code> pairs.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:msrp_eur</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:hp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:trq_nm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[18]||(s[18]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L294",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[34]||(s[34]=i("div",{class:"warning custom-block"},[i("p",{class:"custom-block-title"},"Missing docstring."),i("p",null,[n("Missing docstring for "),i("code",null,"StyledTables.cols_align!(::StyledTable, ::Union{AbstractVector,AbstractDict})"),n(". Check Documenter's build log for details.")])],-1)),i("details",b,[i("summary",null,[s[20]||(s[20]=i("a",{id:"StyledTables.cols_align!-Tuple{StyledTable, Symbol}",href:"#StyledTables.cols_align!-Tuple{StyledTable, Symbol}"},[i("span",{class:"jlbinding"},"StyledTables.cols_align!")],-1)),s[21]||(s[21]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[23]||(s[23]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, halign</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Set the same horizontal alignment for all columns.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>halign</code>: one of <code>:left</code>, <code>:center</code>, or <code>:right</code>.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,8)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[22]||(s[22]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L329",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),i("details",u,[i("summary",null,[s[24]||(s[24]=i("a",{id:"StyledTables.cols_align!-Tuple{Any, StyledTable, Symbol}",href:"#StyledTables.cols_align!-Tuple{Any, StyledTable, Symbol}"},[i("span",{class:"jlbinding"},"StyledTables.cols_align!")],-1)),s[25]||(s[25]=n()),a(t,{type:"info",class:"jlObjectType jlMethod",text:"Method"})]),s[27]||(s[27]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    f,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    halign</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Set alignment for all columns whose element type satisfies a predicate.</p><p><code>f(T::Type) -&gt; Bool</code> is called with the element type of each column. Columns for which <code>f</code> returns <code>true</code> are assigned <code>halign</code>; others are left unchanged.</p><p><strong>Arguments</strong></p><ul><li><p><code>f</code>: predicate on element type — e.g. <code>T -&gt; T &lt;: Real</code>.</p></li><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>halign</code>: one of <code>:left</code>, <code>:center</code>, or <code>:right</code>.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_align!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:right</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> T</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    T </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Real</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,9)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[26]||(s[26]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L360",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})]),s[35]||(s[35]=l(`<hr><h2 id="cols_hide!" tabindex="-1"><code>cols_hide!</code> <a class="header-anchor" href="#cols_hide!" aria-label="Permalink to &quot;\`cols_hide!\` {#cols_hide!}&quot;">​</a></h2><p>Remove columns from the rendered table without dropping them from the data. Use this when a column drives grouping (via <code>tab_row_group!</code>) but should not appear.</p><p><strong>Signature:</strong> <code>cols_hide!(tbl, cols::Symbol...)</code></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    group </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;A&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;B&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subject </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S2&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S3&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;S4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    score </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">88</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">92</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">75</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">84</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    pct_score </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.88</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.92</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.75</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.84</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_row_group!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:subject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Subject&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:score</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Score&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pct_score</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Score (%)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_percent!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:pct_score</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; digits </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-258c3e45">
    <style>
        #st-258c3e45 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-258c3e45 tr {
            background-color: transparent;
            border: none;
        }
        #st-258c3e45 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-258c3e45 br {
            line-height: 0em;
            margin: 0;
        }
        #st-258c3e45 sub {
            line-height: 0;
        }
        #st-258c3e45 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Subject</td>
        <td style="font-weight:bold;text-align:left;">Score</td>
        <td style="font-weight:bold;text-align:left;">Score (%)</td>
    </tr>
        <tr><td colspan="3" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">A</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S1</td>
        <td style="text-align:left;">88</td>
        <td style="text-align:left;">88%</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S2</td>
        <td style="text-align:left;">92</td>
        <td style="text-align:left;">92%</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">B</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S3</td>
        <td style="text-align:left;">75</td>
        <td style="text-align:left;">75%</td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">S4</td>
        <td style="text-align:left;">84</td>
        <td style="text-align:left;">84%</td>
    </tr>
    <tr><td colspan="3" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,6)),i("details",F,[i("summary",null,[s[28]||(s[28]=i("a",{id:"StyledTables.cols_hide!",href:"#StyledTables.cols_hide!"},[i("span",{class:"jlbinding"},"StyledTables.cols_hide!")],-1)),s[29]||(s[29]=n()),a(t,{type:"info",class:"jlObjectType jlFunction",text:"Function"})]),s[31]||(s[31]=l(`<div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, cols</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">::</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Symbol...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTable</span></span></code></pre></div><p>Remove columns from the rendered output without modifying the <code>DataFrame</code>.</p><p>Hidden columns remain accessible for grouping or formatting, but do not appear in the rendered table. Commonly paired with <a href="/StyledTables.jl/dev/reference/structure#tab_row_group!"><code>tab_row_group!</code></a>.</p><p><strong>Arguments</strong></p><ul><li><p><code>tbl</code>: the <a href="/StyledTables.jl/dev/resources/api#StyledTables.StyledTable"><code>StyledTable</code></a> to modify.</p></li><li><p><code>cols</code>: one or more column names to hide.</p></li></ul><p><strong>Returns</strong></p><p><code>tbl</code> (modified in place).</p><p>See also: <a href="/StyledTables.jl/dev/reference/structure#tab_row_group!"><code>tab_row_group!</code></a>.</p><p><strong>Examples</strong></p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_row_group!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:group</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div>`,10)),a(t,{type:"info",class:"source-link",text:"source"},{default:e(()=>[...s[30]||(s[30]=[i("a",{href:"https://github.com/simonsteiger/StyledTables.jl/blob/d58ad0474fd55b460d97595a71fd3bbd7687befa/src/modifiers.jl#L1149",target:"_blank",rel:"noreferrer"},"source",-1)])]),_:1})])])}const v=p(k,[["render",C]]);export{A as __pageData,v as default};
