<template>
  <ClientOnly>
    <VChart
      style="width: 100%; height: 100%; min-height: 550px;"
      :option="chartOption"
      autoresize
      @click="handleMapClick"
    />
    <template #fallback>
      <div style="height: 550px; display: flex; align-items: center; justify-content: center; color: #D4AF37;">
        地图引擎加载中...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use, registerMap } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent, GeoComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import chinaGeoJson from '~/assets/json/china.json' // 必须确保此文件存在

registerMap('china', chinaGeoJson as any)
use([CanvasRenderer, MapChart, TooltipComponent, VisualMapComponent, GeoComponent])

const props = defineProps({
  chartData: { type: Array, default: () => [] }
})

const emit = defineEmits(['provinceSelected'])

const chartOption = computed(() => {
  // 解构打破 Proxy 拦截，强制传入原生对象数组，解决地图白板问题
  const pureData = props.chartData.map((item: any) => ({ name: item.name, value: item.value }))

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26,20,18,0.9)',
      borderColor: '#8B2B2B',
      textStyle: { color: '#FBF8F1', fontFamily: 'serif' },
      formatter: (params: any) => {
        if (isNaN(params.value)) return `${params.name}<br/>暂无收录数据`
        return `<span style="color:#D4AF37; font-weight:bold">${params.name}</span><br/>国保遗存：${params.value} 处`
      }
    },
    visualMap: {
      min: 0,
      max: 600, // 数据上限
      left: '3%',
      bottom: '3%',
      text: ['繁盛', '稀少'],
      calculable: true,
      inRange: { color: ['#2A1F1D', '#8B2B2B', '#D44A4A'] },
      textStyle: { color: '#D4AF37', fontFamily: 'serif' }
    },
    series: [{
      name: '中国古建',
      type: 'map',
      map: 'china',
      roam: true,
      scaleLimit: { min: 1, max: 3.5 },
      label: { show: false },
      itemStyle: {
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderWidth: 1,
        areaColor: '#1A1412'
      },
      emphasis: {
        label: { show: true, color: '#1A1412', fontWeight: 'bold', fontFamily: 'serif' },
        itemStyle: {
          areaColor: '#D4AF37',
          borderColor: '#FBF8F1',
          shadowColor: 'rgba(212, 175, 55, 0.5)',
          shadowBlur: 10
        }
      },
      data: pureData
    }]
  }
})

const handleMapClick = (params: any) => {
  if (params.name) emit('provinceSelected', params.name)
}
</script>
