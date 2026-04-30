<template>
  <div class="bg-white rounded-xl border border-[#e8dfcf] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div class="p-5">
      <div class="flex items-start gap-4">
        <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-[#d03d3d] shadow-md flex-shrink-0">
          <img :src="friend.avatar" :alt="friend.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-bold text-lg text-[#2c2420] truncate">{{ friend.name }}</h3>
            <span class="text-xs text-gray-400 font-medium">{{ friend.province }}</span>
          </div>
          <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ friend.bio }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="interest in friend.interests.slice(0, 3)"
              :key="interest"
              class="px-2.5 py-1 bg-[#f5f0e8] text-[#8b2b2b] text-xs rounded-full"
            >
              {{ interest }}
            </span>
          </div>
          <div class="flex items-center gap-4 text-xs text-gray-400">
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-file-text" class="w-3.5 h-3.5" />
              {{ friend.postsCount }} 帖子
            </span>
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-users" class="w-3.5 h-3.5" />
              {{ friend.friendsCount }} 好友
            </span>
          </div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-100">
        <slot name="actions">
          <button
            class="w-full py-2.5 bg-[#8b2b2b] text-white rounded-lg hover:bg-[#6b2020] transition-colors font-medium text-sm"
            @click="$emit('add', friend)"
          >
            添加好友
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/server/data/friends'

defineProps<{
  friend: User
}>()

defineEmits<{
  add: [friend: User]
}>()
</script>