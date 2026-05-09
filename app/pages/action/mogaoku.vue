<template>
  <div class="bg-[#FAFAFA] min-h-screen font-serif text-[#1A1A1A] overflow-x-hidden">
    <section
      class="relative h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
      style="background-image: url('/images/莫高窟.jpg');"
    >
      <div class="absolute inset-0 bg-black/60" />

      <div class="relative z-10 text-center text-white flex flex-col items-center px-6">
        <span class="tracking-[0.5em] text-[#D4AF37] text-sm md:text-base mb-6 border border-[#D4AF37]/50 px-4 py-1">国家记忆 · 行动纪实</span>
        <h1 class="text-5xl md:text-7xl font-bold tracking-[0.1em] mb-8 text-shadow-xl">
          甘 肃 · 敦 煌 莫 高 窟
        </h1>
        <div class="w-px h-24 bg-gradient-to-b from-white to-transparent mb-8" />
        <p class="text-xl md:text-2xl font-light tracking-widest max-w-3xl leading-relaxed text-shadow-md">
          “保护好我们的国粹，传承好优秀的传统文化”
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
            src="/images/mogaoku.jpg"
            alt="莫高窟风貌"
            class="w-full shadow-2xl rounded-sm object-cover h-[500px] grayscale hover:grayscale-0 transition-all duration-1000"
          >
        </div>
        <div class="order-1 md:order-2 flex flex-col items-start">
          <UIcon
            name="i-lucide-quote"
            class="w-12 h-12 text-[#8B2B2B]/20 mb-6"
          />
          <h2 class="text-3xl md:text-4xl font-bold tracking-widest mb-6">
            与时间赛跑，守护丝路明珠
          </h2>
          <p class="text-[#666666] text-lg leading-loose tracking-wide text-justify">
            大漠戈壁中的莫高窟，千年来饱受风沙侵蚀与壁画酥碱之苦。随着游客激增，微环境的改变更让脆弱的彩塑面临不可逆的退化。党中央高度关切莫高窟的命运，要求把莫高窟保护好，把敦煌文化传承好，走出一条科技与人文并重的数字保护之路。
          </p>
        </div>
      </div>
    </section>

    <section class="py-32 bg-white border-y border-[#EAEAEA]">
      <div class="max-w-6xl mx-auto px-6 reveal-element">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4">
            数字方舟 · 保护纪实
          </h2>
          <div class="w-16 h-1 bg-[#8B2B2B] mx-auto" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#8B2B2B] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#8B2B2B] mb-4 font-mono">
              300<span class="text-xl">余个</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              高精度数字洞窟
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              实施“数字敦煌”工程，完成数百个重点洞窟的数据采集与图像拼接，让壁画在数字世界实现“永生”。
            </p>
          </div>
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#D4AF37] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#D4AF37] mb-4 font-mono">
              0.02<span class="text-xl">毫米</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              微环境监测精度
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              构建覆盖全窟群的传感网络，实时监测温湿度与二氧化碳浓度，动态调节游客承载量以保护脆弱壁画。
            </p>
          </div>
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#1A1A1A] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#1A1A1A] mb-4 font-mono">
              100<span class="text-xl">公里</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              风沙防护体系
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              在崖顶建立综合防护林带与阻沙网，有效阻挡了超过80%的流沙侵袭，为古老石窟筑起绿色长城。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative py-40 bg-fixed bg-center bg-cover"
      style="background-image: url('https://images.unsplash.com/photo-1599818859942-0f1ba7e4a3b7?q=80&w=1920&auto=format&fit=crop');"
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
