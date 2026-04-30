<template>
  <div class="min-h-screen bg-paper">
    <!-- 顶部横幅 -->
    <div class="bg-gradient-to-r from-cyan-600 via-cyan-500 to-gold-600 text-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-2">好友中心</h1>
            <p class="text-gold-100 text-lg">与同好建立联系，共同探索古建筑之美</p>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.total }}</div>
              <div class="text-sm text-gold-100">好友总数</div>
            </div>
            <div class="w-px h-10 bg-white/30"></div>
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.online }}</div>
              <div class="text-sm text-gold-100">在线好友</div>
            </div>
            <div class="w-px h-10 bg-white/30"></div>
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.pendingRequests }}</div>
              <div class="text-sm text-gold-100">待处理请求</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- 标签页 -->
      <div class="bg-white rounded-2xl shadow-ancient p-2 mb-6 border border-gold-100">
        <div class="flex gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold transition-all',
              activeTab === tab.key
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-md'
                : 'text-ink-medium hover:text-cyan-700 hover:bg-cyan-50'
            ]"
          >
            <span>{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
            <span 
              v-if="tab.count > 0"
              :class="[
                'px-2.5 py-0.5 text-xs font-bold rounded-full',
                activeTab === tab.key ? 'bg-white/20' : 'bg-vermilion-100 text-vermilion-700'
              ]"
            >
              {{ tab.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- 内容区域 -->
      <div v-if="activeTab === 'friends'" class="space-y-6">
        <!-- 搜索栏 -->
        <div class="bg-white rounded-2xl shadow-ancient p-4 border border-gold-100">
          <div class="flex gap-4">
            <div class="flex-1 relative">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="搜索好友..."
                class="w-full pl-12 pr-4 py-3 bg-gold-50 border border-gold-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 text-ink-dark"
              />
            </div>
            <select
              v-model="filterOnline"
              class="appearance-none px-4 py-3 bg-gold-50 border border-gold-200 rounded-xl text-ink-medium focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 cursor-pointer"
            >
              <option value="">全部好友</option>
              <option value="online">在线好友</option>
              <option value="offline">离线好友</option>
            </select>
          </div>
        </div>

        <!-- 好友列表 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="friend in filteredFriends"
            :key="friend.id"
            class="bg-white rounded-2xl shadow-ancient overflow-hidden border border-gold-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div class="p-5 flex items-center gap-4">
              <div class="relative">
                <img
                  :src="friend.avatar"
                  :alt="friend.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gold-200 group-hover:border-cyan-400 transition-colors"
                />
                <span :class="['absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white', friend.online ? 'bg-emerald-500' : 'bg-gray-300']"></span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-bold text-lg text-ink-black truncate">{{ friend.name }}</h4>
                  <span v-if="friend.online" class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">在线</span>
                </div>
                <p class="text-sm text-ink-light mb-2">{{ friend.bio }}</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="(interest, idx) in friend.interests.slice(0, 3)"
                    :key="idx"
                    class="px-2 py-0.5 bg-cyan-50 text-cyan-600 text-xs rounded-full"
                  >
                    {{ interest }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <button
                  class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
                  @click="openChat(friend)"
                >
                  聊天
                </button>
                <button
                  class="px-4 py-2 bg-gold-50 text-gold-700 text-sm font-semibold rounded-xl hover:bg-gold-100 transition-all"
                  @click="viewProfile(friend)"
                >
                  查看资料
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredFriends.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">👥</div>
          <h3 class="text-xl font-bold text-ink-black mb-2">暂无好友</h3>
          <p class="text-ink-light mb-6">快去推荐页添加志同道合的朋友吧</p>
          <button
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
            @click="activeTab = 'recommend'"
          >
            去推荐页
          </button>
        </div>
      </div>

      <!-- 待处理请求 -->
      <div v-if="activeTab === 'requests'" class="space-y-6">
        <div v-if="pendingRequests.length > 0" class="space-y-4">
          <div
            v-for="request in pendingRequests"
            :key="request.id"
            class="bg-white rounded-2xl shadow-ancient overflow-hidden border border-gold-100"
          >
            <div class="p-5 flex items-center gap-4">
              <div class="relative">
                <img
                  :src="request.fromUserAvatar"
                  :alt="request.fromUserName"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gold-200"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h4 class="font-bold text-lg text-ink-black">{{ request.fromUserName }}</h4>
                </div>
                <p class="text-sm text-ink-light mb-2">{{ request.reason }}</p>
                <p class="text-xs text-ink-light">发送于 {{ request.createdAt }}</p>
              </div>
              <div class="flex gap-3">
                <button
                  class="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  @click="handleRequest(request.id, 'accept')"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  接受
                </button>
                <button
                  class="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                  @click="handleRequest(request.id, 'reject')"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  拒绝
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-xl font-bold text-ink-black mb-2">暂无待处理请求</h3>
          <p class="text-ink-light">等待其他用户向您发送好友请求</p>
        </div>
      </div>

      <!-- 推荐好友 -->
      <div v-if="activeTab === 'recommend'" class="space-y-6">
        <!-- 刷新按钮 -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-ink-black">为您推荐</h3>
            <p class="text-ink-light">根据您的兴趣为您推荐志同道合的朋友</p>
          </div>
          <button
            class="flex items-center gap-2 px-5 py-2.5 bg-white border border-gold-200 rounded-xl text-ink-medium hover:text-cyan-700 hover:border-cyan-300 transition-all"
            @click="refreshRecommendations"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            换一批
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="user in recommendations"
            :key="user.id"
            class="bg-white rounded-2xl shadow-ancient overflow-hidden border border-gold-100 hover:shadow-xl transition-all duration-300 group"
          >
            <div class="p-5 flex items-center gap-4">
              <div class="relative">
                <img
                  :src="user.avatar"
                  :alt="user.name"
                  class="w-16 h-16 rounded-full object-cover border-2 border-gold-200 group-hover:border-cyan-400 transition-colors"
                />
                <span :class="['absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white', user.online ? 'bg-emerald-500' : 'bg-gray-300']"></span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-1">
                  <h4 class="font-bold text-lg text-ink-black truncate">{{ user.name }}</h4>
                  <div class="flex items-center gap-1">
                    <span class="text-xl font-bold text-gold-600">{{ user.matchScore }}</span>
                    <span class="text-xs text-ink-light">匹配度</span>
                  </div>
                </div>
                <p class="text-sm text-ink-light mb-2">{{ user.bio }}</p>
                <div class="flex flex-wrap gap-1.5 mb-2">
                  <span
                    v-for="(interest, idx) in user.interests.slice(0, 3)"
                    :key="idx"
                    class="px-2 py-0.5 bg-cyan-50 text-cyan-600 text-xs rounded-full"
                  >
                    {{ interest }}
                  </span>
                </div>
                <p class="text-xs text-cyan-600">共同兴趣：{{ user.commonInterests?.join('、') || '暂无' }}</p>
              </div>
              <button
                class="px-5 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all shadow-md hover:shadow-lg"
                @click="sendFriendRequest(user)"
              >
                + 关注
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 最近互动 -->
      <div v-if="activeTab === 'activity'" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-ancient overflow-hidden border border-gold-100">
          <div class="px-6 py-4 border-b border-gold-100">
            <h3 class="font-bold text-lg text-ink-black">最近互动</h3>
          </div>
          <div class="divide-y divide-gold-100">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="px-6 py-4 flex items-center gap-4 hover:bg-gold-50/50 transition-colors"
            >
              <img
                :src="activity.userAvatar"
                :alt="activity.userName"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div class="flex-1">
                <p class="text-ink-medium">
                  <span class="font-semibold text-ink-black">{{ activity.userName }}</span>
                  <span>{{ activity.action }}</span>
                  <span class="text-cyan-600">{{ activity.target }}</span>
                </p>
                <p class="text-xs text-ink-light mt-1">{{ activity.time }}</p>
              </div>
              <img
                v-if="activity.thumbnail"
                :src="activity.thumbnail"
                class="w-12 h-12 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天弹窗 -->
    <div v-if="chattingWith" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click="closeChat">
      <div class="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl" @click.stop>
        <div class="px-6 py-4 border-b border-gold-100 bg-gradient-to-r from-cyan-50 to-transparent flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img :src="chattingWith.avatar" :alt="chattingWith.name" class="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 class="font-bold text-ink-black">{{ chattingWith.name }}</h4>
              <p :class="['text-xs', chattingWith.online ? 'text-emerald-600' : 'text-ink-light']">
                {{ chattingWith.online ? '在线' : '离线' }}
              </p>
            </div>
          </div>
          <button class="p-2 hover:bg-gold-100 rounded-lg transition-colors" @click="closeChat">
            <svg class="w-5 h-5 text-ink-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto max-h-[50vh]" id="chatMessages">
          <div class="space-y-4">
            <div v-for="(msg, index) in chatMessages" :key="index" :class="['flex', msg.from === 'me' ? 'justify-end' : '']">
              <img v-if="msg.from === 'other'" :src="chattingWith?.avatar" class="w-8 h-8 rounded-full object-cover mr-2" />
              <div :class="['max-w-[70%] px-4 py-3 rounded-xl', msg.from === 'me' ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-br-none' : 'bg-gold-50 text-ink-dark rounded-bl-none']">
                <p class="text-sm">{{ msg.content }}</p>
                <p :class="['text-xs mt-1', msg.from === 'me' ? 'opacity-80' : 'text-ink-light']">{{ msg.createdAt || msg.time || '刚刚' }}</p>
              </div>
            </div>
            <div v-if="chatMessages.length === 0" class="text-center py-8 text-ink-light">
              暂无消息，开始聊天吧
            </div>
          </div>
        </div>
        <div class="p-4 border-t border-gold-100">
          <div class="flex gap-3">
            <input
              v-model="chatMessage"
              type="text"
              placeholder="输入消息..."
              class="flex-1 px-4 py-3 bg-gold-50 border border-gold-200 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
              @keydown.enter="sendMessage"
            />
            <button
              class="px-5 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg"
              @click="sendMessage"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const activeTab = ref('friends')
const searchQuery = ref('')
const filterOnline = ref('')
const chattingWith = ref<Friend | null>(null)
const chatMessage = ref('')

interface Friend {
  id: string
  name: string
  avatar: string
  bio: string
  interests: string[]
  province: string
  online: boolean
}

interface FriendRequest {
  id: string
  fromUserId: string
  fromUserName: string
  fromUserAvatar: string
  reason: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

interface RecommendUser {
  id: string
  name: string
  avatar: string
  bio: string
  interests: string[]
  province: string
  matchScore: number
  online: boolean
  commonInterests?: string[]
}

interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar: string
  action: string
  target: string
  time: string
  thumbnail?: string
}

const friends = ref<Friend[]>([])
const pendingRequests = ref<FriendRequest[]>([])
const recommendations = ref<RecommendUser[]>([])
const recentActivities = ref<Activity[]>([])

const stats = ref({
  total: 0,
  online: 0,
  pendingRequests: 0,
  groups: 3
})

const tabs = computed(() => [
  { key: 'friends', label: '好友列表', icon: '👥', count: 0 },
  { key: 'requests', label: '待处理请求', icon: '📬', count: pendingRequests.value.length },
  { key: 'recommend', label: '推荐好友', icon: '✨', count: 0 },
  { key: 'activity', label: '最近互动', icon: '💬', count: 0 }
])

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
  
  if (filterOnline.value === 'online') {
    result = result.filter(friend => friend.online)
  } else if (filterOnline.value === 'offline') {
    result = result.filter(friend => !friend.online)
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
      {
        id: 'u1',
        name: '古建爱好者小王',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
        bio: '痴迷于明清古建筑的结构之美，曾走访全国200+古村落',
        interests: ['明清建筑', '园林艺术', '木雕工艺'],
        province: '浙江省',
        online: true
      },
      {
        id: 'u2',
        name: '长城守护人',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
        bio: '致力于长城保护与研究工作十年',
        interests: ['长城', '明代建筑', '砖石结构'],
        province: '北京市',
        online: true
      },
      {
        id: 'u3',
        name: '江南园林迷',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=elegant%20chinese%20lady%20portrait%20avatar%20garden&image_size=square',
        bio: '专注于江南私家园林的美学研究',
        interests: ['江南园林', '造景艺术', '文人园林'],
        province: '江苏省',
        online: false
      },
      {
        id: 'u4',
        name: '古塔探秘者',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
        bio: '探访过全国50+座古塔，记录建筑之美',
        interests: ['古塔', '佛教建筑', '楼阁'],
        province: '山西省',
        online: true
      }
    ]
    pendingRequests.value = [
      {
        id: 'req1',
        fromUserId: 'u5',
        fromUserName: '敦煌守护者',
        fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=dunhuang%20guardian%20portrait%20avatar%20artist&image_size=square',
        reason: '看到您对壁画艺术感兴趣，想一起探讨敦煌壁画',
        status: 'pending',
        createdAt: '2024-01-20 14:30'
      },
      {
        id: 'req2',
        fromUserId: 'u6',
        fromUserName: '壁画研究员',
        fromUserAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square',
        reason: '共同爱好古建筑艺术，希望能交流学习',
        status: 'pending',
        createdAt: '2024-01-19 10:15'
      }
    ]
    stats.value = {
      total: friends.value.length,
      online: friends.value.filter(f => f.online).length,
      pendingRequests: pendingRequests.value.length,
      groups: 3
    }
  }
}

const fetchRecommendations = async () => {
  try {
    const response = await fetch('/api/friends/recommend')
    const data = await response.json()
    if (data.success) {
      recommendations.value = data.recommendations || []
    }
  } catch (error) {
    console.error('Failed to fetch recommendations:', error)
    recommendations.value = [
      {
        id: 'u5',
        name: '敦煌守护者',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=dunhuang%20guardian%20portrait%20avatar%20artist&image_size=square',
        bio: '敦煌壁画艺术研究专家',
        interests: ['敦煌壁画', '唐代艺术', '石窟艺术'],
        province: '甘肃省',
        matchScore: 85,
        online: true,
        commonInterests: ['壁画艺术']
      },
      {
        id: 'u6',
        name: '壁画研究员',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square',
        bio: '专注于古代壁画修复与研究',
        interests: ['壁画修复', '古建筑彩绘', '传统工艺'],
        province: '陕西省',
        matchScore: 78,
        online: false,
        commonInterests: ['古建筑艺术']
      },
      {
        id: 'u7',
        name: '榫卯传承人',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20craftsman%20portrait%20avatar%20woodworker&image_size=square',
        bio: '国家级非遗榫卯技艺传承人',
        interests: ['榫卯结构', '传统木工', '建筑营造'],
        province: '安徽省',
        matchScore: 72,
        online: true,
        commonInterests: ['古建筑结构']
      },
      {
        id: 'u8',
        name: '窑洞文化传承',
        avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20dwelling%20protector%20portrait%20avatar%20local&image_size=square',
        bio: '致力于窑洞民居文化保护',
        interests: ['窑洞民居', '乡土建筑', '生土建筑'],
        province: '陕西省',
        matchScore: 65,
        online: false,
        commonInterests: ['民居研究']
      }
    ]
  }
}

const loadRecentActivities = () => {
  recentActivities.value = [
    {
      id: 'a1',
      userId: 'u1',
      userName: '古建爱好者小王',
      userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square',
      action: '评论了您的帖子',
      target: '《苏州园林的造景艺术》',
      time: '5分钟前'
    },
    {
      id: 'a2',
      userId: 'u2',
      userName: '长城守护人',
      userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square',
      action: '点赞了您的评论',
      target: '关于应县木塔的讨论',
      time: '15分钟前'
    },
    {
      id: 'a3',
      userId: 'u4',
      userName: '古塔探秘者',
      userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square',
      action: '发布了新帖子',
      target: '《嵩岳寺塔的建筑特色》',
      time: '1小时前',
      thumbnail: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20pagoda%20songyue%20temple%20architecture&image_size=landscape_4_3'
    },
    {
      id: 'a4',
      userId: 'u3',
      userName: '江南园林迷',
      userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=elegant%20chinese%20lady%20portrait%20avatar%20garden&image_size=square',
      action: '关注了您',
      target: '',
      time: '2小时前'
    }
  ]
}

const handleRequest = async (requestId: string, action: 'accept' | 'reject') => {
  try {
    const response = await fetch(`/api/friends/request/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
    const data = await response.json()
    if (data.success) {
      alert(data.message)
      fetchFriends()
    }
  } catch (error) {
    console.error('Failed to handle request:', error)
    // Fallback: update locally
    const index = pendingRequests.value.findIndex(r => r.id === requestId)
    if (index !== -1) {
      pendingRequests.value[index].status = action === 'accept' ? 'accepted' : 'rejected'
      pendingRequests.value.splice(index, 1)
      stats.value.pendingRequests = pendingRequests.value.length
      alert(action === 'accept' ? '已接受好友请求' : '已拒绝好友请求')
    }
  }
}

const sendFriendRequest = async (user: RecommendUser) => {
  try {
    const response = await fetch('/api/friends/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        reason: '想和你一起探讨古建筑文化'
      })
    })
    const data = await response.json()
    if (data.success) {
      alert(data.message)
    }
  } catch (error) {
    console.error('Failed to send friend request:', error)
    alert('好友请求已发送')
  }
}

const chatMessages = ref<any[]>([])
const openChat = async (friend: Friend) => {
  chattingWith.value = friend
  try {
    // 尝试获取对话消息
    const response = await fetch('/api/friends/conversations')
    const data = await response.json()
    if (data.success) {
      const conversation = data.conversations.find((c: any) => c.otherUserId === friend.id)
      if (conversation) {
        const msgResponse = await fetch(`/api/friends/conversation/${conversation.id}`)
        const msgData = await msgResponse.json()
        if (msgData.success) {
          chatMessages.value = msgData.messages.map((m: any) => ({
            from: m.fromUserId === 'current' ? 'me' : 'other',
            content: m.content,
            createdAt: m.createdAt,
            isRead: m.isRead
          }))
        }
      }
    }
  } catch (error) {
    // 使用模拟消息
    chatMessages.value = [
      { from: 'other', content: '你好！很高兴认识你，一起探讨古建筑吧。', time: '20分钟前' },
      { from: 'me', content: '你好！我也对古建筑很感兴趣，很高兴认识你！', time: '18分钟前' }
    ]
  }
}

const closeChat = () => {
  chattingWith.value = null
  chatMessage.value = ''
  chatMessages.value = []
}

const sendMessage = async () => {
  if (!chatMessage.value.trim() || !chattingWith.value) return
  
  const content = chatMessage.value
  chatMessages.value.push({
    from: 'me',
    content,
    time: '刚刚'
  })
  chatMessage.value = ''
  
  // 滚动到底部
  setTimeout(() => {
    const el = document.getElementById('chatMessages')
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, 100)
  
  try {
    await fetch('/api/friends/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toUserId: chattingWith.value.id, content })
    })
  } catch (error) {
    console.error('Failed to send message:', error)
  }
}

const viewProfile = (friend: Friend) => {
  alert(`查看 ${friend.name} 的资料`)
}

const refreshRecommendations = () => {
  fetchRecommendations()
}

onMounted(() => {
  fetchFriends()
  fetchRecommendations()
  loadRecentActivities()
})
</script>