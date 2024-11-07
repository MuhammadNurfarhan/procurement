import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { loginAPI, registerAPI } from '@/api/auth/auth';

interface UserData {
  // role: string;
  token: string;
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  // const role = ref<string | null>(localStorage.getItem('role') || null);
  const token = ref<string | null>(localStorage.getItem('token') || null);

  const setUserData = ({ token: newToken }: UserData) => {
    // role.value = newRole;
    token.value = newToken;
    // localStorage.setItem('role', newRole);
    localStorage.setItem('token', newToken);
  };

  const clearUserData = () => {
    // role.value = null;
    token.value = null;
    // localStorage.removeItem('role');
    localStorage.removeItem('token');
  };

  const register = (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('Please fill in all fields');
    }

    registerAPI({email, password, name})
      .then((response) => {
        setUserData(response.data);
        router.push('/login');
      });
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAPI({
        email,
        password,
      });

      setUserData({ token: response.data.token });
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    clearUserData();
    router.push('/login');
  };

  const restoreUser = () => {
    const storedRole = localStorage.getItem('role');
    // role.value = storedRole || null;
  };

  return {
    // role,
    token,
    register,
    login,
    logout,
    restoreUser,
  };
});
