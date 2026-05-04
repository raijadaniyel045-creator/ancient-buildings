<template>
  <div class="bg-white rounded-xl border border-[#e8dfcf] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
    <div class="p-5">
      <div class="flex items-start gap-4 mb-4">
        <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d03d3d] flex-shrink-0">
          <img :src="post.userAvatar" :alt="post.userName" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-[#2c2420]">{{ post.userName }}</h4>
            <span v-if="post.buildingName" class="text-xs text-[#8b2b2b] bg-[#f5f0e8] px-2 py-0.5 rounded">
              {{ post.buildingName }}
            </span>
          </div>
          <p class="text-xs text-gray-400 mt-0.5">{{ post.createdAt }}</p>
        </div>
      </div>
      
      <p class="text-gray-700 leading-relaxed mb-4">{{ post.content }}</p>
      
      <div v-if="post.image" class="mb-4 rounded-lg overflow-hidden">
        <img :src="post.image" class="w-full h-48 object-cover" />
      </div>
      
      <div class="flex items-center gap-6 pt-4 border-t border-gray-100">
        <button
          class="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
          @click="$emit('like', post)"
        >
          <UIcon
            name="i-lucide-heart"
            class="w-5 h-5"
            :class="{ 'text-red-500 fill-red-500': post.liked }"
          />
          <span class="text-sm">{{ post.likes }}</span>
        </button>
        <button
          class="flex items-center gap-2 text-gray-500 hover:text-[#8b2b2b] transition-colors"
          @click="$emit('comment', post)"
        >
          <UIcon name="i-lucide-message-circle" class="w-5 h-5" />
          <span class="text-sm">{{ post.comments }}</span>
        </button>
        <button class="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
          <UIcon name="i-lucide-share-2" class="w-5 h-5" />
          <span class="text-sm">分享</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/server/data/friends'

defineProps<{
  post: Post
}>()

defineEmits<{
  like: [post: Post]
  comment: [post: Post]
}>()
</script>