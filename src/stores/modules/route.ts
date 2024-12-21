import * as VueRouter from "vue-router";
import { defineStore } from "pinia";
import { filterAsyncRoutes } from "@/utils/routes";

export const useRouteStore = defineStore("route", {
  state: () => ({
    routes: [] as VueRouter.RouteRecordRaw[], // tambahkan tipe data VueRouter.RouteRecordRaw[]
  }),

  getters: {},

  actions: {
    async setRoutes(routes: VueRouter.RouteRecordRaw[], permissions: string[]) {
      const finallyAsyncRoutes = await filterAsyncRoutes(
        [...routes],
        permissions
      );
      this.routes = finallyAsyncRoutes;

      return finallyAsyncRoutes;
    },
  },
});
