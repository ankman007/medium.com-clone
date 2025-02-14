import axios from 'axios';
import { urls } from '../constant/api';
import * as tokenService from './token';

const instance = axios.create({
  baseURL: urls.base,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Attach Authorization token to every request
instance.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();  // Get the token from tokenService
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Add the token to the headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Simple HTTP methods
const http = {
  get: (url: string, params = {}) => instance.get(url, { params }).then(res => res.data),
  post: (url: string, body = {}) => instance.post(url, body).then(res => res.data),
  put: (url: string, body = {}) => instance.put(url, body).then(res => res.data),
  delete: (url: string) => instance.delete(url).then(res => res.data),
};

export default http;
