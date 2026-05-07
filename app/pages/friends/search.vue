<template>
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-serif tracking-wide text-[#2C363F]">
            寻觅知音
          </h1>
          <p class="text-sm text-[#8B7355] mt-1 font-light tracking-wider">
            高山流水，基于志趣匹配同道中人
          </p>
        </div>
      </div>
    </div>

    <!-- 页面主体 -->
    <div class="max-w-6xl mx-auto px-6 py-4">
      <!-- 筛选区域 -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-sm mb-10 relative overflow-hidden">
        <!-- 装饰性角标 -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

        <div class="flex items-center justify-between mb-6 relative z-10">
          <h3 class="text-base font-serif font-medium text-[#2C363F] flex items-center gap-2">
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            择其所好
          </h3>
          <span class="text-xs text-[#A69B8D] border border-[#E8DFCE] px-3 py-1 rounded-full bg-[#FDFBF7]">
            已选 <span class="text-[#D4AF37] font-bold">{{ tags.length }}</span> 志趣
          </span>
        </div>

        <div class="flex flex-wrap gap-3 relative z-10">
          <button
            v-for="(tag, index) in allTags"
            :key="index"
            :class="[
              'px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 border',
              haveTag(tag, 'get')
                ? 'bg-[#2C363F] text-[#FDFBF7] border-[#2C363F] shadow-md transform scale-105'
                : 'bg-[#FDFBF7] text-[#8B7355] border-[#E8DFCE] hover:border-[#D4AF37]/50 hover:bg-[#F5F0E6]'
            ]"
            @click="toggleTag(tag, 'get')"
          >
            {{ t(`search.${tag}`) }}
          </button>
        </div>

        <div class="flex items-center justify-between mt-8 pt-6 border-t border-[#E8DFCE]/60 relative z-10 gap-6">
          <ULink
            class="text-[#A69B8D] hover:text-[#8B7355] text-sm font-medium transition-colors flex items-center gap-1.5 group"
            @click="clearTags"
          >
            <svg
              class="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>清空重选</span>
          </ULink>
          <UInputTags
            v-model="tags"
            :display-value="displayTag"
            :convert-value="wrapTag"
            class="flex-1 bg-[#FDFBF7] text-[#8B7355] border-[#E8DFCE] hover:border-[#D4AF37]/50 hover:bg-[#F5F0E6] hover:text-[#8B7355] text-sm font-medium transition-colors flex items-center gap-1.5 group"
          />
          <ULink
            class="px-8 py-2.5 bg-[#2C363F] text-[#FDFBF7] rounded-xl text-sm font-medium hover:bg-[#1A2026] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            @click="refresh()"
          >
            <svg
              class="w-4 h-4 text-[#D4AF37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            <span>开始寻访</span>
          </ULink>
        </div>
      </div>
      <!-- 推荐用户列表 -->
      <template v-if="friendsGetArray.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(user, index) in friendsGetArray"
            :key="index"
            class="bg-white rounded-2xl border border-[#E8DFCE]/60 hover:border-[#D4AF37]/40 shadow-sm hover:shadow-md transition-all duration-500 group animate-fade-in-up relative overflow-hidden"
            :style="{ animationDelay: `${index * 0.08}s` }"
          >
            <!-- 雅致的头部背景 -->
            <div class="relative h-28 bg-[#FDFBF7] overflow-hidden border-b border-[#E8DFCE]/40">
              <!-- 抽象山水/几何底纹 -->
              <svg
                class="absolute inset-0 w-full h-full text-[#E8DFCE] opacity-50"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 100 C 20 0 50 0 100 100 Z"
                  fill="currentColor"
                />
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
                  {{ user.userName.charAt(0) }}
                </div>
                <span :class="['absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white', user.online ? 'bg-[#5B8C7A]' : 'bg-[#D1C9BE]']" />
              </div>

              <!-- 基本信息 -->
              <div class="text-center mb-5">
                <h3 class="text-lg font-serif font-medium text-[#2C363F] mb-1.5">
                  {{ user.userName }}
                </h3>
                <p class="text-xs text-[#8B7355] font-light leading-relaxed h-8 line-clamp-2">
                  {{ user.location }}
                </p>
              </div>

              <!-- 兴趣标签 -->
              <div class="flex flex-wrap justify-center gap-2 mb-6 h-14 overflow-hidden">
                <span
                  v-for="ta in user.tags.slice(0, 4)"
                  :key="ta"
                  class="px-2.5 py-1 bg-[#F5F0E6] text-[#8B7355] text-[10px] tracking-wider rounded-md border border-[#E8DFCE]"
                >
                  {{ t(ta) }}
                </span>
              </div>
              <!-- 操作按钮 -->
              <div class="flex gap-3">
                <button
                  :class="[
                    'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2',
                    existRequest(user.userid)
                      ? 'bg-[#F5F0E6] text-[#A69B8D] cursor-not-allowed'
                      : 'bg-[#5B8C7A] text-white hover:bg-[#4A7364] hover:shadow-md'
                  ]"
                  :disabled="existRequest(user.userid)"
                  @click="sendRequest(user.userid)"
                >
                  <svg
                    v-if="!existRequest(user.userid)"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{{ existRequest(user.userid) ? '拜帖已递' : '递交拜帖' }}</span>
                </button>
                <button class="w-11 h-11 bg-[#FDFBF7] border border-[#E8DFCE] text-[#8B7355] rounded-xl hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-colors flex items-center justify-center">
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
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 空状态 -->
      <template v-else>
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
          <h3 class="text-lg font-serif text-[#2C363F] mb-2">
            未寻得同道
          </h3>
          <p class="text-sm text-[#8B7355] mb-6">
            上方择选几项志趣，方可在此得遇良缘
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { components } from '~/types'

const accountStore = useAccountStore()
const { t, locale } = useI18n()
const { $authFetch } = useNuxtApp()
const localePath = useLocalePath()

const { data: tagsResponse } = await useAsyncData<string[]>(`search-collection-${locale.value}`, () => {
  return $fetch('/api/v1/Account/social/collectTags')
})
const allTags = computed<string[]>(() => tagsResponse.value ?? [])

type TagFrom = 'get' | 'input'
type TagPair = {
  value: string
  type: TagFrom
}
const tags = ref<TagPair[]>([])
function haveTag(tag: string, type: TagFrom): boolean {
  return tags.value.find(t => t.value === tag && t.type === type) !== undefined
}
function toggleTag(tag: string, type: TagFrom): void {
  if (haveTag(tag, type)) {
    tags.value = tags.value.filter(t => !(t.value === tag && t.type === type))
  } else {
    tags.value.push({ value: tag, type: type })
    refresh()
  }
}
const clearTags = () => {
  tags.value = []
  refresh()
}
function displayTag(tag: TagPair): string {
  return tag.type === 'input' ? tag.value : t(`search.${tag.value}`)
}
function wrapTag(tag: string): TagPair {
  return ({
    value: tag,
    type: 'input'
  })
}

const { data: recommendRequest, refresh } = await useAsyncData<components['schemas']['AccountPublicInfoResponse'][]>(`search-${locale.value}-${accountStore.userId}`, () => {
  return $authFetch('/api/v1/Account/social/search', {
    method: 'POST',
    headers: {
      userId: String(accountStore.userId)
    },
    body: {
      searchTags: tags.value.filter(tp => tp.type === 'get').flatMap(tp => tp.value),
      searches: tags.value.filter(tp => tp.type === 'input').flatMap(tp => tp.value)
    } as components['schemas']['SearchFriendsCommand']
  })
}, {
  watch: [tags]
})
const friendsGetArray = computed<components['schemas']['AccountPublicInfoResponse'][]>(() => recommendRequest.value ?? [])

const requests = ref<number[]>([])
const toast = useToast()
function existRequest(userId: number): boolean {
  return requests.value.find(t => t === userId) !== undefined
}
async function sendRequest(userId: number) {
  if (existRequest(userId)) {
    toast.add({ title: '成功提交' })
    requests.value.push(userId)
    await $authFetch('/api/v1/Account/social/sendRequest', {
      method: 'PUT',
      headers: {
        userId: String(accountStore.userId)
      },
      body: {
        targetUserId: userId
      }
    })
  } else {
    toast.add({ title: '已经提交' })
  }
}
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
