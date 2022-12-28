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

const initTime = Date.now()

const loaded = ref(false)

const noAnimation = ref(false)

const onLoad = () => {
    if (Date.now() - initTime < 10) {
        noAnimation.value = true
    }
    loaded.value = true

}
</script>

<template>
    <img :class="{
    loaded, 'no-animation': noAnimation
}" :src="src" :alt="alt" @load="onLoad" />
</template>

<style scoped lang="scss">
img {
    @apply opacity-0;

    &.loaded:not(.no-animation) {
        animation: opacity-transition 0.15s ease-in-out forwards;
    }

    &.no-animation {
        @apply opacity-100;
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