const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;

const listeners = [];
const prices = {};
const sockets = {};

/**
 * Symbols we want Twelve Data to stream
 */
const symbols = [
  "EUR/USD",
  "GBP/USD",
  "XAU/USD",
  "AAPL",
  "IXIC",
];

/**
 * Connect one WebSocket per symbol
 */
symbols.forEach(connectSymbol);

function connectSymbol(symbol) {
  const ws = new WebSocket(
    `wss://ws.twelvedata.com/v1/quotes/price?apikey=${API_KEY}`
  );

  sockets[symbol] = ws;

  ws.onopen = () => {
    console.log("✅ Twelve Data Connected:", symbol);

    ws.send(
      JSON.stringify({
        action: "subscribe",
        params: {
          symbols: symbol,
        },
      })
    );
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (!data.price) return;

    prices[symbol] = {
      symbol,
      price: Number(data.price),
    };

    listeners.forEach((cb) => cb({ ...prices }));
  };

  ws.onerror = (err) => {
    console.error("Twelve Data Error:", err);
  };

  ws.onclose = () => {
    console.log("Twelve Data Closed:", symbol);
  };
}

/**
 * Subscribe
 */
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