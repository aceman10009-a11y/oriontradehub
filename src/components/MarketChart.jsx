import { useEffect, useRef, useState } from "react";

const timeframeSettings = {
  "1m": { speed: 400, volatility: 0.006, candles: 80 },
  "5m": { speed: 800, volatility: 0.01, candles: 70 },
  "10m": { speed: 1200, volatility: 0.012, candles: 60 },
  "30m": { speed: 1800, volatility: 0.015, candles: 50 },
  "1h": { speed: 2500, volatility: 0.02, candles: 40 },
  "1d": { speed: 3500, volatility: 0.03, candles: 30 },
  "1w": { speed: 5000, volatility: 0.05, candles: 20 },
  "1mo": { speed: 7000, volatility: 0.08, candles: 15 },
};

const assetProfiles = {
  "BTC/USD": {
    volatility: 0.012,
    drift: 0.0006,
  },

  "ETH/USD": {
    volatility: 0.015,
    drift: 0.0007,
  },

  "SOL/USD": {
    volatility: 0.022,
    drift: 0.0009,
  },

  "XAU/USD": {
    volatility: 0.004,
    drift: 0.0001,
  },

  "EUR/USD": {
    volatility: 0.0015,
    drift: 0.00002,
  },

  NASDAQ: {
    volatility: 0.006,
    drift: 0.0003,
  },
};

export default function MarketChart({
  symbol = "BTC/USD",
  timeframe = "1m",
  currentPrice,
  onPriceUpdate,
}) {
  const [candles, setCandles] = useState([]);
  const priceRef = useRef(100);
  const intervalRef = useRef(null);

  const baseSettings =
    timeframeSettings[timeframe] || timeframeSettings["1m"];

  const assetSettings =
    assetProfiles[symbol] || {
      volatility: 0.006,
      drift: 0.0003,
    };

  const settings = {
    ...baseSettings,
    volatility: assetSettings.volatility,
    drift: assetSettings.drift,
  };

  // SAFE candle generator (now inside component)
 function generateCandle(prevPrice) {
  const open = prevPrice;

  // Natural market drift + random movement
  const drift = open * settings.drift;
  const randomMove =
    (Math.random() - 0.5) * open * settings.volatility;

  const close = Math.max(0.0001, open + drift + randomMove);

  // More realistic wick sizes
  const wickSize =
    open * settings.volatility * (0.15 + Math.random() * 0.35);

  const high = Math.max(open, close) + wickSize;
  const low = Math.max(
    0.0001,
    Math.min(open, close) - wickSize
  );

  return {
    open,
    high,
    low,
    close,
  };
}

// INIT + LIVE STREAM
useEffect(() => {
  setCandles([]);

  const fallbackPrices = {
  "BTC/USD": 118000,
  "ETH/USD": 4200,
  "SOL/USD": 170,
  "XAU/USD": 3380,
  "EUR/USD": 1.17,
  "NASDAQ": 23941,
};

const basePrice =
  currentPrice ||
  fallbackPrices[symbol] ||
  100;

  priceRef.current = basePrice;

  const initial = [];
  let base = basePrice;

  for (let i = 0; i < settings.candles; i++) {
    const candle = generateCandle(base);
    base = candle.close;
    initial.push(candle);
  }

  setCandles(initial);
  priceRef.current = base;

  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];
        const basePrice = last ? last.close : priceRef.current;

        const newCandle = generateCandle(basePrice);

        const updated = [...prev.slice(-settings.candles), newCandle];

        priceRef.current = newCandle.close;
        return updated;
      });
    }, settings.speed);

    return () => clearInterval(intervalRef.current);
  }, [symbol, timeframe, currentPrice]);

  useEffect(() => {
    if (!onPriceUpdate || candles.length === 0) return;

    onPriceUpdate(candles[candles.length - 1].close);
  }, [candles, onPriceUpdate]);

  // SCALE
  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);

  const highest = Math.max(...highs);
  const lowest = Math.min(...lows);

  const padding = (highest - lowest) * 0.15;

  const max = highest + padding;
  const min = lowest - padding;

  const range = max - min || 1;

  return (
   <div
  style={{
    background: "#0b0b0b",
    border: "1px solid #222",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "15px",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
  }}
>
  {/* Header */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    }}
  >
    <strong style={{ color: "#fff" }}>{symbol}</strong>

    <span
      style={{
        color: "#888",
        fontSize: "12px",
      }}
    >
      LIVE • {timeframe}
    </span>
  </div>

  {/* Chart */}
  <div
    style={{
      height: "220px",
      display: "flex",
      alignItems: "flex-end",
      marginTop: "10px",
      gap: "2px",
      overflow: "hidden",
      width: "100%",
      position: "relative",
      boxSizing: "border-box",
    }}
  >
       {candles.map((c, i) => {
  const isGreen = c.close >= c.open;

  const height =
    Math.max(((c.high - c.low) / range) * 100, 45);

  const bodyHeight =
    Math.max((Math.abs(c.close - c.open) / range) * 50, 3.1);

  const bottom =
    ((Math.min(c.open, c.close) - min) / range) * 100;

  return (
    <div
      key={i}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        position: "relative",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Wick */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: `${((c.low - min) / range) * 100}%`,
          width: "1px",
          height: `${height}%`,
          background: isGreen ? "#4caf50" : "#f44336",
          transform: "translateX(-50%)",
          opacity: 0.7,
        }}
      />

      {/* Body */}
      <div
        style={{
          position: "absolute",
          bottom: `${bottom}%`,
          left: "15%",
          width: "70%",
          height: `${Math.max(bodyHeight, 3.1)}%`,
          background: isGreen ? "#4caf50" : "#f44336",
          borderRadius: "2px",
        }}
      />
    </div>
  );
})}
      </div>
    </div>
  );
}