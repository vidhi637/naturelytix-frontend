import client from './client';

export const submitDemoRequest = (data) => client.post('/demo-requests', data);
export const getDemoRequests = () => client.get('/admin/demo-requests');
export const updateDemoStatus = (id, status) => client.patch(`/admin/demo-requests/${id}`, { status });
