import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For React Native apps
import enTranslation from "../locales/en.json";
import frTranslation from "../locales/fr.json";
import nlTranslation from "../locales/nl.json";

const initializeI18n = async () => {
  try {
    // Get the saved language from AsyncStorage
    const storedLanguage = await AsyncStorage.getItem("language");

    // Initialize i18n
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: enTranslation },
        fr: { translation: frTranslation },
        nl: { translation: nlTranslation }
      },
      lng: storedLanguage || "en", // Use stored language or default to English
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
    });
  } catch (error) {
    console.error("Error loading language from AsyncStorage:", error);
    i18n.use(initReactI18next).init({
      resources: {
        en: { translation: enTranslation },
        fr: { translation: frTranslation },
        nl: { translation: nlTranslation }
      },
      lng: "en", // Default to English if there's an error
      fallbackLng: "en",
      interpolation: {
        escapeValue: false
      }
    });
  }
};

// Detect and persist language change
i18n.on("languageChanged", (lang) => {
  AsyncStorage.setItem("language", lang);
});

// Call initialization function
initializeI18n();

export default i18n;
