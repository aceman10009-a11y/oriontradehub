import React from "react";

const FeatureHeader = () => {
  return (
    <>
      <style>{`
        .feature-header{

          width:100%;
          max-width:760px;

          margin:0 auto 70px;

          text-align:center;

          position:relative;

          z-index:5;

        }

        .feature-badge{

          display:inline-flex;

          align-items:center;

          gap:10px;

          padding:10px 18px;

          border-radius:999px;

          background:rgba(10,16,24,.60);

          border:1px solid rgba(32,164,255,.20);

          backdrop-filter:blur(18px);

          color:#86cbff;

          font-size:12px;

          font-weight:700;

          letter-spacing:.14em;

          text-transform:uppercase;

          box-shadow:
          0 0 28px rgba(32,164,255,.12);

        }

        .feature-dot{

          width:8px;
          height:8px;

          border-radius:50%;

          background:#21a8ff;

          box-shadow:
          0 0 12px #21a8ff;

        }

        .feature-title{

          margin-top:28px;

          color:white;

          font-size:clamp(34px,5vw,60px);

          line-height:1.08;

          font-weight:900;

          letter-spacing:-.05em;

        }

        .feature-title span{

          color:#20a4ff;

        }

        .feature-description{

          margin:24px auto 0;

          max-width:620px;

          color:#97a6b7;

          line-height:1.8;

          font-size:17px;

        }

        @media(max-width:768px){

          .feature-header{

            margin-bottom:50px;

            width:92%;

          }

          .feature-description{

            font-size:16px;

          }

        }

      `}</style>

      <div className="feature-header">

        <div className="feature-badge">

          <div className="feature-dot"></div>

          PLATFORM FEATURES

        </div>

        <h2 className="feature-title">

          Everything You Need

          <br />

          <span>To Trade Smarter.</span>

        </h2>

        <p className="feature-description">

          Orion Trade Hub combines institutional execution,
          AI-powered insights, advanced portfolio management,
          multi-asset trading and enterprise-grade security into
          one premium trading experience.

        </p>

      </div>
    </>
  );
};

export default FeatureHeader;