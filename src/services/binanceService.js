import marketDataAggregator from "./aggregator/marketDataAggregator";

const streams = [
  "btcusdt",
  "ethusdt",
  "solusdt",
  "bnbusdt",
  "xrpusdt",
  "adausdt",
  "dogeusdt",
];

const socket = new WebSocket(
  `wss://stream.binance.com:9443/stream?streams=${streams
    .map((s) => `${s}@miniTicker`)
    .join("/")}`
);

const prices = {};

const listeners = [];

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  const data = message.data;

  const symbol = data.s.replace("USDT", "/USD");

  prices[symbol] = {
    symbol,
    price: Number(data.c),
    change: Number(data.P),
    timestamp: Date.now(),
    source: "binance",
  };

  // Send update to the centralized Market Data Aggregator
  marketDataAggregator.updatePrice(symbol, prices[symbol]);

  // Keep existing subscribers working
  listeners.forEach((callback) => callback({ ...prices }));
};

socket.onerror = (error) => {
  console.error("Binance WebSocket Error:", error);
};

socket.onclose = () => {
  console.warn("Binance WebSocket Closed");
};

export function subscribePrices(callback) {
  listeners.push(callback);

  callback({ ...prices });

  return () => {
    const index = listeners.indexOf(callback);

    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}