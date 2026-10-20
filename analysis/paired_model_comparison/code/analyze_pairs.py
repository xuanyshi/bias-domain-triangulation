from pathlib import Path
import csv, json, math, statistics
W = Path(__file__).resolve().parents[1]
(W/'results').mkdir(exist_ok=True)
dump = lambda p, x: Path(p).write_text(json.dumps(x, ensure_ascii=False, indent=2) + '\n')
notes_list = json.loads((W/'inputs/model_comparability.json').read_text())
notes = {r['article_id']:r for r in notes_list}
studies = [(r['article_id'],) for r in notes_list]
rs = list(csv.DictReader(open(W/'inputs/all_39_models.csv')))
records = {r['record_id']:r for r in rs}
pairs = []
for aid,*_ in studies:
    for outcome in ['ADHD','ASD']:
        prefix=f'{aid}_{outcome}'
        if prefix+'_pop' not in records or prefix+'_sib' not in records:
            continue
        a,b=records[prefix+'_pop'],records[prefix+'_sib']
        assert a['included']==b['included']=='True'
        for col in ['article_id','outcome_group','exact_outcome','effect_measure','contrast']:
            assert a[col]==b[col], (prefix,col)
        assert a['effect_measure']=='HR'
        x,y=float(a['effect']),float(b['effect'])
        row={'pair_id':prefix,'article_id':aid,'study':notes[aid]['study'],'outcome':outcome,
             'population_record_id':a['record_id'],'family_record_id':b['record_id'],
             'population_hr':x,'population_low':float(a['ci_low']),'population_high':float(a['ci_high']),
             'family_hr':y,'family_low':float(b['ci_low']),'family_high':float(b['ci_high']),
             'ratio_family_population':y/x,'log_difference':math.log(y)-math.log(x),
             'lower_estimate':y<x,'closer_to_null':abs(math.log(y))<abs(math.log(x)),
             'documented_within_family':b['design_family']=='within_family',
             'contrast':a['contrast'],'sample_comparison':notes[aid]['sample_comparison'],
             'model_changes':notes[aid]['model_changes'],'source_url':a['source_url'],
             'source_locator':notes[aid]['source_locator']}
        for domain in ['B1','B2','B3','Overall']:
            row[domain+'_population']=a[domain]
            row[domain+'_family']=b[domain]
        row['B2_B3_grades_unchanged']=all(a[d]==b[d] for d in ['B2','B3'])
        pairs.append(row)
assert len(pairs)==10 and len({r['article_id'] for r in pairs})==6

def write_csv(path, rows):
    with open(path,'w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
def summary(key, label, rows):
    return dict(analysis=key,label=label,articles=len({r['article_id'] for r in rows}),pairs=len(rows),
                lower=sum(r['lower_estimate'] for r in rows),closer=sum(r['closer_to_null'] for r in rows),
                median_rhr=statistics.median(r['ratio_family_population'] for r in rows),
                minimum_rhr=min(r['ratio_family_population'] for r in rows),maximum_rhr=max(r['ratio_family_population'] for r in rows))
confirmed=[r for r in pairs if r['documented_within_family']]
sets=[('all','All displayed pairs',pairs),('documented','Documented within-family control',confirmed),
      ('ADHD','Documented within-family control, ADHD',[r for r in confirmed if r['outcome']=='ADHD']),
      ('ASD','Documented within-family control, ASD',[r for r in confirmed if r['outcome']=='ASD']),
      ('same_other_grades','Unchanged B2 and B3 grades',[r for r in confirmed if r['B2_B3_grades_unchanged']]),
      ('exclude_Luo','Exclude Luo source-qualified models',[r for r in confirmed if r['article_id']!='42371637']),
      ('any_use','Any-use or dispensing versus none',[r for r in confirmed if r['article_id'] not in ['37431475','41801232']])]
summaries=[summary(*s) for s in sets]
loo=[summary('omit_'+aid,'Omit '+notes[aid]['study'],[r for r in confirmed if r['article_id']!=aid]) for aid in notes if aid!='41973453']
alternative=[dict(r) for r in pairs]
for r in alternative:
    if r['pair_id']=='40898607_ASD':
        r['population_hr']=1.07;r['ratio_family_population']=r['family_hr']/1.07
        r['log_difference']=math.log(r['ratio_family_population'])
        r['lower_estimate']=r['family_hr']<1.07
        r['closer_to_null']=abs(math.log(r['family_hr']))<abs(math.log(1.07))
alt=summary('Okubo_Table2','Okubo ASD Table 2 alternative, population HR 1.07',alternative)
assert (summaries[0]['lower'],summaries[0]['closer'])==(9,8)
assert (summaries[1]['pairs'],summaries[1]['lower'],summaries[1]['closer'])==(9,9,8)
assert (alt['lower'],alt['closer'])==(9,8)
write_csv(W/'results/paired_estimates.csv',pairs)
write_csv(W/'results/descriptive_summary.csv',summaries)
write_csv(W/'results/leave_one_article_out.csv',loo)
write_csv(W/'results/source_alternative.csv',[alt])
result={'all':summaries[0],'documented':summaries[1],'subsets':summaries[2:],'leave_one_article_out':loo,'Okubo_Table2_alternative':alt,
        'difference_confidence_intervals':None,'difference_p_values':None,'pooled_model_change':None,
        'reason':'Within-pair sampling covariance is unavailable. Multiple outcomes are dependent. No covariance is assumed and no significance test or pooled model change is estimated.',
        'interpretation':'Descriptive within-publication model comparison; no quantified bias removal and no validation of the full DAG or grading framework.'}
dump(W/'results/summary.json',result)
print('Reproduced paired estimates, summaries, source alternative and article influence counts.')
