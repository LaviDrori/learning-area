# Mission: Kubernetes

## Why
Lavi is a BI developer / AI engineer whose apps ship to customers as a repo plus a container image. Customers' IT/DevOps teams then run them, typically on Kubernetes, and ask Lavi questions about that. Goal: understand what they are really asking ("is your container ready for our cluster?"), answer confidently, and build apps that make those conversations easy. Longer term: interview-level foundation; certification undecided. (Lavi's own org does not run Kubernetes.)

## Success looks like
- Hear a customer's Kubernetes question and know what they mean, and why they care
- Answer the standard deployment-readiness questions for one of my own apps: ports, config & secrets, health checks, CPU/memory (and GPU), state & storage, running as non-root, logs, image tags
- Read the Deployment / Service / ConfigMap manifests a customer sends back and spot problems
- Explain what happens between `kubectl apply` and a running container
- Recognise common failure statuses (Pending, CrashLoopBackOff, ImagePullBackOff, OOMKilled) and what they imply about my app

## Constraints
- Fresh start: little prior hands-on with containers or Kubernetes
- No org cluster. Local cluster waits on WSL2 security approval; until then: browser simulators, Killercoda
- ~20-30 minutes per lesson; multiple-choice preferred over open recall
- Windows machine

## Out of scope (for now)
- Helm chart authoring, service meshes, operators/CRD development
- Cloud-provider-specific managed K8s details (EKS/AKS/GKE) until the core is solid
