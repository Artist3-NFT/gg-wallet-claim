"use server"
// AuthProvider.js - This is a server component
import React, { createContext, useContext } from 'react';
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { cookies } from "next/headers";
import { createThirdwebClient } from "thirdweb";


// const AuthContext = createContext();
const client = createThirdwebClient({
  clientId: "95b8094a8af9a767c30afa72aeb6b6fc",
});
const privateKey = "4be390d74336aab758655bae4fabec79e76bde5d2898df9131e71f6e5d12e877";

if (!privateKey) {
  throw new Error("Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
  domain:"",
  adminAccount: privateKeyToAccount({ client, privateKey }),
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    (await cookies()).set("jwt", jwt);
  }
}

export async function isLoggedIn() {
  const jwt = (await cookies()).get("jwt");
  if (!jwt?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false
  }
  return true;
}

export async function logout() {
  (await cookies()).delete("jwt");
}

// export const AuthProvider = ({ children }) => {
//   const doLogin = async (params) => {
//     // call your backend to verify the signed payload passed in params
//   };

//   const doLogout = async () => {
//     // call your backend to logout the user if needed
//   };

//   const getLoginPayload = async (params) => {
//     // call your backend and return the payload
//   };

//   const isLoggedIn = async () => {
//     // call your backend to check if the user is logged in
//   };
//   const login = async (payload: VerifyLoginPayloadParams) => {
//     // call your backend to check if the user is logged in
//   };
//   const logout = async (params) => {
//     // call your backend to check if the user is logged in
//   };

//   const generatePayload = async (params) => {
//     // call your backend to check if the user is logged in
//   };

//   return (
//     <AuthContext.Provider value={{ doLogin, doLogout, getLoginPayload, generatePayload, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };