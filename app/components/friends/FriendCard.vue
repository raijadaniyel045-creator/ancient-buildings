<template>
  <div
    class="group bg-white rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm hover:shadow-md hover:border-[#D4AF37]/40 transition-all duration-300 animate-fade-in-up"
    :style="{ animationDelay: `0.08s` }"
  >
    <div class="flex items-center gap-5">
      <!-- 头像 -->
      <div class="relative shrink-0">
        <div class="w-16 h-16 rounded-full p-0.5 bg-linear-to-br from-[#E8DFCE] to-transparent group-hover:from-[#D4AF37] transition-colors duration-500">
          <img
            src="/user.png"
            :alt="props.userName"
            class="w-full h-full rounded-full object-cover border-2 border-white"
          >
        </div>
      </div>

      <!-- 核心信息 -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-1.5">
          <h3 class="text-lg font-serif font-medium text-[#2C363F] truncate">
            {{ props.userName }}
          </h3>
        </div>
        <p class="text-sm text-[#8B7355] mb-3 truncate font-light">
          {{ props.profile }}
        </p>
        <div class="flex items-center gap-4">
          <span class="text-xs text-[#A69B8D] flex items-center gap-1.5">
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {{ props.location }}
          </span>
          <div class="w-1 h-1 rounded-full bg-[#E8DFCE]" />
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag) in props.interest?.slice(0, 3)||[]"
              :key="tag"
              class="text-xs text-[#D4AF37] bg-[#D4AF37]/5 px-2 py-1 rounded-md border border-[#D4AF37]/10"
            >
              {{ t(tag) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 操作按钮区 -->
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="p-2.5 text-[#8B7355] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-xl transition-all">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        <button class="p-2.5 text-[#8B7355] hover:text-[#2C363F] hover:bg-[#E8DFCE]/40 rounded-xl transition-all">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { components } from '~/types'

const props = defineProps<components['schemas']['FriendInfo']>()
</script>
