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
const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;

const BASE_URL = "https://api.twelvedata.com";
export async function getLiveQuote(symbol) {
  try {
    const response = await fetch(
      `${BASE_URL}/price?symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    return Number(data.price);
  } catch (error) {
    console.error(`Failed to fetch ${symbol}:`, error);
    return null;
  }
}
export async function getLiveQuotes(symbols) {
  const results = {};

  await Promise.all(
    symbols.map(async (symbol) => {
      results[symbol] = await getLiveQuote(symbol);
    })
  );

  return results;
}