<template>
  <div class="bg-[#FAF8F5] min-h-screen font-serif text-[#333333] pb-20 selection:bg-[#8B2B2B]/10 overflow-x-hidden">
    <section class="bg-white border-b border-[#EAE3D9] pt-32 pb-16 relative overflow-hidden">
      <NuxtImg
        src="https://api.dicebear.com/7.x/shapes/svg?seed=architecture-blueprint&backgroundColor=transparent&flip=false&radius=0"
        class="absolute -right-20 -bottom-20 w-125 h-125 opacity-[0.04] pointer-events-none select-none rotate-[-15deg]"
      />

      <div class="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div class="absolute left-6 top-24 writing-vertical-rl text-xs tracking-[0.5em] text-[#C9A063]/60 select-none">
          雅集论坛
        </div>

        <h1 class="text-5xl md:text-6xl font-bold tracking-[0.3em] mb-5 text-[#1A1A1A]">
          营造学社
        </h1>
        <p class="text-[#666666] tracking-widest text-base max-w-2xl leading-relaxed">
          —— 汇聚天下同好，以数字之光，重筑华夏典籍中的木构文脉 ——
        </p>
        <div class="w-16 h-0.5 bg-[#8B2B2B] mt-8 opacity-60" />
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-6 mt-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div class="lg:col-span-8 flex flex-col gap-8">
          <div class="flex gap-10 border-b border-[#EAE3D9] pb-4 mb-3">
            <ULink
              v-for="tab in tabs"
              :key="tab"
              class="relative text-lg tracking-widest transition-colors pb-2 group"
              :class="activeTab === tab ? 'text-[#8B2B2B] font-bold' : 'text-[#666666] hover:text-[#1A1A1A]'"
              @click="activeTab = tab"
            >
              {{ t(tab) }}
              <span
                v-if="activeTab === tab"
                class="absolute -bottom-4.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#8B2B2B] rounded-full shadow-[0_1px_3px_rgba(139,43,43,0.3)]"
              />
            </ULink>
          </div>
          <TransitionGroup
            name="list"
            tag="div"
            class="flex flex-col gap-8"
          >
            <PostSlugCardComponent
              v-for="post in filteredPosts"
              :key="post.id"
              v-bind="post"
            />
          </TransitionGroup>
          <div
            ref="endTarget"
            class="text-center py-10 text-[#AAAAAA] text-sm tracking-[0.5em] font-light"
          >
            · {{ postStore.loadCompleted ? '营造卷轴已展至末尾':'正在加载' }} ·
          </div>
        </div>

        <div class="lg:col-span-4 flex flex-col gap-10">
          <NuxtLink
            :to="localePath('/forum/editor')"
            class="w-full flex items-center justify-center gap-3 py-5 bg-[#8B2B2B] hover:bg-[#6D2121] text-white font-bold tracking-[0.3em] transition-all rounded-sm shadow-[0_10px_25px_rgba(139,43,43,0.2)] hover:-translate-y-1.5 group"
          >
            <UIcon
              name="i-lucide-pen-tool"
              class="w-5 h-5 group-hover:rotate-[-15deg] transition-transform"
            />
            撰写新卷宗
          </NuxtLink>
          <div class="bg-white p-8 rounded-sm border border-[#EAE3D9] relative overflow-hidden">
            <UIcon
              name="i-lucide-bento-box"
              class="absolute -left-5 -bottom-5 w-24 h-24 text-[#C9A063]/5 pointer-events-none"
            />
            <h4 class="text-xl font-bold tracking-widest border-b border-[#EAE3D9] pb-4 mb-6 text-[#1A1A1A]">
              学社纪事
            </h4>
            <div class="grid grid-cols-2 gap-6 text-center">
              <div>
                <div class="text-3xl font-bold text-[#8B2B2B] font-mono shadow-sm">
                  {{ postStore.summary?.totalPosts }}
                </div>
                <div class="text-xs text-[#666666] tracking-[0.3em] mt-2.5">
                  典籍探讨
                </div>
              </div>
              <div>
                <div class="text-3xl font-bold text-[#1A1A1A] font-mono">
                  {{ postStore.summary?.totalUsers }}
                </div>
                <div class="text-xs text-[#666666] tracking-[0.3em] mt-2.5">
                  同好齐聚
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-8 rounded-sm border border-[#EAE3D9] sticky top-28 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
            <h4 class="text-xl font-bold tracking-widest border-b border-[#EAE3D9] pb-4 mb-7 flex items-center justify-between text-[#1A1A1A]">
              热门经纬 · 十甲
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-[#8B2B2B]/5 text-[#8B2B2B]">
                <UIcon
                  name="i-lucide-bar-chart-3"
                  class="w-4 h-4"
                />
              </span>
            </h4>
            <div class="flex flex-col gap-6">
              <ClientOnly>
                <HotPostSlugComponent
                  v-for="(hotPost, index) in postStore.summary?.hotPostSlugs||[]"
                  :key="index"
                  v-bind="hotPost"
                  :index="index"
                />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// === 筛选 Tabs ===
import { usePostStore } from '~/stores/usePostStore'
import PostSlugCardComponent from '~/components/forum/PostSlugCardComponent.vue'
import type { components } from '~/types'
import HotPostSlugComponent from '~/components/forum/HotPostSlugComponent.vue'

const localePath = useLocalePath()
const { t } = useI18n({
  useScope: 'local'
})
type tabType = 'all' | 'ai' | 'user'
const tabs: tabType[] = ['all', 'ai', 'user']
const activeTab = ref<tabType>('all')
const postStore = usePostStore()
// 响应式筛选逻辑
const filteredPosts = computed<components['schemas']['PostSlugInfo'][]>(() => {
  if (activeTab.value === 'ai') return postStore.posts.filter(p => p.isAi)
  if (activeTab.value === 'user') return postStore.posts.filter(p => !p.isAi)
  return postStore.posts
})

const endTarget = ref(null)
onMounted(() => {
  let isLoading = false
  const ob = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!isLoading) {
          isLoading = true
          await postStore.fetchPosts()
          isLoading = false
        }
      }
    }
  }, {
    root: null,
    threshold: 0.5
  })
  ob.observe(endTarget.value!)
})
</script>

<i18n>
cn:
  all: '全部卷宗'
  ai: '数字纪实'
  user: '同好探讨'
</i18n>

<style scoped>
/* 装饰性文字纵向排版 */
.writing-vertical-rl {
  writing-mode: vertical-rl;
}

/* 帖子列表切换动画 (淡入渐显) */
.list-enter-active,
.list-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(25px) scale(0.98);
}
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>
