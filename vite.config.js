import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import WindiCSS from "vite-plugin-windicss";
import { visualizer } from "rollup-plugin-visualizer";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [IconsResolver()],
    }),
    Icons({
      autoInstall: true,
    }),
    WindiCSS(),
    {
      ...visualizer(),
      apply: "build",
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
