<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ================= 轮播图状态与逻辑 (保持原有逻辑) =================
const isPlaying = ref(false)
const activeIndex = ref(0)
const isMapVisible = ref(false)
const selectedProvince = ref<string | null>(null)
const activeFilter = ref<string | null>(null)
const isSidebarCollapsed = ref(false)

const slides = [
  { id: 1, title: '故宫建筑群', description: '中国古代木构建筑的巅峰，展现了极为严谨的对称布局与皇家威仪', image: '/images/故宫.jpg', video: '/videos/gugong.mp4', link: '/inventory?id=1' },
  { id: 2, title: '万里长城', description: '世界上最宏伟的军事防御工程，依山就势，气势磅礴', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1920&auto=format&fit=crop', video: '/videos/changcheng.mp4', link: '/inventory?id=2' },
  { id: 3, title: '莫高窟', description: '集建筑、彩塑、壁画为一体的佛教艺术宝库，沙漠中的璀璨明珠', image: '/images/莫高窟.jpg', video: '/videos/mogaoku.mp4', link: '/inventory?id=6' },
  { id: 4, title: '祈年殿与天坛', description: '中国古代祭祀建筑的杰作，三重檐圆攒尖顶体现"天圆地方"的宇宙观', image: '/images/天坛.jpg', video: '/videos/tiantan.mp4', link: '/inventory?id=3' },
  { id: 5, title: '赵州桥', description: '距今一千四百多年，首创敞肩石拱桥结构，世界桥梁史上的奇迹', image: '/images/赵州桥.jpg', video: '/videos/zhaozhouqiao.mp4', link: '/inventory?id=4' },
  { id: 6, title: '应县木塔', description: '世界现存最古老最高大的纯木结构楼阁式建筑，全塔无一铁钉', image: '/images/应县木塔.jpg', video: '/videos/yingxian.mp4', link: '/inventory?id=5' },
  { id: 7, title: '布达拉宫', description: '世界上海拔最高、最宏伟的宫堡式建筑群，藏传佛教的圣地', image: '/images/布达拉宫.jpg', video: '/videos/budalagong.mp4', link: '/inventory?id=7' }
]

const currentSlide = computed(() => slides[activeIndex.value])

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length
  pauseAllVideos()
}
const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
  pauseAllVideos()
}

const pauseAllVideos = () => {
  document.querySelectorAll('video').forEach(video => video.pause())
  isPlaying.value = false
  isSidebarCollapsed.value = false
}

const handleScroll = () => { isMapVisible.value = window.scrollY > window.innerHeight * 0.8 }
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowLeft') prevSlide()
}

const setSlide = (index: number) => {
  activeIndex.value = index
  setTimeout(pauseAllVideos, 100)
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  document.querySelectorAll('video').forEach((video) => {
    isPlaying.value ? video.play().catch(() => {}) : video.pause()
  })
  isSidebarCollapsed.value = isPlaying.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})

// ================= 新增：展厅叙事数据源 =================

// 1. 大国足迹数据
const footprints = [
  { id: 1, title: '山西 · 平遥古城', image: '/images/平遥古城.jpg', desc: '“敬畏历史、敬畏文化、敬畏生态，全面保护好历史文化遗产，统筹好旅游发展、特色经营、古城保护。”' },
  { id: 2, title: '甘肃 · 敦煌莫高窟', image: '/images/莫高窟.jpg', desc: '“保护好我们的国粹，传承好优秀的传统文化。把莫高窟保护好，把敦煌文化传承好。”' },
  { id: 3, title: '北京 · 中轴线', image: '/images/中轴线.jpg', desc: '“北京历史文化是中华文明源远流长的伟大见证，要更加精心保护好，凸显北京历史文化的整体价值。”' }
]

// 2. 数字营造功能引流数据
const features = [
  { id: 1, title: '九州图志', subtitle: '古建遗存数据大屏', desc: '依托百万级地理数据，全景式刻画华夏大地的木构、砖石与古塔分布，利用可视化图表洞悉千年营造脉络。', icon: 'i-lucide-map', link: '/dashboard' },
  { id: 2, title: '太虚幻境', subtitle: 'AI 沉浸式历史推演', desc: '搭载 DeepSeek 大语言模型，与古建宗师跨越时空对话，在水墨晕染的案几上探寻营造法式的奥秘。', icon: 'i-lucide-sparkles', link: '/dashboard' }, // 这里的链接后续改为你的实际路由
  { id: 3, title: '营造学社', subtitle: '青年文脉传承社区', desc: '汇聚全国古建爱好者与学者，共享测绘图纸、田野调查与文献资料，共筑数字化保护与交流的基石。', icon: 'i-lucide-library', link: '/forum' }
]
</script>

<template>
  <div class="font-serif selection:bg-[#8B2B2B]/20 overflow-x-hidden">
    <!-- ================= 首屏：暗黑沉浸式轮播 (保留你的原版) ================= -->
    <div class="relative w-full h-[100vh] bg-[#030303] text-white overflow-hidden flex flex-col items-center justify-center">
      <div class="absolute inset-0 z-0 bg-black">
        <transition
          name="fade"
          mode="out-in"
        >
          <div
            :key="currentSlide.id"
            class="absolute inset-0"
          >
            <video
              :src="currentSlide.video"
              :poster="currentSlide.image"
              loop
              playsinline
              class="w-full h-full object-cover scale-105 transform origin-center transition-transform duration-[12s]"
              :class="isPlaying ? 'scale-110' : ''"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a0404] via-black/40 to-black/30" />
          </div>
        </transition>
      </div>

      <!-- 侧边栏建筑选项卡 -->
      <div
        class="absolute top-1/2 -translate-y-1/2 z-30 max-h-[80vh] overflow-y-auto scrollbar-hide px-4 py-2 transition-all duration-500 ease-in-out"
        :class="isSidebarCollapsed ? 'left-[-96px] lg:left-[-116px]' : 'left-0 lg:left-8'"
      >
        <div class="flex flex-col gap-4">
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            class="shrink-0 w-14 h-14 lg:w-20 lg:h-20 rounded-full border-2 pointer-events-auto cursor-pointer transition-all duration-300 relative group"
            :class="activeIndex === index ? 'border-amber-400 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.6)]' : 'border-white/20 scale-90 hover:scale-125 hover:border-white/60'"
            :title="slide.title"
            @click="setSlide(index)"
          >
            <div class="w-full h-full rounded-full overflow-hidden">
              <img
                :src="slide.image"
                :alt="slide.title"
                class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              >
              <div
                v-if="activeIndex === index"
                class="absolute inset-0 bg-amber-400/10 mix-blend-overlay rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="absolute top-6 right-6 lg:right-12 flex gap-3 z-30 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg pointer-events-auto">
        <button
          class="hover:text-amber-400 transition-colors"
          title="全屏查看"
        >
          <UIcon
            name="i-lucide-maximize"
            class="w-5 h-5"
          />
        </button>
        <button
          class="hover:text-amber-400 transition-colors"
          :title="isPlaying ? '暂停视频' : '播放视频'"
          @click="togglePlay"
        >
          <UIcon
            :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'"
            class="w-5 h-5"
          />
        </button>
      </div>

      <button
        class="absolute left-[100px] lg:left-[160px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/80 rounded-full border border-white/10 backdrop-blur-sm transition-all text-white/50 hover:text-white pointer-events-auto"
        @click="prevSlide"
      >
        <UIcon
          name="i-lucide-chevron-left"
          class="w-8 h-8 -ml-1"
        />
      </button>
      <button
        class="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/80 rounded-full border border-white/10 backdrop-blur-sm transition-all text-white/50 hover:text-white group pointer-events-auto"
        @click="nextSlide"
      >
        <UIcon
          name="i-lucide-chevron-right"
          class="w-8 h-8 ml-1 group-hover:scale-110 transition-transform"
        />
      </button>

      <!-- 标题与按钮 -->
      <div class="absolute bottom-20 z-20 w-full text-center px-4 flex flex-col items-center pointer-events-none">
        <transition
          name="fade-up"
          mode="out-in"
        >
          <div
            :key="currentSlide.id"
            class="flex flex-col items-center gap-6"
          >
            <div class="flex flex-col gap-3">
              <h2 class="text-4xl md:text-5xl font-bold tracking-widest text-[#f5ebd7] text-shadow-lg font-serif">
                {{ currentSlide.title }}
              </h2>
              <p class="text-lg md:text-xl text-white/80 tracking-widest max-w-4xl font-light text-shadow-sm">
                {{ currentSlide.description }}
              </p>
            </div>
            <NuxtLink
              :to="currentSlide.link"
              class="group mt-6 flex items-center gap-2 px-8 py-3.5 bg-[#ad2a2a]/90 hover:bg-[#c93e3e] backdrop-blur-md text-white rounded-sm transition-all duration-300 border border-[#e05050]/50 hover:border-white/50 shadow-xl cursor-pointer pointer-events-auto"
            >
              <span class="tracking-[0.2em] font-medium text-lg">进入探索</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </NuxtLink>
          </div>
        </transition>
      </div>

      <!-- 底部指示器 -->
      <div class="absolute bottom-16 flex gap-3 z-30 pointer-events-auto">
        <button
          v-for="(slide, index) in slides"
          :key="`indicator-${slide.id}`"
          class="h-1.5 transition-all duration-300 rounded-full"
          :class="activeIndex === index ? 'w-10 bg-[#ad2a2a]' : 'w-4 bg-white/30 hover:bg-white/60'"
          @click="setSlide(index)"
        />
      </div>

      <!-- 提示下拉动画 -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 animate-bounce pointer-events-none">
        <UIcon
          name="i-lucide-chevron-down"
          class="w-8 h-8 text-white/60"
        />
      </div>
    </div>

    <!-- ================= 第一幕：引言卷轴 (极简留白与故宫红) ================= -->
    <section class="relative py-40 bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden border-b border-[#EAEAEA]">
      <!-- 巨大的印章/文字水印，营造高级感 -->
      <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span class="font-serif text-[24rem] font-bold text-[#8B2B2B]">文脉</span>
      </div>

      <div class="relative z-10 max-w-5xl mx-auto text-center px-6">
        <h2 class="text-3xl md:text-5xl font-serif text-[#1A1A1A] leading-[1.8] tracking-[0.1em] font-bold">
          “历史文化遗产是祖先留给我们的，<br class="hidden md:block">我们一定要完整交给后人。”
        </h2>
        <div class="mt-16 flex flex-col items-center gap-6">
          <div class="w-px h-20 bg-[#8B2B2B]/30" />
          <p class="text-[#666666] font-serif tracking-[0.4em] text-sm uppercase">
            从木构的榫卯 到砖石的斑驳 每一寸皆为华夏大国气象
          </p>
          <!-- 古风落款印章 -->
          <div class="mt-6 w-14 h-14 border-2 border-[#8B2B2B] text-[#8B2B2B] flex items-center justify-center font-serif text-sm font-bold rotate-[-6deg] opacity-80 shadow-[inset_0_0_8px_rgba(139,43,43,0.1)]">
            赓续<br>文脉
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 第二幕：大国足迹 (现代美术馆风格) ================= -->
    <section class="py-32 bg-white relative">
      <div class="max-w-7xl mx-auto px-6">
        <!-- 章节标题 -->
        <div class="text-center mb-20">
          <h3 class="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-[0.2em] font-bold mb-5 flex items-center justify-center gap-4">
            <span class="w-12 h-px bg-[#8B2B2B]/40" />
            大国足迹 · 守护历史文脉
            <span class="w-12 h-px bg-[#8B2B2B]/40" />
          </h3>
          <p class="text-[#888888] font-serif tracking-widest text-sm">
            循着历史的印记，见证大国对古建保护的坚定承诺
          </p>
        </div>

        <!-- 足迹卡片阵列 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            v-for="footprint in footprints"
            :key="footprint.id"
            class="group bg-[#FAFAFA] rounded-sm overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(139,43,43,0.08)] transition-all duration-500 relative cursor-pointer flex flex-col h-full border border-transparent hover:border-[#8B2B2B]/15"
          >
            <!-- 卡片顶部：高清高饱和摄影 -->
            <div class="h-64 overflow-hidden relative">
              <div class="absolute inset-0 bg-[#8B2B2B]/0 group-hover:bg-[#8B2B2B]/10 transition-colors z-10 mix-blend-overlay" />
              <img
                :src="footprint.image"
                :alt="footprint.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              >
            </div>
            <!-- 卡片底部：现代留白排版 -->
            <div class="p-8 relative flex-1 flex flex-col justify-start">
              <div class="absolute top-0 left-0 w-0 h-1 bg-[#8B2B2B] group-hover:w-full transition-all duration-700 ease-out" />
              <h4 class="text-xl font-serif text-[#1A1A1A] font-bold tracking-widest mb-4">
                {{ footprint.title }}
              </h4>
              <p class="text-[#666666] font-serif text-sm leading-[2.2] text-justify tracking-wide">
                {{ footprint.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= 第三幕：数字营造 (功能引流区) ================= -->
    <section class="py-32 bg-[#F5F5F7] relative border-t border-[#EAEAEA]">
      <div class="max-w-7xl mx-auto px-6">
        <!-- 章节标题 -->
        <div class="text-center mb-20 flex flex-col items-center">
          <UIcon
            name="i-lucide-layout-dashboard"
            class="w-10 h-10 text-[#8B2B2B] mb-6 opacity-80"
          />
          <h3 class="text-3xl md:text-4xl font-serif text-[#1A1A1A] tracking-[0.2em] font-bold mb-5">
            数字营造 · 焕新千年古建
          </h3>
          <p class="text-[#888888] font-serif tracking-widest text-sm max-w-2xl leading-relaxed">
            以数字之光，照亮千年斗拱。国家倡导，青年践行。<br>
            融合 3D 漫游、地理大数据与前沿 AI 交互，让沉睡的古建重焕新生。
          </p>
        </div>

        <!-- 交互方块 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="bg-white p-10 rounded-sm shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col items-start border border-[#EAEAEA] hover:-translate-y-1"
          >
            <!-- 图标与副标题 -->
            <div class="w-14 h-14 bg-[#FAFAFA] border border-[#EAEAEA] rounded-full flex items-center justify-center mb-6 text-[#8B2B2B]">
              <UIcon
                :name="feature.icon"
                class="w-6 h-6"
              />
            </div>
            <h4 class="text-2xl font-serif text-[#1A1A1A] font-bold tracking-widest mb-2">
              {{ feature.title }}
            </h4>
            <span class="text-xs text-[#8B2B2B] tracking-widest border border-[#8B2B2B]/30 px-2 py-1 mb-5 bg-[#8B2B2B]/5">{{ feature.subtitle }}</span>

            <p class="text-[#666666] font-serif text-sm leading-loose mb-10 flex-1">
              {{ feature.desc }}
            </p>

            <!-- 复用首屏的红色按钮基因 -->
            <NuxtLink
              :to="feature.link"
              class="group w-full flex items-center justify-center gap-2 py-3 bg-[#ad2a2a] hover:bg-[#c93e3e] text-white rounded-sm transition-all duration-300 shadow-md"
            >
              <span class="tracking-[0.2em] text-sm">进入探索</span>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-4 h-4 group-hover:translate-x-1 transition-transform"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 轮播图保留样式 */
.text-shadow-lg { text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0,0,0,0.6); }
.text-shadow-sm { text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.9); }
.fade-enter-active, .fade-leave-active { transition: opacity 1.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.fade-up-enter-from, .fade-up-leave-to { opacity: 0; transform: translateY(30px) scale(0.95); }
.scrollbar-hide::-webkit-scrollbar, .hidden-scrollbar::-webkit-scrollbar { display: none; }
.scrollbar-hide, .hidden-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.writing-vertical-rl { writing-mode: vertical-rl; }
</style>
