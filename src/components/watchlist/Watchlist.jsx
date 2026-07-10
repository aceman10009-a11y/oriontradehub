import React, { useMemo, useEffect, useState } from "react";
import { markets } from "../../data/markets";
import marketDataAggregator from "../../services/aggregator/marketDataAggregator";
import { useTranslation } from "react-i18next";
const icons = {
  "BTC/USD": "₿",
  "ETH/USD": "Ξ",
  "SOL/USD": "◎",
  "BNB/USD": "🟡",
  "XRP/USD": "✕",
  "ADA/USD": "₳",
  "DOGE/USD": "Ð",
  "EUR/USD": "💶",
  "GBP/USD": "💷",
  "XAU/USD": "🥇",
  NASDAQ: "📈",
  AAPL: "🍎",
};

export default function Watchlist({
  selectedSymbol,
  setSelectedSymbol,
  search = "",
}) {
  const { t } = useTranslation();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const unsubscribe = marketDataAggregator.subscribeAll((symbol, data) => {
      setPrices((prev) => ({
        ...prev,
        [symbol]: data,
      }));
    });

    return unsubscribe;
  }, []);

  const filteredMarkets = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return markets;

    return markets.filter(
      (market) =>
        market.id.toLowerCase().includes(q) ||
        market.name.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>
  {t("markets")}
</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {filteredMarkets.map((market) => {
          const live = prices[market.id];

          return (
            <button
              key={market.id}
              onClick={() => setSelectedSymbol(market.id)}
              style={{
                border: "1px solid",
                borderColor:
                  selectedSymbol === market.id
                    ? "#1199fa"
                    : "#1f2937",
                cursor: "pointer",
                textAlign: "left",
                padding: 14,
                borderRadius: 12,
                background:
                  selectedSymbol === market.id
                    ? "#162133"
                    : "#0b0f14",
                color: "#fff",
                transition: ".2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 22 }}>
                    {icons[market.id] || "📊"}
                  </span>

                  <div>
                    <div style={{ fontWeight: 700 }}>
                      {market.id}
                    </div>

                    <div
                      style={{
                        fontSize: 12,
                        color: "#9ca3af",
                      }}
                    >
                      {market.name}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#16a34a",
                    }}
                  >
                    {live
                      ? `$${live.price.toLocaleString()}`
                      : "--"}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color:
                        live && live.change >= 0
                          ? "#16a34a"
                          : "#ef4444",
                    }}
                  >
                    {live
                      ? `${live.change.toFixed(2)}%`
                      : ""}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}