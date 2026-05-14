<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-[#FAF8F5] selection:bg-[#8B2B2B]/10 overflow-hidden">
    <aside class="hidden md:flex md:w-[61.8%] relative bg-[#F0EDE9] items-center justify-center p-20 overflow-hidden border-r border-[#EAE3D9]">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <UIcon
          name="i-lucide-drafting-compass"
          class="absolute -top-20 -left-20 w-200 h-200"
        />
      </div>

      <div class="relative z-10 w-full max-w-2xl">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-xs text-[#666666] hover:text-[#8B2B2B] tracking-[0.2em] transition-colors mb-16 uppercase group"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          />
          返回大厅
        </NuxtLink>
        <div class="mb-12">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-6xl font-bold tracking-tighter text-[#1A1A1A]">营造</span>
            <span class="text-2xl font-light tracking-[0.5em] text-[#8B2B2B]">ARCHIVE</span>
          </div>
          <div class="h-1 w-24 bg-[#8B2B2B]" />
        </div>

        <div class="space-y-8">
          <h2 class="text-4xl font-bold text-[#1A1A1A] leading-tight tracking-wide">
            数字化视域下的<br>
            中国古代建筑文化科普平台
          </h2>
          <p class="text-[#666666] text-lg leading-relaxed font-light max-w-lg">
            在这里，我们用数字技术解构木构之美，将每一处榫卯、每一座梁架，都转化为可感知的文化记忆。
          </p>
        </div>

        <div class="mt-24 pt-8 border-t border-[#DED9D1] flex gap-12 text-[10px] tracking-[0.2em] text-[#999999] uppercase">
          <div>Structure / 结构</div>
          <div>History / 历史</div>
          <div>Digital / 数字</div>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-20 bg-white relative">
      <div class="w-full max-w-md">
        <div class="md:hidden mb-12">
          <span class="text-3xl font-bold tracking-tighter text-[#1A1A1A]">营造</span>
        </div>
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
          class="bg-default/85 backdrop-blur"
        >
          <NuxtPage />
        </Transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 自定义复选框的主题色 */
:deep(input[type="checkbox"]:checked) {
  background-color: #2A2522 !important;
  border-color: #2A2522 !important;
}

/* 彻底消除输入框聚焦时的默认蓝框，配合下划线样式 */
:deep(input:focus) {
  --tw-ring-color: transparent !important;
  box-shadow: none !important;
}
</style>
