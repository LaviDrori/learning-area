# Mission: BigQuery

## Why
Lavi's customer runs its data warehouse on BigQuery, and Lavi's BI/AI apps live inside it: they read the customer's tables, write results back, and Lavi builds tables, views and scheduled queries in the customer's project. Lavi already queries BigQuery regularly; the goal is to understand it well enough to build things that are cheap to run, secure per user, and easy to defend in front of the customer.

## Success looks like
- Predict roughly what a query will scan and cost before running it, and explain a surprising bill
- Design tables (partitioning, clustering, required partition filters) that keep the customer's dashboards and my app's queries cheap
- Put cost guards on my app's queries (dry runs, maximum bytes billed) and know who pays for a job
- Give each end user of my app or dashboard only their own rows (row-level security, authorized views) and explain how it works to the customer
- Write idiomatic BigQuery SQL: STRUCT/ARRAY with UNNEST, window functions, QUALIFY
- Load and write data back, and connect apps and BI tools with the right service accounts and IAM roles

## Constraints
- Uses BigQuery regularly already: skip "what is a warehouse", go straight to how BigQuery behaves underneath
- BigQuery access only on the work account, not on this machine, and only on Tuesdays and Wednesdays. Lessons must work offline in the browser; hands-on steps are optional and batched for those days
- ~20-30 minutes per lesson; scenario multiple-choice preferred over open recall
- Windows machine

## Out of scope (for now)
- Other GCP services beyond what BigQuery needs (Dataflow, Pub/Sub, Composer)
- BigQuery ML and BI Engine internals
- Slot reservation administration (just enough to know which pricing model the customer is on)
