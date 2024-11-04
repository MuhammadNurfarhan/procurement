import { defineStore } from "pinia";

export const useWebsiteStore = defineStore("website", {
  state: () => ({
    sidebarDrawer: true,
    miniSidebar: false,
  }),

  getters: {},

  actions: {
    setSidebarDrawer() {
      this.sidebarDrawer = !this.sidebarDrawer;
    },
    setMiniSidebar(payload: boolean) {
      this.miniSidebar = payload;
    },
  },
});
