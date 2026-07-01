import React from "react";

const HeroText = () => {
  return (
    <>
      <style>{`
        .hero-text{

          position:relative;
          z-index:10;

          width:min(92%,720px);

          text-align:center;

          margin:auto;

          padding:120px 0 40px;

        }

        .hero-badge{

          display:inline-flex;

          align-items:center;

          gap:10px;

          padding:10px 18px;

          border-radius:999px;

          background:rgba(12,18,30,.65);

          border:1px solid rgba(17,153,250,.25);

          backdrop-filter:blur(18px);

          color:#87c8ff;

          font-size:12px;

          font-weight:700;

          letter-spacing:.15em;

          text-transform:uppercase;

          box-shadow:
          0 0 25px rgba(17,153,250,.12);

        }

        .hero-dot{

          width:8px;
          height:8px;

          border-radius:50%;

          background:#23a9ff;

          box-shadow:
          0 0 12px #23a9ff;

        }

        .hero-title{

          margin-top:28px;

          font-size:clamp(42px,8vw,82px);

          line-height:1.05;

          font-weight:900;

          letter-spacing:-.05em;

          color:#ffffff;

        }

        .hero-title span{

          color:#20a4ff;

        }

        .hero-subtitle{

          margin:28px auto;

          max-width:640px;

          color:#9ca9bb;

          font-size:clamp(16px,2.8vw,20px);

          line-height:1.8;

        }

        .hero-buttons{

          display:flex;

          justify-content:center;

          gap:18px;

          flex-wrap:wrap;

          margin-top:40px;

        }

        .primary-btn{

          background:
          linear-gradient(135deg,#1498ff,#0b62ff);

          color:#fff;

          border:none;

          padding:17px 34px;

          border-radius:999px;

          cursor:pointer;

          font-size:15px;

          font-weight:700;

          transition:.35s;

          box-shadow:
          0 0 35px rgba(17,153,250,.30);

        }

        .primary-btn:hover{

          transform:translateY(-3px);

          box-shadow:
          0 0 50px rgba(17,153,250,.55);

        }

        .secondary-btn{

          background:rgba(255,255,255,.04);

          border:1px solid rgba(255,255,255,.08);

          color:#fff;

          padding:17px 34px;

          border-radius:999px;

          cursor:pointer;

          font-size:15px;

          font-weight:700;

          backdrop-filter:blur(16px);

          transition:.35s;

        }

        .secondary-btn:hover{

          background:rgba(255,255,255,.08);

        }

        .hero-trust{

          margin-top:55px;

          display:flex;

          justify-content:center;

          gap:28px;

          flex-wrap:wrap;

        }

        .trust-item{

          color:#8c97a9;

          font-size:13px;

          font-weight:600;

        }

        @media(max-width:768px){

          .hero-text{

            padding-top:110px;

            width:92%;

          }

          .hero-buttons{

            flex-direction:column;

          }

          .primary-btn,
          .secondary-btn{

            width:100%;

          }

          .hero-trust{

            gap:16px;

          }

        }

      `}</style>

      <div className="hero-text">

        <div className="hero-badge">

          <div className="hero-dot"></div>

          ORION TRADE HUB

        </div>

        <h1 className="hero-title">

          Institutional Trading

          <br/>

          <span>Built For Everyone.</span>

        </h1>

        <p className="hero-subtitle">

          Experience institutional-grade execution across
          Crypto, Forex, Commodities and Global Equities
          through one beautifully engineered trading platform.

        </p>

        <div className="hero-buttons">

          <button className="primary-btn">

            Open Live Account

          </button>

          <button className="secondary-btn">

            Explore Platform

          </button>

        </div>

        <div className="hero-trust">

          <div className="trust-item">
            ✓ Bank-Level Security
          </div>

          <div className="trust-item">
            ✓ 24/7 Global Markets
          </div>

          <div className="trust-item">
            ✓ AI Assisted Trading
          </div>

        </div>

      </div>

    </>
  );
};

export default HeroText;