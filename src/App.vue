<script setup>
const randomThemeIndex = Math.floor(Math.random() * 8) + 1
document.body.classList.add(`theme-${randomThemeIndex}`)

</script>

<template>
  <div class="main-wrapper">
    <div class="block block-1"></div>
    <div class="block block-2"></div>
    <div class="block block-3"></div>
  </div>
</template>

<style scoped lang="scss">
.main-wrapper {
  // @apply bg-primary;
  @apply h-screen;

  .block {
    @apply w-200px h-200px inline-block;
    @apply bg-primary;

    &.block-1 {
      @apply bg-primary;
    }

    &.block-2 {
      @apply bg-primary-light;
    }

    &.block-3 {
      @apply bg-primary-extralight;
    }
  }
}
</style>
