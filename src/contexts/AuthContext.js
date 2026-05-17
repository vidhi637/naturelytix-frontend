import React, { createContext, useContext, useState, useCallback } from 'react';
import * as authApi from '../api/auth';
import { saveSession, clearSession, getToken, getStoredUser } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getToken);

  const login = useCallback(async (email, password) => {
    const { data } = await authApi.login(email, password);
    const tokenValue = typeof data.token === 'string' ? data.token : data.token?.token || data.token?.value;
    saveSession(tokenValue, data.user);
    setToken(tokenValue);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (fullName, email, password, passwordConfirmation) => {
    const { data } = await authApi.register(fullName, email, password, passwordConfirmation);
    const tokenValue = typeof data.token === 'string' ? data.token : data.token?.token || data.token?.value;
    saveSession(tokenValue, data.user);
    setToken(tokenValue);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // token may already be invalid
    }
    clearSession();
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
