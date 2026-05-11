import type { components } from '~/types'
import { useQuery } from '@pinia/colada'

export const usePostStore = defineStore('usePostStore', () => {
  const page = ref(1)
  const pageSize = ref(12)
  const loadCompleted = ref(false)
  const posts = ref<components['schemas']['PostSlugInfo'][]>([])
  const { data: summary } = useQuery({
    key: ['forumSummary'],
    query: () => $fetch<components['schemas']['ForumSummaryResponse']>('/api/v1/Forum/post/summary')
  })
  async function fetchPosts() {
    if (loadCompleted.value) return
    const { data } = await useFetch<components['schemas']['PostSlugInfo'][]>('/api/v1/Forum/post', {
      query: {
        Page: page.value,
        PageSize: pageSize.value
      }
    })
    const result = data.value || []
    page.value++
    posts.value = posts.value.concat(data.value || [])
    if (result.length < pageSize.value) {
      loadCompleted.value = true
    }
  }
  async function resetPageSize(newSize: number) {
    if (loadCompleted.value) return
    const { data } = await useFetch<components['schemas']['PostSlugInfo'][]>('/api/v1/Forum/post', {
      query: {
        Page: 1,
        PageSize: newSize
      }
    })
    page.value++
    posts.value = posts.value.concat(data.value || [])
    pageSize.value = newSize
    page.value = 1
  }
  return ({
    page,
    pageSize,
    posts,
    loadCompleted,
    summary,
    resetPageSize,
    fetchPosts
  })
})
