<template>
  <VChart
    class="w-full h-full min-h-[300px]"
    :option="chartOption"
    autoresize
  />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

// 强行发起请求获取真实数据
const { data: rawData } = await useAsyncData('xxx', () => $fetch('/api/dashboard/provinces'))

const chartOption = computed(() => {
  // 严格校验返回的数据类型，非数组直接置空
  const validData = Array.isArray(rawData.value) ? rawData.value : []

  // 反转数组以适配 ECharts 从下至上的渲染逻辑
  const reversedData = [...validData].reverse()

  return {
    grid: { top: '5%', left: '3%', right: '15%', bottom: '5%', containLabel: true },
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(26,20,18,0.9)', textStyle: { color: '#fff' } },
    xAxis: { type: 'value', splitLine: { show: false }, axisLabel: { show: false } },
    yAxis: {
      type: 'category',
      data: reversedData.map(d => d.name),
      axisLabel: { color: 'rgba(255,255,255,0.8)', fontFamily: 'serif' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: reversedData.map(d => d.value),
      itemStyle: { color: '#8B2B2B', borderRadius: [0, 4, 4, 0] },
      label: { show: true, position: 'right', color: '#D4AF37', fontWeight: 'bold' }
    }]
  }
})
</script>
