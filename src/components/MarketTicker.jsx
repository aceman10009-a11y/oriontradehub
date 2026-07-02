import React, { useEffect, useState } from "react";
import { subscribePrices } from "../services/binanceService";

const defaultMarkets = [
  { symbol: "BTC/USD", price: 118426, change: 0 },
  { symbol: "ETH/USD", price: 4281, change: 0 },
  { symbol: "SOL/USD", price: 168.42, change: 0 },
  { symbol: "BNB/USD", price: 680, change: 0 },
  { symbol: "XRP/USD", price: 2.10, change: 0 },
  { symbol: "ADA/USD", price: 0.72, change: 0 },
  { symbol: "DOGE/USD", price: 0.18, change: 0 },
];

export default function MarketTicker() {
  const [markets, setMarkets] = useState(defaultMarkets);

  useEffect(() => {
    const unsubscribe = subscribePrices((livePrices) => {
      setMarkets((prev) =>
        prev.map((market) => {
          const live = livePrices[market.symbol];

          if (!live) return market;

          return {
            ...market,
            price: live.price,
            change: live.change,
          };
        })
      );
    });

    return unsubscribe;
  }, []);

  const ticker = [...markets, ...markets];

  return (
    <>
      <style>{`
        .market-ticker{
          width:100%;
          overflow:hidden;
          border-top:1px solid rgba(255,255,255,.06);
          border-bottom:1px solid rgba(255,255,255,.06);
          background:rgba(9,13,20,.72);
          backdrop-filter:blur(16px);
          -webkit-backdrop-filter:blur(16px);
          padding:14px 0;
          margin-bottom:70px;
        }

        .market-track{
          display:flex;
          width:max-content;
          animation:marketScroll 34s linear infinite;
        }

        .market-item{
          display:flex;
          align-items:center;
          gap:12px;
          padding:0 34px;
          white-space:nowrap;
        }

        .market-symbol{
          color:#fff;
          font-size:14px;
          font-weight:700;
        }

        .market-price{
          color:#b8c3d3;
          font-size:14px;
        }

        .market-change{
          font-size:14px;
          font-weight:700;
        }

        @keyframes marketScroll{
          from{transform:translateX(0);}
          to{transform:translateX(-50%);}
        }

        @media(max-width:768px){
          .market-item{
            padding:0 22px;
          }
        }
      `}</style>

      <section className="market-ticker">
        <div className="market-track">
          {ticker.map((item, index) => (
            <div key={index} className="market-item">

              <span className="market-symbol">
                {item.symbol}
              </span>

              <span className="market-price">
                ${Number(item.price).toLocaleString(undefined,{
                  maximumFractionDigits:2,
                })}
              </span>

              <span
                className="market-change"
                style={{
                  color: item.change >= 0 ? "#22d07b" : "#ff5d5d",
                }}
              >
                {item.change >= 0 ? "+" : ""}
                {Number(item.change).toFixed(2)}%
              </span>

            </div>
          ))}
        </div>
      </section>
    </>
  );
}