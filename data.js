/* =====================================================================
   Undefeated — Badminton Squad Draft
   data.js  ·  Roster of legendary badminton units (players & pairs)
   ---------------------------------------------------------------------
   Each "unit" is a draftable slot filler:
     - Singles disciplines (MS / WS)  -> one player
     - Doubles disciplines (MD / WD / XD) -> a legendary pair
   Stats are FIFA-style approximations for gameplay only (0-99):
     SMH = Smash / attack power
     SPD = Court speed & footwork
     DEF = Defence & retrieval
     NET = Net play & touch
     STA = Stamina & consistency
     ovr = Overall rating (derived by weighting)
   ===================================================================== */

const DISCIPLINES = {
  MS: { key: "MS", label: "Men's Singles",   gender: "M", type: "singles" },
  WS: { key: "WS", label: "Women's Singles", gender: "W", type: "singles" },
  MD: { key: "MD", label: "Men's Doubles",   gender: "M", type: "doubles" },
  WD: { key: "WD", label: "Women's Doubles", gender: "W", type: "doubles" },
  XD: { key: "XD", label: "Mixed Doubles",   gender: "X", type: "doubles" },
};

// Team formats — the badminton analogue to football formations.
const FORMATS = {
  sudirman: {
    key: "sudirman",
    name: "Sudirman Cup",
    blurb: "Mixed national team — one of every discipline.",
    slots: ["MS", "WS", "MD", "WD", "XD"],
  },
  thomas: {
    key: "thomas",
    name: "Thomas Cup",
    blurb: "Men's team — three singles, two doubles.",
    slots: ["MS", "MS", "MS", "MD", "MD"],
  },
  uber: {
    key: "uber",
    name: "Uber Cup",
    blurb: "Women's team — three singles, two doubles.",
    slots: ["WS", "WS", "WS", "WD", "WD"],
  },
};

const NATIONS = {
  CHN: { code: "CHN", name: "China",          flag: "🇨🇳" },
  INA: { code: "INA", name: "Indonesia",      flag: "🇮🇩" },
  MAS: { code: "MAS", name: "Malaysia",       flag: "🇲🇾" },
  DEN: { code: "DEN", name: "Denmark",        flag: "🇩🇰" },
  JPN: { code: "JPN", name: "Japan",          flag: "🇯🇵" },
  KOR: { code: "KOR", name: "South Korea",    flag: "🇰🇷" },
  IND: { code: "IND", name: "India",          flag: "🇮🇳" },
  TPE: { code: "TPE", name: "Chinese Taipei", flag: "🇹🇼" },
  THA: { code: "THA", name: "Thailand",       flag: "🇹🇭" },
  ESP: { code: "ESP", name: "Spain",          flag: "🇪🇸" },
  ENG: { code: "ENG", name: "England",        flag: "🏴" },
};

// Helper to compute an overall from the five attributes with a
// discipline-appropriate weighting.
function ovrOf(disc, s) {
  const w =
    disc === "MS" || disc === "WS"
      ? { SMH: 0.24, SPD: 0.24, DEF: 0.2, NET: 0.14, STA: 0.18 }
      : { SMH: 0.26, SPD: 0.18, DEF: 0.2, NET: 0.24, STA: 0.12 };
  const raw = s.SMH * w.SMH + s.SPD * w.SPD + s.DEF * w.DEF + s.NET * w.NET + s.STA * w.STA;
  return Math.round(raw);
}

// Raw unit definitions. `players` is 1 name for singles, 2 for doubles.
const _UNITS = [
  // ---------------- MEN'S SINGLES ----------------
  { disc: "MS", nation: "CHN", era: 2011, players: ["Lin Dan"],            s: { SMH: 94, SPD: 92, DEF: 93, NET: 88, STA: 91 } },
  { disc: "MS", nation: "MAS", era: 2011, players: ["Lee Chong Wei"],      s: { SMH: 92, SPD: 96, DEF: 92, NET: 87, STA: 90 } },
  { disc: "MS", nation: "DEN", era: 2021, players: ["Viktor Axelsen"],     s: { SMH: 96, SPD: 88, DEF: 90, NET: 85, STA: 93 } },
  { disc: "MS", nation: "JPN", era: 2019, players: ["Kento Momota"],       s: { SMH: 85, SPD: 90, DEF: 96, NET: 90, STA: 92 } },
  { disc: "MS", nation: "INA", era: 2005, players: ["Taufik Hidayat"],     s: { SMH: 90, SPD: 89, DEF: 86, NET: 93, STA: 84 } },
  { disc: "MS", nation: "CHN", era: 2015, players: ["Chen Long"],          s: { SMH: 89, SPD: 85, DEF: 92, NET: 84, STA: 90 } },
  { disc: "MS", nation: "DEN", era: 2001, players: ["Peter Gade"],         s: { SMH: 87, SPD: 88, DEF: 85, NET: 90, STA: 83 } },
  { disc: "MS", nation: "THA", era: 2023, players: ["Kunlavut Vitidsarn"], s: { SMH: 84, SPD: 87, DEF: 91, NET: 88, STA: 89 } },
  { disc: "MS", nation: "INA", era: 2019, players: ["Anthony Ginting"],    s: { SMH: 88, SPD: 91, DEF: 84, NET: 82, STA: 83 } },
  { disc: "MS", nation: "SGP", era: 2021, players: ["Loh Kean Yew"],       s: { SMH: 89, SPD: 86, DEF: 82, NET: 80, STA: 84 } },

  // ---------------- WOMEN'S SINGLES ----------------
  { disc: "WS", nation: "TPE", era: 2019, players: ["Tai Tzu-ying"],       s: { SMH: 86, SPD: 94, DEF: 88, NET: 97, STA: 85 } },
  { disc: "WS", nation: "ESP", era: 2016, players: ["Carolina Marín"],     s: { SMH: 95, SPD: 91, DEF: 87, NET: 84, STA: 90 } },
  { disc: "WS", nation: "IND", era: 2019, players: ["P.V. Sindhu"],        s: { SMH: 93, SPD: 87, DEF: 85, NET: 82, STA: 88 } },
  { disc: "WS", nation: "KOR", era: 2023, players: ["An Se-young"],        s: { SMH: 88, SPD: 93, DEF: 94, NET: 89, STA: 92 } },
  { disc: "WS", nation: "JPN", era: 2018, players: ["Akane Yamaguchi"],    s: { SMH: 84, SPD: 92, DEF: 95, NET: 86, STA: 94 } },
  { disc: "WS", nation: "CHN", era: 2012, players: ["Li Xuerui"],          s: { SMH: 90, SPD: 88, DEF: 87, NET: 83, STA: 86 } },
  { disc: "WS", nation: "IND", era: 2015, players: ["Saina Nehwal"],       s: { SMH: 89, SPD: 85, DEF: 84, NET: 80, STA: 85 } },
  { disc: "WS", nation: "THA", era: 2013, players: ["Ratchanok Intanon"],  s: { SMH: 83, SPD: 89, DEF: 86, NET: 92, STA: 84 } },
  { disc: "WS", nation: "CHN", era: 2010, players: ["Wang Yihan"],         s: { SMH: 88, SPD: 86, DEF: 88, NET: 82, STA: 85 } },
  { disc: "WS", nation: "JPN", era: 2017, players: ["Nozomi Okuhara"],     s: { SMH: 82, SPD: 90, DEF: 93, NET: 85, STA: 93 } },

  // ---------------- MEN'S DOUBLES ----------------
  { disc: "MD", nation: "INA", era: 2019, players: ["Kevin Sukamuljo", "Marcus Gideon"], s: { SMH: 93, SPD: 96, DEF: 90, NET: 95, STA: 86 } },
  { disc: "MD", nation: "INA", era: 2013, players: ["Mohammad Ahsan", "Hendra Setiawan"], s: { SMH: 91, SPD: 85, DEF: 94, NET: 92, STA: 88 } },
  { disc: "MD", nation: "TPE", era: 2021, players: ["Lee Yang", "Wang Chi-lin"],         s: { SMH: 92, SPD: 88, DEF: 91, NET: 88, STA: 87 } },
  { disc: "MD", nation: "CHN", era: 2012, players: ["Cai Yun", "Fu Haifeng"],            s: { SMH: 95, SPD: 84, DEF: 89, NET: 87, STA: 85 } },
  { disc: "MD", nation: "KOR", era: 2022, players: ["Kang Min-hyuk", "Seo Seung-jae"],   s: { SMH: 90, SPD: 89, DEF: 88, NET: 87, STA: 86 } },
  { disc: "MD", nation: "DEN", era: 2016, players: ["Mathias Boe", "Carsten Mogensen"],  s: { SMH: 89, SPD: 83, DEF: 90, NET: 85, STA: 84 } },
  { disc: "MD", nation: "MAS", era: 2015, players: ["Goh V Shem", "Tan Wee Kiong"],      s: { SMH: 90, SPD: 84, DEF: 85, NET: 83, STA: 82 } },
  { disc: "MD", nation: "JPN", era: 2019, players: ["Takeshi Kamura", "Keigo Sonoda"],   s: { SMH: 86, SPD: 86, DEF: 91, NET: 86, STA: 88 } },

  // ---------------- WOMEN'S DOUBLES ----------------
  { disc: "WD", nation: "JPN", era: 2019, players: ["Mayu Matsumoto", "Wakana Nagahara"], s: { SMH: 88, SPD: 87, DEF: 90, NET: 89, STA: 88 } },
  { disc: "WD", nation: "CHN", era: 2015, players: ["Zhao Yunlei", "Tian Qing"],          s: { SMH: 91, SPD: 86, DEF: 90, NET: 88, STA: 86 } },
  { disc: "WD", nation: "KOR", era: 2018, players: ["Lee So-hee", "Shin Seung-chan"],     s: { SMH: 87, SPD: 88, DEF: 91, NET: 86, STA: 87 } },
  { disc: "WD", nation: "CHN", era: 2021, players: ["Chen Qingchen", "Jia Yifan"],        s: { SMH: 92, SPD: 89, DEF: 89, NET: 90, STA: 87 } },
  { disc: "WD", nation: "JPN", era: 2016, players: ["Misaki Matsutomo", "Ayaka Takahashi"], s: { SMH: 86, SPD: 88, DEF: 92, NET: 88, STA: 89 } },
  { disc: "WD", nation: "INA", era: 2022, players: ["Apriyani Rahayu", "Siti Fadia"],     s: { SMH: 88, SPD: 87, DEF: 86, NET: 85, STA: 84 } },

  // ---------------- MIXED DOUBLES ----------------
  { disc: "XD", nation: "CHN", era: 2019, players: ["Zheng Siwei", "Huang Yaqiong"],      s: { SMH: 93, SPD: 92, DEF: 90, NET: 94, STA: 88 } },
  { disc: "XD", nation: "CHN", era: 2012, players: ["Zhang Nan", "Zhao Yunlei"],          s: { SMH: 90, SPD: 87, DEF: 89, NET: 90, STA: 86 } },
  { disc: "XD", nation: "INA", era: 2018, players: ["Tontowi Ahmad", "Liliyana Natsir"],  s: { SMH: 89, SPD: 86, DEF: 90, NET: 93, STA: 85 } },
  { disc: "XD", nation: "THA", era: 2021, players: ["Dechapol Puavaranukroh", "Sapsiree Taerattanachai"], s: { SMH: 90, SPD: 89, DEF: 88, NET: 89, STA: 87 } },
  { disc: "XD", nation: "JPN", era: 2022, players: ["Yuta Watanabe", "Arisa Higashino"],  s: { SMH: 87, SPD: 90, DEF: 89, NET: 90, STA: 88 } },
  { disc: "XD", nation: "ENG", era: 2011, players: ["Chris Adcock", "Gabby Adcock"],      s: { SMH: 84, SPD: 84, DEF: 86, NET: 85, STA: 83 } },
  { disc: "XD", nation: "KOR", era: 2023, players: ["Seo Seung-jae", "Chae Yu-jung"],     s: { SMH: 89, SPD: 88, DEF: 87, NET: 88, STA: 86 } },
];

// Add Singapore flag (used by Loh Kean Yew) since it wasn't in the main map.
NATIONS.SGP = { code: "SGP", name: "Singapore", flag: "🇸🇬" };

// Finalise the roster: assign ids and computed overalls.
const UNITS = _UNITS.map((u, i) => ({
  id: "u" + i,
  ...u,
  ovr: ovrOf(u.disc, u.s),
}));

// Expose for the game module (and for quick console debugging).
window.BADMINTON_DATA = { DISCIPLINES, FORMATS, NATIONS, UNITS, ovrOf };
