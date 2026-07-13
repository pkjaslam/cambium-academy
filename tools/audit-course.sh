#!/usr/bin/env bash
# Cambium Academy — pre-launch course audit. Run from repo root:
#   bash tools/audit-course.sh course-02-prompting-essentials C02
# Compares a course to Course 1, catches truncated configs, Course-1 residue,
# wrong keys/links. Exit non-zero if anything fails.
set -uo pipefail
SLUG="${1:?usage: audit-course.sh <course-slug> <C0N>}"; TAG="${2:?need course tag e.g. C03}"
C1="courses/course-01-intro-to-ai"; C="courses/$SLUG"; N="${TAG#C}"; fails=0
say(){ printf '%s\n' "$*"; }; bad(){ printf 'FAIL  %s\n' "$*"; fails=$((fails+1)); }; good(){ printf 'ok    %s\n' "$*"; }

say "== 1. file parity (web/) =="
miss=$(comm -23 <(ls "$C1/web"|sort) <(ls "$C/web"|sort))
[ -z "$miss" ] && good "no missing files" || { bad "missing vs Course 1:"; echo "$miss"; }

say "== 2. every web/*.js parses (catches truncation) =="
for f in "$C"/web/*.js; do node --check "$f" 2>/dev/null && good "$(basename "$f")" || bad "$(basename "$f") does not parse (truncated?)"; done

say "== 3. live-endpoint configs present + terminated =="
for cfg in registry-config.js aira-chat-config.js; do
  if grep -qE 'endpoint: "https://[^"]+"' "$C/web/$cfg"; then good "$cfg endpoint ok"; else bad "$cfg endpoint missing/truncated"; fi
done

say "== 4. no Course-1 residue (unless intentional) =="
res=$(grep -rniE "course-01|intro-to-ai|cambium-c01|CAMB-C01|jRpYchejlTg|social-preview|cheat sheet|four prompt move|which model I used" "$C"/web/*.html 2>/dev/null | grep -vi "$SLUG")
[ -z "$res" ] && good "clean" || { bad "Course-1 residue:"; echo "$res"; }

say "== 5. localStorage keys are $TAG-scoped =="
wrong=$(grep -rhoE "cambium-c0[0-9]-[a-z]+" "$C"/web 2>/dev/null | grep -v "cambium-c${N}-" | sort -u)
[ -z "$wrong" ] && good "all cambium-c${N}-*" || { bad "off-course keys:"; echo "$wrong"; }

say "== 6. identity: certId / verify / og / video / course-tag =="
grep -q "CAMB-${TAG}-" "$C/web/certificate.html" && good "certId ${TAG}" || bad "certId prefix not ${TAG}"
grep -q "$SLUG/web/verify.html" "$C/web/certificate.html" && good "verify link" || bad "verify link wrong"
grep -q "course: \"${TAG}\"" "$C/web/cert-extras.js" && good "registry course tag ${TAG}" || bad "registry course tag missing"
grep -qE "og:image.*social-course${N}|og:image.*social-academy" "$C/web/index.html" && good "og:image" || bad "og:image not course-specific"

say "== 7. media present =="
ls "$C"/slides/*.pptx >/dev/null 2>&1 && good "pptx" || bad "no pptx deck"
ls "$C"/slides/*.pdf  >/dev/null 2>&1 && good "pdf"  || bad "no pdf deck"

say "== 8. every .html closes =="
for f in "$C"/web/*.html; do tail -c 40 "$f"|tr -d '[:space:]'|grep -q "</html>" && : || bad "$(basename "$f") not closed"; done; good "html endings checked"

echo; [ "$fails" -eq 0 ] && echo "AUDIT PASSED ✓" || echo "AUDIT FOUND $fails ISSUE(S) ✗"
exit $fails
