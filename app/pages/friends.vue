<template>
  <NuxtPage />
</template>

<script lang="ts">
const store = useAccountStore()
const router = useRouter()
const localePath = useLocalePath()
if (!store.isLoggedIn) {
  router.push(localePath('/auth'))
}
</script>
