import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

const client = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('nlx_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const isLoginRequest = err.config?.url?.includes('/auth/login');
    if (err.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('nlx_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default client;
