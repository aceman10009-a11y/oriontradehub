import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <style>{`
        .orion-navbar{
          position:fixed;
          top:0;
          left:0;
          right:0;
          height:72px;
          z-index:999;
          display:flex;
          align-items:center;
          justify-content:center;

          background:rgba(4,7,12,.55);
          backdrop-filter:blur(22px);
          -webkit-backdrop-filter:blur(22px);

          border-bottom:1px solid rgba(255,255,255,.06);
        }

        .orion-nav-inner{
          width:min(1320px,95%);
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .orion-logo{
          display:flex;
          align-items:center;
          gap:12px;
          text-decoration:none;
          color:white;
          cursor:pointer;
        }

        .logo-star{
          width:14px;
          height:14px;
          border-radius:50%;
          background:#22a7ff;
          box-shadow:
          0 0 10px #22a7ff,
          0 0 25px rgba(34,167,255,.7),
          0 0 50px rgba(34,167,255,.35);
          animation:pulseStar 3s ease infinite;
        }

        .logo-text{
          font-size:22px;
          font-weight:900;
          letter-spacing:.12em;
        }

        .logo-small{
          display:block;
          font-size:10px;
          color:#7d8796;
          letter-spacing:.18em;
          margin-top:2px;
        }

        .orion-links{
          display:flex;
          align-items:center;
          gap:34px;
        }

        .orion-links button{
          background:none;
          border:none;
          color:#b7c2d0;
          font-size:14px;
          font-weight:500;
          cursor:pointer;
          transition:.25s;
        }

        .orion-links button:hover{
          color:white;
        }

        .orion-actions{
          display:flex;
          align-items:center;
          gap:14px;
        }

        .login-btn{
          border:1px solid rgba(255,255,255,.08);
          background:rgba(255,255,255,.03);
          color:white;
          padding:11px 20px;
          border-radius:999px;
          cursor:pointer;
          transition:.3s;
          font-weight:600;
        }

        .login-btn:hover{
          background:rgba(255,255,255,.08);
        }

        .open-btn{
          cursor:pointer;
          border:none;
          color:white;
          padding:12px 24px;
          border-radius:999px;
          background:linear-gradient(135deg,#1296ff,#0d5dff);
          box-shadow:0 0 30px rgba(18,150,255,.35);
          transition:.35s;
          font-weight:700;
        }

        .open-btn:hover{
          transform:translateY(-2px);
          box-shadow:0 0 45px rgba(18,150,255,.55);
        }
          .highlight-open-account{
  animation:highlightOpenAccount 1s ease-in-out infinite;
}

@keyframes highlightOpenAccount{

  0%{
    transform:scale(1);
    box-shadow:0 0 30px rgba(18,150,255,.35);
  }

  50%{
    transform:scale(1.08);
    box-shadow:
      0 0 25px #22a7ff,
      0 0 55px rgba(34,167,255,.9),
      0 0 90px rgba(34,167,255,.45);
  }

  100%{
    transform:scale(1);
    box-shadow:0 0 30px rgba(18,150,255,.35);
  }

}

        @keyframes pulseStar{
          0%{transform:scale(1);}
          50%{transform:scale(1.25);}
          100%{transform:scale(1);}
        }

        @media(max-width:900px){
          .orion-links{
            display:none;
          }
        }

        @media(max-width:640px){
          .orion-navbar{
            height:66px;
          }

          .logo-text{
            font-size:18px;
          }

          .logo-small{
            display:none;
          }

          .login-btn{
            display:none;
          }

          .open-btn{
            padding:11px 18px;
            font-size:13px;
          }
        }
      `}</style>

      <header className="orion-navbar">

        <div className="orion-nav-inner">

          <div
            className="orion-logo"
            onClick={() => scrollToSection("hero")}
          >
            <div className="logo-star"></div>

            <div>
              <div className="logo-text">ORION</div>
              <span className="logo-small">TRADE HUB</span>
            </div>
          </div>

          <nav className="orion-links">

  <button onClick={() => scrollToSection("features")}>
    Features
  </button>

  <button onClick={() => scrollToSection("markets")}>
    Markets
  </button>

  <button onClick={() => scrollToSection("orion-coin")}>
    Orion Coin
  </button>

  <button onClick={() => scrollToSection("contact")}>
    Support
  </button>

 <button onClick={() => scrollToSection("about")}>
    About
 </button>
</nav>

          <div className="orion-actions">

            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

            <button
  id="open-account-btn"
  className="open-btn"
  onClick={() => navigate("/signup")}
>
  Open Account
</button>

          </div>

        </div>

      </header>

    </>
  );
};

export default Navbar;