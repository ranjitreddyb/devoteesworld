import api from './api';

export const eventsService = {
  getAll: (filters?: { status?: string; region?: string }) =>
    api.get('/events', { params: filters }),

  getById: (id: string) => api.get(`/events/${id}`),

  getDailySignificance: () => api.get('/events/daily'),

  create: (data: any) => api.post('/events', data),

  update: (id: string, data: any) => api.put(`/events/${id}`, data),

  delete: (id: string) => api.delete(`/events/${id}`),
};