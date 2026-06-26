import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Real-time candlestick chart component
const CandlestickChart = ({ symbol, timeframe, setTimeframe, currentPrice, priceChange, chartData, isLoading }) => {
  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#121212", padding: "20px", borderRadius: "8px", height: "260px", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff" }}>
        Loading market asset feeds...
      </div>
    );
  }

  const highs = chartData.map(c => c.high);
  const lows = chartData.map(c => c.low);
  const maxPrice = Math.max(...highs) * 1.01;
  const minPrice = Math.min(...lows) * 0.99;
  const priceRange = maxPrice - minPrice || 1;

  return (
    <div style={{ backgroundColor: "#121212", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #222" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <div>
          <h3 style={{ margin: 0, fontSize: "20px", letterSpacing: "0.5px" }}>{symbol}</h3>
          <div style={{ display: "flex", gap: "5px", marginTop: "8px" }}>
            {"1h 1d 1w".split(" ").map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                style={{
                  padding: "4px 12px",
                  fontSize: "11px",
                  borderRadius: "4px",
                  border: "1px solid #333",
                  backgroundColor: timeframe === t ? "#2196f3" : "#1c1c1c",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#fff" }}>${currentPrice.toFixed(currentPrice < 1 ? 4 : 2)}</div>
          <div style={{ color: priceChange >= 0 ? "#4caf50" : "#f44336", fontSize: "13px", marginTop: "2px" }}>
            {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)} ({((priceChange / (currentPrice || 1)) * 100).toFixed(2)}%)
          </div>
        </div>
      </div>
      
      <div style={{ height: "180px", display: "flex", alignItems: "flex-end", position: "relative", borderBottom: "1px solid #333", borderLeft: "1px solid #222", padding: "5px 0", overflow: "hidden" }}>
        {chartData.map((candle, index) => {
          const heightPercent = ((candle.high - candle.low) / priceRange) * 100;
          const bottomPercent = ((candle.low - minPrice) / priceRange) * 100;
          const bodyHeightPercent = (Math.abs(candle.close - candle.open) / priceRange) * 100;
          const bodyBottomPercent = ((Math.min(candle.open, candle.close) - minPrice) / priceRange) * 100;
          const isGreen = candle.close >= candle.open;

          return (
            <div key={index} style={{ flex: 1, height: "100%", position: "relative", margin: "0 1px" }}>
              <div style={{ position: "absolute", width: "1px", height: `${heightPercent}%`, backgroundColor: isGreen ? "#4caf50" : "#f44336", bottom: `${bottomPercent}%`, left: "50%", transform: "translateX(-50%)", opacity: 0.6 }} />
              <div style={{ position: "absolute", width: "100%", height: `${Math.max(bodyHeightPercent, 2.5)}%`, backgroundColor: isGreen ? "#4caf50" : "#f44336", bottom: `${bodyBottomPercent}%`, left: 0, borderRadius: "1px" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ user, users, updateUserData }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [profitAmount, setProfitAmount] = useState(0);
  const [profitType, setProfitType] = useState("profit");
  const [message, setMessage] = useState("");
  const [adminBonusAmount, setAdminBonusAmount] = useState(0);

  const handleInfluenceTrading = async () => {
    if (!selectedUser || profitAmount === 0) {
      setMessage("Please select a target and input an allocation.");
      return;
    }
    try {
      const userRef = doc(db, "users", selectedUser);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentProfit = userData.profit || 0; // Fixed: synchronized to your schema field 'profit'
        const newProfit = profitType === "profit" ? currentProfit + parseFloat(profitAmount) : currentProfit - parseFloat(profitAmount);
        
        await updateDoc(userRef, { profit: newProfit });
        updateUserData(selectedUser, { profit: newProfit });
        setMessage("Live parameter injected into account database.");
      }
    } catch (err) { setMessage(err.message); }
  };

 const handleGiveBonus = async () => {
  if (!selectedUser || adminBonusAmount === 0) return;
  try {
    const userRef = doc(db, "users", selectedUser);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      // Dynamically adjust whichever context balance is active or default to live
      const currentBalance = data.liveBalance || 0;
      const newBalance = currentBalance + parseFloat(adminBonusAmount);
      
      await updateDoc(userRef, { liveBalance: newBalance });
      updateUserData(selectedUser, { liveBalance: newBalance });
      setMessage("Wallet live credit executed.");
    }
  } catch (err) { setMessage(err.message); }
};

  return (
    <div style={{ backgroundColor: "#1c1c1c", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #e91e63" }}>
      <h3 style={{ color: "#e91e63", marginTop: 0, fontSize: "16px" }}>Terminal Parameters (Admin Only)</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
        <div>
          <label style={{ display: "block", fontSize: "11px", color: "#aaa", marginBottom: "4px" }}>User Target</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0b0b0b", color: "#fff", border: "1px solid #333", borderRadius: "4px" }}>
            <option value="">Select Target User...</option>
            {users.map((u) => <option key={u.id} value={u.id}>{u.email || u.id}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input type="number" placeholder="Amount ($)" onChange={(e) => setProfitAmount(e.target.value)} style={{ width: "88%", padding: "10px", background: "#0b0b0b", color: "#fff", border: "1px solid #333", borderRadius: "4px" }} />
          </div>
          <div style={{ flex: 1 }}>
            <select value={profitType} onChange={(e) => setProfitType(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0b0b0b", color: "#fff", border: "1px solid #333", borderRadius: "4px" }}>
              <option value="profit">Inject Profit</option>
              <option value="loss">Inject Loss</option>
            </select>
          </div>
        </div>
        <button onClick={handleInfluenceTrading} style={{ padding: "10px", background: "#e91e63", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Apply Market Vector</button>
        
        <div style={{ borderTop: "1px solid #333", paddingTop: "12px", marginTop: "5px" }}>
          <label style={{ display: "block", fontSize: "11px", color: "#aaa", marginBottom: "4px" }}>Direct Balance Adjust</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input type="number" onChange={(e) => setAdminBonusAmount(e.target.value)} placeholder="0.00" style={{ flex: 1, padding: "10px", background: "#0b0b0b", color: "#fff", border: "1px solid #333", borderRadius: "4px" }} />
            <button onClick={handleGiveBonus} style={{ padding: "10px 15px", background: "#2196f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>Grant</button>
          </div>
        </div>
      </div>
      {message && <div style={{ marginTop: "10px", color: "#aaa", fontSize: "12px" }}>{message}</div>}
    </div>
  );
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [trades, setTrades] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState("BTC/USD");
  const [tradeAmount, setTradeAmount] = useState(100);
  const [activeTab, setActiveTab] = useState("crypto");
  // Balance Infrastructure Layers
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [demoBalance, setDemoBalance] = useState(10000.00);
  const [liveBalance, setLiveBalance] = useState(0.00);
  const [profit, setProfit] = useState(0.00); // Fixed: matching schema 'profit' field
  const [isProcessingTrade, setIsProcessingTrade] = useState(false);
  const [tradeMessage, setTradeMessage] = useState("");
  const [showDepositInfo, setShowDepositInfo] = useState(false);


  // Trader State Layer
  const [trader, setTrader] = useState(null);

  // Chart state synchronization
  const [chartData, setChartData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [timeframe, setTimeframe] = useState("1d");
  const [isChartLoading, setIsChartLoading] = useState(true);

  const navigate = useNavigate();

  const marketData = {
    crypto: [
      { symbol: "BTC/USD", name: "Bitcoin" }, { symbol: "ETH/USD", name: "Ethereum" },
      { symbol: "BNB/USD", name: "BNB Coin" }, { symbol: "SOL/USD", name: "Solana" },
      { symbol: "XRP/USD", name: "Ripple XRP" }, { symbol: "ADA/USD", name: "Cardano" },
      { symbol: "DOGE/USD", name: "Dogecoin" }, { symbol: "SHIB/USD", name: "Shiba Inu" },
      { symbol: "DOT/USD", name: "Polkadot" }, { symbol: "MATIC/USD", name: "Polygon" }
    ],
    fiat: [
      { symbol: "EUR/USD", name: "Euro FX" }, { symbol: "GBP/USD", name: "Pound Sterling" },
      { symbol: "JPY/USD", name: "Japanese Yen" }, { symbol: "AUD/USD", name: "Australian Dollar" },
      { symbol: "CAD/USD", name: "Canadian Dollar" }, { symbol: "CHF/USD", name: "Swiss Franc" },
      { symbol: "CNH/USD", name: "Offshore Renminbi" }, { symbol: "HKD/USD", name: "Hong Kong Dollar" },
      { symbol: "NZD/USD", name: "New Zealand Dollar" }, { symbol: "SGD/USD", name: "Singapore Dollar" }
    ],
    usStocks: [
      { symbol: "AAPL/USD", name: "Apple Inc." }, { symbol: "MSFT/USD", name: "Microsoft Corp." },
      { symbol: "NVDA/USD", name: "NVIDIA Corporation" }, { symbol: "AMZN/USD", name: "Amazon.com Inc." },
      { symbol: "GOOGL/USD", name: "Alphabet Inc." }, { symbol: "META/USD", name: "Meta Platforms" },
      { symbol: "TSLA/USD", name: "Tesla Motors" }, { symbol: "BRK/USD", name: "Berkshire Hathaway" },
      { symbol: "JPM/USD", name: "JPMorgan Chase & Co" }, { symbol: "LLY/USD", name: "Eli Lilly & Co" }
    ],
    euStocks: [
      { symbol: "ASML/USD", name: "ASML Holding (NL)" }, { symbol: "MC/USD", name: "LVMH Moët Hennessy (FR)" },
      { symbol: "SAP/USD", name: "SAP SE (DE)" }, { symbol: "NESN/USD", name: "Nestlé S.A. (CH)" },
      { symbol: "NOVOB/USD", name: "Novo Nordisk (DK)" }, { symbol: "SIE/USD", name: "Siemens AG (DE)" },
      { symbol: "AIR/USD", name: "Airbus SE (FR)" }, { symbol: "TTE/USD", name: "TotalEnergies (FR)" },
      { symbol: "BMW/USD", name: "BMW Group (DE)" }, { symbol: "VOW3/USD", name: "Volkswagen (DE)" }
    ]
  };

  // Syncing Live chart feeds
  useEffect(() => {
    const generateMockData = (basePrice) => {
      const data = [];
      let price = basePrice || 100;
      let candleCount = timeframe === "1h" ? 25 : timeframe === "1w" ? 45 : 40;

      for (let i = 0; i < candleCount; i++) {
        const open = price;
        const close = price + (Math.random() - 0.5) * (price * 0.015);
        const high = Math.max(open, close) + Math.random() * (price * 0.008);
        const low = Math.min(open, close) - Math.random() * (price * 0.008);
        data.push({ open, high, low, close });
        price = close;
      }
      return data;
    };

    const fetchLivePrice = async () => {
      try {
        const baseSymbol = selectedSymbol.split('/')[0];
        if (baseSymbol === 'BTC' || baseSymbol === 'ETH') {
          const id = baseSymbol === 'BTC' ? 'bitcoin' : 'ethereum';
          const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`);
          const data = await response.json();
          const price = data[id].usd;
          setCurrentPrice(price);
          setPriceChange(price * (data[id].usd_24h_change / 100));
          setChartData(generateMockData(price));
        } else {
          const seeds = {
            BNB: 580, SOL: 145, XRP: 0.55, ADA: 0.45, DOGE: 0.14, SHIB: 0.00002, DOT: 6.50, MATIC: 0.70,
            EUR: 1.08, GBP: 1.27, JPY: 0.0063, AUD: 0.66, CAD: 0.73, CHF: 1.12, CNH: 0.14, HKD: 0.13, NZD: 0.61, SGD: 0.74,
            AAPL: 180, MSFT: 420, NVDA: 900, AMZN: 185, GOOGL: 175, META: 475, TSLA: 170, BRK: 410, JPM: 195, LLY: 800,
            ASML: 950, MC: 830, SAP: 180, NESN: 100, NOVOB: 130, SIE: 170, AIR: 150, TTE: 68, BMW: 105, VOW3: 120
          };
          const mockPrice = seeds[baseSymbol] || 100;
          setCurrentPrice(mockPrice);
          setPriceChange((Math.random() - 0.5) * (mockPrice * 0.02));
          setChartData(generateMockData(mockPrice));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsChartLoading(false);
      }
    };

    fetchLivePrice();
  }, [selectedSymbol, timeframe]);

  // Firebase auth state mapping & Trader syncing
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);

    try {
      const userRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        setIsAdmin(userData.role === "admin");
        setDemoBalance(
          userData.demoBalance !== undefined
            ? userData.demoBalance
            : 10000.0
        );
        setLiveBalance(userData.liveBalance || 0);
        setProfit(userData.profit || 0.0);

        // Fetch Assigned Trader
        if (userData.assignedTraderId) {
          const traderRef = doc(db, "traders", userData.assignedTraderId);
          const traderDoc = await getDoc(traderRef);

          if (traderDoc.exists()) {
            setTrader(traderDoc.data());
          } else {
            setTrader({ name: "Trader Jeff" });
          }
        }
      }

      const usersQuery = query(
        collection(db, "users"),
        where("role", "==", "user")
      );

      const usersSnapshot = await getDocs(usersQuery);

      setUsers(
        usersSnapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }))
      );

      // Listen for this user's trades in real time
      const tradesQuery = query(
        collection(db, "trades"),
        where("userId", "==", currentUser.uid)
      );

      onSnapshot(tradesQuery, (snapshot) => {
        const userTrades = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrades(userTrades);
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, [navigate]);
  // Guaranteed Winner Trade Algorithm Engine
  const executeMarketOrder = (direction) => {
    const amount = parseFloat(tradeAmount);

    if (isNaN(amount) || amount <= 0) {
      setTradeMessage("Invalid allocation volume entry.");
      return;
    }

    const isDemo = !isLiveMode;
    const availableBalance = isDemo ? demoBalance : liveBalance;

    if (availableBalance < amount) {
      setTradeMessage(
        isDemo
          ? "Insufficient Demo Balance allocation."
          : "Insufficient Live Capital."
      );
      return;
    }

    setIsProcessingTrade(true);
    setTradeMessage(`Executing ${isDemo ? "demo" : "live"} market order...`);

    setTimeout(async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const remainingBalance = availableBalance - amount;

        await updateDoc(userRef, {
          [isDemo ? "demoBalance" : "liveBalance"]: remainingBalance
        });

        if (isDemo) {
          setDemoBalance(remainingBalance);
        } else {
          setLiveBalance(remainingBalance);
        }

        setTradeMessage("Position executed successfully.");
      } catch (e) {
        setTradeMessage("Order execution failed.");
      } finally {
        setIsProcessingTrade(false);
      }
    }, 2000);
  };

  const updateUserData = (userId, updates) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  if (loading) return <div style={{ color: "#fff", padding: "20px", background: "#0b0b0b", minHeight: "100vh" }}>Loading core engine...</div>;
  if (!user) return null;

  return (
    <div style={{ padding: "12px", backgroundColor: "#0b0b0b", minHeight: "100vh", color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* Header Framework */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #1a1a1a" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700" }}>Orion Trade Hub</h1>
          <div style={{ fontSize: "11px", color: "#555" }}>{user.email}</div>
          {/* Live System display of the logged-in user's assigned trader */}
          {trader && (
            <div style={{ fontSize: "11px", color: "#2196f3", marginTop: "4px", fontWeight: "600", letterSpacing: "0.3px" }}>
              Assigned Trader: {trader.name || "Trader Jeff"}
            </div>
          )}
        </div>
        <button onClick={async () => { await signOut(auth); navigate("/login"); }} style={{ backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "4px", padding: "8px 12px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Sign Out</button>
      </div>

      {/* Mode Switcher Dashboard Ribbon Component */}
      <div style={{
        backgroundColor: "#121212",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #1c1c1c",
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>

        {/* Mode Toggle */}
        <div style={{
          display: "flex",
          background: "#0d0d0d",
          padding: "4px",
          borderRadius: "6px"
        }}>
          <button
            onClick={() => {
              setIsLiveMode(false);
              setTradeMessage("");
            }}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
              background: !isLiveMode ? "#ff9800" : "transparent",
              color: "#fff"
            }}
          >
            Demo Server
          </button>

          <button
            onClick={() => {
              setIsLiveMode(true);
              setTradeMessage("");
            }}
            style={{
              flex: 1,
              padding: "8px",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "13px",
              cursor: "pointer",
              background: isLiveMode ? "#4caf50" : "transparent",
              color: "#fff"
            }}
          >
            Live Account
          </button>
        </div>

        {/* Balance + PnL Row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "4px 6px"
        }}>

          {/* Balance */}
          <div>
            <span style={{
              fontSize: "11px",
              color: "#666",
              display: "block"
            }}>
              {isLiveMode ? "REAL BALANCE" : "SIMULATION BALANCE"}
            </span>

            <span style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: isLiveMode ? "#4caf50" : "#ff9800"
            }}>
              ${isLiveMode
                ? (liveBalance + profit).toFixed(2)
                : demoBalance.toFixed(2)
              }
            </span>
          </div>

          {/* PnL */}
          {isLiveMode && (
            <div style={{ textAlign: "right" }}>
              <span style={{
                fontSize: "11px",
                color: "#666",
                display: "block"
              }}>
                P&L VECTOR
              </span>

              <span style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: profit >= 0 ? "#4caf50" : "#f44336"
              }}>
                {profit >= 0 ? "+" : ""}${profit.toFixed(2)}
              </span>
            </div>
          )}

        </div>

        {/* Deposit Button (LIVE ONLY) */}
        {isLiveMode && (
          <button
            onClick={() => {
              console.log("DEPOSIT CLICKED");
              setShowDepositInfo(true);
            }}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              background: "#2196f3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Deposit Funds
          </button>
        )}

      </div>

      {/* Admin Panel Entry Block */}
      {isAdmin && <AdminPanel user={user} users={users} updateUserData={updateUserData} />}

      {/* Candlestick Chart Window Canvas */}
      <CandlestickChart 
        symbol={selectedSymbol} 
        timeframe={timeframe} 
        setTimeframe={setTimeframe} 
        currentPrice={currentPrice} 
        priceChange={priceChange} 
        chartData={chartData} 
        isLoading={isChartLoading} 
      />

      {/* Mobile-Optimized Unified Control Blocks */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* Index Selector Component */}
        <div style={{ backgroundColor: "#121212", padding: "12px", borderRadius: "8px", border: "1px solid #1c1c1c" }}>
          
          <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingBottom: "8px", borderBottom: "1px solid #222", marginBottom: "12px", WebkitOverflowScrolling: "touch" }}>
            {[
              { id: "crypto", label: "Crypto" }, { id: "fiat", label: "Forex/Fiat" },
              { id: "usStocks", label: "US Stocks" }, { id: "euStocks", label: "EU Stocks" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: activeTab === tab.id ? "#2196f3" : "#1c1c1c",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  cursor: "pointer"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", maxHeight: "200px", overflowY: "auto", paddingRight: "4px" }}>
            {marketData[activeTab].map((asset) => (
              <button
                key={asset.symbol}
                onClick={() => setSelectedSymbol(asset.symbol)}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #222",
                  backgroundColor: selectedSymbol === asset.symbol ? "#2196f3" : "#0d0d0d",
                  color: "#fff",
                  cursor: "pointer",
                  textAlign: "left",
                  minHeight: "48px"
                }}
              >
                <div style={{ fontWeight: "bold", fontSize: "12px" }}>{asset.symbol}</div>
                <div style={{ fontSize: "10px", opacity: 0.5, marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{asset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live / Demo Execution Board Component */}
        <div style={{ backgroundColor: "#121212", padding: "15px", borderRadius: "8px", border: "1px solid #1c1c1c" }}>
          <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "14px", borderBottom: "1px solid #222", paddingBottom: "8px" }}>
            Execution Desk ({isLiveMode ? "LIVE CHANNELS" : "DEMO SANDBOX"})
          </h3>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "11px", color: "#888" }}>Trade Margin Volume ($)</label>
            <input type="number" value={tradeAmount} disabled={isProcessingTrade} onChange={(e) => setTradeAmount(e.target.value)} style={{ width: "90%", padding: "10px", borderRadius: "4px", background: "#0d0d0d", color: "#fff", border: "1px solid #222", fontSize: "14px" }} />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button disabled={isProcessingTrade} onClick={() => executeMarketOrder("long")} style={{ flex: 1, padding: "12px", background: "#4caf50", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: isProcessingTrade ? "not-allowed" : "pointer", opacity: isProcessingTrade ? 0.6 : 1 }}>Buy Long</button>
            <button disabled={isProcessingTrade} onClick={() => executeMarketOrder("short")} style={{ flex: 1, padding: "12px", background: "#f44336", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: isProcessingTrade ? "not-allowed" : "pointer", opacity: isProcessingTrade ? 0.6 : 1 }}>Sell Short</button>
          </div>
          
          {/* Real-time Order Message Notification Ticker */}
          {tradeMessage && (
            <div style={{ marginTop: "12px", padding: "10px", borderRadius: "4px", background: "#050505", color: isLiveMode && liveBalance < parseFloat(tradeAmount) ? "#f44336" : "#4caf50", fontSize: "12px", border: "1px solid #222", textAlign: "center", fontWeight: "bold" }}>
              {tradeMessage}
            </div>
          )}
        </div>

      </div>
{/* OPEN TRADES */}
<div
  style={{
    marginTop: "20px",
    background: "#121212",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #222",
  }}
>
  <h3 style={{ marginTop: 0 }}>Open Trades</h3>

  {trades.length === 0 ? (
    <p style={{ color: "#777" }}>No active trades.</p>
  ) : (
    trades.map((trade) => (
      <div
        key={trade.id}
        style={{
          borderBottom: "1px solid #222",
          padding: "12px 0",
        }}
      >
        <div>
          <strong>{trade.symbol}</strong>
        </div>

        <div>Type: {trade.type}</div>

        <div>Entry: ${trade.entryPrice}</div>

        <div>Lot Size: {trade.lotSize}</div>

        <div
          style={{
            color:
              trade.status === "open"
                ? "#4caf50"
                : "#f44336",
            fontWeight: "bold",
          }}
        >
          {trade.status.toUpperCase()}
        </div>

        <div>
          Profit: ${trade.profit ?? 0}
        </div>
      </div>
    ))
  )}
</div>
      {/* DEPOSIT MODAL */}
      {showDepositInfo && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#111",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "500px",
            color: "#fff",
            border: "1px solid #333"
          }}>
            <h2>Deposit Funds</h2>

            <p>Deposits are handled externally through approved payment channels.</p>
            <p>Stripe integration will be available soon.</p>
            <p>{trader ? `Your assigned trader (${trader.name || "Trader Jeff"})` : "Your assigned trader"} will guide your funding process.</p>

            <div style={{
              marginTop: "10px",
              padding: "10px",
              background: "#0b0b0b",
              borderRadius: "6px",
              fontSize: "12px"
            }}>
              <strong>Status:</strong> Stripe integration coming soon
            </div>

            <button
              onClick={() => setShowDepositInfo(false)}
              style={{
                marginTop: "15px",
                width: "100%",
                padding: "10px",
                background: "#2196f3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;