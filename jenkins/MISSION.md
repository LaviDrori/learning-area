# Mission: Jenkins

## Why
Lavi's Data Engineering department works closely with DevOps, and most of the org's CI/CD runs on Jenkins. Today Lavi only sees build results (red/green on PRs and merges). Goal: follow DevOps conversations about Jenkins without getting lost, and contribute useful suggestions, especially about faster and safer deploys.

## Success looks like
- Explain how a push or PR in one of our repos becomes a Jenkins build, and how its result gets back to the PR
- Read a team Jenkinsfile and say what runs, where it runs, and when (PR, merge, schedule)
- Open a failed build and tell whether it's my code, the test data, or the pipeline/infra
- Translate DevOps phrases ("agent offline", "stuck in the queue", "re-scan the multibranch", "add the credential") into what's actually happening
- Propose one concrete, reasonable improvement to a DE pipeline (speed, safety, or quality gate)

## Constraints
- Fresh start: knows the name only; no Jenkins admin access assumed
- ~20-30 minutes per lesson; multiple-choice preferred over open recall
- Windows machine; WSL2/Docker pending security approval, so no local Jenkins for now

## Out of scope (for now)
- Administering a Jenkins controller (installing, upgrading, plugin management)
- Writing Jenkins plugins or complex Scripted (Groovy) pipelines
- Comparing CI tools in depth (GitHub Actions, GitLab CI) beyond what helps a conversation
