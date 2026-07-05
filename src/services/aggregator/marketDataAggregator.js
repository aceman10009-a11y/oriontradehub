class MarketDataAggregator {
  constructor() {
    this.latestPrices = new Map();
    this.subscribers = new Map();
  }

  updatePrice(symbol, data) {
    this.latestPrices.set(symbol, data);

    const listeners = this.subscribers.get(symbol);

    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  subscribe(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }

    this.subscribers.get(symbol).add(callback);

    // Immediately return the latest known price
    if (this.latestPrices.has(symbol)) {
      callback(this.latestPrices.get(symbol));
    }

    return () => {
      this.unsubscribe(symbol, callback);
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
}

const marketDataAggregator = new MarketDataAggregator();

export default marketDataAggregator;