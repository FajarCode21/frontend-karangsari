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

const NewsAPI = {
  getAllNews: async () => {
    const response = await api.get('/news');
    return response.data;
  },

  getNewsById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },

  createNews: async ({ title, body, img }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (img) formData.append('img', img);

    const response = await api.post('/news', formData);
    return response.data;
  },

  updateNews: async ({ id, title, body, img }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (img) formData.append('img', img);

    const response = await api.put(`/news/${id}`, formData);
    return response.data;
  },

  deleteNews: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
};

export default NewsAPI;
