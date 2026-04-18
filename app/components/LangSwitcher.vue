<template>
  <UDropdownMenu
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8
    }"
    :items="items"
    :modal="true"
    :ui="{
      content: 'w-48'
    }"
  >
    <UButton :label="currentLocaleName" color="neutral" icon="i-lucide-menu" variant="outline"/>
  </UDropdownMenu>
</template>

<script lang="ts" setup>
const {locale, locales} = useI18n()
const switchLocalePath = useSwitchLocalePath()

const items = computed(() => locales.value.map(i => ({
  label: i.name,
  to: switchLocalePath(i.code)
})))

const currentLocaleName = computed(() => {
  const current = locales.value.find(l => l.code === locale.value)
  return current ? current.name : ''
})
</script>
