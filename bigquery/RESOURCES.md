# BigQuery Resources

Google moved the docs to `docs.cloud.google.com`; old `cloud.google.com/bigquery/docs/...` links redirect.

## Knowledge

- [Docs: Control costs in BigQuery](https://docs.cloud.google.com/bigquery/docs/best-practices-costs)
  Google's own cost checklist: LIMIT on non-clustered tables, dry runs, maximum bytes billed, free table preview. Use for: any cost lesson. Primary source for Lesson 1.
- [Docs: Querying partitioned tables](https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables)
  Exactly which WHERE clauses prune partitions and which don't (functions, subqueries, OR), `require_partition_filter`, `_PARTITIONTIME`. Use for: "why did it scan everything?".
- [Docs: Introduction to partitioned tables](https://docs.cloud.google.com/bigquery/docs/partitioned-tables)
  Partition types (time-unit column, ingestion time, integer range) and granularity. Use for: table design.
- [Docs: Introduction to clustered tables](https://docs.cloud.google.com/bigquery/docs/clustered-tables)
  Block pruning, up to four columns, column order, estimates as upper bounds, clustering vs partitioning. Use for: table design.
- [Docs: Storage overview](https://docs.cloud.google.com/bigquery/docs/storage_overview)
  Columnar storage, "each column stored separately". Use for: why column choice changes cost.
- [Docs: Estimate and control costs](https://docs.cloud.google.com/bigquery/docs/estimate-costs)
  Logical bytes, 1 TB free tier, dry-run behaviour (0 bytes on row-level-secured tables). Use for: estimates.
- [Pricing: BigQuery](https://cloud.google.com/bigquery/pricing)
  On-demand $/TiB, 10 MB minimum per referenced table, cached and errored queries free, editions. Use for: numbers (they change; re-check).
- [Docs: Introduction to BigQuery jobs](https://docs.cloud.google.com/bigquery/docs/jobs-overview)
  A query is billed to the project that runs the job. Use for: "who pays when my app queries your data?".
- [Docs: INFORMATION_SCHEMA.JOBS view](https://docs.cloud.google.com/bigquery/docs/information-schema-jobs)
  Query history with `total_bytes_billed`, 180 days. Use for: finding expensive queries.
- [Sample: dry run in Python](https://docs.cloud.google.com/bigquery/docs/samples/bigquery-query-dry-run)
  `QueryJobConfig(dry_run=True, use_query_cache=False)`. Use for: app-side cost guards.
- [Docs: Introduction to row-level security](https://docs.cloud.google.com/bigquery/docs/row-level-security-intro)
  Row access policies, grantee lists, `SESSION_USER()`, no matching policy means no rows. Use for: Lesson 2.

## Wisdom (Communities)

- [Google Cloud Community: BigQuery forum](https://discuss.google.dev/)
  Official forum where Google staff answer. Use for: "is this design sane?" questions about cost and security.
- [Stack Overflow: google-bigquery tag](https://stackoverflow.com/questions/tagged/google-bigquery)
  Large, well-moderated Q&A. Use for: specific SQL and client-library problems.
- [r/bigquery](https://www.reddit.com/r/bigquery/)
  Practitioner subreddit. Use for: real-world cost stories and table-design opinions.

## Gaps

- No trusted single source yet for multi-tenant row-level security patterns in apps that use one service account. Look before Lesson 2.
