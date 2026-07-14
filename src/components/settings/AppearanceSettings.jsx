import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../config/languages";

const languages = [
  "English",
  "German",
  "French",
  "Spanish",

  "Italian",
  "Portuguese",
  "Dutch",

  "Swedish",
  "Danish",
  "Norwegian",
  "Finnish",
  "Polish",

  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",

  "Thai",
  "Vietnamese",
  "Malay",
  "Romanian",
  "Russian",
  "Ukrainian",
];

export default function AppearanceSettings() {
  const { t, i18n } = useTranslation();

  const { user, profile, setProfile } = useAuth();

  const [language, setLanguage] = useState(
    profile?.language || "English"
  );

  const [theme, setTheme] = useState(
    profile?.theme || "Dark"
  );

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setLanguage(profile.language || "English");
      setTheme(profile.theme || "Dark");
    }
  }, [profile]);

  const saveAppearance = async () => {
    if (!user) return;

    setSaving(true);

    try {
      const languageCode = {
        English: "en",
        German: "de",
        French: "fr",
        Spanish: "es",

        Italian: "it",
        Portuguese: "pt",
        Dutch: "nl",

        Swedish: "sv",
        Danish: "da",
        Norwegian: "no",
        Finnish: "fi",
        Polish: "pl",

        Chinese: "zh",
        Japanese: "ja",
        Korean: "ko",
        Arabic: "ar",

        Thai: "th",
        Vietnamese: "vi",
        Malay: "ms",
        Romanian: "ro",
        Russian: "ru",
        Ukrainian: "uk",
      };

      const selectedLanguage =
        languageCode[language] || "en";

      await i18n.changeLanguage(selectedLanguage);

      localStorage.setItem("language", selectedLanguage);
      localStorage.setItem("theme", theme);

      document.documentElement.setAttribute(
        "data-theme",
        theme
      );

      localStorage.setItem("theme", theme);

      const data = {
        language,
        theme,
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

      toast.success("Appearance settings saved");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save appearance settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2>{t("appearance")}</h2>

      <p style={styles.text}>
        {t("manageSettings")}
      </p>

      <label>{t("language")}</label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.input}
      >
        {languages.map((lang) => (
          <option key={lang}>
            {lang}
          </option>
        ))}
      </select>

      <label>{t("theme")}</label>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={styles.input}
      >
        <option>Dark</option>
        <option>Light</option>
        <option>System Default</option>
      </select>

      <button
        onClick={saveAppearance}
        disabled={saving}
        style={{
          ...styles.button,
          opacity: saving ? 0.6 : 1,
          cursor: saving ? "not-allowed" : "pointer",
        }}
      >
        {saving ? "Saving..." : t("saveChanges")}
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    background: "#111827",
    padding: 24,
    borderRadius: 12,
    color: "#fff",
  },

  text: {
    color: "#9ca3af",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    margin: "10px 0 20px",
    background: "#0b0f14",
    color: "#fff",
    border: "1px solid #293548",
    borderRadius: 8,
  },

  button: {
    padding: "12px 20px",
    background: "#1199fa",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
};