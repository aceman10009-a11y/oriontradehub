const basePrices = {
  BTC: 105000,
  ETH: 2600,
  BNB: 680,
  SOL: 155,
  XRP: 2.1,
  ADA: 0.72,
  DOGE: 0.18,
  EUR: 1.17,
  GBP: 1.35,
  USD: 1.00,
  AAPL: 215,
  MSFT: 505,
  NVDA: 182,
  TSLA: 345,
  AMZN: 228,
  META: 785,
  GOOGL: 182
};

export function getBasePrice(symbol) {
  const key = symbol.split("/")[0];
  return basePrices[key] || 100;
}

export function generateNextPrice(price) {
  const movement = (Math.random() - 0.5) * (price * 0.002);
  return +(price + movement).toFixed(6);
}

export function generateCandle(previousClose) {
  const open = previousClose;
  const close = generateNextPrice(open);

  const high = Math.max(open, close) + Math.random() * open * 0.001;
  const low = Math.min(open, close) - Math.random() * open * 0.001;

  return {
    open,
    high,
    low,
    close
  };
}