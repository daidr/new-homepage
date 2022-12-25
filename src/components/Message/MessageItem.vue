<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="message-item">
    <div v-if="icon" class="message-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        width="1em"
        height="1em"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <!-- info -->
        <path
          v-if="icon === 'info'"
          fill="currentColor"
          d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8.01 8.01 0 0 1-8 8Zm0-8.5a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1Zm0-4a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 12 7.5Z"
        />
        <!-- error -->
        <path
          v-else-if="icon === 'error'"
          fill="currentColor"
          d="M15.71 8.29a1 1 0 0 0-1.42 0L12 10.59l-2.29-2.3a1 1 0 0 0-1.42 1.42l2.3 2.29l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l2.29-2.3l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42L13.41 12l2.3-2.29a1 1 0 0 0 0-1.42Zm3.36-3.36A10 10 0 1 0 4.93 19.07A10 10 0 1 0 19.07 4.93Zm-1.41 12.73A8 8 0 1 1 20 12a7.95 7.95 0 0 1-2.34 5.66Z"
        />
        <!-- warn -->
        <path
          v-else-if="icon === 'warn'"
          fill="currentColor"
          d="M12 16a1 1 0 1 0 1 1a1 1 0 0 0-1-1Zm10.67 1.47l-8.05-14a3 3 0 0 0-5.24 0l-8 14A3 3 0 0 0 3.94 22h16.12a3 3 0 0 0 2.61-4.53Zm-1.73 2a1 1 0 0 1-.88.51H3.94a1 1 0 0 1-.88-.51a1 1 0 0 1 0-1l8-14a1 1 0 0 1 1.78 0l8.05 14a1 1 0 0 1 .05 1.02ZM12 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1Z"
        />
        <!-- success -->
        <path
          v-else-if="icon === 'success'"
          fill="currentColor"
          d="m14.72 8.79l-4.29 4.3l-1.65-1.65a1 1 0 1 0-1.41 1.41l2.35 2.36a1 1 0 0 0 .71.29a1 1 0 0 0 .7-.29l5-5a1 1 0 0 0 0-1.42a1 1 0 0 0-1.41 0ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
        />
      </svg>
    </div>
    <span>{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.message-item {
  @apply transition-all;
  @apply bg-white text-primary rounded-full px-3 py-1;
  @apply border-1 border-primary-extralight;
  @apply shadow-xl shadow-primary-shadow;
  @apply select-none;
  @apply bg-opacity-90 backdrop-filter backdrop-blur-lg;
  @apply flex space-x-1 items-center;
  @apply my-1;

  .message-icon {
    @apply text-primary inline-block mr-1 leading-0;
  }
}
</style>
