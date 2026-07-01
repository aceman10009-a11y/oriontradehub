// src/core/tradingEngine.js
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const createTrade = async ({
  userId,
  symbol,
  side,
  price,
  amount,
  isLiveMode,
}) => {
  const trade = {
    userId,
    symbol,
    side,
    entryPrice: price,
    amount: Number(amount),
    status: "OPEN",
    mode: isLiveMode ? "LIVE" : "DEMO",
    profit: 0,
    createdAt: Date.now(),
  };

  await addDoc(collection(db, "trades"), trade);
};

export const calculatePnL = (trades, currentPrice) => {
  return trades.map((t) => {
    let profit =
      t.side === "BUY"
        ? (currentPrice - t.entryPrice) * t.amount
        : (t.entryPrice - currentPrice) * t.amount;

    return { ...t, profit };
  });
};

export const closeTrade = async (tradeId) => {
  await updateDoc(doc(db, "trades", tradeId), {
    status: "CLOSED",
  });
};