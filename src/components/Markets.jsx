import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { subscribePrices } from "../services/binanceService";
import MarketTicker from "./MarketTicker";
import MarketChart from "./MarketChart";

const marketAssets = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: "$118,426",
    change: "+2.81%",
    positive: true,
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: "$4,281",
    change: "+1.62%",
    positive: true,
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: "$168.42",
    change: "+3.41%",
    positive: true,
  },
  {
    symbol: "XAU/USD",
    name: "Gold",
    price: "$3,382",
    change: "+0.74%",
    positive: true,
  },
  {
    symbol: "NASDAQ",
    name: "NASDAQ",
    price: "23,941",
    change: "+0.83%",
    positive: true,
  },
  {
    symbol: "EUR/USD",
    name: "Euro",
    price: "1.1768",
    change: "+0.18%",
    positive: true,
  },
];

const Markets = () => {
  const { t } = useTranslation();

  const [assets, setAssets] = useState(marketAssets);
  const [selectedAsset, setSelectedAsset] = useState(marketAssets[0]);

  useEffect(() => {
    const unsubscribe = subscribePrices((livePrices) => {
      setAssets((prev) =>
        prev.map((asset) => {
          const live = livePrices[asset.symbol];

          if (!live) return asset;

          return {
            ...asset,
            price: live.price.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }),
            change: `${live.change >= 0 ? "+" : ""}${live.change.toFixed(2)}%`,
            positive: live.change >= 0,
          };
        })
      );

      setSelectedAsset((prev) => {
        const live = livePrices[prev.symbol];

        if (!live) return prev;

        return {
          ...prev,
          price: live.price.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          change: `${live.change >= 0 ? "+" : ""}${live.change.toFixed(2)}%`,
          positive: live.change >= 0,
        };
      });
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <style>{`
        .markets-section{
          position:relative;
          width:100%;
          padding:120px 24px;
          overflow:hidden;
        }

        .markets-container{
          width:min(1320px,100%);
          margin:0 auto;
          position:relative;
          z-index:2;
        }

        .markets-header{
          text-align:center;
          margin-bottom:60px;
        }

        .markets-badge{
          display:inline-block;
          padding:10px 18px;
          border-radius:999px;
          background:rgba(32,164,255,.08);
          border:1px solid rgba(32,164,255,.18);
          color:#8fd3ff;
          font-size:12px;
          font-weight:700;
          letter-spacing:.15em;
          margin-bottom:24px;
        }

        .markets-title{
          color:#fff;
          font-size:clamp(38px,5vw,62px);
          font-weight:900;
          letter-spacing:-.04em;
          margin:0;
        }

        .markets-title span{
          color:#20a4ff;
        }

        .markets-text{
          width:min(720px,100%);
          margin:24px auto 0;
          color:#9ca8b8;
          line-height:1.9;
          font-size:17px;
        }

        .markets-grid{
          margin-top:60px;
        }

        .market-content{
          display:grid;
          grid-template-columns:2fr 1fr;
          gap:32px;
          align-items:start;
          margin-top:50px;
        }

        @media(max-width:992px){
          .market-content{
            grid-template-columns:1fr;
          }
        }

        @media(max-width:768px){
          .markets-section{
            padding:90px 18px;
          }
        }
      `}</style>

      <section id="markets" className="markets-section">

        <div className="markets-container">

          <div className="markets-header">

            <div className="markets-badge">
              {t("markets.badge")}
            </div>

            <h2 className="markets-title">
              {t("markets.title")} <span>{t("markets.titleHighlight")}</span>
            </h2>

            <p className="markets-text">
              {t("markets.description")}
            </p>

          </div>

          <MarketTicker />

          <div className="markets-grid">

            <div className="market-content">

              <div>

                <MarketChart
                  symbol={selectedAsset.symbol}
                  currentPrice={Number(
                    String(selectedAsset.price).replace(/[$,]/g, "")
                  )}
                />

              </div>

              <div
                className="market-assets"
                style={{
                  display: "grid",
                  gap: "16px",
                }}
              >

                {assets.map((asset) => (

                  <button
                    key={asset.symbol}
                    onClick={() => setSelectedAsset(asset)}
                    style={{
                      background:
                        selectedAsset.symbol === asset.symbol
                          ? "rgba(32,164,255,.15)"
                          : "rgba(255,255,255,.04)",

                      border:
                        selectedAsset.symbol === asset.symbol
                          ? "1px solid rgba(32,164,255,.4)"
                          : "1px solid rgba(255,255,255,.08)",

                      borderRadius: "18px",
                      padding: "18px",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "#fff",
                      transition: ".3s",
                    }}
                  >

                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      {asset.symbol}
                    </div>

                    <div
                      style={{
                        color: "#a7b4c5",
                        marginTop: "6px",
                      }}
                    >
                      {asset.price}
                    </div>

                    <div
                      style={{
                        marginTop: "8px",
                        color: asset.positive ? "#22d07b" : "#ff5d5d",
                        fontWeight: 700,
                      }}
                    >
                      {asset.change}
                    </div>

                  </button>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
};

export default Markets;