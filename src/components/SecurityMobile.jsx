import React from "react";

const SecurityMobile = () => {
  return (
    <section
      id="security"
      style={{
        padding: "120px 20px",
        background: "#050608",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        {/* LEFT CONTENT */}
        <div>
          <h2 style={{ fontSize: "42px", marginBottom: "20px" }}>
            Security & Mobile Platform
          </h2>

          <p style={{ color: "#9ca8b8", lineHeight: "1.8" }}>
            Orion Trade Hub is built with institutional-grade security,
            encrypted infrastructure, and real-time risk monitoring systems.
            Your funds and data are protected with multi-layer safeguards.
          </p>

          <div style={{ marginTop: "25px" }}>
            <p>✓ Bank-Level Security</p>
            <p>✓ 24/7 Global Markets</p>
            <p>✓ AI Assisted Trading</p>
          </div>

          {/* APP BUTTONS (2 + 2 STYLE) */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button onClick={() => window.dispatchEvent(new Event("open-app-modal"))} style={appBtnStyle}>
              🍎 App Store
            </button>

            <button onClick={() => window.dispatchEvent(new Event("open-app-modal"))} style={appBtnStyle}>
              ▶️ Google Play
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT (LIVE STATS MOCK) */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>LIVE MARKET SNAPSHOT</h3>

          <div style={{ display: "grid", gap: "12px" }}>
            <div>BTC/USD — $61,565.29 — 0.00%</div>
            <div>ETH/USD — $1,696.26 — 0.00%</div>
            <div>FOREX — 128 Pairs — Live</div>
            <div>CLIENTS — 214K+ Worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const appBtnStyle = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  cursor: "pointer",
  fontSize: "13px",
};

export default SecurityMobile;