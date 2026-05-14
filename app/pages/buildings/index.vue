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
    <UPage
      class="mx-auto px-6 py-10 gap-10"
    >
      <template #left>
        <UPageAside class="bg-white p-6 rounded-xl shadow-sm border border-[#e8dfcf] top-32.5">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h3 class="text-xl font-bold font-serif text-[#8b2b2b] flex items-center gap-2">
              <UIcon
                name="i-lucide-filter"
                class="w-5 h-5"
              /> 高级筛选
            </h3>
            <ULink
              class="text-sm font-medium text-gray-400 hover:text-[#8b2b2b] transition-colors border border-gray-200 px-3 py-1 rounded-full"
              @click="clear"
            >
              重置
            </ULink>
          </div>
          <template v-if="categoryList.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">
                建筑类别
              </h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="cate in categoryList.values"
                  :key="cate"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                  :class="existTag(cate, 'cate') ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(cate, 'cate')"
                >
                  {{ t(cate) }}
                </ULink>
              </div>
            </div>
          </template>
          <template v-if="provinceList.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">
                所属地域
              </h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="prov in provinceList.values"
                  :key="prov"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                  :class="existTag(prov, 'prov') ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(prov, 'prov')"
                >
                  {{ t(prov) }}
                </ULink>
              </div>
            </div>
          </template>
          <template v-if="dynastyList.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">
                建制朝代
              </h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="dyna in dynastyList.values"
                  :key="dyna"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                  :class="existTag(dyna, 'dyna') ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(dyna, 'dyna')"
                >
                  {{ t(dyna) }}
                </ULink>
              </div>
            </div>
          </template>
        </UPageAside>
      </template>
      <template #default>
        <UPageBody>
          <div class="mb-4 text-gray-500 font-serif text-sm">
            <UCheckbox
              v-model="filterRed"
              :label="t('只看红色精神相关建筑')"
            />
            已找到 <span class="text-[#8b2b2b] font-bold text-lg">{{ filter }}</span> 处相关古建筑
          </div>
          <template v-if="filter === 0">
            <div class="py-24 bg-white rounded-xl border border-[#e8dfcf] text-center text-gray-500 font-serif">
              <UIcon
                name="i-lucide-box-select"
                class="w-16 h-16 mx-auto mb-4 text-gray-300"
              />
              <p class="text-xl">
                未能找到符合筛选条件的古建数据。
              </p>
              <button
                class="mt-4 text-[#8b2b2b] hover:underline underline-offset-4"
                @click="clear"
              >
                清除筛选条件
              </button>
            </div>
          </template>
          <template v-else>
            <UPageColumns>
              <BuildingSlugCard
                v-for="b in buildings"
                :key="b.hash"
                v-bind="b"
              />
            </UPageColumns>
            <div class="flex justify-center relative p-4 z-1">
              <UPagination
                v-model:page="page"
                :items-per-page="pageSize"
                :total="filter"
              />
              <UInputNumber
                v-model="pageSize"
                orientation="vertical"
                class="w-20 mx-2"
              />
            </div>
          </template>
        </UPageBody>
      </template>
    </UPage>
  </div>
</template>

<script setup lang="ts">
import BuildingSlugCard from '~/components/buildings/BuildingSlugCard.vue'
import type { components, paths } from '~/types'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const page = ref(Number(route.query.Page) || 1)
const defaultPageSize = 12
const pageSize = ref(Number(route.query.PageSize) || defaultPageSize)

type TagValue = {
  name: string
  type: 'prov' | 'cate' | 'dyna' | 'sear'
}
const filterRed = ref<boolean>(Boolean(route.query.FilterRed) || false)
const tags = ref<TagValue[]>([])
function displayTagValue(tag: TagValue): string {
  return t(tag.name)
}
function wrapTagValue(name: string): TagValue {
  return ({
    name,
    type: 'sear'
  })
}

const { data: summaryResponse } = await useAsyncData<components['schemas']['BuildingSummaryResponse']>(`buildings-summary-${locale.value}`,
  () => $fetch('/api/v1/Buildings'))
const provinceList = summaryResponse.value?.provinces || { values: [], length: 0 }
const dynastyList = summaryResponse.value?.dynasties || { values: [], length: 0 }
const categoryList = summaryResponse.value?.categories || { values: [], length: 0 }
const total = computed(() => summaryResponse.value?.total || 0)

const { data: apiData, refresh } = await useAsyncData<components['schemas']['SplitPageResponse']>(`buildings-${locale.value}`,
  () => {
    const p = tags.value.filter(v => v.type === 'prov').flatMap(v => v.name)
    const d = tags.value.filter(v => v.type === 'dyna').flatMap(v => v.name)
    const s = tags.value.filter(v => v.type === 'sear').flatMap(v => v.name)
    const c = tags.value.filter(v => v.type === 'cate').flatMap(v => v.name)
    return $fetch('/api/v1/Buildings', {
      method: 'POST',
      query: {
        Page: page.value,
        PageSize: pageSize.value,
        FilterRed: filterRed.value,
        Provinces: p.length ? p.join(',') : undefined,
        Dynasties: d.length ? d.join(',') : undefined,
        Categories: c.length ? c.join(',') : undefined,
        Searches: s.length ? s.join(',') : undefined
      } as paths['/api/v1/Buildings']['post']['parameters']['query']
    })
  },
  {
    watch: [page, pageSize, tags, filterRed]
  })

const buildings = computed<components['schemas']['BuildingSlug'][]>(() => apiData.value?.items || [])
const filter = computed(() => apiData.value?.total || 0)

function toggleTag(tag: string, type: 'prov' | 'cate' | 'dyna' | 'sear'): void {
  const data = tags.value.find(v => v.type === type && v.name == tag)
  if (data) {
    tags.value = tags.value.filter(t => t !== data)
  } else {
    tags.value.push({
      name: tag,
      type
    })
  }
  page.value = 1
  refresh()
}
function existTag(tag: string, type: TagValue['type']): boolean {
  return tags.value.find(v => v.type === type && v.name == tag) !== undefined
}

function clear() {
  tags.value = []
  page.value = 1
}

function updateUrl() {
  const p = tags.value.filter(v => v.type === 'prov').flatMap(v => v.name)
  const d = tags.value.filter(v => v.type === 'dyna').flatMap(v => v.name)
  const s = tags.value.filter(v => v.type === 'sear').flatMap(v => v.name)
  const c = tags.value.filter(v => v.type === 'cate').flatMap(v => v.name)
  router.replace({
    path: route.fullPath,
    query: {
      FilterRed: filterRed.value ?? false,
      Page: page.value,
      PageSize: pageSize.value !== 12 ? pageSize.value : undefined,
      Provinces: p.length ? p.join(',') : undefined,
      Dynasties: d.length ? d.join(',') : undefined,
      Categories: c.length ? c.join(',') : undefined,
      Searches: s.length ? s.join(',') : undefined
    } as paths['/api/v1/Buildings']['post']['parameters']['query']
  })
}
watch([page, pageSize, tags, filterRed], () => {
  updateUrl()
}, { deep: true })
</script>

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
