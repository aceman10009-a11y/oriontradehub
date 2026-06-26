import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import TradeModal from "../components/TradeModal";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>OrionTradeHub Admin Dashboard</h1>

      <h2>Welcome, Trader Jeff 👋</h2>

      <h3>Total Users: {users.length}</h3>

      <hr />

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