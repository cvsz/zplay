# AGENTS.md: ZPlay Slot Suite

This file provides guidance for AI agents working on the ZPlay Slot Suite project.

## Project Overview

ZPlay Slot Suite is a 6-game Pragmatic Play style slot machine suite built with React + Vite.

## Tech Stack

- React 18.3.1
- Vite 5.4.0
- npm

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main application component with all game logic |
| `src/App.css` | Styles and design tokens |
| `src/main.jsx` | React entry point |
| `vite.config.js` | Vite configuration |
| `package.json` | Project manifest |
| `Makefile` | Build/deploy commands |

## Game Configuration

Edit `src/App.jsx` to modify:
- `SYMBOLS` — Symbol definitions (id, name, color, weight, payout)
- `GAMES` — Game configurations (paylines, bet limits, RTP, volatility)
- `PAYLINE_PATTERNS` — Payline patterns for each payline count

## Available Commands

```bash
make install    # Install dependencies
make build      # Build for production
make dev        # Start development server
make start      # Build and start preview
make test       # Run tests
make lint       # Run linter
make clean      # Remove build output
```

## Testing

Add tests in the project root or `tests/` directory. Run with `make test`.

## Linting

Add ESLint/Prettier configuration. Run with `make lint`.

## Deployment

```bash
make deploy-vercel    # Deploy to Vercel
make deploy-netlify   # Deploy to Netlify
make deploy-ghpages   # Deploy to GitHub Pages
```

## Security

- Never commit `.env` files
- Copy `.env.example` to `.env` for local development
- This is a social/demo game — not for real-money gambling
