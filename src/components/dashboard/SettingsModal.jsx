import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SettingsModal({
  show,
  setShowSettings,
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          {t("accountSettings")}
        </h2>

        <p
          style={{
            color: "#9ca3af",
            lineHeight: 1.5,
          }}
        >
          {t("manageSettings")}
        </p>

        <button
          onClick={openSettings}
          style={{
            width: "100%",
            padding: 12,
            border: "none",
            borderRadius: 10,
            background: "#1199fa",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          {t("openSettings")}
        </button>

        <button
          onClick={() => setShowSettings(false)}
          style={{
            width: "100%",
            padding: 12,
            border: "1px solid #374151",
            borderRadius: 10,
            background: "transparent",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}