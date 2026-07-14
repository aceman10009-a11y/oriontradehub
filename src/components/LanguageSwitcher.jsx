import React from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "🇺🇸 English" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "it", label: "🇮🇹 Italiano" },
  { code: "pt", label: "🇵🇹 Português" },
  { code: "nl", label: "🇳🇱 Nederlands" },
  { code: "sv", label: "🇸🇪 Svenska" },
  { code: "da", label: "🇩🇰 Dansk" },
  { code: "no", label: "🇳🇴 Norsk" },
  { code: "pl", label: "🇵🇱 Polski" },
  { code: "ar", label: "🇸🇦 العربية" },
  { code: "zh", label: "🇨🇳 中文" },
  { code: "ja", label: "🇯🇵 日本語" },
  { code: "ko", label: "🇰🇷 한국어" },
  {code: "fi",  label: "fi finish"},
  { code: "th", name: "ไทย" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
  { code: "ms", name: "Bahasa Melayu" },
   { code: "ro", name: "Română" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <>
      <style>{`
        .language-switcher{
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          color:#fff;
          padding:11px 14px;
          border-radius:999px;
          outline:none;
          cursor:pointer;
          font-size:14px;
          transition:.3s;
        }

        .language-switcher:hover{
          border-color:rgba(32,164,255,.35);
        }

        .language-switcher option{
          background:#0b1118;
          color:#fff;
        }

        @media(max-width:640px){
          .language-switcher{
            padding:10px 12px;
            font-size:13px;
            max-width:110px;
          }
        }
      `}</style>

      <select
        className="language-switcher"
        value={i18n.language}
        onChange={(e) => {
  const language = e.target.value;

  i18n.changeLanguage(language);

  localStorage.setItem("language", language);
}}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageSwitcher;