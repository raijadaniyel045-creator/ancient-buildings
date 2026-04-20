<template>
  <div class="min-h-[calc(100vh-112px)] bg-[#fbf8f1] text-gray-800 relative z-0 paper-texture pb-20">
    <template v-if="post">
      <div class="w-full h-[65vh] relative overflow-hidden group">
        <NuxtImg
          :src="post.img"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-linear-to-t from-[#1a1412] via-[#1a1412]/60 to-transparent" />
        <div class="absolute inset-0 bg-linear-to-r from-black/40 to-transparent" />

        <ULink
          class="absolute top-8 left-8 z-10 flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/50 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 font-medium tracking-wider text-sm"
          :to="localePath('/buildings')"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="w-4 h-4"
          /> 返回卷宗
        </ULink>
        <div class="absolute bottom-16 left-8 md:left-16 right-8 md:right-16 z-10">
          <div class="max-w-6xl mx-auto">
            <div class="flex flex-wrap gap-4 mb-6">
              <template
                v-for="category in post.category"
                :key="category"
              >
                <span
                  class="px-4 py-1.5 bg-[#d4af37]/20 text-[#ebd38a] text-xs font-bold tracking-[0.2em] uppercase rounded-sm border border-[#d4af37]/40 backdrop-blur-md shadow-sm"
                >
                  {{ category }}
                </span>
              </template>
              <template
                v-for="dynasty in post.dynasty"
                :key="dynasty"
              >
                <span class="px-4 py-1.5 bg-white/10 text-white/90 text-xs font-bold tracking-[0.2em] uppercase rounded-sm border border-white/20 backdrop-blur-md shadow-sm">
                  {{ dynasty }}
                </span>
              </template>
              <template
                v-for="province in post.province"
                :key="province"
              >
                <span class="px-4 py-1.5 bg-[#8b2b2b]/40 text-white/90 text-xs font-bold tracking-[0.2em] rounded-sm flex items-center border border-[#8b2b2b]/60 backdrop-blur-md shadow-sm">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="w-3.5 h-3.5 mr-1.5"
                  /> {{ province }}
                </span>
              </template>
            </div>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold font-serif text-[#fdf8ee] tracking-widest text-shadow-title mb-6">
              {{ post.name }}
            </h1>
            <p class="text-lg md:text-2xl text-white/80 font-light tracking-wide max-w-4xl text-shadow-sm border-l-4 border-[#8b2b2b] pl-5 leading-relaxed">
              {{ post.desc }}
            </p>
          </div>
        </div>
      </div>
      <div
        class="max-w-6xl mx-auto px-6 lg:px-8 -mt-12 relative z-20"
      >
        <div class="mb-16 bg-white/90 backdrop-blur-xl rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-[#e8dfcf] p-8 md:p-14 overflow-hidden relative">
          <div class="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-[#d4af37]/5 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />

          <div class="flex items-center gap-6 mb-12 pb-8 border-b border-[#e8dfcf]/60 relative">
            <div class="w-16 h-16 bg-linear-to-br from-[#8b2b2b] to-[#5a1c1c] rounded-xl flex items-center justify-center shadow-md border border-[#a02c2c]/30">
              <UIcon
                name="i-lucide-scroll-text"
                class="w-8 h-8 text-[#fdf8ee]"
              />
            </div>
            <div>
              <h2 class="text-3xl md:text-4xl font-bold font-serif text-[#2c2420] tracking-widest">
                {{ post.title }}
              </h2>
              <p class="text-sm text-[#8b2b2b]/70 mt-2 font-mono tracking-widest uppercase">
                {{ post.subtitle }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-5 mb-14">
            <div class="bg-[#faf7f2] px-8 py-5 rounded-lg border border-[#e8dfcf] flex-1 min-w-50 hover:bg-white transition-colors duration-300">
              <div class="flex items-center gap-2 text-xs text-[#8b2b2b] mb-2 font-medium tracking-widest">
                <UIcon
                  name="i-lucide-hourglass"
                  class="w-4 h-4"
                /> 营建时代
              </div>
              <div class="font-bold text-[#2c2420] text-xl font-serif tracking-wide">
                {{ post.dynasty.join(',') }}
              </div>
            </div>
            <div class="bg-[#faf7f2] px-8 py-5 rounded-lg border border-[#e8dfcf] flex-1 min-w-50 hover:bg-white transition-colors duration-300">
              <div class="flex items-center gap-2 text-xs text-[#8b2b2b] mb-2 font-medium tracking-widest">
                <UIcon
                  name="i-lucide-map"
                  class="w-4 h-4"
                /> 地理坐落
              </div>
              <div class="font-bold text-[#2c2420] text-xl font-serif tracking-wide">
                {{ post.province.join(',') }}
              </div>
            </div>
            <div class="bg-[#faf7f2] px-8 py-5 rounded-lg border border-[#e8dfcf] flex-1 min-w-50 hover:bg-white transition-colors duration-300">
              <div class="flex items-center gap-2 text-xs text-[#8b2b2b] mb-2 font-medium tracking-widest">
                <UIcon
                  name="i-lucide-landmark"
                  class="w-4 h-4"
                /> 建筑规制
              </div>
              <div class="font-bold text-[#2c2420] text-xl font-serif tracking-wide">
                {{ post.category.join(',') }}
              </div>
            </div>
          </div>
          <ContentRenderer
            :value="post"
          />
        </div>
        <div
          id="content-grid"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col items-center justify-center min-h-[calc(100vh-112px)] text-center py-20 relative z-10">
        <div class="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-8 border border-[#e8dfcf]">
          <UIcon
            name="i-lucide-file-question"
            class="w-16 h-16 text-[#e8dfcf]"
          />
        </div>
        <h2 class="text-4xl font-bold font-serif text-[#2c2420] tracking-widest mb-4">
          宗卷未载
        </h2>
        <p class="text-[#8b2b2b]/70 font-mono tracking-widest mb-10">
          您请求的古建库索引 (ID: {{ slug }}) 暂无史料收录
        </p>
        <ULink
          class="px-8 py-3 bg-[#2c2420] text-[#fdf8ee] rounded-sm hover:bg-[#8b2b2b] transition-all duration-500 tracking-widest font-medium border border-transparent hover:border-[#8b2b2b]/50 shadow-lg hover:shadow-[#8b2b2b]/20"
          :to="localePath('/buildings')"
        >
          返回古建名录
        </ULink>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`building-${slug}`, () => {
  return queryCollection('buildings').path(`/buildings/${slug}`).first()
})
</script>
