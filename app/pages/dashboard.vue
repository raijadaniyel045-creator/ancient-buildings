<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#111827] text-white">
    <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
      <h2 class="text-4xl font-bold font-serif mb-6 text-amber-400">
        全国古建数据大屏
      </h2>
      <div class="w-full h-96 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex items-center justify-center">
        <div>
          <VisSingleContainer :data="provinceMap">
            <VisDonut
              :value="(d: { province: string, count: number }) => d.count"
              :sort-function="(a: number, b: number) => a - b"
              :arc-width="30"
              :pad-angle="0.01"
            />
            <VisTooltip
              :triggers="{
                [Donut.selectors.segment]: (d: any) => `${d.data.province}:${d.data.count}`
              }"
            />
          </VisSingleContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VisSingleContainer, VisTooltip, VisDonut } from '@unovis/vue'
import { Donut } from '@unovis/ts'

const { locale } = useI18n()
const { data: provinceMap, error } = await useAsyncData(`provinceMap-${locale.value}`, () => {
  return $fetch(`/api/dashboard/province`)
})
if (error.value) {
  throw error.value
}
</script>
