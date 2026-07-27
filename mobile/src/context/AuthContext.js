import React, {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  logoutUser,
} from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const login = async (email, password) => {

    try {

      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      if (response.success) {
        setUser(response.user);
        return response;
      }
      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);