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
      <UColorModeButton />
      <template
        v-if="!store.isLoggedIn"
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
        <ClientOnly>
          <UDropdownMenu :items="menuItems">
            <UUser
              :name="store.publicInfo?.userName"
              :description="store.publicInfo?.profile"
              :avatar="{
                src: '/user.png',
                loading: 'lazy',
                icon: 'i-lucide-image'
              }"
            />
          </UDropdownMenu>
        </ClientOnly>
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
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import AppLogo from '~/components/AppLogo.vue'

const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const store = useAccountStore()
await store.tryRestoreSession()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('home'), to: localePath('/') },
  { label: t('buildings'), to: localePath('/buildings') },
  { label: t('friends'), to: localePath('/friends'), children: [
    { label: t('friends.search'), to: localePath('/friends/search') }
  ] },
  { label: t('forum'), to: localePath('/forum') },
  { label: t('dashboard'), to: localePath('/dashboard') },
  { label: t('ai'), to: localePath('/ai-tutor') }
])

const menuItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Something'
    }
  ], [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: () => {
        store.logout()
        useRouter().push('/')
      }
    }
  ]
])
</script>
