<template>
  <div class="min-h-screen bg-paper">
    <!-- 顶部横幅 -->
    <div class="relative bg-gradient-to-r from-gold-600 via-gold-500 to-cyan-600 text-white py-16 px-4 overflow-hidden">
      <!-- 古风装饰元素 -->
      <div class="absolute top-0 left-0 w-full h-full opacity-10">
        <div class="absolute top-4 left-8 text-8xl">🏛️</div>
        <div class="absolute bottom-4 right-8 text-8xl">🏯</div>
        <div class="absolute top-1/2 left-1/4 text-6xl">🔔</div>
      </div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="text-4xl">🏛️</span>
              <h1 class="text-3xl md:text-5xl font-bold tracking-wide">古建筑论坛</h1>
            </div>
            <p class="text-gold-100 text-lg md:text-xl">与志同道合的朋友分享古建筑之美</p>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div class="text-3xl font-bold">{{ totalPosts }}</div>
              <div class="text-sm text-gold-100">帖子数</div>
            </div>
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div class="text-3xl font-bold">{{ totalUsers }}</div>
              <div class="text-sm text-gold-100">活跃用户</div>
            </div>
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div class="text-3xl font-bold">{{ totalComments }}</div>
              <div class="text-sm text-gold-100">评论数</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发帖区域 -->
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="bg-white rounded-2xl shadow-ancient p-6 border border-gold-100">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
            <span>{{ currentUser.name.charAt(0) }}</span>
          </div>
          <div class="flex-1">
            <textarea
              v-model="postContent"
              placeholder="分享您对古建筑的见解、探访经历或研究心得..."
              class="w-full h-24 px-5 py-4 bg-gold-50/60 border border-gold-200 rounded-xl resize-none focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200 transition-all text-ink-dark placeholder:text-ink-light text-base"
            ></textarea>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-3">
                <button class="flex items-center gap-2 px-4 py-2.5 text-ink-medium hover:text-gold-700 hover:bg-gold-50 rounded-xl transition-all tag-hover">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm font-medium">图片</span>
                </button>
                <button class="flex items-center gap-2 px-4 py-2.5 text-ink-medium hover:text-gold-700 hover:bg-gold-50 rounded-xl transition-all tag-hover">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span class="text-sm font-medium">话题</span>
                </button>
                <button class="flex items-center gap-2 px-4 py-2.5 text-ink-medium hover:text-gold-700 hover:bg-gold-50 rounded-xl transition-all tag-hover">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-sm font-medium">@好友</span>
                </button>
              </div>
              <div class="flex items-center gap-3">
                <select
                  v-model="newPostCategory"
                  class="appearance-none px-4 py-2.5 bg-gold-50 border border-gold-200 rounded-xl text-sm text-ink-medium focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200 cursor-pointer"
                >
                  <option value="">选择分类</option>
                  <option v-for="cat in categoriesForPost" :key="cat" :value="cat">{{ cat }}</option>
                </select>
                <button 
                  class="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-white rounded-xl font-medium hover:from-gold-700 hover:to-gold-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2 btn-ancient"
                  @click="submitPost"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19v-7m0 0l-3 3m3-3l3 3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>发布帖子</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="max-w-7xl mx-auto px-4 pb-8">
      <div class="flex gap-6">
        <!-- 帖子列表 -->
        <div class="flex-1">
          <!-- 筛选栏 -->
          <div class="bg-white rounded-2xl shadow-ancient p-4 border border-gold-100 mb-6">
            <div class="flex flex-wrap items-center gap-4">
              <div class="flex gap-2">
                <button
                  v-for="tab in tabs"
                  :key="tab.key"
                  @click="activeTab = tab.key"
                  :class="[
                    'px-5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                      : 'text-ink-medium hover:text-gold-700 hover:bg-gold-50 border border-gold-200'
                  ]"
                >
                  <span class="flex items-center gap-2">
                    <span>{{ tab.icon }}</span>
                    <span>{{ tab.label }}</span>
                  </span>
                </button>
              </div>
              
              <div class="flex-1"></div>
              
              <!-- 分类筛选 -->
              <div class="relative">
                <select
                  v-model="selectedCategory"
                  class="appearance-none px-4 py-2.5 bg-gold-50 border border-gold-200 rounded-xl text-sm text-ink-medium focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200 cursor-pointer"
                >
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </select>
                <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-light pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- 帖子卡片列表 -->
          <div class="space-y-5">
            <div
              v-for="(post, index) in posts"
              :key="post.id"
              class="bg-white rounded-2xl shadow-ancient overflow-hidden border border-gold-100 hover:shadow-xl transition-all duration-300 animate-slide-in cursor-pointer group"
              :style="{ animationDelay: `${index * 0.1}s` }"
              @click="openPost(post)"
            >
              <!-- 帖子头部 -->
              <div class="px-6 py-4 border-b border-gold-100 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="relative">
                    <img
                      :src="post.userAvatar"
                      :alt="post.userName"
                      class="w-12 h-12 rounded-full object-cover border-2 border-gold-200 group-hover:border-gold-400 transition-colors"
                    />
                    <span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gold-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-ink-black text-base">{{ post.userName }}</h4>
                    <p class="text-xs text-ink-light">{{ formatTime(post.createdAt) }}</p>
                  </div>
                </div>
                <span :class="['px-3 py-1.5 text-xs font-semibold rounded-full', getCategoryStyle(post.category)]">
                  {{ post.category }}
                </span>
              </div>

              <!-- 帖子内容 -->
              <div class="px-6 py-5">
                <h3 class="text-xl font-bold text-ink-black mb-3 line-clamp-2 group-hover:text-gold-700 transition-colors">{{ post.title }}</h3>
                <p class="text-ink-medium text-sm leading-relaxed mb-4 line-clamp-3">{{ post.content }}</p>
                
                <!-- 帖子图片 -->
                <div v-if="post.image" class="mb-4 rounded-xl overflow-hidden group-hover:shadow-lg transition-shadow">
                  <img
                    :src="post.image"
                    class="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <!-- 关联古建筑 -->
                <div v-if="post.buildingName" class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl cursor-pointer hover:from-cyan-100 hover:to-cyan-200 transition-all">
                  <svg class="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm font-medium text-cyan-700">{{ post.buildingName }}</span>
                </div>
              </div>

              <!-- 互动栏 -->
              <div class="px-6 py-4 bg-gradient-to-r from-gold-50/80 to-transparent flex items-center justify-between">
                <div class="flex items-center gap-6">
                  <button 
                    class="flex items-center gap-2 transition-all group/item"
                    :class="post.liked ? 'text-vermilion-600' : 'text-ink-medium group-hover/item:text-vermilion-600'"
                    @click.stop="toggleLike(post)"
                  >
                    <svg class="w-6 h-6 transition-transform group-hover/item:scale-110" :fill="post.liked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm font-medium">{{ formatNumber(post.likes) }}</span>
                  </button>
                  <button class="flex items-center gap-2 text-ink-medium hover:text-gold-700 transition-all" @click.stop="openComments(post)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span class="text-sm font-medium">{{ formatNumber(post.comments) }}</span>
                  </button>
                  <button class="flex items-center gap-2 text-ink-medium hover:text-cyan-600 transition-all" @click.stop="sharePost(post)">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span class="text-sm font-medium">{{ formatNumber(post.shares) }}</span>
                  </button>
                </div>
                <button class="flex items-center gap-2 text-ink-medium hover:text-gold-700 transition-all opacity-0 group-hover:opacity-100">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="text-sm">收藏</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="flex items-center justify-center mt-10">
            <div class="flex items-center gap-2 bg-white rounded-2xl p-1 shadow-ancient border border-gold-100">
              <button 
                :disabled="currentPage <= 1"
                class="px-4 py-2.5 rounded-xl text-ink-medium hover:text-gold-700 hover:bg-gold-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                @click="prevPage"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  'w-10 h-10 rounded-xl text-sm font-semibold transition-all',
                  currentPage === page
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                    : 'text-ink-medium hover:text-gold-700 hover:bg-gold-50'
                ]"
              >
                {{ page }}
              </button>
              <button 
                :disabled="currentPage >= totalPages"
                class="px-4 py-2.5 rounded-xl text-ink-medium hover:text-gold-700 hover:bg-gold-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                @click="nextPage"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="hidden lg:block w-80 flex-shrink-0 space-y-6">
          <!-- 推荐好友卡片 -->
          <div class="bg-white rounded-3xl shadow-ancient p-6 border-2 border-gold-100 relative overflow-hidden">
            <!-- 古风装饰 -->
            <div class="absolute -top-2 -left-2 text-6xl opacity-5">🎭</div>
            <div class="flex items-center justify-between mb-6 relative z-10">
              <h3 class="font-bold text-xl text-ink-black flex items-center gap-3">
                <span class="text-2xl">👥</span>
                <span>推荐同好</span>
              </h3>
              <button class="text-sm text-gold-700 hover:text-gold-800 font-medium flex items-center gap-1 hover:bg-gold-50 px-3 py-1.5 rounded-xl transition-all" @click="refreshRecommendations">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                换一批
              </button>
            </div>
            <div class="space-y-4 relative z-10">
              <div
                v-for="user in recommendations"
                :key="user.id"
                class="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r from-gold-50/80 to-cyan-50/50 transition-all cursor-pointer group border border-transparent hover:border-gold-200"
              >
                <div class="relative">
                  <img
                    :src="user.avatar"
                    :alt="user.name"
                    class="w-14 h-14 rounded-full object-cover border-3 border-gold-200 group-hover:border-gold-400 transition-all duration-300 shadow-md group-hover:shadow-lg"
                  />
                  <span :class="['absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-white', user.online ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300']"></span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h4 class="font-semibold text-ink-black text-base truncate">{{ user.name }}</h4>
                    <div class="flex items-center gap-1 bg-gradient-to-r from-gold-500 to-gold-600 px-2.5 py-1 rounded-full">
                      <span class="text-sm font-bold text-white">{{ user.matchScore }}%</span>
                    </div>
                  </div>
                  <p class="text-xs text-ink-light mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ user.province }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <span 
                      v-for="(interest, idx) in user.interests.slice(0, 2)" 
                      :key="idx"
                      class="px-2.5 py-1 bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-800 text-xs rounded-full font-medium"
                    >
                      {{ interest }}
                    </span>
                  </div>
                </div>
                <button 
                  class="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-700 text-white text-xs font-bold rounded-xl hover:from-gold-600 hover:to-gold-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  @click.stop="sendFriendRequest(user)"
                >
                  +关注
                </button>
              </div>
            </div>
          </div>

          <!-- 热门话题 -->
          <div class="bg-white rounded-3xl shadow-ancient p-6 border-2 border-gold-100 relative overflow-hidden">
            <!-- 古风装饰 -->
            <div class="absolute -bottom-2 -right-2 text-6xl opacity-5">🔥</div>
            <h3 class="font-bold text-xl text-ink-black flex items-center gap-3 mb-6 relative z-10">
              <span class="text-2xl">🔥</span>
              <span>热门话题</span>
            </h3>
            <div class="space-y-4 relative z-10">
              <div
                v-for="(topic, index) in hotTopics"
                :key="topic.id"
                class="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r from-gold-50/80 to-cyan-50/50 transition-all cursor-pointer group border border-transparent hover:border-gold-200"
              >
                <span :class="['w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg', index < 3 ? 'bg-gradient-to-br from-vermilion-400 to-vermilion-600 text-white' : 'bg-gray-100 text-gray-500']">
                  {{ index + 1 }}
                </span>
                <div class="flex-1 min-w-0">
                  <h4 class="text-base text-ink-black font-semibold truncate group-hover:text-gold-700 transition-colors">{{ topic.name }}</h4>
                  <div class="flex items-center gap-3 mt-1.5">
                    <span class="text-xs text-ink-light flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {{ formatNumber(topic.count) }} 讨论
                    </span>
                    <div :class="['flex items-center gap-1 text-xs font-medium', topic.trend === 'up' ? 'text-emerald-600' : topic.trend === 'down' ? 'text-vermilion-600' : 'text-gray-400']">
                      <svg v-if="topic.trend === 'up'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      <svg v-else-if="topic.trend === 'down'" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16h4m4 0h4m-8-4v4m0 8H7a2 2 0 01-2-2V6a2 2 0 012-2h4a2 2 0 012 2v4m-4 8h4m-4 0l4-4m0 0l4 4m-4-4v4" />
                      </svg>
                      <span>{{ topic.trend === 'up' ? '上升' : topic.trend === 'down' ? '下降' : '稳定' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 在线用户 -->
          <div class="bg-white rounded-3xl shadow-ancient p-6 border-2 border-gold-100 relative overflow-hidden">
            <!-- 古风装饰 -->
            <div class="absolute -top-4 -right-4 text-7xl opacity-5">💬</div>
            <div class="flex items-center justify-between mb-5 relative z-10">
              <h3 class="font-bold text-xl text-ink-black flex items-center gap-3">
                <span class="text-2xl">💬</span>
                <span>在线用户</span>
              </h3>
              <span class="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold rounded-full shadow-md">
                {{ onlineCount }} 人在线
              </span>
            </div>
            <div class="flex flex-wrap gap-3 relative z-10">
              <div
                v-for="user in onlineUsers"
                :key="user.id"
                class="relative group cursor-pointer"
              >
                <img
                  :src="user.avatar"
                  :alt="user.name"
                  class="w-12 h-12 rounded-full object-cover border-3 border-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300"
                />
                <span class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-3 border-white animate-pulse"></span>
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gradient-to-r from-gold-600 to-gold-700 text-white text-xs font-medium rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                  {{ user.name }}
                  <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gold-600"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 统计数据 -->
          <div class="bg-gradient-to-br from-gold-500 via-gold-600 to-gold-700 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden">
            <!-- 古风装饰 -->
            <div class="absolute -top-6 -left-6 text-8xl opacity-10">🏛️</div>
            <div class="text-5xl mb-4 text-center relative z-10">🏛️</div>
            <h3 class="font-bold text-xl mb-3 text-center relative z-10">今日精选</h3>
            <p class="text-sm text-gold-100 text-center mb-5 relative z-10">探索中国古建筑的无限魅力</p>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white/10 rounded-xl p-3 text-center">
                <div class="text-xl font-bold">{{ todayPosts }}</div>
                <div class="text-xs text-gold-100">今日帖子</div>
              </div>
              <div class="bg-white/10 rounded-xl p-3 text-center">
                <div class="text-xl font-bold">{{ activeUsers }}</div>
                <div class="text-xs text-gold-100">活跃用户</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 帖子详情弹窗 -->
    <div v-if="selectedPost" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" @click="closePost">
      <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in" @click.stop>
        <!-- 弹窗头部 -->
        <div class="px-6 py-4 border-b border-gold-100 flex items-center justify-between bg-gradient-to-r from-gold-50 to-transparent">
          <h3 class="text-lg font-bold text-ink-black">帖子详情</h3>
          <div class="flex items-center gap-2">
            <button class="p-2 hover:bg-gold-100 rounded-lg transition-colors">
              <svg class="w-5 h-5 text-ink-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <button class="p-2 hover:bg-gold-100 rounded-lg transition-colors" @click="closePost">
              <svg class="w-5 h-5 text-ink-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 弹窗内容 -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <!-- 帖子内容 -->
          <div class="flex items-start gap-4 mb-6">
            <img :src="selectedPost.userAvatar" :alt="selectedPost.userName" class="w-12 h-12 rounded-full object-cover border-2 border-gold-200" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-ink-black">{{ selectedPost.userName }}</h4>
                <span :class="['px-3 py-1 text-xs font-semibold rounded-full', getCategoryStyle(selectedPost.category)]">
                  {{ selectedPost.category }}
                </span>
              </div>
              <p class="text-sm text-ink-light mt-1">{{ selectedPost.createdAt }}</p>
            </div>
          </div>
          
          <h2 class="text-xl font-bold text-ink-black mb-4">{{ selectedPost.title }}</h2>
          <p class="text-ink-medium leading-relaxed mb-4 whitespace-pre-wrap">{{ selectedPost.content }}</p>
          
          <img v-if="selectedPost.image" :src="selectedPost.image" class="w-full rounded-xl mb-6" />
          
          <!-- 互动栏 -->
          <div class="flex items-center gap-8 py-4 border-y border-gold-100 mb-6">
            <button 
              class="flex items-center gap-2 transition-colors"
              :class="selectedPost.liked ? 'text-vermilion-600' : 'text-ink-medium hover:text-vermilion-600'"
              @click="toggleLike(selectedPost)"
            >
              <svg class="w-6 h-6" :fill="selectedPost.liked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
              <span class="font-medium">{{ selectedPost.likes }}</span>
            </button>
            <button class="flex items-center gap-2 text-ink-medium hover:text-gold-700 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span class="font-medium">{{ selectedPost.comments }}</span>
            </button>
            <button class="flex items-center gap-2 text-ink-medium hover:text-cyan-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span class="font-medium">{{ selectedPost.shares }}</span>
            </button>
          </div>
          
          <!-- 评论区 -->
          <div>
            <h4 class="font-bold text-ink-black flex items-center gap-2 mb-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>评论 ({{ postComments.length }})</span>
            </h4>
            
            <!-- 评论输入 -->
            <div class="flex items-start gap-3 mb-6 p-4 bg-gold-50 rounded-xl">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {{ currentUser.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <textarea
                  v-model="newComment"
                  placeholder="写下你的评论..."
                  class="w-full h-16 px-4 py-3 bg-white border border-gold-200 rounded-xl resize-none focus:outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200 text-sm"
                  @keydown.enter.meta="submitComment"
                  @keydown.enter.ctrl="submitComment"
                ></textarea>
                <div class="flex items-center justify-between mt-2">
                  <button class="text-sm text-ink-light hover:text-gold-700 transition-colors">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    添加图片
                  </button>
                  <button 
                    class="px-5 py-2.5 bg-gradient-to-r from-gold-600 to-gold-700 text-white text-sm font-medium rounded-xl hover:from-gold-700 hover:to-gold-800 transition-all shadow-md hover:shadow-lg"
                    @click="submitComment"
                  >
                    发布评论
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 评论列表 -->
            <div class="space-y-4">
              <div
                v-for="comment in postComments"
                :key="comment.id"
                class="flex gap-3"
              >
                <img :src="comment.userAvatar" :alt="comment.userName" class="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div class="flex-1 bg-gradient-to-r from-gold-50 to-transparent rounded-xl p-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold text-ink-black">{{ comment.userName }}</span>
                    <span class="text-xs text-ink-light">{{ comment.createdAt }}</span>
                  </div>
                  <p class="text-ink-medium text-sm">{{ comment.content }}</p>
                  
                  <!-- 回复列表 -->
                  <div v-if="comment.replies && comment.replies.length > 0" class="mt-3 space-y-2">
                    <div
                      v-for="reply in comment.replies"
                      :key="reply.id"
                      class="flex gap-2 pl-3 border-l-2 border-gold-200"
                    >
                      <img :src="reply.userAvatar" :alt="reply.userName" class="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                          <span class="font-medium text-ink-black text-xs">{{ reply.userName }}</span>
                          <span class="text-xs text-ink-light">{{ reply.createdAt }}</span>
                        </div>
                        <p class="text-ink-medium text-xs">{{ reply.content }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center gap-4 mt-3">
                    <button class="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      回复
                    </button>
                    <button class="text-xs text-gold-700 hover:text-gold-800 flex items-center gap-1">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                      </svg>
                      点赞
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">import { ref, computed, onMounted } from 'vue';
const postContent = ref('');
const newPostCategory = ref('');
const activeTab = ref('hot');
const selectedCategory = ref('全部');
const currentPage = ref(1);
const selectedPost = ref<Post | null>(null);
const newComment = ref('');
const tabs = [
 { key: 'hot', label: '热门', icon: '🔥' },
 { key: 'new', label: '最新', icon: '✨' },
 { key: 'following', label: '关注', icon: '👤' }
];
interface Post {
 id: string;
 userId: string;
 userName: string;
 userAvatar: string;
 title: string;
 content: string;
 image?: string;
 buildingId?: string;
 buildingName?: string;
 category: string;
 likes: number;
 comments: number;
 shares: number;
 liked: boolean;
 createdAt: string;
}
interface RecommendUser {
 id: string;
 name: string;
 avatar: string;
 bio: string;
 interests: string[];
 province: string;
 matchScore: number;
 online: boolean;
}
interface HotTopic {
 id: string;
 name: string;
 count: number;
 trend: 'up' | 'down' | 'stable';
}
interface OnlineUser {
 id: string;
 name: string;
 avatar: string;
}
interface Comment {
 id: string;
 postId: string;
 userId: string;
 userName: string;
 userAvatar: string;
 content: string;
 createdAt: string;
 replies?: Reply[];
}
interface Reply {
 id: string;
 commentId: string;
 userId: string;
 userName: string;
 userAvatar: string;
 content: string;
 createdAt: string;
}
interface CurrentUser {
 id: string;
 name: string;
 avatar: string;
}
const posts = ref<Post[]>([]);
const categories = ref(['全部']);
const categoriesForPost = ref<string[]>([]);
const totalPages = ref(1);
const recommendations = ref<RecommendUser[]>([]);
const hotTopics = ref<HotTopic[]>([]);
const onlineUsers = ref<OnlineUser[]>([]);
const postComments = ref<Comment[]>([]);
const totalPosts = ref(0);
const totalUsers = ref(0);
const totalComments = ref(0);
const todayPosts = ref(0);
const activeUsers = ref(0);
const currentUser: CurrentUser = {
 id: 'current',
 name: '古建探索者',
 avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20chinese%20person%20portrait%20avatar%20professional&image_size=square'
};
const onlineCount = computed(() => onlineUsers.value.length);
const visiblePages = computed(() => {
 const pages: number[] = [];
 const total = totalPages.value;
 const current = currentPage.value;
 if (total <= 5) {
 for (let i = 1; i <= total; i++)
 pages.push(i);
 }
 else {
 if (current <= 3) {
 pages.push(1, 2, 3, 4, 5);
 }
 else if (current >= total - 2) {
 pages.push(total - 4, total - 3, total - 2, total - 1, total);
 }
 else {
 pages.push(current - 2, current - 1, current, current + 1, current + 2);
 }
 }
 return pages;
});
const getCategoryStyle = (category: string) => {
 const styles: Record<string, string> = {
 '建筑鉴赏': 'bg-cyan-100 text-cyan-700',
 '摄影分享': 'bg-pink-100 text-pink-700',
 '园林艺术': 'bg-green-100 text-green-700',
 '历史研究': 'bg-purple-100 text-purple-700',
 '工艺技术': 'bg-orange-100 text-orange-700',
 '艺术研究': 'bg-indigo-100 text-indigo-700',
 '民居研究': 'bg-yellow-100 text-yellow-700',
 '旅游推荐': 'bg-rose-100 text-rose-700'
 };
 return styles[category] || 'bg-gold-100 text-gold-700';
};
const formatNumber = (num: number) => {
 if (num >= 1000) {
 return (num / 1000).toFixed(1) + 'k';
 }
 return num.toString();
};
const formatTime = (timeStr: string) => {
 const now = new Date();
 const postTime = new Date(timeStr.replace(/-/g, '/'));
 const diff = now.getTime() - postTime.getTime();
 const hours = Math.floor(diff / (1000 * 60 * 60));
 const days = Math.floor(hours / 24);
 if (days > 0)
 return `${days}天前`;
 if (hours > 0)
 return `${hours}小时前`;
 return '刚刚';
};
const fetchPosts = async (page = 1) => {
 try {
 const response = await fetch(`/api/forum/posts?page=${page}&pageSize=10&category=${selectedCategory.value}`);
 const data = await response.json();
 posts.value = data.posts || [];
 totalPages.value = data.totalPages || 1;
 currentPage.value = data.page || 1;
 totalPosts.value = data.total || 0;
 if (data.categories) {
 categories.value = data.categories;
 categoriesForPost.value = data.categories.filter((c: string) => c !== '全部');
 }
 }
 catch (error) {
 console.error('Failed to fetch posts:', error);
 }
};
const fetchRecommendations = async () => {
 try {
 const response = await fetch('/api/friends/recommend');
 const data = await response.json();
 if (data.success) {
 recommendations.value = data.recommendations || [];
 }
 }
 catch (error) {
 console.error('Failed to fetch recommendations:', error);
 }
};
const fetchHotTopics = async () => {
 try {
 const response = await fetch('/api/forum/hot-topics');
 const data = await response.json();
 if (data.success) {
 hotTopics.value = data.topics || [];
 }
 }
 catch (error) {
 console.error('Failed to fetch hot topics:', error);
 hotTopics.value = [
 { id: 't1', name: '#故宫600年#', count: 1256, trend: 'up' as const },
 { id: 't2', name: '#长城保护#', count: 892, trend: 'up' as const },
 { id: 't3', name: '#唐代建筑#', count: 654, trend: 'stable' as const },
 { id: 't4', name: '#园林艺术#', count: 432, trend: 'down' as const },
 { id: 't5', name: '#榫卯结构#', count: 318, trend: 'up' as const },
 { id: 't6', name: '#敦煌壁画#', count: 276, trend: 'stable' as const },
 { id: 't7', name: '#江南水乡#', count: 245, trend: 'down' as const },
 { id: 't8', name: '#应县木塔#', count: 198, trend: 'up' as const }
 ];
 }
};
const fetchOnlineUsers = async () => {
 try {
 const response = await fetch('/api/friends');
 const data = await response.json();
 if (data.success) {
 onlineUsers.value = (data.friends || []).filter((user: OnlineUser) => user.online);
 activeUsers.value = onlineUsers.value.length;
 }
 }
 catch (error) {
 onlineUsers.value = [
 { id: 'u1', name: '古建爱好者小王', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20chinese%20scholar%20portrait%20avatar%20gentleman&image_size=square' },
 { id: 'u2', name: '长城守护人', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=chinese%20guardian%20warrior%20portrait%20avatar%20middle%20age&image_size=square' },
 { id: 'u4', name: '古塔探秘者', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20tower%20explorer%20portrait%20avatar%20adventurer&image_size=square' },
 { id: 'u6', name: '壁画研究员', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=ancient%20painter%20portrait%20avatar%20artist&image_size=square' },
 { id: 'u8', name: '窑洞文化传承', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cave%20dwelling%20protector%20portrait%20avatar%20local&image_size=square' },
 { id: 'u9', name: '佛光寺守护者', avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=buddhist%20temple%20guardian%20portrait%20avatar%20monk&image_size=square' }
 ];
 activeUsers.value = onlineUsers.value.length;
 }
};
const fetchComments = async (postId: string) => {
 try {
 const response = await fetch(`/api/forum/posts/${postId}`);
 const data = await response.json();
 if (data.success) {
 postComments.value = data.comments || [];
 totalComments.value = postComments.value.length;
 }
 }
 catch (error) {
 console.error('Failed to fetch comments:', error);
 }
};
const prevPage = () => {
 if (currentPage.value > 1) {
 fetchPosts(currentPage.value - 1);
 }
};
const nextPage = () => {
 if (currentPage.value < totalPages.value) {
 fetchPosts(currentPage.value + 1);
 }
};
const goToPage = (page: number) => {
 fetchPosts(page);
};
const toggleLike = (post: Post) => {
 post.liked = !post.liked;
 post.likes += post.liked ? 1 : -1;
};
const sharePost = (post: Post) => {
 post.shares += 1;
 if (navigator.share) {
 navigator.share({
 title: post.title,
 text: post.content,
 url: window.location.href
 });
 }
 else {
 navigator.clipboard.writeText(window.location.href);
 alert('链接已复制到剪贴板！');
 }
};
const openPost = (post: Post) => {
 selectedPost.value = post;
 fetchComments(post.id);
};
const closePost = () => {
 selectedPost.value = null;
 newComment.value = '';
};
const openComments = (post: Post) => {
 openPost(post);
};
const submitComment = async () => {
 if (!newComment.value.trim() || !selectedPost.value)
 return;
 try {
 const response = await fetch('/api/forum/comments', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 postId: selectedPost.value.id,
 content: newComment.value.trim()
 })
 });
 const data = await response.json();
 if (data.success) {
 postComments.value.push(data.comment);
 selectedPost.value.comments += 1;
 newComment.value = '';
 }
 }
 catch (error) {
 console.error('Failed to submit comment:', error);
 }
};
const submitPost = async () => {
 if (!postContent.value.trim()) {
 alert('请输入帖子内容');
 return;
 }
 try {
 const response = await fetch('/api/forum/posts', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 title: postContent.value.substring(0, 50),
 content: postContent.value.trim(),
 category: newPostCategory.value || '建筑鉴赏'
 })
 });
 const data = await response.json();
 if (data.success) {
 alert('发帖成功！');
 postContent.value = '';
 newPostCategory.value = '';
 fetchPosts(1);
 }
 }
 catch (error) {
 console.error('Failed to submit post:', error);
 }
};
const refreshRecommendations = () => {
 fetchRecommendations();
};
const sendFriendRequest = async (user: RecommendUser) => {
 try {
 const response = await fetch('/api/friends/request', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 userId: user.id,
 reason: '想和你一起探讨古建筑文化'
 })
 });
 const data = await response.json();
 if (data.success) {
 alert(data.message);
 }
 }
 catch (error) {
 console.error('Failed to send friend request:', error);
 }
};
onMounted(() => {
 fetchPosts();
 fetchRecommendations();
 fetchHotTopics();
 fetchOnlineUsers();
 todayPosts.value = Math.floor(Math.random() * 20) + 30;
});
</script>