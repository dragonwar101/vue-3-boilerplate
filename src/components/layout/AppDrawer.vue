<template>
  <v-navigation-drawer v-model="drawer" color="primary" elevation="2">
    <div class="pa-10">
      <img alt="Osarh Logo" src="@/assets/logo-white.svg" width="100%">
    </div>
    <v-list-item prepend-icon="mdi-home" :title="$t('home')" to="/admin" />
    <v-list-item prepend-icon="mdi-file" :title="$t('crud_test')" to="/admin/crud" />
    <v-list-item prepend-icon="mdi-school" :title="$t('academies')" to="/admin/academies" />
    <v-list-item prepend-icon="mdi-package" :title="$t('packages')" to="/admin/packages" />
    <v-list-item prepend-icon="mdi-archive" :title="$t('orders')" to="/admin/orders" />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import useLayoutManager from '@/composables/useLayoutManager'

  const { drawer } = useLayoutManager()
</script>
