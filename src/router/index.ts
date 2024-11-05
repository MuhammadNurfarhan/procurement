import { createRouter, createWebHistory } from 'vue-router';
import constantRoutes from './routes/constantRoutes';
import { useAuthStore } from '@/stores/modules/authStore';


const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.restoreUser()

  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}


export default router;
