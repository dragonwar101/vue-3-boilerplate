<template>
  <v-app-bar class="border-b" elevation="0">
    <template #prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </template>
    <template #append>
      <v-btn icon>
        <v-avatar icon="mdi-account" />
        <v-menu activator="parent" transition="slide-y-transition0">
          <v-list>
            <v-list-item :title="$i18n.locale === 'ar' ? 'English' : 'العربية'" @click="switchLocale" />
            <v-list-item :title="$t('Logout')" to="/auth/login" />
          </v-list>
        </v-menu>
      </v-btn>

    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
  import useLayoutManager from '@/composables/useLayoutManager'
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
  const { drawer } = useLayoutManager()
  const switchLocale = () => {
    locale.value = locale.value === 'ar' ? 'en' : 'ar'
  }
</script>
