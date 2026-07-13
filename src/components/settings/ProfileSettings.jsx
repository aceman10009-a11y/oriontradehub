import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function ProfileSettings() {
  const { t, i18n } = useTranslation();
  const { user, profile, setProfile } = useAuth();

  const [name, setName] = useState(profile?.name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [profession, setProfession] = useState(profile?.profession || "");
  const [country, setCountry] = useState(profile?.country || "");
  const [language, setLanguage] = useState(
  localStorage.getItem("language") || "en"
);
  const [timezone, setTimezone] = useState(
    profile?.timezone ||
      Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const [loading, setLoading] = useState(false);


  const saveProfile = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const updatedProfile = {
        name,
        phone,
        profession,
        country,
        language,
        timezone,
        updatedAt: new Date(),
      };

      await updateDoc(
        doc(db, "users", user.uid),
        updatedProfile
      );

      setProfile({
        ...profile,
        ...updatedProfile,
      });

      toast.success("Profile updated successfully.");

    } catch (error) {
      console.error(error);
      toast.error("Unable to update profile.");
    }

    setLoading(false);
  };


  return (
    <div
      style={{
        background: "#111827",
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
      }}
    >

      <h2>{t("profile")}</h2>

     <p style={{ color:"#9ca3af" }}>
  {t("managePersonalInformation")}
</p>

<div style={styles.grid}>

  <input
    style={styles.input}
    value={name}
    placeholder={t("fullName")}
    onChange={(e)=>setName(e.target.value)}
  />

  <input
    style={styles.input}
    value={phone}
    placeholder={t("phoneNumber")}
    onChange={(e)=>setPhone(e.target.value)}
  />

  <input
    style={styles.input}
    value={profession}
    placeholder={t("profession")}
    onChange={(e)=>setProfession(e.target.value)}
  />

  <input
    style={styles.input}
    value={country}
    placeholder={t("country")}
    onChange={(e)=>setCountry(e.target.value)}
  />

<select
  style={styles.input}
  value={language}
  onChange={(e) => {
    const lang = e.target.value;

    setLanguage(lang);
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  }}
>
  <option value="en">{t("english")}</option>
  <option value="de">{t("german")}</option>
  <option value="fr">{t("french")}</option>
  <option value="es">{t("spanish")}</option>
  <option value="sv">{t("swedish")}</option>
  <option value="da">{t("danish")}</option>
  <option value="fi">{t("finnish")}</option>
  <option value="pl">{t("polish")}</option>
  <option value="it">{t("italian")}</option>
  <option value="pt">{t("portuguese")}</option>
  <option value="nl">{t("dutch")}</option>
  <option value="zh">中文</option>
  <option value="ja">日本語</option>
  <option value="ko">한국어</option>
  <option value="ar">العربية</option>
  <option value="no">Norsk</option>
</select>

  <input
    style={styles.input}
    value={timezone}
    placeholder={t("timezone")}
    onChange={(e)=>setTimezone(e.target.value)}
  />

</div>

<button
  onClick={saveProfile}
  disabled={loading}
  style={styles.button}
>
  {loading ? t("saving") : t("saveProfile")}
</button>

</div>
);
}

const styles = {

  grid:{
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
    gap:15,
    marginTop:20,
  },

  input:{
    padding:12,
    borderRadius:8,
    border:"1px solid #374151",
    background:"#0b0f14",
    color:"#fff",
    outline:"none",
  },

  button:{
    marginTop:20,
    padding:"12px 24px",
    borderRadius:8,
    border:"none",
    background:"#1199fa",
    color:"#fff",
    cursor:"pointer",
    fontWeight:600,
  }

};