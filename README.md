# ZPlay Slot Suite

[![CI](https://github.com/cvsz/zplay/actions/workflows/ci.yml/badge.svg)](https://github.com/cvsz/zplay/actions/workflows/ci.yml)
[![CodeQL](https://github.com/cvsz/zplay/actions/workflows/codeql.yml/badge.svg)](https://github.com/cvsz/zplay/actions/workflows/codeql.yml)

A 6-game Pragmatic Play style slot machine suite built with React + Vite. Features multiple payline configurations, bonus games, jackpots, in-app purchases, level progression, and social rewards.

## 🎰 Live Demo

Serve the `dist/` folder as static files, or deploy to any static host.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/cvsz/zplay.git
cd zplay

# Install dependencies
make install

# Start development server with hot reload
make dev

# Or build for production
make build

# Build and start production preview server
make start
```

## 🎮 Features

### Six Slot Games

| Game | Paylines | Min Bet | Max Bet | RTP | Volatility | Unlock Level |
|------|----------|---------|---------|-----|------------|-------------|
| Lucky 9 Lines | 9 | 1 | 100 | 96.5% | Medium | 1 |
| Ten Line Treasure | 10 | 1 | 150 | 96.8% | Medium | 2 |
| 25 Payline Fortune | 25 | 5 | 250 | 97.0% | High | 5 |
| 30 Line Jackpot | 30 | 10 | 300 | 97.2% | High | 10 |
| 40 Line Empire | 40 | 20 | 500 | 97.5% | Very High | 15 |
| Scatter Win Riches | Scatter | 5 | 200 | 96.9% | High | 8 |

### Bonus Games

- **Spin the Wheel** — Triggered by 3+ SCATTER symbols
- **Discover the Treasure** — Pick chest bonuses triggered by 3+ BONUS symbols
- **Reveal a Credit Value** — Instant credit reveal bonus
- **Reveal a Credit Value with Jackpot** — Jackpot tier reveal bonus

### Additional Features

- **Jackpot Feature** — Random chance based on bet size
- **In-App Purchases** — Buy credits ($4.99–$99.99)
- **2-Hourly Bonus** — Collect 200 credits every 2 hours
- **Level Progression** — XP-based unlocks for higher-payline games
- **Social Rewards** — Facebook share (+500 credits) / Like page (+300 credits)
- **Auto Spin** — 10 automatic spins
- **Adjustable Bets** — Bet per line from 1 to max bet
- **Responsive Layout** — Desktop (1440px), tablet (768px), phone (390px)

## 📁 Project Structure

```
zplay/
├── dist/                 # Built static site (deploy this)
├── src/
│   ├── App.jsx           # Main slot suite component
│   ├── App.css           # Styles with design tokens
│   └── main.jsx          # React entry point
├── index.html            # HTML entry point
├── package.json          # Vite/React project
├── vite.config.js        # Build config
├── Makefile              # Build/deploy commands
├── .env.example          # Environment variables template
└── .gitignore            # Git ignore rules
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available make targets |
| `make install` | Install npm dependencies |
| `make build` | Build for production (output in `dist/`) |
| `make dev` | Start development server with hot reload |
| `make start` | Build and start production preview server |
| `make clean` | Remove `dist/` and `node_modules/` |
| `make clean-build` | Remove only `dist/` |
| `make deploy-vercel` | Deploy to Vercel |
| `make deploy-netlify` | Deploy to Netlify |
| `make deploy-ghpages` | Deploy to GitHub Pages |
| `make deploy` | Build for deployment |
| `make quickstart` | Install + build + start preview |

## 📦 Deployment

### Vercel
```bash
make deploy-vercel
```

### Netlify
```bash
make deploy-netlify
```

### GitHub Pages
```bash
make deploy-ghpages
```

### Any Static Host
```bash
make build
# Upload the contents of dist/ to your static host
```

## 🛠️ Built With

- [React](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — Build tool and dev server

## 📄 License

[MIT](LICENSE)

---

Generated from [cvsz/ztemplate](https://github.com/cvsz/ztemplate).
