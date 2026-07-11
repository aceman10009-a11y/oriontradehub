import React from "react";
import { useTranslation } from "react-i18next";

const SecurityMobile = () => {
  const { t } = useTranslation();

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
            {t("securityMobile.title")}
          </h2>

          <p style={{ color: "#9ca8b8", lineHeight: "1.8" }}>
            {t("securityMobile.description")}
          </p>

          <div style={{ marginTop: "25px" }}>
            <p>✓ {t("securityMobile.features.security")}</p>
            <p>✓ {t("securityMobile.features.markets")}</p>
            <p>✓ {t("securityMobile.features.ai")}</p>
          </div>

          {/* APP BUTTONS */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => window.dispatchEvent(new Event("open-app-modal"))}
              style={appBtnStyle}
            >
              🍎 {t("securityMobile.buttons.appStore")}
            </button>

            <button
              onClick={() => window.dispatchEvent(new Event("open-app-modal"))}
              style={appBtnStyle}
            >
              ▶️ {t("securityMobile.buttons.googlePlay")}
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>
            {t("securityMobile.liveSnapshot")}
          </h3>
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