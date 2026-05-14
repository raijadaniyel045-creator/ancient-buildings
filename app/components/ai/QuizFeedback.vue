<template>
  <div class="max-w-5xl mx-auto w-full flex flex-col gap-8 animate-fade-in pb-12 custom-scrollbar overflow-y-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div class="bg-[#FBF8F1] dark:bg-[#1A1412] p-6 rounded-2xl border border-[#D4AF37]/40 shadow-xl relative overflow-hidden h-full">
        <div class="absolute -right-10 -top-10 text-9xl text-[#8B2B2B] opacity-5 font-serif font-bold pointer-events-none">
          印
        </div>
        <h3 class="text-[#8B2B2B] font-serif text-xl mb-4 font-bold tracking-widest text-center">
          学士批注 · 能力星图
        </h3>
        <ClientOnly>
          <div
            ref="chartRef"
            class="w-full h-[320px]"
          />
        </ClientOnly>
      </div>

      <div class="space-y-6 h-full flex flex-col justify-between">
        <div class="bg-gradient-to-br from-[#8B2B2B] to-[#5C1B1B] p-6 rounded-xl shadow-lg text-[#FBF8F1] relative">
          <UIcon
            name="i-heroicons-chat-bubble-bottom-center-text"
            class="absolute top-4 right-4 w-8 h-8 text-[#D4AF37] opacity-20"
          />
          <h4 class="font-serif text-[#D4AF37] text-sm mb-2 tracking-widest border-b border-[#D4AF37]/30 pb-2 inline-block">
            宗师总评
          </h4>
          <p class="font-serif leading-relaxed text-lg tracking-wide mt-2">
            {{ feedbackData?.comment || '判卷中...' }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div class="bg-[#F5F0E6] dark:bg-[#2A1F1D] border-l-4 border-[#8B2B2B] p-4 rounded-r-lg shadow-sm">
            <h4 class="font-serif text-[#8B2B2B] text-sm font-bold mb-1 flex items-center gap-1">
              <UIcon
                name="i-heroicons-exclamation-triangle"
                class="w-4 h-4"
              /> 知识遗漏
            </h4>
            <p class="font-serif text-[#5C4033] dark:text-[#D4AF37] text-sm">
              {{ feedbackData?.gapAnalysis }}
            </p>
          </div>

          <div class="bg-[#F5F0E6] dark:bg-[#2A1F1D] border-l-4 border-[#D4AF37] p-4 rounded-r-lg shadow-sm">
            <h4 class="font-serif text-[#D4AF37] text-sm font-bold mb-1 flex items-center gap-1">
              <UIcon
                name="i-heroicons-book-open"
                class="w-4 h-4"
              /> 进阶指引
            </h4>
            <p class="font-serif text-[#5C4033] dark:text-[#D4AF37] text-sm">
              {{ feedbackData?.recommendation }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="feedbackData?.questionReviews?.length"
      class="bg-[#FBF8F1] dark:bg-[#1A1412] p-8 rounded-2xl border border-[#D4AF37]/40 shadow-xl relative"
    >
      <h3 class="text-[#8B2B2B] font-serif text-2xl mb-8 font-bold tracking-widest text-center flex items-center justify-center gap-4">
        <span class="w-12 h-[1px] bg-[#D4AF37]/50" />
        卷宗详批 · 逐题解析
        <span class="w-12 h-[1px] bg-[#D4AF37]/50" />
      </h3>

      <div class="space-y-8">
        <div
          v-for="(review, index) in feedbackData.questionReviews"
          :key="index"
          class="bg-[#F5F0E6]/50 dark:bg-[#2A1F1D]/50 p-6 rounded-xl border border-[#8B2B2B]/10 hover:border-[#8B2B2B]/30 transition-colors"
        >
          <div class="font-serif text-[#1A1412] dark:text-[#D4AF37] text-lg font-bold mb-5 leading-relaxed">
            <span class="bg-[#8B2B2B] text-white px-2.5 py-0.5 rounded-sm mr-2 text-sm">{{ index + 1 }}</span>
            {{ review.question }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div class="border-l-2 border-[#5C4033]/20 pl-4 py-1">
              <div class="text-xs text-[#5C4033]/60 mb-2 font-serif flex items-center gap-1">
                <UIcon
                  name="i-heroicons-pencil"
                  class="w-3.5 h-3.5"
                /> 学子作答
              </div>
              <div
                class="text-[#5C4033] dark:text-[#FBF8F1] font-serif leading-relaxed"
                :class="{ 'opacity-50 italic': !review.userAnswer || review.userAnswer === '未作答' }"
              >
                {{ review.userAnswer || '未交白卷' }}
              </div>
            </div>
            <div class="border-l-2 border-[#D4AF37] pl-4 py-1 bg-gradient-to-r from-[#D4AF37]/5 to-transparent">
              <div class="text-xs text-[#8B2B2B] mb-2 font-serif flex items-center gap-1 font-bold">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="w-3.5 h-3.5"
                /> 宗师正解
              </div>
              <div class="text-[#8B2B2B] dark:text-[#D4AF37] font-serif font-bold leading-relaxed">
                {{ review.correctAnswer }}
              </div>
            </div>
          </div>

          <div class="bg-white/60 dark:bg-black/20 p-4 rounded-lg text-[#5C4033] dark:text-[#D4AF37]/90 text-sm leading-loose flex gap-3 shadow-inner">
            <UIcon
              name="i-heroicons-light-bulb"
              class="w-5 h-5 shrink-0 text-[#D4AF37] mt-0.5"
            />
            <p class="font-serif">
              {{ review.explanation }}
            </p>
          </div>
        </div>
      </div>

      <div class="pt-10 text-center">
        <button
          class="text-[#8B2B2B] font-serif border border-[#8B2B2B] px-8 py-2.5 rounded-full hover:bg-[#8B2B2B] hover:text-[#FBF8F1] transition-all shadow-sm tracking-widest text-lg"
          @click="$emit('restart')"
        >
          拂卷重考
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  feedbackData: {
    type: Object,
    required: true
  }
})

defineEmits(['restart'])

const chartRef = ref(null)
let chartInstance: any = null

const initChart = () => {
  if (!chartRef.value || !props.feedbackData?.scores) return
  if (!chartInstance) { chartInstance = echarts.init(chartRef.value) }

  const { terminology, history, logic, accuracy } = props.feedbackData.scores
  const option = {
    radar: {
      indicator: [
        { name: '术语法式', max: 100 },
        { name: '历史沿革', max: 100 },
        { name: '营造逻辑', max: 100 },
        { name: '史实严谨', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 4,
      axisName: { color: '#5C4033', fontFamily: 'serif', fontSize: 13, fontWeight: 'bold' },
      splitArea: { areaStyle: { color: ['rgba(212,175,55,0.05)', 'rgba(212,175,55,0.1)', 'rgba(212,175,55,0.15)', 'rgba(212,175,55,0.2)'], shadowColor: 'rgba(0, 0, 0, 0.05)', shadowBlur: 10 } },
      axisLine: { lineStyle: { color: 'rgba(139,43,43,0.3)' } },
      splitLine: { lineStyle: { color: 'rgba(139,43,43,0.2)' } }
    },
    series: [{
      name: '能力星图',
      type: 'radar',
      data: [{
        value: [terminology, history, logic, accuracy],
        name: '本次考核得分',
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#8B2B2B' },
        areaStyle: { color: 'rgba(139,43,43, 0.4)' },
        lineStyle: { color: '#8B2B2B', width: 2 }
      }]
    }]
  }
  chartInstance.setOption(option)
}

onMounted(() => {
  setTimeout(initChart, 300)
  window.addEventListener('resize', () => { chartInstance?.resize() })
})

watch(() => props.feedbackData, () => {
  setTimeout(initChart, 300)
}, { deep: true })
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139,43,43,0.2); border-radius: 4px; }
</style>
