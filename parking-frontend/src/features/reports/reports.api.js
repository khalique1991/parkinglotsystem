import api from '../../api/client';

export const fetchUsageReport = (params) => api.get('/report/usage', { params });
export const fetchRevenueReport = (params) => api.get('/report/revenue', { params });
