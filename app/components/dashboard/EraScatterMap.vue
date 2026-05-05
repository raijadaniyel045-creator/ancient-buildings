<template>
  <ClientOnly>
    <div class="relative w-full h-full min-h-[600px] rounded-xl overflow-hidden">
      <VChart
        style="width: 100%; height: 100%;"
        :option="chartOption"
        autoresize
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use, registerMap } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { MapChart, EffectScatterChart } from 'echarts/charts'
import { TooltipComponent, GeoComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import chinaGeoJson from '~/assets/json/china.json'

registerMap('china', chinaGeoJson as any)
use([CanvasRenderer, MapChart, EffectScatterChart, TooltipComponent, GeoComponent])

const props = defineProps({
  chartData: {
    type: Array as () => Array<{ name: string, value: number }>,
    required: true
  }
})

// 核心缺陷补救：省级几何中心坐标系注入
const GEO_COORD_MAP: Record<string, [number, number]> = {
  北京: [116.405285, 39.904989],
  天津: [117.190182, 39.125596],
  河北: [114.502461, 38.045474],
  山西: [112.549248, 37.857014],
  内蒙古: [111.670801, 40.818311],
  辽宁: [123.429096, 41.796767],
  吉林: [125.3245, 43.886841],
  黑龙江: [126.642464, 45.756967],
  上海: [121.472644, 31.231706],
  江苏: [118.767413, 32.041544],
  浙江: [120.153576, 30.287459],
  安徽: [117.283042, 31.86119],
  福建: [119.306239, 26.075302],
  江西: [115.892151, 28.676493],
  山东: [117.000923, 36.675807],
  河南: [113.665412, 34.757975],
  湖北: [114.298572, 30.584355],
  湖南: [112.982279, 28.19409],
  广东: [113.280637, 23.125178],
  广西: [108.320004, 22.82402],
  海南: [110.33119, 20.031971],
  重庆: [106.504962, 29.533155],
  四川: [104.065735, 30.659462],
  贵州: [106.713478, 26.578343],
  云南: [102.712251, 25.040609],
  西藏: [91.1145, 29.64415],
  陕西: [108.948024, 34.263161],
  甘肃: [103.823557, 36.058039],
  青海: [101.778916, 36.623178],
  宁夏: [106.278179, 38.46637],
  新疆: [87.617733, 43.792818],
  台湾: [121.509062, 25.044332]
}

// 模糊匹配抹平命名差异（去除"省"、"市"等后缀以匹配字典）
const normalizeProvince = (name: string) => name.replace(/省|市|自治区|壮族自治区|回族自治区|维吾尔自治区|特别行政区/g, '')

const chartOption = computed(() => {
  const scatterData = props.chartData
    .map((item) => {
      const normalName = normalizeProvince(item.name)
      const geoCoord = GEO_COORD_MAP[normalName]
      if (geoCoord) {
        return {
          name: normalName,
          value: geoCoord.concat(item.value) // 组装为 [lng, lat, value] 格式
        }
      }
      return null
    })
    .filter(Boolean)

  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26,20,18,0.9)',
      borderColor: '#D44A4A',
      textStyle: { color: '#FBF8F1', fontFamily: 'serif' },
      formatter: (params: any) => {
        if (!params.value || params.value.length < 3) return ''
        return `<span style="color:#D4AF37; font-weight:bold">${params.name}</span><br/>遗存数量：${params.value[2]} 处`
      }
    },
    geo: {
      map: 'china',
      roam: true,
      scaleLimit: { min: 1, max: 4 },
      label: { show: false },
      itemStyle: {
        areaColor: '#0F0C0B', // 极暗底图
        borderColor: 'rgba(212, 175, 55, 0.15)', // 暗金轮廓线
        borderWidth: 1
      },
      emphasis: {
        itemStyle: { areaColor: '#1A1412' },
        label: { show: false }
      }
    },
    series: [
      {
        name: '遗存发光点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: scatterData,
        // 根据数值动态缩放涟漪光圈，设置阈值避免极值失真
        symbolSize: (val: number[]) => Math.max(Math.min(val[2] / 5, 25), 5),
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 4
        },
        itemStyle: {
          color: '#D44A4A',
          shadowBlur: 10,
          shadowColor: '#D44A4A'
        },
        zlevel: 1
      }
    ]
  }
})
</script>
