class MarketDataAggregator {
  constructor() {
    this.latestPrices = new Map();
    this.subscribers = new Map();
    this.globalSubscribers = new Set();
  }

  updatePrice(symbol, data) {
    this.latestPrices.set(symbol, data);

    // Symbol-specific subscribers
    const listeners = this.subscribers.get(symbol);

    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }

    // Global subscribers
    this.globalSubscribers.forEach((callback) => callback(symbol, data));
  }

  subscribe(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }

    this.subscribers.get(symbol).add(callback);

    // Send latest cached price immediately
    if (this.latestPrices.has(symbol)) {
      callback(this.latestPrices.get(symbol));
    }

    return () => this.unsubscribe(symbol, callback);
  }

  subscribeAll(callback) {
    this.globalSubscribers.add(callback);

    // Immediately send cached prices
    this.latestPrices.forEach((price, symbol) => {
      callback(symbol, price);
    });

    return () => {
      this.globalSubscribers.delete(callback);
    };
  }

  unsubscribe(symbol, callback) {
    const listeners = this.subscribers.get(symbol);

    if (!listeners) return;

    listeners.delete(callback);

    if (listeners.size === 0) {
      this.subscribers.delete(symbol);
    }
  }

  getLatestPrice(symbol) {
    return this.latestPrices.get(symbol);
  }

  getAllPrices() {
    return Object.fromEntries(this.latestPrices);
  }
}

const marketDataAggregator = new MarketDataAggregator();

export default marketDataAggregator;