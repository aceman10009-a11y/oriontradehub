import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { subscribeToPrice } from "../services/marketDataService";
import { markets } from "../data/markets";
import Watchlist from "../components/watchlist/Watchlist";

import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";

import TradingViewChart from "../components/tradingview/TradingViewChart";
import { createTrade, calculatePnL } from "../core/tradingEngine";
import { timeframes } from "../core/marketEngine";
import { getTradingViewSymbol } from "../utils/tradingViewSymbols";

// New imports
import TopBar from "../components/dashboard/TopBar";
import PortfolioHeader from "../components/dashboard/PortfolioHeader";
import TradingPanel from "../components/dashboard/TradingPanel";
import PositionsPanel from "../components/dashboard/PositionsPanel";
import MarketHeader from "../components/market/MarketHeader";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [trades, setTrades] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USD");
  const [tradeAmount, setTradeAmount] = useState(100);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1m");
  const [marketConnected, setMarketConnected] = useState(false);
  const [marketSearch, setMarketSearch] = useState("");

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

  return () => {
    unsubscribe();
  };
}, [selectedSymbol]);
useEffect(() => {
  console.log("Market connected:", marketConnected);
}, [marketConnected]);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // auth + firestore sync
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) return navigate("/login");
      setUser(u);

      const ref = doc(db, "users", u.uid);

      const unsubUser = onSnapshot(ref, (snap) => {
        if (!snap.exists()) return;
        const d = snap.data();
        setDemoBalance(d.demoBalance || 10000);
        setLiveBalance(d.liveBalance || 0);
      });

      const q = query(
        collection(db, "trades"),
        where("userId", "==", u.uid)
      );

      const unsubTrades = onSnapshot(q, (snap) => {
        setTrades(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      });

      return () => {
        unsubUser();
        unsubTrades();
      };
    });

    return () => unsub();
  }, [navigate]);

  const executeTrade = (side) => {
    alert(`${side} trade executed (hook your backend here)`);
  };

  const pnl = trades.reduce((a, t) => a + (t.profit || 0), 0);

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

  <div style={styles.headerBox}>
    <div>
      Total P/L: <strong>${pnl.toFixed(2)}</strong>
    </div>
  </div>

  <div style={{ height: 420 }}>
  <TradingViewChart
  symbol={selectedSymbol}
  timeframe={selectedTimeframe}
  currentPrice={currentPrice}
/>
  </div>
</div>

        {/* RIGHT PANEL */}
        <div style={styles.panel}>

          <h3>Account</h3>
          <div>
            <b>{isLiveMode ? liveBalance : demoBalance}</b> USD
          </div>

          <hr />

          <input
            type="number"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
            style={styles.input}
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => executeTrade("BUY")} style={buyBtn}>
              BUY
            </button>
            <button onClick={() => executeTrade("SELL")} style={sellBtn}>
              SELL
            </button>
          </div>

          <hr />

          <h3>Positions</h3>

          {trades.slice(0, 5).map(t => (
            <div key={t.id} style={tradeBox}>
              <div>{t.symbol}</div>
              <div>${t.profit}</div>
            </div>
          ))}

          {trades.length === 0 && (
            <div style={{ opacity: 0.5 }}>No positions</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

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
  }
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

const tradeBox = {
  padding: 8,
  marginTop: 6,
  background: "#0b0f14",
  borderRadius: 6,
  display: "flex",
  justifyContent: "space-between"
};