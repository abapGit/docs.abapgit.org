import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,b as a,d as i,e as t,f as n,a as l,r as p,o as h}from"./app-d4zT3DN9.js";const d={};function c(k,e){const s=p("RouteLink");return h(),o("div",null,[a("p",null,[e[1]||(e[1]=i("All files for an object are located in the same folder, each folder corresponds to a package. Sub-packages are organized under parent packages (directories) according to the logic described in the ")),t(s,{to:"/user-guide/repo-settings/dot-abapgit.html"},{default:n(()=>e[0]||(e[0]=[i("Repository Settings")])),_:1}),e[2]||(e[2]=i("."))]),e[8]||(e[8]=l('<h2 id="naming" tabindex="-1"><a class="header-anchor" href="#naming"><span>Naming</span></a></h2><p>In general, the names of files containing the object definitions are derived from the TADIR entry i.e. object type and object name. Filenames are lower case and adhere to the following patterns:</p><ul><li><code>&lt;object_name&gt;.&lt;object_type&gt;.&lt;extension&gt;</code>: Object metadata. Supported extensions: <code>xml</code> or <code>json</code></li><li><code>&lt;object_name&gt;.&lt;object_type&gt;.&lt;extra&gt;.&lt;extension&gt;</code>: Additional object data. Typical extensions: <code>abap</code>, <code>html</code>, <code>js</code>, etc.</li><li><code>&lt;object_name&gt;.&lt;object_type&gt;.i18n.&lt;language&gt;.&lt;extension&gt;</code>: Language-specific translation files: Supported extensions: <code>po</code> or <code>properties</code></li></ul><h2 id="codepage-eol-eof-indentation" tabindex="-1"><a class="header-anchor" href="#codepage-eol-eof-indentation"><span>Codepage, EOL, EOF, Indentation</span></a></h2><p>Metadata, ABAP coding, and translation files are stored in <code>UFT-8</code> with leading <a href="https://en.wikipedia.org/wiki/Byte_order_mark" target="_blank" rel="noopener noreferrer">Byte-order-mark (xEF BB BF)</a>, linefeed (x0A) as end-of-line character and a final newline character. Indentation is set to 2 and uses spaces, not tabs. See <a href="https://github.com/abapGit/abapGit/blob/main/.editorconfig" target="_blank" rel="noopener noreferrer">.editorconfig</a> for details.</p><h2 id="formats" tabindex="-1"><a class="header-anchor" href="#formats"><span>Formats</span></a></h2><h3 id="classic-abapgit-format" tabindex="-1"><a class="header-anchor" href="#classic-abapgit-format"><span>Classic abapGit Format</span></a></h3><p>Each object is represented by at least one XML file, which contains the object metadata. Depending on the object type, other files may be added like a file with <code>abap</code> extension for source code.</p>',8)),a("p",null,[e[4]||(e[4]=i("The XML file contains a root ")),e[5]||(e[5]=a("code",null,"<abapGit>",-1)),e[6]||(e[6]=i(" tag which specifies the ")),t(s,{to:"/development-guide/serializers/overview.html"},{default:n(()=>e[3]||(e[3]=[i("serializer class")])),_:1}),e[7]||(e[7]=i(" and version used by abapGit to convert the object to files and vice versa (see example below)."))]),e[9]||(e[9]=l(`<p>Translations are either included in the XML file or stored in a separate <code>i18n.&lt;language&gt;.po</code> file.</p><h4 id="example" tabindex="-1"><a class="header-anchor" href="#example"><span>Example</span></a></h4><p>Here&#39;s an example for an ABAP OO Class, object type <code>CLAS</code> (See also <a href="https://github.com/abapGit-tests/CLAS_full" target="_blank" rel="noopener noreferrer">test repo</a>).</p><p>The following files correspond to the editable parts in source-based class builder or ABAP in Eclipse:</p><ul><li><code>zcl_example.clas.abap</code></li><li><code>zcl_example.clas.locals_def.abap</code></li><li><code>zcl_example.clas.locals_imp.abap</code></li><li><code>zcl_example.clas.testclasses.abap</code></li><li><code>zcl_example.clas.macros.abap</code></li></ul><p>Files do not exist if empty, i.e. the developer did not choose to implement them.</p><p>One XML file <code>zcl_example.clas.xml</code> containing:</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">\uFEFF*&lt;?</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">xml</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;1.0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> encoding</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;utf-8&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">?&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">abapGit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;v1.0.0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> serializer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;LCL_OBJECT_CLAS&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> serializer_version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;v1.0.0&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">asx:abap</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> xmlns:asx</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;http://www.sap.com/abapxml&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;1.0&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">asx:values</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">   &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">VSEOCLASS</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">CLSNAME</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;ZCL_ABAPGIT_FACTORY&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">CLSNAME</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">LANGU</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;E&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">LANGU</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">DESCRIPT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;abapGit - Factory&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">DESCRIPT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">STATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;1&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">STATE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">CLSCCINCL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;X&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">CLSCCINCL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">FIXPT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;X&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">FIXPT</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">UNICODE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;X&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">UNICODE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">   &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">VSEOCLASS</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">asx:values</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">asx:abap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">abapGit</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">*:</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Example XML data:</p><ul><li>VSEOCLASS information</li><li>TPOOL information</li><li>SOTR information</li><li>LINES from DOKU</li><li>Descriptions from SEOCOMPOTX</li></ul><h3 id="sap-abap-file-format" tabindex="-1"><a class="header-anchor" href="#sap-abap-file-format"><span>SAP ABAP File Format</span></a></h3><p>Newer object types are represented by a JSON file and follow the <a href="https://github.com/SAP/abap-file-formats" target="_blank" rel="noopener noreferrer">ABAP File Format (AFF)</a>.</p><p>Object types supporting AFF are registered <a href="https://github.com/abapGit/abapGit/blob/main/src/objects/aff/zcl_abapgit_aff_registry.clas.abap#L48" target="_blank" rel="noopener noreferrer">here</a>.</p><p>Translations are stored in separate <code>i18n.&lt;language&gt;.properties</code> files (see <a href="https://github.com/SAP/abap-file-formats/blob/main/docs/properties.md" target="_blank" rel="noopener noreferrer">AFF properties file</a>).</p><h2 id="source-code-reference" tabindex="-1"><a class="header-anchor" href="#source-code-reference"><span>Source Code Reference</span></a></h2><p><a href="https://github.com/abapGit/abapGit/blob/main/src/objects/core/zcl_abapgit_filename_logic.clas.abap" target="_blank" rel="noopener noreferrer">zcl_abapgit_filename_logic</a></p><ul><li><code>file_to_object</code>: Get object from filename and path</li><li><code>object_to_file</code>: Get filename from object</li><li><code>detect_object_definition</code>: Return flags to detect if filename represents an object definition i.e. has an <code>xml</code> or <code>json</code> extension</li><li><code>is_obj_definition_file</code>: Return boolean flag, if the filename represents an object definition or not (metadata)</li></ul>`,17))])}const b=r(d,[["render",c],["__file","file-formats.html.vue"]]),B=JSON.parse('{"path":"/development-guide/serializers/file-formats.html","title":"File Naming and Formats","lang":"en-US","frontmatter":{"title":"File Naming and Formats","category":"serializers","order":40,"description":"All files for an object are located in the same folder, each folder corresponds to a package. Sub-packages are organized under parent packages (directories) according to the log...","head":[["meta",{"property":"og:url","content":"https://docs.abapgit.org/development-guide/serializers/file-formats.html"}],["meta",{"property":"og:site_name","content":"abapGit Docs"}],["meta",{"property":"og:title","content":"File Naming and Formats"}],["meta",{"property":"og:description","content":"All files for an object are located in the same folder, each folder corresponds to a package. Sub-packages are organized under parent packages (directories) according to the log..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-03-22T05:13:58.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-22T05:13:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"File Naming and Formats\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-22T05:13:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"abapGit\\",\\"url\\":\\"https://github.com/abapGit\\"}]}"]]},"headers":[{"level":2,"title":"Naming","slug":"naming","link":"#naming","children":[]},{"level":2,"title":"Codepage, EOL, EOF, Indentation","slug":"codepage-eol-eof-indentation","link":"#codepage-eol-eof-indentation","children":[]},{"level":2,"title":"Formats","slug":"formats","link":"#formats","children":[{"level":3,"title":"Classic abapGit Format","slug":"classic-abapgit-format","link":"#classic-abapgit-format","children":[]},{"level":3,"title":"SAP ABAP File Format","slug":"sap-abap-file-format","link":"#sap-abap-file-format","children":[]}]},{"level":2,"title":"Source Code Reference","slug":"source-code-reference","link":"#source-code-reference","children":[]}],"git":{"createdTime":1494503262000,"updatedTime":1711084438000,"contributors":[{"name":"Marc Bernard","username":"Marc Bernard","email":"59966492+mbtools@users.noreply.github.com","commits":3,"url":"https://github.com/Marc Bernard"},{"name":"Ludwig Stockbauer-Muhr","username":"Ludwig Stockbauer-Muhr","email":"35834861+stockbal@users.noreply.github.com","commits":1,"url":"https://github.com/Ludwig Stockbauer-Muhr"},{"name":"Lars Hvam","username":"Lars Hvam","email":"larshp@hotmail.com","commits":4,"url":"https://github.com/Lars Hvam"},{"name":"larshp","username":"larshp","email":"larshp@hotmail.com","commits":2,"url":"https://github.com/larshp"}]},"readingTime":{"minutes":1.67,"words":500},"filePathRelative":"development-guide/serializers/file-formats.md","localizedDate":"May 11, 2017","autoDesc":true,"excerpt":"<p>All files for an object are located in the same folder, each folder corresponds to a package. Sub-packages are organized under parent packages (directories) according to the logic described in the <a href=\\"/user-guide/repo-settings/dot-abapgit.html\\" target=\\"_blank\\">Repository Settings</a>.</p>\\n<h2>Naming</h2>"}');export{b as comp,B as data};