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
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const props = defineProps({
  chartData: { type: Array, default: () => [] }
})

const chartOption = computed(() => {
  const validData = props.chartData.length > 0 ? props.chartData : [{ name: '暂无', value: 0 }]
  const reversedData = [...validData].reverse()

  return {
    grid: { top: '5%', left: '2%', right: '12%', bottom: '2%', containLabel: true },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      backgroundColor: 'rgba(26,20,18,0.9)',
      borderColor: '#8B2B2B',
      textStyle: { color: '#FBF8F1' }
    },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: reversedData.map((d: any) => d.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'serif', fontSize: 13, margin: 16 }
    },
    series: [{
      type: 'bar',
      data: reversedData.map((d: any) => d.value),
      barWidth: 8,
      showBackground: true,
      backgroundStyle: { color: 'rgba(255, 255, 255, 0.03)', borderRadius: [0, 10, 10, 0] },
      itemStyle: {
        color: new graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: 'rgba(139, 43, 43, 0.3)' },
          { offset: 1, color: '#D44A4A' }
        ]),
        borderRadius: [0, 10, 10, 0],
        shadowColor: 'rgba(212, 74, 74, 0.3)',
        shadowBlur: 10
      },
      label: { show: true, position: 'right', distance: 12, color: '#D4AF37', fontFamily: 'serif', fontWeight: 'bold' }
    }]
  }
})
</script>
