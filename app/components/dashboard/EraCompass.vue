<template>
  <ClientOnly>
    <div class="relative w-full h-full min-h-[300px]">
      <VChart
        style="width: 100%; height: 100%;"
        :option="chartOption"
        autoresize
        @click="handleClick"
      />
      <!-- 罗盘中心的装饰锚点 -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D44A4A] shadow-[0_0_15px_#D44A4A] pointer-events-none border-2 border-[#1A1412]" />
    </div>

    <template #fallback>
      <div class="flex items-center justify-center h-[300px] text-[#D4AF37]/50 font-serif">
        罗盘校准中...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TooltipComponent])

const props = defineProps({
  // 接收当前激活的朝代
  activeEra: {
    type: String,
    default: '隋唐五代'
  }
})

const emit = defineEmits(['eraSelected'])

// 九大纪元（顺时针排列）
const ERAS = ['远古及先秦', '秦汉', '魏晋南北朝', '隋唐五代', '宋辽金', '元', '明', '清', '近现代']
// 装饰用的天干地支/八卦词（仅为视觉效果）
const DECORATIONS = ['乾', '坎', '艮', '震', '巽', '离', '坤', '兑', '天']

const chartOption = computed(() => {
  // 构建外层真实的交互数据
  const outerData = ERAS.map((era) => {
    const isActive = era === props.activeEra
    return {
      name: era,
      value: 10, // 均分圆环
      itemStyle: {
        // 选中时为刺眼的朱砂红，未选中为暗褐金
        color: isActive ? '#D44A4A' : 'rgba(42, 31, 29, 0.8)',
        borderColor: '#D4AF37',
        borderWidth: isActive ? 2 : 1,
        shadowBlur: isActive ? 20 : 0,
        shadowColor: '#D44A4A'
      },
      label: {
        color: isActive ? '#FBF8F1' : '#D4AF37',
        fontWeight: isActive ? 'bold' : 'normal',
        fontSize: isActive ? 14 : 12
      }
    }
  })

  // 构建内层神秘装饰数据
  const innerData = DECORATIONS.map(text => ({
    name: text,
    value: 10,
    itemStyle: { color: 'transparent', borderColor: 'rgba(212, 175, 55, 0.3)', borderWidth: 1 },
    label: { color: 'rgba(212, 175, 55, 0.5)', fontSize: 10 }
  }))

  return {
    tooltip: { show: false }, // 罗盘不需要悬浮提示，它是控制器
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    series: [
      // 1. 外层：朝代交互环
      {
        type: 'pie',
        radius: ['55%', '75%'],
        center: ['50%', '50%'],
        startAngle: 90, // 从正上方开始
        data: outerData,
        label: {
          position: 'inside',
          fontFamily: 'serif',
          formatter: '{b}'
        },
        labelLine: { show: false },
        itemStyle: { borderRadius: 2 },
        emphasis: {
          scale: true,
          scaleSize: 10,
          itemStyle: { color: '#8B2B2B', borderColor: '#FBF8F1' }
        }
      },
      // 2. 内层：八卦装饰环 (纯视觉，禁止交互)
      {
        type: 'pie',
        radius: ['35%', '48%'],
        center: ['50%', '50%'],
        silent: true,
        data: innerData,
        label: {
          position: 'inside',
          fontFamily: 'serif',
          formatter: '{b}'
        }
      },
      // 3. 最内层：细线装饰环
      {
        type: 'pie',
        radius: ['25%', '26%'],
        center: ['50%', '50%'],
        silent: true,
        itemStyle: { color: '#D4AF37' },
        label: { show: false },
        data: [{ value: 1 }]
      }
    ]
  }
})

const handleClick = (params: any) => {
  // 确保点击的是外层的朝代环
  if (ERAS.includes(params.name)) {
    emit('eraSelected', params.name)
  }
}
</script>
