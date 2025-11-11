import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import tm from "./locales/tkm/common.json";
import ru from "./locales/ru/common.json";
import kk from "./locales/kk/common.json";
import uz from "./locales/uz/common.json";
import tj from "./locales/tj/common.json";
import kg from "./locales/kg/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      tm: { translation: tm },
      ru: { translation: ru },
      kk: { translation: kk },
      uz: { translation: uz },
      tj: { translation: tj },
      kg: { translation: kg },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "tm", "ru", "kk", "uz", "tj", "kg"],
    interpolation: { escapeValue: false },
  });

export default i18n;
