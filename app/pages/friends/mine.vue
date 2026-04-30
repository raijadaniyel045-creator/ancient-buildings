<template>
  <div class="min-h-screen bg-paper">
    <!-- 页面标题 -->
    <div class="max-w-6xl mx-auto px-4 pt-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-gold-600 to-gold-800 rounded-xl flex items-center justify-center">
          <span class="text-white text-xl">👥</span>
        </div>
        <div>
          <h1 class="text-xl font-bold text-ink-black">我的好友</h1>
          <p class="text-xs text-ink-light">共 {{ stats.total }} 位好友</p>
        </div>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-6xl mx-auto px-4 py-6">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded-2xl shadow-ancient p-5 border border-gold-100 text-center">
          <div class="text-3xl mb-2">👥</div>
          <div class="text-2xl font-bold text-ink-black">{{ stats.total }}</div>
          <div class="text-xs text-ink-light mt-1">总好友</div>
        </div>
        <div class="bg-white rounded-2xl shadow-ancient p-5 border border-gold-100 text-center">
          <div class="text-3xl mb-2">💬</div>
          <div class="text-2xl font-bold text-emerald-600">{{ stats.online }}</div>
          <div class="text-xs text-ink-light mt-1">在线</div>
        </div>
        <div class="bg-white rounded-2xl shadow-ancient p-5 border border-gold-100 text-center">
          <div class="text-3xl mb-2">🏷️</div>
          <div class="text-2xl font-bold text-gold-700">{{ stats.pendingRequests }}</div>
          <div class="text-xs text-ink-light mt-1">待处理请求</div>
        </div>
        <div class="bg-white rounded-2xl shadow-ancient p-5 border border-gold-100 text-center">
          <div class="text-3xl mb-2">👨‍👩‍👧‍👦</div>
          <div class="text-2xl font-bold text-cyan-600">3</div>
          <div class="text-xs text-ink-light mt-1">共同群组</div>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="max-w-6xl mx-auto px-4 pb-8">
      <div class="flex gap-6">
        <!-- 好友列表 -->
        <div class="flex-1">
          <!-- 搜索和筛选 -->
          <div class="bg-white rounded-2xl shadow-ancient p-4 border border-gold-100 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="搜索好友姓名、简介或兴趣..."
                  class="w-full pl-12 pr-4 py-2.5 bg-gold-50/50 border border-gold-200 rounded-xl focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200 transition-all text-ink-dark placeholder:text-ink-light"
                />
              </div>
              <div class="flex gap-2">
                <button
                  v-for="filter in filters"
                  :key="filter.key"
                  @click="activeFilter = filter.key"
                  :class="[
                    'px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                    activeFilter === filter.key
                      ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-md'
                      : 'bg-gold-50 text-ink-medium hover:bg-gold-100 border border-gold-200'
                  ]"
                >
                  {{ filter.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- 好友卡片列表 -->
          <div class="space-y-3">
            <div
              v-for="(friend, index) in filteredFriends"
              :key="friend.id"
              class="bg-white rounded-2xl shadow-ancient p-4 border border-gold-100 hover:shadow-lg transition-all duration-300 animate-slide-in cursor-pointer"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <div class="flex items-center gap-4">
                <!-- 头像 -->
                <div class="relative">
                  <img
                    :src="friend.avatar"
                    :alt="friend.name"
                    class="w-14 h-14 rounded-full object-cover border-2 border-gold-200"
                  />
                  <span :class="['absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white', friend.online ? 'bg-emerald-500' : 'bg-gray-300']"></span>
                </div>

                <!-- 信息 -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-ink-black">{{ friend.name }}</h3>
                    <span v-if="friend.online" class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">在线</span>
                  </div>
                  <p class="text-sm text-ink-light mb-2 truncate">{{ friend.bio }}</p>
                  <div class="flex items-center gap-3">
                    <span class="text-xs text-ink-light flex items-center gap-1">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                      </svg>
                      {{ friend.province }}
                    </span>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="interest in friend.interests.slice(0, 3)"
                        :key="interest"
                        class="px-2 py-0.5 bg-cyan-50 text-cyan-600 text-xs rounded-full"
                      >
                        {{ interest }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="flex items-center gap-2">
                  <button class="p-2 text-gold-700 hover:bg-gold-50 rounded-xl transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                  <button class="p-2 text-cyan-600 hover:bg-cyan-50 rounded-xl transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button class="p-2 text-ink-medium hover:bg-gray-50 rounded-xl transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredFriends.length === 0" class="text-center py-16">
            <div class="w-24 h-24 mx-auto bg-gold-100 rounded-full flex items-center justify-center mb-6">
              <span class="text-5xl">👥</span>
            </div>
            <h3 class="text-xl font-bold text-ink-black mb-2">暂无好友</h3>
            <p class="text-gray-500 mb-6">快去发现志同道合的朋友吧</p>
            <button class="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-xl font-medium hover:from-gold-700 hover:to-gold-800 transition-all shadow-md hover:shadow-lg">
              去发现好友
            </button>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="hidden lg:block w-80 flex-shrink-0">
          <!-- 待处理请求 -->
          <div class="bg-white rounded-2xl shadow-ancient p-5 border border-gold-100 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-ink-black flex items-center gap-2">
                <span>📩</span>
                <span>待处理请求</span>
              </h3>
              <span v-if="pendingRequests.length > 0" class="px-2 py-0.5 bg-vermilion-100 text-vermilion-600 text-xs font-bold rounded-full">
                {{ pendingRequests.length }}
              </span>
            </div>
            
            <div v-if="pendingRequests.length > 0" class="space-y-3">
              <div
                v-for="request in pendingRequests"
                :key="request.id"
                class="flex items-center gap-3 p-3 bg-gold-50/50 rounded-xl"
              >
                <img
                  :src="request.fromUserAvatar"
                  :alt="request.fromUserName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-ink-black text-sm truncate">{{ request.fromUserName }}</h4>
                  <p class="text-xs text-ink-light line-clamp-2">{{ request.reason }}</p>
                  <p class="text-xs text-gold-600 mt-1">{{ request.createdAt }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <button 
                    class="px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                    @click="acceptRequest(request)"
                  >
                    接受
                  </button>
                  <button 
                    class="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    @click="rejectRequest(request)"
                  >
                    拒绝
                  </button>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="text-3xl mb-2">📭</div>
              <p class="text-sm text-ink-light">暂无好友请求</p>
            </div>
          </div>

          <!-- 发现入口 -->
          <div class="bg-gradient-to-br from-gold-500 to-gold-700 rounded-2xl shadow-lg p-6 text-white">
            <div class="text-4xl mb-3">🔍</div>
            <h3 class="font-bold text-lg mb-2">发现更多同好</h3>
            <p class="text-sm text-gold-100 mb-4">根据兴趣匹配，找到志同道合的朋友</p>
            <button class="w-full py-2.5 bg-white text-gold-700 rounded-xl font-medium hover:bg-gold-50 transition-colors">
              去发现
            </button>
          </div>

          <!-- 最近互动 -->
          <div class="bg-white rounded-2xl shadow-ancient p-5 border border-gold-100 mt-6">
            <h3 class="font-bold text-ink-black flex items-center gap-2 mb-4">
              <span>🕐</span>
              <span>最近互动</span>
            </h3>
            <div class="space-y-3">
              <div
                v-for="item in recentActivities"
                :key="item.id"
                class="flex items-center gap-3 p-2 rounded-xl hover:bg-gold-50 transition-colors cursor-pointer"
              >
                <img
                  :src="item.avatar"
                  :alt="item.name"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-ink-black truncate">{{ item.activity }}</p>
                  <p class="text-xs text-ink-light">{{ item.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const searchQuery = ref('')
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'online', label: '在线' },
  { key: 'recent', label: '最近互动' }
]

interface Friend {
  id: string
  name: string
  avatar: string
  bio: string
  interests: string[]
  province: string
  online: boolean
}

interface PendingRequest {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserAvatar: string
  reason: string
  createdAt: string
}

interface RecentActivity {
  id: string
  name: string
  avatar: string
  activity: string
  time: string
}

const friends = ref<Friend[]>([])
const pendingRequests = ref<PendingRequest[]>([])
const recentActivities = ref<RecentActivity[]>([])

const stats = ref({
  total: 0,
  online: 0,
  pendingRequests: 0,
  groups: 0
})

const filteredFriends = computed(() => {
  let result = friends.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(friend => 
      friend.name.toLowerCase().includes(query) ||
      friend.bio.toLowerCase().includes(query) ||
      friend.interests.some(i => i.toLowerCase().includes(query))
    )
  }
  
  if (activeFilter.value === 'online') {
    result = result.filter(friend => friend.online)
  }
  
  return result
})

const fetchFriends = async () => {
  try {
    const response = await fetch('/api/friends')
    const data = await response.json()
    if (data.success) {
      friends.value = data.friends || []
      pendingRequests.value = data.pendingRequests || []
      stats.value = {
        total: data.stats.total,
        online: data.stats.online,
        pendingRequests: data.stats.pendingRequests,
        groups: 3
      }
    }
  } catch (error) {
    console.error('Failed to fetch friends:', error)
    // Fallback mock data
    friends.value = [
      { id: 'u1', name: '古建爱好者小王', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square', bio: '痴迷于明清古建筑的结构之美', interests: ['明清建筑', '园林艺术', '木雕工艺'], province: '浙江省', online: true },
      { id: 'u2', name: '长城守护人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square', bio: '长城文化研究者', interests: ['长城', '军事防御', '明代建筑'], province: '北京市', online: true },
      { id: 'u3', name: '园林设计师小李', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square', bio: '江南园林艺术爱好者', interests: ['江南园林', '造景艺术', '文人园林'], province: '江苏省', online: false },
      { id: 'u4', name: '古塔探秘者', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square', bio: '探访全国各地古塔', interests: ['古塔', '佛教建筑', '砖石结构'], province: '山西省', online: true },
      { id: 'u5', name: '榫卯匠人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20craftsman%20portrait%20avatar%20skilled%20worker&image_size=square', bio: '传统榫卯工艺传承者', interests: ['榫卯结构', '木作工艺', '传统建筑'], province: '安徽省', online: false },
      { id: 'u7', name: '故宫迷妹', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=imperial%20palace%20enthusiast%20portrait%20avatar%20young%20lady&image_size=square', bio: '故宫文化深度爱好者', interests: ['故宫', '皇家建筑', '清代建筑'], province: '北京市', online: false }
    ]
    
    stats.value = {
      total: friends.value.length,
      online: friends.value.filter(f => f.online).length,
      pendingRequests: 4,
      groups: 3
    }
  }
}

const acceptRequest = (request: PendingRequest) => {
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== request.id)
  stats.value.pendingRequests -= 1
  alert(`已接受 ${request.fromUserName} 的好友请求`)
}

const rejectRequest = (request: PendingRequest) => {
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== request.id)
  stats.value.pendingRequests -= 1
  alert(`已拒绝 ${request.fromUserName} 的好友请求`)
}

onMounted(() => {
  fetchFriends()
  
  recentActivities.value = [
    { id: '1', name: '古建爱好者小王', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square', activity: '点赞了你的帖子「应县木塔游记」', time: '2小时前' },
    { id: '2', name: '长城守护人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square', activity: '评论了你的动态', time: '5小时前' },
    { id: '3', name: '园林设计师小李', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20designer%20portrait%20avatar%20young%20woman&image_size=square', activity: '分享了新帖子「拙政园之美」', time: '昨天' },
    { id: '4', name: '古塔探秘者', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square', activity: '关注了你', time: '2天前' }
  ]
})
</script>