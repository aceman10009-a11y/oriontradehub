import React from "react";

export default function NotificationModal({
  show,
  setShowNotifications,
}) {
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
          Notifications
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
            Account Update
          </div>

          <div
            style={{
              color: "#9ca3af",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            Your trading account is active and ready.
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
            Security Notice
          </div>

          <div
            style={{
              color: "#9ca3af",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            Keep your account credentials secure.
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
          Close
        </button>

      </div>
    </div>
  );
}