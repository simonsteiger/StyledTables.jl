import{_ as s,o as n,c as e,aA as l}from"./chunks/framework.DeH5H0ZK.js";const b=JSON.parse('{"title":"StyledTables","description":"","frontmatter":{"layout":"home","hero":{"name":"StyledTables","text":null,"tagline":"Apply custom formatting to tables in Julia - render HTML, docx, LaTeX and Typst","image":{"src":"logo.svg","alt":"StyledTables"},"actions":[{"theme":"alt","text":"View on Github","link":"https://github.com/simonsteiger/StyledTables.jl"}]}},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":null}'),t={name:"index.md"};function i(p,a,o,r,d,h){return n(),e("div",null,[...a[0]||(a[0]=[l(`<h1 id="StyledTables" tabindex="-1">StyledTables <a class="header-anchor" href="#StyledTables" aria-label="Permalink to &quot;StyledTables {#StyledTables}&quot;">​</a></h1><p>StyledTables adds GT-style formatting to summary tables. Tables render to HTML, docx, LaTeX, and Typst. It builds on <a href="https://pumasai.github.io/SummaryTables.jl/stable/" target="_blank" rel="noreferrer">SummaryTables.jl</a>, with an API inspired by R&#39;s <a href="https://gt.rstudio.com/" target="_blank" rel="noreferrer">gt</a> package.</p><h2 id="Installation" tabindex="-1">Installation <a class="header-anchor" href="#Installation" aria-label="Permalink to &quot;Installation {#Installation}&quot;">​</a></h2><p>StyledTables is not yet registered. Install from GitHub:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Pkg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Pkg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://github.com/simonsteiger/StyledTables.jl&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="Examples" tabindex="-1">Examples <a class="header-anchor" href="#Examples" aria-label="Permalink to &quot;Examples {#Examples}&quot;">​</a></h2><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using StyledTables, DataFrames, PalmerPenguins, Chain</span></span>
<span class="line"><span>using Statistics: mean</span></span>
<span class="line"><span></span></span>
<span class="line"><span>df = @chain DataFrame(PalmerPenguins.load()) begin</span></span>
<span class="line"><span>    dropmissing(_)</span></span>
<span class="line"><span>    groupby(_, [:island, :species])</span></span>
<span class="line"><span>    combine(_, Cols(r&quot;bill&quot;) .=&gt; mean =&gt; identity)</span></span>
<span class="line"><span>end</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tbl = StyledTable(df)</span></span>
<span class="line"><span>tab_row_group!(tbl, :island)</span></span>
<span class="line"><span>cols_hide!(tbl, :island)</span></span>
<span class="line"><span>tab_spanner!(tbl, &quot;Bill measures&quot; =&gt; [:bill_length_mm, :bill_depth_mm])</span></span>
<span class="line"><span></span></span>
<span class="line"><span>labels = [</span></span>
<span class="line"><span>    :species =&gt; &quot;Species&quot;, </span></span>
<span class="line"><span>    :bill_length_mm =&gt; &quot;Length&quot;, </span></span>
<span class="line"><span>    :bill_depth_mm =&gt; &quot;Depth&quot;</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cols_label!(tbl, labels)</span></span>
<span class="line"><span>render(tbl)</span></span></code></pre></div>`,7)])])}const m=s(t,[["render",i]]);export{b as __pageData,m as default};
