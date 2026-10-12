# Service selector is a query, not a validated contract

Given a Service with `selector: app: nginx-web` and pods labelled `app: nginx`, Lavi correctly predicted "the Service exists but sends traffic to no pods", not "the API rejects it". That distinguishes it from the Deployment rule (selector must match template labels or it's rejected), so they understand selectors as label queries rather than just memorising the Deployment rule.

**Evidence:** answered B (2026-10-12), before any formal Service lesson.
**Implications:** Lesson 3 (Services) can move faster on selectors and spend its time on ClusterIP/stable addressing, port vs targetPort, EndpointSlices and the "no endpoints" debugging pattern.
