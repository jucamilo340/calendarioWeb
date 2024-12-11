import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:8080',
  baseURL: 'https://calendar2024-aa9c6d121045.herokuapp.com'
});

export default api;

