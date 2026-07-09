import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { timeframes } from "../../core/marketEngine";
import SettingsModal from "./SettingsModal";
import NotificationModal from "./NotificationModal";

export default function TopBar({
  user,
  isLiveMode,
  setIsLiveMode,
  selectedSymbol,
  selectedTimeframe,
  setSelectedTimeframe,
  demoBalance,
  liveBalance,
}) {
  const navigate = useNavigate();

const [showSettings, setShowSettings] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

  const balance = isLiveMode ? liveBalance : demoBalance;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

const handleSettings = () => {
  setShowSettings(true);
};

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "#0d1117",
        borderBottom: "1px solid #202938",
      }}
      >
      <div
       style={{
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "space-between",
  alignItems: isMobile ? "stretch" : "center",
  padding: isMobile ? "16px" : "16px 24px",
  gap: "16px",
}}
      >
        {/* LEFT */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: ".08em",
              }}
            >
              ORION
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "#7d8590",
              }}
            >
              TRADE HUB
            </div>
          </div>

          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00c57d",
              boxShadow: "0 0 12px #00c57d",
            }}
          />

          <div
            style={{
              color: "#9ca3af",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            CONNECTED
          </div>
        </div>

       <div
  style={{
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <span
    style={{
      color: "#9ca3af",
      fontSize: 13,
    }}
  >
    Welcome back,
  </span>

  <span
    style={{
      color: "#fff",
      fontSize: isMobile ? 18 : 20,
      fontWeight: 700,
    }}
  >
    {user?.displayName ||
      user?.email?.split("@")[0] ||
      "Investor"}
  </span>
</div>

        {/* RIGHT */}

        <div
         style={{
  display: "flex",
  justifyContent: isMobile ? "center" : "flex-end",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  width: isMobile ? "100%" : "auto",
}}
        >
          <button
            onClick={() => setIsLiveMode(false)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: !isLiveMode ? "#1199fa" : "#1b2330",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            DEMO
          </button>

          <button
            onClick={() => setIsLiveMode(true)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: isLiveMode ? "#00c57d" : "#1b2330",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            LIVE
          </button>

          <div
            style={{
              background: "#111827",
              border: "1px solid #293548",
              borderRadius: "10px",
              padding: "10px 14px",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#7d8590",
              }}
            >
              ACCOUNT
                       </div>

            <div
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "14px",
              }}
            >
              ${Number(balance).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BAR */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "flex-start",
          gap: "12px",
          padding: isMobile ? "16px" : "12px 24px",
          borderTop: "1px solid #161b22",
          borderBottom: "1px solid #161b22",
          background: "#0f141b",
          flexWrap: "wrap",
        }}
      >
        <button
          title="Notifications"
          onClick={() => setShowNotifications(true)}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            border: "1px solid #2b3139",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          🔔
        </button>

        <button
          title="Settings"
          onClick={handleSettings}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            border: "1px solid #2b3139",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ⚙️
        </button>

        <div
          style={{
            marginLeft: isMobile ? 0 : "auto",
            width: isMobile ? "100%" : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "flex-start",
            gap: "12px",
            background: "#111827",
            border: "1px solid #2b3139",
            borderRadius: "12px",
            padding: "10px 14px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#1199fa,#00c57d)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>

          <div
            style={{
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              {user?.email?.split("@")[0] || "User"}
            </div>

            <div
              style={{
                color: "#7d8590",
                fontSize: "11px",
                wordBreak: "break-word",
              }}
            >
              {user?.email || "user@orion"}
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#f23645",
              color: "#fff",
              fontWeight: 700,
              width: isMobile ? "100%" : "auto",
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* TIMEFRAME BAR */}

      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          padding: isMobile ? "12px 16px" : "12px 20px",
          background: "#0f141b",
          borderTop: "1px solid #1c2432",
          scrollbarWidth: "none",
        }}
      >
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            style={{
              padding: "8px 14px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              background:
                selectedTimeframe === tf ? "#1199fa" : "#161b22",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {tf}
          </button>
        ))}
      </div>

      <SettingsModal
        show={showSettings}
        setShowSettings={setShowSettings}
        user={user}
      />

      <NotificationModal
        show={showNotifications}
        setShowNotifications={setShowNotifications}
      />

    </header>
  );
}