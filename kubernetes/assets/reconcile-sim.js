// Reconciliation simulator: a toy cluster where controllers, scheduler and kubelet
// each take a visible step per tick. Reusable across lessons.
//
// Usage:
//   <div id="sim"></div>
//   <script src="../assets/reconcile-sim.js"></script>
//   <script>ReconcileSim.mount(document.getElementById("sim"), {
//     nodes: 3, replicas: 3,
//     missions: [{ text: "Delete a pod", on: "pod-replaced" }, ...]
//   })</script>
//
// Mission event types: scaled-up, scaled-down, pod-scheduled, pod-replaced,
// container-restarted, node-evicted, stuck-pending.
//
// ponytail: one pod template ("web"), no rolling updates or resource limits; extend when a lesson needs them.

const ReconcileSim = (function () {
  const CSS = `
  .sim .bar { display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; margin-bottom: .8rem; }
  .sim .cp { font-family: var(--mono); font-size: .78rem; background: var(--panel); border-radius: 4px; padding: .5rem .7rem; margin-bottom: .8rem; }
  .sim .cp b { color: var(--accent); }
  .sim .nodes { display: grid; grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); gap: .6rem; }
  .sim .node { border: 1px solid var(--rule); border-radius: 5px; padding: .5rem; min-height: 7rem; }
  .sim .node.down { border-style: dashed; opacity: .55; }
  .sim .node header { display: flex; justify-content: space-between; align-items: center; font-family: var(--mono); font-size: .75rem; margin-bottom: .4rem; }
  .sim .node header button { font-size: .7rem; padding: .1rem .4rem; }
  .sim .pod { font-family: var(--mono); font-size: .72rem; border-radius: 3px; padding: .15rem .35rem; margin: .2rem 0; border: 1px solid; }
  .sim .pod.Running { border-color: var(--good); color: var(--good); }
  .sim .pod.Pending, .sim .pod.ContainerCreating { border-color: var(--warn); color: var(--warn); }
  .sim .pending { margin-top: .6rem; font-family: var(--mono); font-size: .75rem; color: var(--muted); }
  .sim .log { font-family: var(--mono); font-size: .72rem; height: 9rem; overflow-y: auto; background: var(--panel);
    border-radius: 4px; padding: .5rem; margin-top: .8rem; }
  .sim .log div { margin: .1rem 0; }
  .sim .log .who { display: inline-block; min-width: 10.5rem; color: var(--accent); }
  .sim .missions { list-style: none; padding: 0; margin: .8rem 0 0; font-size: .88rem; }
  .sim .missions li::before { content: "☐ "; }
  .sim .missions li.done { color: var(--good); }
  .sim .missions li.done::before { content: "☑ "; }`;

  const rand = () => Math.random().toString(36).slice(2, 7);

  function mount(root, opts) {
    if (!document.getElementById("sim-css")) document.head.insertAdjacentHTML("beforeend", `<style id="sim-css">${CSS}</style>`);
    const s = {
      desired: opts.replicas ?? 3,
      nodes: Array.from({ length: opts.nodes ?? 3 }, (_, i) => ({ name: `node-${i + 1}`, up: true })),
      pods: [],
      paused: false,
    };
    root.classList.add("sim", "widget");
    root.innerHTML = `
      <div class="bar">
        <button data-act="down">− replica</button><button data-act="up">+ replica</button>
        <button data-act="delete">kubectl delete pod</button>
        <button data-act="crash">crash a container</button>
        <button data-act="pause">pause</button><button data-act="step" disabled>step</button>
      </div>
      <div class="cp"></div><div class="nodes"></div><div class="pending"></div>
      <div class="log" aria-live="polite"></div>
      ${opts.missions ? `<ul class="missions">${opts.missions.map(m => `<li data-on="${m.on}">${m.text}</li>`).join("")}</ul>` : ""}`;
    const $ = sel => root.querySelector(sel);

    function log(who, msg) {
      $(".log").insertAdjacentHTML("beforeend", `<div><span class="who">${who}</span>${msg}</div>`);
      $(".log").scrollTop = 1e9;
    }
    function emit(type) {
      root.querySelectorAll(`.missions li[data-on="${type}"]`).forEach(li => li.classList.add("done"));
    }

    // --- the four actors, each one step per tick -------------------------------
    function nodeController(touched) {
      for (const node of s.nodes.filter(n => !n.up)) {
        const victims = s.pods.filter(p => p.node === node.name);
        if (!victims.length) continue;
        s.pods = s.pods.filter(p => p.node !== node.name);
        log("node controller", `${node.name} NotReady → evicting ${victims.map(p => p.name).join(", ")} <i>(real clusters wait minutes first)</i>`);
        emit("node-evicted");
        touched.add("evict");
      }
    }
    function replicaSetController(touched) {
      const diff = s.desired - s.pods.length;
      for (let i = 0; i < diff; i++) {
        const pod = { name: `web-${rand()}`, node: null, phase: "Pending", restarts: 0 };
        s.pods.push(pod); touched.add(pod);
        log("replicaset controller", `want ${s.desired}, have ${s.desired - diff + i} → create ${pod.name}`);
        if (s.replaced > 0) { s.replaced--; emit("pod-replaced"); }
      }
      for (let i = 0; i < -diff; i++) {
        const pod = s.pods.pop();
        log("replicaset controller", `want ${s.desired}, have ${s.pods.length + 1} → delete ${pod.name}`);
      }
    }
    function scheduler(touched) {
      const ready = s.nodes.filter(n => n.up);
      for (const pod of s.pods.filter(p => !p.node && !touched.has(p))) {
        if (!ready.length) {
          if (!pod.stuckLogged) { log("scheduler", `no Ready node for ${pod.name} → stays Pending`); pod.stuckLogged = true; emit("stuck-pending"); }
          continue;
        }
        const load = n => s.pods.filter(p => p.node === n.name).length;
        const target = ready.reduce((a, b) => (load(b) < load(a) ? b : a));
        pod.node = target.name; pod.stuckLogged = false; touched.add(pod);
        log("scheduler", `${pod.name} → ${target.name} (fewest pods)`);
        emit("pod-scheduled");
      }
    }
    function kubelet(touched) {
      for (const pod of s.pods.filter(p => p.node && !touched.has(p))) {
        if (pod.phase === "Pending") { pod.phase = "ContainerCreating"; log(`kubelet@${pod.node}`, `asks container runtime to start ${pod.name}`); }
        else if (pod.phase === "ContainerCreating") { pod.phase = "Running"; log(`kubelet@${pod.node}`, `${pod.name} Running`); }
        else if (pod.phase === "Crashed") {
          pod.phase = "Running"; pod.restarts++;
          log(`kubelet@${pod.node}`, `container in ${pod.name} exited → restart it in place (restarts: ${pod.restarts})`);
          emit("container-restarted");
        }
      }
    }
    function tick() {
      const touched = new Set();
      nodeController(touched); replicaSetController(touched); scheduler(touched); kubelet(touched);
      render();
    }

    // --- user actions ------------------------------------------------------------
    const running = () => s.pods.filter(p => p.phase === "Running");
    const actions = {
      up() { s.desired++; log("you → API server", `spec.replicas = ${s.desired}`); emit("scaled-up"); },
      down() { if (s.desired > 0) { s.desired--; log("you → API server", `spec.replicas = ${s.desired}`); emit("scaled-down"); } },
      delete() {
        const pod = running()[0]; if (!pod) return;
        s.pods = s.pods.filter(p => p !== pod); s.replaced = (s.replaced || 0) + 1;
        log("you → API server", `delete pod ${pod.name}`);
      },
      crash() {
        const pod = running()[0]; if (!pod) return;
        pod.phase = "Crashed"; log("container runtime", `container in ${pod.name} crashed (exit 1)`);
      },
      pause() { s.paused = !s.paused; $('[data-act="pause"]').textContent = s.paused ? "resume" : "pause"; $('[data-act="step"]').disabled = !s.paused; },
      step: tick,
    };
    root.addEventListener("click", e => {
      const act = e.target.dataset.act, node = e.target.dataset.node;
      if (act) { actions[act](); render(); }
      if (node) {
        const n = s.nodes.find(x => x.name === node); n.up = !n.up;
        log(`kubelet@${n.name}`, n.up ? "heartbeats resume, node Ready" : "node lost, heartbeats stop");
        render();
      }
    });

    function render() {
      $(".cp").innerHTML = `etcd (desired): <b>spec.replicas = ${s.desired}</b> &nbsp;·&nbsp; actual: ${running().length} Running / ${s.pods.length} pods`;
      $(".nodes").innerHTML = s.nodes.map(n => `
        <div class="node ${n.up ? "" : "down"}">
          <header><span>${n.name}</span><button data-node="${n.name}">${n.up ? "power off" : "power on"}</button></header>
          ${s.pods.filter(p => p.node === n.name).map(p =>
            `<div class="pod ${p.phase}">${p.name} ${p.phase === "Crashed" ? "Error" : p.phase}${p.restarts ? ` ↻${p.restarts}` : ""}</div>`).join("")}
        </div>`).join("");
      const unscheduled = s.pods.filter(p => !p.node);
      $(".pending").textContent = unscheduled.length ? `Not yet scheduled: ${unscheduled.map(p => p.name).join(", ")}` : "";
    }

    render();
    setInterval(() => { if (!s.paused) tick(); }, opts.tickMs ?? 1300);
  }

  return { mount };
})();
