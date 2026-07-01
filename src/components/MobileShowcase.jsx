import React from "react";
import ShowcaseText from "./ShowcaseText";
import PhoneMockup from "./PhoneMockup";

const MobileShowcase = () => {
  return (
    <>
      <style>{`
        .mobile-showcase{

          position:relative;

          width:100%;

          padding:120px 24px;

          overflow:hidden;

          background:
          linear-gradient(
            180deg,
            rgba(5,8,12,.15),
            rgba(5,8,12,.45)
          );

        }

        .mobile-container{

          width:min(1300px,100%);

          margin:auto;

          display:grid;

          grid-template-columns:1fr 1fr;

          align-items:center;

          gap:80px;

        }

        .mobile-container>*{

          position:relative;

          z-index:5;

        }

        .blur-left{

          position:absolute;

          width:450px;
          height:450px;

          left:-180px;
          top:40px;

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(17,153,250,.18),
          transparent 72%);

          filter:blur(40px);

          pointer-events:none;

        }

        .blur-right{

          position:absolute;

          width:420px;
          height:420px;

          right:-150px;
          bottom:0;

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(0,197,125,.14),
          transparent 72%);

          filter:blur(45px);

          pointer-events:none;

        }

        @media(max-width:1000px){

          .mobile-container{

            grid-template-columns:1fr;

            gap:70px;

          }

        }

        @media(max-width:768px){

          .mobile-showcase{

            padding:90px 20px;

          }

        }

      `}</style>

      <section className="mobile-showcase">

        <div className="blur-left"></div>

        <div className="blur-right"></div>

        <div className="mobile-container">

          <ShowcaseText />

          <PhoneMockup />

        </div>

      </section>
    </>
  );
};

export default MobileShowcase;