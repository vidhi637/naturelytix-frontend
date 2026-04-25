import client from './client';

export const login = (email, password) =>
  client.post('/auth/login', { email, password });

export const register = (fullName, email, password, passwordConfirmation) =>
  client.post('/auth/signup', { fullName, email, password, passwordConfirmation });

export const logout = () =>
  client.post('/auth/logout');

export const getProfile = () =>
  client.get('/auth/me');
