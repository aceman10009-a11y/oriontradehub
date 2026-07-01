import React from "react";

export default function PortfolioHeader({
  isLiveMode,
  demoBalance,
  liveBalance,
  profit,
  overallPnL,
  pnlPercentage,
  trader,
  setShowDepositInfo,
}) {
  return (
    <header
      style={{
        background: "linear-gradient(to right, #0d1622, #0e1114, #060809)",
        borderBottom: "1px solid #1e2329",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* LEFT - BALANCE */}
        <div>
          <div
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "6px",
            }}
          >
            {isLiveMode
              ? "Total Equity (Live Portfolio)"
              : "Demo Account Balance"}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <div
              style={{
                fontSize: "34px",
                fontWeight: 800,
                color: isLiveMode ? "#00c57d" : "#f59e0b",
              }}
            >
              ${(isLiveMode ? liveBalance : demoBalance).toFixed(2)}
            </div>

            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                fontFamily: "monospace",
              }}
            >
              USD
            </div>
          </div>

          {trader && (
            <div
              style={{
                marginTop: "6px",
                fontSize: "11px",
                color: "#9ca3af",
                fontFamily: "monospace",
              }}
            >
              Managed by: {trader.name || "Assigned Trader"}
            </div>
          )}
        </div>

        {/* RIGHT - PNL BOX */}
        <div
          style={{
            backgroundColor: "#0e1114",
            border: "1px solid #1e2329",
            padding: "14px",
            borderRadius: "12px",
            minWidth: "240px",
          }}
        >
          {isLiveMode ? (
            <>
              <div
                style={{
                  fontSize: "10px",
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
              >
                PnL Performance
              </div>

              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: overallPnL >= 0 ? "#00c57d" : "#f23645",
                }}
              >
                {overallPnL >= 0 ? "+" : ""}${overallPnL.toFixed(2)}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  marginTop: "4px",
                  fontFamily: "monospace",
                }}
              >
                {pnlPercentage.toFixed(2)}%
              </div>
            </>
          ) : (
            <div style={{ color: "#f59e0b", fontSize: "12px" }}>
              Demo environment active — no real execution
            </div>
          )}

          <button
            onClick={() => setShowDepositInfo(true)}
            style={{
              marginTop: "10px",
              width: "100%",
              background: "#1199fa",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Deposit Funds
          </button>
        </div>
      </div>
    </header>
  );
}