# learning-area

Personal learning workspaces, one per topic. Each topic is a self-contained folder with its own mission, lessons, references and progress records.

All content here is AI-generated and maintained via the `/mattpocock-skills:teach` skill.

## Topics

| Topic | Why I'm learning it | Lessons | Start here |
|-------|---------------------|---------|------------|
| [Kubernetes](kubernetes/) | Answer customers' DevOps questions about running my app containers ([mission](kubernetes/MISSION.md)) | 5 | [Lesson 1](kubernetes/lessons/0001-desired-state-and-the-control-loop.html) |
| [Jenkins](jenkins/) | Follow and contribute to DevOps conversations about our CI/CD ([mission](jenkins/MISSION.md)) | 1 | [Lesson 1](jenkins/lessons/0001-from-pull-request-to-green-check.html) |
| [BigQuery](bigquery/) | Build cheap, per-user-secure apps and models on my customer's BigQuery ([mission](bigquery/MISSION.md)) | 2 | [Lesson 1](bigquery/lessons/0001-what-a-query-is-billed-for.html) |
| [Databricks](databricks/) | Follow and join a customer's conversations about their Databricks platform ([mission](databricks/MISSION.md)) | 1 | [Lesson 1](databricks/lessons/0001-the-map-of-the-platform.html) |

## Structure

```
learning-area/
├── README.md              ← this file: index of topics
├── CLAUDE.md              ← instructions for the AI teacher
├── kubernetes/            ← one teaching workspace per topic
│   ├── MISSION.md         ← why I'm learning this; grounds every lesson
│   ├── NOTES.md           ← teaching preferences and working notes
│   ├── RESOURCES.md       ← trusted sources lessons are built from
│   ├── lessons/           ← short interactive HTML lessons (0001-<name>.html)
│   ├── reference/         ← cheat sheets + glossary, for quick lookup
│   ├── learning-records/  ← what I've learned; drives what comes next
│   └── assets/            ← CSS/JS components used by this topic's lessons
└── jenkins/               ← same layout
```

Each topic has its **own** `assets/` (styles, quiz and simulator widgets), so a topic can be opened, moved or deleted without breaking the others. Lessons may link to another topic's lessons with relative paths (e.g. `../../kubernetes/lessons/…`).

## Open a lesson

Swap in any topic/lesson path.

**PowerShell**
```powershell
Start-Process jenkins\lessons\0001-from-pull-request-to-green-check.html
```

**CMD**
```cmd
start jenkins\lessons\0001-from-pull-request-to-green-check.html
```

**macOS / Linux**
```bash
open jenkins/lessons/0001-from-pull-request-to-green-check.html   # xdg-open on Linux
```

## Continue or add a topic

Run `/mattpocock-skills:teach <what you want>` from the repo root. It picks the matching topic folder, or creates a new one (with its own `MISSION.md`) for a new topic.
