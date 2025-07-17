import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      username,
      password,
    });
    console.log(process.env.NEXT_PUBLIC_API_URL);
    localStorage.setItem('token', response.data.access_token);
    setIsAuthenticated(true);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
    throw new Error('Unexpected error');
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, loading, login, logout };
}