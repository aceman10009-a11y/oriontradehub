import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const CardApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "cardApplications"),
      (snapshot) => {
        setApplications(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );

    return unsubscribe;
  }, []);

  const updateStatus = async (application, status) => {
    try {
      // Update the application document
      await updateDoc(doc(db, "cardApplications", application.id), {
        status,
      });

      // Update the user's card status
       await updateDoc(doc(db, "users", application.uid), {
  cardApplication: {
    status,
    email: application.email,
    address: application.address,
    appliedAt: application.appliedAt,
    updatedAt: new Date(),
  },
});

      toast.success(`Card status updated to "${status}".`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to update card status.");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        color: "#fff",
      }}
    >
      <h1>Card Applications</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "25px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.address}</td>
              <td>{application.status}</td>

              <td
                style={{
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    updateStatus(application, "pending")
                  }
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(application, "approved")
                  }
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    updateStatus(application, "issued")
                  }
                >
                  Issue
                </button>

                <button
                  onClick={() =>
                    updateStatus(application, "shipped")
                  }
                >
                  Ship
                </button>

                <button
                  onClick={() =>
                    updateStatus(application, "delivered")
                  }
                >
                  Deliver
                </button>
              </td>
            </tr>
          ))}

          {applications.length === 0 && (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No card applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardApplications;