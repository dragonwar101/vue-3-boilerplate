import type { App } from 'vue'
import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import i18n from './i18n'

export const axiosClient = axios.create({
  baseURL: 'https://osarh.test/api/v1/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
axiosClient.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      window.location.replace('/auth/login')
    }
    return Promise.reject(error)
  }
)
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem('token')
    const tokenType = localStorage.getItem('token_type')
    if (token) config.headers.Authorization = `${tokenType} ${token}`
    config.headers['Accept-Language'] = i18n.global.locale.value
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)
export default {
  install (app: App) {
    app.config.globalProperties.axios = axiosClient
  }
}
