import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import de from "./de.json";
import fr from "./fr.json";
import es from "./es.json";
import sv from "./sv.json";
import da from "./da.json";
import fi from "./fi.json";
import pl from "./pl.json";
import it from "./it.json";
import pt from "./pt.json";
import nl from "./nl.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";
import ar from "./ar.json";
import no from "./no.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },

    de: {
      translation: de,
    },

    fr: {
      translation: fr,
    },

    es: {
      translation: es,
    },

    sv: {
      translation: sv,
    },

    da: {
      translation: da,
    },

    fi: {
      translation: fi,
    },

    pl: {
      translation: pl,
    },

    it: {
      translation: it,
    },

    pt: {
      translation: pt,
    },

    nl: {
      translation: nl,
    },

    zh: {
      translation: zh,
    },

    ja: {
      translation: ja,
    },

    ko: {
      translation: ko,
    },

    ar: {
      translation: ar,
    },
    no: {
  translation: no,
},
  },

  lng: localStorage.getItem("language") || "en",

  fallbackLng: "en",

  supportedLngs: [
    "en",
    "de",
    "fr",
    "es",
    "sv",
    "da",
    "fi",
    "pl",
    "it",
    "pt",
    "nl",
    "zh",
    "ja",
    "ko",
    "ar",
    "no"
  ],

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;