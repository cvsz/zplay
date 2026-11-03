# ZPlay Slot Suite

A 6-game Pragmatic Play style slot machine suite built with React + Vite. Features multiple payline configurations, bonus games, jackpots, in-app purchases, level progression, and social rewards.

## Live Demo

Serve the `dist/` folder as static files, or deploy to any static host.

## Quick Start

```bash
make install    # Install dependencies
make build      # Build for production
make start      # Build and start preview server
```

Or for development:

```bash
make install
make dev        # Development server with hot reload
```

## Features

### 6 Slot Games
| Game | Paylines | Min Bet | Max Bet | RTP | Unlock Level |
|------|----------|---------|---------|-----|-------------|
| Lucky 9 Lines | 9 | 1 | 100 | 96.5% | 1 |
| Ten Line Treasure | 10 | 1 | 150 | 96.8% | 2 |
| 25 Payline Fortune | 25 | 5 | 250 | 97.0% | 5 |
| 30 Line Jackpot | 30 | 10 | 300 | 97.2% | 10 |
| 40 Line Empire | 40 | 20 | 500 | 97.5% | 15 |
| Scatter Win Riches | Scatter | 5 | 200 | 96.9% | 8 |

### Bonus Games
- **Spin the Wheel** — Triggered by 3+ SCATTER symbols
- **Discover the Treasure** — Pick chest bonuses triggered by 3+ BONUS symbols
- **Reveal a Credit Value** — Instant credit reveal bonus
- **Reveal a Credit Value with Jackpot** — Jackpot tier reveal bonus

### Features
- Jackpot feature (random chance based on bet size)
- In-App Purchases (buy credits: $4.99–$99.99)
- Collect 200 credits every 2 hours
- Level progression (XP-based unlocks)
- Facebook share (+500 credits) / Like page (+300 credits)
- Auto Spin (10 automatic spins)
- Adjustable bet per line (1–500)
- Responsive layout (desktop 1440px, tablet 768px, phone 390px)

## Project Structure

```
zplay/
├── dist/              # Built static site (deploy this)
├── src/
│   ├── App.jsx        # Main slot suite component
│   ├── App.css        # Styles with design tokens
│   └── main.jsx       # React entry point
├── index.html         # HTML entry point
├── package.json       # Vite/React project
├── vite.config.js     # Build config
├── Makefile           # Build/deploy commands
└── .github/           # CI/CD and project config
```

## Deployment

```bash
make deploy-vercel    # Deploy to Vercel
make deploy-netlify   # Deploy to Netlify
make deploy-ghpages   # Deploy to GitHub Pages
```

Or serve `dist/` as static files from any web server.

## Built With

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool and dev server

---

This repository was generated from the [cvsz/ztemplate](https://github.com/cvsz/ztemplate) project template.
