<script setup>
import { defineAsyncComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CardMe from './views/CardMe.vue';
const CardFriends = defineAsyncComponent(() => import('./views/CardFriends.vue'))

const route = useRoute()

const AVAILABLE_CONTENT = ['me', 'friends']

const getQueryContent = (query) => {
    if (!query) {
        return 'me'
    }
    const content = query.c
    if (AVAILABLE_CONTENT.includes(content)) {
        return content
    }
    return 'me'
}

const containerEl = ref()
const contentEl = ref()
const currentContent = ref(getQueryContent(route.query))
let isInAnimation = false;
const onNavClick = (nav) => {
    if (contentEl.value.dataset.content === nav) {
        return
    }

    containerEl.value.dataset.type = 'spilt'
    isInAnimation = true

    setTimeout(() => {
        currentContent.value = nav
        contentEl.value.style.transitionDuration = '1000ms'

        setTimeout(() => {
            containerEl.value && (containerEl.value.dataset.type = '')
            contentEl.value && (contentEl.value.style.transitionDuration = '')
            isInAnimation = false
        }, 1010)
    }, 300)
}

// 监听query变化
const onQueryChange = (to, from) => {
    if (isInAnimation) {
        return
    }
    if (!from) {
        return
    }

    const toContent = getQueryContent(to)
    const fromContent = getQueryContent(from)

    if (toContent === fromContent || route.path !== '/') {
        return
    }

    if (AVAILABLE_CONTENT.includes(toContent)) {
        onNavClick(toContent)
    }
}

watch(() => route.query, onQueryChange, { immediate: true })
</script>

<template>
    <div class="transition-page-wrapper">
        <div ref="containerEl" class="index-page-container">
            <div class="main-menu-wrapper">
                <RouterLink :to="{ name: 'index', query: { c: 'me' } }" class="menu-item"
                    :class="{ active: currentContent == 'me' }" @click="onNavClick('me')">
                    <i-icon-park-outline-bear />
                    我
                </RouterLink>
                <RouterLink :to="{ name: 'index', query: { c: 'friends' } }" class="menu-item"
                    :class="{ active: currentContent == 'friends' }" @click="onNavClick('friends')">
                    <i-icon-park-outline-notebook />
                    朋友们
                </RouterLink>
                <RouterLink to="/projects" class="menu-item">
                    <i-icon-park-outline-experiment-one />
                    实验室
                </RouterLink>
            </div>
            <div ref="contentEl" class="content-wrapper" :data-content="currentContent">
                <Transition name="index-page-fade-transition">
                    <div v-if="currentContent == 'me'" class="card-me">
                        <CardMe />
                    </div>
                    <div v-else-if="currentContent == 'friends'" class="card-friends">
                        <CardFriends />
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.transition-page-wrapper {
    @apply "w-[350px] sm:w-[400px] h-[500px]";
    @apply "absolute top-1/2 left-1/2 rounded-4xl";
    @apply "-translate-x-1/2 -translate-y-1/2";


    .index-page-container {
        @apply "transform-gpu translate-z-200vh h-full";
        @apply "shadow-2xl shadow-primary/30";
        @apply "rounded-4xl";
        @apply flex flex-col;

        .main-menu-wrapper {
            @apply "rounded-t-4xl";
            @apply "bg-white";
            @apply "flex justify-center space-x-3";
            @apply "py-6";
            @apply "select-none";
            transition-property: transform, border-radius;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;

            .menu-item {
                @apply relative;
                @apply text-primary/70 font-semibold text-lg;
                @apply cursor-pointer z-0;
                @apply transition-all;
                @apply flex items-center;

                svg {
                    @apply text-0em;
                    @apply mr-0;
                    @apply transition-all;
                }

                &::before {
                    content: "";
                    @apply absolute bottom-0 left-0 right-0 h-3px -z-1;
                    @apply rounded-xl;
                    @apply bg-primary-extralight;
                    @apply transition-all;
                }

                &:hover,
                &.active {
                    @apply px-3;

                    &::before {
                        @apply h-full;
                    }

                    svg {
                        @apply text-0.9em mr-1;
                    }
                }

                &:hover {
                    svg {
                        animation: backshake 0.5s linear;
                    }
                }

                &.active {
                    @apply pointer-events-none;
                }
            }
        }

        .content-wrapper {
            @apply "flex-grow relative";
            @apply "bg-white";
            @apply "rounded-b-4xl transform-gpu translate-z-200vh";
            transition-property: transform, border-radius;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 300ms;
            transform-style: preserve-3d;

            .card-me,
            .card-friends {
                @apply bg-white;
                @apply rounded-4xl;
                @apply absolute top-0 left-0 right-0 bottom-0;
                @apply transform-gpu;
                @apply backface-hidden;
            }

            .card-friends {
                @apply rotate-y-180;
            }

            &[data-content="friends"] {
                @apply rotate-y-180;
            }
        }


    }

    .index-page-container[data-type="spilt"] {
        @apply shadow-none;
        @apply pointer-events-none;

        .main-menu-wrapper {
            @apply rounded-4xl;
            @apply "shadow-2xl shadow-primary/30";
            @apply transform-gpu -translate-y-2;
        }

        .content-wrapper {
            @apply rounded-4xl;
            @apply "shadow-2xl shadow-primary/30";
            @apply translate-y-2;
        }
    }
}
</style>