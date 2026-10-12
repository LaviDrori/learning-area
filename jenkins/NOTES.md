# Notes

- Prefers ~20-30 min lessons: one concept + a real exercise.
- Default to scenario-based multiple choice with plausible distractors ("what happens if…"), not definition lookup. Open recall only optional, later. (Carried over from the Kubernetes workspace.)
- Shell steps: always give PowerShell, CMD and macOS/Linux variants (global preference).
- Role: BI developer / AI engineer working in the Data Engineering department, which works closely with DevOps. Touchpoint today: sees Jenkins build results on PRs/merges. Doesn't edit Jenkinsfiles yet.
- Jenkins at Lavi's org (per Lavi, not yet verified in detail): tests/lints on PRs, deploys code/jobs, and runs scheduled data jobs.
- Frame lessons as "DevOps says X in a meeting / your build is red" rather than abstract. Track one realistic DE repo across lessons: `orders-etl` (Python + SQL pipeline, tested on PRs, deployed on merge, with a nightly job).
- Unknowns worth asking Lavi when relevant: Git host (GitHub? Bitbucket? GitLab?), whether repos have a `Jenkinsfile`, whether the team uses shared libraries, how deploys target environments (Databricks? Airflow?). If Lavi can share a real (redacted) Jenkinsfile, build a lesson around it.
- Planned order: L1 repo → build → status (mental model) · L2 Reading a Jenkinsfile line by line · L3 Reading a failed build (console log, stages, blame code vs infra) · L4 Triggers: PR vs merge vs cron · L5 Credentials & environments (staging/prod, approvals) · L6 Agents, queues, speed · L7 Shared libraries & reuse · L8 Making suggestions: speed + safety patterns.
- Sibling workspace `../kubernetes/` covers containers/K8s. Jenkins is a classic "push-style" CI deployer (K8s Lesson 3, section 4); cross-link where useful.
