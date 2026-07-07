import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/config";

import loginBackground from "../assets/auth/login-background.webp";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
  toast.warning(
    "Please verify your email before signing in. Check your inbox or spam folder."
  );

  await signOut(auth);

  navigate("/verify-email");
  return;
}

      localStorage.setItem("userId", user.uid);

      const userRef = doc(db, "users", user.uid);

      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User record not found.");
        return;
      }

      const userData = userSnap.data();

      const roles = userData.roles || [];

      const role = userData.role || "";

      toast.success("Login successful.");

      if (roles.includes("admin") || role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      let message = "Unable to sign in.";

      switch (err.code) {
        case "auth/invalid-credential":
          message = "Incorrect email or password.";
          break;

        case "auth/user-not-found":
          message = "No account exists with this email.";
          break;

        case "auth/wrong-password":
          message = "Incorrect password.";
          break;

        case "auth/network-request-failed":
          message = "Please check your internet connection.";
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

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-section">
            <h4>Account Login</h4>

            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
                {showPassword ? "Hide" : "Show"}
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

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
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