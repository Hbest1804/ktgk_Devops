import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_URL = 'http://localhost:5000/api';

interface User {
  id: number;
  name: string;
  email: string;
  student_id: string | null;
  class_name: string | null;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, password: string, student_id: string, class_name: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục session từ localStorage khi load app
  useEffect(() => {
    const savedToken = localStorage.getItem('mf_token');
    const savedUser = localStorage.getItem('mf_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('mf_token', data.token);
      localStorage.setItem('mf_user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');
      if (data.user.role === 'admin') localStorage.setItem('isAdmin', 'true');
      else localStorage.removeItem('isAdmin');

      return { success: true, message: data.message };
    } catch {
      return { success: false, message: 'Không kết nối được server' };
    }
  };

  const register = async (name: string, email: string, password: string, student_id: string, class_name: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, student_id, class_name }),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('mf_token', data.token);
      localStorage.setItem('mf_user', JSON.stringify(data.user));
      localStorage.setItem('isLoggedIn', 'true');

      return { success: true, message: data.message };
    } catch {
      return { success: false, message: 'Không kết nối được server' };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mf_token');
    localStorage.removeItem('mf_user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('mf_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      user, token,
      isLoggedIn: !!token,
      isAdmin: user?.role === 'admin',
      loading,
      login, register, logout, updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải dùng bên trong AuthProvider');
  return ctx;
}
