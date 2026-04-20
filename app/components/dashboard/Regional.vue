<template>
  <div
    class="flex flex-row items-center justify-center"
  >
    <div
      class="h-100 w-full"
    >
      <VChart
        ref="chartRef1"
        :option="option1"
        autoresize
      />
    </div>
    <div
      class="h-100 w-full"
    >
      <VChart
        ref="chartRef2"
        :option="option2"
        autoresize
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const chartRef1 = ref()
const chartRef2 = ref()

const sourceSet1 = ref([])
const sourceSet2 = ref([])

const { data: provinceMap, error } = await useAsyncData(`regional-${locale.value}`, () => {
  return $fetch(`/api/dashboard/regional`)
})
if (error.value) throw error
sourceSet1.value = (provinceMap.value ?? []) as never[]

const option1 = ref({
  dataset: [{
    source: sourceSet1
  }],
  series: [{
    type: 'pie',
    datasetIndex: 0,
    center: ['35%', '50%'],
    radius: ['40%', '65%'],
    clockwise: false,
    avoidLabelOverlap: false,
    label: {
      position: 'outter',
      formatter: (parms: { data: { province: never } }) => {
        return parms.data.province
      }
    },
    labelLine: {
      length: 15,
      length2: 10,
      smooth: true
    } }],
  tooltip: {
    trigger: 'item',
    formatter: (parms: { marker: string, data: { province: string, count: number }, percent: number }) => {
      return parms.marker + '' + parms.data.province + '</br>'
        + '数量：' + parms.data.count + '</br>'
        + '占比：' + parms.percent + '%'
    }
  },
  legend: {
    type: 'scroll',
    datasetIndex: 0,
    orient: 'vertical',
    left: '80%',
    align: 'left',
    top: 'middle',
    textStyle: {
      color: '#8C8C8C'
    },
    height: 300
  }
})
const option2 = ref({
  dataset: [{
    source: sourceSet2
  }],
  series: [{
    type: 'pie',
    datasetIndex: 0,
    center: ['35%', '50%'],
    radius: ['40%', '65%'],
    clockwise: false,
    avoidLabelOverlap: false,
    label: {
      position: 'outter',
      formatter: (parms: { data: { city: never } }) => {
        return parms.data.city
      }
    },
    labelLine: {
      length: 15,
      length2: 10,
      smooth: true
    } }],
  tooltip: {
    trigger: 'item',
    formatter: (parms: { marker: string, data: { city: string, count: number }, percent: number }) => {
      return parms.marker + '' + parms.data.city + '</br>'
        + '数量：' + parms.data.count + '</br>'
        + '占比：' + parms.percent + '%'
    }
  },
  legend: {
    type: 'scroll',
    datasetIndex: 0,
    orient: 'vertical',
    left: '80%',
    align: 'left',
    top: 'middle',
    textStyle: {
      color: '#8C8C8C'
    },
    height: 300
  }
})

const onOuterPieClick = async (params: { name: never }) => {
  const provinceName = params.name
  if (!provinceName) return
  const cityMap = await $fetch(`/api/dashboard/regional/${provinceName}` as string)
  if (error.value) throw error
  // 更新内圈数据
  sourceSet2.value = cityMap as never[]
}
onMounted(() => {
  if (chartRef1.value) {
    const chartInstance = chartRef1.value.chart
    chartInstance.on('click', onOuterPieClick)
  }
})
</script>
