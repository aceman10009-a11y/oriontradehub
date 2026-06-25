import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,

        // SYSTEM MODES
        accountType: "demo", // always start in demo
        liveEnabled: true,   // live exists, but funding is external

        // DEMO WALLET
        demoBalance: 10000,
        demoProfit: 0,

        // LIVE WALLET (externally funded later)
        liveBalance: 0,
        liveProfit: 0,

        // RELATIONSHIP SYSTEM
        referredBy: referralCode.trim() || null,
        assignedTrader: null,
        traderStatus: "pending",

        // STRIPE STAGE FLAG
        stripeStatus: "coming_soon",

        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "420px" }}>
      <h1>Create Trading Account</h1>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
        />

        <br /><br />

        <button disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p style={{ fontSize: "12px", marginTop: "15px", color: "#666" }}>
        Stripe integration coming soon. Live funding is currently handled externally by your broker.
      </p>
    </div>
  );
}