import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function UserTradingDashboard() {
  const [trades, setTrades] = useState([]);
  const [showAllTrades, setShowAllTrades] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "trades"),
      where("userId", "==", userId)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrades(list);
    });

    return () => unsub();
  }, [userId]);

  const visibleTrades = showAllTrades ? trades : trades.slice(0, 6);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060809",
        color: "#fff",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "800" }}>
            Orion Trading Dashboard
          </h1>
          <p style={{ margin: 0, color: "#9ca3af", fontSize: "13px" }}>
            Live execution terminal
          </p>
        </div>

        <div
          style={{
            background: "rgba(17,153,250,0.1)",
            border: "1px solid rgba(17,153,250,0.3)",
            padding: "10px 14px",
            borderRadius: "12px",
            fontSize: "13px",
            color: "#1199fa",
            fontWeight: "700",
          }}
        >
          Active Trades: {trades.length}
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "20px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {/* SUMMARY CARD */}
        <div
          style={{
            background: "rgba(14,17,20,0.8)",
            border: "1px solid #1e2329",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "14px", color: "#9ca3af" }}>
            Portfolio Status
          </h3>
          <h2 style={{ margin: "10px 0 0", fontSize: "22px" }}>
            ${trades.reduce((acc, t) => acc + (t.profit || 0), 0).toFixed(2)}
          </h2>
          <p style={{ color: "#00c57d", fontSize: "12px" }}>
            Live P/L Aggregation
          </p>
        </div>

        {/* SECOND CARD */}
        <div
          style={{
            background: "rgba(14,17,20,0.8)",
            border: "1px solid #1e2329",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "14px", color: "#9ca3af" }}>
            Win Rate
          </h3>
          <h2 style={{ margin: "10px 0 0", fontSize: "22px" }}>
            {trades.length
              ? Math.round(
                  (trades.filter((t) => t.profit > 0).length / trades.length) *
                    100
                )
              : 0}
            %
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "12px" }}>
            Performance metric
          </p>
        </div>

        {/* THIRD CARD */}
        <div
          style={{
            background: "rgba(14,17,20,0.8)",
            border: "1px solid #1e2329",
            borderRadius: "16px",
            padding: "16px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "14px", color: "#9ca3af" }}>
            Open Positions
          </h3>
          <h2 style={{ margin: "10px 0 0", fontSize: "22px" }}>
            {trades.filter((t) => t.status === "open").length}
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "12px" }}>
            Active trades
          </p>
        </div>
      </div>

      {/* TRADES TABLE */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "30px auto",
          background: "rgba(14,17,20,0.8)",
          border: "1px solid #1e2329",
          borderRadius: "16px",
          padding: "16px",
          overflowX: "auto",
        }}
      >
        <h3 style={{ marginBottom: "10px" }}>Recent Trades</h3>

        {trades.length === 0 ? (
          <p style={{ color: "#9ca3af" }}>No trades yet.</p>
        ) : (
          <>
            {visibleTrades.map((trade) => (
              <div
                key={trade.id}
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "10px",
                  padding: "12px",
                  borderBottom: "1px solid #1e2329",
                  fontSize: "13px",
                }}
              >
                <div>
                  <strong>{trade.symbol}</strong>
                </div>
                <div>{trade.type}</div>
                <div>${trade.entryPrice}</div>
                <div>{trade.lotSize}</div>
                <div
                  style={{
                    color:
                      trade.profit >= 0 ? "#00c57d" : "#f23645",
                    fontWeight: "700",
                  }}
                >
                  {trade.profit >= 0 ? "+" : "-"}$
                  {Math.abs(trade.profit || 0)}
                </div>
                <div>{trade.status}</div>
              </div>
            ))}

            {trades.length > 6 && (
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <button
                  onClick={() => setShowAllTrades(!showAllTrades)}
                  style={{
                    background: "#1199fa",
                    border: "none",
                    color: "#fff",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                >
                  {showAllTrades ? "Show Less" : "View All Trades"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}