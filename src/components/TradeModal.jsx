import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function TradeModal({ user, onClose }) {
  const [symbol, setSymbol] = useState("BTCUSD");
  const [type, setType] = useState("BUY");
  const [entryPrice, setEntryPrice] = useState("");
  const [lotSize, setLotSize] = useState(1);

  const createTrade = async () => {
    if (!entryPrice) {
      alert("Enter entry price");
      return;
    }

    try {
      await addDoc(collection(db, "trades"), {
        userId: user.id,
        userEmail: user.email,
        symbol,
        type,
        entryPrice: Number(entryPrice),
        lotSize: Number(lotSize),
        status: "open",
        profit: 0,
        createdAt: serverTimestamp(),
      });

      alert("Trade created successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create trade");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          background: "#fff",
          color: "#000",
          padding: "20px",
          width: "300px",
          borderRadius: "8px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h3>Open Trade</h3>

        <p>
          <strong>User:</strong> {user.email}
        </p>

        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={{ width: "100%" }}
        >
          <option value="BTCUSD">BTCUSD</option>
          <option value="EURUSD">EURUSD</option>
          <option value="XAUUSD">XAUUSD</option>
        </select>

        <br />
        <br />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: "100%" }}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>

        <br />
        <br />

        <input
          type="number"
          placeholder="Entry Price"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          style={{ width: "100%" }}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Lot Size"
          value={lotSize}
          onChange={(e) => setLotSize(e.target.value)}
          style={{ width: "100%" }}
        />

        <br />
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={createTrade}>
            Open Trade
          </button>

          <button onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}