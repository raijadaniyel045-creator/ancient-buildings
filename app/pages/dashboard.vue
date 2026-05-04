<template>
  <!-- 外层换成深色沉浸式背景 -->
  <UPage class="min-h-screen bg-[#1A1412] text-[#FBF8F1] selection:bg-[#8B2B2B]/30">
    <UPageHeader class="items-center justify-center flex flex-col pt-12 pb-6 border-b border-white/10">
      <h2 class="text-4xl md:text-5xl font-bold font-serif text-[#D4AF37] tracking-widest text-shadow-title">
        全国古建数据大屏
      </h2>
      <p class="mt-4 text-white/50 tracking-widest font-light text-sm">
        数据来源：全国重点文物保护单位名录
      </p>
    </UPageHeader>

    <!-- 去掉原来的白色背景，换成无边框的深色容器 -->
    <UContainer class="max-w-7xl my-8">

      <!-- 使用 UTabs 切换四个大屏组件 -->
      <UTabs
        :items="tabs"
        class="w-full"
        :ui="{
          list: { background: 'bg-white/5', marker: { background: 'bg-[#8B2B2B]' } },
          tab: { active: 'text-white font-bold', inactive: 'text-white/50 hover:text-white/80' }
        }"
      >
        <template #regional>
          <!-- 这里就是你原来的 Regional 组件 -->
          <div class="mt-6">
            <DashboardRegional />
          </div>
        </template>

        <template #timeline>
          <div class="mt-6">
            <DashboardTimeline />
          </div>
        </template>

        <template #category>
          <div class="mt-6">
            <DashboardCategory />
          </div>
        </template>

        <template #history>
          <div class="mt-6">
            <DashboardHistory />
          </div>
        </template>
      </UTabs>

    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
// 定义三个大屏的选项卡数据
const tabs = [
  { label: '九州图志 (地域分布)', slot: 'regional', icon: 'i-heroicons-map' },
  { label: '岁月长河 (历史脉络)', slot: 'timeline', icon: 'i-heroicons-clock' },
  { label: '万象归宗 (形制类别)', slot: 'category', icon: 'i-heroicons-swatch' },
  { label: '长河遗珠 (历史人文)', slot: 'history', icon: 'i-heroicons-book-open' }

]
</script>

<style scoped>
.text-shadow-title {
  text-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
}
</style>
