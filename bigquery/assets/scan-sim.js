// Scan simulator: pick columns and a WHERE clause, see what a dry run would estimate.
//
// Usage:
//   <div id="scan"></div>
//   <script src="../assets/scan-sim.js"></script>
//   <script>ScanSim.mount(document.getElementById("scan"), {
//     table: "acme-dw.sales.orders",
//     pricePerTiB: 6.25,
//     columns: [{ name: "order_id", gb: 120 }, …],          // logical size of each whole column
//     filters: [{ sql: "-- no WHERE", fraction: 1, note: "HTML shown when picked" }, …]
//   })</script>
// fraction = share of the table the estimate counts (1 = every partition).
// Estimate = sum of picked columns × fraction. Like a real dry run, it ignores clustering.

const ScanSim = (function () {
  const CSS = `
  .ss .cols { display: flex; flex-wrap: wrap; gap: .3rem .9rem; font-family: var(--mono); font-size: .8rem; margin: .4rem 0 .8rem; }
  .ss .cols label { cursor: pointer; white-space: nowrap; }
  .ss .cols small { color: var(--muted); }
  .ss select { font: inherit; font-family: var(--mono); font-size: .8rem; width: 100%; padding: .3rem;
    background: var(--panel); color: var(--fg); border: 1px solid var(--rule); border-radius: 4px; }
  .ss pre { margin: .8rem 0; white-space: pre-wrap; }
  .ss .out { display: flex; gap: 1.5rem; align-items: baseline; flex-wrap: wrap; }
  .ss .big { font-family: var(--mono); font-size: 1.3rem; color: var(--accent); }
  .ss .bar { height: .5rem; background: var(--panel); border-radius: 3px; margin: .5rem 0; overflow: hidden; }
  .ss .bar div { height: 100%; background: var(--accent); transition: width .3s; }
  .ss .note { float: none; width: auto; margin: .5rem 0 0; display: block; }`;

  function size(gb) { return gb >= 1024 ? `${(gb / 1024).toFixed(2)} TB` : `${gb.toFixed(gb < 10 ? 2 : 0)} GB`; }

  function mount(root, { table, pricePerTiB, columns, filters }) {
    if (!document.getElementById("ss-css")) document.head.insertAdjacentHTML("beforeend", `<style id="ss-css">${CSS}</style>`);
    const total = columns.reduce((s, c) => s + c.gb, 0);
    root.classList.add("ss", "widget");
    root.innerHTML = `<div><b>Columns in your SELECT</b></div>
      <div class="cols">${columns.map((c, i) => `<label><input type="checkbox" data-i="${i}" checked> ${c.name} <small>${size(c.gb)}</small></label>`).join("")}</div>
      <div><b>WHERE clause</b></div>
      <select>${filters.map((f, i) => `<option value="${i}">${f.sql}</option>`).join("")}</select>
      <pre></pre>
      <div class="out"><span>Dry run says: <span class="big"></span></span><span class="cost"></span></div>
      <div class="bar"><div></div></div>
      <span class="note"></span>`;

    function render() {
      const picked = [...root.querySelectorAll("input:checked")].map(x => columns[x.dataset.i]);
      const f = filters[root.querySelector("select").value];
      const gb = picked.reduce((s, c) => s + c.gb, 0) * f.fraction;
      const allCols = picked.length === columns.length;
      root.querySelector("pre").textContent =
        `SELECT ${allCols ? "*" : picked.map(c => c.name).join(", ") || "…"}\nFROM \`${table}\`\n${f.sql}`;
      root.querySelector(".big").textContent = size(gb);
      // ponytail: ignores the 10 MB-per-table minimum and the monthly free tier
      root.querySelector(".cost").textContent = `≈ $${(gb / 1024 * pricePerTiB).toFixed(2)} per run on demand`;
      root.querySelector(".bar div").style.width = `${(gb / total) * 100}%`;
      root.querySelector(".note").innerHTML = f.note;
    }
    root.addEventListener("input", render);
    render();
  }

  return { mount };
})();
