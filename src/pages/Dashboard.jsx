import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscribeToPrice } from "../services/marketDataService";
import Watchlist from "../components/watchlist/Watchlist";
import { toast } from "react-toastify";
import WithdrawModal from "../components/dashboard/WithdrawModal";

import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";

import TradingViewChart from "../components/tradingview/TradingViewChart";

// Dashboard Components
import TopBar from "../components/dashboard/TopBar";
import MarketHeader from "../components/market/MarketHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [trades, setTrades] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USD");
  const [tradeAmount, setTradeAmount] = useState(100);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [marketConnected, setMarketConnected] = useState(false);
  const [marketSearch, setMarketSearch] = useState("");
  const [historyFilter, setHistoryFilter] = useState("ALL");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [demoBalance, setDemoBalance] = useState(10000);
  const [liveBalance, setLiveBalance] = useState(0);

  const [currentPrice, setCurrentPrice] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToPrice(
      selectedSymbol,
      setCurrentPrice,
      setMarketConnected
    );

    return unsubscribe;
  }, [selectedSymbol]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (user === null) return;

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Firestore sync
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribeUser = onSnapshot(userRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();

      setDemoBalance(data.demoBalance || 10000);
      setLiveBalance(data.liveBalance || 0);
    });

    const tradesQuery = query(
      collection(db, "trades"),
      where("userId", "==", user.uid)
    );

    const unsubscribeTrades = onSnapshot(tradesQuery, (snapshot) => {
      setTrades(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => {
      unsubscribeUser();
      unsubscribeTrades();
    };
  }, [user]);

  const executeTrade = (action) => {
    if (action === "deposit") {
      toast.info(
        "Deposits are processed manually by your assigned account manager. Please contact support to fund your investment account.",
        {
          autoClose: 6000,
        }
      );
      return;
    }

    if (action === "withdraw") {
      toast.info(
        "Withdrawal requests are reviewed and processed by your assigned account manager. Please contact support to initiate a withdrawal.",
        {
          autoClose: 6000,
        }
      );
    }
  };

  const pnl = trades.reduce(
    (total, trade) => total + (trade.profit || 0),
    0
  );

  const filteredHistory = trades.filter((trade) => {
    switch (historyFilter) {
      case "OPEN":
        return trade.status === "OPEN";

      case "CLOSED":
        return trade.status === "CLOSED";

      case "PROFIT":
        return (trade.profit || 0) > 0;

      case "LOSS":
        return (trade.profit || 0) < 0;

      default:
        return true;
    }
  });

  return (
    <div style={styles.page}>

      {/* TOP BAR */}
     <TopBar
  user={user}
  isLiveMode={isLiveMode}
  setIsLiveMode={setIsLiveMode}
  selectedSymbol={selectedSymbol}
  selectedTimeframe={selectedTimeframe}
  setSelectedTimeframe={setSelectedTimeframe}
  demoBalance={demoBalance}
  liveBalance={liveBalance}
/>

      {/* MAIN GRID */}
      <div style={{
        ...styles.grid,
        gridTemplateColumns: isMobile ? "1fr" : "280px 1fr 320px"
      }}>

       {/* LEFT PANEL */}

<div
  style={{
    ...styles.panel,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }}
>
  <input
    type="text"
    placeholder="Search markets..."
    value={marketSearch}
    onChange={(e) => setMarketSearch(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      background: "#0b0f14",
      color: "#fff",
      border: "1px solid #2b3442",
      borderRadius: 10,
      outline: "none",
      boxSizing: "border-box",
    }}
  />

  <div
    style={{
      overflowY: "auto",
      maxHeight: isMobile ? "350px" : "700px",
    }}
  >
    <Watchlist
      selectedSymbol={selectedSymbol}
      setSelectedSymbol={setSelectedSymbol}
      search={marketSearch}
    />
  </div>
</div>

        {/* CENTER CHART */}
     {/* CENTER CHART */}
<div style={styles.panel}>
  <MarketHeader
    symbol={selectedSymbol}
    price={currentPrice}
    connected={marketConnected}
  />
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "18px",
    padding: "14px",
    background: "#0b0f14",
    borderRadius: "10px",
    border: "1px solid #222",
  }}
>
  <div>
    <div style={{ color: "#888", fontSize: "12px" }}>
      Selected Market
    </div>

    <div
      style={{
        fontSize: "20px",
        fontWeight: 700,
      }}
    >
      {selectedSymbol}
    </div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "12px" }}>
      Current Price
    </div>

    <div
      style={{
        fontSize: "20px",
        fontWeight: 700,
        color: "#00c57d",
      }}
    >
      ${Number(currentPrice || 0).toLocaleString()}
    </div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "12px" }}>
      Total Profit
    </div>

    <div
      style={{
        fontSize: "20px",
        fontWeight: 700,
        color: pnl >= 0 ? "#16a34a" : "#ef4444",
      }}
    >
      ${pnl.toFixed(2)}
    </div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "12px" }}>
      Connection
    </div>

    <div
      style={{
        color: marketConnected ? "#16a34a" : "#ef4444",
        fontWeight: 700,
      }}
    >
      {marketConnected ? "LIVE" : "OFFLINE"}
    </div>
  </div>
</div>

  <div style={{ height: 420 }}>
  <TradingViewChart
  symbol={selectedSymbol}
  timeframe={selectedTimeframe}
/>
  </div>
</div>

        {/* RIGHT PANEL */}
        <div style={styles.panel}>

         <h3 style={{ marginBottom: 20 }}>
  Account Overview
</h3>

<div style={styles.statCard}>
  <span>{isLiveMode ? "Live Balance" : "Demo Balance"}</span>
  <strong>
    ${Number(
      isLiveMode ? liveBalance : demoBalance
    ).toLocaleString()}
  </strong>
</div>

<div style={styles.statCard}>
  <span>Equity</span>
  <strong>
    ${(
      Number(isLiveMode ? liveBalance : demoBalance) + pnl
    ).toFixed(2)}
  </strong>
</div>

<div style={styles.statCard}>
  <span>Free Margin</span>
  <strong>
    ${Number(isLiveMode ? liveBalance : demoBalance).toFixed(2)}
  </strong>
</div>

<div style={styles.statCard}>
  <span>Total Profit</span>
  <strong
    style={{
      color: pnl >= 0 ? "#16a34a" : "#ef4444",
    }}
  >
    ${pnl.toFixed(2)}
  </strong>
</div>

<div style={styles.statCard}>
  <span>Open Positions</span>
  <strong>{trades.length}</strong>
</div>



<hr style={{ margin: "25px 0" }} />

<h3>Trading History</h3>

<div
  style={{
    display: "flex",
    gap: 8,
    margin: "15px 0",
    flexWrap: "wrap",
  }}
>
  {["ALL", "OPEN", "CLOSED", "PROFIT", "LOSS"].map((filter) => (
    <button
      key={filter}
      onClick={() => setHistoryFilter(filter)}
      style={{
        padding: "8px 14px",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        background:
          historyFilter === filter ? "#1199fa" : "#1b2330",
        color: "#fff",
      }}
    >
      {filter}
    </button>
  ))}
</div>

<div
  style={{
    overflowX: "auto",
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      color: "#fff",
    }}
  >
    <thead>
      <tr style={{ borderBottom: "1px solid #333" }}>
        <th style={styles.th}>Symbol</th>
        <th style={styles.th}>Amount</th>
        <th style={styles.th}>P/L</th>
        <th style={styles.th}>Status</th>
      </tr>
    </thead>

    <tbody>
      {filteredHistory.map((trade) => (
        <tr key={trade.id}>
          <td style={styles.td}>{trade.symbol}</td>

          <td style={styles.td}>
            ${trade.amount}
          </td>

          <td
            style={{
              ...styles.td,
              color:
                trade.profit >= 0
                  ? "#16a34a"
                  : "#ef4444",
            }}
          >
            ${trade.profit}
          </td>

          <td style={styles.td}>
            {trade.status || "OPEN"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div style={{ overflowX: "auto" }}>
  {filteredHistory.length === 0 ? (
    <div
      style={{
        padding: 30,
        textAlign: "center",
        color: "#9ca3af",
      }}
    >
      📈 No trading history available.
    </div>
  ) : (
    <table>
      {/* Your table */}
    </table>
  )}
</div>
</div>

<div style={styles.statCard}>
  <span>Winning Trades</span>
  <strong>
    {trades.filter(t => (t.profit || 0) > 0).length}
  </strong>
</div>

<div style={styles.statCard}>
  <span>Losing Trades</span>
  <strong>
    {trades.filter(t => (t.profit || 0) < 0).length}
  </strong>
</div>

<div style={styles.statCard}>
  <span>Win Rate</span>
  <strong>
    {trades.length
      ? (
          trades.filter(t => (t.profit || 0) > 0).length /
          trades.length *
          100
        ).toFixed(1)
      : 0}
    %
  </strong>
</div>

<div style={styles.statCard}>
  <span>Account Status</span>
  <strong
    style={{
      color: user?.emailVerified ? "#16a34a" : "#f59e0b",
    }}
  >
    {user?.emailVerified ? "Verified ✓" : "Pending"}
  </strong>
</div>

<hr />

<div style={{ display: "flex", gap: 10 }}>
           <button
  onClick={() => executeTrade("deposit")}
  style={buyBtn}
>
  Deposit
</button>

<button
  onClick={() => setShowWithdraw(true)}
  style={sellBtn}
>
  Withdraw
</button>
          </div>

          <hr />

        <h3 style={{ marginTop: 25 }}>Open Positions</h3>

<div
  style={{
    overflowX: "auto",
    marginTop: 12,
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      color: "#fff",
      fontSize: "13px",
    }}
  >
    <thead>
      <tr
        style={{
          background: "#161b22",
        }}
      >
        <th style={styles.th}>Asset</th>
        <th style={styles.th}>Type</th>
        <th style={styles.th}>P/L</th>
        <th style={styles.th}>Status</th>
      </tr>
    </thead>

    <tbody>
      {trades.length > 0 ? (
        trades.map((trade) => (
          <tr
            key={trade.id}
            style={{
              borderBottom: "1px solid #222",
            }}
          >
            <td style={styles.td}>
              {trade.symbol}
            </td>

            <td style={styles.td}>
              {trade.side || "BUY"}
            </td>

            <td
              style={{
                ...styles.td,
                color:
                  (trade.profit || 0) >= 0
                    ? "#16a34a"
                    : "#ef4444",
              }}
            >
              ${Number(trade.profit || 0).toFixed(2)}
            </td>

            <td style={styles.td}>
              Open
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="4"
            style={{
              padding: 20,
              textAlign: "center",
              color: "#888",
            }}
          >
            No active positions.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
               </div>

      </div>


      <WithdrawModal
        show={showWithdraw}
        setShowWithdraw={setShowWithdraw}
        trader={{
          name: "Assigned Account Manager",
        }}
      />

    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  page: {
    background: "#0b0f14",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "system-ui"
  },

  grid: {
    display: "grid",
    gap: 16,
    padding: 16
  },

  panel: {
    background: "#111827",
    padding: 16,
    borderRadius: 12
  },

  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    background: "#0b0f14",
    border: "1px solid #333",
    color: "#fff"
  },
  statCard: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#0b0f14",
  border: "1px solid #222",
  borderRadius: 10,
  padding: "14px",
  marginBottom: 12,
},
th: {
  padding: "12px",
  textAlign: "left",
  color: "#9ca3af",
  fontWeight: 600,
},

td: {
  padding: "12px",
},
};

const btn = (active) => ({
  padding: "8px 12px",
  background: active ? "#1f6feb" : "#222",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
});

const buyBtn = {
  flex: 1,
  padding: 10,
  background: "#16a34a",
  border: "none",
  color: "#fff",
  borderRadius: 6
};

const sellBtn = {
  flex: 1,
  padding: 10,
  background: "#dc2626",
  border: "none",
  color: "#fff",
  borderRadius: 6
};

export default Dashboard;