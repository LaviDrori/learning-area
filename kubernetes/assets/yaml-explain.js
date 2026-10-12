// Annotated YAML viewer: click a marked line to read what it means.
//
// Usage:
//   <div id="yx"></div>
//   <script src="../assets/yaml-explain.js"></script>
//   <script>YamlExplain.mount(document.getElementById("yx"), yamlText, {
//     1: "Explanation for line 1 (HTML allowed)", 7: "…"
//   })</script>
// Line numbers are 1-based. Annotated lines get a marker and are focusable (Enter/Space to open).

const YamlExplain = (function () {
  const CSS = `
  .yx { display: grid; gap: .8rem; }
  @media (min-width: 46rem) { .yx { grid-template-columns: 1.2fr 1fr; } }
  .yx pre { margin: 0; padding: .6rem 0; line-height: 1.5; }
  .yx .ln { display: block; padding: 0 .8rem 0 2.2rem; position: relative; white-space: pre; }
  .yx .ln[data-n]::before { content: "●"; position: absolute; left: .8rem; color: var(--accent); font-size: .7em; top: .25em; }
  .yx .ln[data-n] { cursor: pointer; }
  .yx .ln[data-n]:hover, .yx .ln.on { background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .yx .panel { font-size: .9rem; background: var(--panel); border-radius: 4px; padding: .8rem 1rem; align-self: start; }
  .yx .panel .hint { color: var(--muted); font-style: italic; }
  .yx .progress { font-family: var(--mono); font-size: .75rem; color: var(--muted); margin-top: .6rem; }
  @media print { .yx .panel { display: none; } }`;

  function escape(s) { return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

  function mount(root, yaml, notes) {
    if (!document.getElementById("yx-css")) document.head.insertAdjacentHTML("beforeend", `<style id="yx-css">${CSS}</style>`);
    const lines = yaml.replace(/^\n|\n$/g, "").split("\n");
    const total = Object.keys(notes).length, seen = new Set();
    root.classList.add("yx", "widget");
    root.innerHTML = `<pre>${lines.map((l, i) => notes[i + 1]
        ? `<span class="ln" data-n="${i + 1}" tabindex="0">${escape(l) || " "}</span>`
        : `<span class="ln">${escape(l) || " "}</span>`).join("")}</pre>
      <div class="panel" aria-live="polite"><span class="hint">Click a line marked ● to see what it means.</span></div>`;

    function show(el) {
      root.querySelectorAll(".ln.on").forEach(x => x.classList.remove("on"));
      el.classList.add("on"); seen.add(el.dataset.n);
      root.querySelector(".panel").innerHTML = `<div>${notes[el.dataset.n]}</div><div class="progress">${seen.size}/${total} lines explored</div>`;
    }
    root.addEventListener("click", e => { const el = e.target.closest(".ln[data-n]"); if (el) show(el); });
    root.addEventListener("keydown", e => {
      const el = e.target.closest(".ln[data-n]");
      if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); show(el); }
    });
  }

  return { mount };
})();
