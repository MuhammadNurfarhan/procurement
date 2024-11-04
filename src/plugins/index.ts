/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */
import type { App } from "vue";

import pinia from "@/stores";
import router from "@/router";
import vuetify from "./vuetify";
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import { ElLoading } from "element-plus";
export function registerPlugins(app: App) {
  app.use(pinia);
  app.use(router);
  app.use(vuetify);
  app.use(ElLoading);
  app.use(PerfectScrollbarPlugin);
}
