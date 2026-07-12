import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscribeToPrice } from "../services/marketDataService";
import Watchlist from "../components/watchlist/Watchlist";
import { toast } from "react-toastify";
import WithdrawModal from "../components/dashboard/WithdrawModal";
import { useTranslation } from "react-i18next";
import orionCard from "../assets/cards/orion-card.jpg";

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
  const { t } = useTranslation();
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
      <div
  style={{
    ...styles.grid,
    gridTemplateColumns: isMobile
      ? "1fr"
      : "280px minmax(0,1fr) 340px",
    alignItems: "start",
    width: "100%",
    maxWidth: "1700px",
    margin: "0 auto",
    padding: isMobile ? 12 : 20,
  }}
>
       {/* LEFT PANEL */}

<div
  style={{
    ...styles.panel,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }}
><input
  type="text"
  placeholder={t("searchMarkets")}
  value={marketSearch}
  onChange={(e) => setMarketSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    background: "var(--bg-primary)",
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    outline: "none",
    boxSizing: "border-box",
    color: "var(--text-primary)",
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
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr 1fr"
      : "repeat(4, 1fr)",
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
      {t("selectedMarket")}
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
      {t("currentPrice")}
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
      {t("totalProfit")}
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
      {t("connection")}
    </div>

    <div
      style={{
        color: marketConnected ? "#16a34a" : "#ef4444",
        fontWeight: 700,
      }}
    >
      {marketConnected ? t("live") : t("offline")}
    </div>
  </div>
</div>

     <div
  style={{
    height: isMobile ? 320 : 420,
    width: "100%",
  }}
>
  <TradingViewChart
  symbol={selectedSymbol}
  timeframe={selectedTimeframe}
/>
  </div>
</div>

        {/* RIGHT PANEL */}
        <div style={styles.panel}>

         <h3 style={{ marginBottom: 20 }}>
  {t("accountOverview")}
</h3>

<div style={styles.statCard}>
  <span>
  {isLiveMode
    ? t("liveBalance")
    : t("demoBalance")}
</span>
  <strong>
    ${Number(
      isLiveMode ? liveBalance : demoBalance
    ).toLocaleString()}
  </strong>
</div>

<div style={styles.statCard}>
  <span>{t("equity")}</span>
  <strong>
    ${(
      Number(isLiveMode ? liveBalance : demoBalance) + pnl
    ).toFixed(2)}
  </strong>
</div>

<div style={styles.statCard}>
  <span>{t("freeMargin")}</span>
  <strong>
    ${Number(isLiveMode ? liveBalance : demoBalance).toFixed(2)}
  </strong>
</div>

<div style={styles.statCard}>
  <span>{t("totalProfit")}</span>
  <strong
    style={{
      color: pnl >= 0 ? "#16a34a" : "#ef4444",
    }}
  >
    ${pnl.toFixed(2)}
  </strong>
</div>

<div style={styles.statCard}>
  <span>{t("openPositions")}</span>
  <strong>{trades.length}</strong>
</div>

{/* Orion Debit Card */}

<div
  style={{
    marginTop: 25,
    padding: 18,
    borderRadius: 18,
    background: "var(--card-bg)",
    border: "1px solid var(--border-color)",
  }}
>
  <h3
    style={{
      marginBottom: 15,
    }}
  >
    Orion Debit Card
  </h3>

  <img
    src={orionCard}
    alt="Orion Debit Card"
    style={{
      width: "100%",
      borderRadius: 14,
      display: "block",
      marginBottom: 18,
    }}
  />

  <div
    style={{
      padding: 12,
      borderRadius: 10,
      background: "#222",
      color: "#ffb74d",
      fontWeight: 600,
      textAlign: "center",
    }}
  >
    Status: Not Applied
  </div>

  <button
    onClick={() => navigate("/cards")}
    style={{
      width: "100%",
      marginTop: 18,
      padding: "14px",
      border: "none",
      borderRadius: 10,
      background: "#1199fa",
      color: "#fff",
      fontWeight: 700,
      cursor: "pointer",
    }}
  >
    Apply for Orion Debit Card
  </button>
</div>



<hr style={{ margin: "25px 0" }} />

<h3>{t("tradingHistory")}</h3>

<div
  style={{
    display: "flex",
    gap: 8,
    margin: "15px 0",
    flexWrap: "wrap",
    justifyContent: isMobile ? "center" : "flex-start",
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
      {t(filter.toLowerCase())}
    </button>
  ))}
</div>

<div
  style={{
    overflowX: "auto",
    width: "100%",
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
        <th style={styles.th}>{t("symbol")}</th>
        <th style={styles.th}>{t("amount")}</th>
        <th style={styles.th}>{t("profit")}</th>
        <th style={styles.th}>{t("status")}</th>
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
            {trade.status
  ? t(trade.status.toLowerCase())
  : t("open")}
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
      📈 {t("noTradingHistory")}
    </div>
  ) : (
    <table>
      {/* Your table */}
    </table>
  )}
</div>
</div>

<div style={styles.statCard}>
  <span>{t("winningTrades")}</span>
  <strong>
    {trades.filter(t => (t.profit || 0) > 0).length}
  </strong>
</div>

<div style={styles.statCard}>
  <span>{t("losingTrades")}</span>
  <strong>
    {trades.filter(t => (t.profit || 0) < 0).length}
  </strong>
</div>

<div style={styles.statCard}>
  <span>{t("winRate")}</span>
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
  <span>{t("accountStatus")}</span>
  <strong
    style={{
      color: user?.emailVerified ? "#16a34a" : "#f59e0b",
    }}
  >
    {user?.emailVerified ? t("verified") : t("pending")}
  </strong>
</div>

<hr />

<div
  style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: 10,
  }}
>
           <button
  onClick={() => executeTrade("deposit")}
  style={buyBtn}
>
  {t("deposit")}
</button>

<button
  onClick={() => setShowWithdraw(true)}
  style={sellBtn}
>
  {t("withdraw")}
</button>
          </div>

          <hr />

        <h3 style={{ marginTop: 25 }}>{t("openPositions")}</h3>

<div
  style={{
    overflowX: "auto",
    marginTop: 12,
    width: "100%",
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
        <th style={styles.th}>{t("asset")}</th>
        <th style={styles.th}>{t("type")}</th>
        <th style={styles.th}>{t("profit")}</th>
        <th style={styles.th}>{t("status")}</th>
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
              {trade.side
  ? t(trade.side.toLowerCase())
  : t("buy")}
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
              {t("open")}
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
            {t("noActivePositions")}
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
  gap: 20,
  width: "100%",
},
panel: {
  background: "var(--card-bg)",
  padding: 16,
  borderRadius: 12,
  border: "1px solid #1f2937",
  overflow: "hidden",
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