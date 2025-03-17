// api.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACK_URL || 'http://skill-manager.ru/api';

export const axiosInstance = axios.create({
  baseURL: API_URL
});

// Интерцептор для автоматической подстановки токена
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Здесь можно добавить логику обновления токена или выхода из системы
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Добавьте в api.ts
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/auth/refresh', { refreshToken });
        localStorage.setItem('accessToken', response.data.accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.accessToken;
        processQueue(null, response.data.accessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err);
        localStorage.removeItem('accessToken');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
