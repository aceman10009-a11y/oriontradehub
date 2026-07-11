import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const scrollTo = (id) => {
    const securitySections = ["about", "support"];

    // SECURITY PAGE SECTIONS
    if (securitySections.includes(id)) {
      navigate("/security");

      setTimeout(() => {
        const el = document.getElementById(id);

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 400);
        }
      }, 600);

      return;
    }

    // HOME PAGE SECTIONS
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const openModal = (text) => {
    setModalText(text);
    setShowModal(true);
  };

  return (
    <>
      <footer
        style={{
          background: "#070a0f",
          padding: "60px 20px",
          color: "#fff",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Platform */}
          <div>
            <h4>{t("footer.platform")}</h4>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("markets")}
            >
              {t("footer.markets")}
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              {t("footer.trading")}
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                openModal(t("footer.mobileMaintenance"))
              }
            >
              {t("footer.mobileApp")}
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("security")}
            >
              {t("footer.security")}
            </p>
          </div>

          {/* Company */}
          <div>
            <h4>{t("footer.company")}</h4>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("about")}
            >
              {t("footer.about")}
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("support")}
            >
              {t("footer.support")}
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() => scrollTo("contact")}
            >
              {t("footer.contact")}
            </p>

            <p
              style={{ cursor: "pointer" }}
              onClick={() =>
                openModal(t("footer.careersMessage"))
              }
            >
              {t("footer.careers")}
            </p>
          </div>
        </div>
      </footer>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#111827",
              padding: "30px",
              borderRadius: "12px",
              maxWidth: "420px",
              color: "#fff",
            }}
          >
            <p>{modalText}</p>

            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "20px",
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("footer.close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;