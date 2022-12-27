<script setup>
import NotFoundImage from '@/components/NotFoundImage.vue';
import { useRouter } from 'vue-router';

const back = useRouter().back;
</script>

<template>
    <div class="notfound-page-wrapper">
        <div class="decoration-wrapper transition-extra-wrapper">
            <NotFoundImage />
        </div>
        <div class="transition-page-wrapper">
            <div class="page-container">
                <div class="title">404</div>
                <div class="content">
                    <div class="text">页面走丢了，不过好在你可以：</div>
                    <div class="btn-group">
                        <RouterLink to="/" class="link-btn">去首页</RouterLink>
                        <a class="link-btn" @click="back()">返回上一页</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.notfound-page-wrapper {
    @apply "w-350px sm:w-400px md:w-760px lg:w-900px h-500px";
    @apply "absolute top-1/2 left-1/2 rounded-4xl";
    @apply "transform-gpu -translate-x-1/2 -translate-y-1/2";
    @apply flex justify-between;

    .transition-page-wrapper {
        @apply "bg-white w-full md:w-400px h-full";
        @apply "shadow-2xl shadow-primary/30";
        @apply "rounded-4xl";
        @apply "overflow-hidden";

        .page-container {
            @apply w-full h-full flex flex-col items-center justify-center select-none;

            .title {
                @apply "text-7xl font-extrabold text-primary/70";
            }

            .content {
                @apply mt-40 text-lg text-primary font-medium;
            }

            .btn-group {
                @apply mt-5 flex space-x-4 justify-center;

                .link-btn {
                    @apply text-base whitespace-nowrap;
                    @apply text-primary-extralight bg-primary-medium;
                    @apply rounded-full relative;
                    @apply cursor-pointer;
                    @apply px-3 py-1.5;

                    &::before {
                        content: "";
                        @apply absolute -top-6px -left-6px -right-6px -bottom-6px -z-1;
                        @apply rounded-full;
                        @apply border-4px border-primary-extralight;
                        @apply transition;
                        @apply transform-gpu scale-50 opacity-0;
                        @apply pointer-events-none;
                    }

                    &:hover::before,
                    &:active::before {
                        @apply scale-100 opacity-100;
                    }
                }
            }
        }
    }

    .decoration-wrapper {
        @apply "w-0 md:w-auto flex-grow";
        @apply "md:pr-15 lg:pr-25";
        @apply flex items-center;

        svg {
            @apply opacity-70 w-full;
        }

    }
}
</style>