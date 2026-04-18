<template>
  <div>
    <USeparator
      :label="t('title')"
    />
    <UFooter>
      <template #left>
        <p class="text-muted text-sm">
          Copyright © {{ new Date().getFullYear() }} XXX
        </p>
      </template>
      <ClientOnly>
        <UNavigationMenu :items="items"/>
      </ClientOnly>
      <template #right>
        <UColorModeButton/>
        <LangSwitcher/>
      </template>
    </UFooter>
  </div>
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
