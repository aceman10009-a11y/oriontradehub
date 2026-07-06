// src/services/marketDataService.js

import marketDataAggregator from "./aggregator/marketDataAggregator";

export function subscribeToPrice(symbol, onPrice, onStatus) {
  // If we already have a cached value, mark the connection as live.
  if (marketDataAggregator.getLatestPrice(symbol)) {
    onStatus?.(true);
  }

  const unsubscribe = marketDataAggregator.subscribe(symbol, (data) => {
    onPrice(data.price);
    onStatus?.(true);
  });

  return () => {
    unsubscribe();
  };
}