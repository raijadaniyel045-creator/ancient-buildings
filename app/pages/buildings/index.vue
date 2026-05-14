<template>
  <div class="min-h-[calc(100vh-112px)] text-black pb-12">
    <div class="w-full bg-[#8b2b2b] text-white py-12 px-6 shadow-md relative overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div>
          <h1 class="text-4xl lg:text-5xl font-bold font-serif tracking-widest mb-3">
            全国古建清单库
          </h1>
          <p class="text-white/80 font-light tracking-wide text-lg">
            大国工匠的千年智慧，网罗全国 {{ total }} 座著名传世建筑。
          </p>
        </div>
        <div class="relative w-full md:w-112.5">
          <UInputTags
            v-model="tags"
            :display-value="displayTagValue"
            :convert-value="wrapTagValue"
            placeholder="全局检索：输入建筑名、地区、描述..."
            class="w-full px-8 py-4 pr-12 rounded-full text-black bg-white focus:outline-none shadow-xl outline-none border-2 border-transparent transition-all focus:border-amber-500 text-lg"
          />
          <UIcon
            name="i-lucide-search"
            class="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
          />
        </div>
      </div>
    </div>

    <UPage class="mx-auto px-6 py-10 gap-10">

      <template #left>
        <UPageAside class="bg-white p-6 rounded-xl shadow-sm border border-[#e8dfcf] top-32.5">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h3 class="text-xl font-bold font-serif text-[#8b2b2b] flex items-center gap-2">
              <UIcon name="i-lucide-filter" class="w-5 h-5" /> 高级筛选
            </h3>
            <ULink
              class="text-sm font-medium text-gray-400 hover:text-[#8b2b2b] transition-colors border border-gray-200 px-3 py-1 rounded-full cursor-pointer"
              @click="clear"
            >
              重置
            </ULink>
          </div>

          <template v-if="provinceList.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">所属地域</h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="prov in provinceList"
                  :key="prov"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border cursor-pointer"
                  :class="existTag(prov, 'prov') ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(prov, 'prov')"
                >
                  {{ t(prov) }}
                </ULink>
              </div>
            </div>
          </template>

          <template v-if="availableDynastyGroups.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">建制朝代</h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="group in availableDynastyGroups"
                  :key="group.label"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border cursor-pointer"
                  :class="existTag(group.label, 'dynaGroup') ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleDynaGroup(group.label)"
                >
                  {{ group.label }}
                </ULink>
              </div>
            </div>
          </template>

          <template v-if="validCategories.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">建筑类别</h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="cate in validCategories"
                  :key="cate"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border cursor-pointer"
                  :class="existTag(cate, 'cate') ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(cate, 'cate')"
                >
                  {{ t(cate) }}
                </ULink>
              </div>
            </div>
          </template>
        </UPageAside>
      </template>

      <template #default>
        <UPageBody>
          <div class="mb-4 text-gray-500 font-serif text-sm">
            已找到 <span class="text-[#8b2b2b] font-bold text-lg">{{ filter }}</span> 处相关古建筑
          </div>

          <template v-if="filter === 0">
            <div class="py-24 bg-white rounded-xl border border-[#e8dfcf] text-center text-gray-500 font-serif">
              <UIcon name="i-lucide-box-select" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p class="text-xl">未能找到符合筛选条件的古建数据。</p>
              <button class="mt-4 text-[#8b2b2b] hover:underline underline-offset-4 cursor-pointer" @click="clear">
                清除筛选条件
              </button>
            </div>
          </template>

          <template v-else>
            <UPageColumns>
              <ULink
                v-for="b in buildings"
                :key="b.hash"
                class="bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
                :to="localePath(`/buildings/${b.hash}`)"
              >
                <div class="h-56 overflow-hidden relative border-b border-[#e8dfcf]">
                  <NuxtImg
                    :src="b.img"
                    fit="cover"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    placeholder
                  />
                  <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <div class="absolute top-3 right-3 flex gap-2">
                    <span v-for="(c, ci) in b.categories" :key="c+ci" class="bg-black/60 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-white/20">
                      {{ t(c) }}
                    </span>
                    <span v-for="(d, di) in b.dynasties" :key="d+di" class="bg-amber-600/80 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-amber-400/20">
                      {{ t(d) }}
                    </span>
                  </div>
                  <div class="absolute bottom-3 left-3 flex items-center text-white/90 text-sm font-light z-10 transition-transform group-hover:-translate-y-1">
                    <UIcon name="i-lucide-map-pin" class="w-4 h-4 mr-1 text-red-500" />
                    <span v-for="(p, pi) in b.provinces" :key="p+pi" class="mx-0.5">{{ t(p) }}</span>
                  </div>
                </div>

                <div class="p-5 flex-1 flex flex-col relative bg-[#fcfcfa]">
                  <h3 class="text-2xl font-bold font-serif text-[#8b2b2b] mb-2 group-hover:text-amber-700 transition-colors">
                    {{ b.name }}
                  </h3>
                  <p class="text-sm text-gray-600 leading-relaxed font-light mb-4 flex-1 line-clamp-3">
                    {{ b.desc }}
                  </p>
                  <div class="pt-4 border-t border-gray-100 flex justify-between items-center group-hover:border-amber-100 transition-colors">
                    <span class="text-[10px] text-gray-400 font-mono">ID: {{ (b.hash as string).substring(0, 6) }}</span>
                    <span class="text-sm text-[#8b2b2b] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      查看详情 <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </ULink>
            </UPageColumns>

            <div class="flex justify-center relative p-4 z-1">
              <UPagination v-model:page="page" :items-per-page="pageSize" :total="filter" />
              <UInputNumber v-model="pageSize" orientation="vertical" class="w-20 mx-2" />
            </div>
          </template>
        </UPageBody>
      </template>
    </UPage>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { components, paths } from '~/types'

const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const page = ref(Number(route.query.page) || 1)
const defaultPageSize = 12
const pageSize = ref(Number(route.query.pageSize) || defaultPageSize)

// ==========================================
// 1. 基础状态定义
// ==========================================
type TagValue = {
  name: string
  type: 'prov' | 'cate' | 'dyna' | 'sear' | 'dynaGroup'
}

const tags = ref<TagValue[]>([])
function displayTagValue(tag: TagValue): string { return t(tag.name) }
function wrapTagValue(name: string): TagValue { return { name, type: 'sear' } }

// ==========================================
// 2. 数据获取与“小类精准映射归类”
// ==========================================
const { data: summaryResponse } = await useAsyncData<components['schemas']['BuildingSummaryResponse']>(`buildings-summary-${locale.value}`,
  () => $fetch('/api/v1/Buildings'))

const provinceList = computed(() => summaryResponse.value?.provinces?.values || [])
const categoryList = computed(() => summaryResponse.value?.categories?.values || [])
const rawDynastyList = computed(() => summaryResponse.value?.dynasties?.values || [])
const total = computed(() => summaryResponse.value?.total || 0)

// 【类别清洗】：只保留翻译后含有中文字符的类别，屏蔽纯英文乱码
const validCategories = computed(() => {
  return categoryList.value.filter((c: string) => {
    const translated = t(c)
    return /[\u4e00-\u9fa5]/.test(translated)
  })
})

// 【核心！动态并集算法】：扫描你发给我的那 400 多个小类，分别塞进对应的大类抽屉里。
// 允许一个词横跨多个抽屉（比如“唐至宋”会同时进隋唐和宋辽两个抽屉），实现并集！
const availableDynastyGroups = computed(() => {
  const groups = [
    { label: '近现代', rawValues: [] as string[] },
    { label: '明清', rawValues: [] as string[] },
    { label: '宋辽金元', rawValues: [] as string[] },
    { label: '隋唐五代', rawValues: [] as string[] },
    { label: '秦汉魏晋南北朝', rawValues: [] as string[] },
    { label: '史前及先秦', rawValues: [] as string[] }
  ]

  rawDynastyList.value.forEach((raw: string) => {
    // 采用你提出的并集思想，不用 else if，只要关键词命中就加进去
    if (/民国|现代|当代|近代|共和国|18[4-9]\d|19\d\d|20\d\d|20世纪/.test(raw)) {
      groups[0].rawValues.push(raw)
    }
    if (/明|清|18[0-3]\d/.test(raw)) {
      groups[1].rawValues.push(raw)
    }
    if (/宋|辽|金|元|大理|南诏|西夏|10\d\d|11\d\d|12\d\d|13\d\d|996|十世纪/.test(raw)) {
      groups[2].rawValues.push(raw)
    }
    if (/隋|唐|五代|十国|渤海|641|789|七世纪/.test(raw)) {
      groups[3].rawValues.push(raw)
    }
    if (/秦|汉|三国|魏|蜀|吴|晋|南北朝|十六国|六朝|曹|高昌|高句丽/.test(raw)) {
      groups[4].rawValues.push(raw)
    }
    if (/石器|史前|夏|商|周|春秋|战国|青铜|铁器|远古|公元前|殷/.test(raw)) {
      groups[5].rawValues.push(raw)
    }
  })

  // 只返回有数据的大类
  return groups.filter(g => g.rawValues.length > 0)
})


// ==========================================
// 3. API 请求构建 (打包小类，合并发送)
// ==========================================
const { data: apiData, refresh } = await useAsyncData<components['schemas']['SplitPageResponse']>(`buildings-${locale.value}`,
  () => {
    const p = tags.value.filter(v => v.type === 'prov').map(v => v.name)
    const c = tags.value.filter(v => v.type === 'cate').map(v => v.name)
    const s = tags.value.filter(v => v.type === 'sear').map(v => v.name)

    // 【狸猫换太子】：用户虽然选的是大类标签，但我们实际上是把大类底下所有的小类全部打包拿出来
    let combinedDynasties: string[] = []
    const dGroupLabels = tags.value.filter(v => v.type === 'dynaGroup').map(v => v.name)

    dGroupLabels.forEach(label => {
      const group = availableDynastyGroups.value.find(g => g.label === label)
      if (group) {
        combinedDynasties.push(...group.rawValues)
      }
    })

    const dRaw = tags.value.filter(v => v.type === 'dyna').map(v => v.name)
    combinedDynasties.push(...dRaw)

    combinedDynasties = [...new Set(combinedDynasties)] // 去重，确保比如"唐至宋"不会被传两次

    return $fetch('/api/v1/Buildings', {
      method: 'POST',
      query: {
        Page: page.value,
        PageSize: pageSize.value,
        // 恢复原版后端的识别方式：逗号拼接字符串
        Provinces: p.length ? p.join(',') : undefined,
        Categories: c.length ? c.join(',') : undefined,
        Searches: s.length ? s.join(',') : undefined,
        Dynasties: combinedDynasties.length ? combinedDynasties.join(',') : undefined
      } as paths['/api/v1/Buildings']['post']['parameters']['query']
    })
  },
  { watch: [page, pageSize, tags] }
)

const buildings = computed<components['schemas']['BuildingSlug'][]>(() => apiData.value?.items || [])
const filter = computed(() => apiData.value?.total || 0)

// ==========================================
// 4. 用户交互操作
// ==========================================
function toggleTag(tag: string, type: 'prov' | 'cate' | 'dyna' | 'sear'): void {
  const existing = tags.value.find(v => v.type === type && v.name === tag)
  if (existing) {
    tags.value = tags.value.filter(t => t !== existing)
  } else {
    tags.value.push({ name: tag, type })
    refresh()
  }
  page.value = 1
}

function toggleDynaGroup(label: string) {
  const existing = tags.value.find(v => v.type === 'dynaGroup' && v.name === label)
  if (existing) {
    tags.value = tags.value.filter(t => t !== existing)
  } else {
    tags.value.push({ name: label, type: 'dynaGroup' })
    refresh()
  }
  page.value = 1
}

function existTag(tag: string, type: TagValue['type']): boolean {
  return tags.value.find(v => v.type === type && v.name === tag) !== undefined
}

function clear() {
  tags.value = []
  page.value = 1
}

function updateUrl() {
  const p = tags.value.filter(v => v.type === 'prov').map(v => v.name)
  const c = tags.value.filter(v => v.type === 'cate').map(v => v.name)
  const s = tags.value.filter(v => v.type === 'sear').map(v => v.name)

  let combinedDynasties: string[] = []
  const dGroupLabels = tags.value.filter(v => v.type === 'dynaGroup').map(v => v.name)

  dGroupLabels.forEach(label => {
    const group = availableDynastyGroups.value.find(g => g.label === label)
    if (group) {
      combinedDynasties.push(...group.rawValues)
    }
  })

  const dRaw = tags.value.filter(v => v.type === 'dyna').map(v => v.name)
  combinedDynasties.push(...dRaw)
  combinedDynasties = [...new Set(combinedDynasties)]

  router.replace({
    query: {
      Page: page.value,
      PageSize: pageSize.value !== 12 ? pageSize.value : undefined,
      Provinces: p.length ? p.join(',') : undefined,
      Categories: c.length ? c.join(',') : undefined,
      Searches: s.length ? s.join(',') : undefined,
      Dynasties: combinedDynasties.length ? combinedDynasties.join(',') : undefined
    } as paths['/api/v1/Buildings']['post']['parameters']['query']
  })
}

watch([page, pageSize, tags], () => {
  updateUrl()
}, { deep: true })
</script>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(139, 43, 43, 0.2);
  border-radius: 10px;
}
</style>
