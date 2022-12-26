<script setup>
import MessageContainer from '@/components/Message/MessageContainer.vue';
import { RouterLink, RouterView } from 'vue-router';
import RouterTransition from './components/RouterTransition.vue';

const randomThemeIndex = Math.floor(Math.random() * 8) + 1
document.body.classList.add(`theme-${randomThemeIndex}`)

</script>

<template>
  <div class="main-wrapper">
    <RouterView v-slot="{ Component }">
      <RouterTransition>
        <component :is="Component" />
      </RouterTransition>
    </RouterView>
  </div>
  <div class="debug">
    <RouterLink to="/projects">Projects</RouterLink>
    <RouterLink to="/">Index</RouterLink>
  </div>
  <MessageContainer />
</template>

<style scoped lang="scss">
.main-wrapper {
  @apply bg-primary-light;
  @apply h-screen;
  transform: translateZ(-1000px);
  transform-style: preserve-3d;
  perspective-origin: 150% 150%;
}

.debug {
  @apply fixed bottom-0 right-0;
}
</style>
