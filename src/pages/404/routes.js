export const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("./NotFoundPage.vue"),
    meta: {
      pageTitle: "404",
    },
    children: [],
  },
];
