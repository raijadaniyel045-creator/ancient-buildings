<script setup lang="ts">
import type { components } from '~/types'

const localePath = useLocalePath()
const { t } = useI18n({
  useScope: 'local'
})
const props = defineProps<{
  onLoadNext: (id: number) => void
}>()

const [model, modifiers] = defineModel<components['schemas']['CommentTreeNode']>()

const [modelCompleted, modifiersCompleted] = defineModel<boolean>('completed')
</script>

<i18n>
cn:
</i18n>

<template>
  <div class="flex gap-4 group">
    <div
      v-if="model.isAi"
      class="w-12 h-12 rounded-full bg-[#8B2B2B]/10 border border-[#8B2B2B]/20 flex items-center justify-center text-[#8B2B2B]"
    >
      <UIcon
        name="i-lucide-bot"
        class="w-6 h-6"
      />
    </div>
    <NuxtImg
      v-else
      src="/user.png"
      alt="书"
      class="w-12 h-12 rounded-full object-cover border-2 border-[#EAE3D9] p-0.5"
    />
    <div class="flex-1 border-b border-[#F5F5F7] pb-2 last:border-0">
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold text-sm tracking-widest">{{ model.authorName }}</span>
        <span class="text-[10px] text-[#888888]">{{ model.createdTime }}</span>
      </div>
      <MDC :value="model.data" />
      <div>
        <CommentComponent
          v-for="(child, index) in model.children"
          :key="index"
          v-model="model.children[index]"
        />
        <ULink
          v-if="!modelCompleted&&model.children.length>0"
          class="text-[#888888] flex items-center justify-center"
          @click="props.onLoadNext(model.id)"
        >
          <UIcon
            name="i-lucide-chevron-up"
            class="w-4 h-4"
          />
          LoadMore
        </ULink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
