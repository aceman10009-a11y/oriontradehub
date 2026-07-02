import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            <h4>Platform</h4>
            <p style={{ cursor: "pointer" }} onClick={() => scrollTo("markets")}>Markets</p>
            <p style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Trading</p>
            <p style={{ cursor: "pointer" }} onClick={() =>
              openModal("Mobile apps are currently under maintenance. They will be available soon.")
            }>
              Mobile App
            </p>
            <p style={{ cursor: "pointer" }} onClick={() => scrollTo("security")}>
              Security
            </p>
          </div>

          {/* Company */}
          <div>
            <h4>Company</h4>
            <p>About</p>

            <p style={{ cursor: "pointer" }} onClick={() => scrollTo("contact")}>
              Support
            </p>

            <p style={{ cursor: "pointer" }} onClick={() => scrollTo("contact")}>
              Contact
            </p>

            <p style={{ cursor: "pointer" }} onClick={() =>
              openModal("Careers are coming soon. We are currently building our hiring program.")
            }>
              Careers
            </p>
          </div>
        </div>
      </footer>

      {/* MODAL */}
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
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;