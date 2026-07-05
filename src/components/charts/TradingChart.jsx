import { useEffect, useRef } from "react";
import {
  createChart,
  CrosshairMode,
  CandlestickSeries,
} from "lightweight-charts";

export default function TradingChart({
  symbol,
  timeframe,
  currentPrice,
}) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 420,

      layout: {
        background: {
          color: "#0b0f14",
        },
        textColor: "#d1d4dc",
      },

      grid: {
        vertLines: {
          color: "#1f2937",
        },
        horzLines: {
          color: "#1f2937",
        },
      },

      crosshair: {
        mode: CrosshairMode.Normal,
      },

      rightPriceScale: {
        borderColor: "#374151",
      },

      timeScale: {
        borderColor: "#374151",
      },
    });

    const candleSeries = chart.addSeries(
      CandlestickSeries,
      {}
    );

    chartRef.current = chart;
    seriesRef.current = candleSeries;

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: "420px",
      }}
    />
  );
}