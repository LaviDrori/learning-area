// Reusable retrieval-practice widgets. Include with <script src="../assets/quiz.js" defer></script>.
//
// Multiple choice:
//   <div class="quiz" data-answer="2">            (0-based index of the correct option)
//     <p class="q">Question?</p>
//     <button>Option A</button> <button>Option B</button> <button>Option C</button>
//     <p class="why">Shown after answering.</p>
//   </div>
//
// Free recall (write first, then compare):
//   <div class="recall">
//     <p class="q">Prompt</p>
//     <div class="model">Model answer, revealed on demand.</div>
//   </div>

(function () {
  const css = `
  .quiz, .recall { margin: 1.4rem 0; }
  .quiz .q, .recall .q { font-weight: 600; margin-bottom: .5rem; }
  .quiz button { display: block; width: 100%; text-align: left; margin: .3rem 0; font-family: var(--mono); }
  .quiz button.right { border-color: var(--good); color: var(--good); }
  .quiz button.wrong { border-color: var(--bad); color: var(--bad); text-decoration: line-through; }
  .quiz .why, .recall .model { display: none; font-size: .88rem; margin-top: .5rem; }
  .quiz.done .why, .recall.shown .model { display: block; }
  .recall textarea { width: 100%; min-height: 5rem; font: inherit; font-size: .9rem; padding: .5rem;
    background: var(--panel); color: var(--fg); border: 1px solid var(--rule); border-radius: 4px; }
  .recall .model { border-left: 3px solid var(--good); padding-left: .8rem; }
  .score { font-family: var(--mono); font-size: .85rem; color: var(--muted); }
  @media print { .quiz .why, .recall .model { display: block; } .quiz button { display: none; } }`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  function setupQuiz(quiz) {
    const answer = Number(quiz.dataset.answer);
    const buttons = [...quiz.querySelectorAll("button")];
    let missed = false;   // they can keep trying, but only a first-try hit scores
    buttons.forEach((btn, i) => btn.addEventListener("click", () => {
      if (quiz.classList.contains("done")) return;
      btn.classList.add(i === answer ? "right" : "wrong");
      if (i !== answer) { missed = true; return; }
      quiz.classList.add("done");
      if (!missed) quiz.dataset.firstTry = "1";
      updateScore();
    }));
  }

  function setupRecall(recall) {
    const box = document.createElement("textarea");
    box.placeholder = "Write your answer from memory first…";
    const reveal = document.createElement("button");
    reveal.textContent = "Compare with model answer";
    reveal.addEventListener("click", () => recall.classList.add("shown"));
    recall.querySelector(".model").before(box, reveal);
  }

  function updateScore() {
    const all = document.querySelectorAll(".quiz").length;
    const done = document.querySelectorAll(".quiz.done").length;
    const first = document.querySelectorAll(".quiz[data-first-try]").length;
    document.querySelectorAll(".score").forEach(el => (el.textContent = `${done}/${all} answered · ${first} right on the first try`));
  }

  document.querySelectorAll(".quiz").forEach(setupQuiz);
  document.querySelectorAll(".recall").forEach(setupRecall);
  updateScore();
})();
