export function getTradingViewSymbol(symbol) {
  const map = {
    // Crypto
    "BTC/USD": "BINANCE:BTCUSDT",
    "ETH/USD": "BINANCE:ETHUSDT",
    "SOL/USD": "BINANCE:SOLUSDT",

    // Forex
    "EUR/USD": "FX:EURUSD",
    "GBP/USD": "FX:GBPUSD",

    // Commodities
    "XAU/USD": "TVC:GOLD",

    // Indices
    "NASDAQ": "NASDAQ:NDX",

    // Stocks
    "AAPL": "NASDAQ:AAPL",
  };

  return map[symbol] || "BINANCE:BTCUSDT";
}