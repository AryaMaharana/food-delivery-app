import axios from 'axios';

const gatewayBase = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const withAuth = (client) => {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return client;
};

export const serviceApi = (serviceId) =>
  withAuth(axios.create({baseURL: `${gatewayBase}/${serviceId}`}));

export const authApi = serviceApi('auth-service');
export const restaurantApi = serviceApi('restaurant-service');
export const orderApi = serviceApi('order-service');

export const restaurants = () => restaurantApi.get('/restaurants');
export const menu = (id) => restaurantApi.get(`/restaurants/${id}/menu`);
export const login = (data) => authApi.post('/auth/login', data);
export const register = (data) => authApi.post('/auth/register', data);
export const createOrder = (data) => orderApi.post('/orders', data);
export const orders = () => orderApi.get('/orders');
export const modules = () => axios.get(`${gatewayBase}/modules`);
