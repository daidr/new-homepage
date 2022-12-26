export const routes = [
  {
    path: "/",
    component: () => import("./IndexPage.vue"),
    meta: {
      pageTitle: "首页",
      calcContainer: "#index-page-wrapper",
    },
    children: [],
  },
];
