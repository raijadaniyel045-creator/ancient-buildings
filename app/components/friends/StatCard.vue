<template>
  <div
    class="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-[#E8DFCE]/60 shadow-[0_4px_20px_-4px_rgba(139,115,85,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(139,115,85,0.1)] transition-all duration-500 group"
  >
    <div
      class="absolute -right-4 -top-4 w-24 h-24 bg-linear-to-br opacity-10 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"
      :class="glowColor"
    />
    <div class="relative z-10 flex flex-col items-center">
      <div
        class="w-7 h-7 mb-3"
        :class="iconColor"
      >
        <slot />
      </div>
      <div class="text-3xl font-serif text-[#2C363F]">
        {{ value }}
      </div>
      <div class="text-xs text-[#8B7355] mt-2 font-medium tracking-widest">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  glowColor: string
  iconColor: string
  value: number
  label: string
}>()
</script>
