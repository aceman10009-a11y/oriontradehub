import React from "react";

export default function DepositModal({ show, setShowDepositInfo, trader }) {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(6, 8, 9, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#0e1114",
          border: "1px solid #1e2329",
          borderRadius: "14px",
          padding: "20px",
          color: "#fff",
        }}
      >
        {/* HEADER */}
        <h2
          style={{
            marginTop: 0,
            fontSize: "18px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Deposit Gateway
        </h2>

       <p style={{ fontSize: "12px", color: "#9ca3af", lineHeight: 1.7 }}>
  Deposits are handled manually by your assigned account manager to ensure
  secure funding, identity verification, and regulatory compliance. Once your
  payment has been confirmed, your trading balance will be updated promptly.
</p>

        {/* INFO BOX */}
        <div
          style={{
            backgroundColor: "#161a1e",
            border: "1px solid #2b3139",
            borderRadius: "10px",
            padding: "12px",
            marginTop: "12px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#d1d5db" }}>
            For deposit assistance, please contact your assigned account manager
            via email or any secure communication channel. They will provide you with the necessary
            instructions and support to complete your deposit securely.
          </div>

          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              marginTop: "4px",
              color: "#fff",
            }}
          >
            {trader?.name || "Assigned Trading Desk"}
          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "10px",
              fontFamily: "monospace",
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Compliance Status: VERIFIED
          </div>
        </div>

        {/* WARNING / NOTE */}
        <div
          style={{
            marginTop: "14px",
            fontSize: "11px",
            color: "#6b7280",
            lineHeight: 1.4,
          }}
        >
          To begin a deposit, please contact your assigned account manager. Payment instructions will be provided after verification of your trading account.
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShowDepositInfo(false)}
          style={{
            marginTop: "16px",
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#1199fa",
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
            cursor: "pointer",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Contact Account Manager
        </button>
      </div>
    </div>
  );
}