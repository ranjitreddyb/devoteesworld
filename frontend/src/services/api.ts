import axios, { AxiosInstance, AxiosError } from 'axios';
import { storage } from './storage-service';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    onSuccess: (token: string) => void;
    onFailed: (error: AxiosError) => void;
  }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add token to every request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = storage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle token refresh on 401
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  resolve(this.axiosInstance(originalRequest));
                },
                onFailed: (err: AxiosError) => reject(err),
              });
            });
          }

          this.isRefreshing = true;
          originalRequest._retry = true;

          try {
            const refreshToken = storage.getRefreshToken();
            if (!refreshToken) {
              storage.clearTokens();
              window.location.href = '/login';
              return Promise.reject(error);
            }

            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });

            const { accessToken, newRefreshToken } = response.data;
            storage.setTokens(accessToken, newRefreshToken);

            // Retry failed requests
            this.failedQueue.forEach(({ onSuccess }) => onSuccess(accessToken));
            this.failedQueue = [];

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.failedQueue = [];
            storage.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic HTTP methods
  async get(url: string, config?: any) {
    return this.axiosInstance.get(url, config);
  }

  async post(url: string, data?: any, config?: any) {
    return this.axiosInstance.post(url, data, config);
  }

  async put(url: string, data?: any, config?: any) {
    return this.axiosInstance.put(url, data, config);
  }

  async delete(url: string, config?: any) {
    return this.axiosInstance.delete(url, config);
  }

  async patch(url: string, data?: any, config?: any) {
    return this.axiosInstance.patch(url, data, config);
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.axiosInstance.post('/auth/login', { email, password });
  }

  async register(userData: any) {
    return this.axiosInstance.post('/auth/register', userData);
  }

  async logout() {
    return this.axiosInstance.post('/auth/logout');
  }

  // User endpoints
  async getProfile() {
    return this.axiosInstance.get('/users/profile');
  }

  async updateProfile(userData: any) {
    return this.axiosInstance.put('/users/profile', userData);
  }

  // Events endpoints
  async getEvents(params?: any) {
    return this.axiosInstance.get('/events', { params });
  }

  async getEventById(id: string) {
    return this.axiosInstance.get(`/events/${id}`);
  }

  async createEvent(eventData: any) {
    return this.axiosInstance.post('/events', eventData);
  }

  async updateEvent(id: string, eventData: any) {
    return this.axiosInstance.put(`/events/${id}`, eventData);
  }

  async deleteEvent(id: string) {
    return this.axiosInstance.delete(`/events/${id}`);
  }

  // Bookings endpoints
  async getBookings(params?: any) {
    return this.axiosInstance.get('/bookings', { params });
  }

  async createBooking(bookingData: any) {
    return this.axiosInstance.post('/bookings', bookingData);
  }

  async getBookingById(id: string) {
    return this.axiosInstance.get(`/bookings/${id}`);
  }

  async updateBooking(id: string, bookingData: any) {
    return this.axiosInstance.put(`/bookings/${id}`, bookingData);
  }

  async cancelBooking(id: string) {
    return this.axiosInstance.delete(`/bookings/${id}`);
  }

  // Admin endpoints
  async getAdminAnalytics() {
    return this.axiosInstance.get('/admin/analytics');
  }

  async getAdminEvents() {
    return this.axiosInstance.get('/admin/events');
  }

  async getAdminBookings() {
    return this.axiosInstance.get('/admin/bookings');
  }

  // Payment endpoints
  async initiatePayment(paymentData: any) {
    return this.axiosInstance.post('/payments/initiate', paymentData);
  }

  async verifyPayment(paymentData: any) {
    return this.axiosInstance.post('/payments/verify', paymentData);
  }
}

// Export singleton instance
export default new ApiService();