<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isPlaying = ref(false)
const activeIndex = ref(0)
const isMapVisible = ref(false)
const selectedProvince = ref<string | null>(null)
const activeFilter = ref<string | null>(null)
const isSidebarCollapsed = ref(false)

const slides = [
  { id: 1, title: '故宫建筑群', description: '中国古代木构建筑的巅峰，展现了极为严谨的对称布局与皇家威仪', image: '/images/故宫.jpg', video: '/videos/gugong.mp4', link: '/inventory?id=1' },
  { id: 2, title: '万里长城', description: '世界上最宏伟的军事防御工程，依山就势，气势磅礴', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1920&auto=format&fit=crop', video: '/videos/changcheng.mp4', link: '/inventory?id=2' },
  { id: 3, title: '祈年殿与天坛', description: '中国古代祭祀建筑的杰作，三重檐圆攒尖顶体现"天圆地方"的宇宙观', image: '/images/天坛.jpg', video: '/videos/tiantan.mp4', link: '/inventory?id=3' },
  { id: 4, title: '赵州桥', description: '距今一千四百多年，首创敞肩石拱桥结构，世界桥梁史上的奇迹', image: '/images/赵州桥.jpg', video: '/videos/zhaozhouqiao.mp4', link: '/inventory?id=4' },
  { id: 5, title: '应县木塔', description: '世界现存最古老最高大的纯木结构楼阁式建筑，全塔无一铁钉', image: '/images/应县木塔.jpg', video: '/videos/yingxian.mp4', link: '/inventory?id=5' },
  { id: 6, title: '莫高窟', description: '集建筑、彩塑、壁画为一体的佛教艺术宝库，沙漠中的璀璨明珠', image: '/images/莫高窟.jpg', video: '/videos/mogaoku.mp4', link: '/inventory?id=6' },
  { id: 7, title: '布达拉宫', description: '世界上海拔最高、最宏伟的宫堡式建筑群，藏传佛教的圣地', image: '/images/布达拉宫.jpg', video: '/videos/budalagong.mp4', link: '/inventory?id=7' }
]

const ancientBuildingsMap = [
  { name: '泰顺廊桥', province: '浙江', type: '桥梁' },
  { name: '湘峪古堡', province: '山西', type: '城堡' },
  { name: '恭王府', province: '北京', type: '王府' },
  { name: '开江牌坊', province: '四川', type: '牌坊' },
  { name: '大召', province: '内蒙古', type: '寺庙' },
  { name: '松江唐经幢', province: '上海', type: '经幢' },
  { name: '南诏铁柱', province: '云南', type: '铁柱' },
  { name: '北海公园', province: '北京', type: '园林' },
  { name: '逢渠桥', province: '江西', type: '桥梁' },
  { name: '张溥宅第', province: '江苏', type: '宅第' },
  { name: '故宫', province: '北京', type: '宫殿' },
  { name: '江村古建筑群', province: '安徽', type: '建筑群' },
  { name: '鲁屯牌坊群', province: '贵州', type: '牌坊' },
  { name: '长春洞', province: '云南', type: '道教建筑' },
  { name: '靖江王府', province: '广西', type: '王府' },
  { name: '光岳楼', province: '山东', type: '楼阁' },
  { name: '拉鲁颇章', province: '西藏', type: '宫殿' },
  { name: '双龙桥', province: '云南', type: '桥梁' },
  { name: '武当山金殿', province: '湖北', type: '道教建筑' },
  { name: '药王山石刻', province: '陕西', type: '石刻' },
  { name: '郎德上寨古建筑群', province: '贵州', type: '建筑群' },
  { name: '崆峒山古建筑群', province: '甘肃', type: '建筑群' },
  { name: '槐山矶驳岸', province: '湖北', type: '驳岸' },
  { name: '南涅水洪教院', province: '山西', type: '寺庙' },
  { name: '平遥惠济桥', province: '山西', type: '桥梁' },
  { name: '嘉业堂藏书楼', province: '浙江', type: '藏书楼' },
  { name: '适园', province: '江苏', type: '园林' },
  { name: '南屏村古建筑群', province: '安徽', type: '建筑群' },
  { name: '陈阁老宅', province: '浙江', type: '宅第' },
  { name: '龙江桥', province: '福建', type: '桥梁' },
  { name: '高椅村古建筑群', province: '湖南', type: '建筑群' },
  { name: '董府', province: '宁夏', type: '宅第' },
  { name: '石堰坪古建筑群', province: '湖南', type: '建筑群' },
  { name: '五泉山建筑群', province: '甘肃', type: '建筑群' },
  { name: '淮军公所', province: '河北', type: '公所' },
  { name: '山陕甘会馆', province: '河南', type: '会馆' },
  { name: '泉州天后宫', province: '福建', type: '寺庙' }
]

// 警告：更换底图后，请手动微调以下 left 和 top 的百分比，以确保坐标落在真实地图的对应省份上
const provincesData = [
  { name: '北京', left: '64%', top: '41%', base: 'bg-amber-500', active: 'bg-amber-400', size: 'w-4 h-4' },
  { name: '天津', left: '66%', top: '43%', base: 'bg-gray-500', active: 'bg-gray-400', size: 'w-3 h-3' },
  { name: '河北', left: '63%', top: '48%', base: 'bg-blue-500', active: 'bg-blue-400', size: 'w-4 h-4' },
  { name: '山西', left: '70%', top: '54%', base: 'bg-red-500', active: 'bg-red-400', size: 'w-4 h-4' },
  { name: '内蒙古', left: '60%', top: '40%', base: 'bg-purple-500', active: 'bg-purple-400', size: 'w-4 h-4' },
  { name: '辽宁', left: '72%', top: '38%', base: 'bg-cyan-500', active: 'bg-cyan-400', size: 'w-3 h-3' },
  { name: '吉林', left: '77%', top: '32%', base: 'bg-teal-500', active: 'bg-teal-400', size: 'w-3 h-3' },
  { name: '黑龙江', left: '75%', top: '22%', base: 'bg-emerald-500', active: 'bg-emerald-400', size: 'w-3 h-3' },
  { name: '上海', left: '73%', top: '60%', base: 'bg-pink-500', active: 'bg-pink-400', size: 'w-3 h-3' },
  { name: '江苏', left: '70%', top: '58%', base: 'bg-green-500', active: 'bg-green-400', size: 'w-4 h-4' },
  { name: '浙江', left: '72%', top: '68%', base: 'bg-orange-500', active: 'bg-orange-400', size: 'w-4 h-4' },
  { name: '安徽', left: '67%', top: '60%', base: 'bg-lime-500', active: 'bg-lime-400', size: 'w-3 h-3' },
  { name: '福建', left: '69%', top: '74%', base: 'bg-indigo-500', active: 'bg-indigo-400', size: 'w-3 h-3' },
  { name: '江西', left: '66%', top: '70%', base: 'bg-rose-500', active: 'bg-rose-400', size: 'w-3 h-3' },
  { name: '山东', left: '67%', top: '52%', base: 'bg-yellow-500', active: 'bg-yellow-400', size: 'w-4 h-4' },
  { name: '河南', left: '62%', top: '56%', base: 'bg-amber-600', active: 'bg-amber-500', size: 'w-4 h-4' },
  { name: '湖北', left: '62%', top: '63%', base: 'bg-red-600', active: 'bg-red-500', size: 'w-4 h-4' },
  { name: '湖南', left: '60%', top: '72%', base: 'bg-fuchsia-500', active: 'bg-fuchsia-400', size: 'w-3 h-3' },
  { name: '广东', left: '62%', top: '80%', base: 'bg-violet-500', active: 'bg-violet-400', size: 'w-4 h-4' },
  { name: '广西', left: '53%', top: '80%', base: 'bg-sky-500', active: 'bg-sky-400', size: 'w-3 h-3' },
  { name: '海南', left: '56%', top: '90%', base: 'bg-emerald-400', active: 'bg-emerald-300', size: 'w-3 h-3' },
  { name: '重庆', left: '53%', top: '65%', base: 'bg-orange-600', active: 'bg-orange-500', size: 'w-3 h-3' },
  { name: '四川', left: '45%', top: '65%', base: 'bg-sky-600', active: 'bg-sky-500', size: 'w-4 h-4' },
  { name: '贵州', left: '52%', top: '72%', base: 'bg-lime-600', active: 'bg-lime-500', size: 'w-3 h-3' },
  { name: '云南', left: '42%', top: '80%', base: 'bg-teal-600', active: 'bg-teal-500', size: 'w-4 h-4' },
  { name: '西藏', left: '32%', top: '60%', base: 'bg-cyan-700', active: 'bg-cyan-600', size: 'w-4 h-4' },
  { name: '陕西', left: '55%', top: '55%', base: 'bg-red-700', active: 'bg-red-600', size: 'w-4 h-4' },
  { name: '甘肃', left: '47%', top: '48%', base: 'bg-yellow-700', active: 'bg-yellow-600', size: 'w-4 h-4' },
  { name: '青海', left: '38%', top: '52%', base: 'bg-pink-700', active: 'bg-pink-600', size: 'w-3 h-3' },
  { name: '宁夏', left: '52%', top: '50%', base: 'bg-amber-700', active: 'bg-amber-600', size: 'w-3 h-3' },
  { name: '新疆', left: '22%', top: '38%', base: 'bg-rose-700', active: 'bg-rose-600', size: 'w-4 h-4' },
  { name: '香港', left: '64%', top: '82%', base: 'bg-indigo-700', active: 'bg-indigo-600', size: 'w-2 h-2' },
  { name: '澳门', left: '62%', top: '83%', base: 'bg-purple-700', active: 'bg-purple-600', size: 'w-2 h-2' },
  { name: '台湾', left: '74%', top: '78%', base: 'bg-emerald-700', active: 'bg-emerald-600', size: 'w-3 h-3' }
]

const mapLegend = [
  { id: '宫殿', label: '宫殿建筑', color: 'bg-amber-400' },
  { id: '寺庙', label: '宗教建筑', color: 'bg-red-400' },
  { id: '桥梁', label: '桥梁建筑', color: 'bg-blue-400' },
  { id: '建筑群', label: '民居群落', color: 'bg-green-400' }
]

const aggregatedData = computed(() => {
  const dataToProcess = selectedProvince.value
    ? ancientBuildingsMap.filter(b => b.province === selectedProvince.value)
    : ancientBuildingsMap

  const statsMap = new Map<string, number>()
  dataToProcess.forEach(item => {
    statsMap.set(item.type, (statsMap.get(item.type) || 0) + 1)
  })

  const statsArray = Array.from(statsMap.entries()).map(([type, count]) => ({ type, count }))
  statsArray.sort((a, b) => b.count - a.count)

  return statsArray
})

const totalBuildings = computed(() => {
  return selectedProvince.value
    ? ancientBuildingsMap.filter(b => b.province === selectedProvince.value).length
    : ancientBuildingsMap.length
})

const currentSlide = computed(() => slides[activeIndex.value])
const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % slides.length
  // 切换幻灯片时暂停视频并展开侧边栏
  document.querySelectorAll('video').forEach(video => video.pause())
  isPlaying.value = false
  isSidebarCollapsed.value = false
}
const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + slides.length) % slides.length
  // 切换幻灯片时暂停视频并展开侧边栏
  document.querySelectorAll('video').forEach(video => video.pause())
  isPlaying.value = false
  isSidebarCollapsed.value = false
}

const handleScroll = () => { isMapVisible.value = window.scrollY > window.innerHeight * 0.8 }
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowLeft') prevSlide()
}

const selectProvince = (province: string) => {
  selectedProvince.value = selectedProvince.value === province ? null : province
}

const toggleFilter = (typeId: string) => {
  activeFilter.value = activeFilter.value === typeId ? null : typeId
}

const isProvinceHighlighted = (provinceName: string) => {
  if (!activeFilter.value) return true
  return ancientBuildingsMap.some(b => {
    if (b.province !== provinceName) return false
    if (activeFilter.value === '寺庙' && (b.type === '寺庙' || b.type === '道教建筑' || b.type === '石刻')) return true
    if (activeFilter.value === '建筑群' && (b.type === '建筑群' || b.type === '宅第' || b.type === '村落')) return true
    return b.type === activeFilter.value
  })
}

const setSlide = (index: number) => {
  activeIndex.value = index
  setTimeout(() => {
    document.querySelectorAll('video').forEach(video => video.pause())
    isPlaying.value = false
  }, 100)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  document.querySelectorAll('video').forEach(video => {
    isPlaying.value ? video.play().catch(() => {}) : video.pause()
  })

  // 自动控制侧边栏收缩
  isSidebarCollapsed.value = isPlaying.value
}


</script>

<template>
  <div class="min-h-screen bg-[#030303] text-white font-serif selection:bg-amber-600/30">
    <div class="relative w-full h-[100vh] bg-[#030303] overflow-hidden flex flex-col items-center justify-center">
      <div class="absolute inset-0 z-0 bg-black">
        <transition name="fade" mode="out-in">
          <div :key="currentSlide.id" class="absolute inset-0">
            <video :src="currentSlide.video" :poster="currentSlide.image" loop playsinline class="w-full h-full object-cover scale-105 transform origin-center transition-transform duration-[12s]" :class="isPlaying ? 'scale-110' : ''"></video>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0a0404] via-black/40 to-black/30"></div>
          </div>
        </transition>
      </div>

      <!-- 侧边栏建筑选项卡 -->
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 z-30 max-h-[80vh] overflow-y-auto scrollbar-hide py-2 transition-all duration-500 ease-in-out"
        :class="isSidebarCollapsed ? 'left-[-80px] lg:left-[-100px]' : 'left-4 lg:left-12'"
      >
        <div class="flex flex-col gap-4">
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            @click="setSlide(index)"
            class="shrink-0 w-14 h-14 lg:w-20 lg:h-20 rounded-full border-2 pointer-events-auto cursor-pointer transition-all duration-300 relative group"
            :class="activeIndex === index ? 'border-amber-400 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.6)]' : 'border-white/20 scale-90 hover:scale-100 hover:border-white/60'"
            :title="slide.title"
          >
            <div class="w-full h-full rounded-full overflow-hidden">
              <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
              <div v-if="activeIndex === index" class="absolute inset-0 bg-amber-400/10 mix-blend-overlay rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-6 right-6 lg:right-12 flex gap-3 z-30 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg pointer-events-auto">
        <button class="hover:text-amber-400 transition-colors" title="全屏查看"><UIcon name="i-lucide-maximize" class="w-5 h-5" /></button>
        <button class="hover:text-amber-400 transition-colors" @click="togglePlay" :title="isPlaying ? '暂停视频' : '播放视频'"><UIcon :name="isPlaying ? 'i-lucide-pause' : 'i-lucide-play'" class="w-5 h-5" /></button>
      </div>

      <button @click="prevSlide" class="absolute left-[100px] lg:left-[160px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/80 rounded-full border border-white/10 backdrop-blur-sm transition-all text-white/50 hover:text-white pointer-events-auto">
        <UIcon name="i-lucide-chevron-left" class="w-8 h-8 -ml-1" />
      </button>
      <button @click="nextSlide" class="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-black/30 hover:bg-black/80 rounded-full border border-white/10 backdrop-blur-sm transition-all text-white/50 hover:text-white group pointer-events-auto">
        <UIcon name="i-lucide-chevron-right" class="w-8 h-8 ml-1 group-hover:scale-110 transition-transform" />
      </button>

      <div class="absolute bottom-20 z-20 w-full text-center px-4 flex flex-col items-center pointer-events-none">
        <transition name="fade-up" mode="out-in">
          <div :key="currentSlide.id" class="flex flex-col items-center gap-6">
            <div class="flex flex-col gap-3">
              <h2 class="text-4xl md:text-5xl font-bold tracking-widest text-[#f5ebd7] text-shadow-lg font-serif">{{ currentSlide.title }}</h2>
              <p class="text-lg md:text-xl text-white/80 tracking-widest max-w-4xl font-light text-shadow-sm">{{ currentSlide.description }}</p>
            </div>
            <NuxtLink :to="currentSlide.link" class="group mt-6 flex items-center gap-2 px-8 py-3.5 bg-[#ad2a2a]/90 hover:bg-[#c93e3e] backdrop-blur-md text-white rounded-sm transition-all duration-300 border border-[#e05050]/50 hover:border-white/50 shadow-xl cursor-pointer pointer-events-auto">
              <span class="tracking-[0.2em] font-medium text-lg">进入探索</span>
              <UIcon name="i-lucide-arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </transition>
      </div>

      <div class="absolute bottom-16 flex gap-3 z-30 pointer-events-auto">
        <button v-for="(slide, index) in slides" :key="`indicator-${slide.id}`" @click="setSlide(index)" class="h-1.5 transition-all duration-300 rounded-full" :class="activeIndex === index ? 'w-10 bg-[#ad2a2a]' : 'w-4 bg-white/30 hover:bg-white/60'" />
      </div>

      <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce pointer-events-none">
        <UIcon name="i-lucide-chevron-down" class="w-8 h-8 text-white/60" />
      </div>
    </div>

    <div class="relative w-full min-h-screen bg-[#d8c3a5] bg-opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] py-20 px-6">
      <div class="max-w-[1300px] mx-auto">

        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-[#f5ebd7] mb-6 font-serif tracking-widest text-shadow-sm">
            《 古建筑分布地图 》
          </h2>
        </div>

        <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          <div class="relative w-full lg:flex-1 max-w-4xl flex items-center justify-center" style="aspect-ratio: 4/3;">

            <img
              src="/images/china-map-real.png"
              alt="中国地图底图"
              class="absolute inset-0 w-full h-full object-contain opacity-90 drop-shadow-2xl"
            />

            <div class="absolute inset-0 w-full h-full">
              <div v-for="prov in provincesData" :key="prov.name" class="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500" :style="{ left: prov.left, top: prov.top }" :class="isProvinceHighlighted(prov.name) ? 'opacity-100 hover:z-20' : 'opacity-20 grayscale scale-90'">
                <button @click="selectProvince(prov.name)" class="rounded-full border-2 transition-all cursor-pointer shadow-lg hover:scale-125 focus:outline-none" :class="[prov.size, selectedProvince === prov.name ? `${prov.active} scale-125 border-white ring-4 ring-${prov.base}/30` : `${prov.base} border-white/50 hover:${prov.active}`]"></button>
                <span class="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-white/90 whitespace-nowrap font-medium bg-black/70 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm transition-opacity" :class="selectedProvince === prov.name ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'">
                  {{ prov.name }}
                </span>
              </div>
            </div>

          </div>

          <div class="w-full lg:w-[280px] shrink-0 transform transition-all duration-500" :class="selectedProvince ? 'scale-105' : 'scale-100'">
            <div class="bg-[#9d1b1b] text-[#f5ebd7] rounded shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-[#c13030] overflow-hidden">

              <div class="text-center pt-6 pb-4 px-4 relative">
                <div class="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#d8c3a5] opacity-50"></div>
                <div class="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#d8c3a5] opacity-50"></div>

                <h3 class="text-xl font-bold tracking-[0.2em] mb-2 font-serif">
                  【 {{ selectedProvince || '全国' }} 】
                </h3>
                <p class="text-xs opacity-80 tracking-widest border-b border-[#d8c3a5]/30 pb-3 inline-block px-6">
                  代表性统计
                </p>
              </div>

              <div class="bg-[#8b1818] p-1">
                <div v-if="aggregatedData.length > 0" class="grid grid-cols-2 gap-[1px] bg-[#d8c3a5]/20">
                  <div v-for="(stat, index) in aggregatedData" :key="index" class="bg-[#9d1b1b] py-5 px-2 text-center flex flex-col justify-center items-center group hover:bg-[#b02222] transition-colors">
                    <span class="text-2xl font-bold mb-1 transform group-hover:scale-110 transition-transform duration-300">{{ stat.count }}</span>
                    <span class="text-[10px] tracking-wider opacity-80">{{ stat.type }}</span>
                  </div>
                </div>

                <div v-else class="bg-[#9d1b1b] py-16 text-center opacity-60">
                  <UIcon name="i-lucide-map" class="w-8 h-8 mx-auto mb-3 opacity-50" />
                  <p class="text-sm">该地区暂无数据</p>
                </div>
              </div>

              <div class="p-4 text-center relative">
                <div class="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#d8c3a5] opacity-50"></div>
                <div class="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#d8c3a5] opacity-50"></div>

                <div class="inline-flex items-center justify-center gap-2 font-bold w-full">
                  <span class="text-xs opacity-80">总计：</span>
                  <span class="text-2xl text-amber-400 font-serif">{{ totalBuildings }}</span>
                  <span class="text-xs opacity-80">项</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div class="mt-8 max-w-2xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <button
              v-for="legend in mapLegend"
              :key="legend.id"
              @click="toggleFilter(legend.id)"
              class="group relative overflow-hidden bg-[#1a1a1a] p-3 rounded-xl border transition-all duration-300 focus:outline-none"
              :class="activeFilter === legend.id ? 'border-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.15)] bg-[#222]' : 'border-[#333] hover:border-[#555]'"
            >
              <div class="w-2.5 h-2.5 rounded-full mx-auto mb-2 transition-transform duration-300"
                   :class="[legend.color, activeFilter === legend.id ? 'scale-125' : 'group-hover:scale-110']">
              </div>
              <p class="text-xs transition-colors" :class="activeFilter === legend.id ? 'text-amber-400 font-medium' : 'text-white/70 group-hover:text-white'">
                {{ legend.label }}
              </p>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
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
