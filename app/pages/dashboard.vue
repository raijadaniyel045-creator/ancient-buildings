<template>
  <UPage>
    <UPageHeader
      class="items-center justify-center flex flex-col"
    >
      <h2 class="text-4xl font-bold font-serif mb-6 text-amber-400">
        全国古建数据大屏
      </h2>
    </UPageHeader>
    <UContainer class="bg-[#ffffffd9] rounded-lg shadow-2xl border border-white/3 my-8">
      <div class="py-24 px-6">
        <Regional />
      </div>
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
import Regional from '~/components/dashboard/Regional.vue'
</script>
