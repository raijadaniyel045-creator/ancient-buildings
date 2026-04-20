<template>
  <div
    class="bg-[#fdfaf5]"
  >
    <AbHeader />
    <UMain>
      <slot />
    </UMain>
    <AbFooter />
  </div>
</template>

<script lang="ts" setup>
import AbHeader from '~/components/AbHeader.vue'
import AbFooter from '~/components/AbFooter.vue'
</script>
