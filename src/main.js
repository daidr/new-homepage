import { createApp } from "vue";
import App from "./App.vue";

import "virtual:windi.css";
import "virtual:windi-devtools";
// 引入全局样式
import "@/assets/css/global.scss";

createApp(App).mount("#app");
