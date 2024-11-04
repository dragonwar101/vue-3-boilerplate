<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-dialog
    v-model="modelValue"
    max-width="400px"
    :persistent="presistent"
    z-index="2"
  >
    <v-card :color="color">
      <v-card-title v-show="title" v-html="title" />
      <v-card-text v-show="text" v-html="text" />
      <v-card-actions>
        <v-btn v-show="confirmText !== ''" @click="onConfirm">
          {{ confirmText }}
        </v-btn>
        <v-btn v-show="cancelText !== ''" @click="onCancel">
          {{ cancelText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import useConfirm from '@/composables/useConfirm'
  const {
    modelValue,
    color,
    title,
    text,
    confirmText,
    cancelText,
    presistent,
    onConfirm,
    onCancel,
  } = useConfirm()
</script>
