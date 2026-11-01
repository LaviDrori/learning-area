# Shared the real Jenkinsfile: wants lessons built around it

Lavi shared the Jenkinsfile that runs their team's main Jenkins process (Tableau workbook → Git, with Harmony notifications) and asked for the lessons to be fitted around it, so that every example comes from this file.

**Implications:** Drop the generic `orders-etl` examples after L1. Teach by opening the real file stage by stage (L2 skeleton, then one lesson per stage). Treat its flaws as the raw material for the "safer deploys" suggestions in the mission. The file also answers earlier unknowns: Git host is GitHub, a shared library is in use, deploys are Docker-image based. It is **not** a multibranch/PR pipeline, so the L4 "triggers" lesson needs rewording to "how this one gets started", pending DevOps' answer. Never commit the original file, because it contains a live token.
