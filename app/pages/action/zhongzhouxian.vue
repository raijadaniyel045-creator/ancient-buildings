<template>
  <div class="bg-[#FAFAFA] min-h-screen font-serif text-[#1A1A1A] overflow-x-hidden">
    <section
      class="relative h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
      style="background-image: url('/images/中轴线.jpg');"
    >
      <div class="absolute inset-0 bg-black/60" />

      <div class="relative z-10 text-center text-white flex flex-col items-center px-6">
        <span class="tracking-[0.5em] text-[#D4AF37] text-sm md:text-base mb-6 border border-[#D4AF37]/50 px-4 py-1">国家记忆 · 行动纪实</span>
        <h1 class="text-5xl md:text-7xl font-bold tracking-[0.1em] mb-8 text-shadow-xl">
          北 京 · 中 轴 线
        </h1>
        <div class="w-px h-24 bg-gradient-to-b from-white to-transparent mb-8" />
        <p class="text-xl md:text-2xl font-light tracking-widest max-w-3xl leading-relaxed text-shadow-md">
          “北京历史文化是中华文明源远流长的伟大见证”
        </p>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <UIcon
          name="i-lucide-chevron-down"
          class="w-8 h-8"
        />
      </div>
    </section>

    <section class="py-32 px-6 max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center reveal-element">
        <div class="order-2 md:order-1">
          <img
            src="/images/zhongzhouxian.png"
            alt="北京中轴线风貌"
            class="w-full shadow-2xl rounded-sm object-cover h-[500px] grayscale hover:grayscale-0 transition-all duration-1000"
          >
        </div>
        <div class="order-1 md:order-2 flex flex-col items-start">
          <UIcon
            name="i-lucide-quote"
            class="w-12 h-12 text-[#8B2B2B]/20 mb-6"
          />
          <h2 class="text-3xl md:text-4xl font-bold tracking-widest mb-6">
            贯穿古今，重塑壮美秩序
          </h2>
          <p class="text-[#666666] text-lg leading-loose tracking-wide text-justify">
            全长7.8公里的北京中轴线，曾一度在快速的城市化进程中被现代建筑遮蔽了视线走廊。党中央明确提出，要更加精心保护好，凸显北京历史文化的整体价值。以申遗为契机，一场旨在恢复历史景观、延续城市文脉的大规模保护工程全面展开。
          </p>
        </div>
      </div>
    </section>

    <section class="py-32 bg-white border-y border-[#EAEAEA]">
      <div class="max-w-6xl mx-auto px-6 reveal-element">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4">
            文脉赓续 · 保护纪实
          </h2>
          <div class="w-16 h-1 bg-[#8B2B2B] mx-auto" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#8B2B2B] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#8B2B2B] mb-4 font-mono">
              15<span class="text-xl">处</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              核心遗产腾退修缮
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              完成了太庙、社稷坛、钟鼓楼等核心遗产区内的大规模历史建筑腾退与保护性修缮，恢复了历史建筑的原本尊严。
            </p>
          </div>
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#D4AF37] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#D4AF37] mb-4 font-mono">
              100<span class="text-xl">余项</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              视廊风貌整治
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              对影响中轴线景观视廊的违规高层建筑进行降层或拆除，重新打通了钟鼓楼至景山、天安门至永定门的壮美视线。
            </p>
          </div>
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#1A1A1A] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#1A1A1A] mb-4 font-mono">
              7.8<span class="text-xl">公里</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              全景空间测绘
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              运用空间地理信息系统（GIS）与建筑信息模型（BIM），建立了跨越老城南北的巨型数字空间档案。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative py-40 bg-fixed bg-center bg-cover"
      style="background-image: url('https://images.unsplash.com/photo-1623835695033-0c48731cd9a2?q=80&w=1920&auto=format&fit=crop');"
    >
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div class="relative z-10 max-w-4xl mx-auto text-center px-6 reveal-element">
        <h2 class="text-3xl md:text-5xl text-white font-bold tracking-[0.2em] mb-8">
          国家护其貌，青年铸其魂
        </h2>
        <p class="text-white/70 text-lg tracking-widest mb-16 leading-relaxed">
          物理的修缮让古建抵御岁月的侵蚀<br>
          数字的传承让历史触手可及<br>
          点击下方，亲自体验我们为古建注入的数字生命
        </p>

        <div class="flex flex-col md:flex-row justify-center gap-6">
          <NuxtLink
            to="/dashboard"
            class="group flex items-center justify-center gap-3 px-8 py-4 bg-[#8B2B2B] hover:bg-[#6D2121] text-white rounded-sm transition-all shadow-[0_0_20px_rgba(139,43,43,0.4)]"
          >
            <UIcon
              name="i-lucide-map"
              class="w-5 h-5"
            />
            <span class="tracking-widest font-bold">前往【九州图志】洞悉遗存</span>
          </NuxtLink>
          <NuxtLink
            to="/ai"
            class="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#D4AF37] rounded-sm transition-all"
          >
            <UIcon
              name="i-lucide-sparkles"
              class="w-5 h-5"
            />
            <span class="tracking-widest font-bold">前往【太虚幻境】对话历史</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.reveal-element').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.text-shadow-xl { text-shadow: 0 10px 30px rgba(0,0,0,0.8); }
.text-shadow-md { text-shadow: 0 4px 10px rgba(0,0,0,0.6); }

.reveal-element {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
