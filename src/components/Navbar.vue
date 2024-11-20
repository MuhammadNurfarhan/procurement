<script lang="ts" setup>
import { useAuthStore } from '@/stores/modules/authStore';
import Logo from "@/assets/images/pages/yihquan-logo.png";

const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.token);
const userName = computed(() => authStore.username); // Ambil nama pengguna dari store

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-container class="d-flex align-center justify-space-between">
    <img :src="Logo" alt="Yih Quan" />
    <div class="nav">
      <v-btn to="/" variant="plain">Home</v-btn>
      <v-btn v-if="!isLoggedIn" to="/register">Register</v-btn>
      <v-btn v-if="!isLoggedIn" to="/login" variant="outlined">Login</v-btn>
      <template v-else>
        <!-- Informasi Pengguna -->
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" variant="outlined" class="rounded-xl">
              {{ userName }} <!-- Tampilkan nama pengguna -->
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>
                Logout
                <v-icon start class="ml-2">mdi-logout</v-icon>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </div>
  </v-container>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
