import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";


export default function TradingPreferences() {

  const { user, profile, setProfile } = useAuth();


  const [preferences, setPreferences] = useState(
    profile?.tradingPreferences || {
      defaultMarket: "BTC/USD",
      timeframe: "1m",
      currency: "USD",
      riskLevel: "Moderate",
      autoRefresh: true,
    }
  );



  const updatePreference = (key,value)=>{

    setPreferences({
      ...preferences,
      [key]:value,
    });

  };



  const savePreferences = async()=>{

    if(!user) return;


    try{

      const data = {
        tradingPreferences: preferences,
        updatedAt:new Date(),
      };


      await updateDoc(
        doc(db,"users",user.uid),
        data
      );


      setProfile({
        ...profile,
        ...data,
      });


      toast.success(
        "Trading preferences saved."
      );


    }catch(error){

      console.error(error);

      toast.error(
        "Unable to save trading preferences."
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
        Trading Preferences
      </h2>


      <p style={{color:"#9ca3af"}}>
        Customize your trading environment.
      </p>



      <div style={styles.field}>

        <label>
          Default Market
        </label>


        <select
          value={preferences.defaultMarket}
          onChange={(e)=>
            updatePreference(
              "defaultMarket",
              e.target.value
            )
          }
          style={styles.input}
        >

          <option>
            BTC/USD
          </option>

          <option>
            ETH/USD
          </option>

          <option>
            EUR/USD
          </option>

          <option>
            GOLD/USD
          </option>

        </select>

      </div>




      <div style={styles.field}>

        <label>
          Chart Timeframe
        </label>


        <select
          value={preferences.timeframe}
          onChange={(e)=>
            updatePreference(
              "timeframe",
              e.target.value
            )
          }
          style={styles.input}
        >

          <option value="1m">
            1 Minute
          </option>

          <option value="5m">
            5 Minutes
          </option>

          <option value="15m">
            15 Minutes
          </option>

          <option value="1h">
            1 Hour
          </option>

          <option value="1d">
            Daily
          </option>

        </select>

      </div>




      <div style={styles.field}>

        <label>
          Account Currency
        </label>


        <select
          value={preferences.currency}
          onChange={(e)=>
            updatePreference(
              "currency",
              e.target.value
            )
          }
          style={styles.input}
        >

          <option>
            USD
          </option>

          <option>
            EUR
          </option>

          <option>
            GBP
          </option>
            YEN
          <option>
            NOK
          </option>

        </select>


      </div>





      <div style={styles.field}>

        <label>
          Risk Preference
        </label>


        <select
          value={preferences.riskLevel}
          onChange={(e)=>
            updatePreference(
              "riskLevel",
              e.target.value
            )
          }
          style={styles.input}
        >

          <option>
            Conservative
          </option>

          <option>
            Moderate
          </option>

          <option>
            Aggressive
          </option>

        </select>


      </div>




      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginTop:20,
        }}
      >

        <span>
          Auto refresh market data
        </span>


        <button
          onClick={()=>
            updatePreference(
              "autoRefresh",
              !preferences.autoRefresh
            )
          }

          style={{
            ...styles.toggle,
            background:
              preferences.autoRefresh
              ? "#16a34a"
              : "#374151",
          }}
        >

          {
            preferences.autoRefresh
            ? "ON"
            : "OFF"
          }

        </button>


      </div>




      <button
        onClick={savePreferences}
        style={styles.save}
      >
        Save Trading Preferences
      </button>


    </div>

  );

}




const styles={


field:{
  marginTop:20,
},


input:{
  display:"block",
  marginTop:8,
  width:"100%",
  padding:12,
  background:"#0b0f14",
  color:"#fff",
  border:"1px solid #374151",
  borderRadius:8,
},


toggle:{
  width:65,
  padding:8,
  border:"none",
  borderRadius:20,
  color:"#fff",
  fontWeight:700,
  cursor:"pointer",
},


save:{
  marginTop:25,
  padding:"12px 22px",
  border:"none",
  borderRadius:8,
  background:"#1199fa",
  color:"#fff",
  cursor:"pointer",
  fontWeight:700,
}

};