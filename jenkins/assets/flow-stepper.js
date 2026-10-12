// Flow stepper: walk an end-to-end process one hop at a time.
//
// Usage:
//   <div id="flow"></div>
//   <script src="../assets/flow-stepper.js"></script>
//   <script>FlowStepper.mount(document.getElementById("flow"), [
//     { title: "git push", who: "You", what: "HTML…", artifact: "commit abc123", ask: "optional customer question" },
//     …
//   ], "DevOps might say")</script>   (3rd arg: optional label for the "ask" line)
// Stages are revealed one at a time with Next, so the learner can predict the next hop first.

const FlowStepper = (function () {
  const CSS = `
  .fs .chips { display: flex; flex-wrap: wrap; gap: .3rem; margin-bottom: .8rem; }
  .fs .chip { font-family: var(--mono); font-size: .7rem; padding: .15rem .45rem; border: 1px solid var(--rule); border-radius: 999px; color: var(--muted); cursor: pointer; background: none; }
  .fs .chip.seen { color: var(--fg); }
  .fs .chip.on { border-color: var(--accent); color: var(--accent); }
  .fs .stage { border-left: 3px solid var(--accent); padding: .2rem 0 .2rem .9rem; min-height: 9rem; }
  .fs .who { font-family: var(--mono); font-size: .75rem; color: var(--muted); }
  .fs h4 { margin: .1rem 0 .4rem; font-size: 1.05rem; }
  .fs .artifact { font-family: var(--mono); font-size: .78rem; background: var(--panel); border-radius: 4px; padding: .3rem .6rem; display: inline-block; margin: .3rem 0; word-break: break-all; }
  .fs .ask { font-size: .85rem; color: var(--good); margin-top: .5rem; }
  .fs .nav { display: flex; justify-content: space-between; align-items: center; margin-top: .8rem; }
  .fs .count { font-family: var(--mono); font-size: .75rem; color: var(--muted); }
  @media print { .fs .stage { display: none; } }`;

  function mount(root, stages, askLabel = "Customer might ask") {
    if (!document.getElementById("fs-css")) document.head.insertAdjacentHTML("beforeend", `<style id="fs-css">${CSS}</style>`);
    let at = 0, furthest = 0;
    root.classList.add("fs", "widget");
    root.innerHTML = `<div class="chips"></div><div class="stage" aria-live="polite"></div>
      <div class="nav"><button data-go="-1">← back</button><span class="count"></span><button data-go="1">next hop →</button></div>`;

    function render() {
      const s = stages[at];
      root.querySelector(".chips").innerHTML = stages.map((x, i) => i <= furthest
        ? `<button class="chip seen ${i === at ? "on" : ""}" data-i="${i}">${i + 1}. ${x.title}</button>`
        : `<span class="chip">${i + 1}. ?</span>`).join("");
      root.querySelector(".stage").innerHTML = `<div class="who">${s.who}</div><h4>${at + 1}. ${s.title}</h4>
        <div>${s.what}</div>${s.artifact ? `<div class="artifact">${s.artifact}</div>` : ""}
        ${s.ask ? `<div class="ask">💬 ${askLabel}: <em>${s.ask}</em></div>` : ""}`;
      root.querySelector(".count").textContent = at < stages.length - 1 ? "predict the next hop, then click" : "end of the line";
      root.querySelector('[data-go="-1"]').disabled = at === 0;
      root.querySelector('[data-go="1"]').disabled = at === stages.length - 1;
    }
    root.addEventListener("click", e => {
      const go = e.target.dataset.go, i = e.target.dataset.i;
      if (go) at = Math.max(0, Math.min(stages.length - 1, at + Number(go)));
      else if (i !== undefined) at = Number(i);
      else return;
      furthest = Math.max(furthest, at);
      render();
    });
    render();
  }

  return { mount };
})();
