<template>
  <div class="scrollable-block bg-[#fdfcfa] rounded-xl shadow-md border border-[#e8dfcf] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(139,43,43,0.15)] transform hover:-translate-y-2 group">
    <div class="bg-[#faf7f2] px-8 py-6 border-b border-[#e8dfcf] relative overflow-hidden">
      <div class="absolute right-0 top-0 w-32 h-32 bg-[#8b2b2b]/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
      <div class="flex items-center gap-4 relative z-10">
        <div class="w-12 h-12 bg-white shadow-sm border border-[#e8dfcf] rounded-full flex items-center justify-center transition-colors duration-300 group-hover:border-[#8b2b2b]/30">
          <UIcon
            :name="icon"
            class="w-5 h-5 text-[#8b2b2b]"
          />
        </div>
        <div>
          <h3 class="text-xl font-bold text-[#2c2420] font-serif tracking-widest">
            {{ topic }}
          </h3>
        </div>
      </div>
    </div>

    <div class="p-8 space-y-5 max-h-95 overflow-y-auto scrollbar-custom scroll-content relative">
      <slot />
    </div>
    <div
      class="px-6 py-3 bg-linear-to-r from-[#faf7f2] to-white border-t border-[#e8dfcf] flex items-center gap-2 text-xs text-[#8b2b2b]/60 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
    >
      <UIcon
        name="i-lucide-mouse-pointer-click"
        class="w-4 h-4 animate-bounce"
      />
      <span class="tracking-widest">使用鼠标滚轮探索更多文献资料</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String
  },
  topic: {
    type: String
  }
})
</script>

<style scoped>
/* 直接覆盖 slot 内所有 p 标签的样式 */
.scroll-content :deep(p) {
  color: #554c47 !important;
  line-height: 2.2 !important;
  text-align: justify !important;
  font-weight: 300 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
/* 经典古风文字投影 */
.text-shadow-title {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0,0,0,0.8);
}
.text-shadow-sm {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

/* 宣纸底纹效果 (通过极淡的噪点SVG背景实现，此处用渐变模拟) */
.paper-texture::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#e8dfcf 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
  pointer-events: none;
  z-index: -1;
}

/* 优雅的自定义滚动条 */
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: #d4af37 transparent;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #e8dfcf;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.scrollable-block:hover .scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #d4af37;
}

@media (max-width: 768px) {
  .scrollable-block .max-h-\[380px\] {
    max-height: 280px;
  }
}
</style>
