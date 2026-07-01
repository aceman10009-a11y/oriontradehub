import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function AdminPanel({ users = [], updateUserData }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [amount, setAmount] = useState(0);
  const [mode, setMode] = useState("profit");
  const [message, setMessage] = useState("");

  const applyUpdate = async () => {
    if (!selectedUser || !amount) {
      setMessage("Select user and enter amount.");
      return;
    }

    try {
      const userRef = doc(db, "users", selectedUser);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        setMessage("User not found.");
        return;
      }

      const data = snap.data();
      const current = data.profit || 0;

      const updated =
        mode === "profit"
          ? current + parseFloat(amount)
          : current - parseFloat(amount);

      await updateDoc(userRef, { profit: updated });

      updateUserData?.(selectedUser, { profit: updated });

      setMessage("Update applied successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Update failed.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#0e1114",
        border: "1px solid #1e2329",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "20px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#ec4899",
          letterSpacing: "0.1em",
        }}
      >
        Admin Control Panel
      </h3>

      {/* USER SELECT */}
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#161a1e",
          color: "#fff",
          border: "1px solid #2b3139",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.email || u.id}
          </option>
        ))}
      </select>

      {/* AMOUNT */}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#161a1e",
          color: "#fff",
          border: "1px solid #2b3139",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      {/* MODE */}
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#161a1e",
          color: "#fff",
          border: "1px solid #2b3139",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <option value="profit">Add Profit</option>
        <option value="loss">Add Loss</option>
      </select>

      {/* BUTTON */}
      <button
        onClick={applyUpdate}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#ec4899",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        Apply Update
      </button>

      {message && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "12px",
            color: "#9ca3af",
            fontFamily: "monospace",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}