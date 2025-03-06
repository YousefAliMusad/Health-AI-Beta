import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: require("./locales/en/translation.json"),
      },
      ar: {
        translation: require("./locales/ar/translation.json"),
      },
    },
    fallbackLng: "en", // Default language
    detection: {
      order: ["localStorage", "navigator"], // Prioritizes localStorage, then browser language
      caches: ["localStorage"], // Saves selected language in localStorage
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
    