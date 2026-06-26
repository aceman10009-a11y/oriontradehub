import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import TradeModal from "../components/TradeModal";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openTrades, setOpenTrades] = useState([]);
  const [profitInputs, setProfitInputs] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(list);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "trades"),
      (snapshot) => {
        const trades = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((trade) => trade.status === "open");

        setOpenTrades(trades);
      }
    );

    return () => unsubscribe();
  }, []);
  const updateProfit = async (tradeId) => {
  try {
    await updateDoc(doc(db, "trades", tradeId), {
      profit: Number(profitInputs[tradeId] ?? 0),
    });

    alert("Profit updated successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to update profit.");
  }
};
  return (
    <div style={{ padding: "20px" }}>
      <h1>OrionTradeHub Admin Dashboard</h1>

      <h2>Welcome, Trader Jeff 👋</h2>

      <h3>Total Users: {users.length}</h3>

      <h3>Open Trades: {openTrades.length}</h3>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fafafa",
            }}
          >
            <h3>{user.name || "Unnamed User"}</h3>

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
              <strong>Account Type:</strong>{" "}
              {user.accountType || "N/A"}
            </p>

            <p>
              <strong>Assigned Trader:</strong>{" "}
              {user.assignedTraderId || "Not Assigned"}
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => navigate(`/admin/user/${user.id}`)}
              >
                View User
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  alert("Open Trade button clicked!");

                  console.log("Selected User:", user);

                  setSelectedUser({
                    ...user,
                  });
                }}
              >
                Open Trade
              </button>
            </div>
          </div>
        ))
      )}
<hr />

<h2>Open Trades</h2>

{openTrades.length === 0 ? (
  <p>No open trades.</p>
) : (
  openTrades.map((trade) => (
    <div
      key={trade.id}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        background: "#f5f5f5",
      }}
    >
      <h3>{trade.symbol}</h3>

      <p>
        <strong>User:</strong> {trade.userEmail}
      </p>

      <p>
        <strong>Type:</strong> {trade.type}
      </p>

      <p>
        <strong>Entry Price:</strong> {trade.entryPrice}
      </p>

      <p>
        <strong>Lot Size:</strong> {trade.lotSize}
      </p>

     <p>
  <strong>Current Profit:</strong> ${trade.profit}
</p>

<input
  type="number"
  placeholder="Enter Profit/Loss"
  value={profitInputs[trade.id] ?? trade.profit}
  onChange={(e) =>
    setProfitInputs((prev) => ({
      ...prev,
      [trade.id]: e.target.value,
    }))
  }
  style={{
    width: "100%",
    padding: "8px",
    marginTop: "10px",
    marginBottom: "10px",
  }}
/>

<button
  onClick={() => updateProfit(trade.id)}
>
  Update P/L
</button>

<p style={{ marginTop: "10px" }}>
  <strong>Status:</strong> {trade.status}
</p>
    </div>
  ))
)}
      {selectedUser && (
        <>
          {console.log("Rendering TradeModal:", selectedUser)}

          <TradeModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        </>
      )}
    </div>
  );
}