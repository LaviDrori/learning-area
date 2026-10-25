// Row-level security simulator: pick a set of row access policies and a person, see which rows they get.
//
// Usage:
//   <div id="rls"></div>
//   <script src="../assets/rls-sim.js"></script>
//   <script>RlsSim.mount(document.getElementById("rls"), {
//     table: "proj.ds.table", columns: ["store_id", …], rows: [{ store_id: 12, … }, …],
//     people: [{ label: "Maria (store manager)", runsAs: "maria@acme.com",
//                groups: ["group:store-managers@acme.com"], tableAccess: true, note: "HTML" }, …],
//     scenarios: [{ label: "…", note: "HTML", policies: [
//       { name: "store_managers", grantees: ["group:…", "domain:acme.com", "allAuthenticatedUsers"],
//         sql: "store_id IN (…)", filter: (row, sessionUser) => bool }, …] }, …],
//     scopeLabel: "View", grantLabel: p => "readers: …", reasonLabel: "access_reason"   // optional, to model views
//   })</script>
// runsAs is the identity BigQuery sees (SESSION_USER()). Users are "x@y", service accounts "x@y.iam.gserviceaccount.com".
// Rules modelled: no table access → error; no policies → all rows; policies but none granted → zero rows;
// several granted → the union of their filters.
// A filter may return an array of labels instead of a bool: the row is then returned once per label
// (models a view whose JOIN duplicates rows).

const RlsSim = (function () {
  const CSS = `
  .rls .controls { display: flex; flex-wrap: wrap; gap: .6rem 1.2rem; margin-bottom: .8rem; font-size: .85rem; }
  .rls select { font: inherit; font-size: .85rem; color: var(--fg); background: var(--panel); border: 1px solid var(--rule); border-radius: 4px; padding: .25rem .4rem; max-width: 100%; }
  .rls .who { font-family: var(--mono); font-size: .78rem; background: var(--panel); border-radius: 4px; padding: .5rem .8rem; }
  .rls .who b { color: var(--accent); }
  .rls .pol { margin: .2rem 0; }
  .rls .pol.on { color: var(--good); } .rls .pol.off { color: var(--muted); }
  .rls .wrap { overflow-x: auto; }
  .rls table { font-family: var(--mono); font-size: .78rem; }
  .rls tr.hidden td { color: var(--muted); opacity: .45; text-decoration: line-through; }
  .rls tr.shown td { background: color-mix(in srgb, var(--accent) 10%, transparent); }
  .rls .verdict { font-weight: 600; margin: .6rem 0 .2rem; }
  .rls .note { float: none; width: auto; margin: .3rem 0 0; display: block; }`;

  const domainOf = p => p.split("@")[1];
  const isServiceAccount = p => p.endsWith(".gserviceaccount.com");
  const principalOf = p => (isServiceAccount(p) ? "serviceAccount:" : "user:") + p;

  function granted(policy, person) {
    const ids = [principalOf(person.runsAs), ...(person.groups || [])];
    return policy.grantees.some(g => ids.includes(g) || g === "allAuthenticatedUsers"
      || (g.startsWith("domain:") && !isServiceAccount(person.runsAs) && g.slice(7) === domainOf(person.runsAs)));
  }

  // The copies of one row a person gets: one label per copy, [] if hidden.
  function copiesOf(row, mine, me) {
    const hits = mine.map(p => [p, p.filter(row, me)]).filter(([, v]) => v === true || (Array.isArray(v) && v.length));
    if (hits.some(([, v]) => Array.isArray(v))) return hits.flatMap(([, v]) => v);
    return hits.length ? [hits.map(([p]) => p.name).join(" + ")] : [];
  }

  function evaluate(scenario, person, rows) {
    if (!person.tableAccess) return { error: true, rows: rows.map(() => []) };
    if (!scenario.policies.length) return { rows: rows.map(() => ["no policies on table"]) };
    const mine = scenario.policies.filter(p => granted(p, person));
    return { mine, rows: rows.map(r => copiesOf(r, mine, person.runsAs)) };
  }

  function whoHtml(cfg, scenario, person, mine) {
    const grant = cfg.grantLabel || (p => `GRANT TO (${p.grantees.join(", ")}) FILTER USING (${p.sql})`);
    const pols = scenario.policies.map(p => { const on = mine.includes(p);
      return `<div class="pol ${on ? "on" : "off"}">${on ? "✓ granted" : "✗ not granted"} · ${p.name}: ${grant(p)}</div>`; }).join("")
      || "<div class='pol off'>(no row access policies on this table)</div>";
    const groups = (person.groups || []).length ? `<br>member of: ${person.groups.join(", ")}` : "";
    return `<div class="who">SESSION_USER() = <b>${person.runsAs}</b>${groups}<br><br>${pols}</div>`;
  }

  function verdictHtml(cfg, res) {
    const total = res.rows.reduce((n, c) => n + c.length, 0), distinct = res.rows.filter(c => c.length).length;
    const dups = total > distinct ? `, <span style="color:var(--bad)">${total - distinct} of them duplicates</span>` : "";
    return res.error ? `<span style="color:var(--bad)">Access Denied: no permission to read it at all.</span>`
      : total ? `<span style="color:var(--good)">${total} rows returned</span>${dups} (${distinct} of ${cfg.rows.length} source rows).`
      : `<span style="color:var(--warn)">0 rows returned, and no error.</span>`;
  }

  function rowsHtml(cfg, res) {
    const cells = r => cfg.columns.map(c => `<td>${r[c]}</td>`).join("");
    return cfg.rows.map((r, i) => res.rows[i].length
      ? res.rows[i].map(label => `<tr class="shown">${cells(r)}<td>${label}</td></tr>`).join("")
      : `<tr class="hidden">${cells(r)}<td>—</td></tr>`).join("");
  }

  function render(root, cfg) {
    const scenario = cfg.scenarios[root.querySelector(".sc").value], person = cfg.people[root.querySelector(".pp").value];
    const res = evaluate(scenario, person, cfg.rows);
    const notes = [scenario.note, person.note].filter(Boolean).map(n => `<span class="note">${n}</span>`).join("");
    root.querySelector(".out").innerHTML = whoHtml(cfg, scenario, person, res.mine || [])
      + `<div class="verdict">${verdictHtml(cfg, res)}</div><div class="wrap"><table><tr>${cfg.columns.map(c => `<th>${c}</th>`).join("")}<th>${cfg.reasonLabel || "let through by"}</th></tr>${rowsHtml(cfg, res)}</table></div>`
      + notes;
  }

  function mount(root, cfg) {
    if (!document.getElementById("rls-css")) document.head.insertAdjacentHTML("beforeend", `<style id="rls-css">${CSS}</style>`);
    root.classList.add("rls", "widget");
    const opts = list => list.map((x, i) => `<option value="${i}">${x.label}</option>`).join("");
    root.innerHTML = `<div class="controls">
        <label>${cfg.scopeLabel || `Policies on <code>${cfg.table}</code>`}: <select class="sc">${opts(cfg.scenarios)}</select></label>
        <label>Who queries: <select class="pp">${opts(cfg.people)}</select></label></div><div class="out" aria-live="polite"></div>`;
    root.addEventListener("change", () => render(root, cfg));
    render(root, cfg);
  }

  return { mount };
})();
