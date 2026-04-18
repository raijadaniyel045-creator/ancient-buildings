<template>
  <UHeader :title="t('title')">
    <ClientOnly>
      <UNavigationMenu :items="items"/>
    </ClientOnly>
    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
      />
      <USeparator class="my-6"/>
      <LangSwitcher/>
    </template>
    <template #right>
      <UColorModeButton/>
      <LangSwitcher/>
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type {NavigationMenuItem} from '@nuxt/ui'

const {t} = useI18n({
  useScope: 'local'
})
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: t('home'),
    to: localePath('/')
  }
])
</script>

<i18n lang="yaml">
en:
  home: Home
  title: Chinese Ancient Buildings
cn:
  home: 首页
  title: 中国古建筑
</i18n>
