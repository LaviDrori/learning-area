# Mission: Databricks

## Why
One of Lavi's customers runs its data platform on Databricks. Lavi isn't building on it yet, but sits in conversations where the customer's team talks about it. Goal: follow those conversations without getting lost, ask sharp questions, and have a working map of the platform ready for the day Lavi does build on it.

## Success looks like
- Draw the platform from memory: control plane, compute, the customer's cloud storage, Unity Catalog, Delta tables, and say where the data actually lives
- Hear a customer phrase ("spin up a warehouse", "it's in the bronze layer", "grant it in UC", "the DLT pipeline failed", "ask Genie") and know which part of the platform it's about
- Explain what drives a Databricks bill (DBUs, compute type, serverless vs classic) and which compute fits which job
- Explain how Unity Catalog controls who sees what, including per-user rows and masked columns
- Read a Delta table design (MERGE, clustering, medallion layers) and say what it does
- Name the AI/ML pieces (Genie, AI functions, Model Serving, Vector Search, MLflow) and what each is for
- Map what Lavi knows from BigQuery onto Databricks equivalents, and know where the analogy breaks

## Constraints
- Barely touched Databricks; strong SQL and BigQuery background, so BigQuery is the bridge for every new idea
- Access to the customer's workspace only on Sundays. Lessons work offline in the browser; hands-on steps are optional and batched for Sundays
- ~20-30 minutes per lesson; scenario multiple-choice preferred over open recall
- Windows machine

## Out of scope (for now)
- Nothing excluded. Order is mental model first, then cost & compute, access, Delta & modelling, AI/ML. Admin, Spark internals and streaming come up only at conversation depth unless the mission changes.
