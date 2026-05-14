<template>
  <div class="chat-container">
    <header class="chat-header">
      <div class="header-title">
        <span class="icon-logo">⛩️</span>
        <h2>营造学社 · 智答</h2>
      </div>
      <p class="header-subtitle">
        AI 古建向导，为您解答千年营造之惑
      </p>
    </header>

    <div
      ref="messageWindow"
      class="message-window"
    >
      <transition-group
        name="msg"
        tag="div"
        class="message-list"
      >
        <div
          key="welcome"
          class="message ai-message"
        >
          <div class="avatar ai-avatar">
            AI
          </div>
          <div class="message-bubble">
            <p>您好！我是您的专属古建向导。无论是斗拱榫卯的微观结构，还是唐宋明清的宏观演变，您都可以向我提问。</p>
          </div>
        </div>

        <div
          v-for="(msg, index) in displayMessages"
          :key="index"
          :class="['message', msg.role === 'user' ? 'user-message' : 'ai-message']"
        >
          <div
            class="avatar"
            :class="msg.role === 'user' ? 'user-avatar' : 'ai-avatar'"
          >
            {{ msg.role === 'user' ? '我' : 'AI' }}
          </div>
          <div class="message-bubble">
            <p>{{ msg.content }}</p>
          </div>
        </div>

        <div
          v-if="isWaiting"
          key="loading"
          class="message ai-message"
        >
          <div class="avatar ai-avatar">
            AI
          </div>
          <div class="message-bubble loading-bubble">
            <span class="dot" />
            <span class="dot" />
            <span class="dot" />
          </div>
        </div>
      </transition-group>
    </div>

    <div class="input-panel">
      <div class="input-wrapper">
        <textarea
          ref="inputRef"
          v-model="userInput"
          placeholder="在此输入您的疑惑 (Shift + Enter 换行)"
          :disabled="isWaiting"
          rows="1"
          @keydown.enter.exact.prevent="handleSend"
          @input="autoResize"
        />
        <button
          class="send-btn"
          :class="{ active: userInput.trim() && !isWaiting }"
          :disabled="isWaiting || !userInput.trim()"
          @click="handleSend"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// DOM 引用，用于控制自动滚动和输入框高度
const messageWindow = ref(null)
const inputRef = ref(null)

// 状态管理
const userInput = ref('')
const isWaiting = ref(false)

// 消息队列（包含系统设定）
const messages = ref([
  { role: 'system', content: '你是一个精通中国古代建筑史的专业向导，语气温和、专业、富有文化底蕴。' }
])

// 过滤掉系统设定的展示列表
const displayMessages = computed(() => {
  return messages.value.filter(m => m.role !== 'system')
})

// 自动调整输入框高度
const autoResize = () => {
  const el = inputRef.value
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
  if (el.scrollHeight > 120) {
    el.style.overflowY = 'auto'
  } else {
    el.style.overflowY = 'hidden'
  }
}

// 自动滚动到最底部
const scrollToBottom = async () => {
  await nextTick()
  if (messageWindow.value) {
    messageWindow.value.scrollTop = messageWindow.value.scrollHeight
  }
}

// 发送消息核心逻辑
const handleSend = async () => {
  if (!userInput.value.trim() || isWaiting.value) return

  const currentInput = userInput.value
  messages.value.push({ role: 'user', content: currentInput })

  userInput.value = ''
  isWaiting.value = true

  // 恢复输入框高度
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
  }

  scrollToBottom()

  try {
    // 调用我们在 Nuxt /server/api/chat 写的接口
    const data = await $fetch('/api/chat', {
      method: 'POST',
      body: { history: messages.value }
    })

    if (data.success) {
      messages.value.push({ role: 'assistant', content: data.reply })
    } else {
      messages.value.push({ role: 'assistant', content: '抱歉，藏经阁的门卡住了，请稍后再试。' })
    }
  } catch (err) {
    messages.value.push({ role: 'assistant', content: '网络波动，请检查连接。' })
  } finally {
    isWaiting.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
/* 定义主题变量，契合网站的新中式风格 */
.chat-container {
  --primary-red: #a7242a; /* 故宫红/朱砂红 */
  --bg-color: #fdfbf7; /* 宣纸白/暖灰 */
  --text-main: #2c2c2c;
  --text-light: #7f7f7f;
  --bubble-ai: #ffffff;
  --bubble-user: #a7242a;

  max-width: 850px;
  margin: 0 auto;
  background: var(--bg-color);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 75vh; /* 适配不同屏幕的高级感比例 */
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

/* 顶部标题栏 */
.chat-header {
  padding: 24px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  text-align: center;
  z-index: 10;
}
.header-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.header-title h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--text-main);
  letter-spacing: 2px;
}
.header-subtitle {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--text-light);
}

/* 消息流区域 */
.message-window {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

/* 消息入场动画 (第一性原理：状态变化的视觉反馈) */
.msg-enter-active, .msg-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.2, 1);
}
.msg-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* 消息气泡基础样式 */
.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}
.message-bubble {
  max-width: 70%;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.6;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}
.message-bubble p {
  margin: 0;
}
.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

/* AI 样式配置 */
.ai-message {
  flex-direction: row;
}
.ai-avatar {
  background: var(--primary-red);
  color: #fff;
}
.ai-message .message-bubble {
  background: var(--bubble-ai);
  color: var(--text-main);
  border-top-left-radius: 2px; /* 方圆结合的传统审美 */
}

/* 用户样式配置 */
.user-message {
  flex-direction: row-reverse;
}
.user-avatar {
  background: #2c2c2c;
  color: #fff;
}
.user-message .message-bubble {
  background: var(--bubble-user);
  color: #fff;
  border-top-right-radius: 2px;
}

/* 输入区域 */
.input-panel {
  padding: 20px 24px;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
.input-wrapper {
  display: flex;
  align-items: flex-end;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 8px 12px;
  transition: all 0.3s ease;
}
.input-wrapper:focus-within {
  background: #fff;
  box-shadow: 0 0 0 2px rgba(167, 36, 42, 0.1);
}
textarea {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 15px;
  color: var(--text-main);
  outline: none;
  resize: none;
  max-height: 120px;
  font-family: inherit;
}
textarea::placeholder {
  color: #a0a0a0;
}
.send-btn {
  background: transparent;
  color: #a0a0a0;
  border: none;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: not-allowed;
  transition: all 0.3s;
  margin-left: 8px;
}
.send-btn.active {
  background: var(--primary-red);
  color: #fff;
  cursor: pointer;
}
.send-btn.active:hover {
  background: #8c1e24;
}

/* Loading 呼吸灯特效 */
.loading-bubble {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 20px !important;
}
.dot {
  width: 6px;
  height: 6px;
  background-color: var(--primary-red);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}
.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* 隐藏滚动条但保留功能 */
.message-window::-webkit-scrollbar, textarea::-webkit-scrollbar {
  width: 6px;
}
.message-window::-webkit-scrollbar-thumb, textarea::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
}
</style>
