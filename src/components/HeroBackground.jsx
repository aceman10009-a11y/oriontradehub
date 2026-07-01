import React from "react";
import bg from "../assets/orion-constellation-bg.png";

const HeroBackground = () => {
  return (
    <>
      <style>{`
        .hero-bg{
          position:absolute;
          inset:0;
          overflow:hidden;
          z-index:0;
        }

        .hero-image{
          position:absolute;
          inset:0;

          background-image:url(${bg});
          background-size:cover;
          background-position:center;
          background-repeat:no-repeat;

          transform:scale(1.08);

          filter:
            brightness(.45)
            saturate(1.15)
            contrast(1.1);

          animation:heroZoom 35s ease-in-out infinite alternate;
        }

        .hero-dark{
          position:absolute;
          inset:0;

          background:
          linear-gradient(
            180deg,
            rgba(4,7,12,.45) 0%,
            rgba(4,7,12,.72) 45%,
            rgba(3,5,8,.95) 100%
          );
        }

        .hero-grid{

          position:absolute;
          inset:0;

          background-image:

          linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),

          linear-gradient(
          90deg,
          rgba(255,255,255,.02) 1px,
          transparent 1px);

          background-size:60px 60px;

          opacity:.18;

        }

        .blue-orb-one{

          position:absolute;

          width:420px;
          height:420px;

          left:-120px;
          top:-80px;

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(17,153,250,.30) 0%,
          rgba(17,153,250,.08) 45%,
          transparent 75%);

          filter:blur(40px);

          animation:floatOrb1 10s ease-in-out infinite;

        }

        .blue-orb-two{

          position:absolute;

          width:360px;
          height:360px;

          right:-100px;
          bottom:-60px;

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(0,197,125,.18),
          transparent 72%);

          filter:blur(45px);

          animation:floatOrb2 12s ease-in-out infinite;

        }

        .center-glow{

          position:absolute;

          width:700px;
          height:700px;

          left:50%;
          top:45%;

          transform:translate(-50%,-50%);

          border-radius:50%;

          background:
          radial-gradient(circle,
          rgba(17,153,250,.08),
          transparent 72%);

          animation:pulseGlow 6s ease-in-out infinite;

        }

        @keyframes heroZoom{

          from{
            transform:scale(1.08);
          }

          to{
            transform:scale(1.14);
          }

        }

        @keyframes pulseGlow{

          0%{
            opacity:.35;
            transform:translate(-50%,-50%) scale(1);
          }

          50%{
            opacity:.7;
            transform:translate(-50%,-50%) scale(1.12);
          }

          100%{
            opacity:.35;
            transform:translate(-50%,-50%) scale(1);
          }

        }

        @keyframes floatOrb1{

          0%{
            transform:translateY(0px);
          }

          50%{
            transform:translateY(40px);
          }

          100%{
            transform:translateY(0px);
          }

        }

        @keyframes floatOrb2{

          0%{
            transform:translateY(0px);
          }

          50%{
            transform:translateY(-35px);
          }

          100%{
            transform:translateY(0px);
          }

        }

        @media(max-width:768px){

          .hero-image{

            background-position:center top;

            transform:scale(1.18);

          }

          .blue-orb-one{

            width:250px;
            height:250px;

            left:-80px;

          }

          .blue-orb-two{

            width:240px;
            height:240px;

            right:-80px;

          }

          .center-glow{

            width:380px;
            height:380px;

          }

        }
      `}</style>

      <div className="hero-bg">

        <div className="hero-image"></div>

        <div className="hero-dark"></div>

        <div className="hero-grid"></div>

        <div className="blue-orb-one"></div>

        <div className="blue-orb-two"></div>

        <div className="center-glow"></div>

      </div>
    </>
  );
};

export default HeroBackground;