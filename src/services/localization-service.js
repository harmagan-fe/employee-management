import { en } from "../locales/en.js";
import { tr } from "../locales/tr.js";

const translations = { en, tr };

class LocalizationService {
  constructor() {
    this.currentLang = document.documentElement.lang || "en";
  }

  t(key) {
    return (
      translations[this.currentLang]?.[key] || translations["en"][key] || key
    );
  }

  setLanguage(lang) {
    this.currentLang = lang;
    document.documentElement.lang = lang;
    this.notifyComponents();
  }

  notifyComponents() {
    document.querySelectorAll("[data-localized]").forEach((component) => {
      if (component.requestUpdate) {
        component.requestUpdate();
      }
    });
  }
}

export const localizationService = new LocalizationService();
