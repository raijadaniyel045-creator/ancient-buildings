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
      <template #right>
        <UColorModeButton />
        <ULocaleSelect
          :model-value="locale"
          :locales="Object.values(locales)"
          @update:model-value="setLocale($event)"
        />
      </template>
    </UFooter>
  </div>
</template>

<script lang="ts" setup>
const { t, locale, locales, setLocale } = useI18n()
</script>
