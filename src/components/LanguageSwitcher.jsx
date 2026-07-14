import React from "react";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../config/languages";

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
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default LanguageSwitcher;