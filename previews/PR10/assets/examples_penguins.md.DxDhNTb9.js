import{_ as s,o as e,c as n,aA as l}from"./chunks/framework.DC8IQ7Fw.js";const m=JSON.parse('{"title":"Multi-tier spanners","description":"","frontmatter":{},"headers":[],"relativePath":"examples/penguins.md","filePath":"examples/penguins.md","lastUpdated":null}'),p={name:"examples/penguins.md"};function t(i,a,o,r,c,d){return e(),n("div",null,[...a[0]||(a[0]=[l(`<h1 id="Multi-tier-spanners" tabindex="-1">Multi-tier spanners <a class="header-anchor" href="#Multi-tier-spanners" aria-label="Permalink to &quot;Multi-tier spanners {#Multi-tier-spanners}&quot;">​</a></h1><p>The following example shows how layouts with several tiers of column spanners can be achieved.</p><h2 id="The-data" tabindex="-1">The data <a class="header-anchor" href="#The-data" aria-label="Permalink to &quot;The data {#The-data}&quot;">​</a></h2><p>We will use the <a href="https://github.com/devmotion/PalmerPenguins.jl" target="_blank" rel="noreferrer"><code>PalmerPenguins</code></a> data.</p><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using DataFrames, PalmerPenguins</span></span>
<span class="line"><span></span></span>
<span class="line"><span>df = DataFrame(PalmerPenguins.load())</span></span>
<span class="line"><span></span></span>
<span class="line"><span>describe(df)</span></span></code></pre></div><p>Our goal is to summarise the data by island, species, and sex.</p><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using Chain</span></span>
<span class="line"><span>using Statistics: mean</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bill_cols = [:bill_length_mm, :bill_depth_mm]</span></span>
<span class="line"><span>number_cols = [string.(bill_cols)..., &quot;flipper_length_mm&quot;] # , &quot;body_mass_g&quot;</span></span>
<span class="line"><span>male_ordered = [&quot;male_&quot; * colname for colname in number_cols]</span></span>
<span class="line"><span>female_ordered = [&quot;female_&quot; * colname for colname in number_cols]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>summary = @chain df begin</span></span>
<span class="line"><span>    select(_, :island, :species, :sex, number_cols...)</span></span>
<span class="line"><span>    dropmissing(_)</span></span>
<span class="line"><span>    groupby(_, [:island, :species, :sex])</span></span>
<span class="line"><span>    combine(_, Cols(r&quot;_mm$|_g$&quot;) .=&gt; mean =&gt; identity)</span></span>
<span class="line"><span>    stack(_, number_cols)</span></span>
<span class="line"><span>    transform(_, [:sex, :variable] =&gt; ByRow((s, v) -&gt; join([s, v], &quot;_&quot;)) =&gt; :sex_variable)</span></span>
<span class="line"><span>    select(_, Not(:sex, :variable))</span></span>
<span class="line"><span>    unstack(_, :sex_variable, :value)</span></span>
<span class="line"><span>    transform(_, :island =&gt; ByRow(x -&gt; &quot;$x Is.&quot;) =&gt; identity)</span></span>
<span class="line"><span>    select(_, :island, :species, male_ordered..., female_ordered...)</span></span>
<span class="line"><span>end</span></span></code></pre></div><p>The table we want to create will feature island as the row group, and the species present on each island are listed in each group. As some of the length measurements we summarised describe the bill, we will group these as a column spanner. Finally, a higher-order column spanner will indicate which measurements are from female and which from male penguins.</p><h2 id="Step-1:-Row-groups" tabindex="-1">Step 1: Row groups <a class="header-anchor" href="#Step-1:-Row-groups" aria-label="Permalink to &quot;Step 1: Row groups {#Step-1:-Row-groups}&quot;">​</a></h2><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>using StyledTables</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tbl = StyledTable(summary)</span></span>
<span class="line"><span>tab_row_group!(tbl, :island)</span></span>
<span class="line"><span>cols_hide!(tbl, :island)</span></span>
<span class="line"><span>render(tbl)</span></span></code></pre></div><h2 id="Step-2:-Level-one-spanner" tabindex="-1">Step 2: Level one spanner <a class="header-anchor" href="#Step-2:-Level-one-spanner" aria-label="Permalink to &quot;Step 2: Level one spanner {#Step-2:-Level-one-spanner}&quot;">​</a></h2><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tab_spanner!(tbl, &quot;Bill measures&quot; =&gt; &quot;male_&quot; .* string.(bill_cols))</span></span>
<span class="line"><span>tab_spanner!(tbl, &quot;Bill measures&quot; =&gt; &quot;female_&quot; .* string.(bill_cols))</span></span>
<span class="line"><span>render(tbl)</span></span></code></pre></div><h2 id="Step-3:-Level-two-spanner" tabindex="-1">Step 3: Level two spanner <a class="header-anchor" href="#Step-3:-Level-two-spanner" aria-label="Permalink to &quot;Step 3: Level two spanner {#Step-3:-Level-two-spanner}&quot;">​</a></h2><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tab_spanner!(tbl, &quot;Male&quot; =&gt; male_ordered, level=2)</span></span>
<span class="line"><span>tab_spanner!(tbl, &quot;Female&quot; =&gt; female_ordered, level=2)</span></span>
<span class="line"><span>render(tbl)</span></span></code></pre></div><h2 id="Step-4:-Add-column-labels" tabindex="-1">Step 4: Add column labels <a class="header-anchor" href="#Step-4:-Add-column-labels" aria-label="Permalink to &quot;Step 4: Add column labels {#Step-4:-Add-column-labels}&quot;">​</a></h2><div class="language-@example vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">@example</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>label_dict = Dict(</span></span>
<span class="line"><span>    :species =&gt; &quot;Species&quot;,</span></span>
<span class="line"><span>    :male_bill_length_mm =&gt; &quot;Length&quot;,</span></span>
<span class="line"><span>    :male_bill_depth_mm =&gt; &quot;Depth&quot;,</span></span>
<span class="line"><span>    :male_flipper_length_mm =&gt; &quot;Flipper length&quot;,</span></span>
<span class="line"><span>    :female_bill_length_mm =&gt; &quot;Length&quot;,</span></span>
<span class="line"><span>    :female_bill_depth_mm =&gt; &quot;Depth&quot;,</span></span>
<span class="line"><span>    :female_flipper_length_mm =&gt; &quot;Flipper length&quot;,</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cols_label!(tbl, label_dict)</span></span>
<span class="line"><span>render(tbl)</span></span></code></pre></div>`,16)])])}const h=s(p,[["render",t]]);export{m as __pageData,h as default};
