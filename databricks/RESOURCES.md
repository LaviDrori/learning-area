# Databricks Resources

Docs default to AWS pages (`docs.databricks.com/aws/en/...`); Azure equivalents are on `learn.microsoft.com/azure/databricks/`. Databricks renames products often (2025-2026: Lakeflow, Genie, AI Search, OpenSharing), so re-check names before each lesson.

## Knowledge

- [Docs: High-level architecture](https://docs.databricks.com/aws/en/getting-started/overview)
  Control plane vs compute plane, classic vs serverless, workspace storage, account vs workspace. Use for: the map. Primary source for Lesson 1.
- [Docs: Databricks components](https://docs.databricks.com/aws/en/getting-started/concepts)
  Official concepts glossary: metastore, all-purpose vs jobs compute, DBU. Use for: definitions.
- [Docs: Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/)
  Three-level namespace, managed vs external, grants, lineage, audit. Use for: Lesson 3 (access).
- [Docs: Managed tables](https://docs.databricks.com/aws/en/tables/managed) · [Hive metastore (legacy)](https://docs.databricks.com/aws/en/data-governance/unity-catalog/hive-metastore) · [Volumes](https://docs.databricks.com/aws/en/volumes/)
- [Docs: Compute](https://docs.databricks.com/aws/en/compute/) · [SQL warehouse types](https://docs.databricks.com/aws/en/compute/sql-warehouse/warehouse-types) · [Configure a SQL warehouse](https://docs.databricks.com/aws/en/compute/sql-warehouse/create)
  Classic vs serverless, standard vs dedicated, warehouse types, auto stop defaults. Use for: Lesson 2 (cost & compute).
- [Docs: Cost optimization best practices](https://docs.databricks.com/aws/en/lakehouse-architecture/cost-optimization/best-practices)
  DBUs + VM costs on classic vs serverless. Use for: Lesson 2.
- [Pricing](https://www.databricks.com/product/pricing)
  Per-second, pay-as-you-go; Azure billed by Microsoft. Numbers change; re-check.
- [Docs: Delta Lake](https://docs.databricks.com/aws/en/delta/) · [Table history / time travel](https://docs.databricks.com/aws/en/delta/history) · [Liquid clustering](https://docs.databricks.com/aws/en/delta/clustering) · [Medallion](https://docs.databricks.com/aws/en/lakehouse/medallion)
  Use for: Lesson 4 (Delta & modelling).
- [Docs: Where is DLT?](https://docs.databricks.com/aws/en/ldp/where-is-dlt) · [Lakeflow Jobs](https://docs.databricks.com/aws/en/jobs/) · [Auto Loader](https://docs.databricks.com/aws/en/ingestion/cloud-object-storage/auto-loader/)
- [Docs: Genie](https://docs.databricks.com/aws/en/genie/) · [Model Serving](https://docs.databricks.com/aws/en/machine-learning/model-serving/) · [AI Search](https://docs.databricks.com/aws/en/ai-search/ai-search) · [MLflow](https://docs.databricks.com/aws/en/mlflow/) · [Databricks Apps](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/)
  Use for: Lesson 5 (AI/ML).
- [Blog: BigQuery to Databricks migration framework](https://www.databricks.com/blog/bigquery-databricks-strategic-framework-modern-migration)
  Databricks' own BigQuery→Databricks concept mapping (project→catalog, dataset→schema). Use for: every BigQuery bridge.

## Skills

- [Databricks Fundamentals](https://www.databricks.com/resources/learn/training/databricks-fundamentals)
  Free, ~1 hour, 4 videos + quiz + badge. Use for: a guided overview alongside Lessons 1-2.
- [Databricks Free Edition](https://www.databricks.com/learn/free-edition)
  Free, personal, non-commercial workspace. Serverless only, one 2X-Small warehouse ([limits](https://docs.databricks.com/aws/en/getting-started/free-edition-limitations)). Use for: hands-on any day, not just Sundays.
- [Course: Get Started with Databricks Free Edition](https://www.databricks.com/training/catalog/get-started-with-databricks-free-edition-4486)
  Free, 30 min, two guided notebooks.
- [Databricks Academy catalog](https://customer-academy.databricks.com/learn/home)
  Free self-paced courses.

## Wisdom (Communities)

- [Databricks Community](https://community.databricks.com)
  Official forum, including an Academy Learners board. Use for: "is this how people really do it?".
- [r/databricks](https://www.reddit.com/r/databricks/)
  Unofficial practitioner subreddit (not fetched; Reddit blocks fetching). Use for: real-world cost and migration stories.

## Gaps

- GCP-specific architecture differences not checked.
- Not verified: "Lakeview" as the old name of AI/BI dashboards; the exact 2025 pipelines name ("Lakeflow Declarative Pipelines"); the AI Search rename date.
