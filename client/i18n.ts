import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import tm from "./locales/tkm/common.json";
import en from "./locales/en/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tm: { translation: tm },
      en: { translation: en },
    },
    fallbackLng: "tm",
    interpolation: { escapeValue: false },
  });

export default i18n;
