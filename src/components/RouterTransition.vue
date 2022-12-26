<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const enableTransition = ref(true);

const router = useRouter();
const LoadingEl = ref();
const SlotEl = ref();

let TIMER = 0;
let startLoadingTime = 0;
let _toWrapperStyle = {};
let _fromWrapperStyle = {};
router.beforeEach((to, from, next) => {
    startLoadingTime = Date.now();
    enableTransition.value = true;
    clearTimeout(TIMER);
    TIMER = setTimeout(() => {
        enableTransition.value = false;
        writeBound(LoadingEl.value, _toWrapperStyle);
        if (SlotEl.value && SlotEl.value.nodeName != '#comment') {
            writeBound(SlotEl.value, _fromWrapperStyle);
            _fromWrapperStyle.set = true;
            toAnimation(SlotEl.value, _toWrapperStyle, _fromWrapperStyle);
        }
        fromAnimation(LoadingEl.value, _fromWrapperStyle, _toWrapperStyle);
    }, 200);
    next();
});

router.afterEach((to, from) => {
    clearTimeout(TIMER);
    // if (to.path === from.path) {
    //     return;
    // }
    if (!enableTransition.value) {
        const delta = Date.now() - startLoadingTime;
        setTimeout(() => {
            writeBound(LoadingEl.value, _fromWrapperStyle);
            writeBound(SlotEl.value, _toWrapperStyle);
            _fromWrapperStyle.set = true;
            toAnimation(LoadingEl.value, _toWrapperStyle, _fromWrapperStyle, true);
            fromAnimation(SlotEl.value, _fromWrapperStyle, _toWrapperStyle, true);
        }, Math.max(1300 - delta, 0));
    }
});

const fromAnimation = (el, fromBound, selfBound, clear) => {
    if (!fromBound.set) {
        el.style.opacity = "1";
        return;
    }
    el.style.transitionDuration = '0s'

    const d = calcDelta(fromBound, selfBound, selfBound.t);
    el.style.setProperty("--tw-rotate-x", "-180deg");
    el.style.setProperty("--tw-rotate-z", "-180deg");
    el.style.setProperty("--tw-translate-x", `${d.deltaX}px`);
    el.style.setProperty("--tw-translate-y", `${d.deltaY}px`);
    el.style.setProperty("--tw-scale-x", `${d.scaleX}`);
    el.style.setProperty("--tw-scale-y", `${d.scaleY}`);
    el.style.opacity = "0";
    const scale = (d.scaleX + d.scaleY) / 2;
    el.style.borderRadius = fromBound.br / scale + "px";
    el.style.willChange = "transform, border-radius, opacity";

    forceReflow();

    el.classList.add('transition-router');
    el.style.transitionDuration = '1300ms';

    // 重置全部属性
    el.style.borderRadius = "";
    el.style.opacity = "1";
    el.style.setProperty("--tw-rotate-x", "");
    el.style.setProperty("--tw-rotate-z", "");
    el.style.setProperty("--tw-translate-x", "");
    el.style.setProperty("--tw-translate-y", "");
    el.style.setProperty("--tw-scale-x", "");
    el.style.setProperty("--tw-scale-y", "");

    if (clear) {
        // 监听动画结束
        const _tmp = el.addEventListener('transitionend', () => {
            // 重置 style
            el.style.opacity = "";
            SlotEl.value.classList.remove('transition-router');
            SlotEl.value.style.transitionDuration = "";
            SlotEl.value.style.willChange = "";
            // 移除监听
            el.removeEventListener('transitionend', _tmp);
        }, { once: true });
    }

}

const toAnimation = (el, toBound, selfBound, clear) => {
    el.style.opacity = 1;
    el.classList.add('transition-router');
    el.style.transitionDuration = '1300ms';
    el.style.willChange = "transform, border-radius, opacity";
    const d = calcDelta(toBound, selfBound, selfBound.t);
    el.style.setProperty("--tw-rotate-x", "180deg");
    el.style.setProperty("--tw-rotate-z", "-180deg");
    el.style.setProperty("--tw-translate-x", `${d.deltaX}px`);
    el.style.setProperty("--tw-translate-y", `${d.deltaY}px`);
    el.style.setProperty("--tw-scale-x", `${d.scaleX}`);
    el.style.setProperty("--tw-scale-y", `${d.scaleY}`);
    const scale = (d.scaleX + d.scaleY) / 2;
    el.style.borderRadius = toBound.br / scale + "px";
    el.style.opacity = 0;
    if (clear) {
        // 监听动画结束
        const _tmp = el.addEventListener('transitionend', () => {
            // 重置 style
            el.classList.remove('transition-router');
            el.style.transitionDuration = "";
            el.style.willChange = "";
            el.style.borderRadius = "";
            el.style.opacity = "";
            el.style.setProperty("--tw-rotate-x", "");
            el.style.setProperty("--tw-rotate-z", "");
            el.style.setProperty("--tw-translate-x", "");
            el.style.setProperty("--tw-translate-y", "");
            el.style.setProperty("--tw-scale-x", "");
            el.style.setProperty("--tw-scale-y", "");
            // 移除监听
            el.removeEventListener('transitionend', _tmp);
        }, { once: true });
    }
}

const calcDelta = (prevBound, nextBound, nextMatrix3dStr) => {
    const matrix3d = nextMatrix3dStr.replace(/matrix3d\(|\)/g, "").split(",").map((v) => parseFloat(v));
    // 转换为 translate
    const nextTranslateX = matrix3d[12];
    const nextTranslateY = matrix3d[13];

    // 计算 scale
    const scaleX = prevBound.w / nextBound.w;
    const scaleY = prevBound.h / nextBound.h;

    // 计算 delta
    let deltaX = prevBound.x - nextBound.x + nextTranslateX;
    let deltaY = prevBound.y - nextBound.y + nextTranslateY;

    // 因为进行了 scale，所以需要根据 scale 修正 delta
    deltaX -= (1 - scaleX) * nextBound.w / 2;
    deltaY -= (1 - scaleY) * nextBound.h / 2;

    return {
        deltaX,
        deltaY,
        scaleX,
        scaleY,
    };
}

const writeBound = (el, boundObj) => {
    const elRect = el.getBoundingClientRect();
    boundObj.x = elRect.x;
    boundObj.y = elRect.y;
    boundObj.w = elRect.width;
    boundObj.h = elRect.height;
    const _style = getComputedStyle(el);
    boundObj.br = parseFloat(_style.borderRadius.replace("px", ""));
    boundObj.t = _style.transform;
}

const forceReflow = () => {
    return document.body.offsetHeight;
}

const fromWrapperStyle = reactive({
    set: false,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    br: 0,
    t: ""
});

const toWrapperStyle = reactive({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    br: 0,
    t: "",
});

const onBeforeEnter = (el) => {
    // 克隆
    const toWrapper = el.cloneNode(true);
    toWrapper.style.transitionDuration = '0s'
    // 设置 opacity 为 0
    toWrapper.style.opacity = 0;
    // 插入到 body
    document.body.appendChild(toWrapper);

    writeBound(toWrapper, toWrapperStyle);
    // 移除
    toWrapper.remove();
}

const onEnter = (el, done) => {
    if (!fromWrapperStyle.set) {
        done();
        return;
    }

    if (!enableTransition.value) {
        done();
        return;
    }

    el.style.transitionDuration = '0s'

    const d = calcDelta(fromWrapperStyle, toWrapperStyle, toWrapperStyle.t);
    el.style.setProperty("--tw-rotate-x", "-180deg");
    el.style.setProperty("--tw-rotate-z", "-180deg");
    el.style.setProperty("--tw-translate-x", `${d.deltaX}px`);
    el.style.setProperty("--tw-translate-y", `${d.deltaY}px`);
    el.style.setProperty("--tw-scale-x", `${d.scaleX}`);
    el.style.setProperty("--tw-scale-y", `${d.scaleY}`);
    el.style.opacity = "0";
    const scale = (d.scaleX + d.scaleY) / 2;
    el.style.borderRadius = fromWrapperStyle.br / scale + "px";
    el.style.willChange = "transform, border-radius, opacity";

    forceReflow();

    setTimeout(() => {
        el.classList.add('transition-router');
        el.style.transitionDuration = '1300ms';

        // 重置全部属性
        el.style.borderRadius = "";
        el.style.opacity = "";
        el.style.setProperty("--tw-rotate-x", "");
        el.style.setProperty("--tw-rotate-z", "");
        el.style.setProperty("--tw-translate-x", "");
        el.style.setProperty("--tw-translate-y", "");
        el.style.setProperty("--tw-scale-x", "");
        el.style.setProperty("--tw-scale-y", "");
    }, 10)

    setTimeout(() => {
        done();
    }, 1310);

}

const onAfterEnter = (el) => {
    el.classList.remove('transition-router');
    el.style.transitionDuration = "";
    el.style.willChange = "";
    if (!enableTransition.value) {
        el.style.opacity = "0";
    }
}

const onBeforeLeave = (el) => {
    // 克隆
    const fromWrapper = el.cloneNode(true);
    fromWrapper.style.transitionDuration = '0s'
    // 插入到 body
    document.body.appendChild(fromWrapper);

    writeBound(fromWrapper, fromWrapperStyle);
    fromWrapperStyle.set = true;
    // 移除
    fromWrapper.remove();
}

const onLeave = (el, done) => {
    if (!enableTransition.value) {
        done();
        return;
    }

    el.classList.add('transition-router');
    el.style.transitionDuration = '1300ms';
    el.style.willChange = "transform, border-radius, opacity";
    setTimeout(() => {
        const d = calcDelta(toWrapperStyle, fromWrapperStyle, fromWrapperStyle.t);
        el.style.setProperty("--tw-rotate-x", "180deg");
        el.style.setProperty("--tw-rotate-z", "-180deg");
        el.style.setProperty("--tw-translate-x", `${d.deltaX}px`);
        el.style.setProperty("--tw-translate-y", `${d.deltaY}px`);
        el.style.setProperty("--tw-scale-x", `${d.scaleX}`);
        el.style.setProperty("--tw-scale-y", `${d.scaleY}`);
        const scale = (d.scaleX + d.scaleY) / 2;
        el.style.borderRadius = toWrapperStyle.br / scale + "px";
        el.style.opacity = "0";
    }, 10)

    setTimeout(() => {
        done();
    }, 1310);
}

const onAfterLeave = (el) => {
    // TODO: 不实现也没啥问题，因为动画结束后元素已经被移除了
}
</script>

<template>
    <Transition ref="SlotEl" @before-enter="onBeforeEnter" @enter="onEnter" @before-leave="onBeforeLeave"
        @leave="onLeave" @after-enter="onAfterEnter" @after-leave="onAfterLeave" :css="false">
        <slot />
    </Transition>
    <div ref="LoadingEl" class="loading">

    </div>
</template>

<style scoped lang="scss">
.loading {
    @apply "w-100px h-100px rounded-100px";
    @apply "bg-white";
    @apply "fixed top-1/2 left-1/2";
    @apply "transform-gpu -translate-x-1/2 -translate-y-1/2 translate-z-1000px";
    @apply "shadow-2xl shadow-primary/30";
    @apply "opacity-0";
    @apply "pointer-events-none";
    backface-visibility: hidden;
}
</style>