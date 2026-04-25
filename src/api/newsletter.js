import client from './client';

export const subscribe = (email) => client.post('/newsletter/subscribe', { email });
export const unsubscribe = (email) => client.delete('/newsletter/unsubscribe', { data: { email } });
export const getSubscribers = () => client.get('/admin/newsletter/subscribers');
