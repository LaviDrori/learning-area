// Deployment simulator: edit a Deployment's replicas/image, "kubectl apply", and read
// the resulting `kubectl get deploy / rs / pods` output.
//
// Usage:
//   <div id="ds"></div>
//   <script src="../assets/deploy-sim.js"></script>
//   <script>DeploySim.mount(document.getElementById("ds"), {
//     name: "nginx-deployment", replicas: 3, images: ["nginx:1.14.2", "nginx:1.16.1"],
//     missions: [{ text: "…", on: "scaled" }]
//   })</script>
//
// Mission event types: scaled, rollout, rollback (template returned to an earlier revision).
//
// ponytail: rollouts complete instantly (no maxSurge/maxUnavailable steps) and pods are always Running;
// make it step-by-step when the rolling-update lesson needs it.

const DeploySim = (function () {
  const CSS = `
  .ds .form { display: flex; flex-wrap: wrap; gap: .8rem; align-items: center; font-family: var(--mono); font-size: .8rem; margin-bottom: .8rem; }
  .ds input, .ds select { font: inherit; background: var(--panel); color: var(--fg); border: 1px solid var(--rule); border-radius: 4px; padding: .25rem .4rem; }
  .ds input { width: 3.5rem; }
  .ds .out { font-family: var(--mono); font-size: .74rem; background: var(--panel); border-radius: 4px; padding: .6rem .8rem; overflow-x: auto; white-space: pre; margin: .4rem 0; }
  .ds .cmd { color: var(--accent); }
  .ds .new { color: var(--good); }
  .ds .missions { list-style: none; padding: 0; margin: .8rem 0 0; font-size: .88rem; }
  .ds .missions li::before { content: "☐ "; }
  .ds .missions li.done { color: var(--good); }
  .ds .missions li.done::before { content: "☑ "; }`;

  // Deterministic stand-in for pod-template-hash: same template → same hash.
  function templateHash(image) {
    let h = 2166136261;
    for (const c of image) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return (h >>> 0).toString(16).padStart(8, "0").slice(0, 8) + "c" + ((h >>> 3) % 10);
  }
  const suffix = () => Math.random().toString(36).slice(2, 7).padEnd(5, "x");
  const pad = (s, n) => String(s).padEnd(n);

  function mount(root, opts) {
    if (!document.getElementById("ds-css")) document.head.insertAdjacentHTML("beforeend", `<style id="ds-css">${CSS}</style>`);
    const s = { replicas: opts.replicas, image: opts.images[0], rs: [], seenHashes: [], lastChanged: null };
    root.classList.add("ds", "widget");
    root.innerHTML = `
      <div class="form">
        <label>spec.replicas <input type="number" min="0" max="8" value="${s.replicas}"></label>
        <label>template image <select>${opts.images.map(i => `<option>${i}</option>`).join("")}</select></label>
        <button>kubectl apply</button>
      </div>
      <div class="out"></div>
      ${opts.missions ? `<ul class="missions">${opts.missions.map(m => `<li data-on="${m.on}">${m.text}</li>`).join("")}</ul>` : ""}`;
    const emit = t => root.querySelectorAll(`.missions li[data-on="${t}"]`).forEach(li => li.classList.add("done"));

    function setPods(rs, n) {
      while (rs.pods.length < n) rs.pods.push({ name: `${opts.name}-${rs.hash}-${suffix()}`, fresh: true });
      rs.pods.length = n;
    }
    function apply(replicas, image) {
      const hash = templateHash(image);
      let current = s.rs.find(r => r.hash === hash);
      const templateChanged = !current || current !== s.rs[0];
      s.rs.forEach(r => r.pods.forEach(p => (p.fresh = false)));
      if (!current) { current = { hash, image, pods: [], born: Date.now() }; }
      if (templateChanged && s.rs.length) emit(s.seenHashes.includes(hash) ? "rollback" : "rollout");
      else if (s.rs.length && replicas !== s.replicas) emit("scaled");
      s.rs = [current, ...s.rs.filter(r => r !== current)];   // newest/active first
      s.rs.forEach(r => setPods(r, r === current ? replicas : 0));
      if (!s.seenHashes.includes(hash)) s.seenHashes.push(hash);
      s.replicas = replicas; s.image = image;
      render();
    }

    function render() {
      const n = s.replicas, age = r => `${Math.max(1, Math.round((Date.now() - r.born) / 1000))}s`;
      const pods = s.rs.flatMap(r => r.pods);
      root.querySelector(".out").innerHTML =
`<span class="cmd">$ kubectl get deployments</span>
${pad("NAME", 20)}${pad("READY", 8)}${pad("UP-TO-DATE", 13)}AVAILABLE
${pad(opts.name, 20)}${pad(`${n}/${n}`, 8)}${pad(n, 13)}${n}

<span class="cmd">$ kubectl get rs</span>
${pad("NAME", 33)}${pad("DESIRED", 9)}${pad("CURRENT", 9)}${pad("READY", 7)}AGE
${s.rs.map(r => `${pad(`${opts.name}-${r.hash}`, 33)}${pad(r.pods.length, 9)}${pad(r.pods.length, 9)}${pad(r.pods.length, 7)}${age(r)}`).join("\n")}

<span class="cmd">$ kubectl get pods --show-labels</span>
${pad("NAME", 40)}${pad("STATUS", 9)}LABELS
${pods.map(p => `<span class="${p.fresh ? "new" : ""}">${pad(p.name, 40)}${pad("Running", 9)}app=nginx,pod-template-hash=${p.name.split("-").slice(-2, -1)}</span>`).join("\n") || "No resources found."}`;
    }

    root.querySelector("button").addEventListener("click", () => {
      const replicas = Math.max(0, Math.min(8, Number(root.querySelector("input").value) || 0));
      apply(replicas, root.querySelector("select").value);
    });
    apply(s.replicas, s.image);
  }

  return { mount };
})();
