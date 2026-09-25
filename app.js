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
  renderItinerary();
  renderBadges();
}

// ---- Explore: filter, search, render ----
let activeCategory = "all";
let cityFilter = null;

function buildFilterBar() {
  const bar = document.getElementById("filter-bar");
  bar.innerHTML = CATEGORIES.map(c =>
    `<button class="filter-chip cat-${c}${c === "all" ? " active" : ""}" data-cat="${c}">${c}</button>`
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
    (activeCategory === "all" || exp.category === activeCategory) &&
    (!cityFilter || exp.city === cityFilter) &&
    matchesQuery(exp, query)
  );

  document.getElementById("result-count").textContent =
    `${results.length} experience${results.length === 1 ? "" : "s"} found` +
    (cityFilter ? ` in ${cityFilter}` : "");

  document.getElementById("card-grid").innerHTML = results.map(exp => `
    <article class="card cat-${exp.category}">
      <img src="${exp.img}" alt="${exp.title}" loading="lazy">
      <div class="card-body">
        <div class="card-top">
          <div>
            <div class="card-title">${exp.title}</div>
            <div class="card-city">${exp.city} · ★ ${exp.rating}</div>
          </div>
          <button class="fav-btn${favourites.has(String(exp.id)) ? " active" : ""}" data-id="${exp.id}">
            ${favourites.has(String(exp.id)) ? "♥" : "♡"}
          </button>
        </div>
        <p class="card-blurb">${exp.blurb}</p>
        <div class="card-foot"><span class="card-price">R${exp.price}</span></div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("#card-grid .fav-btn").forEach(btn =>
    btn.addEventListener("click", () => toggleFavourite(String(btn.dataset.id), btn))
  );
}

// ---- Map: click a city to filter Explore ----
function initMap() {
  const legend = document.getElementById("map-legend");
  const cities = [...new Set(document.querySelectorAll(".map-dot"))].map(d => d.dataset.city);
  legend.innerHTML = cities.map(c => `<button data-city="${c}">${c}</button>`).join("") +
    `<button data-city="">Clear</button>`;

  function goToCity(city) {
    cityFilter = city || null;
    renderCards();
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
  }
  document.querySelectorAll(".map-dot").forEach(dot =>
    dot.addEventListener("click", () => goToCity(dot.dataset.city))
  );
  legend.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (btn) goToCity(btn.dataset.city);
  });
}

// ---- Events ----
function renderEvents() {
  document.getElementById("events-grid").innerHTML = EVENTS.map(ev => `
    <article class="card cat-${ev.category}">
      <img src="${ev.img}" alt="${ev.title}" loading="lazy">
      <div class="card-body">
        <div class="card-top">
          <div>
            <div class="card-title">${ev.title}</div>
            <div class="card-city">${ev.city} · ★ ${ev.rating}</div>
          </div>
          <button class="fav-btn${favourites.has(ev.id) ? " active" : ""}" data-id="${ev.id}">
            ${favourites.has(ev.id) ? "♥" : "♡"}
          </button>
        </div>
        <p class="card-blurb">${ev.blurb}</p>
        <div class="card-foot"><span class="card-price">${ev.price ? "R" + ev.price : "Free"}</span></div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("#events-grid .fav-btn").forEach(btn =>
    btn.addEventListener("click", () => toggleFavourite(btn.dataset.id, btn))
  );
}

// ---- Itinerary: drag favourites into a reorderable day plan ----
let itinerary = JSON.parse(localStorage.getItem("mzansi-itinerary") || "[]");

function findById(id) {
  return EXPERIENCES.find(x => String(x.id) === String(id)) || EVENTS.find(x => x.id === id);
}

function saveItinerary() {
  localStorage.setItem("mzansi-itinerary", JSON.stringify(itinerary));
}

function makeDraggable(el, id) {
  el.draggable = true;
  el.addEventListener("dragstart", () => el.classList.add("dragging"));
  el.addEventListener("dragend", () => el.classList.remove("dragging"));
  el.dataset.id = id;
}

function renderItinerary() {
  itinerary = itinerary.filter(id => favourites.has(id));
  const pool = document.getElementById("itinerary-pool");
  const list = document.getElementById("itinerary-list");
  const poolIds = [...favourites].filter(id => !itinerary.includes(id));

  pool.innerHTML = poolIds.length
    ? poolIds.map(id => `<div class="itin-item cat-${(findById(id) || {}).category || ""}"><span>${(findById(id) || {}).title || id}</span><span aria-hidden="true">+</span></div>`).join("")
    : `<p class="itin-empty">Save an experience or event to see it here.</p>`;

  list.innerHTML = itinerary.length
    ? itinerary.map(id => `<div class="itin-item cat-${(findById(id) || {}).category || ""}"><span>${(findById(id) || {}).title || id}</span><span aria-hidden="true">✕</span></div>`).join("")
    : `<p class="itin-empty">Drag favourites here to plan your day.</p>`;

  pool.querySelectorAll(".itin-item").forEach((el, i) => {
    makeDraggable(el, poolIds[i]);
    el.addEventListener("click", () => { itinerary.push(poolIds[i]); renderItinerary(); renderBadges(); });
  });
  list.querySelectorAll(".itin-item").forEach((el, i) => {
    makeDraggable(el, itinerary[i]);
    el.addEventListener("click", () => { itinerary.splice(i, 1); renderItinerary(); renderBadges(); });
  });
  saveItinerary();
}

function initItinerary() {
  [document.getElementById("itinerary-pool"), document.getElementById("itinerary-list")].forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", e => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      if (!dragging) return;
      const id = dragging.dataset.id;
      itinerary = itinerary.filter(x => x !== id);
      if (zone.id === "itinerary-list") itinerary.push(id);
      renderItinerary();
      renderBadges();
    });
  });
}

// ---- Gamification ----
function renderBadges() {
  const xp = favourites.size * 20 + itinerary.length * 15;
  const level = Math.floor(xp / 100) + 1;
  const into = xp % 100;
  document.getElementById("level-label").textContent = `Level ${level} Explorer`;
  document.getElementById("level-xp").textContent = `${into} / 100 XP`;
  document.getElementById("level-fill").style.width = into + "%";

  document.getElementById("badge-grid").innerHTML = BADGES.map(b => {
    const unlocked = b.check(favourites.size, itinerary.length);
    return `<div class="badge${unlocked ? " unlocked" : ""}">${b.emoji} ${b.name}</div>`;
  }).join("");
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
  initMap();
  renderEvents();
  initItinerary();
  renderItinerary();
  renderBadges();
});