import React from "react";
import { useTranslation } from "react-i18next";
import DownloadButtons from "./DownloadButtons";

const ShowcaseText = () => {
  const { t } = useTranslation();

  return (
    <>
      <style>{`
        .showcase-content{
          width:100%;
          max-width:560px;
          z-index:5;
        }

        .showcase-label{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:10px 18px;
          border-radius:999px;
          background:rgba(12,18,30,.65);
          border:1px solid rgba(32,164,255,.25);
          color:#86cfff;
          font-size:12px;
          font-weight:700;
          letter-spacing:.12em;
          text-transform:uppercase;
          backdrop-filter:blur(18px);
        }

        .showcase-title{
          margin-top:24px;
          font-size:clamp(34px,5vw,58px);
          line-height:1.1;
          font-weight:900;
          color:#fff;
          letter-spacing:-.04em;
        }

        .showcase-title span{
          color:#20a4ff;
        }

        .showcase-description{
          margin-top:24px;
          color:#97a6b7;
          line-height:1.8;
          font-size:17px;
          max-width:520px;
        }

        @media(max-width:900px){

          .showcase-content{
            text-align:center;
            margin:auto;
          }

          .showcase-description{
            margin-left:auto;
            margin-right:auto;
          }

        }
      `}</style>

      <div className="showcase-content">

        <div className="showcase-label">
          {t("mobile.label")}
        </div>

        <h2 className="showcase-title">
          {t("mobile.title")}
          <br />
          <span>{t("mobile.titleHighlight")}</span>
        </h2>

        <p className="showcase-description">
          {t("mobile.description")}
        </p>

        <DownloadButtons />

      </div>
    </>
  );
};

export default ShowcaseText;