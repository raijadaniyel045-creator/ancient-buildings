<template>
  <UPageCard>
    <template #body>
      <UAuthForm
        :schema="schema"
        title="注册"
        description="输入您的凭据以创建您的帐户"
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </template>
    <template #footer>
      <p class="text-sm text-center text-gray-500">
        已有账号？
        <ULink
          variant="link"
          color="primary"
          :to="localePath('/auth/login')"
        >
          立即登录
        </ULink>
      </p>
    </template>
  </UPageCard>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'
import { useAccountStore } from '~/stores/useAccountStore'

const { t } = useI18n()
const localePath = useLocalePath()

const toast = useToast()
const fields: AuthFormField[] = [{
  name: 'username',
  defaultValue: '',
  type: 'text',
  label: '用户名',
  placeholder: '输入您的用户名',
  required: true
}, {
  name: 'email',
  defaultValue: '',
  type: 'email',
  label: '邮箱',
  placeholder: 'your@email.com',
  required: true
}, {
  name: 'password',
  defaultValue: '',
  label: '密码',
  type: 'password',
  placeholder: '输入您的密码',
  required: true
}, {
  name: 'confirmPassword',
  defaultValue: '',
  label: '再次输入密码',
  type: 'password',
  placeholder: '确认您的密码',
  required: true
}, {
  name: 'remember',
  label: t('记住我'),
  type: 'checkbox'
}]

const schema = z.object({
  username: z.string().min(3, '用户名至少需要3个字符').max(20, '用户名不能超过20个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码长度至少8位'),
  confirmPassword: z.string(),
  remember: z.boolean().default(false)
}).refine(data => data.password === data.confirmPassword, {
  message: '两次输入的密码不一致',
  path: ['confirmPassword']
})

type Schema = z.output<typeof schema>

const loading = ref(false)
const store = useAccountStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const state = event.data
  try {
    await store.register({ username: state.username, email: state.email, password: state.password }, state.remember)
  } catch (error) {
    console.log(error)
    toast.add({ title: 'Error', description: 'error', color: 'error' })
    return
  }
  toast.add({ title: 'Success', description: 'success', color: 'success' })
  await useRouter().push(localePath('/auth/login'))
}
</script>
