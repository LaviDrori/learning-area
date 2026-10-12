# The API server is the only door

Lavi finished lesson 1, then asked what happens if the API server dies. After the explanation, they correctly predicted that `kubectl delete pod` *fails* during an API-server outage, rather than "deleted, replaced later". That shows they understand that kubectl and every component act only through the API server, not just that "the API server exists".

**Evidence:** picked B in the follow-up check (2026-10-12).
**Implications:** We can build on "everything is an object in the API, controllers watch objects". Lesson 2 (manifests, Deployment → ReplicaSet → Pod) can lean on that directly. Not yet tested: the three-healers table (kubelet / ReplicaSet / node controller). Re-check it via interleaved MCQs.
