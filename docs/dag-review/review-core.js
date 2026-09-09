(function (root) {
  'use strict';
  const decisions = ['同意', '修改', '不确定', '超出专长'];
  function blank(data) { return {schema:1, version:data.version, graphHash:data.graphHash, reviewer:'', updatedAt:null, edges:Object.fromEntries(data.edges.map(e=>[e.id,{decision:'',reason:''}])), nodes:Object.fromEntries(data.nodes.map(n=>[n.id,''])), overall:{missingNodes:'',missingEdges:'',timing:''}}; }
  function complete(r) {return !!r && decisions.includes(r.decision) && (!['修改','不确定'].includes(r.decision) || !!r.reason.trim());}
  function normalize(value, data) {
    if (!value || value.schema!==1 || value.version!==data.version || value.graphHash!==data.graphHash) throw Error('记录与当前 DAG 版本不一致，未导入。');
    if (!value.edges || !value.nodes || !value.overall) throw Error('审核记录格式不完整，未导入。');
    const clean=blank(data), str=(v,max=12000)=>{if(typeof v!=='string'||v.length>max)throw Error('记录含无效文本或超长内容，未导入。');return v;};
    clean.reviewer=str(value.reviewer,120);
    for(const key of Object.keys(value.edges)) if(!Object.hasOwn(clean.edges,key)) throw Error('记录含未知箭头，未导入。');
    for(const key of Object.keys(value.nodes)) if(!Object.hasOwn(clean.nodes,key)) throw Error('记录含未知节点，未导入。');
    for(const e of data.edges) {const r=value.edges[e.id];if(!r || !['',...decisions].includes(r.decision))throw Error('记录含缺失或无效的箭头判断，未导入。');clean.edges[e.id]={decision:r.decision,reason:str(r.reason)};}
    for(const n of data.nodes) clean.nodes[n.id]=str(value.nodes[n.id]);
    for(const k of Object.keys(clean.overall))clean.overall[k]=str(value.overall[k]);
    clean.updatedAt=typeof value.updatedAt==='string'?str(value.updatedAt,100):null;
    return clean;
  }
  function csvCell(value){let s=String(value??'');if(/^[\s]*[=+@-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
  function csv(state,data){const ns=Object.fromEntries(data.nodes.map(n=>[n.id,n]));const rows=[['记录类型','ID','起点 / 节点','终点','判断','理由 / 意见','审核完成','审核人','DAG版本','图及映射指纹','导出时间']];const now=new Date().toISOString();const add=r=>rows.push([...r,state.reviewer,data.version,data.graphHash,now]);
    for(const e of data.edges){const r=state.edges[e.id];add(['箭头',e.id,ns[e.from].name,ns[e.to].name,r.decision||'未审核',r.reason,complete(r)?'是':'否']);}
    for(const n of data.nodes)add(['节点',n.id,n.name,'','',state.nodes[n.id],'']);
    for(const [k,label] of [['missingNodes','遗漏节点'],['missingEdges','遗漏箭头'],['timing','时间顺序与定义']])add(['整体',k,label,'','',state.overall[k],'']);
    return '\uFEFF'+rows.map(r=>r.map(csvCell).join(',')).join('\r\n');
  }
  function exported(state,data){return {...state,exportedAt:new Date().toISOString(),source:data.source,graph:{nodes:data.nodes.map(({id,name,zh,domain,role,constructId,labels})=>({id,name,zh,domain,role,constructId,labels})),edges:data.edges}};}
  const api={blank,complete,normalize,csv,csvCell,exported,decisions};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.DAGReview=api;
})(typeof window!=='undefined'?window:globalThis);
