import axios from 'axios';

const mapProductField = (value, from, to) => {
  if (Array.isArray(value)) {
    return value.map((item) => mapProductField(item, from, to));
  }
  if (!value || typeof value !== 'object' || value instanceof FormData) {
    return value;
  }

  const mapped = Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      key === from ? to : key,
      mapProductField(entry, from, to),
    ]),
  );

  return mapped;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (config.data && typeof config.data === 'object') {
    config.data = mapProductField(config.data, 'category', 'aroma_type');
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => {
  response.data = mapProductField(response.data, 'aroma_type', 'category');
  return response;
});

export default api;
