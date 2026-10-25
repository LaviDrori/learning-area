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
- [Docs: Images (kubernetes.io)](https://kubernetes.io/docs/concepts/containers/images/)
  Image names, tags vs digests, imagePullPolicy defaults, avoid `:latest`, ImagePullBackOff. Use for: anything about how images reach nodes.
- [Task: Pull an Image from a Private Registry (kubernetes.io)](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
  imagePullSecrets walkthrough. Use for: customer private-registry setups.
- [Argo CD docs](https://argo-cd.readthedocs.io/en/stable/)
  The main GitOps tool: Git as source of truth, OutOfSync, sync policies. Use for: GitOps questions.
- [GitHub Docs: Publishing Docker images](https://docs.github.com/en/actions/use-cases-and-examples/publishing-packages/publishing-docker-images)
  Official GitHub Actions workflow for building and pushing to ghcr.io (actions pinned by SHA). Use for: CI examples.
- [Tutorial: Kubernetes Basics (kubernetes.io)](https://kubernetes.io/docs/tutorials/kubernetes-basics/)
  Official guided intro: deploy, explore, expose, scale, update. Use for: first hands-on once a cluster is available.
- [Killercoda Kubernetes playground](https://killercoda.com/playgrounds/scenario/kubernetes)
  Browser-based throwaway cluster, no install. Use for: hands-on before Docker Desktop is approved.
- [Kubernetes The Hard Way (Kelsey Hightower)](https://github.com/kelseyhightower/kubernetes-the-hard-way)
  Builds a cluster component by component. Use for: the "operate clusters" phase, after the basics.

- [Docs: Pod Lifecycle, Termination of Pods (kubernetes.io)](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination)
  SIGTERM to the main process, STOPSIGNAL, 30s default grace period, SIGKILL, terminating endpoints. Use for: shutdown behaviour, rollouts.
- [Docs: Logging Architecture (kubernetes.io)](https://kubernetes.io/docs/concepts/cluster-administration/logging/)
  stdout/stderr as the standard, how `kubectl logs` reads them, rotation (10Mi × 5 by default). Use for: "where are your logs?"
- [Docs: Pod Security Standards (kubernetes.io)](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
  Privileged / Baseline / Restricted profiles and their exact field rules (runAsNonRoot, runAsUser ≠ 0). Use for: security-context questions. Raw source on GitHub is easier to grep.
- [Pod API reference: SecurityContext (kubernetes.io)](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/)
  Field-level truth for runAsUser ("Defaults to user specified in image metadata"), runAsNonRoot. Use for: exact semantics. (Huge page; `kubernetes/api` core/v1/types.go has the same text.)
- [Dockerfile reference (docs.docker.com)](https://docs.docker.com/reference/dockerfile/)
  Every instruction; shell vs exec form ("does not pass signals"); USER; ARG secrets warning. Use for: any Dockerfile line.
- [Docker docs: Build secrets](https://docs.docker.com/build/building/secrets/)
  "Build arguments and environment variables are inappropriate for passing secrets… they persist in the final image." Use for: secrets-in-image questions.
- [Docker docs: Building best practices](https://docs.docker.com/build/building/best-practices/)
  Official Dockerfile hygiene guide. Use for: image size, caching, USER.
- [Python docs: PYTHONUNBUFFERED / sys.stdout buffering](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONUNBUFFERED)
  Non-interactive stdout is block-buffered; the env var disables it. Use for: Python logging in containers.
- [Docs: Service (kubernetes.io)](https://kubernetes.io/docs/concepts/services-networking/service/)
  Why Services exist (ephemeral pod IPs), selector → EndpointSlices, port vs targetPort ("targetPort is set to the same value as the port"), Service types, NodePort range 30000-32767. Use for: anything Service. Raw source on GitHub is easier to grep.
- [Task: Debug Services (kubernetes.io)](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/)
  Official checklist: DNS → Service definition → EndpointSlices (`<none>` = selector mismatch) → pods. Use for: "we can't reach your app".
- [Docs: DNS for Services and Pods (kubernetes.io)](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
  `svc.namespace.svc.cluster.local`, search-path expansion, cross-namespace example (`data.prod`). Use for: service-to-service URLs.
- [Docs: Ingress (kubernetes.io)](https://kubernetes.io/docs/concepts/services-networking/ingress/)
  HTTP(S) routing, TLS termination, Ingress controllers. Notes the API is frozen and Gateway is recommended. Use for: "how do outside users reach it".
- [Gateway API (gateway-api.sigs.k8s.io)](https://gateway-api.sigs.k8s.io/)
  Ingress's successor: Gateway + HTTPRoute. Use for: modern customer setups.
- [Task: Port forwarding (kubernetes.io)](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/)
  `kubectl port-forward` to pod/deployment/service, local:remote syntax. Use for: hands-on access.
- [Uvicorn docs: Settings](https://www.uvicorn.org/settings/)
  `--host` default is `127.0.0.1`; use `0.0.0.0`. Use for: "connection refused" on Python apps.
- [Kubernetes API source: core/v1 types.go](https://github.com/kubernetes/api/blob/master/core/v1/types.go)
  Field docs verbatim, e.g. containerPort "DOES NOT prevent that port from being exposed", targetPort semantics. Use for: exact field semantics.

## Wisdom (Communities)

- [Kubernetes Slack](https://slack.k8s.io/) → kubernetes.slack.com, 170+ channels
  Use for: quick questions, real operator war stories.
- [Kubernetes Discuss forum](https://discuss.kubernetes.io/)
  Official forum, searchable. Use for: longer-form troubleshooting questions.
- Your own team's platform engineers. Use for: "why is *our* cluster set up this way?"

## Gaps
- A trusted beginner-level *containers* resource beyond the [Containers concept page](https://kubernetes.io/docs/concepts/containers/) (Docker docs "Get started" is the candidate; verify before use).
