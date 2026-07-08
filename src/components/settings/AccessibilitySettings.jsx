import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";


export default function AccessibilitySettings() {

  const { user, profile, setProfile } = useAuth();


  const [accessibility, setAccessibility] = useState(
    profile?.accessibility || {
      largeText: false,
      reducedMotion: false,
      highContrast: false,
    }
  );



  useEffect(()=>{

    document.body.style.fontSize =
      accessibility.largeText
      ? "18px"
      : "16px";


    document.body.style.transition =
      accessibility.reducedMotion
      ? "none"
      : "all .3s ease";


    document.body.style.filter =
      accessibility.highContrast
      ? "contrast(1.25)"
      : "none";


    return ()=>{

      document.body.style.fontSize="";
      document.body.style.transition="";
      document.body.style.filter="";

    };


  },[accessibility]);




  const toggle = (key)=>{

    setAccessibility({
      ...accessibility,
      [key]:!accessibility[key],
    });

  };




  const saveAccessibility = async()=>{

    if(!user) return;


    try{

      const data={
        accessibility,
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
        "Accessibility settings saved."
      );


    }catch(error){

      console.error(error);

      toast.error(
        "Unable to save accessibility settings."
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
        Accessibility
      </h2>


      <p style={{color:"#9ca3af"}}>
        Adjust OrionTradeHub to your preferred viewing experience.
      </p>



      <SettingRow
        title="Large Text"
        description="Increase text size throughout the platform."
        enabled={accessibility.largeText}
        toggle={()=>toggle("largeText")}
      />



      <SettingRow
        title="Reduced Motion"
        description="Reduce animations and transitions."
        enabled={accessibility.reducedMotion}
        toggle={()=>toggle("reducedMotion")}
      />



      <SettingRow
        title="High Contrast"
        description="Increase visual contrast for readability."
        enabled={accessibility.highContrast}
        toggle={()=>toggle("highContrast")}
      />



      <button
        onClick={saveAccessibility}
        style={styles.save}
      >
        Save Accessibility
      </button>


    </div>

  );

}




function SettingRow({
  title,
  description,
  enabled,
  toggle
}){


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
background:enabled
?"#16a34a"
:"#374151",
color:"#fff",
fontWeight:700,
cursor:"pointer",
}}
>

{
enabled
?"ON"
:"OFF"
}

</button>


</div>

);


}





const styles={

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