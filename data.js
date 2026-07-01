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
  CHN: { code: "CHN", name: "China",          flag: "🇨🇳", kit: { primary: "#e60012", secondary: "#ffde00" } },
  INA: { code: "INA", name: "Indonesia",      flag: "🇮🇩", kit: { primary: "#e70011", secondary: "#ffffff" } },
  MAS: { code: "MAS", name: "Malaysia",       flag: "🇲🇾", kit: { primary: "#ffcc00", secondary: "#cc0001" } },
  DEN: { code: "DEN", name: "Denmark",        flag: "🇩🇰", kit: { primary: "#c60c30", secondary: "#ffffff" } },
  JPN: { code: "JPN", name: "Japan",          flag: "🇯🇵", kit: { primary: "#ffffff", secondary: "#bc002d" } },
  KOR: { code: "KOR", name: "South Korea",    flag: "🇰🇷", kit: { primary: "#0047a0", secondary: "#cd2e3a" } },
  IND: { code: "IND", name: "India",          flag: "🇮🇳", kit: { primary: "#ff9933", secondary: "#138808" } },
  TPE: { code: "TPE", name: "Chinese Taipei", flag: "🇹🇼", kit: { primary: "#003c7d", secondary: "#d30731" } },
  THA: { code: "THA", name: "Thailand",       flag: "🇹🇭", kit: { primary: "#2d2a4a", secondary: "#a51931" } },
  ESP: { code: "ESP", name: "Spain",          flag: "🇪🇸", kit: { primary: "#aa151b", secondary: "#f1bf00" } },
  ENG: { code: "ENG", name: "England",        flag: "🏴", kit: { primary: "#ce1124", secondary: "#ffffff" } },
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

  // ================= EXPANSION ROSTER =================

  // ---------------- MEN'S SINGLES (more) ----------------
  { disc: "MS", nation: "CHN", era: 2018, players: ["Shi Yuqi"],           s: { SMH: 90, SPD: 88, DEF: 86, NET: 82, STA: 88 } },
  { disc: "MS", nation: "TPE", era: 2019, players: ["Chou Tien-chen"],     s: { SMH: 86, SPD: 84, DEF: 89, NET: 85, STA: 90 } },
  { disc: "MS", nation: "INA", era: 2018, players: ["Jonatan Christie"],   s: { SMH: 88, SPD: 88, DEF: 83, NET: 81, STA: 84 } },
  { disc: "MS", nation: "DEN", era: 2019, players: ["Anders Antonsen"],    s: { SMH: 89, SPD: 86, DEF: 87, NET: 83, STA: 87 } },
  { disc: "MS", nation: "IND", era: 2022, players: ["Lakshya Sen"],        s: { SMH: 85, SPD: 88, DEF: 84, NET: 82, STA: 85 } },
  { disc: "MS", nation: "IND", era: 2017, players: ["Kidambi Srikanth"],   s: { SMH: 90, SPD: 87, DEF: 82, NET: 80, STA: 83 } },
  { disc: "MS", nation: "CHN", era: 2010, players: ["Chen Jin"],           s: { SMH: 88, SPD: 84, DEF: 86, NET: 82, STA: 85 } },
  { disc: "MS", nation: "CHN", era: 2006, players: ["Bao Chunlai"],        s: { SMH: 91, SPD: 85, DEF: 83, NET: 84, STA: 82 } },
  { disc: "MS", nation: "INA", era: 1974, players: ["Rudy Hartono"],       s: { SMH: 88, SPD: 86, DEF: 84, NET: 88, STA: 85 } },
  { disc: "MS", nation: "DEN", era: 1985, players: ["Morten Frost"],       s: { SMH: 86, SPD: 87, DEF: 85, NET: 88, STA: 86 } },
  { disc: "MS", nation: "IND", era: 1980, players: ["Prakash Padukone"],   s: { SMH: 85, SPD: 86, DEF: 86, NET: 89, STA: 84 } },
  { disc: "MS", nation: "KOR", era: 2017, players: ["Son Wan-ho"],         s: { SMH: 84, SPD: 86, DEF: 90, NET: 83, STA: 88 } },
  { disc: "MS", nation: "KOR", era: 2008, players: ["Lee Hyun-il"],        s: { SMH: 83, SPD: 85, DEF: 88, NET: 84, STA: 90 } },
  { disc: "MS", nation: "INA", era: 2014, players: ["Tommy Sugiarto"],     s: { SMH: 85, SPD: 84, DEF: 83, NET: 82, STA: 83 } },
  { disc: "MS", nation: "HKG", era: 2019, players: ["Ng Ka Long Angus"],   s: { SMH: 85, SPD: 85, DEF: 83, NET: 82, STA: 83 } },

  // ---------------- WOMEN'S SINGLES (more) ----------------
  { disc: "WS", nation: "CHN", era: 2021, players: ["Chen Yufei"],         s: { SMH: 87, SPD: 89, DEF: 90, NET: 84, STA: 89 } },
  { disc: "WS", nation: "CHN", era: 2023, players: ["He Bingjiao"],        s: { SMH: 85, SPD: 88, DEF: 88, NET: 86, STA: 86 } },
  { disc: "WS", nation: "CHN", era: 2006, players: ["Zhang Ning"],         s: { SMH: 88, SPD: 85, DEF: 89, NET: 83, STA: 88 } },
  { disc: "WS", nation: "CHN", era: 2006, players: ["Xie Xingfang"],       s: { SMH: 86, SPD: 87, DEF: 86, NET: 85, STA: 85 } },
  { disc: "WS", nation: "INA", era: 1993, players: ["Susi Susanti"],       s: { SMH: 88, SPD: 89, DEF: 88, NET: 90, STA: 88 } },
  { disc: "WS", nation: "DEN", era: 2001, players: ["Camilla Martin"],     s: { SMH: 84, SPD: 85, DEF: 84, NET: 86, STA: 84 } },
  { disc: "WS", nation: "CHN", era: 2013, players: ["Wang Shixian"],       s: { SMH: 85, SPD: 86, DEF: 85, NET: 82, STA: 84 } },
  { disc: "WS", nation: "INA", era: 2023, players: ["Gregoria M. Tunjung"], s: { SMH: 85, SPD: 86, DEF: 84, NET: 82, STA: 84 } },
  { disc: "WS", nation: "THA", era: 2021, players: ["Pornpawee Chochuwong"], s: { SMH: 82, SPD: 86, DEF: 86, NET: 84, STA: 85 } },
  { disc: "WS", nation: "THA", era: 2019, players: ["Busanan Ongbamrungphan"], s: { SMH: 82, SPD: 84, DEF: 85, NET: 83, STA: 86 } },
  { disc: "WS", nation: "KOR", era: 2016, players: ["Sung Ji-hyun"],       s: { SMH: 83, SPD: 86, DEF: 88, NET: 84, STA: 87 } },
  { disc: "WS", nation: "USA", era: 2018, players: ["Beiwen Zhang"],       s: { SMH: 86, SPD: 84, DEF: 82, NET: 82, STA: 83 } },
  { disc: "WS", nation: "CAN", era: 2019, players: ["Michelle Li"],        s: { SMH: 83, SPD: 84, DEF: 84, NET: 83, STA: 85 } },
  { disc: "WS", nation: "SCO", era: 2016, players: ["Kirsty Gilmour"],     s: { SMH: 82, SPD: 83, DEF: 83, NET: 82, STA: 83 } },
  { disc: "WS", nation: "DEN", era: 2019, players: ["Mia Blichfeldt"],     s: { SMH: 83, SPD: 84, DEF: 82, NET: 81, STA: 83 } },

  // ---------------- MEN'S DOUBLES (more) ----------------
  { disc: "MD", nation: "INA", era: 2022, players: ["Fajar Alfian", "Rian Ardianto"],       s: { SMH: 90, SPD: 88, DEF: 88, NET: 86, STA: 86 } },
  { disc: "MD", nation: "INA", era: 2008, players: ["Markis Kido", "Hendra Setiawan"],      s: { SMH: 92, SPD: 86, DEF: 88, NET: 88, STA: 84 } },
  { disc: "MD", nation: "KOR", era: 2014, players: ["Lee Yong-dae", "Yoo Yeon-seong"],      s: { SMH: 90, SPD: 89, DEF: 88, NET: 88, STA: 85 } },
  { disc: "MD", nation: "KOR", era: 2010, players: ["Lee Yong-dae", "Jung Jae-sung"],       s: { SMH: 91, SPD: 88, DEF: 87, NET: 87, STA: 84 } },
  { disc: "MD", nation: "CHN", era: 2018, players: ["Li Junhui", "Liu Yuchen"],             s: { SMH: 93, SPD: 84, DEF: 86, NET: 84, STA: 84 } },
  { disc: "MD", nation: "IND", era: 2023, players: ["Satwiksairaj Rankireddy", "Chirag Shetty"], s: { SMH: 93, SPD: 87, DEF: 85, NET: 85, STA: 85 } },
  { disc: "MD", nation: "MAS", era: 2022, players: ["Aaron Chia", "Soh Wooi Yik"],          s: { SMH: 88, SPD: 86, DEF: 88, NET: 86, STA: 86 } },
  { disc: "MD", nation: "MAS", era: 2007, players: ["Koo Kien Keat", "Tan Boon Heong"],     s: { SMH: 92, SPD: 86, DEF: 84, NET: 84, STA: 82 } },
  { disc: "MD", nation: "JPN", era: 2021, players: ["Takuro Hoki", "Yugo Kobayashi"],       s: { SMH: 88, SPD: 86, DEF: 88, NET: 86, STA: 85 } },
  { disc: "MD", nation: "DEN", era: 2020, players: ["Kim Astrup", "Anders Skaarup Rasmussen"], s: { SMH: 87, SPD: 84, DEF: 88, NET: 85, STA: 85 } },
  { disc: "MD", nation: "CHN", era: 2023, players: ["Liang Weikeng", "Wang Chang"],         s: { SMH: 90, SPD: 88, DEF: 87, NET: 87, STA: 85 } },

  // ---------------- WOMEN'S DOUBLES (more) ----------------
  { disc: "WD", nation: "CHN", era: 2004, players: ["Gao Ling", "Huang Sui"],               s: { SMH: 88, SPD: 86, DEF: 89, NET: 88, STA: 86 } },
  { disc: "WD", nation: "CHN", era: 2006, players: ["Yang Wei", "Zhang Jiewen"],            s: { SMH: 89, SPD: 85, DEF: 88, NET: 86, STA: 85 } },
  { disc: "WD", nation: "JPN", era: 2018, players: ["Yuki Fukushima", "Sayaka Hirota"],     s: { SMH: 88, SPD: 87, DEF: 90, NET: 88, STA: 88 } },
  { disc: "WD", nation: "JPN", era: 2023, players: ["Nami Matsuyama", "Chiharu Shida"],     s: { SMH: 87, SPD: 88, DEF: 89, NET: 88, STA: 87 } },
  { disc: "WD", nation: "KOR", era: 2020, players: ["Kim So-yeong", "Kong Hee-yong"],       s: { SMH: 87, SPD: 88, DEF: 88, NET: 87, STA: 86 } },
  { disc: "WD", nation: "INA", era: 2021, players: ["Greysia Polii", "Apriyani Rahayu"],    s: { SMH: 88, SPD: 86, DEF: 86, NET: 86, STA: 85 } },
  { disc: "WD", nation: "CHN", era: 2010, players: ["Du Jing", "Yu Yang"],                  s: { SMH: 87, SPD: 85, DEF: 88, NET: 86, STA: 85 } },
  { disc: "WD", nation: "THA", era: 2023, players: ["Jongkolphan Kititharakul", "Rawinda Prajongjai"], s: { SMH: 85, SPD: 86, DEF: 86, NET: 85, STA: 85 } },
  { disc: "WD", nation: "KOR", era: 2023, players: ["Baek Ha-na", "Lee So-hee"],            s: { SMH: 88, SPD: 87, DEF: 88, NET: 87, STA: 86 } },

  // ---------------- MIXED DOUBLES (more) ----------------
  { disc: "XD", nation: "CHN", era: 2000, players: ["Zhang Jun", "Gao Ling"],               s: { SMH: 88, SPD: 86, DEF: 88, NET: 90, STA: 86 } },
  { disc: "XD", nation: "INA", era: 2007, players: ["Nova Widianto", "Liliyana Natsir"],    s: { SMH: 87, SPD: 85, DEF: 88, NET: 91, STA: 85 } },
  { disc: "XD", nation: "CHN", era: 2019, players: ["Wang Yilyu", "Huang Dongping"],        s: { SMH: 90, SPD: 88, DEF: 89, NET: 90, STA: 87 } },
  { disc: "XD", nation: "DEN", era: 2012, players: ["Joachim Fischer Nielsen", "Christinna Pedersen"], s: { SMH: 86, SPD: 84, DEF: 87, NET: 86, STA: 84 } },
  { disc: "XD", nation: "MAS", era: 2016, players: ["Chan Peng Soon", "Goh Liu Ying"],      s: { SMH: 85, SPD: 84, DEF: 86, NET: 86, STA: 84 } },
  { disc: "XD", nation: "CHN", era: 2013, players: ["Xu Chen", "Ma Jin"],                   s: { SMH: 87, SPD: 85, DEF: 86, NET: 88, STA: 85 } },
  { disc: "XD", nation: "FRA", era: 2023, players: ["Thom Gicquel", "Delphine Delrue"],     s: { SMH: 85, SPD: 86, DEF: 86, NET: 86, STA: 85 } },
  { disc: "XD", nation: "CHN", era: 2023, players: ["Feng Yanzhe", "Huang Dongping"],       s: { SMH: 89, SPD: 88, DEF: 88, NET: 89, STA: 87 } },
  { disc: "XD", nation: "HKG", era: 2021, players: ["Tang Chun Man", "Tse Ying Suet"],      s: { SMH: 85, SPD: 85, DEF: 86, NET: 86, STA: 85 } },

  // ================= HISTORIC ROSTER (pre-2010) =================

  // ---------------- MEN'S DOUBLES (historic) ----------------
  { disc: "MD", nation: "INA", era: 1996, players: ["Ricky Subagja", "Rexy Mainaky"],          s: { SMH: 91, SPD: 88, DEF: 89, NET: 88, STA: 86 } },
  { disc: "MD", nation: "INA", era: 2000, players: ["Tony Gunawan", "Candra Wijaya"],          s: { SMH: 92, SPD: 87, DEF: 88, NET: 88, STA: 85 } },
  { disc: "MD", nation: "KOR", era: 2004, players: ["Ha Tae-kwon", "Kim Dong-moon"],           s: { SMH: 90, SPD: 88, DEF: 89, NET: 88, STA: 86 } },
  { disc: "MD", nation: "KOR", era: 1992, players: ["Park Joo-bong", "Kim Moon-soo"],          s: { SMH: 90, SPD: 86, DEF: 88, NET: 89, STA: 85 } },
  { disc: "MD", nation: "MAS", era: 1992, players: ["Razif Sidek", "Jalani Sidek"],            s: { SMH: 88, SPD: 85, DEF: 87, NET: 86, STA: 85 } },
  { disc: "MD", nation: "MAS", era: 1996, players: ["Cheah Soon Kit", "Yap Kim Hock"],         s: { SMH: 89, SPD: 86, DEF: 85, NET: 85, STA: 84 } },
  { disc: "MD", nation: "KOR", era: 2003, players: ["Lee Dong-soo", "Yoo Yong-sung"],          s: { SMH: 89, SPD: 86, DEF: 87, NET: 86, STA: 84 } },
  { disc: "MD", nation: "INA", era: 1997, players: ["Candra Wijaya", "Sigit Budiarto"],        s: { SMH: 90, SPD: 85, DEF: 86, NET: 87, STA: 84 } },
  { disc: "MD", nation: "DEN", era: 2004, players: ["Jens Eriksen", "Martin Lundgaard Hansen"], s: { SMH: 88, SPD: 84, DEF: 88, NET: 85, STA: 84 } },
  { disc: "MD", nation: "USA", era: 2005, players: ["Howard Bach", "Tony Gunawan"],            s: { SMH: 89, SPD: 85, DEF: 86, NET: 86, STA: 84 } },

  // ---------------- WOMEN'S DOUBLES (historic) ----------------
  { disc: "WD", nation: "CHN", era: 1997, players: ["Ge Fei", "Gu Jun"],                       s: { SMH: 89, SPD: 87, DEF: 90, NET: 90, STA: 87 } },
  { disc: "WD", nation: "KOR", era: 1999, players: ["Ra Kyung-min", "Chung Jae-hee"],          s: { SMH: 86, SPD: 86, DEF: 88, NET: 86, STA: 86 } },
  { disc: "WD", nation: "KOR", era: 1992, players: ["Chung So-young", "Hwang Hye-young"],       s: { SMH: 87, SPD: 85, DEF: 88, NET: 86, STA: 85 } },
  { disc: "WD", nation: "KOR", era: 2008, players: ["Lee Kyung-won", "Lee Hyo-jung"],          s: { SMH: 87, SPD: 86, DEF: 87, NET: 86, STA: 85 } },
  { disc: "WD", nation: "CHN", era: 1992, players: ["Guan Weizhen", "Nong Qunhua"],            s: { SMH: 87, SPD: 84, DEF: 87, NET: 85, STA: 84 } },

  // ---------------- MIXED DOUBLES (historic) ----------------
  { disc: "XD", nation: "KOR", era: 2000, players: ["Kim Dong-moon", "Ra Kyung-min"],          s: { SMH: 88, SPD: 87, DEF: 89, NET: 90, STA: 86 } },
  { disc: "XD", nation: "ENG", era: 2004, players: ["Nathan Robertson", "Gail Emms"],          s: { SMH: 86, SPD: 85, DEF: 87, NET: 86, STA: 85 } },
  { disc: "XD", nation: "INA", era: 2000, players: ["Tri Kusharjanto", "Minarti Timur"],       s: { SMH: 86, SPD: 85, DEF: 86, NET: 87, STA: 84 } },

  // ---------------- SINGLES (historic legends) ----------------
  { disc: "MS", nation: "CHN", era: 1988, players: ["Yang Yang"],          s: { SMH: 89, SPD: 87, DEF: 85, NET: 86, STA: 88 } },
  { disc: "MS", nation: "INA", era: 1983, players: ["Icuk Sugiarto"],      s: { SMH: 88, SPD: 85, DEF: 84, NET: 85, STA: 86 } },
  { disc: "WS", nation: "CHN", era: 1986, players: ["Li Lingwei"],         s: { SMH: 87, SPD: 86, DEF: 86, NET: 87, STA: 86 } },
  { disc: "WS", nation: "CHN", era: 1985, players: ["Han Aiping"],         s: { SMH: 89, SPD: 85, DEF: 84, NET: 85, STA: 85 } },
];

// Add nations that only appear in the roster (not in the primary map above).
NATIONS.SGP = { code: "SGP", name: "Singapore",      flag: "🇸🇬", kit: { primary: "#ed2939", secondary: "#ffffff" } };
NATIONS.HKG = { code: "HKG", name: "Hong Kong",      flag: "🇭🇰", kit: { primary: "#de2910", secondary: "#ffffff" } };
NATIONS.USA = { code: "USA", name: "United States",  flag: "🇺🇸", kit: { primary: "#3c3b6e", secondary: "#b22234" } };
NATIONS.CAN = { code: "CAN", name: "Canada",         flag: "🇨🇦", kit: { primary: "#ff0000", secondary: "#ffffff" } };
NATIONS.SCO = { code: "SCO", name: "Scotland",       flag: "🏴", kit: { primary: "#005eb8", secondary: "#ffffff" } };
NATIONS.FRA = { code: "FRA", name: "France",         flag: "🇫🇷", kit: { primary: "#0055a4", secondary: "#ef4135" } };

// Finalise the roster: assign ids and computed overalls.
const UNITS = _UNITS.map((u, i) => ({
  id: "u" + i,
  ...u,
  ovr: ovrOf(u.disc, u.s),
}));

// Expose for the game module (and for quick console debugging).
window.BADMINTON_DATA = { DISCIPLINES, FORMATS, NATIONS, UNITS, ovrOf };
