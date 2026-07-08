import React from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsModal({
  show,
  setShowSettings,
}) {
  const navigate = useNavigate();

  if (!show) return null;

  const openSettings = () => {
    setShowSettings(false);
    navigate("/settings");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#111827",
          borderRadius: 14,
          padding: 24,
          color: "#fff",
          textAlign: "center",
        }}
      >

        <h2>
          Account Settings
        </h2>

        <p
          style={{
            color:"#9ca3af",
            lineHeight:1.5,
          }}
        >
          Manage your profile, security, appearance,
          notifications, and trading preferences.
        </p>


        <button
          onClick={openSettings}
          style={{
            width:"100%",
            padding:12,
            border:"none",
            borderRadius:10,
            background:"#1199fa",
            color:"#fff",
            fontWeight:700,
            cursor:"pointer",
            marginBottom:10,
          }}
        >
          Open Settings
        </button>


        <button
          onClick={() => setShowSettings(false)}
          style={{
            width:"100%",
            padding:12,
            border:"1px solid #374151",
            borderRadius:10,
            background:"transparent",
            color:"#fff",
            fontWeight:600,
            cursor:"pointer",
          }}
        >
          Close
        </button>

      </div>
    </div>
  );
}