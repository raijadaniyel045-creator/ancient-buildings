<template>
  <ClientOnly>
    <VChart style="width: 100%; height: 500px;" :option="chartOption" autoresize />
    <template #fallback>
      <div style="height: 500px; display: flex; align-items: center; justify-content: center; color: #D4AF37;">
        渲染中...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const props = defineProps({
  chartData: { type: Array, default: () => [] }
})

const chartOption = computed(() => {
  const validData = props.chartData.length > 0 ? props.chartData : [{ name: '暂无', value: 0 }]

  return {
    color: ['#D4AF37', '#8B2B2B', '#A0522D', '#5C4033', '#E6C280', '#5E2612'], // 古建质感色板
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26,20,18,0.9)',
      borderColor: '#8B2B2B',
      textStyle: { color: '#FBF8F1', fontFamily: 'serif' },
      formatter: '{b} : {c} ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'serif' },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        type: 'pie',
        radius: ['20%', '65%'],
        center: ['50%', '45%'],
        roseType: 'area', // 南丁格尔玫瑰图模式
        itemStyle: {
          borderRadius: 4,
          borderColor: '#1A1412',
          borderWidth: 2
        },
        label: {
          color: '#D4AF37',
          fontFamily: 'serif',
          formatter: '{b}\n{c}'
        },
        labelLine: {
          lineStyle: { color: 'rgba(212, 175, 55, 0.4)' },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        data: [...validData] // 解构赋值，强制 Vue 监听器更新 ECharts Proxy
      }
    ]
  }
})
</script>
