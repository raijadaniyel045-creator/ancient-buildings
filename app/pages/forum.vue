<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#fdfaf5]">
    <div class="w-full bg-[#8b2b2b] text-white py-12 px-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold font-serif tracking-widest mb-3">古建论坛</h1>
        <p class="text-white/80 font-light tracking-wide">与志同道合的爱好者分享你的古建筑探索之旅</p>
      </div>
    </div>
    
    <div class="max-w-4xl mx-auto px-6 py-10">
      <div class="bg-white rounded-xl shadow-sm border border-[#e8dfcf] p-6 mb-8">
        <div class="flex gap-4">
          <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20chinese%20person%20portrait%20avatar&image_size=square" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              placeholder="分享你对古建筑的见解、探访经历或精美照片..."
              rows="3"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#8b2b2b] resize-none"
            />
            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center gap-2">
                <button class="p-2 text-gray-400 hover:text-[#8b2b2b] transition-colors">
                  <UIcon name="i-lucide-image" class="w-5 h-5" />
                </button>
                <button class="p-2 text-gray-400 hover:text-[#8b2b2b] transition-colors">
                  <UIcon name="i-lucide-link" class="w-5 h-5" />
                </button>
                <button class="p-2 text-gray-400 hover:text-[#8b2b2b] transition-colors">
                  <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
                </button>
              </div>
              <button
                class="px-6 py-2.5 bg-[#8b2b2b] text-white rounded-lg hover:bg-[#6b2020] transition-colors font-medium text-sm"
                :disabled="!newPostContent.trim()"
                :class="{ 'opacity-50 cursor-not-allowed': !newPostContent.trim() }"
                @click="submitPost"
              >
                发布帖子
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex items-center justify-between mb-6">
        <div class="flex gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            :class="activeTab === tab.id ? 'bg-[#8b2b2b] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="flex items-center gap-2">
          <select
            v-model="sortBy"
            class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#8b2b2b]"
          >
            <option value="latest">最新发布</option>
            <option value="hot">最热讨论</option>
          </select>
        </div>
      </div>
      
      <div class="space-y-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-xl border border-[#e8dfcf] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
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
              <img :src="post.image" class="w-full h-64 object-cover" />
            </div>
            
            <div class="flex items-center gap-6 pt-4 border-t border-gray-100">
              <button
                class="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
                @click="toggleLike(post)"
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
                @click="toggleComments(post.id)"
              >
                <UIcon name="i-lucide-message-circle" class="w-5 h-5" />
                <span class="text-sm">{{ post.comments }}</span>
              </button>
              <button class="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <UIcon name="i-lucide-share-2" class="w-5 h-5" />
                <span class="text-sm">分享</span>
              </button>
            </div>
            
            <div v-if="expandedComments === post.id" class="mt-6 pt-4 border-t border-gray-100">
              <div v-if="getPostComments(post.id).length > 0" class="space-y-4 mb-4">
                <div
                  v-for="comment in getPostComments(post.id)"
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
              
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20chinese%20person%20portrait%20avatar&image_size=square" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 flex gap-2">
                  <input
                    v-model="newCommentContent[post.id]"
                    type="text"
                    placeholder="写下你的评论..."
                    class="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#8b2b2b] text-sm"
                    @keyup.enter="submitComment(post.id)"
                  />
                  <button
                    class="px-5 py-2 bg-[#8b2b2b] text-white rounded-full hover:bg-[#6b2020] transition-colors text-sm font-medium"
                    @click="submitComment(post.id)"
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="totalPages > 1" class="flex justify-center mt-10">
        <UPagination
          v-model:page="page"
          :items-per-page="pageSize"
          :total="totalPages"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const page = ref(1)
const pageSize = ref(10)
const activeTab = ref('all')
const sortBy = ref('latest')
const newPostContent = ref('')
const expandedComments = ref<string | null>(null)
const newCommentContent = reactive<Record<string, string>>({})

const tabs = [
  { id: 'all', name: '全部' },
  { id: 'discussion', name: '讨论' },
  { id: 'photos', name: '图片' },
  { id: 'question', name: '问答' }
]

const { data: postsData, refresh } = await useAsyncData('forum-posts', () => {
  return $fetch('/api/forum/posts', {
    query: {
      page: page.value,
      pageSize: page.value
    }
  })
})

const posts = ref<any[]>([])
const comments = ref<any[]>([])

postsData.value?.posts && (posts.value = postsData.value.posts)

const totalPages = computed(() => postsData.value?.totalPages || 0)

function toggleLike(post: any) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

function toggleComments(postId: string) {
  if (expandedComments.value === postId) {
    expandedComments.value = null
  } else {
    expandedComments.value = postId
    loadComments(postId)
  }
}

async function loadComments(postId: string) {
  const response = await $fetch(`/api/forum/posts/${postId}`)
  if (response.success) {
    comments.value = response.comments
  }
}

function getPostComments(postId: string) {
  return comments.value.filter(c => c.postId === postId)
}

async function submitPost() {
  if (!newPostContent.value.trim()) return
  
  const response = await $fetch('/api/forum/posts', {
    method: 'POST',
    body: { content: newPostContent.value }
  })
  
  if (response.success) {
    posts.value.unshift(response.post)
    newPostContent.value = ''
  }
}

async function submitComment(postId: string) {
  const content = newCommentContent[postId]
  if (!content || !content.trim()) return
  
  const response = await $fetch('/api/forum/comments', {
    method: 'POST',
    body: { postId, content }
  })
  
  if (response.success) {
    comments.value.push(response.comment)
    const post = posts.value.find(p => p.id === postId)
    if (post) post.comments += 1
    newCommentContent[postId] = ''
  }
}

watch(page, () => {
  refresh()
})
</script>