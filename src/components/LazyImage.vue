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

const loading = ref(true)

const onLoad = () => {
    loading.value = false
}

const onTransEnd = (e) => {
    e.stopPropagation()
}
</script>

<template>
    <img :class="{ loading }" :src="src" :alt="alt" @load="onLoad" @transitionend="onTransEnd" />
</template>

<style scoped lang="scss">
img {
    @apply transition-opacity opacity-100 duration-300;

    &.loading {
        @apply opacity-0;
    }
}
</style>