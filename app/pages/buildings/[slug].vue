<template>
  <UPage>
    <UPageHeader />
    <ContentRenderer :value="post" />
    <UPageBody />
  </UPage>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`building-${slug}`, () => {
  return queryCollection('buildings').path(`/buildings/${slug}`).first()
})
</script>
