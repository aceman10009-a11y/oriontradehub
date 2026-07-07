import { useEffect, useRef } from "react";

export default function TradingViewChart({
  symbol = "BINANCE:BTCUSDT",
  timeframe = "1m",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.width = "100%";
    widget.style.height = "100%";

    containerRef.current.appendChild(widget);

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.async = true;

    script.type = "text/javascript";

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

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: intervals[timeframe] || "1",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      withdateranges: true,
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      save_image: false,
      backgroundColor: "#0b0f14",
      gridColor: "#1f2937",
      studies: [],
    });

    widget.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, timeframe]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}