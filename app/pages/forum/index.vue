<template>
  <div class="min-h-screen bg-[#FDFBF7] text-[#2C363F] font-sans selection:bg-[#D4AF37] selection:text-white pb-12">
    <!-- 顶部：画卷式焦点图 (Weekly Topic) -->
    <div class="w-full bg-[#2C363F] pt-8 pb-16 relative overflow-hidden">
      <!-- 极简底纹与光影 -->
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      <div class="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-[#8B2B2B]/40 to-transparent pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="max-w-xl text-[#FDFBF7]">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2 py-1 border border-[#D4AF37] text-[#D4AF37] text-xs tracking-widest font-serif">本期大典</span>
            <span class="text-[#A69B8D] text-sm font-light">第十二期</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight tracking-wide">
            大唐遗风：<br><span class="text-[#D4AF37]">五台山佛光寺东大殿</span>
          </h1>
          <p class="text-[#E8DFCE] font-light leading-relaxed mb-8 opacity-90 text-sm md:text-base">
            梁思成先生称其为“中国古建第一瑰宝”。七辅作双抄双下昂，出跳深远，气势磅礴。各位同道，您如何看待其结构中的力学美感？
          </p>
          <button class="px-8 py-3 bg-[#D4AF37] text-[#2C363F] font-medium text-sm rounded-none border border-[#D4AF37] hover:bg-transparent hover:text-[#D4AF37] transition-all duration-300">
            参与探讨
          </button>
        </div>
        <!-- 焦点图配图 -->
        <div class="relative w-full md:w-[500px] h-[280px] rounded-lg overflow-hidden border-4 border-[#FDFBF7]/10 shadow-2xl group cursor-pointer">
          <img
            src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20chinese%20temple%20architecture%20foguangsi%20tang%20dynasty&image_size=landscape"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-[#2C363F] via-transparent to-transparent opacity-80" />
          <div class="absolute bottom-4 left-4 text-[#FDFBF7]">
            <p class="text-xs tracking-widest font-serif opacity-80 mb-1">
              摄影 / 寻访晋风
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体内容区：双栏布局 -->
    <div class="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧：主信息流 (70% 宽度) -->
        <div class="flex-1 lg:w-2/3">
          <!-- 分类导航与过滤器 -->
          <div class="bg-white rounded-xl shadow-sm border border-[#E8DFCE]/80 p-2 mb-6 flex items-center justify-between sticky top-4 z-30">
            <div class="flex gap-1 overflow-x-auto no-scrollbar">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                class="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap relative"
                :class="activeTab === tab.id ? 'text-[#8B2B2B]' : 'text-[#8B7355] hover:text-[#2C363F] hover:bg-[#F5F0E6]'"
                @click="activeTab = tab.id"
              >
                {{ tab.name }}
                <span
                  v-if="activeTab === tab.id"
                  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-[#8B2B2B] rounded-t-full"
                />
              </button>
            </div>
            <div class="hidden sm:flex items-center gap-3 px-4 border-l border-[#E8DFCE]">
              <button class="text-[#A69B8D] hover:text-[#D4AF37] transition-colors">
                <UIcon
                  name="i-lucide-arrow-down-up"
                  class="w-4 h-4"
                />
              </button>
              <button class="text-[#A69B8D] hover:text-[#D4AF37] transition-colors">
                <UIcon
                  name="i-lucide-filter"
                  class="w-4 h-4"
                />
              </button>
            </div>
          </div>

          <!-- 帖子列表 -->
          <div class="space-y-6">
            <div
              v-for="(post, index) in posts"
              :key="post.id"
              class="group bg-white rounded-xl border border-[#E8DFCE]/60 shadow-sm hover:shadow-[0_8px_30px_-4px_rgba(139,115,85,0.1)] hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden relative"
            >
              <!-- 侧边品类标识带 -->
              <div
                class="absolute left-0 top-0 bottom-0 w-1"
                :class="getTopicColor(post.topicType)"
              />

              <div class="p-6 pl-8">
                <!-- 帖子信息：标题与标签 -->
                <div class="mb-4">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="text-[10px] px-2 py-0.5 rounded border tracking-widest font-serif"
                      :class="getTopicStyle(post.topicType)"
                    >
                      {{ post.topicName }}
                    </span>
                    <h3 class="font-serif text-lg md:text-xl font-bold text-[#2C363F] group-hover:text-[#8B2B2B] transition-colors cursor-pointer line-clamp-1">
                      {{ post.title }}
                    </h3>
                  </div>
                  <!-- 正文截取 -->
                  <p class="text-[#5C544E] text-sm leading-relaxed line-clamp-3 mb-4">
                    {{ post.content }}
                  </p>
                </div>

                <!-- 帖子图片 (若有，采用画廊式排列) -->
                <div
                  v-if="post.images && post.images.length > 0"
                  class="mb-5 flex gap-2 overflow-hidden h-40 rounded-lg cursor-pointer"
                >
                  <div
                    v-for="(img, imgIdx) in post.images.slice(0, 3)"
                    :key="imgIdx"
                    class="flex-1 relative overflow-hidden"
                  >
                    <img
                      :src="img"
                      class="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    >
                    <!-- 超过3张显示蒙层 -->
                    <div
                      v-if="imgIdx === 2 && post.images.length > 3"
                      class="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-serif tracking-wider"
                    >
                      +{{ post.images.length - 3 }}
                    </div>
                  </div>
                </div>

                <!-- 底部元信息与操作栏 -->
                <div class="flex items-center justify-between pt-4 border-t border-dashed border-[#E8DFCE]">
                  <!-- 作者信息 -->
                  <div class="flex items-center gap-3">
                    <img
                      :src="post.userAvatar"
                      class="w-8 h-8 rounded-full border border-[#E8DFCE]"
                    >
                    <div>
                      <div class="text-sm font-medium text-[#2C363F]">
                        {{ post.userName }}
                      </div>
                      <div class="text-[10px] text-[#A69B8D]">
                        {{ post.createdAt }}
                      </div>
                    </div>
                  </div>

                  <!-- 互动数据 -->
                  <div class="flex items-center gap-6">
                    <button class="flex items-center gap-1.5 text-[#8B7355] hover:text-[#8B2B2B] transition-colors group/btn">
                      <UIcon
                        name="i-lucide-flame"
                        class="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                        :class="{ 'text-[#8B2B2B] fill-[#8B2B2B]': post.liked }"
                      />
                      <span class="text-xs font-medium">{{ post.likes }}</span>
                    </button>
                    <button class="flex items-center gap-1.5 text-[#8B7355] hover:text-[#5B8C7A] transition-colors group/btn">
                      <UIcon
                        name="i-lucide-message-square"
                        class="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                      />
                      <span class="text-xs font-medium">{{ post.comments }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 加载更多 -->
          <div class="mt-8 text-center">
            <button class="px-6 py-2 text-[#8B7355] text-sm border border-[#E8DFCE] rounded-full hover:bg-[#F5F0E6] hover:text-[#2C363F] transition-all">
              查阅更多卷宗
            </button>
          </div>
        </div>

        <!-- 右侧：侧边栏 (30% 宽度) -->
        <div class="w-full lg:w-1/3 space-y-6">
          <!-- 发帖引导卡片 (代替原有的丑陋大输入框) -->
          <div class="bg-gradient-to-br from-[#8B2B2B] to-[#601A1A] rounded-xl p-6 text-[#FDFBF7] shadow-lg relative overflow-hidden">
            <svg
              class="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 pointer-events-none"
              viewBox="0 0 24 24"
              fill="currentColor"
            ><path d="M12 2L2 22h20L12 2zm0 3.8l7.2 14.2H4.8L12 5.8z" /></svg>
            <h3 class="text-lg font-serif font-bold mb-2">
              撰写金石之言
            </h3>
            <p class="text-xs text-white/70 mb-5 leading-relaxed">
              或是游记见闻，或是斗拱解析，皆可在此留下您的墨宝。
            </p>
            <button
              class="w-full py-3 bg-[#FDFBF7] text-[#8B2B2B] rounded-lg text-sm font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              @click="showPostModal = true"
            >
              <UIcon
                name="i-lucide-pen-tool"
                class="w-4 h-4"
              />
              提笔起草
            </button>
          </div>

          <!-- 热门榜单 -->
          <div class="bg-white rounded-xl shadow-sm border border-[#E8DFCE]/80 p-5">
            <h3 class="text-base font-serif font-bold text-[#2C363F] mb-4 flex items-center gap-2">
              <UIcon
                name="i-lucide-trending-up"
                class="w-5 h-5 text-[#D4AF37]"
              />
              热门探讨
            </h3>
            <div class="space-y-4">
              <div
                v-for="(topic, idx) in hotTopics"
                :key="idx"
                class="flex gap-3 group cursor-pointer"
              >
                <div
                  class="text-lg font-serif font-bold mt-0.5"
                  :class="idx < 3 ? 'text-[#8B2B2B]' : 'text-[#D1C9BE]'"
                >
                  0{{ idx + 1 }}
                </div>
                <div>
                  <h4 class="text-sm font-medium text-[#2C363F] group-hover:text-[#D4AF37] transition-colors leading-snug mb-1">
                    {{ topic.title }}
                  </h4>
                  <p class="text-[10px] text-[#A69B8D]">
                    {{ topic.hotness }} 热度
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 活跃知音 (联通之前的“好友”系统) -->
          <div class="bg-white rounded-xl shadow-sm border border-[#E8DFCE]/80 p-5">
            <h3 class="text-base font-serif font-bold text-[#2C363F] mb-4 flex items-center gap-2">
              <UIcon
                name="i-lucide-users"
                class="w-5 h-5 text-[#5B8C7A]"
              />
              活跃同道
            </h3>
            <div class="grid grid-cols-4 gap-3">
              <div
                v-for="user in activeUsers"
                :key="user.id"
                class="flex flex-col items-center gap-1 group cursor-pointer"
              >
                <div class="w-10 h-10 rounded-full overflow-hidden border border-[#E8DFCE] group-hover:border-[#D4AF37] transition-colors">
                  <img
                    :src="user.avatar"
                    class="w-full h-full object-cover"
                  >
                </div>
                <span class="text-[10px] text-[#8B7355] truncate w-full text-center">{{ user.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 悬浮发帖弹窗 (模拟) -->
    <div
      v-if="showPostModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-[#2C363F]/40 backdrop-blur-sm"
        @click="showPostModal = false"
      />
      <div class="bg-[#FDFBF7] w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div class="px-6 py-4 border-b border-[#E8DFCE] flex justify-between items-center bg-white">
          <h2 class="text-lg font-serif font-bold text-[#2C363F]">
            撰写新篇
          </h2>
          <button
            class="text-[#A69B8D] hover:text-[#2C363F]"
            @click="showPostModal = false"
          >
            <UIcon
              name="i-lucide-x"
              class="w-5 h-5"
            />
          </button>
        </div>
        <div class="p-6 flex-1 overflow-y-auto">
          <input
            type="text"
            placeholder="添上一个引人入胜的标题..."
            class="w-full text-xl font-serif font-bold bg-transparent border-none focus:outline-none focus:ring-0 mb-4 text-[#2C363F] placeholder:text-[#D1C9BE]"
          >
          <textarea
            rows="8"
            placeholder="在此铺陈您的见解与图文..."
            class="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-[#5C544E] text-base leading-relaxed placeholder:text-[#A69B8D]"
          />
        </div>
        <div class="px-6 py-4 border-t border-[#E8DFCE] bg-white flex justify-between items-center">
          <div class="flex gap-2">
            <button class="p-2 text-[#8B7355] hover:bg-[#F5F0E6] rounded-lg">
              <UIcon
                name="i-lucide-image"
                class="w-5 h-5"
              />
            </button>
            <button class="p-2 text-[#8B7355] hover:bg-[#F5F0E6] rounded-lg">
              <UIcon
                name="i-lucide-hash"
                class="w-5 h-5"
              />
            </button>
          </div>
          <button
            class="px-8 py-2 bg-[#8B2B2b] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#601A1A] transition-colors"
            @click="showPostModal = false"
          >
            发布
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('all')
const showPostModal = ref(false)

const tabs = [
  { id: 'all', name: '全部雅集' },
  { id: 'discussion', name: '学术研讨' },
  { id: 'photos', name: '古建光影' },
  { id: 'travel', name: '游记寻访' },
  { id: 'question', name: '求师解惑' }
]

// 模拟的高级帖子数据
const posts = ref([
  {
    id: 'p1',
    topicType: 'discussion',
    topicName: '学术研讨',
    title: '应县木塔二层暗层变形分析与加固探讨',
    content: '近日重新梳理了应县木塔的历次测绘数据。木塔二层明层和三层暗层之间的柱网位移尤为严重。关于目前圈梁加筋的保护方案，我认为在力学上虽然止住了倾斜，但破坏了原有纯木构卯榫的柔性抗震特性。大家怎么看？',
    images: [],
    userName: '斗拱研究员',
    userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20architect%20avatar&image_size=square',
    createdAt: '2小时前',
    likes: 128,
    comments: 45,
    liked: true
  },
  {
    id: 'p2',
    topicType: 'photos', topicName: '古建光影',
    title: '秋日拙政园：光影与漏窗的绝妙配合',
    content: '江南园林最讲究“借景”。昨日傍晚时分，阳光穿过拙政园的漏窗，在白墙上打下斑驳的树影，这就是古人所说的“粉壁为纸，以石为绘”吧。图3的那个六角漏窗尤为精妙。',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20window%20shadow%20autumn&image_size=landscape',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traditional%20chinese%20garden%20pavilion%20pond&image_size=landscape',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20white%20wall%20bamboo%20shadow&image_size=landscape',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20garden%20doorway&image_size=landscape'
    ],
    userName: '林泉高致', userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=elegant%20chinese%20scholar%20avatar&image_size=square',
    createdAt: '5小时前', likes: 356, comments: 28, liked: false
  },
  {
    id: 'p3',
    topicType: 'travel', topicName: '游记寻访',
    title: '探秘山西长治：那些隐匿在乡野的浊漳河谷古建',
    content: '沿着浊漳河一路前行，天台庵、大云院、龙门寺……这里简直是中国早期木构建筑的露天博物馆。相比于名山大川，这些藏在村落里的古庙更有一种未经雕琢的沧桑感。附上这次的寻访路线。',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20temple%20in%20mountains%20shanxi&image_size=landscape'
    ],
    userName: '寻访晋风', userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=traveler%20avatar&image_size=square',
    createdAt: '昨天', likes: 210, comments: 67, liked: false
  }
])

const hotTopics = ref([
  { title: '#应县木塔维修方案争议#', hotness: '8.5w' },
  { title: '#寻访全国最美宋代斗拱#', hotness: '5.2w' },
  { title: '#江南园林造景手法解析#', hotness: '3.8w' },
  { title: '#梁思成与林徽因的古建考察路#', hotness: '2.1w' }
])

const activeUsers = ref([
  { id: 1, name: '林泉高致', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar1&image_size=square' },
  { id: 2, name: '斗拱研究', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar2&image_size=square' },
  { id: 3, name: '故宫猫', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar3&image_size=square' },
  { id: 4, name: '匠心', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar4&image_size=square' },
  { id: 5, name: '晋风', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar5&image_size=square' },
  { id: 6, name: '长城守望', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar6&image_size=square' },
  { id: 7, name: '木作', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar7&image_size=square' },
  { id: 8, name: '飞檐', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=avatar8&image_size=square' }
])

// 根据分类返回不同的装饰颜色
const getTopicColor = (type: string) => {
  const map: Record<string, string> = {
    discussion: 'bg-[#8B2B2B]', // 学术-宫墙红
    photos: 'bg-[#5B8C7A]', // 光影-天青色
    travel: 'bg-[#D4AF37]', // 游记-琉璃黄
    question: 'bg-[#8B7355]' // 问答-原木色
  }
  return map[type] || 'bg-[#E8DFCE]'
}

// 根据分类返回标签样式
const getTopicStyle = (type: string) => {
  const map: Record<string, string> = {
    discussion: 'text-[#8B2B2B] border-[#8B2B2B]/30 bg-[#8B2B2B]/5',
    photos: 'text-[#5B8C7A] border-[#5B8C7A]/30 bg-[#5B8C7A]/5',
    travel: 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/5',
    question: 'text-[#8B7355] border-[#8B7355]/30 bg-[#8B7355]/5'
  }
  return map[type] || 'text-[#8B7355] border-[#E8DFCE] bg-[#F5F0E6]'
}
</script>

<style scoped>
/* 隐藏原生滚动条但保持可滚动 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
