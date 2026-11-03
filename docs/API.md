# API Reference

## Game Configuration

### GAMES Array

Defined in `src/App.jsx`. Each game object has:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique game identifier |
| `name` | string | Display name |
| `paylines` | number | Number of paylines (0 for scatter games) |
| `minBet` | number | Minimum bet per line |
| `maxBet` | number | Maximum bet per line |
| `rtp` | number | Return to player percentage |
| `volatility` | string | Volatility level |
| `unlockLevel` | number | Player level required to unlock |

### SYMBOLS Array

Each symbol object has:

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Symbol identifier |
| `name` | string | Display name |
| `color` | string | Hex color code |
| `weight` | number | Random selection weight |
| `payout` | number[] | Payout multipliers for 3/4/5 matches |

## State Management

### Credits

Player's current credit balance. Deducts on spin, adds on win.

### Level & XP

- XP is earned based on win amount (`win / 10`)
- Leveling up unlocks new games
- XP resets to 0 on level up

### Bet Amount

- Adjustable from `minBet` to `maxBet` per line
- Total bet = bet amount × paylines (or 1 for scatter games)

## Events

No external API events. All game logic is internal to the browser.

## Security Notes

This is a social/demo slot suite. It does not involve real money. Do not use for real-money gambling without proper regulatory compliance and certified random number generation.
