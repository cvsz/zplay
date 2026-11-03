import React, { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

// ============================================================
// GAME CONFIGURATION
// ============================================================

const SYMBOLS = [
  { id: 'A', name: 'Ace', color: '#FFD700', weight: 20, payout: [10, 25, 100] },
  { id: 'K', name: 'King', color: '#FF6B6B', weight: 20, payout: [8, 20, 80] },
  { id: 'Q', name: 'Queen', color: '#4ECDC4', weight: 20, payout: [6, 15, 60] },
  { id: 'J', name: 'Jack', color: '#45B7D1', weight: 20, payout: [5, 12, 50] },
  { id: '10', name: 'Ten', color: '#FFA07A', weight: 20, payout: [4, 10, 40] },
  { id: 'WILD', name: 'Wild', color: '#9B59B6', weight: 5, payout: [50, 200, 500] },
  { id: 'SCATTER', name: 'Scatter', color: '#E74C3C', weight: 3, payout: [0, 0, 0] },
  { id: 'BONUS', name: 'Bonus', color: '#F39C12', weight: 3, payout: [0, 0, 0] },
]

// 6 games: 9, 10, 25, 30, 40 paylines + Scatter Win
const GAMES = [
  {
    id: 'game1',
    name: 'Lucky 9 Lines',
    paylines: 9,
    minBet: 1,
    maxBet: 100,
    rtp: 96.5,
    volatility: 'Medium',
    unlockLevel: 1,
  },
  {
    id: 'game2',
    name: 'Ten Line Treasure',
    paylines: 10,
    minBet: 1,
    maxBet: 150,
    rtp: 96.8,
    volatility: 'Medium',
    unlockLevel: 2,
  },
  {
    id: 'game3',
    name: '25 Payline Fortune',
    paylines: 25,
    minBet: 5,
    maxBet: 250,
    rtp: 97.0,
    volatility: 'High',
    unlockLevel: 5,
  },
  {
    id: 'game4',
    name: '30 Line Jackpot',
    paylines: 30,
    minBet: 10,
    maxBet: 300,
    rtp: 97.2,
    volatility: 'High',
    unlockLevel: 10,
  },
  {
    id: 'game5',
    name: '40 Line Empire',
    paylines: 40,
    minBet: 20,
    maxBet: 500,
    rtp: 97.5,
    volatility: 'Very High',
    unlockLevel: 15,
  },
  {
    id: 'game6',
    name: 'Scatter Win Riches',
    paylines: 0,
    minBet: 5,
    maxBet: 200,
    rtp: 96.9,
    volatility: 'High',
    unlockLevel: 8,
  },
]

const PAYLINE_PATTERNS = {
  9: [
    [1, 1, 1, 1, 1], // middle
    [0, 0, 0, 0, 0], // top
    [2, 2, 2, 2, 2], // bottom
    [0, 1, 2, 1, 0], // V
    [2, 1, 0, 1, 2], // inverted V
    [0, 0, 1, 2, 2], // diagonal down-right
    [2, 2, 1, 0, 0], // diagonal up-right
    [1, 0, 0, 0, 1], // C
    [1, 2, 2, 2, 1], // inverted C
  ],
  10: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 2, 2, 2, 1],
    [0, 2, 1, 2, 0],
  ],
  25: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 2, 2, 2, 1],
    [0, 2, 1, 2, 0],
    [2, 0, 1, 0, 2],
    [0, 0, 0, 1, 2],
    [2, 2, 2, 1, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 2, 2, 2],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [0, 2, 0, 2, 0],
    [2, 0, 2, 0, 2],
    [1, 0, 2, 0, 1],
    [1, 2, 0, 2, 1],
    [0, 1, 2, 0, 2],
    [2, 1, 0, 2, 0],
    [0, 2, 1, 0, 2],
    [2, 0, 1, 2, 0],
  ],
  30: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 2, 2, 2, 1],
    [0, 2, 1, 2, 0],
    [2, 0, 1, 0, 2],
    [0, 0, 0, 1, 2],
    [2, 2, 2, 1, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 2, 2, 2],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [0, 2, 0, 2, 0],
    [2, 0, 2, 0, 2],
    [1, 0, 2, 0, 1],
    [1, 2, 0, 2, 1],
    [0, 1, 2, 0, 2],
    [2, 1, 0, 2, 0],
    [0, 2, 1, 0, 2],
    [2, 0, 1, 2, 0],
    [0, 0, 2, 0, 0],
    [2, 0, 0, 0, 2],
    [0, 2, 2, 2, 0],
    [1, 1, 1, 0, 2],
  ],
  40: [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [1, 0, 0, 0, 1],
    [1, 2, 2, 2, 1],
    [0, 2, 1, 2, 0],
    [2, 0, 1, 0, 2],
    [0, 0, 0, 1, 2],
    [2, 2, 2, 1, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 2, 2, 2],
    [0, 1, 0, 1, 0],
    [2, 1, 2, 1, 2],
    [0, 2, 0, 2, 0],
    [2, 0, 2, 0, 2],
    [1, 0, 2, 0, 1],
    [1, 2, 0, 2, 1],
    [0, 1, 2, 0, 2],
    [2, 1, 0, 2, 0],
    [0, 2, 1, 0, 2],
    [2, 0, 1, 2, 0],
    [0, 0, 2, 0, 0],
    [2, 0, 0, 0, 2],
    [0, 2, 2, 2, 0],
    [1, 1, 1, 0, 2],
    [2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2],
    [1, 0, 1, 0, 1],
    [2, 0, 2, 0, 2],
    [0, 2, 0, 2, 0],
    [1, 2, 1, 2, 1],
    [0, 1, 0, 2, 1],
    [2, 1, 2, 0, 1],
    [1, 0, 2, 1, 0],
    [1, 2, 0, 1, 2],
  ],
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [credits, setCredits] = useState(10000)
  const [level, setLevel] = useState(1)
  const [xp, setXp] = useState(0)
  const [selectedGame, setSelectedGame] = useState(GAMES[0])
  const [betAmount, setBetAmount] = useState(1)
  const [totalBet, setTotalBet] = useState(1)
  const [isSpinning, setIsSpinning] = useState(false)
  const [winAmount, setWinAmount] = useState(0)
  const [lastWin, setLastWin] = useState(0)
  const [reels, setReels] = useState([
    ['A', 'K', 'Q'],
    ['A', 'K', 'Q'],
    ['A', 'K', 'Q'],
    ['A', 'K', 'Q'],
    ['A', 'K', 'Q'],
  ])
  const [reelStopped, setReelStopped] = useState([false, false, false, false, false])
  const [showBonus, setShowBonus] = useState(false)
  const [bonusType, setBonusType] = useState(null)
  const [bonusWins, setBonusWins] = useState(0)
  const [showIAP, setShowIAP] = useState(false)
  const [lastBonusTime, setLastBonusTime] = useState(Date.now() - 2 * 60 * 60 * 1000)
  const [facebookCredits, setFacebookCredits] = useState(0)
  const [showWinPopup, setShowWinPopup] = useState(false)
  const [autoSpinCount, setAutoSpinCount] = useState(0)
  const [winningPaylines, setWinningPaylines] = useState([])

  const spinRef = useRef(null)
  const autoSpinRef = useRef(null)
  const bonusTimerRef = useRef(null)

  // Initialize XP needed for level
  const xpForNextLevel = level * 1000

  // Check if 2-hour bonus is available
  const canClaimHourlyBonus =
    Date.now() - lastBonusTime >= 2 * 60 * 60 * 1000

  // Update total bet based on paylines and bet per line
  useEffect(() => {
    const paylines = selectedGame.paylines === 0 ? 1 : selectedGame.paylines
    setTotalBet(betAmount * paylines)
  }, [betAmount, selectedGame.paylines])

  // Level up check
  useEffect(() => {
    if (xp >= xpForNextLevel) {
      setLevel((l) => l + 1)
      setXp(0)
    }
  }, [xp, xpForNextLevel, level])

  // Unlock games based on level
  const availableGames = GAMES.filter((g) => g.unlockLevel <= level)

  // Spin the reels
  const spin = useCallback(() => {
    if (isSpinning || credits < totalBet) return

    setCredits((c) => c - totalBet)
    setIsSpinning(true)
    setWinAmount(0)
    setLastWin(0)
    setShowBonus(false)
    setBonusWins(0)
    setReelStopped([false, false, false, false, false])
    setWinningPaylines([])

    // Generate random symbols for each reel position
    const newReels = []
    for (let i = 0; i < 5; i++) {
      const column = []
      for (let j = 0; j < 3; j++) {
        column.push(randomSymbol())
      }
      newReels.push(column)
    }
    setReels(newReels)

    // Stop reels sequentially
    let stopIndex = 0
    const stopInterval = setInterval(() => {
      if (stopIndex >= 5) {
        clearInterval(stopInterval)
        evaluateSpin()
        setIsSpinning(false)
        return
      }
      setReelStopped((prev) => {
        const next = [...prev]
        next[stopIndex] = true
        return next
      })
      stopIndex++
    }, 400)

    spinRef.current = stopInterval
  }, [isSpinning, credits, totalBet, selectedGame.paylines])

  // Auto spin
  const toggleAutoSpin = () => {
    if (autoSpinCount > 0) {
      setAutoSpinCount(0)
      if (autoSpinRef.current) clearInterval(autoSpinRef.current)
      return
    }
    setAutoSpinCount(10)
    autoSpinRef.current = setInterval(() => {
      if (autoSpinCount <= 0 || credits < totalBet) {
        setAutoSpinCount(0)
        clearInterval(autoSpinRef.current)
        return
      }
      setAutoSpinCount((c) => c - 1)
      spin()
    }, 2000)
  }

  // Random symbol based on weights
  const randomSymbol = () => {
    const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0)
    let random = Math.random() * totalWeight
    for (const symbol of SYMBOLS) {
      if (random < symbol.weight) return symbol.id
      random -= symbol.weight
    }
    return 'A'
  }

  // Evaluate spin result
  const evaluateSpin = () => {
    const grid = reels // 5 columns x 3 rows
    const paylines =
      selectedGame.id === 'game6' ? [] : PAYLINE_PATTERNS[selectedGame.paylines] || []

    let totalWin = 0
    const wonPaylines = []

    if (selectedGame.id === 'game6') {
      // Scatter Win game - count scatters anywhere
      const scatterCount = grid.flat().filter((s) => s === 'SCATTER').length
      if (scatterCount >= 3) {
        const scatterPayout = [0, 0, 5, 20, 100, 500][scatterCount] || 500
        totalWin = scatterPayout * betAmount
        wonPaylines.push({ type: 'scatter', count: scatterCount, payout: totalWin })
      }
      // Also check regular paylines for scatter game
      const regularWin = evaluatePaylines(grid, paylines, betAmount)
      totalWin += regularWin.win
      wonPaylines.push(...regularWin.wonPaylines)
    } else {
      const result = evaluatePaylines(grid, paylines, betAmount)
      totalWin = result.win
      wonPaylines.push(...result.wonPaylines)
    }

    // Check for bonus symbols (3+ BONUS triggers bonus game)
    const bonusCount = grid.flat().filter((s) => s === 'BONUS').length
    if (bonusCount >= 3) {
      setShowBonus(true)
      setBonusType('treasure')
    }

    // Check for scatter (3+ SCATTER triggers free spins in non-scatter games)
    const scatterCount = grid.flat().filter((s) => s === 'SCATTER').length
    if (scatterCount >= 3 && selectedGame.id !== 'game6') {
      setShowBonus(true)
      setBonusType('wheel')
    }

    // Jackpot check (random chance based on bet)
    const jackpotRoll = Math.random()
    if (jackpotRoll < 0.001 * (totalBet / 100)) {
      setShowBonus(true)
      setBonusType('jackpot')
      totalWin += 5000 * totalBet
      wonPaylines.push({ type: 'jackpot', payout: 5000 * totalBet })
    }

    setWinAmount(totalWin)
    setLastWin(totalWin)
    setCredits((c) => c + totalWin)
    setXp((x) => x + Math.floor(totalWin / 10))
    setWinningPaylines(wonPaylines)

    if (totalWin > 0) {
      setShowWinPopup(true)
      setTimeout(() => setShowWinPopup(false), 3000)
    }
  }

  // Evaluate standard paylines
  const evaluatePaylines = (grid, paylines, bet) => {
    let win = 0
    const wonPaylines = []

    for (let i = 0; i < paylines.length; i++) {
      const pattern = paylines[i]
      const symbols = pattern.map((row, col) => grid[col][row])
      const first = symbols[0]

      if (first === 'WILD' || first === 'SCATTER' || first === 'BONUS') continue

      let matchLength = 1
      for (let k = 1; k < 5; k++) {
        if (symbols[k] === first || symbols[k] === 'WILD') {
          matchLength++
        } else {
          break
        }
      }

      if (matchLength >= 3) {
        const symbol = SYMBOLS.find((s) => s.id === first)
        const payout = symbol?.payout[matchLength - 1] || 0
        const lineWin = payout * bet
        win += lineWin
        wonPaylines.push({
          line: i + 1,
          symbols: symbols.slice(0, matchLength),
          payout: lineWin,
          matchLength,
        })
      }
    }

    return { win, wonPaylines }
  }

  // Bonus game handlers
  const spinWheel = () => {
    const prizes = [100, 200, 500, 1000, 2000, 5000, 10000]
    const prize = prizes[Math.floor(Math.random() * prizes.length)]
    setBonusWins((b) => b + prize)
    setCredits((c) => c + prize)
    setTimeout(() => {
      setShowBonus(false)
      setBonusType(null)
    }, 1000)
  }

  const pickTreasure = (index) => {
    const prizes = [50, 100, 200, 500, 1000, 2000, 0, 0]
    const prize = prizes[index]
    setBonusWins((b) => b + prize)
    setCredits((c) => c + prize)
    setTimeout(() => {
      setShowBonus(false)
      setBonusType(null)
    }, 1000)
  }

  const revealCredit = () => {
    const prize = Math.floor(Math.random() * 1000) + 100
    setBonusWins((b) => b + prize)
    setCredits((c) => c + prize)
    setTimeout(() => {
      setShowBonus(false)
      setBonusType(null)
    }, 1000)
  }

  const revealJackpot = () => {
    const jackpots = [1000, 5000, 10000, 50000, 100000]
    const prize = jackpots[Math.floor(Math.random() * jackpots.length)]
    setBonusWins((b) => b + prize)
    setCredits((c) => c + prize)
    setTimeout(() => {
      setShowBonus(false)
      setBonusType(null)
    }, 1000)
  }

  // Claim hourly bonus
  const claimHourlyBonus = () => {
    setCredits((c) => c + 200)
    setLastBonusTime(Date.now())
  }

  // IAP purchase
  const buyCredits = (amount, price) => {
    setCredits((c) => c + amount)
    setShowIAP(false)
  }

  // Facebook share/like
  const shareFacebook = () => {
    setCredits((c) => c + 500)
    setFacebookCredits((f) => f + 500)
  }

  const likeFacebook = () => {
    setCredits((c) => c + 300)
    setFacebookCredits((f) => f + 300)
  }

  // Change bet
  const increaseBet = () => {
    if (betAmount < selectedGame.maxBet) {
      setBetAmount((b) => b + 1)
    }
  }

  const decreaseBet = () => {
    if (betAmount > selectedGame.minBet) {
      setBetAmount((b) => b - 1)
    }
  }

  // Format currency
  const formatCredits = (n) => n.toLocaleString()

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="logo">ZPLAY SLOTS</div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-label">Credits</span>
            <span className="stat-value">{formatCredits(credits)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="stat">
            <span className="stat-label">XP</span>
            <span className="stat-value">{xp}/{xpForNextLevel}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Bet</span>
            <span className="stat-value">{formatCredits(totalBet)}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => setShowIAP(true)}>
            Buy Credits
          </button>
          <button
            className={`btn btn-${canClaimHourlyBonus ? 'success' : 'outline'}`}
            onClick={claimHourlyBonus}
            disabled={!canClaimHourlyBonus}
          >
            {canClaimHourlyBonus ? 'Collect 200 Bonus' : 'Bonus in 2h'}
          </button>
        </div>
      </header>

      {/* Game Selection */}
      <div className="game-selector">
        <h2>Select Game</h2>
        <div className="game-list">
          {availableGames.map((game) => {
            const isSelected = selectedGame.id === game.id
            return (
              <button
                key={game.id}
                className={`game-card ${isSelected ? 'selected' : ''} ${level < game.unlockLevel ? 'locked' : ''}`}
                onClick={() => setSelectedGame(game)}
                disabled={level < game.unlockLevel}
              >
                {level < game.unlockLevel && (
                  <div className="lock-badge">Level {game.unlockLevel}</div>
                )}
                <div className="game-name">{game.name}</div>
                <div className="game-details">
                  {game.paylines} Paylines • RTP {game.rtp}% • {game.volatility}
                </div>
                <div className="game-bet">Bet: {game.minBet}-{game.maxBet}</div>
              </button>
            )
          })}
        </div>
        {!availableGames.includes(selectedGame) && (
          <div className="unlock-msg">
            Play more to unlock higher-payline games!
          </div>
        )}
      </div>

      {/* Main Game Area */}
      <main className="game-area">
        {/* Bet Controls */}
        <div className="bet-controls">
          <button className="btn btn-outline" onClick={decreaseBet} disabled={betAmount <= selectedGame.minBet}>
            −
          </button>
          <span className="bet-value">{betAmount} per line</span>
          <button
            className="btn btn-outline"
            onClick={increaseBet}
            disabled={betAmount >= selectedGame.maxBet}
          >
            +
          </button>
          <span className="total-bet">Total: {formatCredits(totalBet)}</span>
        </div>

        {/* Reels */}
        <div className="reels-container">
          {reels.map((column, colIndex) => (
            <div key={colIndex} className="reel-column">
              {column.map((symbolId, rowIndex) => {
                const symbol = SYMBOLS.find((s) => s.id === symbolId)
                const isWinning = winningPaylines.some(
                  (wp) => wp.line - 1 === colIndex && wp.symbols.includes(symbolId)
                )
                return (
                  <div
                    key={rowIndex}
                    className={`reel-cell ${reelStopped[colIndex] ? 'stopped' : 'spinning'} ${isWinning ? 'winning' : ''}`}
                    style={{ backgroundColor: symbol?.color + '20' }}
                  >
                    <span className="symbol">{symbolId}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Spin Controls */}
        <div className="spin-controls">
          <button
            className="btn btn-spin"
            onClick={spin}
            disabled={isSpinning || credits < totalBet}
          >
            {isSpinning ? 'SPINNING...' : 'SPIN'}
          </button>
          <button
            className="btn btn-auto"
            onClick={toggleAutoSpin}
            disabled={credits < totalBet}
          >
            {autoSpinCount > 0 ? `Auto: ${autoSpinCount}` : 'Auto Spin'}
          </button>
        </div>

        {/* Win Display */}
        {winAmount > 0 && (
          <div className="win-display">
            🎉 WIN {formatCredits(winAmount)} Credits!
          </div>
        )}

        {/* Win Popup */}
        {showWinPopup && (
          <div className="win-popup">
            <div className="win-popup-content">
              <h2>Big Win!</h2>
              <div className="win-amount">{formatCredits(lastWin)}</div>
              <button className="btn btn-success" onClick={() => setShowWinPopup(false)}>
                Collect
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bonus Games */}
      {showBonus && (
        <div className="bonus-overlay">
          <div className="bonus-modal">
            <h2 className="bonus-title">{bonusType === 'wheel' ? 'Spin the Wheel Bonus' : bonusType === 'treasure' ? 'Discover the Treasure' : bonusType === 'credit' ? 'Reveal a Credit Value' : 'Jackpot Reveal'}</h2>
            <div className="bonus-content">
              {bonusType === 'wheel' && (
                <div className="wheel-bonus">
                  <p>Spin the wheel for a prize!</p>
                  <button className="btn btn-success" onClick={spinWheel}>
                    Spin Wheel
                  </button>
                </div>
              )}
              {bonusType === 'treasure' && (
                <div className="treasure-bonus">
                  <p>Pick a treasure chest!</p>
                  <div className="treasure-chests">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <button
                        key={i}
                        className="chest-btn"
                        onClick={() => pickTreasure(i)}
                      >
                        🎁 Chest {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {bonusType === 'credit' && (
                <div className="credit-bonus">
                  <p>Reveal your credit value!</p>
                  <button className="btn btn-success" onClick={revealCredit}>
                    Reveal Credit
                  </button>
                </div>
              )}
              {bonusType === 'jackpot' && (
                <div className="jackpot-bonus">
                  <p>Jackpot Reveal!</p>
                  <button className="btn btn-success" onClick={revealJackpot}>
                    Reveal Jackpot
                  </button>
                </div>
              )}
            </div>
            <div className="bonus-wins">
              Bonus Wins: {formatCredits(bonusWins)}
            </div>
          </div>
        </div>
      )}

      {/* Free Spins / Scatter triggers info */}
      <div className="info-panel">
        <div className="info-item">
          <strong>Free Games:</strong> Triggered by 3+ SCATTER symbols
        </div>
        <div className="info-item">
          <strong>Bonus Games:</strong> Triggered by 3+ BONUS symbols
        </div>
        <div className="info-item">
          <strong>Jackpot:</strong> Random chance based on bet size
        </div>
        <div className="info-item">
          <strong>Level Up:</strong> Earn XP to unlock higher payline games
        </div>
      </div>

      {/* Social Features */}
      <div className="social-panel">
        <h3>Social Rewards</h3>
        <div className="social-actions">
          <button className="btn btn-social" onClick={shareFacebook}>
            📘 Share on Facebook (+500 credits)
          </button>
          <button className="btn btn-social" onClick={likeFacebook}>
            👍 Like Facebook Page (+300 credits)
          </button>
          <div className="facebook-credits">Facebook Credits: {formatCredits(facebookCredits)}</div>
        </div>
      </div>

      {/* IAP Modal */}
      {showIAP && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Buy More Credits</h2>
            <div className="iap-options">
              {[
                { credits: 5000, price: '$4.99' },
                { credits: 15000, price: '$12.99' },
                { credits: 50000, price: '$39.99' },
                { credits: 150000, price: '$99.99' },
              ].map((opt) => (
                <button
                  key={opt.credits}
                  className="btn btn-iap"
                  onClick={() => buyCredits(opt.credits, opt.price)}
                >
                  {formatCredits(opt.credits)} Credits - {opt.price}
                </button>
              ))}
            </div>
            <button className="btn btn-outline" onClick={() => setShowIAP(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>ZPlay Slot Suite • Free-to-play social casino</p>
        <p>Level {level} • {formatCredits(credits)} Credits</p>
      </footer>
    </div>
  )
}
