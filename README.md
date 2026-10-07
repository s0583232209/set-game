# Play Time — SET Card Game (Grade: 95%)

A browser-based implementation of the classic card game **SET**, built with vanilla JavaScript, HTML5 and CSS3 — no frameworks, no build step, no backend. It is the first playable title inside a small multi-game hub ("Play Time") that also reserves slots for Monopoly, Merge and Taki.

> Play Time — allways the right time to play!

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How to Play](#how-to-play)
- [Game Modes](#game-modes)
- [Data & Persistence](#data--persistence)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Browser Support](#browser-support)
- [Credits](#credits)
- [License](#license)

---

## Overview

The app is a fully static site — every page can be opened directly in a browser or served from any static file host. There is **no server-side code and no network API calls**; "accounts", scores and saved games are all persisted client-side using the browser's `localStorage` and `sessionStorage`.

The SET engine (deck generation, shuffling, set validation, hint system, scoring) is implemented from scratch in plain JavaScript and reused across three game variants (full game, guest/limited game, and resume-saved-game).

## Features

- 🎴 **Full SET game engine** — 81-card deck generation, Fisher–Yates shuffle, and set-validity checking based on multiplying card attributes (a mathematically neat way to detect "all same or all different" across number, color, shape and fill).
- 💡 **Progressive hints** — reveals one attribute of a valid set at a time, at the cost of points.
- ➕ **Add 3 cards** — expands the board when no set is visible on it, with a score penalty if a set was actually available.
- 💾 **Save & resume** — persist an in-progress game per user and continue later.
- 👤 **Mock authentication** — sign up / log in flow with per-user score tracking (no server involved — see [Data & Persistence](#data--persistence)).
- 🚧 **Guest mode** — a limited, no-login version of the game capped at a few rounds, after which the player is prompted to register.
- 🎨 **Animated UI** — fading card transitions, a spinning logo, custom card iconography (rhombus / ellipse / squiggle in three fills and three colors) built with pure CSS.
- 🕹️ **Game hub** — a home screen listing available/upcoming games (Monopoly, Merge, Taki are placeholder "coming soon" pages).

## Tech Stack

| Layer      | Technology                                   |
|------------|-----------------------------------------------|
| Markup     | HTML5                                          |
| Styling    | CSS3 (custom properties, flex/grid, `@font-face`) |
| Behavior   | Vanilla JavaScript (ES6+, no frameworks/libraries) |
| Storage    | `localStorage` (users, saved games) / `sessionStorage` (current session) |
| Fonts      | ABeeZee, Agbalumo, Akaya Kanadaka, Charm, Miss Fajardose (see [Credits](#credits)) |
| Tooling    | None required — no bundler, no package manager, no build step |

## Project Structure

```
set-project/
├── html/
│   ├── enter.html        # Landing page — sign up / log in / guest entry
│   ├── home.html         # Game hub (post-login)
│   ├── set.html           # Full SET game (registered players)
│   ├── limitedSet.html    # Guest / limited-rounds SET game
│   ├── savedSet.html      # Resume a previously saved game
│   └── empty.html         # "Coming soon" placeholder for other games
├── css/
│   ├── home.css           # Shared header/hub styling (also used by enter.html)
│   ├── set.css             # Game board, cards, buttons, rules modal
│   └── empty.css           # Placeholder page styling
├── js/
│   ├── set.js              # Core game logic (full version)
│   ├── limitedSet.js       # Guest game logic (round-limited variant)
│   ├── savedGame.js        # Resume-saved-game logic
│   ├── signUpLogIn.js      # Client-side auth (localStorage-backed)
│   ├── exit.js              # Log out / session cleanup
│   └── logoRotate.js        # Logo spin animation
├── fonts/                  # Self-hosted webfonts (OFL-licensed)
├── media/pictures/         # Logos, icons, background art, game thumbnails
├── cards.xlsx              # Design reference for the 81-card attribute matrix
└── README.md
```

## Getting Started

No installation, dependencies, or build step are required.

### Option 1 — Open directly
Double-click [html/enter.html](html/enter.html) (or drag it into a browser window).

> Note: some browsers restrict certain features (e.g. relative asset loading) under the `file://` protocol. If images/fonts don't load correctly, use Option 2.

### Option 2 — Serve locally (recommended)
Any static file server works. For example, with Node.js:

```bash
npx serve .
```

or with Python:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/html/enter.html` in your browser.

## How to Play

A **set** is three cards where, for each of the four attributes below, the cards are **all the same** or **all different**:

- **Number** — one, two, or three
- **Color** — red, green, or purple
- **Shape** — rhombus, ellipse, or squiggle
- **Fill** — empty, full, or striped

Click three cards on the board to select them. If they form a valid set, they're replaced and you gain points; otherwise you lose points. Use **Hint** to reveal one attribute of a valid set on the board (costs a point per reveal), or **Add 3 Cards** if you believe no set currently exists on the board (costs a point if you're wrong).

## Game Modes

| Mode | Entry point | Description |
|------|-------------|--------------|
| **Registered play** | [html/set.html](html/set.html) | Full game with persistent score tied to your account, unlimited rounds, and the ability to save mid-game. |
| **Guest play** | [html/limitedSet.html](html/limitedSet.html) | No account required; capped at a handful of set rounds before prompting sign-up. |
| **Resume game** | [html/savedSet.html](html/savedSet.html) | Reloads a board and remaining deck previously saved by the logged-in user. |

## Data & Persistence

This project intentionally has **no backend and makes no network requests**. All state lives in the browser:

- `localStorage['users']` — array of `{ name, password, score }` created at sign-up.
- `localStorage['saved-games']` — array of `{ userName, gameCards, score }` snapshots for resuming a game.
- `sessionStorage['current-player']` — the currently logged-in user for the active browser tab/session.

This keeps the app dependency-free and instantly deployable to any static host, but it also means accounts and progress are **local to a single browser** and are lost if site data is cleared.

## Known Limitations

- **Not a real authentication system.** Passwords are stored in plain text in `localStorage` and are never hashed or transmitted — do not reuse real passwords. This project is a front-end/game-logic showcase, not a security-hardened login system.
- **No cross-device sync.** Since there's no server, accounts, scores, and saved games do not carry over between browsers or devices.
- **Placeholder titles.** Monopoly, Merge and Taki are stubbed out with an "unavailable" screen ([html/empty.html](html/empty.html)) and are not yet implemented.

## Roadmap

- [ ] Implement Monopoly, Merge, and Taki game modes
- [ ] Replace `localStorage`-based auth with a real backend + hashed credentials
- [ ] Add responsive/mobile layout support
- [ ] Add automated tests for the set-validation logic

## Browser Support

Built with standard, modern JavaScript (ES6+) and CSS. Verified against current versions of Chrome, Edge, and Firefox. Internet Explorer is not supported.

## Credits

- Fonts under the SIL Open Font License: **Agbalumo**, **Akaya Kanadaka**, **Charm**, **Miss Fajardose**, **ABeeZee** (see each font's `OFL.txt` in [fonts/](fonts/)).
- Game concept based on the classic card game **SET®**, originally created by Marsha Falco.

## License

No license file is currently included in this repository. All rights reserved by the project author unless a license is added.
