import CardMe from "./views/CardMe.vue";
import CardFriends from "./views/CardFriends.vue";

export const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("./IndexPage.vue"),
    children: [
      {
        path: "/me",
        alias: "/",
        name: "me",
        component: CardMe,
        meta: {
          pageTitle: "我",
        },
      },
      {
        path: "/friends",
        name: "friends",
        component: CardFriends,
        meta: {
          pageTitle: "朋友们",
        },
      },
    ],
  },
];
