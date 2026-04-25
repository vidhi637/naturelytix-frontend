import client from './client';

export const submitContact = (data) => client.post('/contacts', data);
export const getContacts = () => client.get('/admin/contacts');
