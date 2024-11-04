import { type VSnackbar } from 'vuetify/components'
type SnackbarOptions = Partial<VSnackbar['$props']>;

const drawer = ref(true)
const snackbar = ref<SnackbarOptions>({
  color: 'primary',
  modelValue: false,
  text: '',
})
const timeoutId = ref(0)
export default function useLayoutManager () {
  const showSnackbar = (options: SnackbarOptions) => {
    clearTimeout(timeoutId.value)
    snackbar.value = { ...snackbar.value, ...options as any, timeout: -1, modelValue: true }
    timeoutId.value = setTimeout(() => {
      snackbar.value = {
        color: 'primary',
        modelValue: false,
        text: '',
      }
    }, Number(options.timeout) || 3000)
  }

  return {
    drawer,
    snackbar,
    showSnackbar,
  }
}
