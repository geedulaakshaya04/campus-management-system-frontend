import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses for auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const getNotices = async () => {
  const response = await api.get('/notices');
  return response.data;
};

export const getStudentDashboard = async () => {
  const response = await api.get('/student/dashboard');
  return response.data;
};

export const getFacultyDashboard = async () => {
  const response = await api.get('/faculty/dashboard');
  return response.data;
};

export const getHodDashboard = async () => {
  const response = await api.get('/hod/dashboard');
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getPlacementDashboard = async () => {
  const response = await api.get('/placement/dashboard');
  return response.data;
};

export const askAiAssistant = async (query) => {
  const response = await api.post('/ai/chat', { query });
  return response.data;
};

export const updateStudentProfile = async (profileData) => {
  const response = await api.put('/student/profile', profileData);
  return response.data;
};

export const deleteStudentProfile = async () => {
  const response = await api.delete('/student/profile');
  return response.data;
};

export default api;
