<template>
  <UApp>
    <NuxtLayout>
      <UError :error="error" />
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>
