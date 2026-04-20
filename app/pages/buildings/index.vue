<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#fdfaf5] text-black pb-12">
    <div class="w-full bg-[#8b2b2b] text-white py-12 px-6 shadow-md relative overflow-hidden">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div>
          <h1 class="text-4xl lg:text-5xl font-bold font-serif tracking-widest mb-3">
            全国古建清单库
          </h1>
          <p class="text-white/80 font-light tracking-wide text-lg">
            大国工匠的千年智慧，网罗全国 {{ buildings.length }} 座著名传世建筑。
          </p>
        </div>
        <div class="relative w-full md:w-112.5">
          <UInputTags
            v-model="tags"
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
              @click="tags.splice(0, tags.length)"
            >
              重置
            </ULink>
          </div>
          <template v-if="provinceList.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">
                所属地域
              </h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="prov in provinceList"
                  :key="prov"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                  :class="tags.includes(prov) ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(prov)"
                >
                  {{ prov }}
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
                  v-for="dyna in dynastyList"
                  :key="dyna"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                  :class="tags.includes(dyna) ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(dyna)"
                >
                  {{ dyna }}
                </ULink>
              </div>
            </div>
          </template>
          <template v-if="categoryList.length > 0">
            <div class="mb-8">
              <h4 class="text-sm font-bold text-gray-800 mb-4 tracking-widest">
                建筑类别
              </h4>
              <div class="flex flex-wrap gap-2">
                <ULink
                  v-for="cate in categoryList"
                  :key="cate"
                  class="px-3.5 py-1.5 text-sm rounded-full transition-all border"
                  :class="tags.includes(cate) ? 'bg-[#8b2b2b] border-[#8b2b2b] text-white shadow-md' : 'bg-transparent border-gray-200 text-gray-600 hover:border-gray-400'"
                  @click="toggleTag(cate)"
                >
                  {{ cate }}
                </ULink>
              </div>
            </div>
          </template>
        </UPageAside>
      </template>
      <template #default>
        <UPageBody>
          <div class="mb-4 text-gray-500 font-serif text-sm">
            已找到 <span class="text-[#8b2b2b] font-bold text-lg">{{ total }}</span> 处相关古建筑
          </div>
          <template v-if="total === 0">
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
                @click="tags.splice(0, tags.length)"
              >
                清除筛选条件
              </button>
            </div>
          </template>
          <template v-else>
            <UPageColumns>
              <ULink
                v-for="b in buildings"
                :key="b.id"
                class="bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
                :to="localePath(b.path)"
              >
                <div class="h-56 overflow-hidden relative border-b border-[#e8dfcf]">
                  <NuxtImg
                    :src="b.img"
                    fit="cover"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    placeholder
                  />
                  <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  <!-- Badges atop image -->
                  <div class="absolute top-3 right-3 flex gap-2">
                    <span
                      v-for="(c, ci) in b.category"
                      :key="c+ci"
                      class="bg-black/60 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-white/20"
                    >
                      {{ c }}
                    </span>
                    <span
                      v-for="(d, di) in b.dynasty"
                      :key="d+di"
                      class="bg-amber-600/80 text-white text-xs px-2.5 py-1 rounded-sm backdrop-blur-md border border-amber-400/20"
                    >
                      {{ d }}
                    </span>
                  </div>
                  <div class="absolute bottom-3 left-3 flex items-center text-white/90 text-sm font-light z-10 transition-transform group-hover:-translate-y-1">
                    <UIcon
                      name="i-lucide-map-pin"
                      class="w-4 h-4 mr-1 text-red-500"
                    />
                    <span
                      v-for="(p, pi) in b.province"
                      :key="p+pi"
                      class="mx-0.5"
                    >
                      {{ p }}
                    </span>
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
                    <span class="text-[10px] text-gray-400 font-mono">ID: {{ b.title }}</span>
                    <span class="text-sm text-[#8b2b2b] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      查看详情 <UIcon
                        name="i-lucide-arrow-right"
                        class="w-3.5 h-3.5"
                      />
                    </span>
                  </div>
                </div>
              </ULink>
            </UPageColumns>
            <div class="flex justify-center relative p-4 z-1">
              <UPagination
                v-model:page="page"
                :items-per-page="pageSize"
                :total="totalPages"
              />
            </div>
          </template>
        </UPageBody>
      </template>
    </UPage>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const page = ref(Number(route.query.page) || 1)
const defaultPageSize = 12
const pageSize = ref(Number(route.query.pageSize) || defaultPageSize)
const tags = ref(route.query.tags ? (route.query.tags as string).split(',') : [])

const { data: apiData, refresh } = await useAsyncData(`buildings-${locale.value}`,
  () => {
    return $fetch('/api/buildings', {
      query: {
        page: page.value,
        pageSize: pageSize.value,
        tags: tags.value.join(',')
      }
    })
  },
  {
    watch: [page, pageSize, tags]
  })

const buildings = computed(() => apiData.value?.items || [])
const total = computed(() => apiData.value?.total || 0)
const totalPages = computed(() => apiData.value?.totalPages || 0)
const provinceList = computed(() => apiData.value?.tagOptions?.provinceList || [])
const dynastyList = computed(() => apiData.value?.tagOptions?.dynastyList || [])
const categoryList = computed(() => apiData.value?.tagOptions?.categoryList || [])

function toggleTag(tag: string) {
  if (tags.value.includes(tag)) {
    tags.value = tags.value.filter(t => t !== tag)
  } else {
    tags.value.push(tag)
  }
  page.value = 1
  refresh()
}

function updateUrl() {
  router.replace({
    query: {
      page: page.value,
      pageSize: pageSize.value !== 12 ? pageSize.value : undefined,
      tags: tags.value.length ? tags.value.join(',') : undefined
    }
  })
}

watch([page, tags], () => {
  updateUrl()
}, { deep: true })

watch(() => route.query, (newQuery) => {
  const newPage = Number(newQuery.page) || 1
  const newTags = newQuery.tags ? (newQuery.tags as string).split(',') : []
  if (newPage !== page.value) page.value = newPage
  if (JSON.stringify(newTags) !== JSON.stringify(tags.value)) tags.value = newTags
})
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
