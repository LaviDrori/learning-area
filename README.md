# learning-area

A personal learning workspace for any topic I want to learn over multiple sessions. The current topic is Kubernetes; its goal and constraints are in [MISSION.md](MISSION.md).

All content here is AI-generated and maintained via the `/mattpocock-skills:teach` skill.

## Layout

| Path | What |
|------|------|
| `MISSION.md` | Why I'm learning the current topic; grounds every lesson |
| `lessons/` | Short interactive HTML lessons (`0001-<name>.html`) |
| `reference/` | Cheat sheets and the glossary, for quick lookup |
| `learning-records/` | What I've learned; drives what comes next |
| `RESOURCES.md` | Trusted sources lessons are built from |
| `assets/` | Shared CSS/JS components used by lessons |
| `NOTES.md` | Teaching preferences and working notes |

## Open a lesson

**PowerShell**
```powershell
Start-Process lessons\0001-desired-state-and-the-control-loop.html
```

**CMD**
```cmd
start lessons\0001-desired-state-and-the-control-loop.html
```

**macOS / Linux**
```bash
open lessons/0001-desired-state-and-the-control-loop.html   # xdg-open on Linux
```
