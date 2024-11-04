/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import i18n from './i18n'
import { axiosClient as axios } from './axios'
import navGuards from './navGuards'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(navGuards)
    .use(pinia)
    .use(i18n)
    .provide('axios', axios)
}
