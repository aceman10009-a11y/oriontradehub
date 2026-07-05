// src/services/marketDataService.js

let socket = null;
let activeSymbol = null;
let reconnectTimer = null;

const BINANCE_SYMBOLS = {
  "BTC/USD": "btcusdt",
  "ETH/USD": "ethusdt",
  "SOL/USD": "solusdt",
  "XRP/USD": "xrpusdt",
  "ADA/USD": "adausdt",
  "DOGE/USD": "dogeusdt",
};

const BINANCE_ASSETS = Object.keys(BINANCE_SYMBOLS);

export function subscribeToPrice(symbol, onPrice, onStatus) {
  activeSymbol = symbol;

  if (!BINANCE_ASSETS.includes(symbol)) {
    onStatus?.(false);
    console.warn(`${symbol} will use Twelve Data later.`);
    return () => {};
  }

  connect(symbol, onPrice, onStatus);

  return () => {
    clearTimeout(reconnectTimer);

    if (socket) {
      socket.onopen = null;
      socket.onmessage = null;
      socket.onerror = null;
      socket.onclose = null;

      socket.close();
      socket = null;
    }

    activeSymbol = null;
  };
}

function connect(symbol, onPrice, onStatus) {
  if (socket) {
    socket.close();
    socket = null;
  }

  const stream = BINANCE_SYMBOLS[symbol];

  socket = new WebSocket(
    `wss://stream.binance.com:9443/ws/${stream}@trade`
  );

socket.onopen = () => {
  console.log(`✅ Binance Connected: ${symbol}`);
  console.log("Calling onStatus(true):", typeof onStatus);

  onStatus?.(true);
};
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const price = Number(data.p);

    if (!Number.isNaN(price)) {
      onPrice(price);
    }
  };

  socket.onerror = (err) => {
    console.error("Binance Error", err);
    onStatus?.(false);
  };

  socket.onclose = (event) => {
    console.log("Binance Closed");
    onStatus?.(false);

    if (activeSymbol === symbol) {
      reconnectTimer = setTimeout(() => {
        console.log("Reconnecting...");
        connect(symbol, onPrice, onStatus);
      }, 2000);
    }
  };
}