import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_APP_CLIENT_ID: process.env.NEXT_APP_CLIENT_ID,
    NEXT_APP_PRIVATE_KEY: process.env.NEXT_APP_PRIVATE_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  
};

export default nextConfig;
