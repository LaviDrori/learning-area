# CLAUDE.md

All current and future material in this repo is composed via the `/mattpocock-skills:teach` skill. Follow that skill's workspace layout and formats; don't hand-author lessons, references or learning records outside it.

## Structure: one teaching workspace per topic

- Each top-level folder (`kubernetes/`, `jenkins/`) is one complete teach-skill workspace: `MISSION.md`, `NOTES.md`, `RESOURCES.md`, `lessons/`, `reference/`, `learning-records/`, `assets/`. Treat that folder, not the repo root, as "the current directory" the skill refers to.
- The repo root holds only `README.md`, `CLAUDE.md` and topic folders. Never put lessons, records or assets at the root.
- When `/teach` is invoked, first decide which topic the request belongs to and work inside that folder. A topic with no folder gets a new one with the full layout, starting with a `MISSION.md` interview. One mission per folder.
- Before designing a lesson, read that topic's `MISSION.md`, `NOTES.md` and `learning-records/`.

## Assets and links

- `assets/` is per topic, not shared. A new topic copies the components it needs (at least `course.css` and `quiz.js`) from an existing topic and gives `course.css` its own `--accent` colour. Topics may diverge after that. Don't make one topic's lessons load another topic's assets.
- Paths inside a topic stay relative (`../assets/…`, `../reference/…`). Cross-topic links are fine for lessons and references only: `../../<topic>/lessons/…`.

## Housekeeping

- When adding a lesson or a topic, update the Topics table in the root `README.md` (lesson count, start link).
- Never commit to `main` (the initial bootstrap commit was the only exception); use a branch.
