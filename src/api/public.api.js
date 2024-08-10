import { api } from "./api";
export const loginRequest = async (data) => api.post('/api/login', data);

export const checkin = async (data) => api.post('/api/checkin', data);
export const list = async () => api.get('/api/list');
export const resetDB = async (data) => api.post('/api/reset', data);