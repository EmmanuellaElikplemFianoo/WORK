import axios from 'axios';

// Replace with your Django backend URL
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

export default api;
