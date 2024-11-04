<template>
  <AppLoader />
  <router-view />
  <v-snackbar :model-value="snackbar.modelValue" v-bind="snackbar" />
  <ConfirmDialog />
</template>

<script setup lang="ts">
  import useLayoutManager from '@/composables/useLayoutManager'
  const { snackbar } = useLayoutManager()
</script>
