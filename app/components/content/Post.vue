<template>
  <div>
    <slot />
  </div>
  <ClientOnly>
    <Teleport to="#content-grid">
      <!--
      <slot
        v-if="$slots.architecture"
        name="architecture"
      />
      <slot
        v-if="$slots.history"
        name="history"
      />
      <slot
        v-if="$slots.culture"
        name="culture"
      />
      -->
      <slot
        v-if="$slots.supplement"
        name="supplement"
      />
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
</script>
