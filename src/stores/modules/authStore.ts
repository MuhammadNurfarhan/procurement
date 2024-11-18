import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { loginAPI, registerAPI } from '@/api/auth/auth';

interface UserData {
  role: string;
  token: string;
  name: string;
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const role = ref<string | null>(localStorage.getItem('role') || null);
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const name = ref<string| null>(localStorage.getItem('name') || null);

  const setUserData = ({ token: newToken, role: newRole, name: newName }: UserData) => {
    role.value = newRole;
    token.value = newToken;
    name.value = newName;

    localStorage.setItem('role', newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('name', newName);
  };

  const clearUserData = () => {
    role.value = null;
    token.value = null;
    name.value = null;

    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  };

  const register = (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error('Please fill in all fields');
    }

    registerAPI({email, password, name})
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
        name: response.data.name,
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
    const storedName = localStorage.getItem('name');
    role.value = storedRole || null;
    name.value = storedName || null;
  };

  return {
    role,
    token,
    name,
    register,
    login,
    logout,
    restoreUser,
  };
});
