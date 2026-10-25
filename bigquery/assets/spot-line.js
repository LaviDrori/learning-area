// Spot the line: read a symptom, click the file line that causes it.
//
// Usage:
//   <div id="spot"></div>
//   <script src="../assets/spot-line.js"></script>
//   <script>SpotLine.mount(document.getElementById("spot"), fileText, {
//     tasks: [{ q: "Symptom (HTML)", answer: 7, fix: "Shown when found (HTML)" }, …],
//     notes: { 1: "What line 1 means (HTML)", … }   // every clickable line needs a note
//   })</script>
// Line numbers are 1-based. A click shows that line's note, so every guess teaches something.
// Only a first-click hit scores. After the last task, lines stay clickable for review.

const SpotLine = (function () {
  const CSS = `
  .sl { display: grid; gap: .8rem; }
  @media (min-width: 46rem) { .sl { grid-template-columns: 1.2fr 1fr; } }
  .sl .task { grid-column: 1 / -1; border-left: 3px solid var(--warn); padding: .2rem 0 .2rem .9rem; }
  .sl .task .n { font-family: var(--mono); font-size: .75rem; color: var(--muted); }
  .sl pre { margin: 0; padding: .6rem 0; line-height: 1.5; }
  .sl .ln { display: block; padding: 0 .8rem 0 2.2rem; position: relative; white-space: pre; cursor: pointer; }
  .sl .ln::before { content: attr(data-n); position: absolute; left: .6rem; color: var(--muted); font-size: .75em; top: .2em; }
  .sl .ln:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); }
  .sl .ln.wrong { background: color-mix(in srgb, var(--bad) 14%, transparent); }
  .sl .ln.right { background: color-mix(in srgb, var(--good) 18%, transparent); }
  .sl .panel { font-size: .9rem; background: var(--panel); border-radius: 4px; padding: .8rem 1rem; align-self: start; }
  .sl .panel .verdict { font-weight: 600; margin-bottom: .3rem; }
  .sl .panel .fix { border-top: 1px solid var(--rule); margin-top: .6rem; padding-top: .6rem; }
  .sl .hint { color: var(--muted); font-style: italic; }
  .sl .nav { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; }
  .sl .count { font-family: var(--mono); font-size: .75rem; color: var(--muted); }`;

  function escape(s) { return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

  function mount(root, text, { tasks, notes }) {
    if (!document.getElementById("sl-css")) document.head.insertAdjacentHTML("beforeend", `<style id="sl-css">${CSS}</style>`);
    const lines = text.replace(/^\n|\n$/g, "").split("\n");
    let at = 0, missed = false, firstTry = 0, solved = false;
    root.classList.add("sl", "widget");
    root.innerHTML = `<div class="task" aria-live="polite"></div>
      <pre>${lines.map((l, i) => `<span class="ln" data-n="${i + 1}" tabindex="0">${escape(l) || " "}</span>`).join("")}</pre>
      <div class="panel" aria-live="polite"><span class="hint">Read the symptom, then click the line that causes it.</span></div>
      <div class="nav"><span class="count"></span><button>next symptom →</button></div>`;
    const next = root.querySelector(".nav button");

    function renderTask() {
      const done = at >= tasks.length;
      root.querySelector(".task").innerHTML = done
        ? `<span class="n">all ${tasks.length} found</span><div>Click any line to review what it does.</div>`
        : `<span class="n">symptom ${at + 1} of ${tasks.length}</span><div>${tasks[at].q}</div>`;
      root.querySelector(".count").textContent = `${firstTry} found on the first click`;
      root.querySelectorAll(".ln").forEach(x => x.classList.remove("right", "wrong"));
      next.disabled = true;
      next.hidden = done;
      missed = solved = false;
    }

    function pick(el) {
      const n = Number(el.dataset.n), task = tasks[at];
      const note = notes[n] || "<span class='hint'>No note for this line.</span>";
      if (!task || solved) { root.querySelector(".panel").innerHTML = note; return; }
      const hit = n === task.answer;
      el.classList.add(hit ? "right" : "wrong");
      root.querySelector(".panel").innerHTML = `<div class="verdict" style="color:var(--${hit ? "good" : "bad"})">${hit ? "Found it." : "Not this one. Here's what it does:"}</div>${note}${hit && task.fix ? `<div class="fix"><b>Fix:</b> ${task.fix}</div>` : ""}`;
      if (!hit) { missed = true; return; }
      if (!missed) firstTry++;
      solved = true;
      next.disabled = false;
      root.querySelector(".count").textContent = `${firstTry} found on the first click`;
    }

    root.addEventListener("click", e => {
      const el = e.target.closest(".ln");
      if (el) return pick(el);
      if (e.target === next) { at++; renderTask(); }
    });
    root.addEventListener("keydown", e => {
      const el = e.target.closest(".ln");
      if (el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); pick(el); }
    });
    renderTask();
  }

  return { mount };
})();
