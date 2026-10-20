"""Reapply recorded rules to every admissible coverage assignment (stdlib only)."""
import itertools
import json
import sys
from pathlib import Path


def verify(data):
    rule = data['rules']
    records = []
    for model in data['models']:
        yes = {c for c, v in model['mapping'].items() if v['status'] == 'Yes'}
        unknown = sorted(c for c, v in model['mapping'].items() if v['status'] == 'Unclear')
        assert all(v['status'] in {'Yes', 'No', 'Unclear'} for v in model['mapping'].values())
        possibilities = []
        for bits in itertools.product([False, True], repeat=len(unknown)):
            covered = yes | {c for c, included in zip(unknown, bits) if included}
            domains = {}
            for name, spec in rule['domains'].items():
                required = set(spec['required'])
                graded = required | set(spec['additional'])
                domains[name] = 'Strong' if required <= covered else 'Moderate' if graded & covered else 'Weak'
            excluded = bool(set(rule['fixed_exclusion_nodes']) & covered)
            matched = [name for name, members in rule['accepted_minimal_sets'].items() if set(members) <= covered]
            overall = 'Excluded' if excluded else 'Strong' if matched else 'Weak' if 'Weak' in domains.values() else 'Moderate'
            if excluded:
                assert model['B4'] == 'Excluded', model['record_id']
            else:
                assert model['B4'] != 'Excluded', model['record_id']
                assert domains == model['domain_grades'], model['record_id']
                assert overall == model['quality_grade'], model['record_id']
            possibilities.append(overall)
        assert len(set(possibilities)) == 1, model['record_id']
        records.append({'record_id': model['record_id'], 'grade': possibilities[0], 'assignments_checked': len(possibilities)})
    return {'status': 'PASS', 'records': records, 'all_grades_invariant': True}


if __name__ == '__main__':
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1] / 'ratings/full_ratings.json'
    print(json.dumps(verify(json.loads(source.read_text())), ensure_ascii=False, indent=2))
