<template>
  <!-- 背景：采用宣纸白与极其微弱的纹理/渐变 -->
  <div class="min-h-screen bg-[#FDFBF7] text-[#2C363F] font-sans selection:bg-[#D4AF37] selection:text-white">
    <!-- 顶部装饰线 -->
    <div class="h-1 w-full bg-linear-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />

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
            结识古建知音 · 共 {{ totalFriends }} 人
          </p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-6xl mx-auto px-6 pb-8">
      <div class="flex gap-5">
        <StatCard
          glow-color="from-[#D4AF37]"
          icon-color="text-[#D4AF37]"
          class="flex-1"
          :value="totalFriends"
          :label="t('同道总数')"
        >
          <total-friends-svg />
        </StatCard>
        <StatCard
          glow-color="from-[#5B8C7A]"
          icon-color="text-[#5B8C7A]"
          class="flex-1"
          :value="onlineFriends"
          :label="t('在线交流')"
        >
          <online-friends-svg />
        </StatCard>
        <StatCard
          glow-color="from-[#C94F4F]"
          icon-color="text-[#C94F4F]"
          class="flex-1"
          :value="requestFriends"
          :label="t('结缘请求')"
        >
          <request-friends-svg />
        </StatCard>
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
              @submit.prevent="handleSubmit"
              @focusout="handleSubmit"
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
                v-for="fi in filters"
                :key="fi"
                :class="[
                  'px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  activeFilter === fi
                    ? 'bg-[#2C363F] text-[#FDFBF7] shadow-md'
                    : 'text-[#8B7355] hover:bg-[#E8DFCE]/40'
                ]"
                @click="activeFilter = fi"
              >
                {{ t('friends.'+fi) }}
              </button>
            </div>
          </div>
          <template v-if="totalFriends === 0">
            <div class="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-[#E8DFCE] mt-4">
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
              <ULink
                :to="localePath('/friends/search')"
                class="px-6 py-2.5 bg-[#2C363F] text-[#FDFBF7] rounded-lg text-sm font-medium hover:bg-[#1A2026] transition-all shadow-md"
              >
                去发现
              </ULink>
            </div>
          </template>
          <template v-else>
            <div class="space-y-4">
              <div
                v-for="(friend, index) in displayFriends"
                :key="friend.userId"
                class="group bg-white rounded-2xl p-5 border border-[#E8DFCE]/60 shadow-sm hover:shadow-md hover:border-[#D4AF37]/40 transition-all duration-300 animate-fade-in-up"
                :style="{ animationDelay: `${index * 0.08}s` }"
              >
                <div class="flex items-center gap-5">
                  <!-- 头像 -->
                  <div class="relative shrink-0">
                    <div class="w-16 h-16 rounded-full p-0.5 bg-linear-to-br from-[#E8DFCE] to-transparent group-hover:from-[#D4AF37] transition-colors duration-500">
                      <img
                        :src="friend.avatar"
                        :alt="friend.userName"
                        class="w-full h-full rounded-full object-cover border-2 border-white"
                      >
                    </div>
                    <span :class="['absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white', friend.online ? 'bg-[#5B8C7A]' : 'bg-[#D1C9BE]']" />
                  </div>

                  <!-- 核心信息 -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-3 mb-1.5">
                      <h3 class="text-lg font-serif font-medium text-[#2C363F] truncate">
                        {{ friend.userName }}
                      </h3>
                      <span
                        v-if="friend.online"
                        class="px-2 py-0.5 bg-[#5B8C7A]/10 text-[#5B8C7A] text-[10px] tracking-wider font-bold rounded-md border border-[#5B8C7A]/20"
                      >在线</span>
                    </div>
                    <p class="text-sm text-[#8B7355] mb-3 truncate font-light">
                      {{ friend.description }}
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
                        {{ friend.location }}
                      </span>
                      <div class="w-1 h-1 rounded-full bg-[#E8DFCE]" />
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="(tag) in friend.tags.slice(0, 3)"
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
            </div>
          </template>
        </div>

        <!-- 右侧：侧边栏 -->
        <div class="hidden lg:block w-[320px] shrink-0 space-y-6">
          <!-- 待处理请求 -->
          <div class="bg-white rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-sm relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />

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
              <template v-if="pendingRequests.length > 0">
                <span class="flex items-center justify-center w-5 h-5 bg-[#C94F4F] text-white text-[10px] font-bold rounded-full shadow-sm">
                  {{ pendingRequests.length }}
                </span>
              </template>
            </div>
            <template
              v-if="pendingRequests.length === 0"
            >
              <div class="text-center py-6">
                <p class="text-sm text-[#A69B8D]">
                  暂无新的请求
                </p>
              </div>
            </template>
            <template v-else>
              <div class="space-y-4 relative z-10">
                <div
                  v-for="request in pendingRequests"
                  :key="request.userId"
                  class="group"
                >
                  <div class="flex gap-3">
                    <img
                      :src="request.avatar"
                      :alt="request.userName"
                      class="w-10 h-10 rounded-full object-cover border border-[#E8DFCE]"
                    >
                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-[#2C363F] text-sm">
                        {{ request.userName }}
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
                      @click="dealRequest(request, true)"
                    >
                      接受
                    </button>
                    <button
                      class="flex-1 py-1.5 bg-[#F5F0E6] text-[#8B7355] text-xs font-medium rounded-md hover:bg-[#E8DFCE] transition-colors"
                      @click="dealRequest(request, false)"
                    >
                      婉拒
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <!-- 发现入口 (古风卡片) -->
          <div class="relative overflow-hidden bg-[#2C363F] rounded-2xl p-6 shadow-lg group cursor-pointer">
            <!-- 装饰性纹理 -->
            <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#D4AF37] via-transparent to-transparent" />
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
              <ULink
                class="flex items-center text-sm text-[#D4AF37] font-medium group-hover:translate-x-1 transition-transform"
                :to="localePath('/friends/search')"
              >
                {{ t('前往发现') }}
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
              </ULink>
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
            <template
              v-if="recentActivities.length > 0"
            >
              <div class="space-y-4">
                <ULink
                  v-for="(item, index) in recentActivities.value"
                  :key="index"
                  class="flex gap-3 group cursor-pointer"
                >
                  <img
                    :src="item.avatar"
                    :alt="item.desc"
                    class="w-8 h-8 rounded-full object-cover mt-0.5 border border-[#E8DFCE]"
                  >
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-[#2C363F] leading-tight group-hover:text-[#D4AF37] transition-colors">
                      <span class="font-medium">{{ item.desc }}</span>
                    </p>
                    <p class="text-xs text-[#A69B8D] mt-1 font-light">
                      {{ item.time }}
                    </p>
                  </div>
                </ULink>
              </div>
            </template>
            <template v-else>
              <div class="space-y-4">
                {{ t('暂无消息') }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatCard from '~/components/friends/StatCard.vue'
import TotalFriendsSvg from '~/components/svgs/TotalFriendsSvg.vue'
import OnlineFriendsSvg from '~/components/svgs/OnlineFriendsSvg.vue'
import RequestFriendsSvg from '~/components/svgs/RequestFriendsSvg.vue'
import type {
  FriendsSummary,
  NewFriendRequest,
  RecentActivityLog,
  SplitFriendsArrayResponse,
  SplitPageFriendsCommand
} from '~/types'

const accountStore = useAccountStore()
const { t, locale } = useI18n()
const { $authFetch } = useNuxtApp()
const localePath = useLocalePath()

const { data: globalInfo } = await useAsyncData<FriendsSummary>(`friends-summary-${locale.value}-${accountStore.userId}`, () => {
  return $authFetch('/api/v1/Account/friends', {
    headers: {
      userId: String(accountStore.userId)
    }
  })
})
const totalFriends = computed(() => globalInfo.value?.total || 0)
const onlineFriends = computed(() => globalInfo.value?.online || 0)
const requestFriends = computed(() => globalInfo.value?.request || 0)

// 搜索防抖与表单控制状态
const searchInput = ref('')
const handleSubmit = () => {
  // 将 inputValue 的值赋给目标对象的属性
  searchFilter.value = searchInput.value
}
const searchFilter = ref('')
const activeFilter = ref('all')
const filters = ['all', 'online', 'recent'] as const
const page = ref(0)

const { data: arrayList } = await useAsyncData<SplitFriendsArrayResponse>(`friends-${locale.value}-${activeFilter.value}`, () => {
  return $authFetch(`/api/v1/account/friends/${activeFilter.value}`, {
    method: 'POST',
    headers: {
      userId: String(accountStore.userId)
    },
    body: {
      page: String(page.value),
      search: searchFilter.value
    } as SplitPageFriendsCommand
  })
}, {
  watch: [searchFilter, activeFilter, page]
})
const displayFriends = computed(() => arrayList.value?.users ?? [])

const { data: pendingList } = await useAsyncData<NewFriendRequest[]>(`friends-pending-${locale.value}-${accountStore.userId}`, () => {
  return $authFetch(`/api/v1/Account/social/pending`, {
    headers: {
      userId: String(accountStore.userId)
    }
  })
})
const pendingRequests = computed<NewFriendRequest[]>(() => pendingList.value ?? [])

const { data: recentLogs } = await useAsyncData<RecentActivityLog[]>(`friends-recent-${locale.value}-${accountStore.userId}`, () => {
  return $authFetch(`/api/v1/Account/social/logs`, {
    headers: {
      userId: String(accountStore.userId)
    }
  })
})
const recentActivities = computed<RecentActivityLog[]>(() => recentLogs.value ?? [])

async function dealRequest(request: NewFriendRequest, accept: boolean) {
  await $authFetch('/api/v1/Account/social/dealRequest', {
    method: 'POST',
    headers: {
      userId: String(accountStore.userId)
    },
    query: {
      targetUserId: request.userId,
      confirm: accept
    }
  })
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
