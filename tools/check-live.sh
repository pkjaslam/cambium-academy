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
echo
[ $FAIL -eq 0 ] && echo "LIVE CHECKS PASSED" || echo "LIVE CHECKS FAILED"
exit $FAIL
