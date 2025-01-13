"use client"
// AuthProvider.js - This is a server component
import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const doLogin = async (params) => {
    // call your backend to verify the signed payload passed in params
  };

  const doLogout = async () => {
    // call your backend to logout the user if needed
  };

  const getLoginPayload = async (params) => {
    // call your backend and return the payload
  };

  const isLoggedIn = async () => {
    // call your backend to check if the user is logged in
  };

  return (
    <AuthContext.Provider value={{ doLogin, doLogout, getLoginPayload, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};