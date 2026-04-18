<template>
  <div class="w-10 h-10 rounded-full bg-[#d03d3d] flex items-center justify-center shadow-inner relative overflow-hidden">
    <div class="absolute inset-0 border-2 border-white/20 rounded-full" />
    <UIcon
      name="i-lucide-landmark"
      class="w-6 h-6 text-white"
    />
  </div>
  <h1 class="text-2xl font-bold tracking-widest text-shadow-sm">
    {{ t('title') }}
  </h1>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
