import React from "react";
import { useTranslation } from "react-i18next";

export default function MarketHeader({
  symbol,
  price,
  connected,
}) {
  const { t } = useTranslation();
 const getDecimals = () => {
  if (symbol.includes("BTC")) return 2;
  if (symbol.includes("ETH")) return 2;
  if (symbol.includes("SOL")) return 3;
  if (symbol.includes("XAU")) return 2;
  if (symbol.includes("EUR")) return 5;
  if (symbol.includes("GBP")) return 5;
  return 2;
};

const decimals = getDecimals();

const formattedPrice =
  typeof price === "number"
    ? price.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : "--";

  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 12,
        padding: 18,
        marginBottom: 15,
        border: "1px solid #222",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              color: "#9ca3af",
            }}
          >
            {t("market")}
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {symbol}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 14,
              color: "#9ca3af",
            }}
          >
            {t("currentPrice")}
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {formattedPrice}
          </div>

          <div
            style={{
              marginTop: 6,
              color: connected ? "#22c55e" : "#ef4444",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {connected
  ? `● ${t("live")}`
  : `● ${t("disconnected")}`}
          </div>
        </div>
      </div>
    </div>
  );
}