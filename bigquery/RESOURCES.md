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
- [Docs: Manage jobs](https://docs.cloud.google.com/bigquery/docs/managing-jobs)
  "When running a query job, the cost is billed to the project that runs the job"; job ID `project:region.job_id` names the billed project; others' job details redacted without `bigquery.jobs.listAll`. Use for: "who pays when my app queries your data?". (Replaces the old jobs-overview page, 404 since 2026-10-25.)
- [Docs: Run a query](https://docs.cloud.google.com/bigquery/docs/running-queries)
  Required permissions: `bigquery.jobs.create` "on the project from which the query is being run, regardless of where the data is stored", `getData` on every referenced table/view, not on the source of authorized views. "The querying project is billed for the query job." Primary source for Lesson 3.
- [Docs: INFORMATION_SCHEMA.JOBS view](https://docs.cloud.google.com/bigquery/docs/information-schema-jobs)
  Query history with `total_bytes_billed`, 180 days. Use for: finding expensive queries.
- [Sample: dry run in Python](https://docs.cloud.google.com/bigquery/docs/samples/bigquery-query-dry-run)
  `QueryJobConfig(dry_run=True, use_query_cache=False)`. Use for: app-side cost guards.
- [Docs: Introduction to row-level security](https://docs.cloud.google.com/bigquery/docs/row-level-security-intro)
  Row access policies, grantee lists, `SESSION_USER()`, no matching policy means no rows, what drops policies, limitations, comparison with authorized views and separate tables. Primary source for Lesson 2.
- [Docs: Use row-level security](https://docs.cloud.google.com/bigquery/docs/managing-row-level-security)
  `CREATE ROW ACCESS POLICY` syntax and examples (service account, workforce identity, lookup-table subquery), DROP rules, listing, permissions. Use for: writing policies.
- [Docs: Best practices for row-level security](https://docs.cloud.google.com/bigquery/docs/best-practices-row-level-security)
  Side channels, hidden stats, no write access for filtered users, no pruning on policy filters, the two-policy pattern. Use for: answering the customer's security team.
- [Docs: Authorized views](https://docs.cloud.google.com/bigquery/docs/authorized-views)
  Separate dataset, authorize the view on the source, same region, authorized datasets. Use for: sharing row and column subsets.
- [Docs: Authorized datasets](https://docs.cloud.google.com/bigquery/docs/authorized-datasets)
  "All current and future views in an authorized dataset have access to the tables in the shared dataset"; permissions to create views there; 2,500 authorized resources limit. Use for: the customer's `hr_views` design.
- [Docs: Cached query results](https://docs.cloud.google.com/bigquery/docs/cached-results)
  Not cached: non-deterministic functions incl. `SESSION_USER()`, row-level-secured tables, destination tables; cache is per user, per project. Use for: why secured dashboards cost on every refresh.
- [Docs: Security functions (SESSION_USER)](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/security_functions)
  "Returns the email address of the user that's running the query." Use for: the one-service-account trap.
- [Docs: BigQuery IAM roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control)
  Every predefined role, its permissions and the lowest resource it can be granted on (Job User: project only; Data Viewer/Editor/Owner: down to a table or view). Very long; search it. Use for: "which role gives X?".
- [Docs: Basic roles and permissions](https://docs.cloud.google.com/bigquery/docs/access-control-basic-roles)
  Project Owner/Editor/Viewer → OWNER/WRITER/READER on new datasets; "Avoid using basic roles." Use for: auditing old projects.
- [Docs: IAM, using resource hierarchy for access control](https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control)
  "Resources inherit the allow policies of the parent resource"; effective policy is the union. Use for: "why can X still read hr?".
- [Docs: Control access to resources with IAM](https://docs.cloud.google.com/bigquery/docs/control-access-to-resources-iam)
  Granting on datasets, tables and views (console, `bq`, `GRANT`), viewing a dataset's access. Use for: making grants.
- [Docs: DCL statements (GRANT/REVOKE)](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language)
  `GRANT role ON SCHEMA|TABLE|VIEW|EXTERNAL TABLE|PROJECT … TO "user:…"`, member formats. Use for: grants as SQL.
- [Docs: INFORMATION_SCHEMA.OBJECT_PRIVILEGES](https://docs.cloud.google.com/bigquery/docs/information-schema-object-privileges)
  Grants "explicitly set" on one dataset/table/view, not inherited; region qualifier and object filter required. Use for: "who can read hr?" (half of it).
- [Docs: Best practices for using service accounts](https://docs.cloud.google.com/iam/docs/best-practices-service-accounts)
  Single-purpose, least privilege, avoid keys, avoid default SAs, don't let users impersonate more-privileged SAs. Use for: the agent's service account.
- [Docs: Service account impersonation](https://docs.cloud.google.com/iam/docs/service-account-impersonation)
  `iam.serviceAccounts.getAccessToken` (Token Creator) = act as the SA "to gain the service account's permissions". Use for: side doors to the SA's data.
- [Docs: Best practices for multi-tenant workloads](https://docs.cloud.google.com/bigquery/docs/best-practices-for-multi-tenant-workloads-on-bigquery)
  Dataset/project per tenant, tenant-scoped service accounts, "compute tier" projects for billing, disable key creation, data marts with authorized views. Use for: splitting costs per team, app architecture.
- [DoiT: Multi-tenant security in BigQuery via your BI tool](https://www.doit.com/blog/implementing-multi-tenant-security-transparently-and-effectively-in-bigquery-via-your-preferred-bi)
  Practitioner article: group- and domain-based policies, user OAuth instead of one shared service account, policy-count limits at 100+ customers. Use for: multi-tenant app design (not official).

## Wisdom (Communities)

- [Google Cloud Community: BigQuery forum](https://discuss.google.dev/)
  Official forum where Google staff answer. Use for: "is this design sane?" questions about cost and security.
- [Stack Overflow: google-bigquery tag](https://stackoverflow.com/questions/tagged/google-bigquery)
  Large, well-moderated Q&A. Use for: specific SQL and client-library problems.
- [r/bigquery](https://www.reddit.com/r/bigquery/)
  Practitioner subreddit. Use for: real-world cost stories and table-design opinions.

## Gaps

- Still no official Google page on per-user row security for apps that use one service account (DoiT article is the best so far). The multi-tenant page was found again (above) but recommends tenant-scoped service accounts, not per-user identity.
- How the agent writes turns (Storage Write API, streaming, or `INSERT`) decides whether its service account needs Job User. Ask Lavi; verify permissions before Lesson 6.
- Which BI tools pass the viewer's identity to BigQuery (Looker Studio viewer credentials, Tableau OAuth). Look before Lesson 8.
