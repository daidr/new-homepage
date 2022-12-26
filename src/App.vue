<script setup>
import MessageContainer from '@/components/Message/MessageContainer.vue';
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import RouterTransition from './components/RouterTransition.vue';

const randomThemeIndex = Math.floor(Math.random() * 8) + 1
document.body.classList.add(`theme-${randomThemeIndex}`)

// 获取css变量 --color-primary-light 的值
const getCssVar = (name) => {
  return getComputedStyle(document.body).getPropertyValue(name)
}

// 设置 theme color
const setThemeColor = (color) => {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
}

onMounted(() => {
  setThemeColor(`rgb(${getCssVar('--color-primary-light')})`)
})
</script>

<template>
  <div class="main-wrapper">
    <RouterView v-slot="{ Component }">
      <RouterTransition>
        <component :is="Component" />
      </RouterTransition>
    </RouterView>
  </div>
  <!-- <div class="debug">
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/">Index</RouterLink>
  </div> -->
  <MessageContainer />
  <Footer />
</template>

<style scoped lang="scss">
.main-wrapper {
  @apply bg-primary-light;
  @apply h-full;
  transform-style: preserve-3d;
  perspective-origin: 150% 150%;
  background-image: url(/images/bg.svg);
}

.debug {
  @apply fixed bottom-0 right-0;
}
</style>
