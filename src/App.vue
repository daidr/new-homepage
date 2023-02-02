<script setup>
import { onMounted, ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import RouterTransition from './components/RouterTransition.vue';
import TitleObserver from './components/TitleObserver.vue';
import { forceReflow } from './utils/_';

let currentThemeColor = null
const initThemeColor = () => {
  if (currentThemeColor) {
    document.body.classList.remove(`theme-${currentThemeColor}`)
  }
  const randomThemeIndex = Math.floor(Math.random() * 8) + 1
  document.body.classList.add(`theme-${randomThemeIndex}`)
  currentThemeColor = randomThemeIndex
  forceReflow()
  refreshThemeColor()
}

// 设置 theme color
const setThemeColor = (color) => {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
}

let bodyStyle = window.getComputedStyle(document.body)
const primaryColorLight = ref(bodyStyle.getPropertyValue('--color-primary-light').trim())

const refreshThemeColor = () => {
  primaryColorLight.value = bodyStyle.getPropertyValue('--color-primary-light').trim()
}

watch(() => primaryColorLight.value, (value) => {
  setThemeColor(`rgb(${value.trim()})`)
}, { immediate: true })

onMounted(() => {
  initThemeColor()
})
</script>

<template>
  <TitleObserver />
  <div class="main-wrapper">
    <RouterView v-slot="{ Component }">
      <RouterTransition>
        <component :is="Component" />
      </RouterTransition>
    </RouterView>
    <!-- <div class="debug">
      <details>
        <summary>Debug</summary>
        <div>主题色: {{ primaryColorLight }} (<span @click="initThemeColor">刷新</span>)</div>
        <div class="links">
          <RouterLink to="/projects">Projects</RouterLink>
          <RouterLink to="/me">Me</RouterLink>
          <RouterLink to="/friends">Friends</RouterLink>
        </div>
        <div class="links">
          <RouterLink to="/123">404测试</RouterLink>
        </div>
      </details>

    </div> -->
    <Footer />
  </div>
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
  @apply fixed top-0 left-0 z-999;
  @apply transform-gpu translate-z-300vh;
  @apply bg-primary-light;

  .details {
    @apply flex flex-col;
    @apply bg-primary-light;
  }

  .links {
    @apply space-x-1;
  }

}
</style>
