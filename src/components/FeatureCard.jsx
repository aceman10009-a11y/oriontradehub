import React from "react";

const FeatureCard = ({
  icon,
  title,
  description,
  accent = "#20a4ff",
}) => {
  return (
    <>
      <style>{`
        .orion-feature-card{

          position:relative;

          overflow:hidden;

          height:100%;

          padding:28px;

          border-radius:26px;

          background:
          linear-gradient(
          180deg,
          rgba(15,20,30,.72),
          rgba(7,10,16,.88));

          border:1px solid rgba(255,255,255,.06);

          backdrop-filter:blur(18px);
          -webkit-backdrop-filter:blur(18px);

          transition:.35s ease;

          box-shadow:
          0 12px 30px rgba(0,0,0,.35);

        }

        .orion-feature-card:hover{

          transform:translateY(-10px);

          border-color:rgba(32,164,255,.28);

          box-shadow:
          0 22px 55px rgba(32,164,255,.14);

        }

        .orion-feature-card::before{

          content:"";

          position:absolute;

          top:0;
          left:0;
          right:0;

          height:4px;

          background:var(--accent);

        }

        .feature-icon{

          width:66px;
          height:66px;

          display:flex;

          align-items:center;
          justify-content:center;

          border-radius:18px;

          background:
          radial-gradient(circle,
          rgba(32,164,255,.18),
          rgba(32,164,255,.05));

          font-size:30px;

          margin-bottom:22px;

        }

        .feature-heading{

          color:#fff;

          font-size:24px;

          font-weight:800;

          margin-bottom:14px;

          letter-spacing:-.03em;

        }

        .feature-copy{

          color:#97a6b7;

          line-height:1.8;

          font-size:15px;

        }

        @media(max-width:768px){

          .orion-feature-card{

            padding:24px;

          }

          .feature-heading{

            font-size:21px;

          }

        }

      `}</style>

      <div
        className="orion-feature-card"
        style={{ "--accent": accent }}
      >
        <div className="feature-icon">
          {icon}
        </div>

        <div className="feature-heading">
          {title}
        </div>

        <div className="feature-copy">
          {description}
        </div>
      </div>
    </>
  );
};

export default FeatureCard;