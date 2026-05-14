<script setup lang="ts">
import type { components } from '~/types'

const localePath = useLocalePath()

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const props = defineProps<components['schemas']['BuildingSlug']>()
</script>

<template>
  <NuxtLink
    class="bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
    :to="localePath(`/buildings/${props.hash}`)"
  >
    <div class="h-56 overflow-hidden relative border-b border-[#e8dfcf]">
      <NuxtImg
        :src="props.img"
        fit="cover"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        placeholder
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
      <!-- Badges atop image -->
      <div class="absolute top-3 right-3 flex flex-wrap gap-2 pl-4">
        <span
          v-for="(c, ci) in props.categories"
          :key="c+ci"
          class="bg-black/60 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-white/20"
        >
          {{ t(c) }}
        </span>
        <span
          v-for="(d, di) in props.dynasties"
          :key="d+di"
          class="bg-amber-600/80 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-amber-400/20"
        >
          {{ t(d) }}
        </span>
      </div>
      <div class="absolute bottom-3 left-3 flex items-center text-white/90 text-sm font-light z-10 transition-transform group-hover:-translate-y-1">
        <UIcon
          name="i-lucide-map-pin"
          class="w-4 h-4 mr-1 text-red-500"
        />
        <span
          v-for="(p, pi) in props.provinces"
          :key="p+pi"
          class="mx-0.5"
        >
          {{ t(p) }}
        </span>
      </div>
    </div>
    <div class="p-5 flex-1 flex flex-col relative bg-[#fcfcfa]">
      <h3 class="text-2xl font-bold font-serif text-[#8b2b2b] mb-2 group-hover:text-amber-700 transition-colors">
        {{ props.name }}
      </h3>
      <p class="text-sm text-gray-600 leading-relaxed font-light mb-4 flex-1 line-clamp-3">
        {{ props.desc }}
      </p>

      <div class="pt-4 border-t border-gray-100 flex justify-between items-center group-hover:border-amber-100 transition-colors">
        <span class="text-[10px] text-gray-400 font-mono">ID: {{ (props.hash as string).substring(0, 6) }}</span>
        <span class="text-sm text-[#8b2b2b] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          查看详情 <UIcon
            name="i-lucide-arrow-right"
            class="w-3.5 h-3.5"
          />
        </span>
      </div>
    </div>
    <div
      v-if="props.isRed"
      class="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-[#8B2B2B] to-[#C9A063]"
    />
  </NuxtLink>
</template>

<style scoped>

</style>
