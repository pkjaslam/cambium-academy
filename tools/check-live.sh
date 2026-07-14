#!/usr/bin/env bash
# Live contract checks: assert the CONTENT of a response, never just its status code.
# Written after "Aira is offline" turned out to be a healthy worker returning a truncated
# reply with HTTP 200. A 200 that says nothing useful is a failure.
set -u
FAIL=0
echo "== 1. Aira worker returns a COMPLETE, parseable structured reply =="
R=$(curl -s --max-time 30 -X POST "https://aira-chat.pkjaslamagrico.workers.dev" \
  -H "Content-Type: application/json" -H "Origin: https://pkjaslam.github.io" \
  -d '{"messages":[{"role":"user","content":"Grade this. Reply ONLY JSON: {\"pass\":true/false,\"feedback\":\"2 short sentences\"}"},{"role":"assistant","content":"Understood."},{"role":"user","content":"Student picked S2 and S5 because the claim is causal."}]}')
echo "$R" | python3 -c "
import sys,json,re
try: d=json.load(sys.stdin)
except Exception: print('   FAIL: no JSON envelope'); sys.exit(1)
rep=d.get('reply','') or ''
m=re.search(r'\{[\s\S]*\}', rep)
ok=False
if m:
    try: json.loads(m.group(0)); ok=True
    except Exception: pass
print('   provider:', d.get('provider'), '| usage:', d.get('usage'))
print('   ' + ('PASS: complete parseable reply' if ok else 'FAIL: truncated/unparseable reply -> the course will fall back to the answer key'))
sys.exit(0 if ok else 1)
" || FAIL=1

echo "== 2. Crossref grading contract (real DOI resolves, fabricated one 404s) =="
R1=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "https://api.crossref.org/works/10.1038/s41586-021-03819-2")
R2=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "https://api.crossref.org/works/10.1038/s41586-999-99999-9")
[ "$R1" = "200" ] && [ "$R2" = "404" ] && echo "   PASS ($R1 / $R2)" || { echo "   FAIL ($R1 / $R2)"; FAIL=1; }

echo "== 3. Every embedded course video is actually playable =="
for v in $(grep -rho "youtube.com/embed/[A-Za-z0-9_-]*\|youtu.be/[A-Za-z0-9_-]*" courses/*/web/*.html LINKS.md 2>/dev/null | sed 's#.*/##' | sort -u); do
  C=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "https://www.youtube.com/oembed?url=https://youtu.be/$v&format=json")
  [ "$C" = "200" ] && echo "   PASS $v" || { echo "   FAIL $v -> $C (referenced in the repo but not playable)"; FAIL=1; }
done

echo "== 4. C04 Ghost Citations + The Practical: EVERY graded DOI behaves as the game claims =="
# The games grade against the live registry. If a "real" one 404s, or a "fabricated" one
# starts resolving, the course teaches a lie. Extracted from the pages themselves, not retyped.
python3 - <<'PYEOF' || FAIL=1
import re, sys, urllib.parse, urllib.request, json
base = "courses/course-04-responsible-ai-publishing/web/"
bad = 0; checked = 0
for page, arr in (("playground.html","G3"), ("practical.html","A")):
    src = open(base + page, encoding="utf-8").read()
    m = re.search(r'var %s = \[(.*?)\n\];' % arr, src, re.S)
    if not m:
        print("   FAIL: could not find %s[] in %s" % (arr, page)); bad += 1; continue
    entries = re.findall(r"doi:'([^']+)'.*?real:(true|false)", m.group(1), re.S)
    if not entries:
        print("   FAIL: no DOI entries parsed from %s" % page); bad += 1; continue
    for doi, real in entries:
        want = 200 if real == "true" else 404
        url = "https://api.crossref.org/works/" + urllib.parse.quote(doi, safe="")
        try:
            code = urllib.request.urlopen(url, timeout=20).getcode()
        except Exception as e:
            code = getattr(e, "code", 0)
        checked += 1
        ok = (code == want)
        if not ok: bad += 1
        print("   %s %s  %s  claims=%s got=%s" % ("PASS" if ok else "FAIL", page.split('.')[0][:10].ljust(10), doi.ljust(34), "REAL" if real=="true" else "FAKE", code))
print("   %d DOIs checked against the live registry, %d wrong" % (checked, bad))
sys.exit(1 if bad else 0)
PYEOF

echo "== 5. C04 The Practical: Aira grades a decision letter and the rubric is applied =="
R=$(curl -s --max-time 30 -X POST "https://aira-chat.pkjaslamagrico.workers.dev" \
  -H "Content-Type: application/json" -H "Origin: https://pkjaslam.github.io" \
  -d '{"messages":[{"role":"user","content":"You are Aira, grading the decision letter in an editorial-integrity exam. A PASSING letter names the fabricated reference, addresses the hidden text neutrally, raises a real scientific issue, and does NOT accuse the authors on the AI-detector score. Reply ONLY JSON: {\"pass\":true/false,\"feedback\":\"2 short sentences\"}"},{"role":"assistant","content":"Understood. Send the letter."},{"role":"user","content":"The candidates letter: Dear authors, reference 3 does not resolve in Crossref and appears fabricated; please supply it. We also found text in the file instructing AI reviewers to give a positive review, and ask you to explain it. Finally, the Methods report 46 isolates but Table 2 lists 31. Major revision."}]}')
echo "$R" | python3 -c "
import sys,json,re
try: d=json.load(sys.stdin)
except Exception: print('   FAIL: no JSON envelope'); sys.exit(1)
rep=d.get('reply','') or ''
m=re.search(r'\{[\s\S]*\}', rep)
if not m: print('   FAIL: Aira returned no gradeable JSON -> The Practical would fall back to its rubric'); sys.exit(1)
try: g=json.loads(m.group(0))
except Exception: print('   FAIL: unparseable grade JSON'); sys.exit(1)
if 'pass' not in g: print('   FAIL: grade JSON has no pass field'); sys.exit(1)
print('   provider:', d.get('provider'), '| verdict on a model answer:', g.get('pass'))
print('   ' + ('PASS: a correct letter is graded as passing' if g.get('pass') is True else 'FAIL: Aira failed a model-correct letter -> rubric is broken'))
sys.exit(0 if g.get('pass') is True else 1)
" || FAIL=1

echo
[ $FAIL -eq 0 ] && echo "LIVE CHECKS PASSED" || echo "LIVE CHECKS FAILED"
exit $FAIL
