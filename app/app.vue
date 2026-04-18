<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const {t} = useI18n({
  useScope: 'local'
})

useHead({
  meta: [
    {name: 'viewport', content: 'width=device-width, initial-scale=1'}
  ],
  link: [
    {rel: 'icon', href: '/favicon.ico'}
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const title = t('title')
const description = t('description')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<i18n>
en:
  title: Chinese Ancient Buildings
  description: A collection of Chinese ancient buildings
cn:
  title: 中国古建筑
  description: 中国古建筑的集合
</i18n>
