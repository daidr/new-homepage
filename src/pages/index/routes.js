export const routes = [
  {
    path: "/",
    component: () => import("./IndexPage.vue"),
    meta: {
      pageTitle: "首页",
    },
    children: [],
  },
];
