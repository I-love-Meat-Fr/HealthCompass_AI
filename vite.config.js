import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
// import react from "@vitejs/plugin-vue";
// import vue from "@vitejs/plugin-vue";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "node:path";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // vue(),
    // vueJsx()
    react()
  ],
  resolve: {
    alias: {
      // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  base: "/"
});
