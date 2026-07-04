import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import signupBackground from "../assets/auth/signup-background.png";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${signupBackground}) center center / cover no-repeat`,
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

      {/* Card */}
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
        <h2>Create Account</h2>

        <form className="auth-form">
          {/* PERSONAL */}
          <div className="form-section">
            <h4>Personal Information</h4>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              autoComplete="name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              autoComplete="email"
              required
            />
          </div>

          {/* SECURITY */}
          <div className="form-section">
            <h4>Security</h4>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="new-password"
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

            <small className="hint">
              Use 8+ characters with uppercase, lowercase, number & symbol.
            </small>

            <select name="securityQuestion1" required>
              <option value="">Security Question 1</option>
              <option>What is your mother’s maiden name?</option>
              <option>What city were you born in?</option>
              <option>What was your first pet’s name?</option>
            </select>

            <input
              type="text"
              name="securityAnswer1"
              placeholder="Answer"
              autoComplete="off"
              required
            />

            <select name="securityQuestion2" required>
              <option value="">Security Question 2</option>
              <option>What is your favorite food?</option>
              <option>What was your first school?</option>
              <option>What is your childhood nickname?</option>
            </select>

            <input
              type="text"
              name="securityAnswer2"
              placeholder="Answer"
              autoComplete="off"
              required
            />
          </div>

          {/* CONTACT */}
          <div className="form-section">
            <h4>Contact Details</h4>

            <PhoneInput
              value={phone}
              onChange={setPhone}
              defaultCountry="US"
              international
              className="phone-input"
              required
            />

            <input
              type="text"
              name="profession"
              placeholder="Profession (e.g. Nurse, Investor, CEO, Student)"
              autoComplete="organization-title"
              required
            />
          </div>

          {/* PROFILE */}
          <div className="form-section">
            <h4>Profile</h4>

            <input
              type="text"
              name="referral"
              placeholder="Referral Code (optional)"
            />

            <select name="referralSource" required>
              <option value="">How did you hear about us?</option>
              <option>Google</option>
              <option>Facebook</option>
              <option>Instagram</option>
              <option>LinkedIn</option>
              <option>YouTube</option>
              <option>Friend</option>
              <option>Other</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;