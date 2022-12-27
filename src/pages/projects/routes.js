export const routes = [
  {
    path: "/projects",
    name: "projects",
    component: () => import("./ProjectsPage.vue"),
    meta: {
      pageTitle: "实验室",
    },
    children: [],
  },
];
