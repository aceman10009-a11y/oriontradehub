import React, { useMemo } from "react";
import { markets } from "../../data/markets";

export default function Watchlist({
  selectedSymbol,
  setSelectedSymbol,
  search = "",
}) {
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
      <h3 style={{ marginBottom: 16 }}>Markets</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {filteredMarkets.map((market) => (
          <button
            key={market.id}
            onClick={() => setSelectedSymbol(market.id)}
            style={{
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              padding: 12,
              borderRadius: 10,
              background:
                selectedSymbol === market.id
                  ? "#1f6feb"
                  : "#0b0f14",
              color: "#fff",
              transition: "0.2s",
            }}
          >
            <div
              style={{
                fontWeight: 700,
              }}
            >
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
          </button>
        ))}
      </div>
    </div>
  );
}