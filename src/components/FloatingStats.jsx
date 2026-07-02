import React, { useEffect, useState } from "react";
import "./floatingStats.css";
import { subscribePrices } from "../services/binanceService";

const FloatingStats = () => {
  const [prices, setPrices] = useState({
    "BTC/USD": {
      price: 118426,
      change: 0,
    },
    "ETH/USD": {
      price: 4281,
      change: 0,
    },
  });

  useEffect(() => {
    const unsubscribe = subscribePrices((livePrices) => {
      setPrices((prev) => ({
        ...prev,
        ...livePrices,
      }));
    });

    return unsubscribe;
  }, []);

  const stats = [
    {
      title: "BTC/USD",
      value: `$${Number(prices["BTC/USD"]?.price || 0).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      change: `${prices["BTC/USD"]?.change >= 0 ? "+" : ""}${Number(
        prices["BTC/USD"]?.change || 0
      ).toFixed(2)}%`,
      positive: (prices["BTC/USD"]?.change || 0) >= 0,
    },
    {
      title: "ETH/USD",
      value: `$${Number(prices["ETH/USD"]?.price || 0).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}`,
      change: `${prices["ETH/USD"]?.change >= 0 ? "+" : ""}${Number(
        prices["ETH/USD"]?.change || 0
      ).toFixed(2)}%`,
      positive: (prices["ETH/USD"]?.change || 0) >= 0,
    },
    {
      title: "FOREX",
      value: "128 Pairs",
      change: "Live",
      positive: true,
    },
    {
      title: "CLIENTS",
      value: "214K+",
      change: "Worldwide",
      positive: true,
    },
  ];

  return (
    <div className="floating-wrapper">
      {stats.map((card, index) => (
        <div
          key={index}
          className={`floating-card float-${index + 1}`}
        >
          <span className="floating-title">
            {card.title}
          </span>

          <h3>{card.value}</h3>

          <p className={card.positive ? "green" : "red"}>
            {card.change}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FloatingStats;