import React from "react";

const markets = [
  { symbol: "BTC/USD", price: "$118,426", change: "+2.81%" },
  { symbol: "ETH/USD", price: "$4,281", change: "+1.62%" },
  { symbol: "XAU/USD", price: "$3,382", change: "+0.74%" },
  { symbol: "EUR/USD", price: "1.1768", change: "+0.18%" },
  { symbol: "NASDAQ", price: "23,941", change: "+0.83%" },
  { symbol: "S&P 500", price: "6,284", change: "+0.44%" },
];

const MarketTicker = () => {
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

          color:#21d07a;

          font-size:14px;

          font-weight:700;

        }

        @keyframes marketScroll{

          from{
            transform:translateX(0);
          }

          to{
            transform:translateX(-50%);
          }

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

            <div
              key={index}
              className="market-item"
            >

              <span className="market-symbol">
                {item.symbol}
              </span>

              <span className="market-price">
                {item.price}
              </span>

              <span className="market-change">
                {item.change}
              </span>

            </div>

          ))}

        </div>

      </section>
    </>
  );
};

export default MarketTicker;