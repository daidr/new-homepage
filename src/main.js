import { createApp } from "vue";
import App from "./App.vue";

import "virtual:windi.css";
import "virtual:windi-devtools";
// 引入全局样式
import "@/assets/css/global.scss";

const root = createApp(App);

// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
root.use(pinia);

// 路由
import { getRouter } from "@/routes/router";
const router = getRouter();
root.use(router);

root.mount("#app");
