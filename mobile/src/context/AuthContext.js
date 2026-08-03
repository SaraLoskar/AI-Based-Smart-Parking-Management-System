import React, { createContext, useContext, useState } from "react";
import { loginUser } from "../services/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await loginUser({
        email,
        password,
      });

      if (response.success) {
        setUser(response.user);

        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      }

      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {

    await AsyncStorage.removeItem("user");

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);