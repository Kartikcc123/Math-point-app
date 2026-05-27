import axios from 'axios';

// Ensure the base URL always targets the backend API root.
const normalizeApiBaseURL = (url) => {
  const cleanedUrl = String(url || '').trim().replace(/\/+$/, '');
  if (!cleanedUrl) return '';
  return cleanedUrl.endsWith('/api') ? cleanedUrl : `${cleanedUrl}/api`;
};

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return normalizeApiBaseURL(envUrl);

  // In production builds, use the absolute Render URL.
  // In dev, use a relative path so Vite's proxy handles CORS.
  if (import.meta.env.PROD) {
    return normalizeApiBaseURL('https://mathspoint-yqnv.onrender.com');
  }
  return '/api';
};

export const API_BASE_URL = import.meta.env.PROD
  ? getBaseURL()
  : (import.meta.env.VITE_API_BASE_URL ? normalizeApiBaseURL(import.meta.env.VITE_API_BASE_URL) : 'https://mathspoint-yqnv.onrender.com/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 120000, // Render free instances can need a long cold start.
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add the JWT token and session token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach session token for device validation
    const sessionToken = localStorage.getItem('mp_session_token');
    if (sessionToken) {
      config.headers['X-Session-Token'] = sessionToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
