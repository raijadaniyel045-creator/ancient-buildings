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
        color="warning"
        :ui="{
          wrapper: 'space-y-4',
          list: {
            // 1. 容器：强制深玄色背景，带极细的暗金边框
            background: '!bg-[#1A1412]/90',
            rounded: 'rounded-lg',
            padding: 'p-1',
            border: 'border border-[#D4AF37]/20',
            marker: {
              // 2. 指示器：强制朱砂红背景，去掉 h-[3px] 这种非法属性，改用 shadow 营造微光感
              wrapper: 'absolute',
              background: '!bg-[#D44A4A]',
              rounded: 'rounded-md',
              shadow: 'shadow-[0_0_10px_rgba(212,74,74,0.6)]'
            }
          },
          tab: {
            // 3. 文字：衬线体 + 字间距 + 琉璃金配色
            base: 'relative transition-all duration-300 font-serif tracking-[0.2em]',
            active: '!text-[#FBF8F1] font-bold',
            inactive: '!text-[#D4AF37]/40 hover:!text-[#D4AF37]/80',
            size: 'text-sm',
            class: 'py-2'
          }
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

        <template #history>
          <div class="mt-6">
            <DashboardStory />
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
  { label: '长河遗珠 (历史人文)', slot: 'history', icon: 'i-heroicons-book-open' }

]
</script>

<style scoped>
.text-shadow-title {
  text-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
}
</style>
