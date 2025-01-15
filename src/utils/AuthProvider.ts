"use server"
// AuthProvider.js - This is a server component
import React, { createContext, useContext } from 'react';
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { cookies } from "next/headers";
import { createThirdwebClient } from "thirdweb";

const client_Id = process.env.REACT_APP_CLIENT_ID;

// const AuthContext = createContext();
const client = createThirdwebClient({
  clientId: `${client_Id}`,
});
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

if (!privateKey) {
  throw new Error("Missing REACT_APP_PRIVATE_KEY in .env file.");
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

