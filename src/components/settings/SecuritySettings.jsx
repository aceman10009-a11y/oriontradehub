import React, { useState } from "react";

import {
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../../firebase/config";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";


export default function SecuritySettings() {

  const { user } = useAuth();

  const [newPassword, setNewPassword] = useState("");

  const changePassword = async () => {

    if (!newPassword) {
      toast.error("Enter a new password first.");
      return;
    }


    try {

      await updatePassword(
        auth.currentUser,
        newPassword
      );


      toast.success(
        "Password updated successfully."
      );


      setNewPassword("");


    } catch(error){

      console.error(error);


      if(error.code === "auth/requires-recent-login"){
        toast.info(
          "For security reasons, please sign out and sign back in before changing your password."
        );
      } else {
        toast.error(
          "Unable to update password."
        );
      }

    }

  };



  const sendResetEmail = async () => {

    if(!user?.email) return;


    try {

      await sendPasswordResetEmail(
        auth,
        user.email
      );


      toast.success(
        "Password reset email sent."
      );


    } catch(error){

      console.error(error);

      toast.error(
        "Could not send reset email."
      );

    }

  };


const enableTwoFactor = () => {

  toast.info(
    "Two-factor authentication is not yet available for your account. Trade up to 30,000 USD to unlock this security feature.",
    {
      autoClose: 6000,
    }
  );

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
        Security
      </h2>


      <p
        style={{
          color:"#9ca3af"
        }}
      >
        Manage your account security settings.
      </p>



      <div style={styles.card}>

        <strong>
          Email Verification
        </strong>

        <p>
          {
            user?.emailVerified
            ? "Verified ✓"
            : "Pending verification"
          }
        </p>

      </div>



      <div style={styles.card}>

        <strong>
          Change Password
        </strong>


        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e)=>
            setNewPassword(e.target.value)
          }
          style={styles.input}
        />


        <button
          onClick={changePassword}
          style={styles.button}
        >
          Update Password
        </button>


      </div>




      <div style={styles.card}>

        <strong>
          Password Recovery
        </strong>

        <p>
          Receive a secure password reset email.
        </p>


        <button
          onClick={sendResetEmail}
          style={styles.button}
        >
          Send Reset Email
        </button>

      </div>




      <div style={styles.card}>

        <strong>
          Two-Factor Authentication
        </strong>


        <p>
          Add another layer of account protection.
        </p>


        <button
          onClick={enableTwoFactor}
          style={styles.button}
        >
          Enable 2FA
        </button>


      </div>


    </div>

  );

}



const styles={


card:{
  background:"#0b0f14",
  padding:18,
  borderRadius:10,
  marginTop:15,
},


input:{
  display:"block",
  width:"100%",
  marginTop:15,
  padding:12,
  background:"#111827",
  border:"1px solid #374151",
  color:"#fff",
  borderRadius:8,
  boxSizing:"border-box",
},


button:{
  marginTop:15,
  padding:"12px 18px",
  background:"#1199fa",
  color:"#fff",
  border:"none",
  borderRadius:8,
  cursor:"pointer",
  fontWeight:700,
}

};