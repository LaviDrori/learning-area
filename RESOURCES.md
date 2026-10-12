# Kubernetes Resources

## Knowledge

- [Docs: Kubernetes Overview (kubernetes.io)](https://kubernetes.io/docs/concepts/overview/)
  Official "what and why": desired state, self-healing, what K8s is *not*. Use for: framing, capability lists.
- [Docs: Kubernetes Components (kubernetes.io)](https://kubernetes.io/docs/concepts/overview/components/)
  Canonical one-liners for every control-plane and node component. Use for: architecture, glossary definitions.
- [Docs: Controllers (kubernetes.io)](https://kubernetes.io/docs/concepts/architecture/controller/)
  Control loops, thermostat analogy, spec vs status. Use for: the reconciliation mental model.
- [Docs: Pods (kubernetes.io)](https://kubernetes.io/docs/concepts/workloads/pods/)
  Pods as the smallest deployable unit, why you don't create them directly. Use for: workloads lessons.
- [Docs: Deployments (kubernetes.io)](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
  Canonical nginx-deployment example, `kubectl get deploy/rs/pods` columns, ReplicaSet naming, pod-template-hash, rollouts, selector rules. Use for: anything Deployment. (Page is huge; the raw source at github.com/kubernetes/website is easier to search.)
- [Docs: Objects in Kubernetes (kubernetes.io)](https://kubernetes.io/docs/concepts/overview/working-with-objects/)
  Required manifest fields (apiVersion/kind/metadata/spec), spec vs status. Use for: reading any YAML.
- [Docs: Labels and Selectors (kubernetes.io)](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
  "The label selector is the core grouping primitive." Use for: how Deployments and Services find pods.
- [Tutorial: Kubernetes Basics (kubernetes.io)](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
  Official guided intro: deploy, explore, expose, scale, update. Use for: first hands-on once a cluster is available.
- [Killercoda Kubernetes playground](https://killercoda.com/playgrounds/scenario/kubernetes)
  Browser-based throwaway cluster, no install. Use for: hands-on before Docker Desktop is approved.
- [Kubernetes The Hard Way (Kelsey Hightower)](https://github.com/kelseyhightower/kubernetes-the-hard-way)
  Builds a cluster component by component. Use for: the "operate clusters" phase, after the basics.

## Wisdom (Communities)

- [Kubernetes Slack](https://slack.k8s.io/) → kubernetes.slack.com, 170+ channels
  Use for: quick questions, real operator war stories.
- [Kubernetes Discuss forum](https://discuss.kubernetes.io/)
  Official forum, searchable. Use for: longer-form troubleshooting questions.
- Your own team's platform engineers. Use for: "why is *our* cluster set up this way?"

## Gaps
- A trusted beginner-level *containers* resource beyond the [Containers concept page](https://kubernetes.io/docs/concepts/containers/) (Docker docs "Get started" is the candidate; verify before use).
