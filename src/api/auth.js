import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.put('/auth');
        const newAccessToken = res.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log(refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

const AuthAPI = {
  login: async ({ username, password }) => {
    const response = await api.post('/auth', {
      username,
      password,
    });

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }

    return response.data;
  },

  logout: async () => {
    const response = await api.delete('/auth');
    localStorage.removeItem('accessToken');
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.put('/auth');

    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }

    return response.data;
  },

  getLoggedInUser: async () => {
    const response = await api.get('/auth/logged-in');
    return response.data;
  },

  changePassword: async ({ oldPassword, newPassword, confirmPassword }) => {
    const response = await api.put('/auth/change-password', {
      oldPassword,
      newPassword,
      confirmPassword,
    });
    return response.data;
  },

  createUser: async ({ username, password }) => {
    const response = await api.post('/auth/create-user', {
      username,
      password,
    });
    return response.data;
  },
};

export default AuthAPI;
