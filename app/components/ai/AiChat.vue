<template>
  <div class="relative flex h-full overflow-hidden">
    <div class="flex-1 flex flex-col max-w-5xl mx-auto z-10 p-6 w-full relative">
      <div class="flex justify-end mb-4">
        <button
          class="text-[#8B2B2B]/60 hover:text-[#8B2B2B] text-sm font-serif transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-[#8B2B2B]/10 cursor-pointer"
          :disabled="messages.length <= 1"
          :class="{ 'opacity-0 pointer-events-none': messages.length <= 1 }"
          @click="clearChat"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            class="w-4 h-4"
          /> 拂去尘迹
        </button>
      </div>

      <div class="flex-1 overflow-y-auto space-y-8 custom-scrollbar pb-10 px-4">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
        >
          <div
            v-if="msg.role === 'assistant'"
            class="flex gap-4 max-w-[90%] group"
          >
            <div class="shrink-0 w-12 h-12 border border-[#8B2B2B]/80 rounded-sm flex items-center justify-center bg-[#FBF8F1] shadow-[2px_2px_0_rgba(139,43,43,0.2)] transition-transform group-hover:-translate-y-0.5">
              <span class="text-[#8B2B2B] font-serif text-lg font-bold leading-none text-center">古建<br>印</span>
            </div>
            <div class="flex flex-col gap-2 pt-1">
              <div
                v-if="msg.content"
                class="font-serif text-lg text-[#1A1412] dark:text-[#D4AF37] leading-loose tracking-wide ink-bleed-effect"
                v-html="parseContent(msg.content)"
              />
              <div
                v-if="loading && index === messages.length - 1 && !msg.content"
                class="flex gap-2 items-center h-8 opacity-60 pl-2"
              >
                <span class="w-2 h-2 rounded-full bg-[#8B2B2B] animate-bounce" />
                <span class="w-2 h-2 rounded-full bg-[#8B2B2B] animate-bounce [animation-delay:0.15s]" />
                <span class="w-2 h-2 rounded-full bg-[#8B2B2B] animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </div>

          <div
            v-else
            class="max-w-[80%] bg-gradient-to-br from-[#8B2B2B] to-[#6D2121] text-[#FBF8F1] p-5 rounded-l-2xl rounded-tr-xl font-serif shadow-lg border-r-4 border-[#D4AF37] tracking-widest leading-relaxed transition-all hover:shadow-xl"
          >
            {{ msg.content }}
          </div>
        </div>
      </div>

      <div
        v-if="messages.length <= 1 || (!loading && messages.length % 2 === 1)"
        class="flex flex-wrap gap-3 justify-center mb-6 opacity-90 transition-all"
      >
        <button
          v-for="prompt in quickPrompts"
          :key="prompt"
          class="px-5 py-2 border border-[#D4AF37]/50 rounded-full text-[#5C4033] dark:text-[#D4AF37] font-serif text-sm hover:bg-[#D4AF37]/15 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-[#FBF8F1]/50 backdrop-blur-sm"
          @click="useQuickPrompt(prompt)"
        >
          {{ prompt }}
        </button>
      </div>

      <div class="bg-[#FBF8F1]/95 dark:bg-[#1A1412]/95 backdrop-blur-xl border border-[#D4AF37]/50 rounded-2xl p-3 flex gap-4 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.03)] focus-within:border-[#8B2B2B] transition-colors">
        <UTextarea
          v-model="inputMessage"
          placeholder="以此笔墨，扣问营造成法..."
          variant="none"
          class="flex-1 font-serif text-[#2A1F1D]! dark:text-[#D4AF37]! text-lg outline-none ring-0 bg-transparent resize-none px-2"
          autoresize
          :rows="1"
          @keydown.enter.prevent="sendMessage"
        />
        <UButton
          :disabled="loading || !inputMessage.trim()"
          class="bg-[#8B2B2B]! hover:bg-[#6D2121]! disabled:bg-[#8B2B2B]/40! px-8! py-3! rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center group"
          @click="sendMessage"
        >
          <template #leading>
            <UIcon
              name="i-heroicons-check-badge"
              class="w-5 h-5 text-[#D4AF37]! group-hover:rotate-12 transition-transform"
            />
          </template>
          <span class="font-serif tracking-[0.3em] font-bold text-[#FBF8F1]">钤印</span>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Role = 'user' | 'assistant' | 'system'
interface Message { role: Role, content: string }
interface ChatChoice { message: { content: string } }
interface ChatResponse { choices: ChatChoice[] }

const termDict: Record<string, string> = {
  斗拱: '中国古代建筑特有的结构，位于柱顶、额枋与屋檐之间。',
  大木作: '古建筑中木造骨架的统称，负责支撑结构。',
  营造法式: '北宋李诫编著，是中国古代最完整的建筑技术百科全书。',
  榫卯: '利用木件凹凸处理进行连接的古建筑结构。'
}
const termRegex = new RegExp(`(${Object.keys(termDict).join('|')})`, 'g')

const quickPrompts = [
  '何为斗拱？其精妙之处何在？',
  '请为我解析唐代大木作之美。',
  '中国古建中的榫卯结构有何力学优势？'
]

const inputMessage = ref('')
const loading = ref(false)

const initialMessage: Message = {
  role: 'assistant' as Role,
  content: '尊驾光临。我是此间的古建营造助手，不知今日想探讨哪处瑰宝的榫卯咬合，或是哪段朝代的木构变迁？'
}
const messages = ref<Message[]>([{ ...initialMessage }])

// 演示用密钥，实际生产需移至后端
const API_KEY = 'sk-f270d36ca67e43278ab9a501e40d4676'
const API_URL = 'https://api.deepseek.com/chat/completions'

const clearChat = () => {
  if (loading.value) return
  messages.value = [{ ...initialMessage }]
}

const useQuickPrompt = (prompt: string) => {
  inputMessage.value = prompt
  sendMessage()
}

const parseContent = (content: string) => {
  if (!content) return ''
  return content.replace(termRegex, (match) => {
    return `<span class="text-[#8B2B2B] font-bold border-b border-[#8B2B2B]/40 cursor-help hover:bg-[#8B2B2B]/10 transition-colors px-0.5 rounded-sm" title="${termDict[match] || ''}">${match}</span>`
  })
}

const sendMessage = async () => {
  const text = inputMessage.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user' as Role, content: text })
  inputMessage.value = ''
  loading.value = true

  messages.value.push({ role: 'assistant' as Role, content: '' })
  const aiMessageIndex = messages.value.length - 1

  try {
    const payloadMessages = [
      { role: 'system', content: '你是一位精通中国古建筑的专家，言辞儒雅。请在回复中多使用古建术语，解答用户的疑问。' },
      ...messages.value.slice(0, -1).map(m => ({ role: m.role, content: m.content }))
    ]

    const response = await $fetch<ChatResponse>(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: { model: 'deepseek-chat', messages: payloadMessages, temperature: 0.7 }
    })

    if (response.choices && response.choices.length > 0) {
      messages.value[aiMessageIndex].content = response.choices[0].message.content
    } else {
      throw new Error('API 响应体结构异常')
    }
  } catch (error: unknown) {
    console.error('API Error:', error)
    messages.value[aiMessageIndex].content = '思绪受阻，未能成功查阅典籍，请稍后重试。'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.ink-bleed-effect {
  filter: url(#ink-bleed);
  animation: inkAppear 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes inkAppear {
  0% { opacity: 0; filter: blur(3px); transform: translateY(4px); }
  100% { opacity: 1; filter: blur(0px); transform: translateY(0); }
}
</style>
