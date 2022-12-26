<template>
    <div id="projects-page-wrapper">
        <div class="projects-page-container">
            <div class="main-menu-wrapper">
                <div class="menu-item">
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                    <div>2</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#projects-page-wrapper {
    @apply "w-full h-full";
    @apply "rounded-0px";
    @apply "bg-white";
    @apply "fixed top-0 left-0";
    @apply "transform-gpu translate-z-200vh";
    @apply "shadow-2xl shadow-primary/30";
    @apply "overflow-hidden";
    backface-visibility: hidden;

    .projects-page-container {
        @apply "transform-gpu translate-z-0 h-full";
    }

    .menu-item {
        @apply "text-center";
    }
}
</style>