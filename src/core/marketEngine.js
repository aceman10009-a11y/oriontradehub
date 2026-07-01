// src/core/marketEngine.js

export const timeframes = ["1m", "5m", "30m", "1h", "1w", "1M"];

export const normalizePriceFeed = (price, timeframe) => {
  const volatilityMap = {
    "1m": 1,
    "5m": 2,
    "30m": 5,
    "1h": 10,
    "1w": 25,
    "1M": 50,
  };

  return price * (1 + (Math.random() - 0.5) / volatilityMap[timeframe]);
};