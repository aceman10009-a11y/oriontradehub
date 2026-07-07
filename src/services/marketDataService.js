import marketDataAggregator from "./aggregator/marketDataAggregator";

export function subscribeToPrice(symbol, onPrice, onStatus) {
  const latest = marketDataAggregator.getLatestPrice(symbol);

  if (latest) {
    onPrice(latest.price);
    onStatus?.(true);
  } else {
    onStatus?.(false);
  }

  const unsubscribe = marketDataAggregator.subscribe(symbol, (data) => {
    onPrice(data.price);
    onStatus?.(true);
  });

  return unsubscribe;
}