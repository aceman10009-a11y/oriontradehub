import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";

import signupBackground from "../assets/auth/signup-background.png";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const resendEmail = async () => {
    if (!auth.currentUser) {
      toast.error(t("sessionExpired"));
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await sendEmailVerification(auth.currentUser);

      toast.success(t("verificationEmailSent"));
    } catch (err) {
      console.error(err);
      toast.error(t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const checkVerification = async () => {
    if (!auth.currentUser) {
      toast.error(t("pleaseLoginAgain"));
      navigate("/login");
      return;
    }

    try {
      setChecking(true);

      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        toast.success(t("emailVerified"));
        navigate("/login");
      } else {
        toast.warning(t("emailNotVerified"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("somethingWentWrong"));
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${signupBackground}) center center / cover no-repeat`,
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
          maxWidth: "520px",
          padding: "40px",
          borderRadius: "18px",
          background: "rgba(10,12,18,.88)",
          color: "#fff",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px",
          }}
        >
          ✅
        </div>

        <h1>{t("resendVerification")}</h1>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            marginTop: "15px",
            marginBottom: "30px",
            fontSize: "16px",
          }}
        >
          {t("accountCreatedDescription")}
        </p>

        <div
          style={{
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.08)",
            padding: "20px",
            borderRadius: "14px",
            marginBottom: "30px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              color: "#00d4ff",
              marginBottom: "14px",
              fontSize: "18px",
            }}
          >
            {t("nextSteps")}
          </h3>

          <div style={{ lineHeight: 2 }}>
            <div>✅ {t("checkInbox")}</div>
            <div>✅ {t("checkSpam")}</div>
            <div>✅ {t("clickVerification")}</div>
            <div>✅ {t("returnLogin")}</div>
          </div>
        </div>

        <button
          onClick={checkVerification}
          disabled={checking}
          className="submit-btn"
          style={{ marginBottom: "15px" }}
        >
          {checking ? t("checking") : t("verifiedEmailButton")}
        </button>

        <button
          onClick={resendEmail}
          disabled={loading}
          className="submit-btn"
          style={{
            marginBottom: "15px",
            background: "linear-gradient(135deg,#2a2f3a,#4b5563)",
          }}
        >
          {loading ? t("sending") : t("resendVerification")}
        </button>

        <Link
          to="/login"
          style={{
            display: "block",
            color: "#00d4ff",
            textDecoration: "none",
            marginTop: "15px",
            fontWeight: 600,
          }}
        >
          ← {t("backToLogin")}
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;