import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer{

          position:relative;

          padding:70px 24px 40px;

          border-top:1px solid rgba(255,255,255,.06);

          background:rgba(6,8,12,.92);

        }

        .footer-container{

          width:min(1280px,100%);

          margin:auto;

        }

        .footer-top{

          display:flex;

          justify-content:space-between;

          align-items:flex-start;

          gap:40px;

          flex-wrap:wrap;

        }

        .footer-brand{

          max-width:420px;

        }

        .footer-logo{

          font-size:28px;

          font-weight:900;

          letter-spacing:.08em;

          color:#ffffff;

        }

        .footer-tag{

          margin-top:18px;

          color:#98a8b8;

          line-height:1.8;

          font-size:15px;

        }

        .footer-links{

          display:grid;

          grid-template-columns:repeat(2,minmax(140px,1fr));

          gap:35px;

        }

        .footer-title{

          color:#ffffff;

          font-size:15px;

          font-weight:700;

          margin-bottom:18px;

        }

        .footer-link{

          display:block;

          margin-bottom:12px;

          color:#93a2b3;

          text-decoration:none;

          transition:.25s;

        }

        .footer-link:hover{

          color:#20a4ff;

        }

        .footer-bottom{

          margin-top:50px;

          padding-top:28px;

          border-top:1px solid rgba(255,255,255,.06);

          display:flex;

          justify-content:space-between;

          align-items:center;

          flex-wrap:wrap;

          gap:16px;

        }

        .footer-copy{

          color:#728296;

          font-size:14px;

        }

        .footer-status{

          color:#21d07a;

          font-size:14px;

          font-weight:700;

        }

        @media(max-width:768px){

          .footer{

            padding:55px 18px 35px;

          }

          .footer-top{

            flex-direction:column;

          }

          .footer-links{

            grid-template-columns:1fr;

            width:100%;

          }

          .footer-bottom{

            flex-direction:column;

            text-align:center;

          }

        }

      `}</style>

      <footer className="footer">

        <div className="footer-container">

          <div className="footer-top">

            <div className="footer-brand">

              <div className="footer-logo">
                ORION
              </div>

              <div className="footer-tag">
                Orion Trade Hub provides institutional-grade access to
                global financial markets through secure, high-performance
                trading technology.
              </div>

            </div>

            <div className="footer-links">

              <div>

                <div className="footer-title">
                  Platform
                </div>

                <a href="#" className="footer-link">
                  Markets
                </a>

                <a href="#" className="footer-link">
                  Trading
                </a>

                <a href="#" className="footer-link">
                  Mobile App
                </a>

                <a href="#" className="footer-link">
                  Security
                </a>

              </div>

              <div>

                <div className="footer-title">
                  Company
                </div>

                <a href="#" className="footer-link">
                  About
                </a>

                <a href="#" className="footer-link">
                  Support
                </a>

                <a href="#" className="footer-link">
                  Contact
                </a>

                <a href="#" className="footer-link">
                  Careers
                </a>

              </div>

            </div>

          </div>

          <div className="footer-bottom">

            <div className="footer-copy">

              © {2026} Orion Trade Hub.
              All Rights Reserved.

            </div>

            <div className="footer-status">

              ● Systems Operational

            </div>

          </div>

        </div>

      </footer>

    </>
  );
};

export default Footer;