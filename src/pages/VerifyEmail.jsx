import React from "react";
import { Link } from "react-router-dom";
import signupBackground from "../assets/auth/signup-background.png";

const VerifyEmail = () => {
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
      {/* Overlay */}
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
          boxShadow: "0 20px 50px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            fontSize: "58px",
            marginBottom: "20px",
          }}
        >
          📧
        </div>

        <h1
          style={{
            marginBottom: "15px",
            fontWeight: 700,
          }}
        >
          Verify Your Email
        </h1>

        <p
          style={{
            color: "#b8c2d0",
            lineHeight: 1.7,
            marginBottom: "30px",
          }}
        >
          We've sent a verification email to the address you used during
          registration.
          <br />
          <br />
          Click the verification link before signing in to your Orion Trade Hub
          account.
        </p>

        <div
          style={{
            background: "rgba(255,255,255,.05)",
            padding: "18px",
            borderRadius: "12px",
            marginBottom: "25px",
            textAlign: "left",
          }}
        >
          <strong style={{ color: "#00d4ff" }}>Didn't receive it?</strong>

          <ul
            style={{
              marginTop: "12px",
              color: "#cdd7e2",
              lineHeight: 1.8,
            }}
          >
            <li>Check your Spam or Junk folder.</li>
            <li>Wait a few minutes.</li>
            <li>Make sure you entered the correct email.</li>
          </ul>
        </div>

        <Link
          to="/login"
          style={{
            display: "block",
            textDecoration: "none",
            background: "linear-gradient(135deg,#00d4ff,#0066ff)",
            color: "#fff",
            padding: "15px",
            borderRadius: "12px",
            fontWeight: 700,
            marginBottom: "15px",
          }}
        >
          Go to Login
        </Link>

        <button
          disabled
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,.1)",
            background: "rgba(255,255,255,.05)",
            color: "#888",
            cursor: "not-allowed",
          }}
        >
          Resend Verification Email (Coming Next)
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;