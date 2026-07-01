/* =====================================================================
   Undefeated — Badminton Squad Draft
   game.js  ·  Flow: choose format -> spin nation -> draft 5 units ->
                simulate a World Tour season -> chase an unbeaten record.
   ===================================================================== */

// Wrapped in an IIFE so these top-level declarations don't collide with the
// globals defined in data.js (classic scripts share one global lexical scope).
(function () {

const { DISCIPLINES, FORMATS, NATIONS, UNITS } = window.BADMINTON_DATA;

const SEASON_TIES = 26; // ties in a simulated World Tour season

const state = {
  format: null,     // FORMATS entry
  slots: [],        // [{ disc, unit }]
  draftedIds: new Set(),
  spunNation: null, // NATIONS code
};

/* ---------- tiny helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const unitName = (u) => u.players.join(" / ");

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("#" + id).classList.add("active");
}

/* =====================================================================
   STEP 1 — Format selection
   ===================================================================== */
function renderFormats() {
  const grid = $("#formatGrid");
  grid.innerHTML = "";
  Object.values(FORMATS).forEach((fmt) => {
    const card = el("div", "format-card");
    const chips = fmt.slots
      .map((d) => `<span class="chip">${d}</span>`)
      .join("");
    card.innerHTML = `
      <h3>${fmt.name}</h3>
      <div class="blurb">${fmt.blurb}</div>
      <div class="chips">${chips}</div>`;
    card.addEventListener("click", () => selectFormat(fmt));
    grid.appendChild(card);
  });
}

function selectFormat(fmt) {
  state.format = fmt;
  state.slots = fmt.slots.map((disc) => ({ disc, unit: null }));
  state.draftedIds = new Set();
  state.spunNation = null;
  renderSlots();
  updateMeta();
  resetSpin();
  $("#simulateBtn").disabled = true;
  showScreen("screen-draft");
}

/* =====================================================================
   STEP 2 — Court + draft
   ===================================================================== */
function renderSlots() {
  const wrap = $("#slots");
  wrap.innerHTML = "";
  state.slots.forEach((slot, i) => {
    const node = el("div", "slot");
    node.dataset.index = i;
    if (slot.unit) {
      node.classList.add("filled");
      const u = slot.unit;
      const n = NATIONS[u.nation];
      node.innerHTML = `
        <div class="disc-badge">${slot.disc}</div>
        <div class="slot-body">
          <div class="slot-name">${unitName(u)}</div>
          <div class="slot-sub">${n.flag} ${n.name} · ${u.era}</div>
        </div>
        <div class="slot-ovr">${u.ovr}</div>`;
    } else {
      node.innerHTML = `
        <div class="disc-badge">${slot.disc}</div>
        <div class="slot-body">
          <span class="empty-txt">${DISCIPLINES[slot.disc].label} — empty</span>
        </div>
        <div class="slot-ovr">–</div>`;
    }
    wrap.appendChild(node);
  });
}

function openDisciplines() {
  const open = new Set();
  state.slots.forEach((s) => { if (!s.unit) open.add(s.disc); });
  return open;
}

function availableUnitsForNation(code) {
  const open = openDisciplines();
  return UNITS.filter(
    (u) => u.nation === code && open.has(u.disc) && !state.draftedIds.has(u.id)
  );
}

function nationsWithPicks() {
  const codes = new Set(UNITS.map((u) => u.nation));
  return [...codes].filter((c) => availableUnitsForNation(c).length > 0);
}

function updateMeta() {
  const filled = state.slots.filter((s) => s.unit);
  $("#draftProgress").textContent = `${filled.length} / ${state.slots.length} drafted`;
  if (filled.length) {
    const avg = Math.round(
      filled.reduce((a, s) => a + s.unit.ovr, 0) / filled.length
    );
    $("#teamOvr").textContent = avg;
  } else {
    $("#teamOvr").textContent = "--";
  }
}

function resetSpin() {
  state.spunNation = null;
  $("#spinFlag").textContent = "🎰";
  $("#spinNation").textContent = "Spin for a nation";
  $("#spinEra").textContent = "& era";
  $("#pickList").innerHTML =
    `<p class="pick-hint">Spin the wheel to draw a nation, then draft one
      unit for an open discipline.</p>`;
}

function spin() {
  const candidates = nationsWithPicks();
  if (candidates.length === 0) return;

  const flag = $("#spinFlag");
  flag.classList.add("spinning");
  $("#spinBtn").disabled = true;

  let ticks = 0;
  const timer = setInterval(() => {
    const c = rand(candidates);
    flag.textContent = NATIONS[c].flag;
    $("#spinNation").textContent = NATIONS[c].name;
    $("#spinEra").textContent = "…";
    ticks++;
    if (ticks > 12) {
      clearInterval(timer);
      flag.classList.remove("spinning");
      $("#spinBtn").disabled = false;
      landOn(rand(candidates));
    }
  }, 70);
}

function landOn(code) {
  state.spunNation = code;
  const n = NATIONS[code];
  $("#spinFlag").textContent = n.flag;
  $("#spinNation").textContent = n.name;
  const picks = availableUnitsForNation(code);
  const eras = picks.map((p) => p.era);
  $("#spinEra").textContent =
    `${Math.min(...eras)}–${Math.max(...eras)} · ${picks.length} available`;
  renderPicks(picks);
}

function renderPicks(picks) {
  const list = $("#pickList");
  list.innerHTML = "";
  picks
    .sort((a, b) => b.ovr - a.ovr)
    .forEach((u) => {
      const item = el("div", "pick-item");
      item.innerHTML = `
        <div class="pi-disc">${u.disc}</div>
        <div class="pi-body">
          <div class="pi-name">${unitName(u)}</div>
          <div class="pi-sub">${DISCIPLINES[u.disc].label} · ${u.era}</div>
        </div>
        <div class="pi-ovr">${u.ovr}</div>`;
      item.addEventListener("click", () => draft(u));
      list.appendChild(item);
    });
}

function draft(unit) {
  // Fill the first open slot matching this discipline.
  const slot = state.slots.find((s) => !s.unit && s.disc === unit.disc);
  if (!slot) return;
  slot.unit = unit;
  state.draftedIds.add(unit.id);

  renderSlots();
  updateMeta();
  resetSpin();

  const done = state.slots.every((s) => s.unit);
  $("#simulateBtn").disabled = !done;
  if (done) {
    $("#pickList").innerHTML =
      `<p class="pick-hint">✅ Squad complete — simulate the season!</p>`;
  }
}

/* =====================================================================
   STEP 3 — Season simulation
   ===================================================================== */

// Logistic win probability for a single match.
function matchWinProb(myR, oppR) {
  return 1 / (1 + Math.pow(10, (oppR - myR) / 12));
}

function simulateSeason() {
  const units = state.slots.map((s) => s.unit);

  // Track per-discipline match wins across the whole season.
  const perDisc = state.slots.map((s) => ({
    disc: s.disc,
    unit: s.unit,
    wins: 0,
    played: 0,
  }));

  let tieWins = 0;
  let tieLosses = 0;

  for (let t = 0; t < SEASON_TIES; t++) {
    // Opponent field strength ramps up as the season goes on
    // (early tournaments easier, finals brutal) with some noise.
    const base = 72 + (t / (SEASON_TIES - 1)) * 16; // 72 -> 88, ramps up all season
    let matchWins = 0;

    perDisc.forEach((pd) => {
      const oppR = base + (Math.random() * 8 - 4); // +/- 4 noise
      const p = matchWinProb(pd.unit.ovr, oppR);
      pd.played++;
      if (Math.random() < p) { matchWins++; pd.wins++; }
    });

    if (matchWins >= 3) tieWins++;
    else tieLosses++;
  }

  showResult(tieWins, tieLosses, perDisc);
}

function verdictFor(losses) {
  if (losses === 0)  return { title: "🏆 THE INVINCIBLES — PERFECT SEASON", cls: "perfect" };
  if (losses <= 2)   return { title: "🥇 CHAMPIONS", cls: "perfect" };
  if (losses <= 5)   return { title: "🥈 TITLE CHALLENGERS", cls: "" };
  if (losses <= 10)  return { title: "🎯 SOLID TOP-FOUR SIDE", cls: "" };
  if (losses <= 16)  return { title: "😬 MID-TABLE SCRAPPERS", cls: "lost" };
  return { title: "🪫 RELEGATION BATTLE", cls: "lost" };
}

function showResult(wins, losses, perDisc) {
  const v = verdictFor(losses);
  $("#resultVerdict").textContent = v.title;

  const rec = $("#resultRecord");
  rec.textContent = `${wins} – ${losses}`;
  rec.className = "result-record " + (losses === 0 ? "perfect" : v.cls === "lost" ? "lost" : "");

  const teamOvr = Math.round(
    perDisc.reduce((a, p) => a + p.unit.ovr, 0) / perDisc.length
  );
  $("#resultSub").textContent =
    `${state.format.name} · Team rating ${teamOvr} · ${SEASON_TIES}-tie World Tour season` +
    (losses === 0 ? " · Not a single defeat!" : "");

  const bd = $("#resultBreakdown");
  bd.innerHTML = "";
  perDisc.forEach((pd) => {
    const rate = Math.round((pd.wins / pd.played) * 100);
    const winSide = rate >= 50;
    const n = NATIONS[pd.unit.nation];
    const row = el("div", "bd-row");
    row.innerHTML = `
      <span class="bd-disc">${pd.disc}</span>
      <span class="bd-name">${unitName(pd.unit)} <small style="color:var(--muted)">${n.flag}</small></span>
      <span class="bd-win ${winSide ? "w" : "l"}">${rate}% won</span>`;
    bd.appendChild(row);
  });

  state.lastResult = { wins, losses, teamOvr, verdict: v.title };
  showScreen("screen-result");
}

function shareResult() {
  const r = state.lastResult;
  if (!r) return;
  const text =
    `🏸 Undefeated — ${state.format.name}\n` +
    `Record: ${r.wins}–${r.losses} over ${SEASON_TIES} ties\n` +
    `Team rating: ${r.teamOvr}\n` +
    `${r.verdict}\n` +
    state.slots.map((s) => `${s.disc}: ${unitName(s.unit)} (${s.unit.ovr})`).join("\n");

  navigator.clipboard?.writeText(text).then(
    () => flashShare("📋 Copied!"),
    () => flashShare("Copy failed")
  );
}
function flashShare(msg) {
  const b = $("#shareBtn");
  const old = b.textContent;
  b.textContent = msg;
  setTimeout(() => (b.textContent = old), 1400);
}

/* =====================================================================
   Wiring
   ===================================================================== */
function init() {
  renderFormats();
  $("#spinBtn").addEventListener("click", spin);
  $("#simulateBtn").addEventListener("click", simulateSeason);
  $("#shareBtn").addEventListener("click", shareResult);
  $("#againBtn").addEventListener("click", () => selectFormat(state.format));
  $("#resetBtn").addEventListener("click", () => {
    state.format = null;
    showScreen("screen-format");
  });
}

document.addEventListener("DOMContentLoaded", init);

})();
