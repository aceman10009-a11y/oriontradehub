import React, { useState } from "react";

export default function PositionsPanel({ trades = [] }) {
  const [showAll, setShowAll] = useState(false);

  const visibleTrades = showAll ? trades : trades.slice(0, 5);

  return (
    <div
      style={{
        backgroundColor: "#0e1114",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #1e2329",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #1e2329",
          paddingBottom: "10px",
          marginBottom: "12px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#9ca3af",
          }}
        >
          Open Positions
        </h3>

        <span
          style={{
            fontSize: "10px",
            fontFamily: "monospace",
            color: "#9ca3af",
          }}
        >
          {trades.length} total
        </span>
      </div>

      {/* EMPTY STATE */}
      {trades.length === 0 ? (
        <div
          style={{
            padding: "40px 0",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          No active positions
        </div>
      ) : (
        <>
          {/* LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {visibleTrades.map((t) => (
              <div
                key={t.id}
                style={{
                  backgroundColor: "#161a1e",
                  border: "1px solid #2b3139",
                  borderRadius: "10px",
                  padding: "12px",
                }}
              >
                {/* TOP ROW */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {t.symbol}
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background:
                        t.type === "BUY"
                          ? "rgba(0,197,125,0.1)"
                          : "rgba(242,54,69,0.1)",
                      color: t.type === "BUY" ? "#00c57d" : "#f23645",
                    }}
                  >
                    {t.type}
                  </div>
                </div>

                {/* DETAILS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    fontSize: "10px",
                    color: "#9ca3af",
                    gap: "6px",
                  }}
                >
                  <div>
                    Entry:{" "}
                    <span style={{ color: "#fff", fontWeight: 700 }}>
                      ${t.entryPrice}
                    </span>
                  </div>

                  <div>
                    Size:{" "}
                    <span style={{ color: "#fff", fontWeight: 700 }}>
                      {t.lotSize}
                    </span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    Status:{" "}
                    <span style={{ color: "#1199fa", fontWeight: 700 }}>
                      {t.status}
                    </span>
                  </div>
                </div>

                {/* PNL */}
                <div
                  style={{
                    marginTop: "8px",
                    paddingTop: "8px",
                    borderTop: "1px solid #2b3139",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: (t.profit ?? 0) >= 0 ? "#00c57d" : "#f23645",
                  }}
                >
                  <span>PnL</span>
                  <span>
                    {(t.profit ?? 0) >= 0
                      ? `+$${t.profit ?? 0}`
                      : `-$${Math.abs(t.profit ?? 0)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* TOGGLE */}
          {trades.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                marginTop: "12px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #2b3139",
                background: "#161a1e",
                color: "#1199fa",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {showAll ? "Show Less ▲" : "View All ▼"}
            </button>
          )}
        </>
      )}
    </div>
  );
}