import marketDataAggregator from "./aggregator/marketDataAggregator";

const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY;

console.log("🔑 TwelveData API Key:", API_KEY);

const listeners = [];
const prices = {};

let socket = null;
let reconnectTimer = null;


/*
|--------------------------------------------------------------------------
| Allowed Twelve Data Streams
|--------------------------------------------------------------------------
*/

const SYMBOLS = [
  // Forex
  "EUR/USD",
  "GBP/USD",

  // Commodity
  "XAU/USD",

  // Stocks
  "AAPL",
  "NVDA",
];


/*
|--------------------------------------------------------------------------
| Provider → Application Symbol Mapping
|--------------------------------------------------------------------------
*/

const SYMBOL_MAP = {};

function notifyListeners() {
  listeners.forEach((callback) => {
    callback({ ...prices });
  });
}



function connect() {

  if (!API_KEY) {
    console.error(
      "❌ Twelve Data API key missing. Check .env file."
    );
    return;
  }


  if (
    socket &&
    (
      socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING
    )
  ) {
    return;
  }


  console.log("🚀 Connecting Twelve Data WebSocket...");


  socket = new WebSocket(
    `wss://ws.twelvedata.com/v1/quotes/price?apikey=${API_KEY}`
  );



  socket.onopen = () => {

    console.log(
      "✅ Twelve Data Connected"
    );


    socket.send(
      JSON.stringify({
        action: "subscribe",
        params: {
          symbols: SYMBOLS.join(","),
        },
      })
    );

  };



  socket.onmessage = (event) => {

    try {

      const data = JSON.parse(event.data);


      // Ignore messages without price
      if (!data.price) {
        return;
      }


      const providerSymbol = data.symbol;


      const appSymbol =
        SYMBOL_MAP[providerSymbol];


      if (!appSymbol) {
        return;
      }



      const priceData = {

        symbol: appSymbol,

        price: Number(
          data.price
        ),

        change: Number(data.percent_change ?? 0),
        timestamp: Date.now(),

        source: "twelvedata",
      };



      prices[appSymbol] = priceData;



      marketDataAggregator.updatePrice(
        appSymbol,
        priceData
      );


      notifyListeners();



    } catch (error) {

      console.error(
        "❌ Twelve Data Parse Error:",
        error
      );

    }

  };



  socket.onerror = (error) => {

    console.error(
      "❌ Twelve Data WebSocket Error",
      error
    );

  };



  socket.onclose = () => {

    console.warn(
      "⚠️ Twelve Data Disconnected"
    );


    socket = null;


    clearTimeout(
      reconnectTimer
    );


    reconnectTimer = setTimeout(
      connect,
      5000
    );

  };

}




export function startTwelveDataService() {

  console.log(
    "🚀 Starting Twelve Data..."
  );

  connect();

}



export function subscribePrices(callback) {

  listeners.push(callback);


  callback({
    ...prices,
  });



  return () => {

    const index =
      listeners.indexOf(callback);


    if (index > -1) {

      listeners.splice(
        index,
        1
      );

    }

  };

}