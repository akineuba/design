#!/usr/bin/env bash
# Pulls new commits from GitHub into this checkout (SessionStart / UserPromptSubmit).
# Fast-forward only, so local work is never rewritten; uncommitted edits are stashed and restored.
cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}" || exit 0
branch=$(git branch --show-current)
[ -n "$branch" ] || exit 0
git fetch --quiet origin "$branch" 2>/dev/null || exit 0
behind=$(git rev-list --count "HEAD..origin/$branch" 2>/dev/null || echo 0)
[ "$behind" -gt 0 ] || exit 0
before=$(git rev-parse --short HEAD)
if git merge --ff-only --autostash --quiet "origin/$branch" >/dev/null 2>&1; then
  log=$(git log --oneline "$before..HEAD" | head -20)
  files=$(git diff --stat "$before..HEAD" | tail -1)
  msg="Pulled $behind new commit(s) from GitHub on $branch ($files):\n$log"
else
  msg="GitHub has $behind new commit(s) on $branch that could not be fast-forwarded (local commits diverge). Run: git pull --rebase origin $branch"
fi
jq -n --arg m "$(printf '%b' "$msg")" --arg e "${HOOK_EVENT:-SessionStart}" \
  '{systemMessage: $m, hookSpecificOutput: {hookEventName: $e, additionalContext: $m}}'
