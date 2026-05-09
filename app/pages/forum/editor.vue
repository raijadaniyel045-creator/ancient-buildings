<template>
  <div class="bg-white min-h-screen font-serif flex flex-col selection:bg-[#8B2B2B]/20">

    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAEAEA] px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          class="flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors tracking-widest text-sm"
          @click="goBack"
        >
          <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
          返回学社
        </button>
        <div class="w-px h-4 bg-[#EAEAEA]"></div>
        <span class="text-xs text-[#888888] tracking-widest flex items-center gap-1">
          <UIcon v-if="isSaving" name="i-lucide-refresh-cw" class="w-3 h-3 animate-spin" />
          <UIcon v-else name="i-lucide-check-circle" class="w-3 h-3 text-green-600/70" />
          {{ isSaving ? '草稿保存中...' : '已保存于本地' }}
        </span>
      </div>

      <div class="flex items-center gap-4">
        <span v-if="isEditMode" class="text-xs text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1 tracking-widest bg-[#D4AF37]/5">
          修订卷宗模式
        </span>
        <button
          class="flex items-center gap-2 px-6 py-2 bg-[#8B2B2B] hover:bg-[#6D2121] text-white text-sm font-bold tracking-widest transition-all rounded-sm shadow-[0_2px_10px_rgba(139,43,43,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValid"
          @click="publishPost"
        >
          <UIcon name="i-lucide-send" class="w-4 h-4" />
          {{ isEditMode ? '确认修订' : '落笔成卷' }}
        </button>
      </div>
    </header>

    <main class="flex-1 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col gap-6">

      <div class="flex items-center gap-3">
        <span class="text-sm text-[#888888] tracking-widest">选择分类：</span>
        <div class="flex gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag"
            class="text-xs px-3 py-1.5 transition-colors border tracking-widest"
            :class="selectedTag === tag ? 'bg-[#8B2B2B]/5 border-[#8B2B2B] text-[#8B2B2B]' : 'bg-white border-[#EAEAEA] text-[#666666] hover:border-[#8B2B2B]/50'"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <input
        v-model="postForm.title"
        type="text"
        placeholder="在此输入卷宗题名..."
        class="w-full text-4xl md:text-5xl font-bold text-[#1A1A1A] placeholder:text-[#EAEAEA] border-none focus:ring-0 p-0 bg-transparent tracking-wide leading-tight"
        @input="autoSave"
      >

      <div class="w-16 h-px bg-[#8B2B2B]/30 my-2"></div>

      <UTextarea
        v-model="postForm.content"
        autoresize
        :maxrows="30"
        placeholder="记录您的营造心得、测绘数据或历史考证。支持 Markdown 语法..."
        variant="none"
        class="w-full flex-1"
        :ui="{
          base: 'text-lg text-[#333333] leading-[2.2] tracking-wide resize-none p-0 bg-transparent min-h-[500px] text-justify custom-scrollbar',
          placeholder: 'placeholder:text-[#EAEAEA] placeholder:font-light'
        }"
        @input="autoSave"
      />
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 状态管理
const isSaving = ref(false)
const saveTimeout = ref<any>(null)

// 动态路由参数识别 (核心逻辑：区分是新建还是修改)
const postId = computed(() => route.query.id as string | undefined)
const isEditMode = computed(() => !!postId.value)

// 表单数据
const availableTags = ['实地游记', '学术探讨', '测绘笔记', '闲脉杂谈']
const selectedTag = ref('')
const postForm = ref({
  title: '',
  content: ''
})

// 表单校验：标题、内容、标签缺一不可
const isValid = computed(() => {
  return postForm.value.title.trim().length > 0 &&
    postForm.value.content.trim().length > 0 &&
    selectedTag.value !== ''
})

// 生命周期：初始化数据
onMounted(() => {
  if (isEditMode.value) {
    // 模拟从后端拉取旧数据
    fetchOldPostData(postId.value!)
  }
})

// 模拟接口：获取历史数据
const fetchOldPostData = (id: string) => {
  console.log(`向后端请求获取帖子 ID: ${id} 的数据...`)
  // 模拟网络延迟
  setTimeout(() => {
    postForm.value = {
      title: '上周刚去了趟佛光寺，震撼到失语',
      content: '终于打卡了梁思成先生口中的“中国第一国宝”。东大殿的七间面阔配上深远的檐出，那种唐代建筑独有的雄浑气度，在相机的取景器里根本装不下...\n\n建议大家如果去的话，一定要在下午日落前，看夕阳打在斗拱上的光影。'
    }
    selectedTag.value = '实地游记'
  }, 500)
}

// 防抖自动保存逻辑
const autoSave = () => {
  isSaving.value = true
  if (saveTimeout.value) clearTimeout(saveTimeout.value)

  saveTimeout.value = setTimeout(() => {
    // 这里可以接入真实的 localStorage 缓存或后端草稿箱 API
    console.log('草稿已自动保存:', postForm.value.title)
    isSaving.value = false
  }, 1500)
}

// 路由返回
const goBack = () => {
  // 如果有未保存的内容，可以做个弹窗拦截，此处做简写
  router.push('/forum')
}

// 提交发布
const publishPost = async () => {
  if (!isValid.value) return

  isSaving.value = true

  try {
    const payload = {
      ...postForm.value,
      tag: selectedTag.value,
      isAi: false // 标记为真人发帖
    }

    if (isEditMode.value) {
      console.log(`调用后端 PUT /api/posts/${postId.value} 接口`, payload)
    } else {
      console.log('调用后端 POST /api/posts 接口', payload)
    }

    // 模拟接口等待
    await new Promise(resolve => setTimeout(resolve, 800))

    // 成功后跳回论坛首页
    router.push('/forum')
  } catch (error) {
    console.error('发布失败', error)
  } finally {
    isSaving.value = false
  }
}

// 为了隐藏全局布局的 Header/Footer，推荐在页面级配置使用空白 layout (前提是你配置了 layouts/blank.vue)
// definePageMeta({ layout: 'blank' })
</script>

<style scoped>
/* 隐藏原生输入框聚焦时的默认外边框 */
input:focus {
  outline: none;
}

/* 优雅的滚动条 */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139, 43, 43, 0.1); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(139, 43, 43, 0.3); }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
