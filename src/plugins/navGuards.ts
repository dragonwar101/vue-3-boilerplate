import router from '@/router'
import { App } from 'vue'

export default {
  install (app: App) {
    app.config.globalProperties.loading = shallowRef(false)
    app.provide('loading', app.config.globalProperties.loading)
    // Navigation guards
    router.beforeEach((to, from, next) => {
      app.config.globalProperties.loading.value = true
      next()
    })
    router.afterEach(() => {
      app.config.globalProperties.loading.value = false
    })
  }
}
