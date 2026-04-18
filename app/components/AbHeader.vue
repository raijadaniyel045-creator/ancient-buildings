<template>
  <UHeader :to="localePath('/')">
    <template #title>
      <AppLogo />
    </template>
    <ClientOnly>
      <UNavigationMenu
        :items="items"
        content-orientation="vertical"
      />
    </ClientOnly>
    <template #body>
      <UNavigationMenu
        :items="items"
        content-orientation="vertical"
        orientation="vertical"
      />
      <USeparator class="my-6" />
      <ULocaleSelect
        :model-value="locale"
        :locales="Object.values(locales)"
        @update:model-value="setLocale($event)"
      />
    </template>
    <template #right>
      <UButton
        :to="localePath('/auth/login')"
        color="neutral"
        variant="subtle"
        class="flex items-center gap-1.5"
      >
        <UIcon
          name="i-lucide-user"
          class="w-4.5 h-4.5"
        />
        <span>{{ t('login.register') }}</span>
      </UButton>
      <UColorModeButton />
      <ULocaleSelect
        :model-value="locale"
        :locales="Object.values(locales)"
        @update:model-value="setLocale($event)"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import AppLogo from '~/components/AppLogo.vue'

const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('buildings'), to: localePath('/buildings') },
  { label: t('friends'), children: [
    { label: t('friends.mine'), to: localePath('/friends/mine') },
    { label: t('friends.add'), to: localePath('/friends/add') }
  ] },
  { label: t('forum'), to: localePath('/forum') },
  { label: t('dashboard'), to: localePath('/dashboard') },
  { label: t('search'), to: localePath('/search') },
  { label: t('ai'), to: localePath('/ai') }
])
</script>
