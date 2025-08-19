

import axios from 'axios';

// Get the API URL from environment variables, defaulting to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiService = axios.create({
  baseURL: API_URL,
});

// Request Interceptor: Runs before every request is sent
apiService.interceptors.request.use((config) => {
  // Get the token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // If the token exists, add it to the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiService;