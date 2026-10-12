# Notes

- Prefers ~20-30 min lessons: one concept + a real exercise.
- Fresh start with containers too. Explain container basics where needed, don't assume Docker fluency.
- No WSL2/Docker yet (pending security approval). Use in-browser simulators / Killercoda until it lands. Ask about approval status at the start of sessions; once it's approved, switch to local hands-on (kind or Docker Desktop's built-in K8s).
- Shell steps: always give PowerShell, CMD and macOS/Linux variants (global preference).
- 2026-10-12: Finds open-recall questions too hard on a brand-new topic; prefers multiple choice. Default to MCQ for retrieval. Keep the effort by using scenario-based MCQs with plausible distractors ("what happens if…"), not definition lookup. Open recall only optional, later, once a topic is familiar.
- 2026-10-12: Lavi's org does NOT run Kubernetes. Mission (LR-0005): understand customers' IT/DevOps K8s questions; interviews secondary; cert undecided. No "try at work" prompts. Frame lessons as "a customer asks you…".
- Role: BI developer / AI engineer. Builds apps delivered as repo + container image; customers' DevOps deploy them. Frame every lesson as "a customer's DevOps asks you X about your container". Use Python/AI-flavoured examples (model files, GPUs, slow startup) where accurate.
- Lavi writes the Dockerfiles for their apps themselves. Planned Lesson 4: Kubernetes-friendly Dockerfile.
- Wants day-to-day end-to-end examples in lessons (e.g. how GitHub relates to pods). Every lesson gets a "Day-to-day stories" section that tracks one realistic app (`forecast-api`, an AI app delivered to a customer) across the whole flow.
- Planned order after L3: L4 Dockerfile for K8s · L5 Services/ports · L6 config & Secrets · L7 probes · L8 requests/limits/GPU · L9 state & volumes · L10 security context · L11 packaging (Helm, tags) · L12 failure statuses.
