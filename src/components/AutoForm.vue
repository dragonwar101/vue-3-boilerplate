<template>
  <v-form ref="form" validate-on="lazy" @submit.prevent="submit">
    <v-row dense>
      <v-col
        v-for="(input, i) in inputs.filter(x => x.colAttrs?.enabled === undefined ? true : x.colAttrs!.enabled)"
        :key="i"
        v-bind="{ ...colAttrs, ...input.colAttrs }"
        align-self="center"
      >
        <v-text-field
          v-if="!input.field || input.field === 'textField'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <v-combobox
          v-if="input.field === 'comboBox'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <v-textarea
          v-if="input.field === 'textarea'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <v-select
          v-else-if="input.field === 'select'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <v-autocomplete
          v-else-if="input.field === 'autocomplete'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <v-checkbox
          v-else-if="input.field === 'checkbox'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <div v-else-if="input.field === 'chipGroup'">
          <v-text-field
            active
            :error-messages="errors && errors[input.name]"
            v-bind="{ loading, ...input.attrs }"
            @keydown.enter.prevent="(event:any) => addChip(event, input.name)"
          >
            <v-chip-group>
              <v-chip
                v-for="(item, j) in formRecord[input.name] || []"
                :key="j"
              >
                {{ item }}
                <v-icon
                  icon="mdi-close"
                  @click="formRecord[input.name].splice(j, 1)"
                />
              </v-chip>
            </v-chip-group>
          </v-text-field>
        </div>
        <v-radio-group
          v-else-if="input.field === 'radioGroup'"
          v-model="formRecord[input.name]"
          v-bind="input.attrs"
        >
          <v-radio v-for="(item, j) in input.items" :key="j" v-bind="item" />
        </v-radio-group>
        <v-file-input
          v-else-if="input.field === 'fileInput'"
          v-model="formRecord[input.name]"
          v-bind="{ loading, ...input.attrs }"
          :error-messages="errors && errors[input.name]"
        />
        <div
          v-else-if="input.field === 'imageInput'"
          class="position-relative mx-auto my-6"
          style="width: max-content; height: max-content"
        >
          <v-img
            class="rounded-lg elevation-3"
            cover
            height="150"
            :src="
              fileToImg(formRecord[input.name + '_file']) ||
                formRecord[input.name] ||
                placeholder
            "
            width="150"
          />
          <v-btn
            class="position-absolute"
            color="primary"
            icon="mdi-pencil"
            size="35"
            style="left: -20px; top: -20px"
            variant="tonal"
            @click="($refs as any)[input.name + '_input'][0].click()"
          />
          <v-btn
            v-show="formRecord[input.name + '_file']"
            class="position-absolute"
            color="error"
            icon="mdi-close"
            size="35"
            style="right: -20px; top: -20px"
            variant="tonal"
            @click="[(formRecord[input.name + '_file'] = undefined)]"
          />
          <input
            :ref="input.name + '_input'"
            accept="image/jpg,image/jpeg,image/png"
            hidden
            type="file"
            @change="($e) => updateImage($e, input.name)"
          >
        </div>
        <div v-else-if="input.field === 'divider'" v-bind="input.attrs" />
      </v-col>
      <slot :errors="errors" :form-record="formRecord" :loading="loading" />
      <v-col v-if="btnText" align="center" cols="12">
        <slot
          :errors="errors"
          :form-record="formRecord"
          :loading="loading"
          name="submit"
        >
          <v-btn
            v-show="!!btnText"
            block
            :color="btnColor || 'primary'"
            :loading="loading"
            type="submit"
          >
            {{ $t(btnText!) }}
          </v-btn>
        </slot>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import { toFormData } from 'axios'
import type {
  VAutocomplete,
  VCheckbox,
  VCol,
  VFileInput,
  VRadioGroup,
  VSelect,
  VTextarea,
  VTextField,
} from 'vuetify/lib/components/index.mjs'
import placeholder from '@/assets/placeholder.jpg'
type fileInputType = { accept?: string } & VFileInput['$props'];
export interface IInput {
  name: string;
  items?: any[];
  itemTitle?: string;
  itemValue?: string;
  field?:
    | any
    | 'textField'
    | 'comboBox'
    | 'select'
    | 'autocomplete'
    | 'fileInput'
    | 'checkbox'
    | 'textarea'
    | 'chipGroup'
    | 'radioGroup'
    | undefined;
  colAttrs?: VCol['$props'] & { enabled: boolean };
  attrs?: VTextField['$props'] &
    VAutocomplete['$props'] &
    VSelect['$props'] &
    VTextarea['$props'] &
    VCheckbox['$props'] &
    VRadioGroup['$props'] &
    fileInputType;
}
export type IError = Record<string, string[]>;
interface IProps {
  inputs: IInput[];
  loading: boolean;
  btnText?: string;
  btnColor?: string;
  colAttrs?: VCol['$props'];
  errors?: IError;
  record?: Record<string, any>;
  uniVariant?: VTextField['variant'];
}
const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: 'submit', formRecord: FormData | Record<string, any>): void;
}>()
const form = useTemplateRef<any>('form')
const formRecord = ref<Record<string, any>>({ ...props.record })
// expose to outside refs accessing this form
defineExpose({ formRecord, form })
watch(
  () => props.record,
  () => {
    formRecord.value = { ...props.record }
  }
)

const submit = () => {
  const fileInputs = props.inputs
    .filter(i => i.field === 'fileInput')
    .map(i => i.name)
  let data = formRecord.value
  if (fileInputs.length) {
    fileInputs.forEach(f => {
      formRecord.value[f] =
        formRecord.value[f] && formRecord.value[f].length === 1
          ? formRecord.value[f][0]
          : formRecord.value[f]
    })
    formRecord.value._method = formRecord.value.id ? 'PATCH' : 'POST'
    data = toFormData(formRecord.value)
  }
  emits('submit', data)
}
const addChip = (event: any, name: string) => {
  const regex = /^\d+\.\d+\.\d+$/.test(event.target.value)
  if (formRecord.value[name].includes(event.target.value) || !regex) {
    event.target.value = ''
    return
  }
  formRecord.value[name].push(event.target.value)
  event.target.value = ''
}
const updateImage = (e: any, name: string) => {
  const file = e.target.files[0]
  formRecord.value[name + '_file'] = file
}
const fileToImg = (file: any) => {
  if (!file) return undefined
  return URL.createObjectURL(file)
}
</script>
