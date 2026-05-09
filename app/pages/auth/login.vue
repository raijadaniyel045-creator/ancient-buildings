<template>
  <div class="min-h-screen flex items-center justify-center relative font-serif selection:bg-[#8B2B2B]/20 overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541887059068-185458ceaa8e?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center" />

    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(42,37,34,0.65)_0%,rgba(20,18,17,0.95)_100%)] backdrop-blur-[3px]" />

    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />

    <div class="relative z-10 w-full max-w-5xl mx-6 flex flex-col md:flex-row shadow-[0_30px_100px_-15px_rgba(0,0,0,0.6)] bg-[#FAF8F5] min-h-[560px] relative">
      <div class="absolute inset-2 md:inset-3 border border-[#8B2B2B]/15 pointer-events-none z-20" />

      <div class="md:w-[45%] bg-[#EAE4D8] p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
        <UIcon
          name="i-lucide-compass"
          class="absolute -top-32 -left-20 w-[600px] h-[600px] text-[#C9A063]/[0.04] pointer-events-none rotate-12"
        />
        <div class="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#C9A063]/10 to-transparent pointer-events-none" />

        <div class="relative z-10">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-xs text-[#666666] hover:text-[#8B2B2B] tracking-[0.2em] transition-colors mb-16 uppercase group"
          >
            <UIcon
              name="i-lucide-arrow-left"
              class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            />
            返回大厅
          </NuxtLink>

          <div class="relative">
            <div class="absolute -left-6 top-2 w-1 h-12 bg-[#8B2B2B]" />
            <h2 class="text-4xl md:text-5xl font-bold text-[#2A2522] tracking-[0.2em] leading-tight mb-2">
              营造学社
            </h2>
            <span class="text-lg font-light tracking-[0.5em] text-[#8B2B2B] block mb-8">ARCHIVE</span>

            <p class="text-[#555555] text-sm leading-[2.2] tracking-widest font-light max-w-xs text-justify">
              在这里，我们用数字技术解构木构之美，将每一处榫卯、每一座梁架，都转化为可感知的文化记忆。
            </p>
          </div>
        </div>

        <div class="relative z-10 flex items-center justify-between text-[10px] text-[#888888] tracking-[0.3em] uppercase border-t border-[#DED5C5] pt-6">
          <span>System Auth v4.0</span>
          <span>Digital Heritage</span>
        </div>
      </div>

      <div class="md:w-[55%] p-12 md:p-20 bg-[#FAF8F5] flex flex-col justify-center relative">
        <header class="mb-12">
          <h3 class="text-2xl font-bold text-[#2A2522] tracking-[0.2em] mb-3 flex items-center gap-3">
            身份核验
            <div class="w-1.5 h-1.5 rounded-full bg-[#8B2B2B]" />
          </h3>
          <p class="text-sm text-[#888888] tracking-widest font-light">
            请输入您的档案凭证以访问系统
          </p>
        </header>

        <UAuthForm
          :schema="schema"
          :fields="fields"
          :loading="loading"
          submit-button-text="登入系统"
          :ui="{
            base: 'space-y-6',
            input: {
              base: 'bg-transparent border-0 border-b border-[#DED5C5] focus:ring-0 focus:border-[#8B2B2B] rounded-none py-3 px-1 transition-colors text-base text-[#2A2522]',
              placeholder: 'text-[#CCCCCC] font-light tracking-wider'
            },
            label: {
              base: 'text-xs font-bold text-[#555555] tracking-[0.2em] mb-1'
            },
            submitButton: {
              base: 'bg-[#2A2522] hover:bg-[#8B2B2B] text-white tracking-[0.4em] font-bold rounded-sm py-4 transition-all duration-500 shadow-md hover:shadow-lg',
              block: 'w-full flex justify-center mt-10'
            }
          }"
          @submit="onSubmit"
        />

        <footer class="mt-14 pt-8 border-t border-[#EAE3D9]/50 flex justify-center text-xs tracking-[0.15em]">
          <span class="text-[#999999]">
            尚未录入档案？
            <ULink
              class="text-[#8B2B2B] font-bold hover:text-[#2A2522] transition-colors ml-2 relative group uppercase"
              :to="localePath('/auth/register')"
            >
              前往注册
              <span class="absolute -bottom-1 left-0 w-0 h-px bg-[#2A2522] transition-all duration-300 group-hover:w-full" />
            </ULink>
          </span>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'
import { ref } from 'vue'
import { useAccountStore } from '~/stores/useAccountStore'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const toast = useToast()
const store = useAccountStore()

const redirect = (route.query.redirect || '/') as string
const loading = ref(false)

const fields: AuthFormField[] = [{
  name: 'email',
  defaultValue: '',
  type: 'email',
  label: '电子邮箱',
  placeholder: 'your@email.com',
  required: true
}, {
  name: 'password',
  defaultValue: '',
  label: '访问密码',
  type: 'password',
  placeholder: '请输入密码',
  required: true
}, {
  name: 'remember',
  label: '保持登录状态',
  type: 'checkbox'
}]

const schema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码长度至少8位'),
  remember: z.boolean().default(false)
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const state = event.data
  try {
    await store.login({ email: state.email, password: state.password }, state.remember)

    toast.add({
      title: '验证通过',
      description: '即将进入档案库...',
      color: 'gray',
      icon: 'i-lucide-check-circle'
    })

    setTimeout(() => {
      useRouter().push(redirect)
    }, 1000)
  } catch (error) {
    toast.add({
      title: '验证失败',
      description: '邮箱或密码不匹配，请重试。',
      color: 'red',
      icon: 'i-lucide-shield-alert'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 自定义复选框的主题色 */
:deep(input[type="checkbox"]:checked) {
  background-color: #2A2522 !important;
  border-color: #2A2522 !important;
}

/* 彻底消除输入框聚焦时的默认蓝框，配合下划线样式 */
:deep(input:focus) {
  --tw-ring-color: transparent !important;
  box-shadow: none !important;
}
</style>
