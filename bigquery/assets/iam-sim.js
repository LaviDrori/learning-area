// IAM simulator: pick a person and an action, see which grant allows each permission it needs (or that none does).
//
// Usage:
//   <div id="iam"></div>
//   <script src="../assets/iam-sim.js"></script>
//   <script>IamSim.mount(document.getElementById("iam"), {
//     roles: { "roles/bigquery.jobUser": ["bigquery.jobs.create"], … },
//     setups: [{ label: "…", note: "HTML", bindings: [
//       { role: "roles/bigquery.dataViewer", member: "group:x@acme.com", on: "acme-dw/hr_views" }, …] }, …],
//     people: [{ label: "Noa, employee", members: ["user:noa@acme.com", "group:x@acme.com"], note: "HTML" }, …],
//     actions: [{ label: "…", note: "HTML", needs: [{ perm: "bigquery.jobs.create", on: "people-agent-prod" }, …] }, …]
//   })</script>
// Resources are paths: "project", "project/dataset", "project/dataset/table", "project/sa:name". A grant on a path covers
// everything under it (inheritance); the effective access is the union of all grants that cover it.
// A need on bigquery.jobs.create also names the project the job runs in, which is the one billed.

const IamSim = (function () {
  const CSS = `
  .iam .controls { display: flex; flex-wrap: wrap; gap: .6rem 1.2rem; margin-bottom: .8rem; font-size: .85rem; }
  .iam select { font: inherit; font-size: .85rem; color: var(--fg); background: var(--panel); border: 1px solid var(--rule); border-radius: 4px; padding: .25rem .4rem; max-width: 100%; }
  .iam .need { font-family: var(--mono); font-size: .78rem; background: var(--panel); border-radius: 4px; padding: .5rem .8rem; margin: .4rem 0; }
  .iam .need .ok { color: var(--good); } .iam .need .no { color: var(--bad); }
  .iam .need .via { color: var(--muted); display: block; margin-top: .2rem; }
  .iam .verdict { font-weight: 600; margin: .6rem 0 .2rem; }
  .iam .note { float: none; width: auto; margin: .3rem 0 0; display: block; }`;

  const covers = (grantOn, target) => target === grantOn || target.startsWith(grantOn + "/");
  // "project/sa:name" is a service account in that project; other paths are project/dataset/table.
  const level = path => path.includes("/sa:") ? "service account"
    : ["project", "dataset", "table or view"][path.split("/").length - 1] || "resource";

  // Every binding that gives this person this permission on this resource, directly or inherited.
  function grantsFor(need, person, cfg, bindings) {
    return bindings.filter(b => person.members.includes(b.member) && covers(b.on, need.on)
      && (cfg.roles[b.role] || []).includes(need.perm));
  }

  function needHtml(need, hits) {
    const via = hits.map(b => `${b.role} to ${b.member} on ${level(b.on)} <b>${b.on}</b>${b.on === need.on ? "" : " (inherited)"}`);
    const bill = need.perm === "bigquery.jobs.create" ? `<span class="via">the job runs in, and is billed to, <b>${need.on}</b></span>` : "";
    return `<div class="need"><span class="${hits.length ? "ok" : "no"}">${hits.length ? "✓" : "✗"} ${need.perm}</span> on ${need.on}`
      + (hits.length ? via.map(v => `<span class="via">via ${v}</span>`).join("") : `<span class="via">no grant covers it</span>`) + bill + `</div>`;
  }

  function render(root, cfg) {
    const setup = cfg.setups[root.querySelector(".su").value];
    const person = cfg.people[root.querySelector(".pp").value], action = cfg.actions[root.querySelector(".ac").value];
    const results = action.needs.map(n => [n, grantsFor(n, person, cfg, setup.bindings)]);
    const missing = results.find(([, hits]) => !hits.length);
    const verdict = missing
      ? `<span style="color:var(--bad)">Access Denied: missing ${missing[0].perm} on ${missing[0].on}.</span>`
      : `<span style="color:var(--good)">Allowed.</span>`;
    const notes = [setup.note, person.note, action.note].filter(Boolean).map(n => `<span class="note">${n}</span>`).join("");
    root.querySelector(".out").innerHTML = results.map(([n, hits]) => needHtml(n, hits)).join("")
      + `<div class="verdict">${verdict}</div>` + notes;
  }

  function mount(root, cfg) {
    if (!document.getElementById("iam-css")) document.head.insertAdjacentHTML("beforeend", `<style id="iam-css">${CSS}</style>`);
    root.classList.add("iam", "widget");
    const opts = list => list.map((x, i) => `<option value="${i}">${x.label}</option>`).join("");
    root.innerHTML = `<div class="controls">
        <label>Grants: <select class="su">${opts(cfg.setups)}</select></label>
        <label>Who: <select class="pp">${opts(cfg.people)}</select></label>
        <label>Tries to: <select class="ac">${opts(cfg.actions)}</select></label></div><div class="out" aria-live="polite"></div>`;
    root.addEventListener("change", () => render(root, cfg));
    render(root, cfg);
  }

  return { mount };
})();
