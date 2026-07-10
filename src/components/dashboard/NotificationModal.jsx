import React from "react";
import { useTranslation } from "react-i18next";

export default function NotificationModal({
  show,
  setShowNotifications,
}) {
  const { t } = useTranslation();
  if (!show) return null;

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
          border: "1px solid #293548",
          borderRadius: 14,
          padding: 20,
          color: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          {t("notifications")}
        </h2>

        <div
          style={{
            background: "#0b0f14",
            padding: 14,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 700 }}>
            {t("accountUpdate")}
          </div>

          <div
            style={{
              color: "#9ca3af",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            {t("accountUpdateMessage")}
          </div>
        </div>

        <div
          style={{
            background: "#0b0f14",
            padding: 14,
            borderRadius: 10,
          }}
        >
          <div style={{ fontWeight: 700 }}>
            {t("securityNotice")}
          </div>

          <div
            style={{
              color: "#9ca3af",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            {t("securityNoticeMessage")}
          </div>
        </div>

        <button
          onClick={() => setShowNotifications(false)}
          style={{
            width: "100%",
            marginTop: 16,
            padding: 12,
            border: "none",
            borderRadius: 10,
            background: "#1199fa",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {t("close")}
        </button>

      </div>
    </div>
  );
}