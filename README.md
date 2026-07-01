# Undefeated 🏸 — Build the Perfect Badminton Squad

A browser game inspired by the viral football draft game **38-0-0**, reimagined for
badminton. Draft a squad of all-time legends, then simulate a World Tour season and
find out whether your team can go **completely unbeaten**.

## How to play

1. **Choose a team format**
   - 🏆 **Sudirman Cup** — mixed team: MS, WS, MD, WD, XD
   - 👨 **Thomas Cup** — men's team: 3 singles + 2 doubles
   - 👩 **Uber Cup** — women's team: 3 singles + 2 doubles
2. **Spin** the wheel to draw a random badminton nation & era.
3. **Draft** one legend (or legendary pair) from that nation into an open discipline.
4. Fill all 5 slots, then hit **Simulate the season**.
5. The game plays out a 26-tie World Tour season (each tie = 5 matches, win 3 to win
   the tie). Chase the holy grail: an **unbeaten record**.

## Verdicts

| Losses | Verdict |
|-------:|---------|
| 0 | 🏆 THE INVINCIBLES — Perfect Season |
| 1–2 | 🥇 Champions |
| 3–5 | 🥈 Title Challengers |
| 6–10 | 🎯 Solid top-four side |
| 11–16 | 😬 Mid-table scrappers |
| 17+ | 🪫 Relegation battle |

## Running it

No build step, no dependencies. Just open `index.html` in any modern browser, or serve
the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — page structure (format select, court, spin panel, result card)
- `style.css` — badminton-court themed UI
- `data.js` — roster of legendary players/pairs with FIFA-style stats
- `game.js` — spin, draft, and season-simulation logic

## Notes

Player ratings are subjective approximations for gameplay only. This is an
unofficial, fan-made project inspired by the 38-0-0 concept.
