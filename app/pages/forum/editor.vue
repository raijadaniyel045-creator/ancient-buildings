<template>
  <UPage class="bg-white min-h-screen m-5 font-serif flex flex-col selection:bg-[#8B2B2B]/20">
    <UPageHeader>
      <ULink
        class="flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors tracking-widest text-sm"
        :to="localPath('/forum')"
      >
        <UIcon
          name="i-lucide-chevron-left"
          class="w-5 h-5"
        />
        返回学社
      </ULink>
    </UPageHeader>
    <UPageBody>
      <UEditor
        v-slot="{ editor }"
        v-model="value"
        content-type="markdown"
        :extensions="[TextAlign.configure({ types: ['heading', 'paragraph'] })]"
        class="w-full min-h-[40vh] flex flex-col gap-4"
      >
        <UEditorToolbar
          :editor="editor"
          :items="items"
          class="sm:px-8 overflow-x-auto"
        />
      </UEditor>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import type { EditorToolbarItem } from '@nuxt/ui'
import { TextAlign } from '@tiptap/extension-text-align'

const localPath = useLocalePath()

const value = ref(``)

const items: EditorToolbarItem[][] = [
  [{
    kind: 'undo',
    icon: 'i-lucide-undo',
    tooltip: { text: 'Undo' }
  }, {
    kind: 'redo',
    icon: 'i-lucide-redo',
    tooltip: { text: 'Redo' }
  }],
  // Block types
  [{
    icon: 'i-lucide-heading',
    tooltip: { text: 'Headings' },
    content: {
      align: 'start'
    },
    items: [{
      kind: 'heading',
      level: 1,
      icon: 'i-lucide-heading-1',
      label: 'Heading 1'
    }, {
      kind: 'heading',
      level: 2,
      icon: 'i-lucide-heading-2',
      label: 'Heading 2'
    }, {
      kind: 'heading',
      level: 3,
      icon: 'i-lucide-heading-3',
      label: 'Heading 3'
    }, {
      kind: 'heading',
      level: 4,
      icon: 'i-lucide-heading-4',
      label: 'Heading 4'
    }]
  }, {
    icon: 'i-lucide-list',
    tooltip: { text: 'Lists' },
    content: {
      align: 'start'
    },
    items: [{
      kind: 'bulletList',
      icon: 'i-lucide-list',
      label: 'Bullet List'
    }, {
      kind: 'orderedList',
      icon: 'i-lucide-list-ordered',
      label: 'Ordered List'
    }]
  }, {
    kind: 'blockquote',
    icon: 'i-lucide-text-quote',
    tooltip: { text: 'Blockquote' }
  }, {
    kind: 'codeBlock',
    icon: 'i-lucide-square-code',
    tooltip: { text: 'Code Block' }
  }, {
    kind: 'horizontalRule',
    icon: 'i-lucide-separator-horizontal',
    tooltip: { text: 'Horizontal Rule' }
  }],
  // Text formatting
  [{
    kind: 'mark',
    mark: 'bold',
    icon: 'i-lucide-bold',
    tooltip: { text: 'Bold' }
  }, {
    kind: 'mark',
    mark: 'italic',
    icon: 'i-lucide-italic',
    tooltip: { text: 'Italic' }
  }, {
    kind: 'mark',
    mark: 'underline',
    icon: 'i-lucide-underline',
    tooltip: { text: 'Underline' }
  }, {
    kind: 'mark',
    mark: 'strike',
    icon: 'i-lucide-strikethrough',
    tooltip: { text: 'Strikethrough' }
  }, {
    kind: 'mark',
    mark: 'code',
    icon: 'i-lucide-code',
    tooltip: { text: 'Code' }
  }],
  // Link
  [{
    kind: 'link',
    icon: 'i-lucide-link',
    tooltip: { text: 'Link' }
  }],
  // Text alignment
  [{
    icon: 'i-lucide-align-justify',
    tooltip: { text: 'Text Align' },
    content: {
      align: 'end'
    },
    items: [{
      kind: 'textAlign',
      align: 'left',
      icon: 'i-lucide-align-left',
      label: 'Align Left'
    }, {
      kind: 'textAlign',
      align: 'center',
      icon: 'i-lucide-align-center',
      label: 'Align Center'
    }, {
      kind: 'textAlign',
      align: 'right',
      icon: 'i-lucide-align-right',
      label: 'Align Right'
    }, {
      kind: 'textAlign',
      align: 'justify',
      icon: 'i-lucide-align-justify',
      label: 'Align Justify'
    }]
  }]
]
</script>

<style scoped>
/* 隐藏原生输入框聚焦时的默认外边框 */
input:focus {
  outline: none;
}

/* 优雅的滚动条 */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139, 43, 43, 0.1); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(139, 43, 43, 0.3); }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
