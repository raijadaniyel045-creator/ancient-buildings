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
        :locales="locales as any"
        @update:model-value="setLocale($event as any)"
      />
    </template>
    <template #right>
      <template
        v-if="!isLogin"
      >
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
      </template>
      <template v-else>
        <UPopover>
          <UUser :name="userName" />
          <template #content>
            <div class="size-48 m-4 inline-flex" />
          </template>
        </UPopover>
      </template>
      <ULocaleSelect
        :model-value="locale"
        :locales="locales as any"
        @update:model-value="setLocale($event as any)"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import AppLogo from '~/components/AppLogo.vue'

const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const store = useAccountStore()

const isLogin = computed(() => store.isLoggedIn)
const userName = computed(() => store.publicInfo?.userName)

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('buildings'), to: localePath('/buildings') },
  { label: t('friends'), to: localePath('/friends'), children: [
    { label: t('friends.search'), to: localePath('/friends/search') }
  ] },
  { label: t('forum'), to: localePath('/forum') },
  { label: t('dashboard'), to: localePath('/dashboard') },
  { label: t('ai'), to: localePath('/ai') }
])
</script>
