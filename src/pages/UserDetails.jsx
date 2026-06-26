import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import TradeModal from "../components/TradeModal";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const ref = doc(db, "users", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUser({
            id: snap.id,
            ...snap.data(),
          });
        } else {
          console.log("User not found");
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    loadUser();
  }, [id]);

  if (!user) {
    return <h2 style={{ padding: "20px" }}>Loading user...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/admin")}>
        ← Back
      </button>

      <h1>{user.name || "Unnamed User"}</h1>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Demo Balance:</strong> ${user.demoBalance ?? 0}
      </p>

      <p>
        <strong>Live Balance:</strong> ${user.liveBalance ?? 0}
      </p>

      <p>
        <strong>Account Type:</strong> {user.accountType || "N/A"}
      </p>

      <p>
        <strong>Assigned Trader:</strong>{" "}
        {user.assignedTraderId || "Not Assigned"}
      </p>

      <br />

      <button
        onClick={() => setShowTradeModal(true)}
      >
        Open Trade
      </button>

      {showTradeModal && (
        <TradeModal
          user={user}
          onClose={() => setShowTradeModal(false)}
        />
      )}
    </div>
  );
}