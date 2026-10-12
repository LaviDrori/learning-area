# Lavi builds the containers customers run

Lavi is a BI developer / AI engineer. Their apps ship as a repo plus a container image, and customers' IT/DevOps run them (usually on K8s) and ask Lavi about it. Lavi is on the *app side* of the conversation, not the cluster-operator side.

**Implications:** Reorder the curriculum around deployment-readiness topics: Services/ports → config & Secrets → health probes → resource requests/limits (+GPU) → state & volumes → security context → packaging (manifests/Helm, image tags) → failure statuses. Deprioritise cluster-operations depth (HA, etcd, networking internals) until later. Lavi produces containers, so container/Dockerfile basics may need a short lesson; check how much of the containerisation they do themselves.
