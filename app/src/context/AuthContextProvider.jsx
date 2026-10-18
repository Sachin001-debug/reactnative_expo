
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import apiClient from '../api/client';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async ({ name, email, password }) => {
    setLoading(true);

    try {
      const response = await apiClient.post('/users/register', {
        name,
        email,
        password,
      });

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);

    try {
      const response = await apiClient.post('/users/login', {
        email,
        password,
      });

      const loggedInUser = response.data.user;

      setUser(loggedInUser);

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthContextProvider'
    );
  }

  return context;
};
