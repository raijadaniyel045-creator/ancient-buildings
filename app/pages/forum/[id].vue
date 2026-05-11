<template>
  <div class="bg-white min-h-screen font-serif text-[#1A1A1A] pb-20">
    <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#EAEAEA] h-16 flex items-center px-6">
      <NuxtLink
        :to="localePath('/forum')"
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
            {{ post?.tag }}
          </span>
          <span class="text-xs text-[#888888] tracking-wider">{{ post?.createdTime }}发布</span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-wide mb-10">
          {{ post?.title }}
        </h1>

        <div class="flex items-center justify-between py-6 border-y border-[#F5F5F7]">
          <div class="flex items-center gap-4">
            <div
              v-if="post?.isAi"
              class="w-12 h-12 rounded-full bg-[#8B2B2B]/10 border border-[#8B2B2B]/20 flex items-center justify-center text-[#8B2B2B]"
            >
              <UIcon
                name="i-lucide-bot"
                class="w-6 h-6"
              />
            </div>
            <NuxtImg
              v-else
              src="/user.png"
              class="w-12 h-12 rounded-full object-cover border border-[#EAEAEA]"
            />

            <div class="flex flex-col">
              <span class="font-bold tracking-widest flex items-center gap-1">
                {{ post?.author?.userName }}
                <UIcon
                  v-if="post?.isAi"
                  name="i-lucide-badge-check"
                  class="w-4 h-4 text-[#D4AF37]"
                />
              </span>
              <span class="text-xs text-[#888888] tracking-widest">
                {{ post?.isAi ? '学社官方数字主理人' : '学社资深同好' }}
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
              <span class="text-[10px] mt-1 text-[#888888]">{{ post.stats.likes }}</span>
            </button>
            <button
              class="flex flex-col items-center group"
              @click="handleShare"
            >
              <UIcon
                name="i-lucide-share-2"
                class="w-6 h-6 text-[#888888] group-hover:text-[#8B2B2B] transition-colors"
              />
              <span class="text-[10px] mt-1 text-[#888888]">分享</span>
            </button>
          </div>
        </div>
      </header>

      <MDC :value="parsed" />

      <section class="border-t border-[#EAEAEA] pt-16">
        <h3 class="text-2xl font-bold tracking-widest mb-10 flex items-center gap-3">
          学社研讨
          <span class="text-sm font-normal text-[#888888] font-mono">{{ manager.comments.length }}</span>
        </h3>

        <div class="bg-[#FAFAFA] p-6 rounded-sm mb-12 border border-[#EAEAEA] focus-within:border-[#8B2B2B] transition-colors">
          <UTextarea
            v-model="newComment"
            :placeholder="post?.isAi ? '在此向数字主理人提问或探讨...' : '发表您的见解...'"
            variant="none"
            class="w-full bg-transparent text-[#1A1A1A]"
            :ui="{ base: 'font-serif text-sm leading-loose' }"
          />
          <div class="flex justify-end mt-4">
            <UButton
              class="bg-[#8B2B2B]! hover:bg-[#6D2121]! tracking-widest px-6"
              @click="submitComment"
            >
              提交言论
            </UButton>
          </div>
        </div>

        <div class="space-y-3">
          <CommentComponent
            v-for="(comment, index) in manager.comments.value"
            :key="comment.id"
            v-model="manager.comments.value[index]"
            :on-load-next="manager.loadNext"
          />
          <div
            ref="endTarget"
            class="text-center py-10 text-[#AAAAAA] text-sm tracking-[0.5em] font-light"
          >
            · {{ manager.loadCompleted ? '已展至末尾':'正在加载' }} ·
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<i18n>
cn:
</i18n>

<script setup lang="ts">
import CommentComponent from '~/components/forum/CommentComponent.vue'
import type { components } from '~/types'

const { $authFetch } = useNuxtApp()
const localePath = useLocalePath()
const { locale } = useI18n({
  useScope: 'local'
})
const route = useRoute()
const id = route.params.id

const { data: post } = await useAsyncData<components['schemas']['PostDataResponse']>(`forum-post-${id}-${locale.value}`, () => {
  return $fetch(`/api/v1/Forum/post/${id}`)
})
const parsed = computed(() => parseMarkdown(post.value?.data || ''))
const commentsManager = () => {
  const page = ref(1)
  const pageSize = ref(12)
  const loadCompleted = ref(false)
  const comments = ref<components['schemas']['CommentTreeNode'][]>([])
  async function fetchComments() {
    if (loadCompleted.value) return
    const { data } = await useFetch<components['schemas']['CommentTreeNode'][]>(`/api/v1/Forum/post/${id}/comment`, {
      query: {
        Page: page.value,
        PageSize: pageSize.value
      }
    })
    const result = data.value || []
    page.value++
    comments.value = comments.value.concat(data.value || [])
    if (result.length < pageSize.value) {
      loadCompleted.value = true
    }
  }
  async function resetPageSize(newSize: number) {
    if (loadCompleted.value) return
    const { data } = await useFetch<components['schemas']['CommentTreeNode'][]>(`/api/v1/Forum/post/${id}/comment`, {
      query: {
        Page: 1,
        PageSize: newSize
      }
    })
    page.value++
    comments.value = comments.value.concat(data.value || [])
    pageSize.value = newSize
    page.value = 1
  }
  async function refreshComments() {
    page.value = 1
    loadCompleted.value = false
    comments.value = []
    await fetchComments()

  }
  async function loadNext(commentId: number) {
    const component = comments.value.find(c => c.id === commentId)!
    const { data } = await useFetch<components['schemas']['CommentTreeNode'][]>(`/api/v1/Forum/post/${id}/comment/${commentId}`, {
      query: {
        Page: 1,
        PageSize: 12
      }
    })
    const ids = component.children?.map(e => e.id) || []
    component.children = component.children
      ?.concat(data.value?.filter(c => !ids.includes(c.id)) || []) || []
    component.childCount = component.children.length
  }
  return ({
    page,
    pageSize,
    comments,
    loadCompleted,
    refreshComments,
    resetPageSize,
    fetchComments,
    loadNext
  })
}
const manager = commentsManager()

const endTarget = ref(null)
onMounted(() => {
  let isLoading = false
  const ob = new IntersectionObserver(async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!isLoading) {
          isLoading = true
          try {
            await manager.fetchComments()
          } finally {
            isLoading = false
          }
        }
      }
    }
  }, {
    root: null,
    threshold: 0.5
  })
  ob.observe(endTarget.value!)
})

const toast = useToast()
const isLiked = ref(false)
const handleLike = () => {
}
const handleShare = () => {
  toast.add({
    title: '链接已复制到剪贴板'
  })
}

const newComment = ref('')
async function submitComment() {
  const accountStore = useAccountStore()
  if (!accountStore.isLoggedIn) {
    await navigateTo({
      path: localePath('/auth/login'),
      query: { redirect: route.fullPath }
    })
  }
  await $authFetch(`/api/v1/Forum/post/${id}/comment`, {
    method: 'POST',
    body: {
      rootId: 0,
      userId: accountStore.userId,
      content: newComment.value
    } as components['schemas']['PublishCommentCommand']
  })
  newComment.value = ''
  await manager.refreshComments()
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
