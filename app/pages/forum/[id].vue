<template>
  <div class="bg-white min-h-screen font-serif text-[#1A1A1A] pb-20">
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center px-6">
      <NuxtLink
        to="/forum"
        class="flex items-center gap-2 text-[#666666] hover:text-[#8B2B2B] transition-colors tracking-widest text-sm"
      >
        <UIcon
          name="i-lucide-arrow-left"
          class="w-4 h-4"
        />
        返回学社
      </NuxtLink>
    </nav>

    <main class="max-w-4xl mx-auto px-6 pt-32">
      <header class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-xs border border-[#8B2B2B]/30 text-[#8B2B2B] px-2 py-0.5 bg-[#8B2B2B]/5 tracking-widest">
            {{ postData.tag }}
          </span>
          <span class="text-xs text-[#888888] tracking-wider">{{ postData.date }}发布</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-wide mb-10">
          {{ postData.title }}
        </h1>

        <div class="flex items-center justify-between py-6 border-y border-[#F5F5F7]">
          <div class="flex items-center gap-4">
            <div
              v-if="postData.isAi"
              class="w-12 h-12 rounded-full bg-[#8B2B2B]/10 border border-[#8B2B2B]/20 flex items-center justify-center text-[#8B2B2B]"
            >
              <UIcon
                name="i-lucide-bot"
                class="w-6 h-6"
              />
            </div>
            <img
              v-else
              :src="postData.avatar"
              class="w-12 h-12 rounded-full object-cover border border-[#EAEAEA]"
            >

            <div class="flex flex-col">
              <span class="font-bold tracking-widest flex items-center gap-1">
                {{ postData.author }}
                <UIcon
                  v-if="postData.isAi"
                  name="i-lucide-badge-check"
                  class="w-4 h-4 text-[#D4AF37]"
                />
              </span>
              <span class="text-xs text-[#888888] tracking-widest">
                {{ postData.isAi ? '学社官方数字主理人' : '学社资深同好' }}
              </span>
            </div>
          </div>

          <div class="flex gap-4">
            <button
              class="flex flex-col items-center group"
              @click="handleLike"
            >
              <UIcon
                :name="isLiked ? 'i-lucide-heart' : 'i-lucide-heart'"
                :class="isLiked ? 'text-[#8B2B2B]' : 'text-[#888888] group-hover:text-[#8B2B2B]'"
                class="w-6 h-6 transition-colors"
              />
              <span class="text-[10px] mt-1 text-[#888888]">{{ postData.likes }}</span>
            </button>
            <button class="flex flex-col items-center group">
              <UIcon
                name="i-lucide-share-2"
                class="w-6 h-6 text-[#888888] group-hover:text-[#8B2B2B] transition-colors"
              />
              <span class="text-[10px] mt-1 text-[#888888]">分享</span>
            </button>
          </div>
        </div>
      </header>

      <MDCRenderer
        :value="parsed"
      />

      <section class="border-t border-[#EAEAEA] pt-16">
        <h3 class="text-2xl font-bold tracking-widest mb-10 flex items-center gap-3">
          学社研讨
          <span class="text-sm font-normal text-[#888888] font-mono">{{ comments.length }}</span>
        </h3>

        <div class="bg-[#FAFAFA] p-6 rounded-sm mb-12 border border-[#EAEAEA] focus-within:border-[#8B2B2B] transition-colors">
          <UTextarea
            v-model="newComment"
            :placeholder="postData.isAi ? '在此向数字主理人提问或探讨...' : '发表您的见解...'"
            variant="none"
            class="w-full bg-transparent text-[#1A1A1A]"
            :ui="{ base: 'font-serif text-sm leading-loose' }"
          />
          <div class="flex justify-end mt-4">
            <UButton
              :loading="isSubmitting"
              class="bg-[#8B2B2B]! hover:bg-[#6D2121]! tracking-widest px-6"
              @click="submitComment"
            >
              提交言论
            </UButton>
          </div>
        </div>

        <div class="space-y-10">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="flex gap-4 group"
          >
            <img
              :src="comment.avatar"
              class="w-10 h-10 rounded-full border border-[#EAEAEA] flex-shrink-0"
            >
            <div class="flex-1 border-b border-[#F5F5F7] pb-8 last:border-0">
              <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-sm tracking-widest">{{ comment.author }}</span>
                <span class="text-[10px] text-[#888888]">{{ comment.date }}</span>
              </div>
              <p class="text-sm text-[#444444] leading-relaxed mb-4">
                {{ comment.text }}
              </p>

              <div
                v-if="comment.aiReply"
                class="mt-4 bg-[#8B2B2B]/5 border-l-2 border-[#8B2B2B] p-4 relative overflow-hidden"
              >
                <div class="absolute right-2 top-2 opacity-10">
                  <UIcon
                    name="i-lucide-sparkles"
                    class="w-12 h-12"
                  />
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-bold text-[#8B2B2B] tracking-[0.2em]">太虚书童 · 批注</span>
                </div>
                <p class="text-xs text-[#8B2B2B]/80 leading-loose italic">
                  “{{ comment.aiReply }}”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { components } from '~/types'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const id = useRoute().params.id

const { data: post } = await useAsyncData<components['schemas']['PostDataResponse']>(`forum-post-${id}-${locale.value}`, () => {
  return $fetch(`/api/v1/Forum/post/${id}`)
})
const parsed = computed(() => parseMarkdown(post.value?.data || ''))

const postData = ref<any>({})
const comments = ref<any[]>([])
const newComment = ref('')
const isSubmitting = ref(false)
const isLiked = ref(false)

// 模拟从后端获取数据
onMounted(async () => {
  // 模拟数据填充
  postData.value = {
    id: id,
    isAi: id == '1', // 假设 ID 为 1 的是 AI 帖子
    title: '每日营造 · 应县木塔的暗层力学解析',
    author: id == '1' ? '太虚书童' : '古建同好-王金源',
    date: '2026-05-09',
    tag: id == '1' ? '数字纪实' : '学术探讨',
    likes: 1240,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    content: `
      <p>在山西应县的旷野之上，屹立着一座穿越了九百多年风雨的纯木神迹——佛宫寺释迦塔。人们常惊叹于其六十七米的巍峨，却鲜有人洞察其内部“明五暗四”的精绝构造。</p>
      <p><strong>何为暗层？</strong></p>
      <p>在木塔五个可见的明层之间，实则嵌套着四个结构暗层。从外观看，它们被平座遮挡，但在结构力学上，它们构成了木塔极其强悍的“刚性环”。</p>
      <p>这种设计精妙地利用了斗拱的刚度与木材的韧性。当强烈地震波袭来时，暗层如同现代高层建筑的避震阻尼器，通过榫卯结构的微小位移吸收能量，实现了“动而不坍，晃而不倒”的抗震奇迹。</p>
      <p>这种营造智慧，在北宋《营造法式》中虽有端倪，但应县木塔实则是该理论最宏大的实战演练。每一个榫卯，都是一段沉默的力量平衡。 </p>
    `
  }

  comments.value = [
    { id: 101, author: '营造爱好者', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', text: '暗层的设计确实是神来之笔，它解决了木塔在受力时的横向剪切问题。', date: '2小时前', aiReply: '确如君所言。暗层在《营造法式》中被称为“平座层”，它不仅提供了内部修缮空间，更在力学上起到了“箍”的作用。' },
    { id: 102, author: '考据达人', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', text: '想请教下，这种暗层设计在后世的木塔中是否得到了普及？', date: '5小时前' }
  ]
})

const handleLike = () => {
  isLiked.value = !isLiked.value
  isLiked.value ? postData.value.likes++ : postData.value.likes--
}

const submitComment = async () => {
  if (!newComment.value.trim()) return
  isSubmitting.value = true

  // 模拟提交过程
  await new Promise(r => setTimeout(r, 1000))

  const userComment = {
    id: Date.now(),
    author: '当前用户',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=me',
    text: newComment.value,
    date: '刚刚',
    aiReply: null
  }

  comments.value.unshift(userComment)

  // 【亮点交互】：如果是 AI 帖子，触发 AI 模拟回帖
  if (postData.value.isAi) {
    setTimeout(() => {
      userComment.aiReply = '感佩君之见解。关于您提及的细节，书童查阅典籍后认为，这正体现了古人『柔性防御』的建筑哲学。'
    }, 1500)
  }

  newComment.value = ''
  isSubmitting.value = false
}
</script>

<style scoped>
/* 文章排版微调 */
:deep(article p) {
  margin-bottom: 2rem;
}
:deep(article strong) {
  color: #8B2B2B;
  border-bottom: 1px solid rgba(139, 43, 43, 0.2);
}
</style>
