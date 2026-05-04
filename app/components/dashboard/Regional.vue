<template>
  <div class="grid grid-cols-4 gap-6 min-h-[650px]">
    <!-- 左侧：动态排行 -->
    <div class="col-span-1 bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-5 flex flex-col shadow-lg">
      <h3 class="text-lg font-serif text-[#D4AF37] mb-4 flex items-center gap-2">
        <UIcon
          name="i-heroicons-chart-bar"
          class="w-5 h-5"
        />
        {{ selectedProvince ? `${selectedProvince}遗存排行` : '全国遗存排行 Top 10' }}
      </h3>
      <div class="flex-1 w-full relative">
        <DashboardProvinceBarChart :chart-data="barChartData" />
      </div>
    </div>

    <!-- 中间：全局地图中枢 -->
    <div class="col-span-2 bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-5 relative shadow-lg overflow-hidden flex flex-col">
      <div class="absolute top-5 left-5 z-10 flex items-center gap-4">
        <h3 class="text-lg font-serif text-[#D4AF37] flex items-center gap-2 pointer-events-none">
          <UIcon
            name="i-heroicons-globe-asia-australia"
            class="w-5 h-5"
          /> 九州图志全景
        </h3>
        <!-- 下钻状态指示器与重置按钮 -->
        <UBadge
          v-if="selectedProvince"
          color="red"
          variant="subtle"
          class="cursor-pointer"
          @click="selectedProvince = null"
        >
          当前锁定：{{ selectedProvince }} ✕
        </UBadge>
      </div>
      <div class="flex-1 w-full mt-10 relative">
        <DashboardChinaMap
          :chart-data="mapChartData"
          @province-selected="handleMapClick"
        />
      </div>
    </div>

    <!-- 右侧：动态玫瑰饼图 -->
    <div class="col-span-1 bg-[#1A1412]/80 backdrop-blur-md rounded-xl border border-white/10 p-5 flex flex-col shadow-lg">
      <h3 class="text-lg font-serif text-[#D4AF37] mb-4 flex items-center gap-2">
        <UIcon
          name="i-heroicons-chart-pie"
          class="w-5 h-5"
        />
        {{ selectedProvince ? `${selectedProvince}建筑形制` : '全国建筑形制占比' }}
      </h3>
      <div class="flex-1 w-full relative">
        <DashboardCategoryPie :chart-data="pieChartData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const selectedProvince = ref<string | null>(null)

const { data: rawResponse } = await useAsyncData('all-regional-data', () =>
  $fetch('/api/dashboard/all-data')
)

const CATEGORY_MAP: Record<string, string> = {
  'ancient-buildings': '古建筑',
  'modern-historic': '近现代史迹',
  'stone-carvings': '石窟寺及石刻',
  'ancient-tombs': '古墓葬',
  'archaeological-sites': '古遗址',
  'others': '其它'
}

function aggregateData(data: any[], key: string, limit?: number) {
  if (!data || !Array.isArray(data) || data.length === 0) return []
  const counts = data.reduce((acc, curr) => {
    let val = curr[key]
    if (!val || val === '') val = '未知'
    if (key === 'category') val = CATEGORY_MAP[val] || val
    acc[val] = (acc[val] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sorted = Object.entries(counts)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value)
  return limit ? sorted.slice(0, limit) : sorted
}

const getValidArrayData = () => {
  if (rawResponse.value && Array.isArray((rawResponse.value as any).data)) {
    return (rawResponse.value as any).data
  }
  return []
}

// 供地图使用的数据（永远维持全国数据级）
const mapChartData = computed(() => {
  return aggregateData(getValidArrayData(), 'province')
})

// 供柱状图使用的数据（联动）
const barChartData = computed(() => {
  const allData = getValidArrayData()
  if (!selectedProvince.value) {
    return aggregateData(allData, 'province', 10)
  } else {
    const provinceData = allData.filter((item: any) => item.province === selectedProvince.value)
    return aggregateData(provinceData, 'city', 10)
  }
})

// 供饼图使用的数据（联动）
const pieChartData = computed(() => {
  const allData = getValidArrayData()
  if (!selectedProvince.value) {
    return aggregateData(allData, 'category')
  } else {
    const provinceData = allData.filter((item: any) => item.province === selectedProvince.value)
    return aggregateData(provinceData, 'category')
  }
})

const handleMapClick = (provinceName: string) => {
  selectedProvince.value = selectedProvince.value === provinceName ? null : provinceName
}
</script>
