<template>
  <!-- 背景：采用宣纸白与极其微弱的纹理/渐变 -->
  <div class="min-h-screen bg-[#FDFBF7] text-[#2C363F] font-sans selection:bg-[#D4AF37] selection:text-white">
    <!-- 顶部装饰线 -->
    <div class="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

    <!-- 页面标题 -->
    <div class="max-w-6xl mx-auto px-6 pt-10 pb-6">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-[#F5F0E6] rounded-2xl flex items-center justify-center border border-[#E8DFCE] shadow-sm">
          <svg
            class="w-6 h-6 text-[#8B7355]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-serif tracking-wide text-[#2C363F]">
            我的同道
          </h1>
          <p class="text-sm text-[#8B7355] mt-1 font-light tracking-wider">
            结识古建知音 · 共 {{ stats.total }} 人
          </p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-6xl mx-auto px-6 pb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div
          v-for="(stat, index) in statCards"
          :key="index"
          class="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-[0_4px_20px_-4px_rgba(139,115,85,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(139,115,85,0.1)] transition-all duration-500 group"
        >
          <div
            class="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"
            :class="stat.glowColor"
          />
          <div class="relative z-10 flex flex-col items-center">
            <component
              :is="stat.icon"
              class="w-7 h-7 mb-3"
              :class="stat.iconColor"
            />
            <div class="text-3xl font-serif text-[#2C363F]">
              {{ stat.value }}
            </div>
            <div class="text-xs text-[#8B7355] mt-2 font-medium tracking-widest">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="max-w-6xl mx-auto px-6 pb-12">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧：好友列表区 -->
        <div class="flex-1">
          <!-- 搜索和筛选栏 -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#E8DFCE]/60 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
            <!-- 表单包裹：支持回车提交 -->
            <form
              class="flex-1 relative group"
              @submit.prevent="handleSearch"
            >
              <svg
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A69B8D] group-focus-within:text-[#D4AF37] transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <!-- 注意：这里使用了原生 input 以完美适配 Tailwind 类名，若使用 UInput 请通过 ui 属性穿透样式 -->
              <input
                v-model="searchInput"
                type="text"
                placeholder="寻觅知音、籍贯或志趣..."
                class="w-full pl-12 pr-4 py-3 bg-[#FDFBF7] border border-[#E8DFCE] rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all text-[#2C363F] placeholder:text-[#A69B8D]"
              >
            </form>

            <div class="flex gap-2 bg-[#FDFBF7] p-1.5 rounded-xl border border-[#E8DFCE]">
              <button
                v-for="filter in filters"
                :key="filter.key"
                :class="[
                  'px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  activeFilter === filter.key
                    ? 'bg-[#2C363F] text-[#FDFBF7] shadow-md'
                    : 'text-[#8B7355] hover:bg-[#E8DFCE]/40'
                ]"
                @click="activeFilter = filter.key"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>

          <!-- 好友卡片列表 -->
          <div class="space-y-4">
            <div
              v-for="(friend, index) in filteredFriends"
              :key="friend.id"
              class="group bg-white rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm hover:shadow-md hover:border-[#D4AF37]/40 transition-all duration-300 animate-fade-in-up"
              :style="{ animationDelay: `${index * 0.08}s` }"
            >
              <div class="flex items-center gap-5">
                <!-- 头像 -->
                <div class="relative flex-shrink-0">
                  <div class="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#E8DFCE] to-transparent group-hover:from-[#D4AF37] transition-colors duration-500">
                    <img
                      :src="friend.avatar"
                      :alt="friend.name"
                      class="w-full h-full rounded-full object-cover border-2 border-white"
                    >
                  </div>
                  <span :class="['absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white', friend.online ? 'bg-[#5B8C7A]' : 'bg-[#D1C9BE]']" />
                </div>

                <!-- 核心信息 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <h3 class="text-lg font-serif font-medium text-[#2C363F] truncate">
                      {{ friend.name }}
                    </h3>
                    <span
                      v-if="friend.online"
                      class="px-2 py-0.5 bg-[#5B8C7A]/10 text-[#5B8C7A] text-[10px] tracking-wider font-bold rounded-md border border-[#5B8C7A]/20"
                    >在线</span>
                  </div>
                  <p class="text-sm text-[#8B7355] mb-3 truncate font-light">
                    {{ friend.bio }}
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
                      {{ friend.province }}
                    </span>
                    <div class="w-1 h-1 rounded-full bg-[#E8DFCE]" />
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="interest in friend.interests.slice(0, 3)"
                        :key="interest"
                        class="text-xs text-[#D4AF37] bg-[#D4AF37]/5 px-2 py-1 rounded-md border border-[#D4AF37]/10"
                      >
                        {{ interest }}
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
          </div>

          <!-- 空状态 -->
          <div
            v-if="filteredFriends.length === 0"
            class="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-[#E8DFCE] mt-4"
          >
            <svg
              class="w-16 h-16 mx-auto text-[#D1C9BE] mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h3 class="text-lg font-serif text-[#2C363F] mb-2">
              未寻得归客
            </h3>
            <p class="text-sm text-[#8B7355] mb-6">
              清风徐来，不如去寻觅几位志同道合的好友
            </p>
            <button class="px-6 py-2.5 bg-[#2C363F] text-[#FDFBF7] rounded-lg text-sm font-medium hover:bg-[#1A2026] transition-all shadow-md">
              去发现
            </button>
          </div>
        </div>

        <!-- 右侧：侧边栏 -->
        <div class="hidden lg:block w-[320px] flex-shrink-0 space-y-6">
          <!-- 待处理请求 -->
          <div class="bg-white rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />

            <div class="flex items-center justify-between mb-5 relative z-10">
              <h3 class="text-base font-serif font-medium text-[#2C363F] flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
                好友请求
              </h3>
              <span
                v-if="pendingRequests.length > 0"
                class="flex items-center justify-center w-5 h-5 bg-[#C94F4F] text-white text-[10px] font-bold rounded-full shadow-sm"
              >
                {{ pendingRequests.length }}
              </span>
            </div>

            <div
              v-if="pendingRequests.length > 0"
              class="space-y-4 relative z-10"
            >
              <div
                v-for="request in pendingRequests"
                :key="request.id"
                class="group"
              >
                <div class="flex gap-3">
                  <img
                    :src="request.fromUserAvatar"
                    :alt="request.fromUserName"
                    class="w-10 h-10 rounded-full object-cover border border-[#E8DFCE]"
                  >
                  <div class="flex-1 min-w-0">
                    <h4 class="font-medium text-[#2C363F] text-sm">
                      {{ request.fromUserName }}
                    </h4>
                    <p
                      class="text-xs text-[#8B7355] mt-0.5 line-clamp-1"
                      :title="request.reason"
                    >
                      {{ request.reason }}
                    </p>
                  </div>
                </div>
                <div class="flex gap-2 mt-3 pl-13">
                  <button
                    class="flex-1 py-1.5 bg-[#5B8C7A] text-white text-xs font-medium rounded-md hover:bg-[#4A7364] transition-colors"
                    @click="acceptRequest(request)"
                  >
                    接受
                  </button>
                  <button
                    class="flex-1 py-1.5 bg-[#F5F0E6] text-[#8B7355] text-xs font-medium rounded-md hover:bg-[#E8DFCE] transition-colors"
                    @click="rejectRequest(request)"
                  >
                    婉拒
                  </button>
                </div>
              </div>
            </div>
            <div
              v-else
              class="text-center py-6"
            >
              <p class="text-sm text-[#A69B8D]">
                暂无新的请求
              </p>
            </div>
          </div>

          <!-- 发现入口 (古风卡片) -->
          <div class="relative overflow-hidden bg-[#2C363F] rounded-2xl p-6 shadow-lg group cursor-pointer">
            <!-- 装饰性纹理 -->
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent" />
            <svg
              class="absolute -bottom-6 -right-6 w-32 h-32 text-white opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 0L55 45L100 50L55 55L50 100L45 55L0 50L45 45Z" />
            </svg>

            <div class="relative z-10">
              <div class="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/10">
                <svg
                  class="w-5 h-5 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
              <h3 class="font-serif text-lg text-[#FDFBF7] mb-2 tracking-wide">
                觅知音
              </h3>
              <p class="text-xs text-[#A69B8D] mb-5 leading-relaxed">
                寻山问水，以文会友。基于您的古建偏好，推荐同好。
              </p>
              <div class="flex items-center text-sm text-[#D4AF37] font-medium group-hover:translate-x-1 transition-transform">
                前往发现
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- 最近互动 -->
          <div class="bg-white rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-sm">
            <h3 class="text-base font-serif font-medium text-[#2C363F] flex items-center gap-2 mb-5">
              <svg
                class="w-5 h-5 text-[#8B7355]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              燕过留声
            </h3>
            <div class="space-y-4">
              <div
                v-for="item in recentActivities"
                :key="item.id"
                class="flex gap-3 group cursor-pointer"
              >
                <img
                  :src="item.avatar"
                  :alt="item.name"
                  class="w-8 h-8 rounded-full object-cover mt-0.5 border border-[#E8DFCE]"
                >
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-[#2C363F] leading-tight group-hover:text-[#D4AF37] transition-colors">
                    <span class="font-medium">{{ item.name }}</span> {{ item.activity }}
                  </p>
                  <p class="text-xs text-[#A69B8D] mt-1 font-light">
                    {{ item.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, markRaw } from 'vue'

// 搜索防抖与表单控制状态
const searchInput = ref('')
const searchQuery = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

// 监听输入，防抖逻辑 (延迟 1000ms)
watch(searchInput, (newValue) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchQuery.value = newValue
  }, 1000)
})

// 表单提交：回车时立即搜索
const handleSearch = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  searchQuery.value = searchInput.value
}

const activeFilter = ref('all')

const filters = [
  { key: 'all', label: '全部好友' },
  { key: 'online', label: '当前在线' },
  { key: 'recent', label: '最近联系' }
]

// 统计卡片配置 (配合 SVG 和主题色)
const statCards = computed(() => [
  {
    label: '同道总数', value: stats.value.total, glowColor: 'from-[#D4AF37]', iconColor: 'text-[#D4AF37]',
    icon: markRaw({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' })
  },
  {
    label: '在线交流', value: stats.value.online, glowColor: 'from-[#5B8C7A]', iconColor: 'text-[#5B8C7A]',
    icon: markRaw({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>' })
  },
  {
    label: '结缘请求', value: stats.value.pendingRequests, glowColor: 'from-[#C94F4F]', iconColor: 'text-[#C94F4F]',
    icon: markRaw({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" /></svg>' })
  },
  {
    label: '共同雅集', value: stats.value.groups, glowColor: 'from-[#8B7355]', iconColor: 'text-[#8B7355]',
    icon: markRaw({ template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>' })
  }
])

// 类型定义
interface Friend {
  id: string
  name: string
  avatar: string
  bio: string
  interests: string[]
  province: string
  online: boolean
}

interface PendingRequest {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserAvatar: string
  reason: string
  createdAt: string
}

interface RecentActivity {
  id: string
  name: string
  avatar: string
  activity: string
  time: string
}

const friends = ref<Friend[]>([])
const pendingRequests = ref<PendingRequest[]>([])
const recentActivities = ref<RecentActivity[]>([])

const stats = ref({ total: 0, online: 0, pendingRequests: 0, groups: 0 })

const filteredFriends = computed(() => {
  let result = friends.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(friend =>
      friend.name.toLowerCase().includes(query)
      || friend.bio.toLowerCase().includes(query)
      || friend.interests.some(i => i.toLowerCase().includes(query))
    )
  }
  if (activeFilter.value === 'online') {
    result = result.filter(friend => friend.online)
  }
  return result
})

// 使用 Nuxt 4 的 useAsyncData 抓取数据
const { data: fetchFriends } = await useAsyncData('friends', async () => {
  return ({
    friends: [
      { id: 'u1', name: '古建爱好者小王', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square', bio: '痴迷于明清古建筑的结构之美', interests: ['明清建筑', '园林艺术', '木雕工艺'], province: '浙江省', online: true },
      { id: 'u2', name: '长城守护人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square', bio: '长城文化研究者', interests: ['长城', '军事防御', '明代建筑'], province: '北京市', online: true },
      { id: 'u3', name: '园林设计师小李', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square', bio: '江南园林艺术爱好者', interests: ['江南园林', '造景艺术', '文人园林'], province: '江苏省', online: false },
      { id: 'u4', name: '古塔探秘者', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square', bio: '探访全国各地古塔', interests: ['古塔', '佛教建筑', '砖石结构'], province: '山西省', online: true },
      { id: 'u5', name: '榫卯匠人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square', bio: '传统榫卯工艺传承者', interests: ['榫卯结构', '木作工艺', '传统建筑'], province: '安徽省', online: false },
      { id: 'u7', name: '故宫迷妹', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square', bio: '故宫文化深度爱好者', interests: ['故宫', '皇家建筑', '清代建筑'], province: '北京市', online: false }
    ],
    pendingRequests: [
      { id: 'req1', fromUserId: 'u8', fromUserName: '斗拱研究员', fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20scholar%20avatar&image_size=square', reason: '拜读了您的《应县木塔分析》，想交流一下', createdAt: '2小时前' },
      { id: 'req2', fromUserId: 'u9', fromUserName: '寻访晋风', fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20traveler%20avatar&image_size=square', reason: '同为山西古建爱好者，求通过', createdAt: '半天前' }
    ],
    stats: {
      total: 6,
      online: 3,
      pendingRequests: 2,
      groups: 3
    },
    recentActivities: [
      { id: '1', name: '古建爱好者小王', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square', activity: '赞赏了你的「应县木塔游记」', time: '2时辰前' },
      { id: '2', name: '长城守护人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square', activity: '点评了你的动态', time: '5时辰前' },
      { id: '3', name: '园林设计师小李', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square', activity: '留影了「拙政园之美」', time: '昨日' }
    ]
  })
})

// 赋值
friends.value = fetchFriends.value?.friends || []
pendingRequests.value = fetchFriends.value?.pendingRequests || []
stats.value = fetchFriends.value?.stats || {
  total: 0,
  online: 0,
  pendingRequests: 0,
  groups: 0
}
recentActivities.value = fetchFriends.value?.recentActivities || []

// 操作函数
const acceptRequest = (request: PendingRequest) => {
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== request.id)
  stats.value.pendingRequests -= 1
}

const rejectRequest = (request: PendingRequest) => {
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== request.id)
  stats.value.pendingRequests -= 1
}
</script>

<style scoped>
/* 增加极其微妙的进场动画 */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 优化全局滚动条，使其更符合雅致主题 */
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
