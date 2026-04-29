<template>
  <div>
    <slot />
  </div>
  <ClientOnly>
    <Teleport to="#content-grid">
      <slot
        v-if="$slots.supplement"
        name="supplement"
      />
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
</script>
