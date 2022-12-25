<script setup>
import MessageContainer from '@/components/Message/MessageContainer.vue';

const randomThemeIndex = Math.floor(Math.random() * 8) + 1
document.body.classList.add(`theme-${randomThemeIndex}`)

</script>

<template>
  <div class="main-wrapper">
    <RouterView v-slot="{ Component }">
      <component :is="Component"></component>
    </RouterView>
  </div>
  <MessageContainer />
</template>

<style scoped lang="scss">
.main-wrapper {
  @apply bg-primary-light;
  @apply h-screen;
}
</style>
