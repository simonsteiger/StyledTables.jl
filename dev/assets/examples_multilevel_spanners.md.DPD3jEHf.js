import{_ as e,o as l,c as s,aA as n}from"./chunks/framework.DeH5H0ZK.js";const k=JSON.parse('{"title":"Multi-tier spanners","description":"","frontmatter":{},"headers":[],"relativePath":"examples/multilevel_spanners.md","filePath":"examples/multilevel_spanners.md","lastUpdated":null}'),i={name:"examples/multilevel_spanners.md"};function a(d,t,h,r,g,p){return l(),s("div",null,[...t[0]||(t[0]=[n(`<h1 id="Multi-tier-spanners" tabindex="-1">Multi-tier spanners <a class="header-anchor" href="#Multi-tier-spanners" aria-label="Permalink to &quot;Multi-tier spanners {#Multi-tier-spanners}&quot;">​</a></h1><p>The following example shows how layouts with several tiers of column spanners can be achieved.</p><h2 id="The-data" tabindex="-1">The data <a class="header-anchor" href="#The-data" aria-label="Permalink to &quot;The data {#The-data}&quot;">​</a></h2><p>We will use the <a href="https://allisonhorst.github.io/palmerpenguins/" target="_blank" rel="noreferrer"><code>PalmerPenguins</code></a> data.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DataFrames, Chain, StyledTables</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Statistics</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mean</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> DataFrame</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(StyledTables</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">penguins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">describe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(df)</span></span></code></pre></div><div><div><div style = "float: left;"><span>7×7 DataFrame</span></div><div style = "clear: both;"></div></div><div class = "data-frame" style = "overflow-x: scroll;"><table class = "data-frame" style = "margin-bottom: 6px;"><thead><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;">Row</th><th style = "text-align: left;">variable</th><th style = "text-align: left;">mean</th><th style = "text-align: left;">min</th><th style = "text-align: left;">median</th><th style = "text-align: left;">max</th><th style = "text-align: left;">nmissing</th><th style = "text-align: left;">eltype</th></tr><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;"></th><th title = "Symbol" style = "text-align: left;">Symbol</th><th title = "Union{Nothing, Float64}" style = "text-align: left;">Union…</th><th title = "Any" style = "text-align: left;">Any</th><th title = "Union{Nothing, Float64}" style = "text-align: left;">Union…</th><th title = "Any" style = "text-align: left;">Any</th><th title = "Int64" style = "text-align: left;">Int64</th><th title = "DataType" style = "text-align: left;">DataType</th></tr></thead><tbody><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">1</td><td style = "text-align: left;">species</td><td style = "font-style: italic; text-align: left;"></td><td style = "text-align: left;">Adelie</td><td style = "font-style: italic; text-align: left;"></td><td style = "text-align: left;">Gentoo</td><td style = "text-align: right;">0</td><td style = "text-align: left;">String</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">2</td><td style = "text-align: left;">island</td><td style = "font-style: italic; text-align: left;"></td><td style = "text-align: left;">Biscoe</td><td style = "font-style: italic; text-align: left;"></td><td style = "text-align: left;">Torgersen</td><td style = "text-align: right;">0</td><td style = "text-align: left;">String</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">3</td><td style = "text-align: left;">bill_length_mm</td><td style = "text-align: left;">43.9928</td><td style = "text-align: left;">32.1</td><td style = "text-align: left;">44.5</td><td style = "text-align: left;">59.6</td><td style = "text-align: right;">0</td><td style = "text-align: left;">Float64</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">4</td><td style = "text-align: left;">bill_depth_mm</td><td style = "text-align: left;">17.1649</td><td style = "text-align: left;">13.1</td><td style = "text-align: left;">17.3</td><td style = "text-align: left;">21.5</td><td style = "text-align: right;">0</td><td style = "text-align: left;">Float64</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">5</td><td style = "text-align: left;">flipper_length_mm</td><td style = "text-align: left;">200.967</td><td style = "text-align: left;">172</td><td style = "text-align: left;">197.0</td><td style = "text-align: left;">231</td><td style = "text-align: right;">0</td><td style = "text-align: left;">Int64</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">6</td><td style = "text-align: left;">body_mass_g</td><td style = "text-align: left;">4207.06</td><td style = "text-align: left;">2700</td><td style = "text-align: left;">4050.0</td><td style = "text-align: left;">6300</td><td style = "text-align: right;">0</td><td style = "text-align: left;">Int64</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">7</td><td style = "text-align: left;">sex</td><td style = "font-style: italic; text-align: left;"></td><td style = "text-align: left;">female</td><td style = "font-style: italic; text-align: left;"></td><td style = "text-align: left;">male</td><td style = "text-align: right;">0</td><td style = "text-align: left;">String</td></tr></tbody></table></div></div><p>Our goal is to summarise the data by island, species, and sex.</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bill_cols </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bill_length_mm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:bill_depth_mm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">number_cols </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.(bill_cols)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;flipper_length_mm&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># , &quot;body_mass_g&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">male_ordered </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;male_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> number_cols]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">female_ordered </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;female_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> colname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> number_cols]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">summary </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @chain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> df </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">begin</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:species</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, number_cols</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    dropmissing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    groupby</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:species</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    combine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Cols</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">r&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">_mm$|_g$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mean </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> identity)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    stack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, number_cols)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    transform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:variable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ByRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((s, v) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> join</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([s, v], </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;_&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> :sex_variable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Not</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sex</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:variable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    unstack</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:sex_variable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    transform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ByRow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">$x</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Is.&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> identity)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(_, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:species</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, male_ordered</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, female_ordered</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><div><div><div style = "float: left;"><span>5×8 DataFrame</span></div><div style = "clear: both;"></div></div><div class = "data-frame" style = "overflow-x: scroll;"><table class = "data-frame" style = "margin-bottom: 6px;"><thead><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;">Row</th><th style = "text-align: left;">island</th><th style = "text-align: left;">species</th><th style = "text-align: left;">male_bill_length_mm</th><th style = "text-align: left;">male_bill_depth_mm</th><th style = "text-align: left;">male_flipper_length_mm</th><th style = "text-align: left;">female_bill_length_mm</th><th style = "text-align: left;">female_bill_depth_mm</th><th style = "text-align: left;">female_flipper_length_mm</th></tr><tr class = "columnLabelRow"><th class = "stubheadLabel" style = "font-weight: bold; text-align: right;"></th><th title = "String" style = "text-align: left;">String</th><th title = "String" style = "text-align: left;">String</th><th title = "Union{Missing, Float64}" style = "text-align: left;">Float64?</th><th title = "Union{Missing, Float64}" style = "text-align: left;">Float64?</th><th title = "Union{Missing, Float64}" style = "text-align: left;">Float64?</th><th title = "Union{Missing, Float64}" style = "text-align: left;">Float64?</th><th title = "Union{Missing, Float64}" style = "text-align: left;">Float64?</th><th title = "Union{Missing, Float64}" style = "text-align: left;">Float64?</th></tr></thead><tbody><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">1</td><td style = "text-align: left;">Torgersen Is.</td><td style = "text-align: left;">Adelie</td><td style = "text-align: right;">40.587</td><td style = "text-align: right;">19.3913</td><td style = "text-align: right;">194.913</td><td style = "text-align: right;">37.5542</td><td style = "text-align: right;">17.55</td><td style = "text-align: right;">188.292</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">2</td><td style = "text-align: left;">Biscoe Is.</td><td style = "text-align: left;">Adelie</td><td style = "text-align: right;">40.5909</td><td style = "text-align: right;">19.0364</td><td style = "text-align: right;">190.409</td><td style = "text-align: right;">37.3591</td><td style = "text-align: right;">17.7045</td><td style = "text-align: right;">187.182</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">3</td><td style = "text-align: left;">Dream Is.</td><td style = "text-align: left;">Adelie</td><td style = "text-align: right;">40.0714</td><td style = "text-align: right;">18.8393</td><td style = "text-align: right;">191.929</td><td style = "text-align: right;">36.9111</td><td style = "text-align: right;">17.6185</td><td style = "text-align: right;">187.852</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">4</td><td style = "text-align: left;">Biscoe Is.</td><td style = "text-align: left;">Gentoo</td><td style = "text-align: right;">49.4738</td><td style = "text-align: right;">15.718</td><td style = "text-align: right;">221.541</td><td style = "text-align: right;">45.5638</td><td style = "text-align: right;">14.2379</td><td style = "text-align: right;">212.707</td></tr><tr class = "dataRow"><td class = "rowLabel" style = "font-weight: bold; text-align: right;">5</td><td style = "text-align: left;">Dream Is.</td><td style = "text-align: left;">Chinstrap</td><td style = "text-align: right;">51.0941</td><td style = "text-align: right;">19.2529</td><td style = "text-align: right;">199.912</td><td style = "text-align: right;">46.5735</td><td style = "text-align: right;">17.5882</td><td style = "text-align: right;">191.735</td></tr></tbody></table></div></div><p>The table we want to create will feature island as the row group, and the species present on each island are listed in each group. As some of the length measurements we summarised describe the bill, we will group these as a column spanner. Finally, a higher-order column spanner will indicate which measurements are from female and which from male penguins.</p><h2 id="Step-1:-Row-groups" tabindex="-1">Step 1: Row groups <a class="header-anchor" href="#Step-1:-Row-groups" aria-label="Permalink to &quot;Step 1: Row groups {#Step-1:-Row-groups}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tbl </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> StyledTable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(summary)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_row_group!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_hide!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:island</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-0b7a8f25">
    <style>
        #st-0b7a8f25 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-0b7a8f25 tr {
            background-color: transparent;
            border: none;
        }
        #st-0b7a8f25 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-0b7a8f25 br {
            line-height: 0em;
            margin: 0;
        }
        #st-0b7a8f25 sub {
            line-height: 0;
        }
        #st-0b7a8f25 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">species</td>
        <td style="font-weight:bold;text-align:left;">male_bill_length_mm</td>
        <td style="font-weight:bold;text-align:left;">male_bill_depth_mm</td>
        <td style="font-weight:bold;text-align:left;">male_flipper_length_mm</td>
        <td style="font-weight:bold;text-align:left;">female_bill_length_mm</td>
        <td style="font-weight:bold;text-align:left;">female_bill_depth_mm</td>
        <td style="font-weight:bold;text-align:left;">female_flipper_length_mm</td>
    </tr>
        <tr><td colspan="7" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Torgersen Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.6</td>
        <td style="text-align:left;">19.4</td>
        <td style="text-align:left;">195</td>
        <td style="text-align:left;">37.6</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.6</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">190</td>
        <td style="text-align:left;">37.4</td>
        <td style="text-align:left;">17.7</td>
        <td style="text-align:left;">187</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.1</td>
        <td style="text-align:left;">18.8</td>
        <td style="text-align:left;">192</td>
        <td style="text-align:left;">36.9</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Gentoo</td>
        <td style="text-align:left;">49.5</td>
        <td style="text-align:left;">15.7</td>
        <td style="text-align:left;">222</td>
        <td style="text-align:left;">45.6</td>
        <td style="text-align:left;">14.2</td>
        <td style="text-align:left;">213</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Chinstrap</td>
        <td style="text-align:left;">51.1</td>
        <td style="text-align:left;">19.3</td>
        <td style="text-align:left;">200</td>
        <td style="text-align:left;">46.6</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">192</td>
    </tr>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Step-2:-Level-one-spanner" tabindex="-1">Step 2: Level one spanner <a class="header-anchor" href="#Step-2:-Level-one-spanner" aria-label="Permalink to &quot;Step 2: Level one spanner {#Step-2:-Level-one-spanner}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Bill measures&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;male_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> .*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.(bill_cols))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Bill measures&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;female_&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> .*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.(bill_cols))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-06682ed4">
    <style>
        #st-06682ed4 {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-06682ed4 tr {
            background-color: transparent;
            border: none;
        }
        #st-06682ed4 tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-06682ed4 br {
            line-height: 0em;
            margin: 0;
        }
        #st-06682ed4 sub {
            line-height: 0;
        }
        #st-06682ed4 sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">species</td>
        <td style="font-weight:bold;text-align:left;">male_bill_length_mm</td>
        <td style="font-weight:bold;text-align:left;">male_bill_depth_mm</td>
        <td style="font-weight:bold;text-align:left;">male_flipper_length_mm</td>
        <td style="font-weight:bold;text-align:left;">female_bill_length_mm</td>
        <td style="font-weight:bold;text-align:left;">female_bill_depth_mm</td>
        <td style="font-weight:bold;text-align:left;">female_flipper_length_mm</td>
    </tr>
        <tr><td colspan="7" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Torgersen Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.6</td>
        <td style="text-align:left;">19.4</td>
        <td style="text-align:left;">195</td>
        <td style="text-align:left;">37.6</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.6</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">190</td>
        <td style="text-align:left;">37.4</td>
        <td style="text-align:left;">17.7</td>
        <td style="text-align:left;">187</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.1</td>
        <td style="text-align:left;">18.8</td>
        <td style="text-align:left;">192</td>
        <td style="text-align:left;">36.9</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Gentoo</td>
        <td style="text-align:left;">49.5</td>
        <td style="text-align:left;">15.7</td>
        <td style="text-align:left;">222</td>
        <td style="text-align:left;">45.6</td>
        <td style="text-align:left;">14.2</td>
        <td style="text-align:left;">213</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Chinstrap</td>
        <td style="text-align:left;">51.1</td>
        <td style="text-align:left;">19.3</td>
        <td style="text-align:left;">200</td>
        <td style="text-align:left;">46.6</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">192</td>
    </tr>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Step-3:-Level-two-spanner" tabindex="-1">Step 3: Level two spanner <a class="header-anchor" href="#Step-3:-Level-two-spanner" aria-label="Permalink to &quot;Step 3: Level two spanner {#Step-3:-Level-two-spanner}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Male&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> male_ordered, level</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">tab_spanner!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Female&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> female_ordered, level</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-8b120f0e">
    <style>
        #st-8b120f0e {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-8b120f0e tr {
            background-color: transparent;
            border: none;
        }
        #st-8b120f0e tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-8b120f0e br {
            line-height: 0em;
            margin: 0;
        }
        #st-8b120f0e sub {
            line-height: 0;
        }
        #st-8b120f0e sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="3" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Male</td>
        <td colspan="3" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Female</td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">species</td>
        <td style="font-weight:bold;text-align:left;">male_bill_length_mm</td>
        <td style="font-weight:bold;text-align:left;">male_bill_depth_mm</td>
        <td style="font-weight:bold;text-align:left;">male_flipper_length_mm</td>
        <td style="font-weight:bold;text-align:left;">female_bill_length_mm</td>
        <td style="font-weight:bold;text-align:left;">female_bill_depth_mm</td>
        <td style="font-weight:bold;text-align:left;">female_flipper_length_mm</td>
    </tr>
        <tr><td colspan="7" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Torgersen Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.6</td>
        <td style="text-align:left;">19.4</td>
        <td style="text-align:left;">195</td>
        <td style="text-align:left;">37.6</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.6</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">190</td>
        <td style="text-align:left;">37.4</td>
        <td style="text-align:left;">17.7</td>
        <td style="text-align:left;">187</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40.1</td>
        <td style="text-align:left;">18.8</td>
        <td style="text-align:left;">192</td>
        <td style="text-align:left;">36.9</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Gentoo</td>
        <td style="text-align:left;">49.5</td>
        <td style="text-align:left;">15.7</td>
        <td style="text-align:left;">222</td>
        <td style="text-align:left;">45.6</td>
        <td style="text-align:left;">14.2</td>
        <td style="text-align:left;">213</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Chinstrap</td>
        <td style="text-align:left;">51.1</td>
        <td style="text-align:left;">19.3</td>
        <td style="text-align:left;">200</td>
        <td style="text-align:left;">46.6</td>
        <td style="text-align:left;">17.6</td>
        <td style="text-align:left;">192</td>
    </tr>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div><h2 id="Step-4:-Add-column-labels" tabindex="-1">Step 4: Add column labels <a class="header-anchor" href="#Step-4:-Add-column-labels" aria-label="Permalink to &quot;Step 4: Add column labels {#Step-4:-Add-column-labels}&quot;">​</a></h2><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">label_dict </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Dict</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :species</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Species&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :male_bill_length_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Length&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :male_bill_depth_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Depth&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :male_flipper_length_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Flipper length&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :female_bill_length_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Length&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :female_bill_depth_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Depth&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    :female_flipper_length_mm</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Flipper length&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cols_label!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, label_dict)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fmt_integer!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl, [male_ordered</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, female_ordered</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tbl)</span></span></code></pre></div><div><table id="st-fbb096be">
    <style>
        #st-fbb096be {
            border: none;
            margin: 0 auto;
            padding: 0.25rem;
            border-collapse: separate;
            border-spacing: 0.85em 0.2em;
            line-height: 1.2em;
        }
        #st-fbb096be tr {
            background-color: transparent;
            border: none;
        }
        #st-fbb096be tr td {
            vertical-align: top;
            padding: 0;
            border: none;
            background-color: transparent;
        }
        #st-fbb096be br {
            line-height: 0em;
            margin: 0;
        }
        #st-fbb096be sub {
            line-height: 0;
        }
        #st-fbb096be sup {
            line-height: 0;
        }
    </style>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="3" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Male</td>
        <td colspan="3" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Female</td>
    </tr>
    <tr>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
        <td style="text-align:center;"></td>
        <td colspan="2" style="font-weight:bold;border-bottom:1px solid currentColor; padding-bottom: 0.25em;text-align:center;">Bill measures</td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Species</td>
        <td style="font-weight:bold;text-align:left;">Length</td>
        <td style="font-weight:bold;text-align:left;">Depth</td>
        <td style="font-weight:bold;text-align:left;">Flipper length</td>
        <td style="font-weight:bold;text-align:left;">Length</td>
        <td style="font-weight:bold;text-align:left;">Depth</td>
        <td style="font-weight:bold;text-align:left;">Flipper length</td>
    </tr>
        <tr><td colspan="7" style="border-bottom:1px solid currentColor;padding:0"></td></tr>    <tr>
        <td style="font-weight:bold;text-align:left;">Torgersen Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">41</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">195</td>
        <td style="text-align:left;">38</td>
        <td style="text-align:left;">18</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">41</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">190</td>
        <td style="text-align:left;">37</td>
        <td style="text-align:left;">18</td>
        <td style="text-align:left;">187</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Adelie</td>
        <td style="text-align:left;">40</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">192</td>
        <td style="text-align:left;">37</td>
        <td style="text-align:left;">18</td>
        <td style="text-align:left;">188</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Biscoe Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Gentoo</td>
        <td style="text-align:left;">49</td>
        <td style="text-align:left;">16</td>
        <td style="text-align:left;">222</td>
        <td style="text-align:left;">46</td>
        <td style="text-align:left;">14</td>
        <td style="text-align:left;">213</td>
    </tr>
    <tr>
        <td style="font-weight:bold;text-align:left;">Dream Is.</td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
        <td style="text-align:center;"></td>
    </tr>
    <tr>
        <td style="padding-left:12.0pt;text-align:left;">Chinstrap</td>
        <td style="text-align:left;">51</td>
        <td style="text-align:left;">19</td>
        <td style="text-align:left;">200</td>
        <td style="text-align:left;">47</td>
        <td style="text-align:left;">18</td>
        <td style="text-align:left;">192</td>
    </tr>
    <tr><td colspan="7" style="border-bottom: 1.5px solid currentColor; padding: 0"></td></tr>
</table></div>`,22)])])}const o=e(i,[["render",a]]);export{k as __pageData,o as default};
