<template>
  <div class="grid grid-cols-12 gap-6 min-h-[750px] bg-[#0A0807] p-6 relative overflow-hidden">
    <!-- 全局环境光晕 -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

    <!-- 注入水墨滤镜 -->
    <svg style="display: none;">
      <filter id="ink-bleed-story">
        <feGaussianBlur
          in="SourceGraphic"
          stdDeviation="0.4"
        />
        <feColorMatrix
          type="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
        />
      </filter>
    </svg>

    <!-- ================= 左侧 (3/12)：日签与影像 ================= -->
    <div class="col-span-3 flex flex-col gap-6 z-10">
      <!-- 电子日签 -->
      <div class="bg-[#1A1412]/90 backdrop-blur-md border border-[#D4AF37]/30 p-6 rounded-lg relative shadow-[0_8px_30px_rgba(0,0,0,0.5)] group overflow-hidden">
        <div class="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#D44A4A] to-[#8B2B2B]" />
        <div class="flex justify-between items-end mb-5 border-b border-[#D4AF37]/15 pb-4">
          <div class="flex flex-col gap-1">
            <span class="text-[#D4AF37] text-xs font-serif tracking-[0.3em] opacity-80">{{ almanac.lunarMonth }}</span>
            <span class="text-[#FBF8F1] text-3xl font-serif font-bold tracking-wider">{{ almanac.dateStr }}</span>
          </div>
          <!-- 动态古印章 -->
          <div class="w-12 h-12 border-[2px] border-[#D44A4A] text-[#D44A4A] flex items-center justify-center font-serif text-sm font-bold rotate-[-8deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 shadow-[inset_0_0_8px_rgba(212,74,74,0.2)]">
            今日<br>营造
          </div>
        </div>
        <div class="space-y-3 font-serif text-sm">
          <p class="text-[#D44A4A] tracking-widest flex items-center gap-2">
            <UIcon
              name="i-heroicons-check-circle"
              class="w-4 h-4"
            />{{ almanac.suit }}
          </p>
          <p class="text-[#FBF8F1]/40 tracking-widest flex items-center gap-2">
            <UIcon
              name="i-heroicons-x-circle"
              class="w-4 h-4"
            />{{ almanac.avoid }}
          </p>
        </div>
      </div>

      <!-- 历史影像 -->
      <div class="flex-1 bg-[#0F0C0B] border border-[#D4AF37]/20 rounded-lg overflow-hidden relative group shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <div class="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay z-10 pointer-events-none" />
        <img
          :src="todayStory.heroImage"
          alt="历史影像"
          class="w-full h-full object-cover grayscale contrast-125 opacity-70 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
        >
        <!-- 影像信息遮罩 -->
        <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#050403] via-[#050403]/80 to-transparent z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <div class="inline-block border border-[#D4AF37]/40 px-3 py-1 bg-[#1A1412]/80 backdrop-blur-sm">
            <span class="text-[#D4AF37] font-serif text-xs tracking-widest">{{ todayStory.dynasty }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= 右侧 (9/12)：故事与 AI 枢纽 ================= -->
    <div class="col-span-9 flex flex-col gap-6 z-10">
      <!-- 奏折正文区 -->
      <div class="flex-1 bg-[#1A1412]/80 backdrop-blur-md border border-[#D4AF37]/20 p-10 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex flex-row-reverse gap-10 relative overflow-hidden">
        <!-- 纹理装饰 -->
        <UIcon
          name="i-heroicons-book-open"
          class="absolute -right-12 -bottom-12 w-80 h-80 text-[#D4AF37]/5 pointer-events-none"
        />

        <!-- 竖排标题 -->
        <div class="flex flex-col items-center border-l border-[#D4AF37]/15 pl-8">
          <h2 class="writing-vertical-rl text-4xl text-[#D44A4A] font-serif tracking-[0.25em] font-bold drop-shadow-md">
            {{ todayStory.title }}
          </h2>
        </div>

        <!-- 正文流 -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          class="story-content flex-1 text-[#FBF8F1]/85 font-serif text-lg leading-[2.2] tracking-wider overflow-y-auto custom-scrollbar pr-8 text-justify"
          v-html="parsedContent"
        />
      </div>

      <!-- AI 交互舱 (深度重构) -->
      <div class="h-[240px] bg-gradient-to-br from-[#1A1412] to-[#0A0807] border border-[#8B2B2B]/40 rounded-lg shadow-[0_0_20px_rgba(139,43,43,0.15)] flex flex-col overflow-hidden relative transition-all duration-300 focus-within:border-[#D44A4A] focus-within:shadow-[0_0_25px_rgba(212,74,74,0.2)]">
        <!-- 头部状态栏 -->
        <div class="px-5 py-3 bg-[#8B2B2B]/10 border-b border-[#8B2B2B]/30 flex justify-between items-center">
          <span class="flex items-center gap-2 text-[#D4AF37] font-serif text-sm tracking-widest font-bold">
            <UIcon
              name="i-heroicons-sparkles"
              class="w-5 h-5 text-[#D44A4A]"
            />
            太虚幻境 · 历史扣问
          </span>
          <span class="text-[#FBF8F1]/30 text-xs font-mono bg-black/50 px-2 py-0.5 rounded">DeepSeek-V3</span>
        </div>

        <div class="flex-1 flex p-5 gap-6">
          <!-- 提问区 -->
          <div class="w-1/3 flex flex-col gap-3">
            <div class="relative flex-1 group">
              <UTextarea
                v-model="aiQuery"
                :placeholder="`关于《${todayStory.title.split('：')[0]}》，您有何疑问？`"
                variant="none"
                class="w-full h-full bg-[#050403] border border-[#D4AF37]/20 rounded-md p-2 focus-within:border-[#D44A4A] transition-colors custom-scrollbar"
                :ui="{
                  base: '!text-[#FBF8F1] font-serif tracking-widest leading-loose resize-none',
                  placeholder: 'placeholder:!text-[#FBF8F1]/20'
                }"
                @keydown.enter.prevent="askAI"
              />
              <!-- 快捷词条悬浮 -->
              <div
                v-if="!aiQuery && !loading"
                class="absolute bottom-3 left-3 text-[#FBF8F1]/20 text-xs font-serif pointer-events-none"
              >
                试问：工艺、年代、人物...
              </div>
            </div>
            <UButton
              :disabled="loading || !aiQuery.trim()"
              class="w-full bg-[#8B2B2B]! hover:bg-[#6D2121]! disabled:bg-[#8B2B2B]/40! disabled:cursor-not-allowed justify-center font-serif tracking-[0.2em] py-2.5 rounded-md transition-all active:scale-[0.98]"
              @click="askAI"
            >
              <template v-if="loading">
                <UIcon
                  name="i-heroicons-arrow-path"
                  class="w-4 h-4 animate-spin mr-1"
                /> 推演中
              </template>
              <template v-else>
                递交卷宗
              </template>
            </UButton>
          </div>

          <!-- 答复区 -->
          <div class="w-2/3 bg-[#050403] border border-[#D4AF37]/15 rounded-md p-5 overflow-y-auto custom-scrollbar font-serif text-sm leading-[1.8] relative shadow-inner">
            <!-- 初始空状态 -->
            <div
              v-if="!aiResponse && !loading"
              class="absolute inset-0 flex flex-col items-center justify-center opacity-30"
            >
              <UIcon
                name="i-heroicons-chat-bubble-bottom-center-text"
                class="w-10 h-10 mb-2 text-[#D4AF37]"
              />
              <span class="tracking-[0.2em] text-[#D4AF37]">等待落笔</span>
            </div>

            <!-- 加载状态 -->
            <div
              v-if="loading"
              class="h-full flex flex-col justify-center gap-3 opacity-80 pl-2"
            >
              <div class="flex gap-2 items-center text-[#8B2B2B]">
                <span class="w-2 h-2 bg-[#8B2B2B] rounded-full animate-bounce" />
                <span class="w-2 h-2 bg-[#8B2B2B] rounded-full animate-bounce [animation-delay:0.15s]" />
                <span class="w-2 h-2 bg-[#8B2B2B] rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
              <span class="text-xs text-[#D4AF37]/50 tracking-widest animate-pulse">正在翻阅营造档案...</span>
            </div>

            <!-- AI 回复内容 (应用水墨滤镜与高亮) -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              v-else-if="aiResponse"
              class="text-[#FBF8F1]/90 ai-ink-effect"
              v-html="parseContent(aiResponse)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDailyStory } from '~/composables/useDailyStory'

const { todayStory, almanac } = useDailyStory()

// --- 严格类型定义 ---
interface ChatChoice {
  message: { content: string }
}
interface ChatResponse {
  choices: ChatChoice[]
}

const termDict: Record<string, string> = {
  斗拱: '中国古代建筑特有的结构，位于柱顶、额枋与屋檐之间。',
  大木作: '古建筑中木造骨架的统称，负责支撑结构。',
  单檐悬山顶: '屋顶形制之一，仅有一层屋檐，两侧山墙凹进屋顶。',
  面阔: '古建筑正立面相邻两柱之间的距离。',
  榫卯: '利用木件凹凸处理进行连接的古建筑结构。',
  营造法式: '北宋李诫编著，是中国古代建筑技术百科全书。'
}
const termRegex = new RegExp(`(${Object.keys(termDict).join('|')})`, 'g')

const parseContent = (text: string) => {
  if (!text) return ''
  const highlighted = text.replace(termRegex, (match) => {
    return `<span class="text-[#D44A4A] border-b border-[#D44A4A]/30 cursor-help hover:bg-[#D44A4A]/20 transition-colors px-0.5" title="${termDict[match] || ''}">${match}</span>`
  })
  return highlighted.split('\n\n').map(p => `<p class="mb-4 last:mb-0">${p}</p>`).join('')
}

const parsedContent = computed(() => parseContent(todayStory.value.content))

// --- 状态锁与 AI 核心逻辑 ---
const aiQuery = ref('')
const aiResponse = ref('')
const loading = ref(false)

// 替换为真实 API 配置
const API_KEY = 'sk-f270d36ca67e43278ab9a501e40d4676'
const API_URL = 'https://api.deepseek.com/chat/completions'

const askAI = async () => {
  const query = aiQuery.value.trim()

  // 【状态锁】：防止重复提交与空请求
  if (!query || loading.value) return

  loading.value = true
  aiResponse.value = '' // 清理旧数据

  try {
    const response = await $fetch<ChatResponse>(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是一位严谨的古建史学家。请基于当前故事主题《${todayStory.value.title}》，客观、简练地回答用户的问题。务必严谨，字数控制在 250 字以内，多使用建筑专业术语。`
          },
          { role: 'user', content: query }
        ],
        temperature: 0.3 // 降低温度，确保回答严谨不发散
      }
    })

    if (response.choices && response.choices.length > 0) {
      aiResponse.value = response.choices[0].message.content
    } else {
      throw new Error('响应格式错误')
    }
  } catch (error: unknown) {
    console.error('AI Error:', error)
    aiResponse.value = '大语言模型推演受阻，请检查网络连接或后端密钥配置。'
  } finally {
    // 【释放锁】
    loading.value = false
    aiQuery.value = '' // 提问成功后清空输入框
  }
}
</script>

<style scoped>
.writing-vertical-rl {
  writing-mode: vertical-rl;
}

/* 首字下沉设计增强 */
:deep(.story-content p:first-of-type::first-letter) {
  float: left;
  font-size: 3.8em;
  line-height: 0.85;
  padding-top: 6px;
  padding-right: 12px;
  padding-left: 2px;
  color: #D44A4A;
  font-weight: bold;
  text-shadow: 2px 2px 0 rgba(139,43,43,0.2);
}

/* 滚动条美化 */
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.2);
  border-radius: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.4);
}
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }

/* AI 回复的水墨入场动画 */
.ai-ink-effect {
  filter: url(#ink-bleed-story);
  animation: inkAppear 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes inkAppear {
  0% { opacity: 0; filter: blur(4px); transform: translateY(8px); }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0); }
}
</style>
