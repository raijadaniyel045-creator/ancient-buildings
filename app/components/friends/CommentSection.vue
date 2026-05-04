<template>
  <div>
    <div v-if="comments.length > 0" class="space-y-4 mb-6">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="flex gap-3 p-3 bg-[#faf7f2] rounded-lg"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img :src="comment.userAvatar" :alt="comment.userName" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-medium text-sm text-[#2c2420]">{{ comment.userName }}</span>
            <span class="text-xs text-gray-400">{{ comment.createdAt }}</span>
          </div>
          <p class="text-sm text-gray-600">{{ comment.content }}</p>
        </div>
      </div>
    </div>
    
    <div v-if="showInput" class="pt-4 border-t border-gray-100">
      <div class="flex gap-3">
        <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20chinese%20person%20portrait%20avatar&image_size=square" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 flex gap-2">
          <input
            v-model="newComment"
            type="text"
            placeholder="写下你的评论..."
            class="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#8b2b2b] text-sm"
            @keyup.enter="submitComment"
          />
          <button
            class="px-5 py-2 bg-[#8b2b2b] text-white rounded-full hover:bg-[#6b2020] transition-colors text-sm font-medium"
            @click="submitComment"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '~/server/data/friends'

defineProps<{
  comments: Comment[]
  showInput?: boolean
  postId?: string
}>()

const emit = defineEmits<{
  submit: [content: string, postId: string]
}>()

const newComment = ref('')

function submitComment() {
  if (!newComment.value.trim()) return
  emit('submit', newComment.value.trim(), '')
  newComment.value = ''
}
</script>