import{_ as s,o as i,c as a,aA as e}from"./chunks/framework.DeH5H0ZK.js";const l="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%20width='180mm'%20height='25mm'%20viewBox='0%200%208%201'%20preserveAspectRatio='none'%20shape-rendering='crispEdges'%20stroke='none'%3e%3crect%20width='.96'%20height='.96'%20x='0'%20y='0'%20fill='%23FF0000'%20/%3e%3crect%20width='.96'%20height='.96'%20x='1'%20y='0'%20fill='%23FF00DB'%20/%3e%3crect%20width='.96'%20height='.96'%20x='2'%20y='0'%20fill='%234900FF'%20/%3e%3crect%20width='.96'%20height='.96'%20x='3'%20y='0'%20fill='%230092FF'%20/%3e%3crect%20width='.96'%20height='.96'%20x='4'%20y='0'%20fill='%2300FF92'%20/%3e%3crect%20width='.96'%20height='.96'%20x='5'%20y='0'%20fill='%2349FF00'%20/%3e%3crect%20width='.96'%20height='.96'%20x='6'%20y='0'%20fill='%23FFDB00'%20/%3e%3crect%20width='.96'%20height='.96'%20x='7'%20y='0'%20fill='%23FF0000'%20/%3e%3c/svg%3e",c=JSON.parse('{"title":"Applying color gradients to columns","description":"","frontmatter":{},"headers":[],"relativePath":"examples/color_gradients.md","filePath":"examples/color_gradients.md","lastUpdated":null}'),n={name:"examples/color_gradients.md"};function d(r,t,h,p,o,g){return i(),a("div",null,[...t[0]||(t[0]=[e(`<h1 id="Applying-color-gradients-to-columns" tabindex="-1">Applying color gradients to columns <a class="header-anchor" href="#Applying-color-gradients-to-columns" aria-label="Permalink to &quot;Applying color gradients to columns {#Applying-color-gradients-to-columns}&quot;">​</a></h1><p>Numeric trends in larger tables can quickly become difficult to see. Adding color to reveal these trends can be one way to make reading complex tables a little easier.</p><h2 id="The-data" tabindex="-1">The data <a class="header-anchor" href="#The-data" aria-label="Permalink to &quot;The data {#The-data}&quot;">​</a></h2><p>Clean gradients in real data can be hard to come by. Excuse the contrived nature of the data below, but I really want to make a rainbow gradient!</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> StyledTables, DataFrames, Colors</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, score </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span></code></pre></div><div><div><div style = "float: left;"><span>8×2 DataFrame</span></div><div style = "clear: both;"></div></div><div class = "data-frame" style = "overflow-x: scroll;"><table class = "data-frame" style = "margin-bottom: 6px;"><thead><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;">Row</th><th style = "text-align: left;">id</th><th style = "text-align: left;">score</th></tr><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;"></th><th title = "Int64" style = "text-align: left;">Int64</th><th title = "Float64" style = "text-align: left;">Float64</th></tr></thead><tbody><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">1</td><td style = "text-align: right;">1</td><td style = "text-align: right;">0.150588</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">2</td><td style = "text-align: right;">2</td><td style = "text-align: right;">0.495914</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">3</td><td style = "text-align: right;">3</td><td style = "text-align: right;">0.77091</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">4</td><td style = "text-align: right;">4</td><td style = "text-align: right;">0.0511252</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">5</td><td style = "text-align: right;">5</td><td style = "text-align: right;">0.853196</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">6</td><td style = "text-align: right;">6</td><td style = "text-align: right;">0.390712</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">7</td><td style = "text-align: right;">7</td><td style = "text-align: right;">0.103761</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">8</td><td style = "text-align: right;">8</td><td style = "text-align: right;">0.50298</td></tr></tbody></table></div></div><p>So far so boring.</p><p>The gradient we&#39;ll be applying is the following:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">colors </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HSV</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), stop </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> HSV</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">360</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), length </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nrow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df))</span></span></code></pre></div><p><img src="`+l+`" alt=""></p><h2 id="Step-1:-Styling-function" tabindex="-1">Step 1: Styling function <a class="header-anchor" href="#Step-1:-Styling-function" aria-label="Permalink to &quot;Step 1: Styling function {#Step-1:-Styling-function}&quot;">​</a></h2><p>The function below is more general than what would be required for the specific example here. In our case, it would be possible to simply use the <code>id</code> variable to index into <code>colors</code>.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> apply_gradient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x, xmax; colors)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    color </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colors[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">round</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Int, (x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xmax) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(colors))]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (; color)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;">apply_gradient (generic function with 1 method)</span></span></code></pre></div><h2 id="Step-2:-Apply-styling" tabindex="-1">Step 2: Apply styling <a class="header-anchor" href="#Step-2:-Apply-styling" aria-label="Permalink to &quot;Step 2: Apply styling {#Step-2:-Apply-styling}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_style!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> apply_gradient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">maximum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">id); colors), tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-f2c6aea7">
    <style>
        #st-f2c6aea7 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-f2c6aea7 tr {
            background-color: transparent;
            border: none;
        }
        #st-f2c6aea7 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-f2c6aea7 br {
            line-height: 0em;
            margin: 0;
        }
        #st-f2c6aea7 sub {
            line-height: 0;
        }
        #st-f2c6aea7 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">id</td>
        <td style="font-weight:bold;text-align:left;">score</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,0,0);">1</span></td>
        <td style="text-align:left;">0.151</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,0,219);">2</span></td>
        <td style="text-align:left;">0.496</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(73,0,255);">3</span></td>
        <td style="text-align:left;">0.771</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(0,146,255);">4</span></td>
        <td style="text-align:left;">0.0511</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(0,255,146);">5</span></td>
        <td style="text-align:left;">0.853</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(73,255,0);">6</span></td>
        <td style="text-align:left;">0.391</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,219,0);">7</span></td>
        <td style="text-align:left;">0.104</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,0,0);">8</span></td>
        <td style="text-align:left;">0.503</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Step-3:-Column-labels" tabindex="-1">Step 3: Column labels <a class="header-anchor" href="#Step-3:-Column-labels" aria-label="Permalink to &quot;Step 3: Column labels {#Step-3:-Column-labels}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Student ID&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:score</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Score&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-dd6adb61">
    <style>
        #st-dd6adb61 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-dd6adb61 tr {
            background-color: transparent;
            border: none;
        }
        #st-dd6adb61 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-dd6adb61 br {
            line-height: 0em;
            margin: 0;
        }
        #st-dd6adb61 sub {
            line-height: 0;
        }
        #st-dd6adb61 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Student ID</td>
        <td style="font-weight:bold;text-align:left;">Score</td>
    </tr>
        <tr><td colspan="2" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,0,0);">1</span></td>
        <td style="text-align:left;">0.151</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,0,219);">2</span></td>
        <td style="text-align:left;">0.496</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(73,0,255);">3</span></td>
        <td style="text-align:left;">0.771</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(0,146,255);">4</span></td>
        <td style="text-align:left;">0.0511</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(0,255,146);">5</span></td>
        <td style="text-align:left;">0.853</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(73,255,0);">6</span></td>
        <td style="text-align:left;">0.391</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,219,0);">7</span></td>
        <td style="text-align:left;">0.104</td>
    </tr>
    <tr>
        <td style="text-align:left;"><span style="color:rgb(255,0,0);">8</span></td>
        <td style="text-align:left;">0.503</td>
    </tr>
    <tr><td colspan="2" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,20)])])}const y=s(n,[["render",d]]);export{c as __pageData,y as default};
