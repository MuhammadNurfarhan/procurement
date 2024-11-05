<script lang="ts" setup>
import { useAuthStore } from '@/stores/modules/authStore';

const authStore = useAuthStore();
const isLoggedIn = authStore.login;

const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-app-bar app color="primary">
    <v-toolbar-title>E-Procurement PT. Yih Quan</v-toolbar-title>
    <v-spacer />
    <v-btn to="/">Home</v-btn>
    <v-btn to="/register">Register</v-btn>
    <v-btn v-if="!isLoggedIn" to="/login">Login</v-btn>
    <v-btn v-if="isLoggedIn" @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<style scoped>

</style>

<script lang="ts">
export default {};
</script>
