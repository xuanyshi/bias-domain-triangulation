(function(root){
'use strict';
const decisions=['保留','修改','不确定','超出专长'], nodeDecisions=['未发现问题','有问题','无法判断'];
const changes=['删除','反向','限定时间或条件','调整节点定义','调整构念归属','调整评级规则','其他'];
const proposalTypes=['新增构念','拆分现有节点','补充构念内变量','新增箭头'];
const uid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'r-'+Date.now()+'-'+Math.random().toString(36).slice(2);
const answer=()=>({decision:'',change:'',reason:''});
const domains={
 B1:{name:'Familial / genetic liability',rule:'Strong：同胞比较或家庭固定效应设计；Moderate：人群模型调整母亲神经发育易感性或精神心理易感性；Weak：未采用上述设计，也未调整上述代理构念。',question:'家族共同因素及其代理构念的归属、设计门槛是否合理？'},
 B2:{name:'Indication / maternal physical health',rule:'按已控制的不同构念计数（共 5 个）：Strong 3–5；Moderate 1–2；Weak 0。同一构念的重复变量计一次。',question:'构念范围、变量归属与覆盖阈值是否需要调整？'},
 B3:{name:'Sociodemographic/lifestyle',rule:'按已控制的不同构念计数（共 8 个）：Strong 4–8；Moderate 1–3；Weak 0。同一构念的重复变量计一次。',question:'构念范围、变量归属与覆盖阈值是否需要调整？'},
 B4:{name:'Post-exposure adjustment / selection mechanisms',rule:'不评 Strong / Moderate / Weak。核查贡献效应估计的具体模型是否调整中介或其他暴露后变量，或对碰撞点及其后代进行条件化；记录 Yes / No，用于排除相应估计的敏感性分析。妊娠并发症需按具体时间判断；一般入组或选择机制不能直接等同于模型中已作调整。',question:'哪些变量及条件化操作应触发 B4，时间范围与判定边界是否清楚？'}
};
function blank(d){return {schema:2,protocol:'2026-09-09.v2',version:d.version,graphHash:d.graphHash,recordId:uid(),reviewer:'',expertise:'',round:1,updatedAt:null,edges:Object.fromEntries(d.edges.map(e=>[e.id,answer()])),nodes:Object.fromEntries(d.nodes.map(n=>[n.id,''])),nodeReviews:Object.fromEntries(d.nodes.map(n=>[n.id,''])),domains:Object.fromEntries(Object.keys(domains).map(k=>[k,answer()])),proposals:[],proposalReviews:{},context:null,firstRound:null,overall:{missingNodes:'',missingEdges:'',timing:''}};}
function complete(r){return !!r&&decisions.includes(r.decision)&&(!['修改','不确定'].includes(r.decision)||!!r.reason.trim())&&(r.decision!=='修改'||!!r.change);}
function reviewProgress(records){return {total:records.length,completed:records.filter(complete).length,pending:records.filter(r=>r?.decision&&!complete(r)).length,unreviewed:records.filter(r=>!r?.decision).length};}
function nodeComplete(s,id){return !!s.nodeReviews[id]&&(s.nodeReviews[id]!=='有问题'||!!s.nodes[id].trim());}
function exportStatus(s,d){
 const pending={edges:d.edges.filter(e=>!complete(s.edges[e.id])).length,nodes:d.nodes.filter(n=>!nodeComplete(s,n.id)).length,domains:Object.keys(domains).filter(k=>!complete(s.domains[k])).length,proposals:s.proposals.filter(p=>!proposalComplete(p)).length,proposalReviews:(s.context?.proposals||[]).filter(p=>!complete(s.proposalReviews[p.id])).length};
 const parts=[];if(!s.reviewer.trim())parts.push('请填写审核人');
 for(const [key,label]of [['edges','条箭头'],['nodes','个节点'],['domains','项规则'],['proposals','项提议待补充'],['proposalReviews','项提议待复核']])if(pending[key])parts.push(`${pending[key]} ${label}`);
 return {ready:parts.length===0,pending,message:parts.length?'尚未完成：'+parts.join('；'):'审核已完成，可以导出'};
}
function exportReview(s,d,format='json'){
 const record=normalize(s,d),status=exportStatus(record,d);if(!status.ready)throw Error(status.message);
 if(format==='json')return exported(record,d);if(format==='csv')return csv(record,d);throw Error('不支持的导出格式');
}
function str(v,max=12000){if(typeof v!=='string'||v.length>max)throw Error('记录含无效或超长文本，未导入。');return v;}
function choice(v,allowed){if(!allowed.includes(v))throw Error('记录包含不支持的选项，未导入。');return v;}
function proposal(p){if(!p||typeof p!=='object')throw Error('提议格式无效。');return {id:str(p.id,180),type:choice(p.type,proposalTypes),target:str(p.target,500),name:str(p.name,500),definition:str(p.definition),timing:str(p.timing),connections:str(p.connections),reason:str(p.reason),source:str(p.source),createdAt:str(p.createdAt,100)};}
function readAnswer(r,legacy=false){if(!r)throw Error('缺少判断记录。');return {decision:choice(legacy&&r.decision==='同意'?'保留':r.decision,['',...decisions]),change:choice(r.change??(legacy&&r.decision==='修改'?'其他':''),['',...changes]),reason:str(r.reason)};}
function previousData(d){const p=d.previousBaseline;return p?{...d,version:p.version,graphHash:p.graphHash,nodes:p.nodes||d.nodes.filter(n=>p.nodeIds.includes(n.id)),edges:p.edges||d.edges,previousBaseline:p.previousBaseline||null}:null;}
function matchingPreviousData(v,d){for(let prior=previousData(d);prior;prior=previousData(prior))if(v?.version===prior.version&&v?.graphHash===prior.graphHash)return prior;return null;}
function previousMatch(v,d){return !!matchingPreviousData(v,d);}
function upgradeBaseline(v,d,allowSnapshot){
 const original=normalize(v,matchingPreviousData(v,d),allowSnapshot);
 function expand(record){const out={...record,version:d.version,graphHash:d.graphHash,nodes:Object.fromEntries(d.nodes.map(n=>[n.id,record.nodes[n.id]||''])),nodeReviews:Object.fromEntries(d.nodes.map(n=>[n.id,record.nodeReviews[n.id]||''])),edges:Object.fromEntries(d.edges.map(e=>[e.id,record.edges[e.id]||answer()]))};if(out.context)out.context=reviewPackage(out.context,d);if(out.firstRound)out.firstRound=expand(out.firstRound);return out;}
 const upgraded=expand(original);upgraded.baselineSnapshot=original;return normalize(upgraded,d,allowSnapshot);
}
function normalize(v,d,allowSnapshot=true){
 if(previousMatch(v,d))return upgradeBaseline(v,d,allowSnapshot);
 if(!v||![1,2].includes(v.schema)||v.version!==d.version||v.graphHash!==d.graphHash)throw Error('记录与当前 DAG 版本不一致，未导入。');
 if(v.schema===2&&v.protocol!=='2026-09-09.v2')throw Error('审核方案版本不一致。');
 if(!v.edges||!v.nodes||!v.overall)throw Error('审核记录不完整。');
 const s=blank(d),legacy=v.schema===1;s.recordId=legacy?s.recordId:str(v.recordId,180);s.reviewer=str(v.reviewer,120);s.expertise=str(v.expertise??'',240);s.round=choice(v.round??1,[1,2]);s.updatedAt=v.updatedAt===null?null:str(v.updatedAt,100);
 for(const k of Object.keys(v.edges))if(!Object.hasOwn(s.edges,k))throw Error('未知箭头。');
 for(const k of Object.keys(v.nodes))if(!Object.hasOwn(s.nodes,k))throw Error('未知节点。');
 for(const e of d.edges)s.edges[e.id]=readAnswer(v.edges[e.id],legacy);
 for(const n of d.nodes){s.nodes[n.id]=str(v.nodes[n.id]);s.nodeReviews[n.id]=choice(legacy?'':v.nodeReviews?.[n.id],['',...nodeDecisions]);}
 for(const k of Object.keys(domains))s.domains[k]=legacy?answer():readAnswer(v.domains?.[k]);
 for(const k of Object.keys(s.overall))s.overall[k]=str(v.overall[k]);
 if(!legacy){if(!Array.isArray(v.proposals)||v.proposals.length>300)throw Error('提议列表无效。');s.proposals=v.proposals.map(proposal);if(new Set(s.proposals.map(p=>p.id)).size!==s.proposals.length)throw Error('提议编号重复。');
 if(v.context)s.context=reviewPackage(v.context,d);
 const allowed=new Set(s.context?.proposals.map(p=>p.id)||[]);for(const[k,r]of Object.entries(v.proposalReviews||{})){if(!allowed.has(k))throw Error('未知候选提议。');s.proposalReviews[k]=readAnswer(r);}
 if(v.firstRound){if(!allowSnapshot||v.firstRound.round!==1||v.firstRound.firstRound)throw Error('首轮快照格式无效。');s.firstRound=normalize(v.firstRound,d,false);if(s.firstRound.recordId!==s.recordId)throw Error('首轮与当前审核人记录不一致。');}
 if(s.round===2&&!s.firstRound)throw Error('复核记录缺少首轮快照。');}
 if(v.baselineSnapshot){if(!previousMatch(v.baselineSnapshot,d))throw Error('原始版本记录不匹配。');s.baselineSnapshot=normalize(v.baselineSnapshot,matchingPreviousData(v.baselineSnapshot,d));}
 return s;
}
function reviewPackage(v,d){if(previousMatch(v,d)){const old=reviewPackage(v,matchingPreviousData(v,d));const allowed={edge:new Set(d.edges.map(e=>e.id)),node:new Set(d.nodes.map(n=>n.id)),domain:new Set(Object.keys(domains)),overall:new Set(['missingNodes','missingEdges','timing'])};return {...old,version:d.version,graphHash:d.graphHash,issues:old.issues.filter(i=>allowed[i.type].has(i.id))};}if(v?.kind!=='dag-review-package'||v.version!==d.version||v.graphHash!==d.graphHash)throw Error('复核包与当前 DAG 不匹配。');if(!Array.isArray(v.issues)||v.issues.length>2000||!Array.isArray(v.proposals)||v.proposals.length>900)throw Error('复核包格式无效。');const keys={edge:new Set(d.edges.map(e=>e.id)),node:new Set(d.nodes.map(n=>n.id)),domain:new Set(Object.keys(domains)),overall:new Set(['missingNodes','missingEdges','timing'])};const ps=v.proposals.map(proposal);if(new Set(ps.map(p=>p.id)).size!==ps.length)throw Error('候选提议编号重复。');const issues=v.issues.map(i=>{if(!keys[i.type]?.has(i.id))throw Error('复核包包含未知项目。');return {type:i.type,id:i.id,summary:str(i.summary,600000)};});return {kind:v.kind,version:d.version,graphHash:d.graphHash,packageId:str(v.packageId,180),issues,proposals:ps};}
function beginRound(s,p,d){const out=normalize(s,d);const pack=reviewPackage(p,d);if(out.round===1){out.firstRound=JSON.parse(JSON.stringify(out));out.round=2;}out.context=pack;out.proposalReviews=Object.fromEntries(pack.proposals.map(p=>[p.id,out.proposalReviews[p.id]||answer()]));return out;}
function proposalComplete(p){return [p.name,p.definition,p.timing,p.connections,p.reason].every(x=>x.trim())&&(!['拆分现有节点','补充构念内变量'].includes(p.type)||!!p.target.trim());}
function csvCell(v){let s=String(v??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
function csv(s,d){const ns=Object.fromEntries(d.nodes.map(n=>[n.id,n]));const rows=[['类型','ID','项目','判断','修改类型','理由或详情','完成','审核人','专业背景','轮次','图版本','图及映射指纹']];const add=(r,round=s.round)=>rows.push([...r,s.reviewer,s.expertise,round,d.version,d.graphHash]);function block(t){for(const e of d.edges){const r=t.edges[e.id];add(['箭头',e.id,ns[e.from].name+' → '+ns[e.to].name,r.decision,r.change,r.reason,complete(r)?'是':'否'],t.round);}for(const n of d.nodes)add(['节点',n.id,n.name,t.nodeReviews[n.id],'',t.nodes[n.id],nodeComplete(t,n.id)?'是':'否'],t.round);for(const[k,r]of Object.entries(t.domains))add(['领域',k,domains[k].name,r.decision,r.change,r.reason,complete(r)?'是':'否'],t.round);for(const p of t.proposals)add(['候选提议',p.id,p.type+'：'+p.name,'','',JSON.stringify(p),proposalComplete(p)?'是':'否'],t.round);for(const[k,v]of Object.entries(t.overall))add(['整体',k,({missingNodes:'遗漏节点',missingEdges:'遗漏箭头',timing:'时间与定义'})[k],'','',v,''],t.round);for(const[k,r]of Object.entries(t.proposalReviews))add(['提议复核',k,k,r.decision,r.change,r.reason,complete(r)?'是':'否'],t.round);}if(s.firstRound)block(s.firstRound);block(s);return '\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');}
function exported(s,d){return {...s,exportedAt:new Date().toISOString(),source:d.source,graph:{nodes:d.nodes,edges:d.edges}};}
function summarize(records,d,expected=3,round=1){const rs=records.map(r=>round===1?(r.firstRound||r):r);return d.edges.map(e=>{const counts=Object.fromEntries(['保留','修改','不确定','超出专长','未填写'].map(k=>[k,0]));for(const r of rs)counts[r.edges[e.id].decision||'未填写']++;const clear=counts['保留']+counts['修改'];let status='评估覆盖不足';if(counts['修改']||counts['不确定'])status='需复核';else if(rs.length!==expected||counts['未填写'])status='待收齐';else if(counts['保留']>=2)status='一致支持';return {id:e.id,...counts,clearJudgments:clear,coverageSufficient:clear>=2,status};});}
const api={reviewProgress,previousMatch,previousData,exportStatus,exportReview,blank,complete,nodeComplete,normalize,csv,csvCell,exported,decisions,nodeDecisions,changes,proposalTypes,domains,uid,answer,proposal,proposalComplete,reviewPackage,beginRound,summarize};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DAGReview=api;
})(typeof window!=='undefined'?window:globalThis);
