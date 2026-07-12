import marketDataAggregator from "./aggregator/marketDataAggregator";

const SYMBOL_MAP = {
  BTCUSDT: "BTC/USD",
  ETHUSDT: "ETH/USD",
  SOLUSDT: "SOL/USD",
  BNBUSDT: "BNB/USD",
  XRPUSDT: "XRP/USD",
  ADAUSDT: "ADA/USD",
  DOGEUSDT: "DOGE/USD",
  AVAXUSDT: "AVAX/USD",
  LINKUSDT: "LINK/USD",
};

const streams = Object.keys(SYMBOL_MAP)
  .map((symbol) => `${symbol.toLowerCase()}@miniTicker`)
  .join("/");

let socket = null;
let reconnectTimer = null;

const prices = {};
const listeners = [];

function notifyListeners() {
  const snapshot = { ...prices };
  listeners.forEach((callback) => callback(snapshot));
}

function connect() {
  // Prevent duplicate connections
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  console.log("🚀 Starting Binance Market Engine...");

  socket = new WebSocket(
    `wss://stream.binance.com:9443/stream?streams=${streams}`
  );

  socket.onopen = () => {
    console.log("✅ Binance Market Engine Connected");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (!message.data) return;

    const data = message.data;

    const symbol = SYMBOL_MAP[data.s];

    if (!symbol) return;

    const priceData = {
      symbol,
      price: Number(data.c),
      change: Number(data.P || 0),
      timestamp: Date.now(),
      source: "binance",
    };

    prices[symbol] = priceData;

    // Update the global market aggregator
    marketDataAggregator.updatePrice(symbol, priceData);

    // Notify subscribers
    notifyListeners();
  };

  socket.onerror = (error) => {
    console.error("❌ Binance WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.warn("⚠️ Binance disconnected. Reconnecting in 2 seconds...");

    socket = null;

    clearTimeout(reconnectTimer);

    reconnectTimer = setTimeout(connect, 2000);
  };
}

export function startBinanceService() {
  connect();
}

export function stopBinanceService() {
  clearTimeout(reconnectTimer);

  if (socket) {
    socket.close();
    socket = null;
  }
}

export function subscribePrices(callback) {
  listeners.push(callback);

  callback({ ...prices });

  return () => {
    const index = listeners.indexOf(callback);

    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
}