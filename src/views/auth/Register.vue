<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/modules/authStore';
import { useRouter } from 'vue-router';


const valid = ref<boolean>(false);
const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const error = ref<string | null>(null);

const authStore = useAuthStore();
const router = useRouter();

const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
  min: (v: number) => (value: string) => value.length >= v || `Min ${v} characters`,
};

const submitRegister = async () => {
  error.value = null;
  const response = await authStore.register(email.value, password.value ,name.value);
  if (response !== undefined) {
    router.push('/login');
  } else {
    error.value = 'Failed to register. Please try again.';
  }
};
</script>

<template>
  <div class="auth-page">
    <v-container class="fill-height  ">
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="auth-page-container">
            <v-card-title class="bg-primary mb-5">
              <span class="text-h5">Register</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="name"
                  :rules="[rules.required]"
                  label="Name"
                  variant="outlined"
                  class="mb-2"
                  required
                ></v-text-field>
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
                  :rules="[rules.required, rules.min(8)]"
                  label="Password"
                  type="password"
                  variant="outlined"
                  required
                ></v-text-field>

                <v-btn :disabled="!valid" color="green" @click="submitRegister">
                  Register
                </v-btn>
                <p class="mt-2">
                  Already have an account? <span class="text-decoration-underline"><router-link to="/login">Login</router-link></span>
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
