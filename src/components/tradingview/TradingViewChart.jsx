import { useEffect, useRef } from "react";

export default function TradingViewChart({
  symbol = "BINANCE:BTCUSDT",
  timeframe = "1m",
}) {
  const container = useRef(null);

  useEffect(() => {
    const node = container.current;

    if (!node) return;

    // Clear any previous widget
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const intervals = {
      "1m": "1",
      "5m": "5",
      "10m": "10",
      "30m": "30",
      "1h": "60",
      "1d": "D",
      "1w": "W",
      "1mo": "M",
    };

    const interval = intervals[timeframe] || "1";

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval,
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      hide_top_toolbar: false,
      hide_legend: false,
      withdateranges: true,
      save_image: false,
      backgroundColor: "#0b0f14",
      gridColor: "#1f2937",
    });

    node.appendChild(script);

    return () => {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    };
  }, [symbol, timeframe]);

  return (
    <div
      className="tradingview-widget-container"
      style={{
        width: "100%",
        height: "500px",
      }}
    >
      <div
        ref={container}
        className="tradingview-widget-container__widget"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <div
        className="tradingview-widget-copyright"
        style={{ display: "none" }}
      />
    </div>
  );
}