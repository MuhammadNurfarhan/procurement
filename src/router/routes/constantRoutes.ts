import * as VueRouter from "vue-router";

const constantRoutes: VueRouter.RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: "/supplier-form",
    name: "SupplierForm",
    component: () => import("@/views/supplier/SuppllierForm.vue"),
    meta: {
      public: true,
    },
  },
  {
    path: '/procurement/:id',
    name: 'ProcurementDetail',
    component: () => import("@/views/procurement/ProcurementDetail.vue"),
    props: true,  // Kirimkan id sebagai prop
    meta: {
      public: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404.vue"),
    meta: {
      public: true,
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },

]

export default constantRoutes;
