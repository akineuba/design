#!/usr/bin/env bash
# Commits any uncommitted work and pushes it to GitHub when Claude finishes a turn (Stop).
cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}" || exit 0
branch=$(git branch --show-current)
[ -n "$branch" ] || exit 0
if [ -n "$(git status --porcelain)" ]; then
  git add -A
  changed=$(git diff --cached --name-only | head -5 | xargs -r -n1 basename | paste -sd, - | sed 's/,/, /g')
  count=$(git diff --cached --name-only | wc -l)
  [ "$count" -gt 5 ] && changed="$changed and $((count - 5)) more"
  git commit --quiet -m "Auto-save: $changed" -m "Committed automatically at the end of a Claude Code turn." \
    -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01HHxGGGuVC6c67Hdf9461nq" || exit 0
fi
git fetch --quiet origin "$branch" 2>/dev/null
ahead=$(git rev-list --count "origin/$branch..HEAD" 2>/dev/null || echo 1)
[ "$ahead" -gt 0 ] || exit 0
# Bring in anything pushed from GitHub first so the push is a fast-forward.
if [ "$(git rev-list --count "HEAD..origin/$branch" 2>/dev/null || echo 0)" -gt 0 ]; then
  git pull --quiet --rebase --autostash origin "$branch" >/dev/null 2>&1 || {
    git rebase --abort >/dev/null 2>&1
    jq -n --arg m "Auto-push skipped: GitHub and local changes on $branch conflict. Ask Claude to merge them." '{systemMessage: $m}'
    exit 0; }
fi
for delay in 0 2 4 8 16; do
  sleep "$delay"
  if git push --quiet -u origin "$branch" >/dev/null 2>&1; then
    jq -n --arg m "Pushed to GitHub: $(git log -1 --format='%h %s')" '{systemMessage: $m}'
    exit 0
  fi
done
jq -n --arg m "Auto-push to GitHub failed after 5 tries; changes are committed locally." '{systemMessage: $m}'
