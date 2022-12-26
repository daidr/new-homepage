export const routes = [
  {
    path: "/projects",
    component: () => import("./ProjectsPage.vue"),
    meta: {
      pageTitle: "项目",
      calcContainer: "#projects-page-wrapper",
    },
    children: [],
  },
];
