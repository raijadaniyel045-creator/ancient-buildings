<template>
  <div class="relative flex flex-col h-[calc(100vh-64px)] bg-[#FBF8F1] dark:bg-[#0F0C0B] overflow-hidden">

    <div class="absolute inset-0 z-0 opacity-[0.15] pointer-events-none grayscale mix-blend-multiply dark:mix-blend-lighten">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]" />
      <div class="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
    </div>

    <svg style="display: none;">
      <filter id="ink-bleed">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
        <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7" />
      </filter>
    </svg>

    <div class="relative z-20 pt-8 pb-4 flex justify-center w-full">
      <div class="flex items-center gap-8 sm:gap-16 border-b border-[#D4AF37]/20 pb-4 px-8 relative">

        <button
          @click="activeMode = 'chat'"
          class="relative px-2 py-1 font-serif text-xl sm:text-2xl tracking-[0.2em] transition-all duration-500 ease-out group flex flex-col items-center outline-none"
          :class="activeMode === 'chat' ? 'text-[#8B2B2B] font-bold scale-105' : 'text-[#5C4033]/50 dark:text-[#D4AF37]/40 hover:text-[#5C4033] dark:hover:text-[#D4AF37]/80'"
        >
          <span class="ink-bleed-effect">寻师 · 解惑</span>
          <span
            class="absolute -bottom-[18px] left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#8B2B2B] to-transparent transition-all duration-500 ease-in-out"
            :class="activeMode === 'chat' ? 'w-[120%] opacity-100' : 'w-0 opacity-0 group-hover:w-[60%] group-hover:opacity-40'"
          ></span>
        </button>

        <div class="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/40"></div>

        <button
          @click="activeMode = 'quiz'"
          class="relative px-2 py-1 font-serif text-xl sm:text-2xl tracking-[0.2em] transition-all duration-500 ease-out group flex flex-col items-center outline-none"
          :class="activeMode === 'quiz' ? 'text-[#8B2B2B] font-bold scale-105' : 'text-[#5C4033]/50 dark:text-[#D4AF37]/40 hover:text-[#5C4033] dark:hover:text-[#D4AF37]/80'"
        >
          <span class="ink-bleed-effect">试炼 · 营造</span>
          <span
            class="absolute -bottom-[18px] left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#8B2B2B] to-transparent transition-all duration-500 ease-in-out"
            :class="activeMode === 'quiz' ? 'w-[120%] opacity-100' : 'w-0 opacity-0 group-hover:w-[60%] group-hover:opacity-40'"
          ></span>
        </button>

        <div class="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]/40"></div>

        <button
          @click="activeMode = 'route'"
          class="relative px-2 py-1 font-serif text-xl sm:text-2xl tracking-[0.2em] transition-all duration-500 ease-out group flex flex-col items-center outline-none"
          :class="activeMode === 'route' ? 'text-[#8B2B2B] font-bold scale-105' : 'text-[#5C4033]/50 dark:text-[#D4AF37]/40 hover:text-[#5C4033] dark:hover:text-[#D4AF37]/80'"
        >
          <span class="ink-bleed-effect">寻迹 · 漫游</span>
          <span
            class="absolute -bottom-[18px] left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#8B2B2B] to-transparent transition-all duration-500 ease-in-out"
            :class="activeMode === 'route' ? 'w-[120%] opacity-100' : 'w-0 opacity-0 group-hover:w-[60%] group-hover:opacity-40'"
          ></span>
        </button>

      </div>
    </div>

    <div class="flex-1 relative z-10 overflow-hidden">
      <Transition name="fade-mode" mode="out-in">
        <AiChat v-if="activeMode === 'chat'" />
        <AiQuiz v-else-if="activeMode === 'quiz'" />
        <AiRoute v-else-if="activeMode === 'route'" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeMode = ref<'chat' | 'quiz' | 'route'>('route') // 默认先设为 route 方便我们开发调试
</script>

<style scoped>
.fade-mode-enter-active, .fade-mode-leave-active { transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-mode-enter-from { opacity: 0; transform: translateY(15px); }
.fade-mode-leave-to { opacity: 0; transform: translateY(-15px); }
.ink-bleed-effect { filter: url(#ink-bleed); }
</style>
