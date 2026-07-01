import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export default function TopBar({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "rgba(14, 17, 20, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #1e2329",
        padding: "14px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          ORION TRADE HUB
        </h1>

        <span
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            fontFamily: "monospace",
            marginTop: "2px",
          }}
        >
          {user?.email || "user@orion"}
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#00c57d",
          }}
        />

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#f23645",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 700,
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}