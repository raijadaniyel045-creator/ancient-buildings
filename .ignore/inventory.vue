<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// The data is auto-imported from composables/useBuildings.ts
const buildings = useBuildings.value
// Filters state
const query = ref('')
const selectedProvince = ref('')
const selectedDynasty = ref('')
const selectedCategory = ref('')

// Compute available filter options dynamically
const provinces = computed(() => [...new Set(buildings.map(b => b.province))].sort())
const dynasties = computed(() => [...new Set(buildings.map(b => b.dynasty))].sort())
const categories = computed(() => [...new Set(buildings.map(b => b.category))].sort())

const filteredBuildings = computed(() => {
  return buildings.filter(b => {
    const matchQuery = b.name.includes(query.value) || b.province.includes(query.value) || b.desc.includes(query.value)
    const matchProvince = selectedProvince.value === '' || b.province === selectedProvince.value
    const matchDynasty = selectedDynasty.value === '' || b.dynasty === selectedDynasty.value
    const matchCategory = selectedCategory.value === '' || b.category === selectedCategory.value
    return matchQuery && matchProvince && matchDynasty && matchCategory
  })
})

const resetFilters = () => {
  query.value = ''
  selectedProvince.value = ''
  selectedDynasty.value = ''
  selectedCategory.value = ''
}

const uncheckCurrent = (type: string, val: string) => {
  if (type === 'province' && selectedProvince.value === val) selectedProvince.value = ''
  if (type === 'dynasty' && selectedDynasty.value === val) selectedDynasty.value = ''
  if (type === 'category' && selectedCategory.value === val) selectedCategory.value = ''
}

const goToDetail = (id: string) => {
  router.push(`/building/${id}`)
}
</script>

<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#fdfaf5] text-black pb-12">
    <!-- Header Banner -->
    <div class="w-full bg-[#8b2b2b] text-white py-12 px-6 shadow-md relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=1920" class="w-full h-full object-cover" />
      </div>
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div>
          <h1 class="text-4xl lg:text-5xl font-bold font-serif tracking-widest mb-3">全国古建清单库</h1>
          <p class="text-white/80 font-light tracking-wide text-lg">大国工匠的千年智慧，网罗全国 {{ buildings.length }} 座著名传世建筑。</p>
        </div>
        <!-- Global Search -->
        <div class="relative w-full md:w-[450px]">
          <input
            v-model="query"
            type="text"
            placeholder="全局检索：输入建筑名、地区、描述..."
            class="w-full px-6 py-4 pr-12 rounded-full text-black bg-white focus:outline-none shadow-xl outline-none border-2 border-transparent transition-all focus:border-amber-500 text-lg"
          />
          <UIcon name="i-lucide-search" class="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">

      <!-- Left Sidebar (Filters) -->
      <div class="w-full lg:w-[280px] flex-shrink-0">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-[#e8dfcf] sticky top-[130px]">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h3 class="text-xl font-bold font-serif text-[#8b2b2b] flex items-center gap-2">
              <UIcon name="i-lucide-filter" class="w-5 h-5" /> 高级筛选
            </h3>
            <button @click="resetFilters" class="text-sm font-medium text-gray-400 hover:text-[#8b2b2b] transition-colors border border-gray-200 px-3 py-1 rounded-full">重置</button>
          </div>

          <!-- Region Filter -->
          <div class="mb-8">
            <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">所属地域</h4>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="prov in provinces" :key="prov"
                @click="selectedProvince = selectedProvince === prov ? '' : prov"
                class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                :class="selectedProvince === prov ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
              >
                {{ prov }}
              </button>
            </div>
          </div>

           <!-- Dynasty Filter -->
           <div class="mb-8">
            <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">建制朝代</h4>
            <div class="flex flex-col gap-2.5">
              <label v-for="dyn in dynasties" :key="dyn" class="flex items-center gap-3 cursor-pointer text-sm text-gray-600 hover:text-gray-900 group">
                <input
                  type="radio"
                  :value="dyn"
                  v-model="selectedDynasty"
                  @click="uncheckCurrent('dynasty', dyn)"
                  class="w-4 h-4 text-[#8b2b2b] focus:ring-[#8b2b2b]"
                />
                <span class="group-hover:text-[#8b2b2b] transition-colors">{{ dyn }}</span>
              </label>
            </div>
          </div>

          <!-- Category Filter -->
          <div>
            <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">建筑类别</h4>
            <div class="flex flex-col gap-2.5">
              <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 cursor-pointer text-sm text-gray-600 hover:text-gray-900 group">
                <input
                  type="radio"
                  :value="cat"
                  v-model="selectedCategory"
                  @click="uncheckCurrent('category', cat)"
                  class="w-4 h-4 text-[#8b2b2b] focus:ring-[#8b2b2b]"
                />
                <span class="group-hover:text-[#8b2b2b] transition-colors">{{ cat }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content (Grid) -->
      <div class="flex-1">
        <div class="mb-4 text-gray-500 font-serif text-sm">
          已找到 <span class="text-[#8b2b2b] font-bold text-lg">{{ filteredBuildings.length }}</span> 处相关古建筑
        </div>

        <div v-if="filteredBuildings.length === 0" class="py-24 bg-white rounded-xl border border-[#e8dfcf] text-center text-gray-500 font-serif">
          <UIcon name="i-lucide-box-select" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p class="text-xl">未能找到符合筛选条件的古建数据。</p>
          <button @click="resetFilters" class="mt-4 text-[#8b2b2b] hover:underline underline-offset-4">清除筛选条件</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <!-- Building Cards -->
          <div
            v-for="b in filteredBuildings"
            :key="b.id"
            @click="goToDetail(b.id)"
            class="bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
          >
            <!-- Card Image Box -->
            <div class="h-56 overflow-hidden relative border-b border-[#e8dfcf]">
              <img :src="b.img" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>

              <!-- Badges atop image -->
              <div class="absolute top-3 right-3 flex gap-2">
                <span class="bg-black/60 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-white/20">
                  {{ b.category }}
                </span>
                <span class="bg-amber-600/80 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-amber-400/20">
                  {{ b.dynasty }}
                </span>
              </div>
              <div class="absolute bottom-3 left-3 flex items-center text-white/90 text-sm font-light z-10 transition-transform group-hover:-translate-y-1">
                <UIcon name="i-lucide-map-pin" class="w-4 h-4 mr-1 text-red-500" />
                {{ b.province }}
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 flex-1 flex flex-col relative bg-[#fcfcfa]">
              <h3 class="text-2xl font-bold font-serif text-[#8b2b2b] mb-2 group-hover:text-amber-700 transition-colors">{{ b.name }}</h3>
              <p class="text-sm text-gray-600 leading-relaxed font-light mb-4 flex-1 line-clamp-3">
                {{ b.desc }}
              </p>

              <div class="pt-4 border-t border-gray-100 flex justify-between items-center group-hover:border-amber-100 transition-colors">
                <span class="text-[10px] text-gray-400 font-mono">ID: {{ b.id }}</span>
                <span class="text-sm text-[#8b2b2b] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  查看详情 <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Hidden scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(139, 43, 43, 0.2);
  border-radius: 10px;
}
</style>
