<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100 hover:shadow-xl transition-all duration-300">
    <!-- 标题栏 -->
    <div class="bg-gradient-to-r from-amber-700 via-orange-600 to-amber-600 px-6 py-5 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJWMGgydjM0em0wLTJWMGgydjMyaC0yek0zNiAzNHYySDM0di0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      <div class="relative z-10">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span class="text-2xl">🤝</span>
              <span>同好推荐</span>
            </h3>
            <p class="text-amber-100 text-sm mt-1">发现与你兴趣相投的古建爱好者</p>
          </div>
          <button class="text-amber-100 hover:text-white text-sm font-medium transition-colors">
            换一批
          </button>
        </div>
      </div>
    </div>

    <!-- 推荐列表 -->
    <div class="p-4 space-y-4">
      <div
        v-for="(user, index) in recommendedUsers"
        :key="user.userId"
        class="group flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 border border-amber-200/50 hover:border-amber-300"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <!-- 头像 -->
        <div class="relative">
          <div class="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <img
            :src="user.avatar || 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20person%20portrait%20avatar&image_size=square'"
            :alt="user.nickname"
            class="relative w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          <!-- 匹配度徽章 -->
          <div class="absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
            {{ user.matchScore }}%
          </div>
        </div>

        <!-- 用户信息 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h4 class="font-semibold text-gray-800 text-lg truncate">{{ user.nickname }}</h4>
            <span class="flex-shrink-0 text-xs text-gray-400">{{ user.username }}</span>
          </div>
          <p class="text-sm text-amber-700 mt-1 flex items-center gap-1">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>你们共同拥有 <span class="font-bold">{{ user.matchScore }}</span> 个古建兴趣标签</span>
          </p>
          <!-- 共同兴趣标签 -->
          <div class="flex flex-wrap gap-1.5 mt-2">
            <span
              v-for="tag in getCommonTags(user.matchScore)"
              :key="tag"
              class="px-2 py-0.5 bg-white text-amber-700 text-xs rounded-full border border-amber-200"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- 添加好友按钮 -->
        <div class="flex-shrink-0">
          <button
            @click="handleAddFriend(user)"
            class="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-xl font-medium hover:from-amber-700 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group/btn"
          >
            <svg v-if="!user.requestSent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ user.requestSent ? '已发送' : '加好友' }}</span>
          </button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-12">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-600"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-2xl">🔍</span>
          </div>
        </div>
        <p class="text-amber-700 mt-4 font-medium">正在寻找同好...</p>
        <p class="text-gray-400 text-sm mt-1">根据您的兴趣标签智能匹配中</p>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && recommendedUsers.length === 0" class="text-center py-12">
        <div class="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
          <span class="text-4xl">🔍</span>
        </div>
        <h4 class="text-gray-700 font-medium mb-2">暂无推荐好友</h4>
        <p class="text-gray-400 text-sm">尝试添加更多兴趣标签以获得更好的推荐</p>
        <button class="mt-4 px-6 py-2 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors font-medium">
          去添加标签
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface RecommendUser {
  userId: number
  username: string
  nickname: string
  avatar?: string
  matchScore: number
  requestSent?: boolean
}

const recommendedUsers = ref<RecommendUser[]>([])
const loading = ref(true)

const getCommonTags = (score: number) => {
  const tags = ['明清建筑', '园林艺术', '榫卯结构', '长城', '故宫', '古塔']
  return tags.slice(0, Math.min(score, 3))
}

const handleAddFriend = (user: RecommendUser) => {
  user.requestSent = true
}

const fetchRecommendations = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/user/recommend?userId=1')
    const data = await response.json()
    if (data.success) {
      recommendedUsers.value = data.data.map((user: RecommendUser) => ({
        ...user,
        requestSent: false
      }))
    }
  } catch (error) {
    console.error('Failed to fetch recommendations:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRecommendations()
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div[style*="animationDelay"] {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}
</style>