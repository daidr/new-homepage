import * as VueRouter from "vue-router";
import { usePageAttrStore } from "@/stores/pageAttrStore";
import { CONFIG } from "@/config/base";

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

router.beforeEach((to, from, next) => {
  // togglePageLoadingState(1, from, to);
  next();
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    if (to.meta.pageTitle) {
      window.document.title = `${to.meta.pageTitle} | ${CONFIG.siteName}`;
    } else {
      window.document.title = CONFIG.siteName;
    }
  }
  // togglePageLoadingState(0, from, to);
});

export const getRouter = () => {
  pageAttrStore = usePageAttrStore();
  return router;
};
