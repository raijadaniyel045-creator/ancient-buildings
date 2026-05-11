<template>
  <div class="w-full max-w-md">
    <header class="mb-10">
      <h3 class="text-2xl font-bold text-[#1A1A1A] mb-2 tracking-widest">
        身份核验
      </h3>
      <p class="text-sm text-[#888888]">
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
    <footer class="mt-12 pt-8 border-t border-[#F5F5F5] flex flex-col items-center gap-4">
      <p class="text-xs text-[#999999] tracking-widest">
        尚未录入档案？
        <ULink
          class="text-[#8B2B2B] font-bold hover:underline transition-all ml-2"
          :to="localePath('/auth/register')"
        >
          前往注册
        </ULink>
      </p>
      <p class="text-[10px] text-[#CCCCCC] text-center leading-relaxed max-w-70">
        点击注册即表示您同意我们的《服务协议》与《隐私政策》，我们将妥善保护您的数字化档案。
      </p>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'
import { useAccountStore } from '~/stores/useAccountStore'

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
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    setTimeout(() => {
      useRouter().push(redirect)
    }, 1000)
  } catch {
    toast.add({
      title: '验证失败',
      description: '邮箱或密码不匹配，请重试。',
      color: 'error',
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
