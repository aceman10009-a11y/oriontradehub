import React from "react";

const DownloadButtons = () => {
  return (
    <>
      <style>{`
        .download-buttons{
          display:flex;
          gap:16px;
          margin-top:36px;
          flex-wrap:wrap;
        }

        .store-btn{
          display:flex;
          align-items:center;
          gap:14px;

          min-width:185px;

          padding:16px 18px;

          border-radius:20px;

          background:rgba(12,18,30,.62);

          border:1px solid rgba(255,255,255,.08);

          backdrop-filter:blur(20px);
          -webkit-backdrop-filter:blur(20px);

          transition:.35s;

          cursor:pointer;

          box-shadow:
            0 10px 25px rgba(0,0,0,.35);
        }

        .store-btn:hover{
          transform:translateY(-4px);
          border-color:rgba(32,164,255,.35);
          box-shadow:
            0 18px 35px rgba(32,164,255,.18);
        }

        .store-icon{
          font-size:28px;
        }

        .store-small{
          display:block;
          font-size:11px;
          color:#8d99aa;
          margin-bottom:3px;
        }

        .store-name{
          color:white;
          font-size:15px;
          font-weight:700;
        }

        @media(max-width:900px){

          .download-buttons{
            justify-content:center;
          }

        }

        @media(max-width:600px){

          .download-buttons{
            flex-direction:column;
          }

          .store-btn{
            width:100%;
            min-width:unset;
            justify-content:center;
          }

        }
      `}</style>

      <div className="download-buttons">

        <div className="store-btn">

          <div className="store-icon">
            🍎
          </div>

          <div>

            <span className="store-small">
              Download on the
            </span>

            <div className="store-name">
              App Store
            </div>

          </div>

        </div>

        <div className="store-btn">

          <div className="store-icon">
            ▶️
          </div>

          <div>

            <span className="store-small">
              Get it on
            </span>

            <div className="store-name">
              Google Play
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default DownloadButtons;