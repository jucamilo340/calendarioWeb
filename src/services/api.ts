import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND || 'http://localhost:8080',
});

export default api;

