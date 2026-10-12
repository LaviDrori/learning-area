# Starting point: knows the name, sees build results

Lavi knows Jenkins by name only. Their one touchpoint is seeing build results on PRs and merges. They believe their org's Jenkins does all three: PR tests/lint, deploying code/jobs, and scheduled data jobs, but they aren't sure of the details. Goals in order: follow along first, then diagnose failures, then suggest faster/safer deploys.

**Implications:** Start from the thing Lavi already sees (the red/green check on a PR) and work backwards: webhook → controller → agent → Jenkinsfile → status. Don't teach administration. Get Lavi's team's real Jenkinsfile as early as possible.
