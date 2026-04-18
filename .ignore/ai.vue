<template>
  <div class="min-h-[calc(100vh-112px)] bg-gray-50 text-black">
    <div class="max-w-5xl mx-auto px-6 py-12 flex flex-col h-[calc(100vh-112px)]">
      <h2 class="text-3xl font-bold font-serif mb-6 text-indigo-900 border-b pb-4">
        AI 建筑知识问答
      </h2>

      <div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div class="flex-1 p-6 flex flex-col gap-4 overflow-y-auto bg-slate-50">
          <div class="self-start bg-indigo-100 text-indigo-900 px-4 py-3 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
            您好！我是古建认知AI助手。您可以向我提问关于祈年殿结构、故宫历史或卯榫工序的问题。
          </div>
        </div>
        <div class="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            placeholder="向AI提问..."
            class="flex-1 px-4 py-2 bg-gray-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          >
          <button class="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 shadow-sm">
            <UIcon
              name="i-lucide-send"
              class="w-4 h-4 ml-[-2px]"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
