<template>
  <ClientOnly>
    <!-- 保持容器的相对定位和最小高度 -->
    <div class="relative w-full h-full min-h-[250px]">
      <!-- 修复 1：严格使用 100% 宽高，杜绝溢出偏移 -->
      <VChart style="width: 100%; height: 100%;" :option="chartOption" autoresize />
    </div>

    <template #fallback>
      <div class="flex items-center justify-center h-full text-[#D4AF37]/50 font-serif">
        加载画像矩阵...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, RadarChart, TooltipComponent])

const props = defineProps({
  activeEra: {
    type: String,
    required: true
  }
})

// 历史定性特征量化矩阵 (满分 100)
const ERA_EVALUATION_MATRIX: Record<string, number[]> = {
  '远古及先秦': [10, 10, 20, 5, 20],
  '秦汉': [30, 20, 30, 10, 40],
  '魏晋南北朝': [40, 40, 50, 20, 50],
  '隋唐五代': [95, 30, 40, 30, 60],
  '宋辽金': [85, 60, 50, 40, 70],
  '元': [70, 40, 50, 50, 75],
  '明': [60, 80, 85, 80, 90],
  '清': [40, 95, 90, 95, 95],
  '近现代': [30, 50, 95, 95, 90],
  '未知': [0, 0, 0, 0, 0]
}

const chartOption = computed(() => {
  const era = props.activeEra
  const scores = ERA_EVALUATION_MATRIX[era] || ERA_EVALUATION_MATRIX['未知']

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26,20,18,0.9)',
      borderColor: '#D44A4A',
      textStyle: { color: '#FBF8F1', fontFamily: 'serif' }
    },
    radar: {
      // 修复 2：调整中心点位置。
      // 第一个值是 X 轴（左右），调小则向左移；第二个值是 Y 轴（上下），调小则向上移。
      // 从之前的 ['50%', '55%'] 调整为 ['48%', '50%']，让它稍微偏左且垂直居中
      center: ['48%', '42%'],

      // 可以适当把半径调小一点点（如 60%），防止雷达图的文字角标被外层容器遮挡
      radius: '60%',

      indicator: [
        { name: '大木作结构', max: 100 },
        { name: '装饰繁复度', max: 100 },
        { name: '砖石普及率', max: 100 },
        { name: '遗存留存率', max: 100 },
        { name: '地域多样性', max: 100 }
      ],
      axisName: {
        color: '#D4AF37',
        fontFamily: 'serif',
        fontSize: 12,
        fontWeight: 'bold'
      },
      splitNumber: 4,
      splitArea: {
        areaStyle: {
          color: ['rgba(212, 175, 55, 0.05)', 'rgba(212, 175, 55, 0.1)', 'rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.2)'],
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        }
      },
      axisLine: {
        lineStyle: { color: 'rgba(212, 175, 55, 0.3)' }
      },
      splitLine: {
        lineStyle: { color: 'rgba(212, 175, 55, 0.4)' }
      }
    },
    series: [
      {
        name: '时代建筑画像',
        type: 'radar',
        data: [
          {
            value: scores,
            name: era,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#D44A4A',
              borderColor: '#FBF8F1',
              borderWidth: 1,
              shadowColor: '#D44A4A',
              shadowBlur: 5
            },
            lineStyle: {
              color: '#D44A4A',
              width: 2
            },
            areaStyle: {
              color: 'rgba(212, 74, 74, 0.4)'
            }
          }
        ]
      }
    ]
  }
})
</script>
