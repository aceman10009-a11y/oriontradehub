import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

import signupBackground from "../assets/auth/signup-background.png";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [profession, setProfession] = useState("");

  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityAnswer1, setSecurityAnswer1] = useState("");

  const [securityQuestion2, setSecurityQuestion2] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");

  const [referralCode, setReferralCode] = useState("");
  const [referralSource, setReferralSource] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

     await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,

  email,

  name: fullName,

  photoURL: "",

  phone,

  profession,

  country: "",

  language: "English",

  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  securityQuestion1,

  securityAnswer1,

  securityQuestion2,

  securityAnswer2,

  referredBy: referralCode || null,

  referralSource,

  accountType: "demo",

  liveEnabled: true,

  demoBalance: 10000,

  demoProfit: 0,

  liveBalance: 0,

  liveProfit: 0,

  profit: 0,

  assignedTraderId: null,

  traderStatus: "pending",

  roles: ["user"],

  stripeStatus: "coming_soon",

  // Appearance
  theme: "dark",

  fontSize: "medium",

  brightness: 100,

  // Notification preferences
  notifications: {
    trades: true,
    deposits: true,
    withdrawals: true,
    news: true,
    promotions: false,
    email: true,
    browser: true,
    sound: true,
  },

  // Trading preferences
  tradingPreferences: {
    defaultMarket: "Forex",
    defaultTimeframe: "1H",
    preferredCurrency: "USD",
    autoRefresh: true,
  },

  // Verification foundation
  verificationStatus: "not_eligible",
  verificationEligible: false,

  createdAt: serverTimestamp(),

  updatedAt: serverTimestamp(),
});

      await sendEmailVerification(user);

      await signOut(auth);

  toast.success(
  "Account created successfully! Please check your inbox or spam folder to verify your email before signing in."
);
      navigate("/verify-email");
    } catch (err) {
      let message = "Something went wrong.";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "An account already exists with this email.";
          break;

        case "auth/weak-password":
          message = "Password must be at least 6 characters.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email address.";
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

        <form
  className="auth-form"
  onSubmit={handleSignup}
>
          {/* PERSONAL */}
          <div className="form-section">
            <h4>Personal Information</h4>
         <input
          type="text"
         placeholder="Full Name"
         value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
            required
         />

          <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
  required
/>
          </div>

          {/* SECURITY */}
          <div className="form-section">
            <h4>Security</h4>

            <div className="password-wrapper">
             <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
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

            <select
  value={securityQuestion1}
  onChange={(e) => setSecurityQuestion1(e.target.value)}
  required
>
              <option value="">Security Question 1</option>
              <option>What is your mother’s maiden name?</option>
              <option>What city were you born in?</option>
              <option>What was your first pet’s name?</option>
            </select>
<input
  type="text"
  placeholder="Answer"
  autoComplete="off"
  value={securityAnswer1}
  onChange={(e) => setSecurityAnswer1(e.target.value)}
  required
/>

<select
  value={securityQuestion2}
  onChange={(e) => setSecurityQuestion2(e.target.value)}
  required
>
              <option value="">Security Question 2</option>
              <option>What is your favorite food?</option>
              <option>What was your first school?</option>
              <option>What is your childhood nickname?</option>
            </select>

          <input
  type="text"
  placeholder="Answer"
  autoComplete="off"
  value={securityAnswer2}
  onChange={(e) => setSecurityAnswer2(e.target.value)}
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
/>

            <input
  type="text"
  placeholder="Profession (e.g. Nurse, Investor, CEO, Student)"
  autoComplete="organization-title"
  value={profession}
  onChange={(e) => setProfession(e.target.value)}
  required
/>
          </div>

          {/* PROFILE */}
          <div className="form-section">
            <h4>Profile</h4>
<input
  type="text"
  placeholder="Referral Code (optional)"
  value={referralCode}
  onChange={(e) => setReferralCode(e.target.value)}
/>

            <select
  value={referralSource}
  onChange={(e) => setReferralSource(e.target.value)}
  required
>
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

       <button
  type="submit"
  className="submit-btn"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Create Account"}
</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;