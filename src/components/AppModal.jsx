import React, { useEffect, useState } from "react";

const AppModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);

    window.addEventListener("open-app-modal", handler);

    return () =>
      window.removeEventListener("open-app-modal", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2>Apps Under Maintenance</h2>
        <p style={{ color: "#aaa", marginTop: "10px" }}>
          Mobile apps are currently being upgraded. Please use the web platform for now.
        </p>

        <button
          onClick={() => setOpen(false)}
          style={{
            marginTop: "20px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#22a7ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AppModal;