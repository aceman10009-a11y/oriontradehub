import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/config";

import loginBackground from "../assets/auth/login-background.webp";
import PageSkeleton from "../components/loading/PageSkeleton";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [pageLoading, setPageLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      // Block login if email is not verified
      if (!user.emailVerified) {
        toast.warning(t("verifyEmailBeforeLogin"));

        await signOut(auth);

        navigate("/verify-email");
        return;
      }

      localStorage.setItem("userId", user.uid);

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error(t("userRecordNotFound"));
        return;
      }

      const userData = userSnap.data();

      const roles = userData.roles || [];
      const role = userData.role || "";

      toast.success(t("loginSuccessful"));

      if (roles.includes("admin") || role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      let message = t("unableToSignIn");

      switch (err.code) {
        case "auth/invalid-credential":
          message = t("incorrectEmailPassword");
          break;

        case "auth/user-not-found":
          message = t("noAccountExists");
          break;

        case "auth/wrong-password":
          message = t("incorrectPassword");
          break;

        case "auth/network-request-failed":
          message = t("checkInternet");
          break;

        default:
          message = t("unableToSignIn");
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <PageSkeleton />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${loginBackground}) center center / cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.65)",
        }}
      />

      {/* Login Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "450px",
          background: "rgba(10,12,18,0.88)",
          padding: "32px",
          borderRadius: "18px",
          color: "#fff",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 20px 60px rgba(0,0,0,.35)",
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>
          {t("welcomeBackLogin")}
        </h2>

        <p
          style={{
            marginBottom: "25px",
            color: "#b6c2d1",
            fontSize: "14px",
          }}
        >
          {t("loginSubtitle")}
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-section">
            <h4>{t("login")}</h4>

            <input
              type="email"
              placeholder={t("emailAddress")}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? t("hide") : t("show")}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "18px 0",
              fontSize: "14px",
            }}
          >
         <label
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  }}
>
  <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
  />
  {t("rememberMe")}
</label>

            <Link
              to="/forgot-password"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? t("signingIn") : t("signIn")}
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#b6c2d1",
              fontSize: "14px",
            }}
          >
            {t("dontHaveAccount")}{" "}
            <Link
              to="/signup"
              style={{
                color: "#00d4ff",
                fontWeight: 600,
              }}
            >
              {t("createAccount")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;