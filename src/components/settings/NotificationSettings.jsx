import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function NotificationSettings() {
  const { user, profile, setProfile } = useAuth();

  const [notifications, setNotifications] = useState(
    profile?.notifications || {
      tradeAlerts: true,
      depositAlerts: true,
      withdrawalAlerts: true,
      marketNews: true,
      emailAlerts: true,
    }
  );


  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };


  const saveNotifications = async () => {

    if (!user) return;

    try {

      const data = {
        notifications,
        updatedAt: new Date(),
      };


      await updateDoc(
        doc(db, "users", user.uid),
        data
      );


      setProfile({
        ...profile,
        ...data,
      });


      toast.success(
        "Notification settings saved."
      );


    } catch(error){

      console.error(error);

      toast.error(
        "Failed to save notifications."
      );

    }
  };


  return (
    <div
      style={{
        background:"#111827",
        borderRadius:12,
        padding:24,
        marginBottom:20,
      }}
    >

      <h2>
        Notifications
      </h2>

      <p style={{color:"#9ca3af"}}>
        Control the alerts you receive from OrionTradeHub.
      </p>


      {[
        ["tradeAlerts","Trade alerts"],
        ["depositAlerts","Deposit notifications"],
        ["withdrawalAlerts","Withdrawal notifications"],
        ["marketNews","Market news and updates"],
        ["emailAlerts","Email notifications"],
      ].map(([key,label]) => (

        <div
          key={key}
          style={styles.row}
        >

          <span>
            {label}
          </span>


          <button
            onClick={() => toggleNotification(key)}
            style={{
              ...styles.toggle,
              background:
                notifications[key]
                ? "#16a34a"
                : "#374151",
            }}
          >
            {notifications[key]
              ? "ON"
              : "OFF"}
          </button>

        </div>

      ))}



      <button
        onClick={saveNotifications}
        style={styles.save}
      >
        Save Notifications
      </button>


    </div>
  );
}



const styles = {

row:{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"15px 0",
  borderBottom:"1px solid #1f2937",
},


toggle:{
  width:65,
  padding:"8px",
  border:"none",
  borderRadius:20,
  color:"#fff",
  cursor:"pointer",
  fontWeight:700,
},


save:{
  marginTop:25,
  padding:"12px 22px",
  background:"#1199fa",
  color:"#fff",
  border:"none",
  borderRadius:8,
  cursor:"pointer",
  fontWeight:700,
}

};