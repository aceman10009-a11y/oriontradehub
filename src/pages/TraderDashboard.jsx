import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
export default function TraderDashboard() {
  const [users, setUsers] = useState([]);
  const [trader, setTrader] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      // STEP 1: find trader document (by email or id logic)
      // for now we assume traderjeff is the only trader
      setTrader(user);

      // STEP 2: fetch users assigned to this trader
      const q = query(
        collection(db, "users"),
        where("assignedTraderId", "==", "traderjeff")
      );

      const snap = await getDocs(q);

      const list = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setUsers(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Trader Dashboard</h1>

      <h2>Trader: Trader Jeff</h2>

      <h3>Assigned Users ({users.length})</h3>

      {users.map((u) => (
        <div key={u.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <p>Email: {u.email}</p>
          <p>Balance: {u.balance}</p>
          <p>Mode: {u.activeMode}</p>
        </div>
      ))}
    </div>
  );
}