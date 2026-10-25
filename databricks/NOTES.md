# Notes

- Role: BI developer / AI engineer. A customer runs on Databricks; Lavi isn't building on it yet, just wants to keep up in conversations without looking lost. Frame lessons as "the customer's team says…", "in the meeting someone asks…".
- Barely touched Databricks, but strong SQL and uses BigQuery regularly (see `../bigquery/`). Use BigQuery as the bridge: "in BigQuery this is X; here it's Y; the analogy breaks at Z". Say when an analogy is mine, not the docs'.
- Customer workspace access only on Sundays. Lessons are self-contained in the browser. Hands-on goes in an optional "On Sunday" appendix.
- Same style as the other topics: ~20-30 min, scenario MCQs with equal-length options, every SQL/config file shown with `assets/yaml-explain.js` and a note on every line, shell steps in PowerShell/CMD/macOS-Linux.
- Priorities chosen 2026-10-25: all four areas, mental model first. Nothing out of scope, but keep admin/Spark internals/streaming at conversation depth.
- Accent colour: brick red `#c4391d`. Assets copied from bigquery (course.css, quiz.js, yaml-explain.js) and jenkins (flow-stepper.js).
- Running example: customer catalog `acme`, table `acme.sales.orders` (mirrors the BigQuery course's `acme-dw.sales.orders`).
- Planned order: L1 the map (planes, storage, UC, DBUs, Delta, names) · L2 what drives the bill & which compute for which job · L3 Unity Catalog access: grants, service principals, row filters, column masks · L4 Delta & modelling: MERGE, liquid clustering, medallion, Lakeflow pipelines/Jobs · L5 AI/ML: Genie, AI functions, Model Serving, AI Search, MLflow.
- Databricks Free Edition (personal, serverless-only) lets Lavi practise on this machine any day; offer it alongside the Sunday appendix.
- 2026-10-25: Lesson 1 written. Ask what Lavi found in the Sunday appendix (cloud/region, warehouse types & auto stop, hive_metastore, medallion schemas) and build L2 around it.
