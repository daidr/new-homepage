import * as VueRouter from "vue-router";

const routeModules = import.meta.globEager("../pages/**/routes.js");

const routes = [];

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

export const getRouter = () => {
  return router;
};

export const getRoutes = () => {
  return routes;
};