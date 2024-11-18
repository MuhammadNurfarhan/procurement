import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { loginAPI, registerAPI } from '@/api/auth/auth';

interface UserData {
  role: string;
  token: string;
  user: string;
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const role = ref<string | null>(localStorage.getItem('role') || null);
  const token = ref<string | null>(localStorage.getItem('token') || null);
  const user = ref<string| null>(localStorage.getItem('user') || null);

  const setUserData = ({ token: newToken, role: newRole, user: newUser }: UserData) => {
    role.value = newRole;
    token.value = newToken;
    user.value = newUser;

    localStorage.setItem('role', newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', newUser);
  };

  const clearUserData = () => {
    role.value = null;
    token.value = null;
    user.value = null;

    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

      setUserData({
        token: response.data.tok,
        role: response.data.role,
        user: response.data.name,
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
    const storedUser = localStorage.getItem('user');
    role.value = storedRole || null;
    user.value = storedUser || null;
  };

  return {
    role,
    token,
    user,
    register,
    login,
    logout,
    restoreUser,
  };
});
