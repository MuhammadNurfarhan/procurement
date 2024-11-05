<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/modules/authStore';
import { useRouter } from 'vue-router';


const valid = ref<boolean>(false);
const email = ref<string>(localStorage.getItem('email') || '');
const password = ref<string>('');
const error = ref<string | null>(null);

const authStore = useAuthStore();
const router = useRouter();


const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  password: (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value) || 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number.';
  },
};

const submitLogin = async () =>  {
  error.value = null;
  const success = await authStore.login(email.value, password.value);

  if (success !== null || undefined) {
    // Redirect to dashboard
    router.push('/');
  } else {
    // Handle error
    error.value = 'Invalid email or password';
  }
};

</script>

<template>
  <div class="auth-page">
    <v-container class="fill-height">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="auth-page-container">
            <v-card-title class="bg-success mb-5">
              <span class="text-h5">Login</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation @keyup.enter="submitLogin">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  type="email"
                  variant="outlined"
                  class="mb-2"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="[rules.required]"
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                ></v-text-field>

                <v-btn :disabled="!valid" color="primary" @click="submitLogin">
                  Login
                </v-btn>
                <p class="mt-2">
                  Don't have an account? <span class="text-decoration-underline"><router-link to="/register">Register</router-link></span>
                </p>
                <p>Back to home? <span class="text-decoration-underline"><router-link to="/">Home</router-link></span></p>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
@import '@/styles/auth.scss';
</style>
