<script setup>
</script>

<template>
    <div id="index-page-wrapper">
        <div class="index-page-container">
            <div class="main-menu-wrapper">
                <div class="menu-item">
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#index-page-wrapper {
    @apply "w-[350px] sm:w-[400px] h-[500px]";
    @apply "rounded-4xl";
    @apply "bg-white";
    @apply "fixed top-1/2 left-1/2";
    @apply "transform-gpu -translate-x-1/2 -translate-y-1/2 translate-z-1000px";
    @apply "shadow-2xl shadow-primary/30";
    @apply "overflow-hidden";
    backface-visibility: hidden;

    .index-page-container {
        @apply "transform-gpu translate-z-0 h-full";
    }

    .menu-item {
        @apply "text-center";
    }
}
</style>