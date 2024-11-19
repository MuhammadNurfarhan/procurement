import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { loginAPI, registerAPI } from '@/api/auth/auth';

interface UserData {
  role: string;
  token: string;
  username: string;
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const role = ref<string | null>(localStorage.getItem('role') || null);
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const username = ref<string| null>(localStorage.getItem('username') || null);

  const setUserData = ({ token: newToken, role: newRole, username: newName }: UserData) => {
    role.value = newRole;
    token.value = newToken;
    username.value = newName;

    localStorage.setItem('role', newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newName);
  };

  const clearUserData = () => {
    role.value = null;
    token.value = null;
    username.value = null;

    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const register = (email: string, password: string, username: string) => {
    if (!email || !password || !username) {
      throw new Error('Please fill in all fields');
    }

    registerAPI({email, password, username})
      .then((response) => {
        setUserData(response.data);
        router.push('/supplier-form');
      });
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAPI({
        email,
        password,
      });

      setUserData({
        token: response.data.token,
        role: response.data.role,
        username: response.data.username,
      });
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
    const storedName = localStorage.getItem('username');
    role.value = storedRole || null;
    username.value = storedName || null;
  };

  return {
    role,
    token,
    username,
    register,
    login,
    logout,
    restoreUser,
  };
});
