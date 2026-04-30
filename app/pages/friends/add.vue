<template>
  <div class="min-h-screen bg-paper">
    <!-- 页面标题 -->
    <div class="max-w-6xl mx-auto px-4 pt-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-gold-600 to-gold-800 rounded-xl flex items-center justify-center">
          <span class="text-white text-xl">🔍</span>
        </div>
        <div>
          <h1 class="text-xl font-bold text-ink-black">发现同好</h1>
          <p class="text-xs text-ink-light">根据兴趣匹配志同道合的朋友</p>
        </div>
      </div>
    </div>

    <!-- 页面主体 -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- 筛选区域 -->
      <div class="bg-white rounded-2xl shadow-ancient p-6 border border-gold-100 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-ink-black flex items-center gap-2">
            <span>🏷️</span>
            <span>选择兴趣标签</span>
          </h3>
          <span class="text-sm text-ink-light">{{ selectedTags.length }} 个标签已选</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="tag in allTags"
            :key="tag.id"
            @click="toggleTag(tag.id)"
            :class="[
              'px-4 py-2 rounded-xl font-medium transition-all duration-300 tag-hover',
              selectedTags.includes(tag.id)
                ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md'
                : 'bg-gold-50 text-gold-700 hover:bg-gold-100 border border-gold-200'
            ]"
          >
            {{ tag.name }}
          </button>
        </div>
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gold-100">
          <button @click="clearTags" class="text-gold-700 hover:text-gold-800 text-sm font-medium transition-colors flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>清除筛选</span>
          </button>
          <button class="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-xl font-medium hover:from-gold-700 hover:to-gold-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 btn-ancient">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>开始匹配</span>
          </button>
        </div>
      </div>

      <!-- 匹配统计 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-gradient-to-br from-gold-50 to-amber-50 rounded-xl p-4 border border-gold-200">
          <div class="text-2xl font-bold text-gold-700">{{ recommendedUsers.length }}</div>
          <div class="text-xs text-ink-light mt-1">推荐用户</div>
        </div>
        <div class="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-200">
          <div class="text-2xl font-bold text-cyan-700">{{ avgMatchScore }}%</div>
          <div class="text-xs text-ink-light mt-1">平均匹配度</div>
        </div>
        <div class="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
          <div class="text-2xl font-bold text-emerald-700">{{ onlineCount }}</div>
          <div class="text-xs text-ink-light mt-1">在线用户</div>
        </div>
        <div class="bg-gradient-to-br from-vermilion-50 to-red-50 rounded-xl p-4 border border-vermilion-200">
          <div class="text-2xl font-bold text-vermilion-600">{{ requestCount }}</div>
          <div class="text-xs text-ink-light mt-1">待处理请求</div>
        </div>
      </div>

      <!-- 推荐用户列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(user, index) in recommendedUsers"
          :key="user.id"
          class="bg-white rounded-2xl shadow-ancient overflow-hidden border border-gold-100 hover:shadow-xl transition-all duration-300 group animate-slide-in"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- 用户卡片头部 -->
          <div class="relative h-36 bg-gradient-to-br from-gold-400 via-amber-400 to-gold-500">
            <div class="absolute inset-0 bg-black/5"></div>
            <!-- 古风装饰 -->
            <div class="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-white/20"></div>
            <div class="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-white/20"></div>
            <div class="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-white/20"></div>
            <div class="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-white/20"></div>
            
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 bg-white/90 backdrop-blur text-gold-700 text-sm font-bold rounded-full shadow-sm">
                {{ user.matchScore }}% 匹配
              </span>
            </div>
          </div>

          <!-- 用户信息 -->
          <div class="relative px-6 pb-6 -mt-16">
            <!-- 头像 -->
            <div class="relative w-24 h-24 mx-auto mb-4">
              <div class="absolute -inset-2 bg-gradient-to-r from-gold-400 to-amber-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div class="relative w-full h-full rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                {{ user.name.charAt(0) }}
              </div>
              <span :class="['absolute bottom-1 right-1 w-5 h-5 rounded-full border-3 border-white', user.online ? 'bg-emerald-500' : 'bg-gray-300']"></span>
            </div>

            <!-- 基本信息 -->
            <div class="text-center mb-4">
              <h3 class="text-lg font-bold text-ink-black mb-1">{{ user.name }}</h3>
              <p class="text-sm text-ink-light">{{ user.bio }}</p>
            </div>

            <!-- 兴趣标签 -->
            <div class="flex flex-wrap justify-center gap-2 mb-4">
              <span
                v-for="interest in user.interests.slice(0, 4)"
                :key="interest"
                class="px-2.5 py-1 bg-gold-50 text-gold-700 text-xs rounded-full border border-gold-200"
              >
                {{ interest }}
              </span>
            </div>

            <!-- 匹配理由 -->
            <div class="bg-gradient-to-r from-gold-50 to-amber-50 rounded-xl p-3 mb-4">
              <p class="text-sm text-gold-700 flex items-center justify-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span>你们有 <strong>{{ user.matchScore }}</strong> 个共同兴趣</span>
              </p>
            </div>

            <!-- 操作按钮 -->
            <div class="flex gap-3">
              <button 
                @click="sendRequest(user.id)"
                :class="[
                  'flex-1 py-2.5 rounded-xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2',
                  user.requestSent
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-gold-600 to-gold-700 text-white hover:from-gold-700 hover:to-gold-800 btn-ancient'
                ]"
              >
                <svg v-if="!user.requestSent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ user.requestSent ? '已发送' : '加好友' }}</span>
              </button>
              <button class="w-12 h-12 bg-gold-50 text-gold-700 rounded-xl hover:bg-gold-100 transition-colors flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="recommendedUsers.length === 0 && !loading" class="text-center py-16">
        <div class="w-24 h-24 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-6">
          <span class="text-5xl">🔍</span>
        </div>
        <h3 class="text-xl font-bold text-ink-black mb-2">还没有推荐用户</h3>
        <p class="text-ink-light mb-6">选择一些兴趣标签开始发现同好</p>
        <button class="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-xl font-medium hover:from-gold-700 hover:to-gold-800 transition-all shadow-md hover:shadow-lg">
          去选择标签
        </button>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-16">
        <div class="relative inline-block">
          <div class="w-16 h-16 border-4 border-gold-200 rounded-full animate-spin border-t-gold-600"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-2xl">🔄</span>
          </div>
        </div>
        <p class="text-gold-700 mt-4 font-medium">正在为您匹配同好...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Tag {
  id: string
  name: string
}

interface RecommendUser {
  id: string
  name: string
  avatar: string
  bio: string
  interests: string[]
  matchScore: number
  online: boolean
  requestSent?: boolean
}

const loading = ref(true)
const selectedTags = ref<string[]>([])
const recommendedUsers = ref<RecommendUser[]>([])
const requestCount = ref(2)

const allTags = ref<Tag[]>([
  { id: 'mingqing', name: '明清建筑' },
  { id: 'garden', name: '园林艺术' },
  { id: 'greatwall', name: '长城' },
  { id: 'gugong', name: '故宫' },
  { id: 'pagoda', name: '古塔' },
  { id: 'dougong', name: '斗拱榫卯' },
  { id: 'mural', name: '壁画艺术' },
  { id: 'cave', name: '窑洞民居' },
  { id: 'woodcarving', name: '木雕工艺' },
  { id: 'buddhist', name: '佛教建筑' },
  { id: 'tang', name: '唐代建筑' },
  { id: 'song', name: '宋代建筑' }
])

const avgMatchScore = computed(() => {
  if (recommendedUsers.value.length === 0) return 0
  const total = recommendedUsers.value.reduce((sum, user) => sum + user.matchScore, 0)
  return Math.round(total / recommendedUsers.value.length)
})

const onlineCount = computed(() => {
  return recommendedUsers.value.filter(u => u.online).length
})

const toggleTag = (tagId: string) => {
  const index = selectedTags.value.indexOf(tagId)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tagId)
  }
}

const clearTags = () => {
  selectedTags.value = []
}

const sendRequest = (userId: string) => {
  const user = recommendedUsers.value.find(u => u.id === userId)
  if (user) {
    user.requestSent = true
  }
}

const fetchRecommendations = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/user/recommend?userId=1')
    const data = await response.json()
    if (data.success) {
      recommendedUsers.value = data.data.map((user: any) => ({
        ...user,
        requestSent: false,
        online: Math.random() > 0.4,
        bio: getRandomBio(),
        interests: getRandomInterests()
      }))
    }
  } catch (error) {
    recommendedUsers.value = [
      { id: '1', name: '历史探索者', avatar: '', bio: '热爱中国古建筑文化的探索者', interests: ['故宫', '唐代建筑', '壁画'], matchScore: 85, online: true },
      { id: '2', name: '建筑迷', avatar: '', bio: '致力于传统建筑文化的传承与保护', interests: ['榫卯结构', '古塔', '木雕'], matchScore: 72, online: true },
      { id: '3', name: '文化学者', avatar: '', bio: '古建摄影爱好者，记录中华之美', interests: ['长城', '明清建筑', '园林'], matchScore: 68, online: false },
      { id: '4', name: '艺术爱好者', avatar: '', bio: '建筑历史研究者，探寻古迹背后的故事', interests: ['故宫', '壁画', '佛教建筑'], matchScore: 65, online: true },
      { id: '5', name: '园林设计师', avatar: '', bio: '传统工艺爱好者，专注榫卯结构研究', interests: ['园林艺术', '宋代建筑', '木雕'], matchScore: 78, online: false },
      { id: '6', name: '文物保护者', avatar: '', bio: '致力于古建筑保护与传承', interests: ['长城', '古塔', '唐代建筑'], matchScore: 71, online: true }
    ]
  } finally {
    loading.value = false
  }
}

const getRandomBio = () => {
  const bios = [
    '热爱中国古建筑文化的探索者',
    '致力于传统建筑文化的传承与保护',
    '古建摄影爱好者，记录中华之美',
    '建筑历史研究者，探寻古迹背后的故事',
    '传统工艺爱好者，专注榫卯结构研究',
    '江南园林艺术的忠实爱好者',
    '古塔建筑的痴迷探索者',
    '壁画艺术的鉴赏与研究者'
  ]
  return bios[Math.floor(Math.random() * bios.length)]
}

const getRandomInterests = () => {
  const allInterests = ['明清建筑', '园林艺术', '长城', '故宫', '古塔', '榫卯结构', '壁画', '木雕', '唐代建筑', '宋代建筑']
  const count = Math.floor(Math.random() * 3) + 2
  const shuffled = [...allInterests].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

onMounted(() => {
  fetchRecommendations()
})
</script>