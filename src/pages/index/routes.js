export const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("./IndexPage.vue"),
    meta: {
      pageTitle: "我",
    },
    children: [],
  },
];
