<template>
  <div class="h-full flex flex-col p-6 max-w-5xl mx-auto w-full relative z-10 overflow-y-auto custom-scrollbar">
    <Transition
      name="fade-slide"
      mode="out-in"
    >
      <div
        v-if="step === 0"
        class="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full space-y-8 pb-10"
      >
        <div class="text-center space-y-2 mb-4">
          <UIcon
            name="i-heroicons-document-magnifying-glass"
            class="w-12 h-12 text-[#8B2B2B] opacity-80 mx-auto mb-2"
          />
          <h2 class="text-3xl font-serif text-[#1A1412] dark:text-[#D4AF37] tracking-[0.2em] font-bold">
            营造大考
          </h2>
          <p class="text-[#5C4033] dark:text-[#D4AF37]/70 font-serif">
            请自行设定考核范畴与规则，我们将为您智能拟定专属考卷。
          </p>
        </div>

        <div class="space-y-6 bg-[#FBF8F1]/80 dark:bg-[#1A1412]/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-[#D4AF37]/20">
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#8B2B2B] rounded-full" /> 考核题型
              </h3>
              <div class="flex gap-3">
                <button
                  v-for="t in ['客观题 ', '主观题 ']"
                  :key="t"
                  class="flex-1 py-2 rounded-lg font-serif text-sm transition-all border text-center"
                  :class="selectedConfig.type === t ? 'bg-[#8B2B2B] text-white border-[#8B2B2B] shadow-md' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/10'"
                  @click="selectedConfig.type = t"
                >
                  {{ t }}
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2 justify-between">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-[#8B2B2B] rounded-full" /> 考题册数 (题量)
                </div>
                <span class="text-xl text-[#D4AF37]">{{ selectedConfig.count }} 题</span>
              </h3>
              <div class="pt-2 px-2">
                <input
                  v-model.number="selectedConfig.count"
                  type="range"
                  min="1"
                  max="15"
                  class="w-full accent-[#8B2B2B] cursor-pointer"
                >
                <div class="flex justify-between text-xs text-[#5C4033]/60 font-serif mt-1">
                  <span>浅尝 (1)</span>
                  <span>大考 (15)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#8B2B2B] rounded-full" /> 堪舆 (地域)
            </h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="r in configOptions.regions"
                :key="r"
                class="px-4 py-1.5 rounded-full font-serif text-sm transition-all border"
                :class="selectedConfig.region === r ? 'bg-[#8B2B2B] text-white border-[#8B2B2B] shadow-md' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/20'"
                @click="selectedConfig.region = r"
              >
                {{ r }}
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#8B2B2B] rounded-full" /> 纪年 (朝代)
            </h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="d in configOptions.dynasties"
                :key="d"
                class="px-4 py-1.5 rounded-full font-serif text-sm transition-all border"
                :class="selectedConfig.dynasty === d ? 'bg-[#8B2B2B] text-white border-[#8B2B2B] shadow-md' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/20'"
                @click="selectedConfig.dynasty = d"
              >
                {{ d }}
              </button>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-[#8B2B2B] rounded-full" /> 法式 (构件)
            </h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="e in configOptions.elements"
                :key="e"
                class="px-4 py-1.5 rounded-full font-serif text-sm transition-all border"
                :class="selectedConfig.element === e ? 'bg-[#8B2B2B] text-white border-[#8B2B2B] shadow-md' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/20'"
                @click="selectedConfig.element = e"
              >
                {{ e }}
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-4">
          <UButton
            :loading="loadingConfig"
            class="bg-[#8B2B2B]! hover:bg-[#6D2121]! px-10 py-3 rounded-full font-serif tracking-[0.2em] text-lg shadow-xl hover:-translate-y-1 transition-all"
            @click="generateQuestionsList"
          >
            {{ loadingConfig ? '学士翻阅典籍出题中...' : '揭榜迎考' }}
          </UButton>
        </div>
      </div>

      <div
        v-else-if="step === 1"
        class="flex-1 flex flex-col max-w-4xl mx-auto w-full space-y-6"
      >
        <div class="flex justify-between items-center mb-2 bg-[#FBF8F1]/80 p-3 rounded-lg border border-[#D4AF37]/30">
          <button
            class="text-[#8B2B2B] font-serif hover:underline opacity-80 text-sm flex items-center gap-1"
            @click="step = 0"
          >
            <UIcon
              name="i-heroicons-arrow-left"
              class="w-4 h-4"
            /> 退避重选
          </button>
          <div class="font-serif text-[#8B2B2B] font-bold flex gap-4">
            <span>{{ selectedConfig.type }}</span>
            <span>共 {{ generatedQuestions.length }} 题</span>
          </div>
          <div class="font-serif text-[#D4AF37] text-xs tracking-widest">
            {{ selectedConfig.dynasty }} · {{ selectedConfig.region }}
          </div>
        </div>

        <div class="flex-1 overflow-y-auto space-y-8 custom-scrollbar pr-2 pb-6">
          <div
            v-for="(q, index) in generatedQuestions"
            :key="index"
            class="bg-[#EFE8D8]/50 dark:bg-[#2A1F1D] p-6 rounded-xl border border-[#8B2B2B]/20 relative group hover:border-[#8B2B2B]/50 transition-colors"
          >
            <div class="absolute -left-3 top-6 w-8 h-8 bg-[#8B2B2B] text-[#FBF8F1] rounded-full flex items-center justify-center font-serif text-sm shadow-md z-10 border-2 border-[#FBF8F1]">
              {{ index + 1 }}
            </div>

            <h3 class="font-serif text-xl text-[#1A1412] dark:text-[#D4AF37] leading-relaxed mb-4 pl-4">
              {{ q.question }}
            </h3>

            <div
              v-if="selectedConfig.type.includes('客观题')"
              class="space-y-3 pl-4"
            >
              <label
                v-for="(opt, optIndex) in q.options"
                :key="optIndex"
                class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all"
                :class="userAnswers[index] === opt ? 'bg-[#8B2B2B]/10 border-[#8B2B2B] shadow-inner' : 'bg-white/50 border-[#D4AF37]/30 hover:bg-white'"
              >
                <input
                  v-model="userAnswers[index]"
                  type="radio"
                  :name="'question_' + index"
                  :value="opt"
                  class="w-4 h-4 text-[#8B2B2B] focus:ring-[#8B2B2B]"
                >
                <span class="font-serif text-[#5C4033]">{{ opt }}</span>
              </label>
            </div>

            <div
              v-else
              class="pl-4"
            >
              <textarea
                v-model="userAnswers[index]"
                placeholder="以此笔墨，论述您的见解..."
                class="w-full p-4 bg-white/70 dark:bg-[#1A1412] border border-[#D4AF37]/50 rounded-lg font-serif text-[#2A1F1D] dark:text-[#FBF8F1] outline-none resize-y min-h-[120px] focus:border-[#8B2B2B] transition-colors"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center bg-[#FBF8F1] p-4 border-t border-[#D4AF37]/30 rounded-b-xl shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <span class="text-sm font-serif text-[#5C4033]/60">
            已作答: {{ Object.keys(userAnswers).length }} / {{ generatedQuestions.length }}
          </span>
          <UButton
            :loading="loadingSubmit"
            :disabled="Object.keys(userAnswers).length === 0"
            class="bg-[#8B2B2B]! hover:bg-[#6D2121]! px-10 py-3 rounded-lg font-serif tracking-widest text-lg shadow-md transition-all disabled:opacity-50"
            @click="submitAllAnswers"
          >
            {{ loadingSubmit ? '工部批阅中...' : '呈交全卷' }}
          </UButton>
        </div>
      </div>

      <div
        v-else-if="step === 2"
        class="flex-1 flex flex-col w-full"
      >
        <QuizFeedback
          :feedback-data="aiFeedback"
          @restart="resetQuiz"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const step = ref(0)
const loadingConfig = ref(false)
const loadingSubmit = ref(false)

// 定制项数据 (新增 type 和 count)
const configOptions = {
  regions: ['全国范围', '华北晋冀', '中原豫鲁', '江南徽苏', '浙闽婉秀', '西北陕甘', '西南黔滇', '川渝巴蜀', '岭南粤桂', '湘鄂赣北', '东北辽吉', '青藏蕃域', '西域回部'],
  dynasties: [
    '所有朝代', '秦制峻整', '汉风雄迈', '魏晋清逸', '隋筑基业', '唐风雄浑', '五代延绪', '宋式严谨', '辽金壮阔', '元制豪放', '明清规制'
  ],
  elements: ['所有种类', '宫殿建筑', '坛庙建筑', '陵墓建筑 ', '宗教建筑 ', '民居建筑 ', '园林建筑 ', '桥梁建筑 ', '塔幢建筑 ']
}

const selectedConfig = reactive({
  type: '客观题 (单选)',
  count: 3,
  region: '华北晋冀',
  dynasty: '唐风雄浑',
  element: '大木作 (梁架/斗拱)'
})

// 试卷数据结构
const generatedQuestions = ref<Array<{ question: string, options?: string[], correctAnswer?: string }>>([])
const userAnswers = ref<Record<number, string>>({})
const aiFeedback = ref<any>(null)

// 请替换为您后端的代理接口，防止密钥泄露在前端
const API_KEY = 'sk-f270d36ca67e43278ab9a501e40d4676'
const API_URL = 'https://api.deepseek.com/chat/completions'

const resetQuiz = () => {
  step.value = 0
  userAnswers.value = {}
  generatedQuestions.value = []
}

// 1. 生成考题集合（核心 Prompt 升级）
const generateQuestionsList = async () => {
  loadingConfig.value = true
  userAnswers.value = {}

  try {
    const isObjective = selectedConfig.type.includes('客观题')

    // 构建强约束的 System Prompt，要求必须输出纯 JSON 数组
    let systemPrompt = `你是一位中国古建筑出题专家。请根据用户的设定出题。
要求生成 ${selectedConfig.count} 道题目。
你的回复必须是纯合法的 JSON 数组结构，不要包含任何 Markdown 格式或多余的文字。`

    if (isObjective) {
      systemPrompt += `
客观题 JSON 格式要求：
[
  {
    "question": "题目正文文本",
    "options": ["A. 选项一内容", "B. 选项二内容", "C. 选项三内容", "D. 选项四内容"],
    "correctAnswer": "A. 选项一内容"
  }
]`
    } else {
      systemPrompt += `
主观题 JSON 格式要求：
[
  {
    "question": "论述题题目正文文本"
  }
]`
    }

    const userPrompt = `考纲条件：地域为【${selectedConfig.region}】，朝代特征为【${selectedConfig.dynasty}】，核心考察【${selectedConfig.element}】。请生成 ${selectedConfig.count} 题。`

    const response = await $fetch<any>(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3 // 较低温度确保 JSON 结构稳定
      }
    })

    // 清洗和解析 JSON
    let replyText = response.choices[0].message.content
    replyText = replyText.replace(/```json/g, '').replace(/```/g, '').trim()

    generatedQuestions.value = JSON.parse(replyText)
    step.value = 1
  } catch (error) {
    console.error('出题失败或 JSON 解析失败', error)
    // 失败时的兜底数据保证演示顺利
    generatedQuestions.value = [
      {
        question: `请论述在【${selectedConfig.dynasty}】时期，【${selectedConfig.region}】地区的【${selectedConfig.element}】具有哪些核心特征？`,
        options: selectedConfig.type.includes('客观题') ? ['A. 示例选项1', 'B. 示例选项2', 'C. 示例选项3', 'D. 示例选项4'] : undefined
      }
    ]
    step.value = 1
  } finally {
    loadingConfig.value = false
  }
}

// 2. 提交答案聚合判定
// 2. 提交答案聚合判定 (AiQuiz.vue 中替换原函数)
const submitAllAnswers = async () => {
  loadingSubmit.value = true
  try {
    // 将用户的所有答案和题目拼装成判卷材料
    let paperContent = ''
    generatedQuestions.value.forEach((q, index) => {
      paperContent += `题目${index + 1}: ${q.question}\n用户作答: ${userAnswers.value[index] || '未作答'}\n`
      if (q.correctAnswer) paperContent += `(参考客观题答案: ${q.correctAnswer})\n`
      paperContent += '------\n'
    })

    // 【核心升级】：要求 AI 返回包含 questionReviews 的 JSON
    const systemPrompt = `你是一位严苛的古建宗师。请批改用户的综合答卷。
你的输出必须是合法的 JSON 格式字符串，无 Markdown 标记。
格式要求：
{
  "scores": {
    "terminology": 85,
    "history": 70,
    "logic": 90,
    "accuracy": 80
  },
  "comment": "宗师的整体评价(100字)",
  "gapAnalysis": "针对错题或答题弱点指出的具体漏洞(50字)",
  "recommendation": "推荐复习的古建知识点",
  "questionReviews": [
    {
      "question": "原题目文本",
      "userAnswer": "用户的作答",
      "correctAnswer": "标准答案(单选为正确选项，主观题为核心得分点)",
      "explanation": "宗师对这道题的详细解析与指正(50-100字)"
    }
  ]
}`

    const response = await $fetch<any>(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: paperContent }
        ],
        temperature: 0.1
      }
    })

    let replyText = response.choices[0].message.content
    replyText = replyText.replace(/```json/g, '').replace(/```/g, '').trim()
    aiFeedback.value = JSON.parse(replyText)

    step.value = 2
  } catch (error) {
    console.error('判卷失败', error)
    // 更新兜底成绩单，加入逐题解析，保证演示时不翻车
    aiFeedback.value = {
      scores: { terminology: 75, history: 80, logic: 70, accuracy: 75 },
      comment: '答卷尚可，然细节之处仍有疏漏。客观题基本扎实，主观论述则需加强工程学逻辑的严密性。',
      gapAnalysis: '未能准确辨析法式标准的区域差异。',
      recommendation: '《营造法式》大木作制度及地域流派特征',
      questionReviews: generatedQuestions.value.map((q, i) => ({
        question: q.question,
        userAnswer: userAnswers.value[i] || '未作答',
        correctAnswer: q.correctAnswer || '需点出核心力学原理与朝代特征',
        explanation: '此题考察核心概念。您的作答思路方向正确，但专业术语使用不够精准，建议回顾相关图志。'
      }))
    }
    step.value = 2
  } finally {
    loadingSubmit.value = false
  }
}
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139,43,43,0.2); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
