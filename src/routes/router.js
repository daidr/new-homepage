import * as VueRouter from "vue-router";
import { usePageAttrStore } from "@/stores/pageAttrStore";

const routeModules = import.meta.globEager("../pages/**/routes.js");

const routes = [];

let pageAttrStore;

for (const element in routeModules) {
  let routeModule = routeModules[element];
  if (routeModule["routes"]) {
    routes.push(...routeModule["routes"]);
  }
}

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const togglePageLoadingState = (() => {
  let TIMER = null;
  return (state, from, to) => {
    if (state == 1) {
      TIMER = setTimeout(() => {
        // 一百毫秒后，如果页面还没有加载完毕，就显示加载动画
        // 此时前页面缩小成加载动画的大小
        pageAttrStore.setPageHasLoadingState(true);
        pageAttrStore.setPageLoadingState(true);
      }, 100);
    } else if (state == 0) {
      // 清除页面加载计时器
      clearTimeout(TIMER);
      if (pageAttrStore.pageHasLoadingState.value) {
        // 有加载动画
        pageAttrStore.setPageLoadingState(false);
      } else {
        pageAttrStore.setPageHasLoadingState(false);
      }
    }
  };
})();

router.beforeEach((to, from, next) => {
  // togglePageLoadingState(1, from, to);
  next();
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    window.document.title = `${to.meta.pageTitle} | 戴兜的小屋` || "戴兜的小屋";
  }
  // togglePageLoadingState(0, from, to);
});

export const getRouter = () => {
  pageAttrStore = usePageAttrStore();
  return router;
};
