import React from "react";
import { useTranslation } from "react-i18next";

export default function WithdrawModal({
  show,
  setShowWithdraw,
  trader,
}) {
  const { t } = useTranslation();
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(6,8,9,.85)",
        backdropFilter: "blur(6px)",
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
          maxWidth: 480,
          background: "#0e1114",
          border: "1px solid #1f2937",
          borderRadius: 14,
          padding: 22,
          color: "#fff",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: 10,
          }}
        >
          {t("withdrawalRequest")}
        </h2>

        <p
          style={{
            color: "#9ca3af",
            lineHeight: 1.7,
            fontSize: 13,
          }}
        >
         {t("withdrawalDescription")}
        </p>

        <div
          style={{
            background: "#161b22",
            border: "1px solid #30363d",
            borderRadius: 10,
            padding: 14,
            marginTop: 18,
          }}
        >
          <div
            style={{
              color: "#9ca3af",
              fontSize: 12,
            }}
          >
            {t("assignedAccountManager")}
          </div>

          <div
            style={{
              fontWeight: 700,
              marginTop: 6,
            }}
          >
            {trader?.name || t("orionTradingDesk")}
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 11,
              color: "#00c57d",
              letterSpacing: ".05em",
            }}
          >
            {t("withdrawalStatusAvailable")}
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            color: "#9ca3af",
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
        {t("withdrawalContactInfo")}
        </div>

        <button
          onClick={() => setShowWithdraw(false)}
          style={{
            width: "100%",
            marginTop: 22,
            padding: 12,
            background: "#1199fa",
            border: "none",
            borderRadius: 10,
            color: "#fff",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {t("contactAccountManager")}
        </button>
      </div>
    </div>
  );
}