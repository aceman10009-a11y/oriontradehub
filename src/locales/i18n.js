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
import th from "./th.json";
import vi from "./vi.json";
import uk from "./uk.json";
import ru from "./ru.json";
import ms from "./ms.json";
import ro from "./ro.json";
import enSecurity from "./en/security.json";
import deSecurity from "./de/security.json";
import frSecurity from "./fr/security.json";
import esSecurity from "./es/security.json";
import svSecurity from "./sv/security.json";
import daSecurity from "./da/security.json";
import fiSecurity from "./fi/security.json";
import plSecurity from "./pl/security.json";
import itSecurity from "./it/security.json";
import ptSecurity from "./pt/security.json";
import nlSecurity from "./nl/security.json";
import zhSecurity from "./zh/security.json";
import jaSecurity from "./ja/security.json";
import koSecurity from "./ko/security.json";
import arSecurity from "./ar/security.json";
import noSecurity from "./no/security.json";
import thSecurity from "./th/security.json";
import viSecurity from "./vi/security.json";
import ukSecurity from "./uk/security.json";
import ruSecurity from "./ru/security.json";
import msSecurity from "./ms/security.json";
import roSecurity from "./ro/security.json";
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
      security: enSecurity,
    },

    de: {
      translation: de,
      security: deSecurity,
    },

    fr: {
      translation: fr,
      security: frSecurity,
    },

    es: {
      translation: es,
      security: esSecurity,
    },

    sv: {
      translation: sv,
      security: svSecurity,
    },

    da: {
      translation: da,
      security: daSecurity,
    },

    fi: {
      translation: fi,
      security: fiSecurity,
    },

    pl: {
      translation: pl,
      security: plSecurity,
    },

    it: {
      translation: it,
      security: itSecurity,
    },

    pt: {
      translation: pt,
      security: ptSecurity,
    },

    nl: {
      translation: nl,
      security: nlSecurity,
    },

    zh: {
      translation: zh,
      security: zhSecurity,
    },

    ja: {
      translation: ja,
      security: jaSecurity,
    },

    ko: {
      translation: ko,
      security: koSecurity,
    },

    ar: {
      translation: ar,
      security: arSecurity,
    },

    no: {
      translation: no,
      security: noSecurity,
    },

    th: {
      translation: th,
      security: thSecurity,
    },

    vi: {
      translation: vi,
      security: viSecurity,
    },

    uk: {
      translation: uk,
      security: ukSecurity,
    },

    ru: {
      translation: ru,
      security: ruSecurity,
    },

    ms: {
      translation: ms,
      security: msSecurity,
    },

    ro: {
      translation: ro,
      security: roSecurity,
    },
  },

  ns: ["translation", "security"],
  defaultNS: "translation",

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
    "no",
    "th",
    "uk",
    "vi",
    "ms",
    "ro",
    "ru",
  ],

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;