<template>
  <div class="h-full flex flex-col p-6 max-w-5xl mx-auto w-full relative z-10 overflow-y-auto custom-scrollbar">

    <Transition name="fade-slide" mode="out-in">
      <div v-if="step === 0" class="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full space-y-8 pb-10">
        <div class="text-center space-y-2 mb-2">
          <UIcon name="i-heroicons-map" class="w-12 h-12 text-[#8B2B2B] opacity-80 mx-auto mb-2" />
          <h2 class="text-3xl font-serif text-[#1A1412] dark:text-[#D4AF37] tracking-widest font-bold">智能路线规划</h2>
          <p class="text-[#5C4033] dark:text-[#D4AF37]/70 font-serif">告诉我们您的计划，AI 管家为您定制专属的“古建 + 红旅”路线。</p>
        </div>

        <div class="bg-[#FBF8F1]/80 dark:bg-[#1A1412]/80 backdrop-blur-md p-8 rounded-2xl border border-[#D4AF37]/30 shadow-lg space-y-8">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-[#D4AF37]/20">
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#8B2B2B] rotate-45"></span> 目的地 (省份或城市)
              </h3>
              <input
                v-model="form.destination"
                type="text"
                placeholder="例如：山西大同 / 陕西延安 / 北京"
                class="w-full bg-white/50 border border-[#D4AF37]/50 rounded-lg px-4 py-2.5 font-serif text-[#5C4033] outline-none focus:border-[#8B2B2B] transition-colors"
              >
            </div>
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-[#8B2B2B] rotate-45"></span> 游玩天数</span>
                <span class="text-[#D4AF37]">{{ form.days }} 天</span>
              </h3>
              <input type="range" min="1" max="7" v-model.number="form.days" class="w-full accent-[#8B2B2B] cursor-pointer mt-2">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-[#D4AF37]/20">
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#8B2B2B] rotate-45"></span> 出行人员
              </h3>
              <div class="flex flex-wrap gap-3">
                <button v-for="c in ['独自出行', '情侣/夫妻', '带老人/小孩', '朋友结伴']" :key="c" @click="form.companions = c"
                        class="px-4 py-1.5 rounded-md font-serif text-sm transition-all border"
                        :class="form.companions === c ? 'bg-[#8B2B2B] text-white border-[#8B2B2B]' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/20'">
                  {{ c }}
                </button>
              </div>
            </div>
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#8B2B2B] rotate-45"></span> 行程节奏
              </h3>
              <div class="flex flex-wrap gap-3">
                <button v-for="p in ['紧凑打卡', '劳逸结合', '深度慢游']" :key="p" @click="form.pace = p"
                        class="px-4 py-1.5 rounded-md font-serif text-sm transition-all border"
                        :class="form.pace === p ? 'bg-[#8B2B2B] text-white border-[#8B2B2B]' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/20'">
                  {{ p }}
                </button>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#8B2B2B] rotate-45"></span> 交通方式
              </h3>
              <div class="flex flex-wrap gap-3">
                <button v-for="t in ['自驾出行', '公共交通', '落地包车/打车']" :key="t" @click="form.transport = t"
                        class="px-4 py-1.5 rounded-md font-serif text-sm transition-all border"
                        :class="form.transport === t ? 'bg-[#8B2B2B] text-white border-[#8B2B2B]' : 'border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/20'">
                  {{ t }}
                </button>
              </div>
            </div>
            <div class="space-y-3">
              <h3 class="text-[#8B2B2B] font-bold font-serif text-lg flex items-center justify-between">
                <span class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-[#8B2B2B] rotate-45"></span> 路线偏好</span>
              </h3>
              <div class="pt-2 px-2">
                <input type="range" min="0" max="100" v-model.number="form.ratio" class="w-full accent-[#8B2B2B] cursor-pointer">
                <div class="flex justify-between text-xs text-[#5C4033]/80 font-serif mt-1">
                  <span>多看古建</span>
                  <span>均衡搭配</span>
                  <span>多看红旅</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center pt-2">
          <UButton @click="generateRoute" :disabled="!form.destination.trim()" class="bg-[#8B2B2B]! hover:bg-[#6D2121]! px-12 py-3 rounded-full font-serif tracking-[0.2em] text-lg shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50">
            开始生成路线
          </UButton>
        </div>
      </div>

      <div v-else-if="step === 1" class="flex-1 flex flex-col items-center justify-center space-y-6">
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full animate-spin"></div>
          <div class="absolute inset-0 border-4 border-[#8B2B2B] rounded-full animate-spin border-t-transparent" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
          <span class="font-serif text-[#8B2B2B] font-bold text-xl">印</span>
        </div>
        <p class="font-serif text-xl text-[#5C4033] tracking-widest animate-pulse">{{ loadingText }}</p>
      </div>

      <div v-else-if="step === 2 && routeResult" class="flex-1 flex flex-col max-w-4xl mx-auto w-full space-y-8 pb-12 animate-fade-in">

        <div class="bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] bg-[#EFE8D8] dark:bg-[#1A1412] p-8 rounded-2xl border border-[#D4AF37]/50 shadow-lg text-center relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B2B2B] to-transparent"></div>
          <h2 class="text-3xl font-serif text-[#8B2B2B] font-bold mb-4 tracking-widest">{{ routeResult.routeTitle }}</h2>
          <p class="font-serif text-[#5C4033] dark:text-[#D4AF37]/90 leading-loose text-lg max-w-3xl mx-auto">
            {{ routeResult.summary }}
          </p>
        </div>

        <div class="relative w-full py-8">
          <div class="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#D4AF37]/30 -translate-x-1/2"></div>

          <div v-for="(day, index) in routeResult.days" :key="index" class="mb-16 relative">
            <div class="absolute left-1/2 -top-6 -translate-x-1/2 bg-[#FBF8F1] px-6 py-1 border-2 border-[#8B2B2B] text-[#8B2B2B] font-serif font-bold rounded-full z-10 shadow-sm whitespace-nowrap">
              第 {{ day.dayNumber }} 天 · {{ day.theme }}
            </div>

            <div class="grid grid-cols-2 gap-12 mt-8">

              <div class="flex flex-col items-end text-right relative group">
                <div class="absolute right-[-29px] top-4 w-4 h-4 rounded-full border-4 border-[#FBF8F1] z-10 transition-colors duration-300"
                     :class="day.morning.type === '红色' ? 'bg-[#8B2B2B]' : 'bg-[#D4AF37]'"></div>

                <div class="bg-white/60 dark:bg-[#2A1F1D] p-5 rounded-xl border border-[#D4AF37]/30 w-full hover:shadow-md transition-shadow">
                  <div class="text-xs font-serif text-[#5C4033]/60 mb-2 flex justify-end gap-2 items-center">
                    <span>建议游玩: {{ day.morning.playTime }}</span>
                    <span class="px-2 py-0.5 rounded-sm text-white text-xs" :class="day.morning.type === '红色' ? 'bg-[#8B2B2B]' : 'bg-[#D4AF37]'">{{ day.morning.type }}</span>
                  </div>
                  <h4 class="font-serif text-xl text-[#1A1412] dark:text-[#D4AF37] font-bold mb-2">{{ day.morning.place }}</h4>
                  <p class="font-serif text-[#5C4033] text-sm leading-relaxed">{{ day.morning.highlight }}</p>
                </div>
              </div>

              <div class="flex flex-col items-start text-left relative group mt-16">
                <div class="absolute left-[-29px] top-4 w-4 h-4 rounded-full border-4 border-[#FBF8F1] z-10 transition-colors duration-300"
                     :class="day.afternoon.type === '红色' ? 'bg-[#8B2B2B]' : 'bg-[#D4AF37]'"></div>

                <div class="bg-white/60 dark:bg-[#2A1F1D] p-5 rounded-xl border border-[#D4AF37]/30 w-full hover:shadow-md transition-shadow">
                  <div class="text-xs font-serif text-[#5C4033]/60 mb-2 flex justify-start gap-2 items-center">
                    <span class="px-2 py-0.5 rounded-sm text-white text-xs" :class="day.afternoon.type === '红色' ? 'bg-[#8B2B2B]' : 'bg-[#D4AF37]'">{{ day.afternoon.type }}</span>
                    <span>建议游玩: {{ day.afternoon.playTime }}</span>
                  </div>
                  <h4 class="font-serif text-xl text-[#1A1412] dark:text-[#D4AF37] font-bold mb-2">{{ day.afternoon.place }}</h4>
                  <p class="font-serif text-[#5C4033] text-sm leading-relaxed">{{ day.afternoon.highlight }}</p>
                </div>
              </div>
            </div>

            <div class="mt-8 flex justify-center">
              <div class="w-2/3 bg-[#F5F0E6] dark:bg-[#1A1412] p-4 rounded-lg border-l-4 border-[#8B2B2B] shadow-sm text-sm font-serif space-y-2">
                <h5 class="text-[#8B2B2B] font-bold mb-2 flex items-center gap-1"><UIcon name="i-heroicons-light-bulb" /> 温馨提示</h5>
                <p v-if="day.practicalTips.transport" class="flex gap-2 text-[#5C4033]"><span class="shrink-0">🚗</span> {{ day.practicalTips.transport }}</p>
                <p v-if="day.practicalTips.dining" class="flex gap-2 text-[#5C4033]"><span class="shrink-0">🍜</span> {{ day.practicalTips.dining }}</p>
                <p v-if="day.practicalTips.warning" class="flex gap-2 text-[#8B2B2B]"><span class="shrink-0">⚠️</span> {{ day.practicalTips.warning }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-6 pt-4 border-t border-[#D4AF37]/20">
          <button @click="step = 0" class="text-[#5C4033] hover:text-[#8B2B2B] font-serif border border-transparent hover:border-[#8B2B2B]/30 px-6 py-2 rounded-full transition-all">
            重新规划
          </button>
          <button @click="alert('长图生成功能筹备中...')" class="bg-[#8B2B2B] text-white font-serif px-8 py-2 rounded-full shadow-md hover:bg-[#6D2121] transition-all flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-down-tray" /> 保存行程图
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const step = ref(0)
const loadingText = ref('')

// 表单默认数据，换成通俗的词汇
const form = reactive({
  destination: '山西忻州',
  days: 2,
  companions: '带老人/小孩',
  pace: '劳逸结合',
  transport: '公共交通',
  ratio: 50 // 0偏古建，100偏红色
})

const routeResult = ref<any>(null)

// 请在真实项目中将 Key 放到后端或环境变量中
const API_KEY = 'sk-f270d36ca67e43278ab9a501e40d4676'
const API_URL = 'https://api.deepseek.com/chat/completions'

const generateRoute = async () => {
  step.value = 1

  // Loading 文案调整为通俗易懂的表达
  const loadingTexts = ['正在搜索当地景点...', '正在为您规划交通和路线...', '正在整理当地美食推荐...', '正在生成专属行程单...']
  let textIdx = 0
  loadingText.value = loadingTexts[0]
  const textInterval = setInterval(() => {
    textIdx = (textIdx + 1) % loadingTexts.length
    loadingText.value = loadingTexts[textIdx]
  }, 1500)

  try {
    const preferenceStr = form.ratio < 30 ? '偏重参观古建' : form.ratio > 70 ? '偏重红色旅游' : '古建与红旅搭配'

    // Prompt 中增加了语气约束：通俗易懂、像现代导游
    const systemPrompt = `你是一位拥有10年经验的专业导游。请用通俗易懂、热情友好的大白话，根据用户的条件规划一条双轨（古建+红旅）旅游路线。
不要使用文言文或过于文绉绉的词汇，要像给朋友做攻略一样实用。

【条件约束】：
1. 每日景点距离必须合理。考虑交通方式：${form.transport}，人员：${form.companions}，节奏：${form.pace}。
2. 路线偏好：${preferenceStr}。
3. 你的回复必须是纯 JSON 格式，不含任何 Markdown，不含前言后语。

格式要求：
{
  "routeTitle": "路线名称(如：忻州2日游：古建与红旅经典路线)",
  "summary": "100字左右的通俗总览，说明为何这样安排，重点体现对人员和交通的实用关怀。",
  "days": [
    {
      "dayNumber": 1,
      "theme": "第一天的行程概括",
      "morning": {"place": "景点名", "type": "古建/红色", "playTime": "时长", "highlight": "通俗解释核心看点"},
      "afternoon": {"place": "景点名", "type": "古建/红色", "playTime": "时长", "highlight": "通俗解释核心看点"},
      "practicalTips": {"transport": "交通建议", "dining": "吃什么", "warning": "避坑提醒"}
    }
  ]
}`

    const userPrompt = `目的地：${form.destination}，天数：${form.days}天。`

    const response = await $fetch<any>(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
      body: {
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        temperature: 0.3
      }
    })

    let replyText = response.choices[0].message.content
    replyText = replyText.replace(/```json/g, '').replace(/```/g, '').trim()
    routeResult.value = JSON.parse(replyText)

  } catch (error) {
    console.error('AI 路线生成失败，使用兜底数据', error)
    // 兜底数据：文案全部重写，更加接地气和实用
    routeResult.value = {
      routeTitle: "山西忻州2日游：木构奇迹与抗战足迹",
      summary: `考虑到你们是【${form.companions}】且主要依靠【${form.transport}】，我们没有安排偏远难走的山区景点。这两天以繁峙和五台县为主，精选了交通方便的唐代古建和八路军旧址。行程【${form.pace}】，不用早起赶路，老人和小孩也能轻松跟着走，是一趟非常有教育意义的旅程。`,
      days: [
        {
          dayNumber: 1,
          theme: "探秘佛光寺与红色足迹",
          morning: { place: "佛光寺东大殿", type: "古建", playTime: "2小时", highlight: "这是一座有一千多年历史的唐代木建筑，当年梁思成和林徽因就是在这里发现了它，打破了日本人说中国没有唐代建筑的断言，非常震撼。" },
          afternoon: { place: "晋察冀军区司令部旧址", type: "红色", playTime: "2小时", highlight: "抗战时期聂荣臻元帅在这里住过，还指挥了平型关大捷等重要战役。里面保留了很多当年的老物件和照片，带孩子看很有意义。" },
          practicalTips: { transport: "坐高铁到五台山站后，打车或坐大巴直达佛光寺最方便。", dining: "中午推荐尝尝当地的特色炖台蘑，老人小孩都适合吃，不辣不腻。", warning: "佛光寺里面的台阶有点陡，上下的时候一定要扶好老人。" }
        },
        {
          dayNumber: 2,
          theme: "南禅寺与平型关的记忆",
          morning: { place: "南禅寺", type: "古建", playTime: "1.5小时", highlight: "中国现存最古老的木结构建筑，面积不大但非常有年代感，看看古人是怎么不用一根钉子就把房子盖得这么结实的。" },
          afternoon: { place: "平型关大捷纪念馆", type: "红色", playTime: "2.5小时", highlight: "在这里可以了解当年八路军是怎么打破日军“不可战胜”神话的。展馆内容很丰富，走在里面就像回到了那个热血的年代。" },
          practicalTips: { transport: "今天这两个地方距离有点远，如果带有老人小孩，建议今天包个车，省去等公交的麻烦。", dining: "中午可以在路过的镇上吃碗正宗的山西刀削面，好吃又管饱。", warning: "平型关在山里，下午可能风会比较大，记得给家人带件外套。" }
        }
      ]
    }
  } finally {
    clearInterval(textInterval)
    step.value = 2
  }
}
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139,43,43,0.2); border-radius: 4px; }
.animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
</style>
