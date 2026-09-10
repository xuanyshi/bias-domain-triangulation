const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const R=require('./review-core.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync(__dirname+'/data.js','utf8'),context);
const D=JSON.parse(JSON.stringify(context.window.DAG_DATA));
test('S1 review has 31 nodes and preserves the 50 original directed edges without cycles',()=>{
 assert.equal(D.nodes.length,31);assert.equal(D.edges.length,50);
 assert.equal(new Set(D.edges.map(e=>`${e.from}->${e.to}`)).size,50);
 const visited=new Set(),stack=new Set();function visit(id){assert(!stack.has(id));if(visited.has(id))return;stack.add(id);for(const e of D.edges.filter(e=>e.from===id)){assert(D.nodes.some(n=>n.id===e.to));visit(e.to);}stack.delete(id);visited.add(id);}D.nodes.forEach(n=>visit(n.id));
 assert.equal(D.nodes.find(n=>n.name==='Current-pregnancy obstetric complications').domain,'non-core');
});
test('Every review starts empty; reasons required only for change or uncertain',()=>{
 const s=R.blank(D);assert.equal(Object.keys(s.edges).length,50);assert(Object.values(s.edges).every(r=>!R.complete(r)));
 for(const decision of ['保留','超出专长'])assert(R.complete({decision,reason:''}));
 for(const decision of ['修改','不确定']){assert(!R.complete({decision,reason:'  '}));assert(R.complete({decision,change:'限定时间或条件',reason:'发生时间待确认'}));}
});
test('JSON export/import preserves all expert text and identifiers',()=>{
 const s=R.blank(D);s.reviewer='Reviewer 01';s.edges.E001={decision:'修改',change:'反向',reason:'改为反向\nPMID:123'};s.nodes['dag-03']='需拆分';s.overall.missingEdges='A → B';
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
test('Legacy schema migrates decisions and comments without inventing node or domain reviews',()=>{
 const now=R.blank(D);const old={schema:1,version:D.version,graphHash:D.graphHash,reviewer:'E1',updatedAt:null,edges:Object.fromEntries(D.edges.map(e=>[e.id,{decision:'',reason:''}])),nodes:now.nodes,overall:now.overall};old.edges.E001={decision:'同意',reason:'旧意见'};old.edges.E002={decision:'修改',reason:'待调整'};old.nodes['dag-03']='原节点备注';const before=JSON.stringify(old),s=R.normalize(old,D);assert.equal(s.edges.E001.decision,'保留');assert.equal(s.edges.E002.change,'其他');assert.equal(s.nodes['dag-03'],'原节点备注');assert.equal(s.nodeReviews['dag-03'],'');assert.equal(s.domains.B1.decision,'');assert.equal(JSON.stringify(old),before);
});
const proposed=()=>({id:'P-test',type:'拆分现有节点',target:'dag-22',name:'儿童性别；评估年龄',definition:'按时间和作用分别定义',timing:'出生；结局评估时',connections:'儿童性别 → 结局；评估年龄 → 结局',reason:'两类变量作用不同',source:'',createdAt:'2026-09-09'});
const pack=()=>({kind:'dag-review-package',version:D.version,graphHash:D.graphHash,packageId:'package-1',issues:[{type:'edge',id:'E001',summary:'专家 A：不确定'},{type:'overall',id:'timing',summary:'核查时间'}],proposals:[proposed()]});
test('Round 2 preserves immutable first-round values through JSON and CSV round trip',()=>{
 const s=R.blank(D);s.reviewer='E1';s.edges.E001={decision:'不确定',change:'',reason:'先查文献'};s.nodeReviews['dag-22']='有问题';s.nodes['dag-22']='需要拆分';s.proposals.push(proposed());const t=R.beginRound(s,pack(),D);t.edges.E001={decision:'保留',change:'',reason:'已复核'};t.proposalReviews['P-test']={decision:'保留',change:'',reason:''};assert.equal(t.firstRound.edges.E001.decision,'不确定');assert.equal(s.round,1);assert.deepEqual(R.normalize(JSON.parse(JSON.stringify(R.exported(t,D))),D),t);const c=R.csv(t,D);assert(c.includes('先查文献'));assert(c.includes('已复核'));assert(c.includes('提议复核'));
 const second=R.beginRound(t,{...pack(),packageId:'package-2'},D);assert.equal(second.firstRound.edges.E001.decision,'不确定');assert.equal(second.proposalReviews['P-test'].decision,'保留');
});
test('Proposals stay outside baseline graph and require definition, time, links, reason, and split target',()=>{
 const p=proposed();assert(R.proposalComplete(p));for(const key of ['name','definition','timing','connections','reason','target'])assert(!R.proposalComplete({...p,[key]:''}));const s=R.blank(D);s.proposals.push(p);assert.equal(R.exported(s,D).graph.edges.length,50);assert.equal(R.exported(s,D).graph.nodes.length,31);assert.equal(R.normalize(s,D).proposals.length,1);
});
test('Panel agreement distinguishes missing, out-of-expertise, uncertainty and majority',()=>{
 const rs=[R.blank(D),R.blank(D),R.blank(D)];rs.forEach((r,i)=>r.reviewer='E'+i);const keep={decision:'保留',change:'',reason:''};rs[0].edges.E001={...keep};rs[1].edges.E001={...keep};assert.equal(R.summarize(rs,D)[0].status,'待收齐');rs[2].edges.E001={decision:'超出专长',change:'',reason:''};assert.equal(R.summarize(rs,D)[0].status,'一致支持');rs[2].edges.E001={decision:'不确定',change:'',reason:'仍存疑'};assert.equal(R.summarize(rs,D)[0].status,'需复核');rs[2].edges.E001={decision:'修改',change:'删除',reason:'依据不同'};assert.equal(R.summarize(rs,D)[0].status,'需复核');assert.equal(R.summarize(rs.slice(0,2),D,3)[0].status,'待收齐');rs[1].edges.E001={decision:'超出专长',change:'',reason:''};rs[2].edges.E001={decision:'超出专长',change:'',reason:''};assert.equal(R.summarize(rs,D)[0].status,'评估覆盖不足');assert.equal(R.summarize(rs,D)[0].coverageSufficient,false);
});
test('Malformed review packages and snapshots fail without changing the current draft',()=>{
 const s=R.blank(D),before=JSON.stringify(s);for(const p of [{...pack(),graphHash:'wrong'},{...pack(),issues:[{type:'edge',id:'E999',summary:'x'}]},{...pack(),proposals:[proposed(),proposed()]}])assert.throws(()=>R.beginRound(s,p,D));assert.equal(JSON.stringify(s),before);const t=R.beginRound(s,pack(),D);t.firstRound.recordId='someone-else';assert.throws(()=>R.normalize(t,D));
});
test('First-round statistics do not change when a reviewer resolves a second-round dispute',()=>{
 const s=R.blank(D);s.edges.E001={decision:'修改',change:'删除',reason:'理由'};const t=R.beginRound(s,pack(),D);t.edges.E001={decision:'保留',change:'',reason:''};assert.equal(R.summarize([t],D,3,1)[0]['修改'],1);assert.equal(R.summarize([t],D,3,2)[0]['保留'],1);
});
function finishedReview(){const s=R.blank(D);s.reviewer='Expert 1';for(const e of D.edges)s.edges[e.id]={decision:'保留',change:'',reason:''};for(const n of D.nodes)s.nodeReviews[n.id]='未发现问题';for(const k of Object.keys(R.domains))s.domains[k]={decision:'保留',change:'',reason:''};return s;}
test('Both formal exports reject incomplete reviews and missing required details',()=>{
 const empty=R.blank(D);assert.deepEqual(R.exportStatus(empty,D).pending,{edges:50,nodes:31,domains:4,proposals:0,proposalReviews:0});
 const changes=[s=>s.reviewer=' ',s=>s.edges.E050=R.answer(),s=>s.nodeReviews['dag-27']='',s=>s.domains.B4=R.answer(),s=>s.edges.E001={decision:'不确定',change:'',reason:' '},s=>s.edges.E001={decision:'修改',change:'',reason:'删除依据'},s=>{s.nodeReviews['dag-03']='有问题';s.nodes['dag-03']=' ';},s=>s.domains.B2={decision:'修改',change:'调整评级规则',reason:''},s=>s.proposals.push({...proposed(),reason:''})];
 for(const s of [empty,...changes.map(change=>{const s=finishedReview();change(s);return s;})]){const before=JSON.stringify(s);assert(!R.exportStatus(s,D).ready);for(const format of ['json','csv'])assert.throws(()=>R.exportReview(s,D,format),/尚未完成/);assert.equal(JSON.stringify(s),before);}
});
test('Completed export accepts uncertainty and out-of-expertise without requiring agreement',()=>{
 const s=finishedReview();s.edges.E001={decision:'不确定',change:'',reason:'时间关系尚待确认'};s.edges.E002={decision:'超出专长',change:'',reason:''};s.nodeReviews['dag-03']='无法判断';s.domains.B4={decision:'修改',change:'限定时间或条件',reason:'按暴露窗口区分'};
 assert(R.exportStatus(s,D).ready);assert.deepEqual(R.normalize(R.exportReview(s,D),D),s);assert(R.exportReview(s,D,'csv').includes('时间关系尚待确认'));
 // Clearing a previously finished answer must lock export again.
 s.edges.E002=R.answer();assert(!R.exportStatus(s,D).ready);assert.throws(()=>R.exportReview(s,D,'csv'),/尚未完成/);
});
test('Round 2 cannot export while a requested proposal review is missing or incomplete',()=>{
 const s=R.beginRound(finishedReview(),pack(),D);assert.equal(R.exportStatus(s,D).pending.proposalReviews,1);for(const format of ['json','csv'])assert.throws(()=>R.exportReview(s,D,format));
 s.proposalReviews['P-test']={decision:'不确定',change:'',reason:' '};assert(!R.exportStatus(s,D).ready);
 s.proposalReviews['P-test'].reason='需要进一步的时间依据';assert(R.exportStatus(s,D).ready);assert.equal(R.exportReview(s,D).firstRound.round,1);
 delete s.proposalReviews['P-test'];assert(!R.exportStatus(s,D).ready);assert.throws(()=>R.exportReview(s,D));
});
test('All S1 constructs have unique rows; the four additional constructs have no invented edges',()=>{
 const constructs=D.nodes.filter(n=>n.s1Order);assert.equal(constructs.length,29);assert.deepEqual(constructs.map(n=>n.s1Order),Array.from({length:29},(_,i)=>i+1));
 const extras=constructs.filter(n=>n.s1Only);assert.deepEqual(extras.map(n=>n.constructId),['N04','N05','N06','N09']);for(const n of extras)assert(!D.edges.some(e=>e.from===n.id||e.to===n.id));
});
test('Known prior baseline migrates without losing judgments and locks export for four new nodes',()=>{
 const oldD=R.previousData(D),old=R.blank(oldD);old.reviewer='Expert 1';for(const e of oldD.edges)old.edges[e.id]={decision:'保留',change:'',reason:''};for(const n of oldD.nodes)old.nodeReviews[n.id]='未发现问题';for(const k of Object.keys(R.domains))old.domains[k]={decision:'保留',change:'',reason:''};old.nodes['dag-03']='保留原意见';
 const before=JSON.stringify(old),s=R.normalize(old,D);assert.equal(JSON.stringify(old),before);assert.equal(s.version,D.version);assert.deepEqual(s.edges,old.edges);assert.equal(s.nodes['dag-03'],'保留原意见');assert.deepEqual(s.baselineSnapshot,old);assert.equal(R.exportStatus(s,D).pending.nodes,4);assert.throws(()=>R.exportReview(s,D));
 for(const n of D.nodes.filter(n=>n.s1Only))s.nodeReviews[n.id]='无法判断';assert.deepEqual(R.normalize(R.exportReview(s,D),D),s);assert.deepEqual(s.baselineSnapshot,old);
 assert.throws(()=>R.normalize({...old,graphHash:'unexpected'},D));const broken=structuredClone(old);delete broken.nodes['dag-03'];assert.throws(()=>R.normalize(broken,D));
});
test('Prior round-two records and packages migrate while the original snapshot stays intact',()=>{
 const oldD=R.previousData(D),old=R.blank(oldD);old.reviewer='E1';old.edges.E001={decision:'不确定',change:'',reason:'首轮意见'};
 const oldPack={...pack(),version:oldD.version,graphHash:oldD.graphHash};const second=R.beginRound(old,oldPack,oldD);second.edges.E001={decision:'保留',change:'',reason:'复核后保留'};const before=JSON.stringify(second);const s=R.normalize(second,D);
 assert.equal(s.firstRound.edges.E001.reason,'首轮意见');assert.equal(s.edges.E001.reason,'复核后保留');assert.deepEqual(s.baselineSnapshot,second);assert.equal(JSON.stringify(second),before);assert.equal(s.context.version,D.version);assert.equal(R.reviewPackage(oldPack,D).version,D.version);assert.deepEqual(R.normalize(R.exported(s,D),D),s);
});
