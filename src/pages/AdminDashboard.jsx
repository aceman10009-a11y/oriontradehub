import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import TradeModal from "../components/TradeModal";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openTrades, setOpenTrades] = useState([]);
  const [profitInputs, setProfitInputs] = useState({});
  const [showAllTrades, setShowAllTrades] = useState(false);

  const navigate = useNavigate();

  // 1. Real-time listener for Users
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(list);
      },
      (error) => {
        console.error("Error listening to users live stream:", error);
      }
    );
    return () => unsubscribeUsers();
  }, []);

  // 2. Real-time listener for Open Trades
  useEffect(() => {
    const unsubscribeTrades = onSnapshot(
      collection(db, "trades"),
      (snapshot) => {
        const trades = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((trade) => trade.status === "open");

        setOpenTrades(trades);
      }
    );
    return () => unsubscribeTrades();
  }, []);

  const updateProfit = async (tradeId) => {
    try {
      await updateDoc(doc(db, "trades", tradeId), {
        profit: Number(profitInputs[tradeId] ?? 0),
        updatedAt: serverTimestamp(),
      });
      alert("Profit updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update profit.");
    }
  };

  const closeTrade = async (trade) => {
    try {
      const tradeRef = doc(db, "trades", trade.id);
      const userRef = doc(db, "users", trade.userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User not found.");
        return;
      }

      const userData = userSnap.data();
      const currentBalance = Number(userData.liveBalance || 0);
      const profit = Number(trade.profit || 0);

      await updateDoc(userRef, {
        liveBalance: currentBalance + profit,
      });

      await updateDoc(tradeRef, {
        status: "closed",
        closedAt: serverTimestamp(),
      });

      alert("Trade closed successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to close trade.");
    }
  };

  const visibleTrades = showAllTrades ? openTrades : openTrades.slice(0, 5);

  return (
    <div style={{ backgroundColor: "#060809", minHeight: "100vh", color: "#ffffff", padding: "24px", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", boxSizing: "border-box" }}>
      
      {/* Upper Terminal Title Block */}
      <div style={{ borderBottom: "1px solid #1e2329", paddingBottom: "20px", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.02em", margin: 0, color: "#ffffff" }}>ORION TRADE HUB</h1>
          <div style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "4px" }}>
            Exchange Management Core • Terminal View
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#0e1114", padding: "10px 16px", borderRadius: "8px", border: "1px solid #1e2329" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#1199fa" }} />
          <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600" }}>Active Root:</span>
          <span style={{ fontSize: "12px", color: "#ffffff", fontWeight: "700" }}>Trader Jeff 👋</span>
        </div>
      </div>

      {/* Overview Analytics Matrix */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div style={{ backgroundColor: "#0e1114", border: "1px solid #1e2329", borderRadius: "12px", padding: "16px" }}>
          <span style={{ fontSize: "10px", color: "#9ca3af", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Registered Nodes</span>
          <span style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff" }}>{users.length} <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Clients</span></span>
        </div>
        <div style={{ backgroundColor: "#0e1114", border: "1px solid #1e2329", borderRadius: "12px", padding: "16px" }}>
          <span style={{ fontSize: "10px", color: "#1199fa", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Active Positions Pipeline</span>
          <span style={{ fontSize: "24px", fontWeight: "800", color: "#1199fa" }}>{openTrades.length} <span style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>Open</span></span>
        </div>
      </div>

      {/* Main Structural Split Layout Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "window.innerWidth <= 1024 ? '1fr' : 'repeat(12, 1fr)'", gap: "24px" }}>
        
        {/* Left Column: Target Client Registry */}
        <div style={{ gridColumn: "span 7" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "4px", height: "12px", backgroundColor: "#1199fa", borderRadius: "2px" }} />
            <h2 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, color: "#ffffff" }}>Target Client Registry</h2>
          </div>

          {users.length === 0 ? (
            <div style={{ color: "#6b7280", padding: "40px", backgroundColor: "#0e1114", borderRadius: "12px", border: "1px dashed #1e2329", textAlign: "center", fontSize: "13px" }}>No accounts synced with core cluster yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {users.map((user) => (
                <div
                  key={user.id}
                  style={{ backgroundColor: "#0e1114", border: "1px solid #2b3139", borderRadius: "12px", padding: "16px", boxSizing: "border-box" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", borderBottom: "1px solid #1e2329", paddingBottom: "12px", marginBottom: "12px" }}>
                    <div>
                      <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff", margin: 0 }}>{user.name || "Anonymous Matrix Agent"}</h3>
                      <span style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace" }}>{user.email}</span>
                    </div>
                    <span style={{ backgroundColor: "rgba(17, 153, 250, 0.1)", color: "#1199fa", border: "1px solid rgba(17, 153, 250, 0.2)", fontSize: "10px", fontWeight: "700", padding: "3px 8px", borderRadius: "6px", textTransform: "uppercase" }}>
                      {user.accountType || "Standard Tier"}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "16px", fontSize: "12px" }}>
                    <div>
                      <span style={{ color: "#9ca3af", display: "block", marginBottom: "2px", fontSize: "10px", textTransform: "uppercase" }}>Simulation Balance</span>
                      <strong style={{ color: "#f59e0b", fontFamily: "monospace" }}>${user.demoBalance ?? 0}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#9ca3af", display: "block", marginBottom: "2px", fontSize: "10px", textTransform: "uppercase" }}>Production Equity</span>
                      <strong style={{ color: "#00c57d", fontFamily: "monospace" }}>${user.liveBalance ?? 0}</strong>
                    </div>
                    <div>
                      <span style={{ color: "#9ca3af", display: "block", marginBottom: "2px", fontSize: "10px", textTransform: "uppercase" }}>Assigned Handler</span>
                      <span style={{ color: "#ffffff", fontWeight: "600" }}>{user.assignedTraderId || "Unassigned"}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                      onClick={() => navigate(`/admin/user/${user.id}`)}
                      style={{ flex: 1, backgroundColor: "#161a1e", color: "#ffffff", border: "1px solid #2b3139", padding: "10px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", cursor: "pointer" }}
                    >
                      Audit Profile
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedUser({ ...user });
                      }}
                      style={{ flex: 1, backgroundColor: "#1199fa", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", textTransform: "uppercase", cursor: "pointer" }}
                    >
                      Inject Trade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Execution Position Engine Ledger */}
        <div style={{ gridColumn: "span 5" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <div style={{ width: "4px", height: "12px", backgroundColor: "#00c57d", borderRadius: "2px" }} />
            <h2 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0, color: "#ffffff" }}>Global Open Ledger</h2>
          </div>

          {openTrades.length === 0 ? (
            <div style={{ color: "#6b7280", padding: "40px", backgroundColor: "#0e1114", borderRadius: "12px", border: "1px dashed #1e2329", textAlign: "center", fontSize: "13px" }}>No computational trade overrides running.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {visibleTrades.map((trade) => (
                <div
                  key={trade.id}
                  style={{ backgroundColor: "#0e1114", border: "1px solid #2b3139", borderRadius: "12px", padding: "16px", boxSizing: "border-box" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff", letterSpacing: "0.02em" }}>{trade.symbol}</span>
                      <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace", marginTop: "2px" }}>Owner: {trade.userEmail}</div>
                    </div>
                    <span style={{
                      fontSize: "10px", fontWeight: "900", padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em",
                      backgroundColor: trade.type?.toUpperCase() === "BUY" ? "rgba(0, 197, 125, 0.1)" : "rgba(242, 54, 69, 0.1)",
                      color: trade.type?.toUpperCase() === "BUY" ? "#00c57d" : "#f23645"
                    }}>
                      {trade.type}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", color: "#9ca3af", marginBottom: "12px", fontFamily: "monospace" }}>
                    <div>Entry: <span style={{ color: "#ffffff" }}>${trade.entryPrice}</span></div>
                    <div>Volume: <span style={{ color: "#ffffff" }}>{trade.lotSize} Lots</span></div>
                  </div>

                  <div style={{ backgroundColor: "#161a1e", padding: "12px", borderRadius: "8px", border: "1px solid #2b3139", marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af" }}>Matrix Return Delta:</span>
                      <span style={{ fontSize: "13px", fontWeight: "800", color: trade.profit >= 0 ? "#00c57d" : "#f23645" }}>
                        {trade.profit >= 0 ? "+" : ""}${trade.profit ?? 0}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <input
                        type="number"
                        placeholder="Alter Value Matrix ($)"
                        value={profitInputs[trade.id] ?? trade.profit ?? ""}
                        onChange={(e) =>
                          setProfitInputs((prev) => ({
                            ...prev,
                            [trade.id]: e.target.value,
                          }))
                        }
                        style={{ flex: 2, padding: "8px 12px", backgroundColor: "#060809", color: "#ffffff", border: "1px solid #2b3139", borderRadius: "6px", fontSize: "13px", outline: "none", fontFamily: "monospace" }}
                      />
                      <button 
                        onClick={() => updateProfit(trade.id)}
                        style={{ flex: 1, backgroundColor: "#1199fa", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "700", fontSize: "11px", textTransform: "uppercase", cursor: "pointer" }}
                      >
                        Sync
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => closeTrade(trade)}
                    style={{ width: "100%", padding: "10px", backgroundColor: "rgba(242, 54, 69, 0.1)", color: "#f23645", border: "1px solid rgba(242, 54, 69, 0.2)", borderRadius: "8px", fontWeight: "800", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", cursor: "pointer" }}
                  >
                    Liquidate & Close Position
                  </button>
                </div>
              ))}

              {openTrades.length > 5 && (
                <div style={{ textAlign: "center", marginTop: "8px" }}>
                  <div style={{ color: "#6b7280", fontSize: "12px", fontFamily: "monospace", marginBottom: "8px" }}>
                    Displaying {visibleTrades.length} of {openTrades.length} pipelines
                  </div>
                  <button
                    onClick={() => setShowAllTrades(!showAllTrades)}
                    style={{ backgroundColor: "#161a1e", color: "#1199fa", border: "1px solid #2b3139", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", textTransform: "uppercase", cursor: "pointer", width: "100%" }}
                  >
                    {showAllTrades ? "Collapse System View ▲" : "Expand Entire Queue ▼"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Target Modal Override Sheet Context */}
      {selectedUser && (
        <TradeModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}