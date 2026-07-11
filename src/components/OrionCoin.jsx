import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const OrionCoin = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setJoined(true);
    setEmail("");
  };

  return (
    <>
      <style>{`
        .coin-section{

          padding:120px 24px;

          position:relative;

          overflow:hidden;

        }

        .coin-card{

          width:min(980px,100%);

          margin:auto;

          padding:70px 35px;

          border-radius:32px;

          background:
          linear-gradient(
          180deg,
          rgba(14,20,30,.82),
          rgba(7,10,16,.95));

          border:1px solid rgba(255,255,255,.06);

          backdrop-filter:blur(20px);

          text-align:center;

          position:relative;

          overflow:hidden;

        }

        .coin-card::before{

          content:"";

          position:absolute;

          width:300px;
          height:300px;

          background:
          radial-gradient(circle,
          rgba(32,164,255,.18),
          transparent 70%);

          top:-120px;
          right:-80px;

          filter:blur(35px);

        }

        .coin-badge{

          display:inline-block;

          padding:10px 18px;

          border-radius:999px;

          color:#8fd3ff;

          border:1px solid rgba(32,164,255,.20);

          background:rgba(32,164,255,.08);

          font-size:12px;

          font-weight:700;

          letter-spacing:.12em;

        }

        .coin-title{

          margin:28px 0 16px;

          color:#fff;

          font-size:clamp(34px,5vw,58px);

          font-weight:900;

          letter-spacing:-.04em;

        }

        .coin-title span{

          color:#20a4ff;

        }

        .coin-text{

          color:#9ba8b8;

          max-width:620px;

          margin:auto;

          line-height:1.8;

          font-size:16px;

        }

        .coin-form{

          display:flex;

          gap:14px;

          justify-content:center;

          flex-wrap:wrap;

          margin-top:40px;

        }

        .coin-input{

          width:340px;

          max-width:100%;

          padding:16px 20px;

          border-radius:999px;

          border:1px solid rgba(255,255,255,.08);

          background:#0b1118;

          color:#fff;

          outline:none;

        }

        .coin-button{

          padding:16px 28px;

          border:none;

          border-radius:999px;

          background:#20a4ff;

          color:#fff;

          font-weight:700;

          cursor:pointer;

        }

        .coin-success{

          margin-top:35px;

          color:#22d07b;

          font-weight:700;

        }

        @media(max-width:768px){

          .coin-section{

            padding:90px 18px;

          }

          .coin-card{

            padding:50px 24px;

          }

          .coin-input{

            width:100%;

          }

          .coin-button{

            width:100%;

          }

        }

      `}</style>

      <section id="orion-coin" className="coin-section">

        <div className="coin-card">

          <div className="coin-badge">
            {t("coin.badge")}
          </div>

          <h2 className="coin-title">
            {t("coin.title")} <span>{t("coin.titleHighlight")}</span>
          </h2>

          <p className="coin-text">
            {t("coin.description")}
          </p>

          {joined ? (

            <div className="coin-success">
              ✓ {t("coin.success")}
            </div>

          ) : (

            <form
              className="coin-form"
              onSubmit={handleSubmit}
            >

              <input
                className="coin-input"
                type="email"
                placeholder={t("coin.placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                className="coin-button"
                type="submit"
              >
                {t("coin.button")}
              </button>

            </form>

          )}

        </div>

      </section>
    </>
  );
};

export default OrionCoin;