<template>
  <UPageCard>
    <template #body>
      <UAuthForm
        :schema="schema"
        title="登录"
        description="输入您的凭据以访问您的帐户"
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </template>
    <template #footer>
      <p class="text-sm text-center text-gray-500">
        还没有账号？
        <ULink
          variant="link"
          color="primary"
          :to="localePath('/auth/register')"
        >
          立即注册
        </ULink>
      </p>
    </template>
  </UPageCard>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'
import { useAccountStore } from '~/stores/useAccountStore'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const redirect = (route.query.redirect || '/') as string

const toast = useToast()
const fields: AuthFormField[] = [{
  name: 'email',
  defaultValue: '',
  type: 'email',
  label: t('邮箱'),
  placeholder: 'your@email.com',
  required: true
}, {
  name: 'password',
  defaultValue: '',
  label: t('密码'),
  type: 'password',
  placeholder: t('输入您的密码'),
  required: true
}, {
  name: 'remember',
  label: t('记住我'),
  type: 'checkbox'
}]
const schema = z.object({
  email: z.string().email(t('请输入有效的邮箱地址')),
  password: z.string().min(8, t('密码长度至少8位')),
  remember: z.boolean().default(false)
})
type Schema = z.output<typeof schema>

const loading = ref(false)
const store = useAccountStore()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const state = event.data
  try {
    await store.login({ email: state.email, password: state.password }, state.remember)
  } catch {
    toast.add({ title: 'Error', description: 'error', color: 'error' })
    return
  }
  toast.add({ title: 'Success', description: 'success', color: 'success' })
  await useRouter().push(redirect)
}
</script>
