import client from './client';

export const getStats = () => client.get('/admin/stats');
export const getLeads = () => client.get('/admin/leads');
export const getLead = (id) => client.get(`/admin/leads/${id}`);
export const updateLeadStatus = (id, status) => client.patch(`/admin/leads/${id}/status`, { status });
export const deleteLead = (id) => client.delete(`/admin/leads/${id}`);
export const createAdminUser = (data) => client.post('/admin/users', data);
