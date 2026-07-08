import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";


export default function PrivacySettings() {

  const { user, profile, setProfile } = useAuth();


  const [privacy, setPrivacy] = useState(
    profile?.privacy || {
      analyticsSharing: true,
      marketingEmails: false,
      personalizedExperience: true,
    }
  );


  const toggle = (key) => {

    setPrivacy({
      ...privacy,
      [key]: !privacy[key],
    });

  };


  const savePrivacy = async () => {

    if (!user) return;


    try {

      const data = {
        privacy,
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
        "Privacy settings saved."
      );


    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to save privacy settings."
      );

    }

  };


  return (

    <div
      style={{
        background:"#111827",
        padding:24,
        borderRadius:12,
        marginBottom:20,
      }}
    >

      <h2>
        Privacy
      </h2>


      <p style={{color:"#9ca3af"}}>
        Manage how your account information is used.
      </p>



      <PrivacyRow
        title="Analytics Sharing"
        description="Help us improve the platform by sharing anonymous usage data."
        enabled={privacy.analyticsSharing}
        toggle={() => toggle("analyticsSharing")}
      />



      <PrivacyRow
        title="Marketing Emails"
        description="Receive platform updates, offers, and announcements."
        enabled={privacy.marketingEmails}
        toggle={() => toggle("marketingEmails")}
      />



      <PrivacyRow
        title="Personalized Experience"
        description="Allow personalized trading and dashboard suggestions."
        enabled={privacy.personalizedExperience}
        toggle={() => toggle("personalizedExperience")}
      />



      <button
        onClick={savePrivacy}
        style={styles.save}
      >
        Save Privacy Settings
      </button>


    </div>

  );

}



function PrivacyRow({
  title,
  description,
  enabled,
  toggle
}) {

  return (

    <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        gap:20,
        padding:"15px 0",
        borderBottom:"1px solid #1f2937",
      }}
    >

      <div>

        <strong>
          {title}
        </strong>


        <p
          style={{
            color:"#9ca3af",
            fontSize:14,
            margin:"5px 0 0",
          }}
        >
          {description}
        </p>

      </div>



      <button
        onClick={toggle}
        style={{
          width:65,
          padding:8,
          border:"none",
          borderRadius:20,
          background: enabled
            ? "#16a34a"
            : "#374151",
          color:"#fff",
          fontWeight:700,
          cursor:"pointer",
        }}
      >

        {
          enabled
          ? "ON"
          : "OFF"
        }

      </button>


    </div>

  );

}



const styles = {

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