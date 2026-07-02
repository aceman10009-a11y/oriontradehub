import React from "react";
import MarketTicker from "./MarketTicker";
import FeatureHeader from "./FeatureHeader";
import FeatureGrid from "./FeatureGrid";

const Features = () => {
  return (
    <>
      <style>{`
        .features-section{

          position:relative;

          width:100%;

          padding:40px 24px 120px;

          overflow:hidden;

        }

        .features-container{

          width:min(1280px,100%);

          margin:0 auto;

          position:relative;

          z-index:2;

        }

        .features-glow-left{

          position:absolute;

          width:420px;
          height:420px;

          left:-180px;
          top:180px;

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(32,164,255,.14),
          transparent 72%);

          filter:blur(45px);

          pointer-events:none;

        }

        .features-glow-right{

          position:absolute;

          width:420px;
          height:420px;

          right:-180px;
          bottom:40px;

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(0,197,125,.10),
          transparent 72%);

          filter:blur(45px);

          pointer-events:none;

        }

        @media(max-width:768px){

          .features-section{

            padding:30px 18px 90px;

          }

        }

      `}</style>

      <section id="features" className="features-section">

        <div className="features-glow-left"></div>

        <div className="features-glow-right"></div>

        <MarketTicker />

        <div className="features-container">

          <FeatureHeader />

          <FeatureGrid />

        </div>

      </section>

    </>
  );
};

export default Features;