<template>
  <!-- 三列栅格布局 -->
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[75vh]">
    <!-- 左侧面板：省份排行 (占 1/4) -->
    <div class="flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 flex flex-col shadow-lg">
      <h3 class="text-lg font-serif text-[#D4AF37] mb-4 flex items-center gap-2">
        <UIcon
          name="i-heroicons-chart-bar"
          class="w-5 h-5"
        /> 遗存排行 Top 10
      </h3>

      <!-- 直接使用刚才封装好的业务组件 -->
      <div class="flex-1 w-full min-h-[300px]">
        <ProvinceBarChart />
      </div>
    </div>

    <!-- 中间主视觉：散点地图 (占 2/4) -->
    <div class="col-span-1 lg:col-span-2 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 relative shadow-xl flex flex-col">
      <h3 class="text-lg font-serif text-[#D4AF37] mb-4 absolute top-5 left-5 z-10 flex items-center gap-2">
        <UIcon
          name="i-heroicons-globe-asia-australia"
          class="w-5 h-5"
        /> 分布星图
      </h3>
      <!-- 注意：这里用简单的散点气泡图模拟，若要有真实中国地图，需引入 china.json -->
      <div class="flex-1 w-full h-full min-h-[400px]">
        <VChart
          ref="chartRef2"
          :option="scatterOption"
          autoresize
        />
      </div>
    </div>

    <!-- 右侧面板：类别占比 (占 1/4) -->
    <div class="col-span-1 flex flex-col gap-6">
      <div class="flex-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 flex flex-col shadow-lg">
        <h3 class="text-lg font-serif text-[#D4AF37] mb-4 flex items-center gap-2">
          <UIcon
            name="i-heroicons-chart-pie"
            class="w-5 h-5"
          /> 建筑规制占比
        </h3>
        <div class="flex-1 w-full min-h-[200px]">
          <VChart
            ref="chartRef3"
            :option="pieOption"
            autoresize
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 模拟从接口获取的数据 (为了保证你的页面能马上跑起来，先写死 Mock 数据)
// 你可以在后续使用 useAsyncData 替换这里的数据源
const mockBarData = [
  { name: '山西省', value: 531 }, { name: '河南省', value: 419 },
  { name: '河北省', value: 286 }, { name: '浙江省', value: 279 },
  { name: '陕西省', value: 268 }, { name: '四川省', value: 261 }
].reverse() // 柱状图倒序，让最大的在最上面

// 1. 左侧柱状图配置 (朱砂红配色)
const barOption = computed(() => ({
  grid: { top: '5%', left: '5%', right: '10%', bottom: '5%', containLabel: true },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(26,20,18,0.9)', borderColor: '#8B2B2B', textStyle: { color: '#fff' } },
  xAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    axisLabel: { color: 'rgba(255,255,255,0.6)' }
  },
  yAxis: {
    type: 'category',
    data: mockBarData.map(d => d.name),
    axisLabel: { color: 'rgba(255,255,255,0.8)', fontFamily: 'serif' }
  },
  series: [{
    type: 'bar',
    data: mockBarData.map(d => d.value),
    itemStyle: { color: '#8B2B2B', borderRadius: [0, 4, 4, 0] }, // 朱砂红，带圆角
    label: { show: true, position: 'right', color: '#D4AF37' } // 标签显示琉璃黄数字
  }]
}))

// 2. 中间散点图配置 (模拟地图上的点)
const scatterOption = computed(() => ({
  grid: { top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true },
  tooltip: { trigger: 'item', backgroundColor: 'rgba(26,20,18,0.9)', textStyle: { color: '#fff' } },
  xAxis: { show: false, min: 0, max: 100 },
  yAxis: { show: false, min: 0, max: 100 },
  series: [{
    symbolSize: 20,
    data: [
      [50, 60, '北京'], [45, 55, '山西'], [55, 45, '浙江'], [35, 40, '四川'] // x, y, name
    ],
    type: 'effectScatter', // 带有涟漪特效的散点图
    itemStyle: { color: '#D4AF37', shadowBlur: 10, shadowColor: '#D4AF37' },
    label: { show: true, formatter: '{@[2]}', position: 'right', color: '#fff', fontFamily: 'serif' }
  }]
}))

// 3. 右侧玫瑰饼图配置
const pieOption = computed(() => ({
  tooltip: { trigger: 'item', backgroundColor: 'rgba(26,20,18,0.9)', borderColor: '#8B2B2B', textStyle: { color: '#fff' } },
  legend: { bottom: '0%', textStyle: { color: 'rgba(255,255,255,0.7)' } },
  series: [{
    name: '建筑类别',
    type: 'pie',
    radius: ['20%', '70%'],
    center: ['50%', '45%'],
    roseType: 'area', // 南丁格尔玫瑰图
    itemStyle: { borderRadius: 4, borderColor: '#1A1412', borderWidth: 2 },
    data: [
      { value: 40, name: '古建筑', itemStyle: { color: '#8B2B2B' } },
      { value: 30, name: '古遗址', itemStyle: { color: '#D4AF37' } },
      { value: 20, name: '石窟寺', itemStyle: { color: '#5A1C1C' } },
      { value: 10, name: '近现代', itemStyle: { color: '#B8860B' } }
    ]
  }]
}))
</script>
