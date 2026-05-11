<script setup lang="ts">
import type { components } from '~/types'

const localePath = useLocalePath()
const { t } = useI18n({
  useScope: 'local'
})

const props = defineProps<components['schemas']['PostSlugInfo']>()
</script>

<i18n>
cn:
</i18n>

<template>
  <NuxtLink
    :to="localePath(`/forum/${props.id}`)"
    class="block bg-white rounded-sm border border-[#EAE3D9] hover:border-[#C9A063]/30 hover:shadow-[0_15px_45px_rgba(201,160,99,0.08)] transition-all duration-500 relative overflow-hidden group hover:-translate-y-1.5"
  >
    <div
      v-if="props.isAi"
      class="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-[#8B2B2B] to-[#C9A063]"
    />
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-3.png')] opacity-[0.1] pointer-events-none mix-blend-multiply" />
    <div class="p-8 md:p-10 relative z-10">
      <div class="flex items-center justify-between mb-6 pb-5 border-b border-[#F5F1EA]">
        <div class="flex items-center gap-4">
          <template v-if="props.isAi">
            <div class="w-12 h-12 flex items-center justify-center border-2 border-[#8B2B2B] text-[#8B2B2B] relative rotate-[-5deg] scale-95 opacity-90 shadow-[inset_0_0_8px_rgba(139,43,43,0.1)]">
              <span class="font-serif text-lg font-bold leading-none writing-vertical-rl tracking-tight">太虚<br>书童</span>
              <div class="absolute -right-1.5 -bottom-1.5 bg-[#8B2B2B] text-white rounded-full w-5 h-5 flex items-center justify-center scale-90">
                <UIcon
                  name="i-lucide-badge-check"
                  class="w-3.5 h-3.5"
                />
              </div>
            </div>
            <div>
              <span class="text-sm font-bold text-[#8B2B2B] tracking-[0.2em] flex items-center gap-1.5">
                太虚书童
              </span>
              <span class="text-xs text-[#999999] tracking-wider">
                {{ props.createdTime }} · 凝练自典籍
              </span>
            </div>
          </template>
          <template v-else>
            <NuxtImg
              src="/user.png"
              alt="书"
              class="w-12 h-12 rounded-full object-cover border-2 border-[#EAE3D9] p-0.5"
            />
            <div>
              <span class="text-sm font-bold text-[#8B2B2B] tracking-[0.2em] flex items-center gap-1.5">
                {{ props.author?.userName }}
              </span>
              <span class="text-xs text-[#999999] tracking-wider">
                {{ props.createdTime }} · 游观心得
              </span>
            </div>
          </template>
        </div>

        <span
          class="text-xs border px-3 py-1.5 tracking-[0.15em] font-light rounded-sm"
          :class="props.isAi ? 'border-[#8B2B2B]/20 text-[#8B2B2B] bg-[#8B2B2B]/5' : 'border-[#EAE3D9] text-[#555555] bg-[#FAFAFA]'"
        >
          # {{ props.tag }}
        </span>
      </div>

      <h3 class="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-5 group-hover:text-[#8B2B2B] transition-colors tracking-wide leading-snug">
        {{ props.title }}
      </h3>
      <p class="text-[#555555] text-base leading-[2.2] text-justify tracking-wide mb-8 line-clamp-3 font-light">
        {{ props.excerpt }}
      </p>

      <div class="flex items-center gap-8 text-[#888888] text-sm pt-5 border-t border-[#F5F1EA]">
        <span class="flex items-center gap-2 hover:text-[#8B2B2B] transition-colors"><UIcon
          name="i-lucide-thumbs-up"
          class="w-4 h-4"
        /> {{ props.stats?.likes }}</span>
        <span class="flex items-center gap-2 hover:text-[#8B2B2B] transition-colors"><UIcon
          name="i-lucide-message-square"
          class="w-4 h-4"
        /> {{ props.stats?.commentsCount }}</span>
        <span class="flex items-center gap-2">
          <UIcon
            name="i-lucide-eye"
            class="w-4 h-4"
          />
          {{ props.stats?.views }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
