<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#111827] text-white">
    <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center">
      <h2 class="text-4xl font-bold font-serif mb-6 text-amber-400">
        全国古建数据大屏
      </h2>
      <div class="w-full h-96 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 flex items-center justify-center">
        <UIcon
          name="i-lucide-bar-chart-3"
          class="w-24 h-24 text-gray-600 mb-4"
        />
        <span class="text-gray-400 absolute mt-20 text-lg">可视化组件与图表区域 (ECharts 加载中...)</span>
      </div>
    </div>
  </div>
</template>
