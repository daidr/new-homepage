<script setup>
import { watch } from 'vue';
import { useCssVar } from '@vueuse/core';
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import RouterTransition from './components/RouterTransition.vue';

const randomThemeIndex = Math.floor(Math.random() * 8) + 1
document.body.classList.add(`theme-${randomThemeIndex}`)

// 设置 theme color
const setThemeColor = (color) => {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
}

const themeColor = useCssVar('--color-primary-light', document.body)

watch(() => themeColor.value, (value) => {
  setThemeColor(`rgb(${value.trim()})`)
}, { immediate: true })
</script>

<template>
  <div class="main-wrapper">
    <RouterView v-slot="{ Component }">
      <RouterTransition>
        <component :is="Component" />
      </RouterTransition>
    </RouterView>
  </div>

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
