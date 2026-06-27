import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export default function UserTradingDashboard() {
  const [trades, setTrades] = useState([]);

  // TEMP: we use stored userId instead of auth.uid
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Trading Dashboard</h1>

      <h3>Active Trades: {trades.length}</h3>

      <hr />

      {trades.length === 0 ? (
        <p>No trades yet.</p>
      ) : (
        trades.map((trade) => (
          <div
            key={trade.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ color: "red" }}>
  USER TRADING DASHBOARD - {trade.symbol}
</h3>

            <p><strong>Type:</strong> {trade.type}</p>
            <p><strong>Entry:</strong> {trade.entryPrice}</p>
            <p><strong>Lot Size:</strong> {trade.lotSize}</p>
            <p><strong>Status:</strong> {trade.status}</p>
            <p>
              <strong>
                {trade.profit >= 0 ? "Profit:" : "Loss:"}
              </strong>{" "}
              <span
                style={{
                  color: trade.profit >= 0 ? "#16a34a" : "#dc2626",
                  fontWeight: "bold",
                }}
              >
                ${Math.abs(trade.profit)}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}