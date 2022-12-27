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
  history: VueRouter.createWebHistory(),
  routes,
});

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
