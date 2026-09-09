const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const R=require('./review-core.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/data.js','utf8'),context);
const D=JSON.parse(JSON.stringify(context.window.DAG_DATA));
test('Source graph has 27 nodes, 50 unique directed edges and no cycle',()=>{
 assert.equal(D.nodes.length,27);assert.equal(D.edges.length,50);
 assert.equal(new Set(D.edges.map(e=>`${e.from}->${e.to}`)).size,50);
 const visited=new Set(),stack=new Set();function visit(id){assert(!stack.has(id));if(visited.has(id))return;stack.add(id);for(const e of D.edges.filter(e=>e.from===id)){assert(D.nodes.some(n=>n.id===e.to));visit(e.to);}stack.delete(id);visited.add(id);}D.nodes.forEach(n=>visit(n.id));
 assert.equal(D.nodes.find(n=>n.name==='Current-pregnancy obstetric complications').domain,'non-core');
});
test('Every review starts empty; reasons required only for change or uncertain',()=>{
 const s=R.blank(D);assert.equal(Object.keys(s.edges).length,50);assert(Object.values(s.edges).every(r=>!R.complete(r)));
 for(const decision of ['同意','超出专长'])assert(R.complete({decision,reason:''}));
 for(const decision of ['修改','不确定']){assert(!R.complete({decision,reason:'  '}));assert(R.complete({decision,reason:'发生时间待确认'}));}
});
test('JSON export/import preserves all expert text and identifiers',()=>{
 const s=R.blank(D);s.reviewer='Reviewer 01';s.edges.E001={decision:'修改',reason:'改为反向\nPMID:123'};s.nodes['dag-03']='需拆分';s.overall.missingEdges='A → B';
 const exported=JSON.parse(JSON.stringify(R.exported(s,D)));assert.equal(exported.graph.edges.length,50);assert.deepEqual(R.normalize(exported,D),s);
});
test('Invalid imports do not mutate existing state',()=>{
 const s=R.blank(D),before=JSON.stringify(s);for(const change of [x=>x.graphHash='wrong',x=>x.edges.E001.decision='支持',x=>delete x.edges.E001,x=>x.nodes.bad='text',x=>x.reviewer='<'.repeat(121)]){const bad=structuredClone(s);change(bad);assert.throws(()=>R.normalize(bad,D));}assert.equal(JSON.stringify(s),before);
});
test('CSV preserves Chinese, multiline text and guards spreadsheet formulas',()=>{
 const s=R.blank(D);s.edges.E001={decision:'不确定',reason:'=HYPERLINK("bad")\n第二行'};const out=R.csv(s,D);assert(out.startsWith('\uFEFF'));assert(out.includes("' =")==false);assert(out.includes("'="));assert(out.includes('""bad""'));assert(out.includes('遗漏箭头'));assert(out.includes('E050'));assert.equal(R.csvCell('  @test'),'"\'  @test"');
});
test('Public data contains no local paths or expert judgments',()=>{
 const text=JSON.stringify(D);assert(!/\/Users\/|手动填写文件夹|source_locator|李雪/.test(text));assert(D.nodes.every(n=>!Object.hasOwn(n,'decision')));for(const n of D.nodes)for(const l of n.labels)for(const url of l.sources)assert(/^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/\d+\/$/.test(url));
});
