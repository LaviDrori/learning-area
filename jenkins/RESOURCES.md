# Jenkins Resources

## Knowledge

- [Docs: Pipeline (jenkins.io)](https://www.jenkins.io/doc/book/pipeline/)
  The official chapter: what a Pipeline is, Jenkinsfile and pipeline-as-code, Declarative vs Scripted, pipeline/node/stage/step. Use for: the core mental model. **Primary source for Lesson 1.**
- [Docs: Glossary (jenkins.io)](https://www.jenkins.io/doc/book/glossary/)
  Canonical one-liners for controller, agent, node, executor, job, build, workspace, artifact, upstream/downstream. Use for: glossary definitions.
- [Docs: Pipeline Syntax (jenkins.io)](https://www.jenkins.io/doc/book/pipeline/syntax/)
  Reference for `agent`, `stages`, `post`, `when`, `triggers { cron }` (and the `H` symbol), `environment` + `credentials()`, `input`, `parameters`. Use for: reading any Declarative Jenkinsfile.
- [Docs: Branches and Pull Requests (jenkins.io)](https://www.jenkins.io/doc/book/pipeline/multibranch/)
  Multibranch Pipelines, branch discovery, `BRANCH_NAME` / `CHANGE_ID`, Organization Folders. Use for: how one repo becomes many jobs.
- [Docs: Managing Nodes (jenkins.io)](https://www.jenkins.io/doc/book/managing/nodes/)
  Controller vs agent vs node vs executor; why builds shouldn't run on the controller. Use for: "agent offline" / queue conversations.
- [Docs: Using credentials (jenkins.io)](https://www.jenkins.io/doc/book/using/using-credentials/)
  Credential types, stored encrypted on the controller, referenced by ID. Use for: secrets in pipelines.
- [Plugin: GitHub (plugins.jenkins.io)](https://plugins.jenkins.io/github/)
  Webhook endpoint `$JENKINS_BASE_URL/github-webhook/`, push triggers, commit statuses. Use for: how GitHub and Jenkins talk.
- [Plugin: GitHub Branch Source (plugins.jenkins.io)](https://plugins.jenkins.io/github-branch-source/)
  Multibranch/Organization Folder support for GitHub repos and PRs. Thin page; links to fuller CloudBees docs.

## Wisdom (Communities)

- [Jenkins Community forum (community.jenkins.io)](https://community.jenkins.io/)
  Official Discourse forum; "Using Jenkins" category for questions. Use for: "is this a sane pipeline?" questions.
- Your own DevOps team. Use for: "why is *our* Jenkins set up this way?" Usually the highest-value source of all.

## Gaps
- Official, clear docs on webhook → multibranch triggering and PR status checks (current info comes from plugin pages + third-party guides).
- Shared Libraries: not yet researched (needed for L7).
- Find out which Git host Lavi's org uses; swap GitHub examples if it's Bitbucket/GitLab.
