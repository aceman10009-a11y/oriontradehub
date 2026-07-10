import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import TradingPreferences from "../components/settings/TradingPreferences";
import AccessibilitySettings from "../components/settings/AccessibilitySettings";
import PrivacySettings from "../components/settings/PrivacySettings";


export default function Settings() {

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("Profile");

  const sections = [
    "Profile",
    "Security",
    "Appearance",
    "Notifications",
    "Trading Preferences",
    "Accessibility",
    "Privacy",
  ];



  const renderContent = () => {

    switch(activeTab){

      case "Profile":
        return <ProfileSettings />;

      case "Security":
        return <SecuritySettings />;

      case "Appearance":
        return <AppearanceSettings />;

      case "Notifications":
        return <NotificationSettings />;

      case "Trading Preferences":
        return <TradingPreferences />;

      case "Accessibility":
        return <AccessibilitySettings />;

      case "Privacy":
        return <PrivacySettings />;

      default:
        return <ProfileSettings />;

    }

  };



  return (

    <div
      style={{
        minHeight:"100vh",
        background:"#060809",
        color:"#fff",
        padding:"90px 12px 30px",
        fontFamily:"system-ui",
      }}
    >


  <div
  style={{
    maxWidth: 1200,
    width: "100%",
    margin: "auto",
  }}
>
  <h1>{t("accountSettings")}</h1>

  <p
    style={{
      color: "#9ca3af",
      marginBottom: 30,
    }}
  >
    {t("manageSettings")}
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        window.innerWidth < 768
          ? "1fr"
          : "260px 1fr",
      gap: 25,
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection:
          window.innerWidth < 768
            ? "row"
            : "column",

        gap: 10,

        overflowX:
          window.innerWidth < 768
            ? "auto"
            : "visible",

        paddingBottom:
          window.innerWidth < 768
            ? 10
            : 0,
      }}
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveTab(section)}
          style={{
            minWidth:
              window.innerWidth < 708
                ? "140px"
                : "100%",

            padding: "14px 16px",

            borderRadius: 10,

            border: "1px solid #1f2937",

            cursor: "pointer",

            background:
              activeTab === section
                ? "#1199fa"
                : "#111827",

            color: "#fff",

            fontWeight: 600,

            fontSize: "15px",

            whiteSpace: "nowrap",
          }}
        >
          {section === "Trading Preferences"
            ? t("tradingPreferences")
            : t(section.toLowerCase())}
        </button>
      ))}
    </div>

    <div>
      {renderContent()}
    </div>
  </div>
</div>

</div>

);

}