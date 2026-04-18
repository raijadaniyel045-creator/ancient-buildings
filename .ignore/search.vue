<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#f7f5f0] text-black">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <h2 class="text-4xl font-bold font-serif mb-6 text-[#8b2b2b]">
        搜索与推荐
      </h2>
      <div class="bg-white p-8 rounded-lg shadow-sm border border-[#e8dfcf]">
        <div class="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="输入你想了解的古代建筑..."
            class="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8b2b2b]"
          >
          <button class="bg-[#8b2b2b] text-white px-8 py-3 rounded-md hover:bg-[#a02c2c] transition-colors">
            搜索
          </button>
        </div>
        <div class="mt-8">
          <h3 class="text-xl font-bold mb-4 font-serif text-gray-800">
            个性化推荐
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-100 h-40 rounded flex items-center justify-center text-gray-500">
              推荐位 1
            </div>
            <div class="bg-gray-100 h-40 rounded flex items-center justify-center text-gray-500">
              推荐位 2
            </div>
            <div class="bg-gray-100 h-40 rounded flex items-center justify-center text-gray-500">
              推荐位 3
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
