# Real context: People Analytics, RLS by `SESSION_USER() = gcpUser`

Lavi's customer work is with the People Analytics (HR analytics) team, not sales: the everyday question is "which data can employee X see?". Their row-level security already exists as a direct comparison, `SESSION_USER() = gcpUser`, where `gcpUser` is a column holding a viewer's Google account email.

**Implications:** Examples from Lesson 3 on use HR data and the customer's real policy shape, not the `orders`/stores example of Lessons 1-2. Lavi already works with a `SESSION_USER()`-based policy, so build on it: where `gcpUser` lives, one-viewer vs many-viewers per row (manager chains), how joiners/leavers/re-orgs keep it right, what happens when an app or BI tool queries as a service account, and column-level protection for salary/performance. See [[MISSION.md]].
