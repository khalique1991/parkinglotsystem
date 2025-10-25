// src/features/sessions/sessions.api.js
import api from '../../api/client';

export const fetchSessions = () => api.get('/sessions');
