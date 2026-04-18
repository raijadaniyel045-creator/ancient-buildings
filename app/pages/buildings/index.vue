<template>
  <div>
    <UPage>
      <template #left>
        <UPageAside>
          <UInputTags v-model="tags" />
        </UPageAside>
      </template>
      <template #default>
        <UPageColumns>
          <ULink
            v-for="(b, index) in buildings"
            :key="index"
            class="bg-white rounded-xl overflow-hidden border border-[#e8dfcf] shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
            :to="localePath(b.path)"
          >
            <!-- Card Image Box -->
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

            <!-- Card Body -->
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
        <UPagination
          v-model:page="page"
          :total="20"
          :to="to"
          :sibling-count="1"
          show-edges
        />
      </template>
    </UPage>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const buildings = await queryCollection('buildings').all()
const provinceList = [...new Set(buildings.map(b => b.province).flat())]
const dynastyList = [...new Set(buildings.map(b => b.dynasty).flat())]
const categoryList = [...new Set(buildings.map(b => b.category).flat())]

const route = useRoute()
const tags = ref([...(route.query.tags || ``).split(',')
  .map(part => part.trim())
  .filter(part => part !== '')])
const page = ref(1)
page.value = Number(route.query.page || `1`)

function to(page: number) {
  return {
    query: {
      page: page,
      tags: [...tags.value].join(',')
    },
    hash: '#with-links'
  }
}
</script>
