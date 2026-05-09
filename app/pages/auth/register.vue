<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-[#FAF8F5] selection:bg-[#8B2B2B]/10 overflow-hidden">
    <aside class="hidden md:flex md:w-[61.8%] relative bg-[#F0EDE9] items-center justify-center p-20 overflow-hidden border-r border-[#EAE3D9]">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <UIcon
          name="i-lucide-drafting-compass"
          class="absolute -top-20 -left-20 w-[800px] h-[800px]"
        />
      </div>

      <div class="relative z-10 w-full max-w-2xl">
        <div class="mb-12">
          <div class="flex items-baseline gap-4 mb-2">
            <span class="text-6xl font-bold tracking-tighter text-[#1A1A1A]">营造</span>
            <span class="text-2xl font-light tracking-[0.5em] text-[#8B2B2B]">ARCHIVE</span>
          </div>
          <div class="h-1 w-24 bg-[#8B2B2B]" />
        </div>

        <div class="space-y-8">
          <h2 class="text-4xl font-bold text-[#1A1A1A] leading-tight tracking-wide">
            数字化视域下的<br>
            中国古代建筑文化科普平台
          </h2>
          <p class="text-[#666666] text-lg leading-relaxed font-light max-w-lg">
            在这里，我们用数字技术解构木构之美，将每一处榫卯、每一座梁架，都转化为可感知的文化记忆。
          </p>
        </div>

        <div class="mt-24 pt-8 border-t border-[#DED9D1] flex gap-12 text-[10px] tracking-[0.2em] text-[#999999] uppercase">
          <div>Structure / 结构</div>
          <div>History / 历史</div>
          <div>Digital / 数字</div>
        </div>
      </div>

    </aside>

    <main class="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-20 bg-white relative">
      <div class="w-full max-w-md">
        <div class="md:hidden mb-12">
          <span class="text-3xl font-bold tracking-tighter text-[#1A1A1A]">营造</span>
        </div>

        <header class="mb-10">
          <h3 class="text-2xl font-bold text-[#1A1A1A] mb-2 tracking-widest">
            创建您的帐号
          </h3>
          <p class="text-sm text-[#888888]">
            请填写以下信息以加入学社
          </p>
        </header>

        <UAuthForm
          :schema="schema"
          :fields="fields"
          :loading="loading"
          submit-button-text="立即注册"
          :ui="{
            base: 'space-y-6',
            input: {
              base: 'bg-[#F9F9F9] border-none focus:ring-1 focus:ring-[#8B2B2B] rounded-none py-3 px-4',
              placeholder: 'text-[#BBBBBB] font-light'
            },
            label: {
              base: 'text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-2'
            },
            submitButton: {
              base: 'bg-[#1A1A1A] hover:bg-[#8B2B2B] text-white tracking-[0.4em] font-bold rounded-none py-4 transition-all duration-500',
              block: 'w-full flex justify-center mt-8'
            }
          }"
          @submit="onSubmit"
        />

        <footer class="mt-12 pt-8 border-t border-[#F5F5F5] flex flex-col items-center gap-4">
          <p class="text-xs text-[#999999] tracking-widest">
            已有帐号？
            <ULink
              class="text-[#8B2B2B] font-bold hover:underline transition-all ml-2"
              :to="localePath('/auth/login')"
            >
              登入
            </ULink>
          </p>

          <p class="text-[10px] text-[#CCCCCC] text-center leading-relaxed max-w-[280px]">
            点击注册即表示您同意我们的《服务协议》与《隐私政策》，我们将妥善保护您的数字化档案。
          </p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'
import { ref } from 'vue'
import { useAccountStore } from '~/stores/useAccountStore'

// 为了使用自定义竖排样式
import '~/assets/css/main.css' // 确保你的全局css中包含了 writing-vertical-rl

const { t } = useI18n()
const localePath = useLocalePath()
const toast = useToast()
const router = useRouter()
const store = useAccountStore()

const loading = ref(false)

const fields: AuthFormField[] = [
  {
    name: 'username',
    defaultValue: '',
    type: 'text',
    label: '名号', // 雅化 Label
    placeholder: '输入您的称呼',
    required: true
  },
  {
    name: 'email',
    defaultValue: '',
    type: 'email',
    label: '书信联络 (邮箱)',
    placeholder: 'your@email.com',
    required: true
  },
  {
    name: 'password',
    defaultValue: '',
    label: '密码',
    type: 'password',
    placeholder: '设置您的密码',
    required: true
  },
  {
    name: 'confirmPassword',
    defaultValue: '',
    label: '确认密码',
    type: 'password',
    placeholder: '再次确认密码',
    required: true
  },
  {
    name: 'remember',
    label: '记住我',
    type: 'checkbox'
  }
]

const schema = z.object({
  username: z.string().min(3, '名号至少需要3个字符').max(20, '名号不能超过20个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '秘钥长度至少8位'),
  confirmPassword: z.string(),
  remember: z.boolean().default(false)
}).refine(data => data.password === data.confirmPassword, {
  message: '两次输入的秘钥不一致',
  path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const state = event.data

  try {
    // 调用后端接口
    await store.register({
      username: state.username,
      email: state.email,
      password: state.password
    }, state.remember)

    // 【优化】：成功的 Toast 提示雅化
    toast.add({
      title: '结契成功',
      description: '欢迎同好入局，档案已载入学社。',
      color: 'green',
      icon: 'i-lucide-check-circle'
    })

    // 延迟跳转，让用户看清成功提示
    setTimeout(() => {
      router.push(localePath('/auth/login'))
    }, 1500)
  } catch (error) {
    console.log(error)
    // 【优化】：失败的 Toast 提示
    toast.add({
      title: '结契受阻',
      description: '信息核验未通过，请稍后再试。',
      color: 'red',
      icon: 'i-lucide-x-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 针对该页面的响应式调整 */
@media (min-width: 768px) {
  :deep(.u-auth-form-fields) {
    display: grid;
    grid-template-cols: 1fr;
    gap: 1.5rem;
  }
}

/* 移除 Nuxt UI 原生的阴影和多余背景 */
:deep(.u-page-card) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
</style>
