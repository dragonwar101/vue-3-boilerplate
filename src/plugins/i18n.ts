import { createI18n } from 'vue-i18n'
import ar from '../lang/ar.json'
import en from '../lang/en.json'
import { ar as vuetifyAR, en as vuetifyEN } from 'vuetify/locale'
export default createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en: {
      $vuetify: vuetifyEN,
      ...en,
    },
    ar: {
      $vuetify: vuetifyAR,
      ...ar,
    },
  }
})
