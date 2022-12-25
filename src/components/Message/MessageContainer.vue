<script setup>
import { useMessage } from '@/components/message'
import MessageItem from '@/components/message/MessageItem.vue'

// 获取全局message列表
const { messageList } = useMessage()
</script>

<template>
  <div class="message-container">
    <transition-group name="message-list">
      <MessageItem v-for="item of messageList" :key="item.id" :text="item.text" :icon="item.icon"></MessageItem>
    </transition-group>
  </div>
</template>

<style scoped>
.message-container {
  @apply fixed top-0 left-0 right-0 pointer-events-none z-100;
  @apply flex flex-col-reverse items-center;
  @apply top-22;
}

.message-list-enter-from,
.message-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.message-list-leave-active {
  position: absolute;
}
</style>
