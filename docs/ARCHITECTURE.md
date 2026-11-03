# Architecture

## Overview

ZPlay Slot Suite is a client-side React + Vite application that simulates a social casino slot machine suite. All game logic runs in the browser; no backend is required.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4.0 |
| Styling | CSS (custom properties) | — |
| Package Manager | npm | — |

## Directory Structure

```
zplay/
├── dist/                 # Production build output
├── src/
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   └── main.jsx          # React entry point
├── index.html            # HTML entry point
├── package.json          # Project manifest
├── vite.config.js        # Vite configuration
├── Makefile              # Build/deploy commands
├── .env.example          # Environment template
└── .gitignore            # Git ignore rules
```

## Game Logic

### Symbol System

Each symbol has:
- `id` — Unique identifier (A, K, Q, J, 10, WILD, SCATTER, BONUS)
- `name` — Display name
- `color` — Theme color
- `weight` — Probability weight for random selection
- `payout` — Payout multiplier for 3/4/5 matches

### Payline Evaluation

Paylines are defined as patterns of row positions (0=top, 1=middle, 2=bottom) across 5 reels. A win occurs when 3+ consecutive symbols match (with WILD acting as a substitute).

### Bonus Games

- **Spin the Wheel** — Triggered by 3+ SCATTER symbols
- **Discover the Treasure** — Triggered by 3+ BONUS symbols
- **Reveal a Credit Value** — Instant credit reveal
- **Reveal a Credit Value with Jackpot** — Jackpot tier reveal

### Level Progression

Players earn XP based on win amount. Leveling up unlocks higher-payline games with higher bet limits.

## Deployment

The app builds to static files in `dist/` and can be served by any static file host (Vercel, Netlify, GitHub Pages, S3, etc.).

## Security

- No sensitive data is stored client-side
- No API keys are required for core gameplay
- All random number generation uses `Math.random()` (suitable for social/demo play, not real-money gambling)
