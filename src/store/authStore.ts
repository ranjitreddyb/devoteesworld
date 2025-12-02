import { create } from 'zustand';
import axios from 'axios';

interface User {
  id?: string;
  _id?: string;
  email: string;
  name: string;
  phoneNumber?: string;
  role?: 'user' | 'admin' | 'ritvik';
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),

  initializeAuth: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('✅ Auth initialized from localStorage:', user);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('❌ Failed to parse user from localStorage');
        localStorage.removeItem('user');
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/login', { 
        email, 
        password 
      });
      
      console.log('✅ Login response:', response.data);
      
      const { access_token, user } = response.data;

      if (!access_token || !user) {
        throw new Error('Invalid login response');
      }

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user,
        token: access_token,
        isAuthenticated: true,
      });
    } catch (error: any) {
      console.error('❌ Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', data);
      
      console.log('✅ Register response:', response.data);
      
      const { access_token, user } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      set({
        user,
        token: access_token,
        isAuthenticated: true,
      });
    } catch (error: any) {
      console.error('❌ Register error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  setUser: (user: User) => {
    set({ user });
  },
}));
