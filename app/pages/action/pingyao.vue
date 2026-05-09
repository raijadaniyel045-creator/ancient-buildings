<template>
  <div class="bg-[#FAFAFA] min-h-screen font-serif text-[#1A1A1A] overflow-x-hidden">
    <section
      class="relative h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
      style="background-image: url('/images/平遥古城.jpg');"
    >
      <div class="absolute inset-0 bg-black/60" />

      <div class="relative z-10 text-center text-white flex flex-col items-center px-6">
        <span class="tracking-[0.5em] text-[#D4AF37] text-sm md:text-base mb-6 border border-[#D4AF37]/50 px-4 py-1">国家记忆 · 行动纪实</span>
        <h1 class="text-5xl md:text-7xl font-bold tracking-[0.1em] mb-8 text-shadow-xl">
          山 西 · 平 遥 古 城
        </h1>
        <div class="w-px h-24 bg-gradient-to-b from-white to-transparent mb-8" />
        <p class="text-xl md:text-2xl font-light tracking-widest max-w-3xl leading-relaxed text-shadow-md">
          “敬畏历史、敬畏文化、敬畏生态”
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
            src="/images/平遥.jpg"
            alt="平遥风貌"
            class="w-full shadow-2xl rounded-sm object-cover h-[500px] grayscale hover:grayscale-0 transition-all duration-1000"
          >
        </div>
        <div class="order-1 md:order-2 flex flex-col items-start">
          <UIcon
            name="i-lucide-quote"
            class="w-12 h-12 text-[#8B2B2B]/20 mb-6"
          />
          <h2 class="text-3xl md:text-4xl font-bold tracking-widest mb-6">
            风雨沧桑，留住晋商魂
          </h2>
          <p class="text-[#666666] text-lg leading-loose tracking-wide text-justify">
            作为中国保存最为完好的四大古城之一，平遥面临着极为严峻的风化与自然侵蚀考验。面对这座拥有两千八百多年历史的古城，党中央高度重视，多次作出重要指示，要求全面保护好历史文化遗产，统筹好旅游发展、特色经营、古城保护。
          </p>
        </div>
      </div>
    </section>

    <section class="py-32 bg-white border-y border-[#EAEAEA]">
      <div class="max-w-6xl mx-auto px-6 reveal-element">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4">
            重塑生机 · 保护纪实
          </h2>
          <div class="w-16 h-1 bg-[#8B2B2B] mx-auto" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#8B2B2B] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#8B2B2B] mb-4 font-mono">
              1.2<span class="text-xl">亿</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              专项修缮资金
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              国家文物局先后拨付专项资金，对古城墙、双林寺、镇国寺等核心国保单位进行抢救性修缮，确保本体安全。
            </p>
          </div>
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#D4AF37] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#D4AF37] mb-4 font-mono">
              100<span class="text-xl">%</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              数字化建档率
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              利用三维激光扫描与无人机倾斜摄影，平遥古城核心文物已全面实现高精度三维数字采集与建档。
            </p>
          </div>
          <div class="bg-[#FAFAFA] p-10 border-t-4 border-[#1A1A1A] shadow-lg hover:-translate-y-2 transition-transform">
            <h3 class="text-5xl font-bold text-[#1A1A1A] mb-4 font-mono">
              300<span class="text-xl">余处</span>
            </h3>
            <h4 class="text-xl font-bold tracking-widest mb-3">
              传统民居修缮
            </h4>
            <p class="text-[#666666] leading-relaxed text-sm">
              出台《平遥古城传统民居保护修缮资金补助办法》，引导居民参与，让活态文化在古城中延续。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative py-40 bg-fixed bg-center bg-cover"
      style="background-image: url('https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1920&auto=format&fit=crop');"
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

// 极简的滚动渐显动画逻辑 (Intersection Observer)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
        // 可选：如果希望动画只执行一次，可以取消观察
        // observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.15 // 元素露出 15% 时触发
  })

  document.querySelectorAll('.reveal-element').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.text-shadow-xl { text-shadow: 0 10px 30px rgba(0,0,0,0.8); }
.text-shadow-md { text-shadow: 0 4px 10px rgba(0,0,0,0.6); }

/* 初始状态：透明且向下偏移 */
.reveal-element {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* 可见状态：完全不透明且归位 */
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
