<template>
  <div v-if="loading" class="position-relative" style="z-index: 1007;">
    <v-progress-linear color="primary" indeterminate />
  </div>
</template>
<script setup lang="ts">
  const loading = inject('loading')
</script>
