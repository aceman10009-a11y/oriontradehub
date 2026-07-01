import React from "react";

const PhoneMockup = () => {
  return (
    <>
      <style>{`
        .phone-wrapper{
          display:flex;
          justify-content:center;
          align-items:center;
          width:100%;
          position:relative;
          z-index:5;
        }

        .phone-glow{
          position:absolute;
          width:340px;
          height:340px;
          border-radius:50%;
          background:radial-gradient(circle,
          rgba(32,164,255,.22),
          transparent 70%);
          filter:blur(30px);
        }

        .phone{

          position:relative;

          width:290px;
          height:590px;

          border-radius:42px;

          background:#070b12;

          border:1px solid rgba(255,255,255,.08);

          box-shadow:
          0 35px 80px rgba(0,0,0,.65);

          overflow:hidden;

        }

        .phone::before{

          content:"";

          position:absolute;

          top:0;
          left:50%;

          transform:translateX(-50%);

          width:130px;
          height:28px;

          background:#111820;

          border-bottom-left-radius:20px;
          border-bottom-right-radius:20px;

          z-index:20;

        }

        .phone-screen{

          padding:48px 22px 22px;

          height:100%;

          display:flex;

          flex-direction:column;

        }

        .balance-label{

          color:#8d99aa;

          font-size:12px;

        }

        .balance{

          color:white;

          font-size:34px;

          font-weight:800;

          margin-top:8px;

        }

        .profit{

          color:#27d37f;

          font-size:14px;

          margin-top:6px;

          font-weight:700;

        }

        .chart{

          margin-top:28px;

          height:170px;

          border-radius:20px;

          background:linear-gradient(
          180deg,
          rgba(32,164,255,.15),
          rgba(32,164,255,.02));

          display:flex;

          align-items:flex-end;

          gap:6px;

          padding:18px;

        }

        .bar{

          flex:1;

          border-radius:8px;

          background:linear-gradient(
          180deg,
          #23a9ff,
          #146eff);

        }

        .actions{

          display:flex;

          gap:12px;

          margin-top:28px;

        }

        .buy{

          flex:1;

          background:#23c77a;

          color:white;

          border:none;

          padding:14px;

          border-radius:14px;

          font-weight:700;

          cursor:pointer;

        }

        .sell{

          flex:1;

          background:#ff4b63;

          color:white;

          border:none;

          padding:14px;

          border-radius:14px;

          font-weight:700;

          cursor:pointer;

        }

        .watchlist{

          margin-top:28px;

          display:flex;

          flex-direction:column;

          gap:12px;

        }

        .coin{

          display:flex;

          justify-content:space-between;

          padding:14px;

          border-radius:14px;

          background:rgba(255,255,255,.04);

        }

        .coin-name{

          color:white;

          font-weight:600;

        }

        .coin-price{

          color:#27d37f;

          font-weight:700;

        }

        @media(max-width:600px){

          .phone{

            width:260px;
            height:540px;

          }

          .balance{

            font-size:30px;

          }

        }

      `}</style>

      <div className="phone-wrapper">

        <div className="phone-glow"></div>

        <div className="phone">

          <div className="phone-screen">

            <span className="balance-label">
              Total Portfolio
            </span>

            <div className="balance">
              $248,421
            </div>

            <div className="profit">
              ▲ +5.82% Today
            </div>

            <div className="chart">

              {[35,52,46,71,60,88,74,96].map((h,i)=>(
                <div
                  key={i}
                  className="bar"
                  style={{height:`${h}%`}}
                />
              ))}

            </div>

            <div className="actions">

              <button className="buy">
                BUY
              </button>

              <button className="sell">
                SELL
              </button>

            </div>

            <div className="watchlist">

              <div className="coin">

                <span className="coin-name">
                  Bitcoin
                </span>

                <span className="coin-price">
                  $118,426
                </span>

              </div>

              <div className="coin">

                <span className="coin-name">
                  Ethereum
                </span>

                <span className="coin-price">
                  $4,281
                </span>

              </div>

              <div className="coin">

                <span className="coin-name">
                  Gold
                </span>

                <span className="coin-price">
                  $3,382
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default PhoneMockup;