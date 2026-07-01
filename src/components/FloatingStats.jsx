import React from "react";
import "./floatingStats.css";

const stats = [
  {
    title: "BTC/USD",
    value: "$118,426",
    change: "+3.84%",
    positive: true,
  },
  {
    title: "NASDAQ",
    value: "+1.72%",
    change: "Bullish",
    positive: true,
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

const FloatingStats = () => {
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