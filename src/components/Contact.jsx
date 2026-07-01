import React from "react";

const Contact = () => {
  return (
    <>
      <style>{`
        .contact-section{

          position:relative;

          padding:110px 24px;

        }

        .contact-card{

          width:min(1100px,100%);

          margin:auto;

          padding:70px 35px;

          border-radius:32px;

          background:
          linear-gradient(
          180deg,
          rgba(12,18,28,.82),
          rgba(7,10,16,.94));

          border:1px solid rgba(255,255,255,.06);

          backdrop-filter:blur(20px);

          text-align:center;

          overflow:hidden;

          position:relative;

        }

        .contact-card::before{

          content:"";

          position:absolute;

          width:320px;
          height:320px;

          left:-120px;
          top:-120px;

          background:
          radial-gradient(circle,
          rgba(32,164,255,.18),
          transparent 72%);

          filter:blur(45px);

        }

        .contact-badge{

          display:inline-block;

          padding:10px 18px;

          border-radius:999px;

          background:rgba(32,164,255,.08);

          border:1px solid rgba(32,164,255,.22);

          color:#8fd3ff;

          font-size:12px;

          font-weight:700;

          letter-spacing:.14em;

        }

        .contact-title{

          margin:28px 0 18px;

          color:#fff;

          font-size:clamp(34px,5vw,56px);

          font-weight:900;

          letter-spacing:-.04em;

        }

        .contact-text{

          max-width:650px;

          margin:auto;

          color:#98a8b8;

          line-height:1.8;

          font-size:16px;

        }

        .contact-links{

          margin-top:45px;

          display:flex;

          justify-content:center;

          gap:20px;

          flex-wrap:wrap;

        }

        .contact-btn{

          display:flex;

          align-items:center;

          justify-content:center;

          min-width:220px;

          padding:18px 24px;

          border-radius:18px;

          text-decoration:none;

          color:white;

          font-weight:700;

          background:rgba(255,255,255,.05);

          border:1px solid rgba(255,255,255,.08);

          transition:.3s;

        }

        .contact-btn:hover{

          transform:translateY(-5px);

          border-color:rgba(32,164,255,.30);

          box-shadow:
          0 15px 35px rgba(32,164,255,.16);

        }

        @media(max-width:768px){

          .contact-section{

            padding:90px 18px;

          }

          .contact-card{

            padding:50px 24px;

          }

          .contact-btn{

            width:100%;

            min-width:unset;

          }

        }

      `}</style>

      <section className="contact-section">

        <div className="contact-card">

          <div className="contact-badge">
            CONTACT ORION
          </div>

          <h2 className="contact-title">
            Speak With Our Team
          </h2>

          <p className="contact-text">
            Our specialists are available to assist with account
            opening, platform guidance, institutional services and
            general enquiries.
          </p>

          <div className="contact-links">

            <a
              className="contact-btn"
              href="mailto:support@oriontradehub.com"
            >
              📧 support@oriontradehub.com
            </a>

            <a
              className="contact-btn"
              href="mailto:brokerage@oriontradehub.com"
            >
              💼 brokerage@oriontradehub.com
            </a>

          </div>

        </div>

      </section>
    </>
  );
};

export default Contact;