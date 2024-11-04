import { useI18n } from 'vue-i18n'

const modelValue = ref<boolean>(false)
const raise = ref<boolean>(false)
const title = ref<string>('Are you sure?')
const text = ref<string>()
const color = ref<string>('primary')
const presistent = ref<boolean>(true)
const confirmText = ref<string>('Confirm')
const cancelText = ref<string>('Cancel')
const callback = ref<CallableFunction>(() => undefined)

interface dialogOptions {
  title?: string;
  text?: string;
  color?: string;
  presistent?: boolean;
  confirmText?: string;
  cancelText?: string;
}
export default function useConfirm () {
  const { t } = useI18n()
  const showConfirmationDialog = (
    callbackFn: CallableFunction,
    dialogOptions?: dialogOptions
  ) => {
    presistent.value = dialogOptions?.presistent === undefined ? true : dialogOptions?.presistent
    title.value = dialogOptions?.title ?? t('are_you_sure')
    text.value = dialogOptions?.text
    color.value = dialogOptions?.color ?? 'primary'
    confirmText.value = dialogOptions?.confirmText ?? t('confirm')
    cancelText.value = dialogOptions?.cancelText ?? t('cancel')
    modelValue.value = true
    callback.value = callbackFn
  }

  const onConfirm = () => {
    modelValue.value = false
    callback.value()
    callback.value = () => undefined
  }
  const onCancel = () => {
    modelValue.value = false
    callback.value = () => undefined
  }

  return {
    modelValue,
    title,
    text,
    color,
    confirmText,
    cancelText,
    raise,
    presistent,
    showConfirmationDialog,
    onConfirm,
    onCancel,
  }
}
