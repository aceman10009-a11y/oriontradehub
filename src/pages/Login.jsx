import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginBackground from "../assets/auth/login-background.webp";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${loginBackground}) center center / cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
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
          background: "rgba(10,12,18,0.85)",
          padding: "30px",
          borderRadius: "16px",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "8px" }}>Welcome Back</h2>

        <p
          style={{
            marginBottom: "25px",
            color: "#b6c2d1",
            fontSize: "14px",
          }}
        >
          Sign in to access your Orion Trade Hub account.
        </p>

        <form className="auth-form">
          <div className="form-section">
            <h4>Account Login</h4>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
              marginBottom: "20px",
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
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
              color: "#b6c2d1",
              fontSize: "14px",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#00d4ff",
                fontWeight: 600,
              }}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;