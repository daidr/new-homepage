<script setup>
import LazyImage from '@/components/LazyImage.vue';
import SocialMediaNav from './SocialMediaNav.vue';

</script>

<template>
    <div class="wrapper">
        <div class="avatar">
            <LazyImage src="/images/avatar.png" alt="AVATAR" />
            <svg view-box="0 0 172 172" width="172px" height="172px">
                <circle cx='86' cy='86' r='80' stroke-width='12' class="stroke-primary-light" fill="none"
                    stroke-linecap='round' stroke-dasharray="390, 502" transform='rotate(-38 86 86)'></circle>
            </svg>
        </div>
        <div class="name">
            戴兜 <span>@DaiDR</span>
        </div>
        <div class="motto">
            Coding the world.
        </div>
        <SocialMediaNav class="socialmedia-wrapper" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    @apply flex flex-col items-center;
    @apply pt-8;

    .avatar {
        @apply select-none;
        @apply "w-40 h-40";
        @apply "rounded-full";
        @apply relative;

        img {
            @apply "w-full h-full";
            @apply "rounded-full";
            @apply "object-cover";
        }

        svg {
            @apply absolute top-0 left-0;
            @apply transform-gpu -translate-x-6px -translate-y-6px;
        }
    }

    .name {
        @apply text-2xl;
        @apply mt-11;
        @apply text-primary/80 font-bold;

        span {
            @apply text-lg font-normal text-primary/50;
        }
    }

    .motto {
        @apply mt-3;
        @apply font-normal text-primary/50;
    }

    .socialmedia-wrapper {
        @apply mt-13;
    }
}
</style>