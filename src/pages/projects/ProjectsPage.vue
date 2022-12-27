<script setup>
import { useRouter } from 'vue-router';

const back = useRouter().back;
</script>

<template>
    <div class="transition-page-wrapper">
        <div class="projects-page-container">
            <div class="main-menu-wrapper">
                <div class="menu-item">
                    <div>这是实验室页面（TODO）</div>
                    <div>使用浏览器的后退按钮返回，或者
                        <a class="text-primary font-bold cursor-pointer" @click="back()">点击这里</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.transition-page-wrapper {
    @apply "w-full h-full";
    @apply "rounded-0px";
    @apply "bg-white";
    @apply "fixed top-0 left-0";
    @apply "transform-gpu translate-z-200vh";
    @apply "shadow-2xl shadow-primary/30";
    @apply "overflow-hidden";
    backface-visibility: hidden;

    .projects-page-container {
        @apply "transform-gpu translate-z-0 ";
    }

    .menu-item {
        @apply "text-center";
    }
}
</style>