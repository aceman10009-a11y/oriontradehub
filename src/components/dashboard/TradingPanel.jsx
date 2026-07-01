import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function TradingPanel({
  user,
  isLiveMode,
  demoBalance,
  liveBalance,
  setDemoBalance,
  setLiveBalance,
  tradeAmount,
  setTradeAmount,
  setTradeMessage,
  setIsProcessingTrade,
  isProcessingTrade,
}) {
  const [direction, setDirection] = useState("long");

  const executeTrade = async () => {
    const amount = parseFloat(tradeAmount);

    if (!amount || amount <= 0) {
      setTradeMessage("Invalid trade amount.");
      return;
    }

    const balance = isLiveMode ? liveBalance : demoBalance;

    if (balance < amount) {
      setTradeMessage("Insufficient balance.");
      return;
    }

    setIsProcessingTrade(true);
    setTradeMessage("Processing order...");

    try {
      const newBalance = balance - amount;

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        [isLiveMode ? "liveBalance" : "demoBalance"]: newBalance,
      });

      if (isLiveMode) {
        setLiveBalance(newBalance);
      } else {
        setDemoBalance(newBalance);
      }

      setTradeMessage(
        `${direction.toUpperCase()} order executed successfully.`
      );
    } catch (err) {
      console.error(err);
      setTradeMessage("Trade execution failed.");
    } finally {
      setIsProcessingTrade(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0e1114",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #1e2329",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#9ca3af",
        }}
      >
        Execution Terminal
      </h3>

      {/* INPUT */}
      <input
        type="number"
        value={tradeAmount}
        onChange={(e) => setTradeAmount(e.target.value)}
        placeholder="Trade amount"
        disabled={isProcessingTrade}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#161a1e",
          border: "1px solid #2b3139",
          borderRadius: "8px",
          color: "#fff",
          fontWeight: 700,
          marginBottom: "12px",
        }}
      />

      {/* DIRECTION */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        <button
          onClick={() => setDirection("long")}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: direction === "long" ? "#00c57d" : "#161a1e",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          BUY
        </button>

        <button
          onClick={() => setDirection("short")}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: direction === "short" ? "#f23645" : "#161a1e",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          SELL
        </button>
      </div>

      {/* EXECUTE */}
      <button
        onClick={executeTrade}
        disabled={isProcessingTrade}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "#1199fa",
          color: "#fff",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {isProcessingTrade ? "Processing..." : "Execute Trade"}
      </button>
    </div>
  );
}