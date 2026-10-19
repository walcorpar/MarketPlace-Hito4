import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(Boolean(localStorage.getItem('token')));
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    let active = true;

    if (!token) {
      setAuthLoading(false);
      setAuthError('');
      return () => { active = false; };
    }

    setAuthLoading(true);
    api.get('/users/me')
      .then(({ data }) => {
        if (active) setUser(data);
      })
      .catch((error) => {
        if (!active) return;
        setAuthError(error.response?.data?.message || 'No se pudo cargar tu perfil.');
        if ([401, 403].includes(error.response?.status)) {
          setTokenState(null);
        }
      })
      .finally(() => {
        if (active) setAuthLoading(false);
      });

    return () => { active = false; };
  }, [token]);

  const login = useCallback(async (credentials) => {
    const { data } = await api.post('/login', credentials);
    setTokenState(data.token);
    setUser(data.user);
    setAuthError('');
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setTokenState(null);
    setUser(null);
    setAuthError('');
  }, []);

  return (
    <UserContext.Provider value={useMemo(() => ({
      token,
      setToken: setTokenState,
      user,
      setUser,
      authLoading,
      authError,
      login,
      logout,
    }), [token, user, authLoading, authError, login, logout])}>
      {children}
    </UserContext.Provider>
  );
};
