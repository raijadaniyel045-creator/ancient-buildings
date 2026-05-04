<template>
  <div class="min-h-screen bg-[#FDFBF7] text-[#2C363F] font-sans selection:bg-[#D4AF37] selection:text-white">
    <!-- 顶部装饰线 -->
    <div class="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

    <!-- 页面标题 -->
    <div class="max-w-6xl mx-auto px-6 pt-10 pb-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-[#F5F0E6] rounded-2xl flex items-center justify-center border border-[#E8DFCE] shadow-sm">
          <svg class="w-6 h-6 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-serif tracking-wide text-[#2C363F]">寻觅知音</h1>
          <p class="text-sm text-[#8B7355] mt-1 font-light tracking-wider">高山流水，基于志趣匹配同道中人</p>
        </div>
      </div>
    </div>

    <!-- 页面主体 -->
    <div class="max-w-6xl mx-auto px-6 py-4">

      <!-- 匹配统计 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <div class="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm group">
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-[#D4AF37] opacity-10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
          <div class="text-3xl font-serif text-[#2C363F] relative z-10">{{ recommendedUsers.length }}</div>
          <div class="text-xs text-[#8B7355] mt-2 font-medium tracking-widest relative z-10">推演归客</div>
        </div>
        <div class="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm group">
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-[#5B8C7A] opacity-10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
          <div class="text-3xl font-serif text-[#5B8C7A] relative z-10">{{ avgMatchScore }}<span class="text-lg">%</span></div>
          <div class="text-xs text-[#8B7355] mt-2 font-medium tracking-widest relative z-10">平均契合</div>
        </div>
        <div class="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm group">
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-[#8B7355] opacity-10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
          <div class="text-3xl font-serif text-[#2C363F] relative z-10">{{ onlineCount }}</div>
          <div class="text-xs text-[#8B7355] mt-2 font-medium tracking-widest relative z-10">当前在线</div>
        </div>
        <div class="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm group">
          <div class="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-[#C94F4F] opacity-10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
          <div class="text-3xl font-serif text-[#C94F4F] relative z-10">{{ requestCount }}</div>
          <div class="text-xs text-[#8B7355] mt-2 font-medium tracking-widest relative z-10">待定之缘</div>
        </div>
      </div>

      <!-- 筛选区域 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-sm mb-10 relative overflow-hidden">
        <!-- 装饰性角标 -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

        <div class="flex items-center justify-between mb-6 relative z-10">
          <h3 class="text-base font-serif font-medium text-[#2C363F] flex items-center gap-2">
            <svg class="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            择其所好
          </h3>
          <span class="text-xs text-[#A69B8D] border border-[#E8DFCE] px-3 py-1 rounded-full bg-[#FDFBF7]">
            已选 <span class="text-[#D4AF37] font-bold">{{ selectedTags.length }}</span> 志趣
          </span>
        </div>

        <div class="flex flex-wrap gap-3 relative z-10">
          <button
            v-for="tag in allTags"
            :key="tag.id"
            @click="toggleTag(tag.id)"
            :class="[
              'px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border',
              selectedTags.includes(tag.id)
                ? 'bg-[#2C363F] text-[#FDFBF7] border-[#2C363F] shadow-md transform scale-105'
                : 'bg-[#FDFBF7] text-[#8B7355] border-[#E8DFCE] hover:border-[#D4AF37]/50 hover:bg-[#F5F0E6]'
            ]"
          >
            {{ tag.name }}
          </button>
        </div>

        <div class="flex items-center justify-between mt-8 pt-6 border-t border-[#E8DFCE]/60 relative z-10">
          <button @click="clearTags" class="text-[#A69B8D] hover:text-[#8B7355] text-sm font-medium transition-colors flex items-center gap-1.5 group">
            <svg class="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>清空重选</span>
          </button>
          <button class="px-8 py-2.5 bg-[#2C363F] text-[#FDFBF7] rounded-xl text-sm font-medium hover:bg-[#1A2026] transition-all shadow-md hover:shadow-lg flex items-center gap-2">
            <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>开始寻访</span>
          </button>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-20 animate-pulse">
        <div class="relative w-16 h-16 flex items-center justify-center mb-6">
          <div class="absolute inset-0 border-2 border-[#E8DFCE] rounded-full" />
          <div class="absolute inset-0 border-2 border-[#D4AF37] rounded-full border-t-transparent animate-spin" />
          <svg class="w-6 h-6 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-sm text-[#8B7355] tracking-widest font-serif">正在为您推演契合之士...</p>
      </div>

      <!-- 推荐用户列表 -->
      <div v-else-if="recommendedUsers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(user, index) in recommendedUsers"
          :key="user.id"
          class="bg-white rounded-2xl border border-[#E8DFCE]/60 hover:border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-all duration-500 group animate-fade-in-up relative overflow-hidden"
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          <!-- 雅致的头部背景 -->
          <div class="relative h-28 bg-[#FDFBF7] overflow-hidden border-b border-[#E8DFCE]/40">
            <!-- 抽象山水/几何底纹 -->
            <svg class="absolute inset-0 w-full h-full text-[#E8DFCE] opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
            <div class="absolute top-4 right-4">
              <div class="px-3 py-1 bg-white/80 backdrop-blur border border-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-bold tracking-wider rounded-full shadow-sm">
                契合度 {{ user.matchScore }}%
              </div>
            </div>
          </div>

          <!-- 用户信息 -->
          <div class="relative px-6 pb-6 -mt-10">
            <!-- 仿古印章式头像 -->
            <div class="relative w-20 h-20 mx-auto mb-4">
              <div class="absolute inset-0 bg-[#D4AF37] rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div class="relative w-full h-full rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#8B7355] text-3xl font-serif border-4 border-white shadow-sm group-hover:-translate-y-1 transition-transform duration-300">
                {{ user.name.charAt(0) }}
              </div>
              <span :class="['absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white', user.online ? 'bg-[#5B8C7A]' : 'bg-[#D1C9BE]']" />
            </div>

            <!-- 基本信息 -->
            <div class="text-center mb-5">
              <h3 class="text-lg font-serif font-medium text-[#2C363F] mb-1.5">{{ user.name }}</h3>
              <p class="text-xs text-[#8B7355] font-light leading-relaxed h-8 line-clamp-2">{{ user.bio }}</p>
            </div>

            <!-- 兴趣标签 -->
            <div class="flex flex-wrap justify-center gap-2 mb-6 h-14 overflow-hidden">
              <span
                v-for="interest in user.interests.slice(0, 4)"
                :key="interest"
                class="px-2.5 py-1 bg-[#F5F0E6] text-[#8B7355] text-[10px] tracking-wider rounded-md border border-[#E8DFCE]"
              >
                {{ interest }}
              </span>
            </div>

            <!-- 操作按钮 -->
            <div class="flex gap-3">
              <button
                @click="sendRequest(user.id)"
                :class="[
                  'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2',
                  user.requestSent
                    ? 'bg-[#F5F0E6] text-[#A69B8D] cursor-not-allowed'
                    : 'bg-[#5B8C7A] text-white hover:bg-[#4A7364] hover:shadow-md'
                ]"
                :disabled="user.requestSent"
              >
                <svg v-if="!user.requestSent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ user.requestSent ? '拜帖已递' : '递交拜帖' }}</span>
              </button>
              <button class="w-11 h-11 bg-[#FDFBF7] border border-[#E8DFCE] text-[#8B7355] rounded-xl hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-[#E8DFCE] mt-4">
        <svg class="w-16 h-16 mx-auto text-[#D1C9BE] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        <h3 class="text-lg font-serif text-[#2C363F] mb-2">未寻得同道</h3>
        <p class="text-sm text-[#8B7355] mb-6">上方择选几项志趣，方可在此得遇良缘</p>
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
  { id: 'mingqing', name: '明清古建' },
  { id: 'garden', name: '江南园林' },
  { id: 'greatwall', name: '长城防御' },
  { id: 'gugong', name: '紫禁城' },
  { id: 'pagoda', name: '古塔寻踪' },
  { id: 'dougong', name: '斗拱榫卯' },
  { id: 'mural', name: '壁画彩塑' },
  { id: 'cave', name: '窑洞民居' },
  { id: 'woodcarving', name: '木作工艺' },
  { id: 'buddhist', name: '石窟寺院' },
  { id: 'tang', name: '大唐遗风' },
  { id: 'song', name: '宋式营造' }
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
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    // 此处替换为真实的 API 请求...
    throw new Error('Fallback to mock data')
  } catch (error) {
    recommendedUsers.value = [
      { id: '1', name: '寻访晋风', avatar: '', bio: '三晋大地古建探索者，独爱唐宋遗构。', interests: ['大唐遗风', '宋式营造', '壁画彩塑'], matchScore: 92, online: true },
      { id: '2', name: '斗拱研究员', avatar: '', bio: '致力于传统木作工艺的解构与复原。', interests: ['斗拱榫卯', '木作工艺', '明清古建'], matchScore: 85, online: true },
      { id: '3', name: '林泉高致', avatar: '', bio: '江南园林营造技法与人文意境研究。', interests: ['江南园林', '明清古建', '木作工艺'], matchScore: 76, online: false },
      { id: '4', name: '长城守望者', avatar: '', bio: '九边重镇与明代长城防御体系考证。', interests: ['长城防御', '窑洞民居', '明清古建'], matchScore: 71, online: true },
      { id: '5', name: '应县木塔迷', avatar: '', bio: '古塔结构测绘爱好者，足迹遍布大江南北。', interests: ['古塔寻踪', '斗拱榫卯', '石窟寺院'], matchScore: 88, online: false },
      { id: '6', name: '故宫猫', avatar: '', bio: '紫禁城常客，皇家建筑群落拍摄记录者。', interests: ['紫禁城', '明清古建', '壁画彩塑'], matchScore: 65, online: true }
    ].map(u => ({ ...u, requestSent: false }))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRecommendations()
})
</script>

<style scoped>
/* 增加进场与悬浮动画 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 隐藏部分滚动条，保持页面整洁 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #E8DFCE;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #D4AF37;
}
</style>
