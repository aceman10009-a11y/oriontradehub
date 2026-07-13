import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { auth } from "../firebase/config";
import loginBackground from "../assets/auth/login-background.webp";

const ForgotPassword = () => {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error(t("enterEmailAddress"));
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      setSent(true);
      toast.success(t("passwordResetEmailSent"));
    } catch (err) {
      let message = t("unableToSendResetEmail");

      switch (err.code) {
        case "auth/user-not-found":
          message = t("userRecordNotFound");
          break;

        case "auth/invalid-email":
          message = t("invalidEmail");
          break;

        case "auth/network-request-failed":
          message = t("checkInternet");
          break;

        default:
          message = err.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${loginBackground}) center center / cover no-repeat`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,.65)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "460px",
          background: "rgba(10,12,18,.88)",
          borderRadius: "18px",
          padding: "35px",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h2 style={{ marginBottom: 10 }}>
          {t("forgotPassword")}
        </h2>

        <p
          style={{
            color: "#b8c2d0",
            marginBottom: 25,
            lineHeight: 1.6,
          }}
        >
          {t("forgotPasswordDescription")}
        </p>

        {sent ? (
          <>
            <div
              style={{
                background: "rgba(0,212,255,.08)",
                border: "1px solid rgba(0,212,255,.3)",
                padding: "18px",
                borderRadius: "12px",
                marginBottom: "25px",
              }}
            >
              <strong
                style={{
                  color: "#00d4ff",
                }}
              >
                {t("passwordResetEmailSentTitle")}
              </strong>

              <p
                style={{
                  marginTop: 12,
                  color: "#cfd7df",
                  lineHeight: 1.7,
                }}
              >
                {t("passwordResetEmailSentDescription")}
              </p>
            </div>

            <Link
              to="/login"
              className="submit-btn"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {t("backToLogin")}
            </Link>
          </>
        ) : (
          <form
            className="auth-form"
            onSubmit={handleReset}
          >
            <div className="form-section">
              <h4>{t("emailAddress")}</h4>

              <input
                type="email"
                placeholder={t("enterYourEmail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? t("sending")
                : t("sendPasswordResetLink")}
            </button>

            <p
              style={{
                marginTop: 25,
                textAlign: "center",
              }}
            >
              <Link
                to="/login"
                style={{
                  color: "#00d4ff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                ← {t("backToLogin")}
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;