/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// import { ar, en } from 'vuetify/locale'
// import arI18n from '../lang/ar.json'
// import enI18n from '../lang/en.json'

// Composables
import { createVuetify } from 'vuetify'
import { useI18n } from 'vue-i18n'
import i18n from './i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#002870',
          'primary-light': '#E9F6FF',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
})
