<script lang="ts" setup>
import { useAuthStore } from '@/stores/modules/authStore';
import Logo from "@/assets/images/pages/yihquan-logo.png";

const authStore = useAuthStore();
// const isLoggedIn = authStore.login;
const isLoggedIn = computed(() => !!authStore.token);

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-app-bar app>
    <v-container class="d-flex align-center justify-space-between">
      <img :src="Logo" alt="Yih Quan" />
      <div class="nav">
        <v-btn to="/">Home</v-btn>
        <v-btn to="/register">Register</v-btn>
        <v-btn v-if="!isLoggedIn" to="/login" variant="outlined">Login</v-btn>
        <v-btn v-else @click="logout">Logout</v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: flex-end;
}
</style>

<script lang="ts">
export default {};
</script>
