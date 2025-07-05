import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://localhost:3000', // Default to local backend
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;
