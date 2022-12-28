<script setup>
import { ref } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
})

const loaded = ref(false)

const onLoad = () => {
    loaded.value = true
}
</script>

<template>
    <img :class="{ loaded }" :src="src" :alt="alt" @load="onLoad" />
</template>

<style scoped lang="scss">
img {
    @apply opacity-0;

    &.loaded {
        animation: opacity-transition 0.15s ease-in-out forwards;
    }
}

@keyframes opacity-transition {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>