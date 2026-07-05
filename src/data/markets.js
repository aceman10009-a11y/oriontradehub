// src/data/markets.js

export const markets = [
  // =========================
  // CRYPTO
  // =========================
  {
    id: "BTC/USD",
    name: "Bitcoin",
    category: "Crypto",
    provider: "binance",
    exchangeSymbol: "BTCUSDT",
  },
  {
    id: "ETH/USD",
    name: "Ethereum",
    category: "Crypto",
    provider: "binance",
    exchangeSymbol: "ETHUSDT",
  },
  {
    id: "SOL/USD",
    name: "Solana",
    category: "Crypto",
    provider: "binance",
    exchangeSymbol: "SOLUSDT",
  },

  // =========================
  // FOREX
  // =========================
  {
    id: "EUR/USD",
    name: "Euro / US Dollar",
    category: "Forex",
    provider: "twelveData",
    exchangeSymbol: "EUR/USD",
  },
  {
    id: "GBP/USD",
    name: "British Pound / US Dollar",
    category: "Forex",
    provider: "twelveData",
    exchangeSymbol: "GBP/USD",
  },

  // =========================
  // COMMODITIES
  // =========================
  {
    id: "XAU/USD",
    name: "Gold",
    category: "Commodities",
    provider: "twelveData",
    exchangeSymbol: "XAU/USD",
  },

  // =========================
  // INDICES
  // =========================
  {
    id: "NASDAQ",
    name: "NASDAQ 100",
    category: "Indices",
    provider: "twelveData",
    exchangeSymbol: "IXIC",
  },

  // =========================
  // STOCKS
  // =========================
  {
    id: "AAPL",
    name: "Apple",
    category: "US Stocks",
    provider: "twelveData",
    exchangeSymbol: "AAPL",
  },
];