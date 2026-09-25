// app.js — wires the DOM to the EXPERIENCES dataset from data.js.
// Sections: (1) favourites, (2) filter+search+render, (3) budget planner,
// (4) animated stats, (5) dark mode. Each is a small, independent function.

const favourites = new Set(JSON.parse(localStorage.getItem("mzansi-favs") || "[]"));

function saveFavourites() {
  localStorage.setItem("mzansi-favs", JSON.stringify([...favourites]));
  document.getElementById("stat-saved").dataset.target = favourites.size;
}

function toggleFavourite(id, btn) {
  favourites.has(id) ? favourites.delete(id) : favourites.add(id);
  btn.classList.toggle("active");
  btn.textContent = favourites.has(id) ? "♥" : "♡";
  saveFavourites();
}

// ---- Explore: filter, search, render ----
let activeCategory = "all";

function buildFilterBar() {
  const bar = document.getElementById("filter-bar");
  bar.innerHTML = CATEGORIES.map(c =>
    `<button class="filter-chip${c === "all" ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  bar.addEventListener("click", e => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    activeCategory = chip.dataset.cat;
    [...bar.children].forEach(b => b.classList.toggle("active", b === chip));
    renderCards();
  });
}

function matchesQuery(exp, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return q.split(/\s+/).every(word =>
    exp.title.toLowerCase().includes(word) ||
    exp.city.toLowerCase().includes(word) ||
    exp.category.toLowerCase().includes(word)
  );
}

function renderCards() {
  const query = document.getElementById("search-input").value;
  const results = EXPERIENCES.filter(exp =>
    (activeCategory === "all" || exp.category === activeCategory) && matchesQuery(exp, query)
  );

  document.getElementById("result-count").textContent =
    `${results.length} experience${results.length === 1 ? "" : "s"} found`;

  document.getElementById("card-grid").innerHTML = results.map(exp => `
    <article class="card">
      <img src="${exp.img}" alt="${exp.title}" loading="lazy">
      <div class="card-body">
        <div class="card-top">
          <div>
            <div class="card-title">${exp.title}</div>
            <div class="card-city">${exp.city} · ★ ${exp.rating}</div>
          </div>
          <button class="fav-btn${favourites.has(exp.id) ? " active" : ""}" data-id="${exp.id}">
            ${favourites.has(exp.id) ? "♥" : "♡"}
          </button>
        </div>
        <p class="card-blurb">${exp.blurb}</p>
        <div class="card-foot"><span class="card-price">R${exp.price}</span></div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".fav-btn").forEach(btn =>
    btn.addEventListener("click", () => toggleFavourite(Number(btn.dataset.id), btn))
  );
}

// ---- Budget planner ----
function updateBudget() {
  const total = Number(document.getElementById("budget-total").value) || 0;
  const spent = [...document.querySelectorAll(".budget-line")]
    .reduce((sum, input) => sum + (Number(input.value) || 0), 0);
  const remaining = total - spent;
  const pct = total > 0 ? Math.min((spent / total) * 100, 100) : 0;

  document.getElementById("budget-spent").textContent = spent.toLocaleString();
  document.getElementById("budget-remaining").textContent = remaining.toLocaleString();
  document.getElementById("budget-fill").style.width = pct + "%";
  document.getElementById("budget-fill").style.background = remaining < 0 ? "#C0392B" : "";
  document.getElementById("budget-remaining-wrap").classList.toggle("over", remaining < 0);
}

// ---- Animated stats ----
function animateStats() {
  document.querySelectorAll(".stat-num").forEach(el => {
    const target = Number(el.dataset.target);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * progress).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ---- Dark mode ----
function initTheme() {
  const saved = localStorage.getItem("mzansi-theme");
  const toggle = document.getElementById("theme-toggle");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggle.textContent = "☀️";
  }
  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.toggleAttribute("data-theme", !isDark);
    if (!isDark) document.documentElement.setAttribute("data-theme", "dark");
    toggle.textContent = isDark ? "🌙" : "☀️";
    localStorage.setItem("mzansi-theme", isDark ? "light" : "dark");
  });
}

// ---- Init ----
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stat-saved").dataset.target = favourites.size;
  buildFilterBar();
  renderCards();
  document.getElementById("search-input").addEventListener("input", renderCards);
  document.querySelectorAll(".budget-line, #budget-total").forEach(el =>
    el.addEventListener("input", updateBudget)
  );
  updateBudget();
  animateStats();
  initTheme();
});