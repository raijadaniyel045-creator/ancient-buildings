<script setup lang="ts">
import type { components } from '~/types'

const localePath = useLocalePath()
const { t } = useI18n({
  useScope: 'local'
})

const props = defineProps<components['schemas']['HotPostSlug'] & { index: number }>()
</script>

<i18n>
cn:
</i18n>

<template>
  <NuxtLink
    :to="localePath(`/forum/${props.postId}`)"
    class="flex gap-4 group items-center pb-5 border-b border-[#F5F1EA] last:border-0 last:pb-0"
  >
    <div
      class="shrink-0 w-10 h-10 flex items-center justify-center font-mono text-2xl font-bold rounded-sm relative transition-colors duration-300"
      :class="{
        'bg-[#8B2B2B] text-white shadow-md': index === 0, // 排名1：故宫红印章
        'bg-[#C9A063] text-white': index === 1, // 排名2：古铜金印章
        'bg-[#1A1A1A] text-white': index === 2, // 排名3：深墨黑印章
        'bg-[#F5F5F7] text-[#AAAAAA]': index > 2 // 其他：浅灰
      }"
    >
      <span class="relative z-10">{{ index + 1 }}</span>
      <UIcon
        v-if="index < 3"
        name="i-lucide-shapes"
        class="absolute inset-0 w-full h-full text-white/10 p-1"
      />
    </div>

    <div class="flex-1 flex flex-col">
      <h5 class="text-base font-bold text-[#333333] group-hover:text-[#8B2B2B] transition-colors leading-relaxed line-clamp-2 tracking-wide">
        <span
          v-if="props.isAi"
          class="inline-block text-[10px] text-[#8B2B2B] border border-[#8B2B2B]/30 px-1 py-0.5 rounded-sm mr-1.5 align-middle tracking-widest scale-90"
        >太虚</span>
        {{ props.title }}
      </h5>
      <span class="text-xs text-[#AAAAAA] tracking-widest mt-2 flex items-center gap-1.5">
        <UIcon
          name="i-lucide-trending-up"
          class="w-3.5 h-3.5 text-[#C9A063]"
        /> 营造热度 {{ props.heatScore }}
      </span>
    </div>
  </NuxtLink>
</template>
