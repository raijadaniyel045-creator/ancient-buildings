<template>
  <div />
</template>

<script setup lang="ts">
const localePath = useLocalePath()
useRouter().replace(localePath('/auth/login'))
</script>
