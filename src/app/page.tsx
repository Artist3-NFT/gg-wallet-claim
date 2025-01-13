"use client"
import Image from "next/image";
import HomeComponent from "@/components/home/Home"; // Correct import name
import { AuthProvider, useAuth } from '../utils/AuthProvider'; // Import the AuthProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThirdwebProvider } from "thirdweb/react";
export default function Home() {
  const queryClient = new QueryClient();
  const desiredChainId = 56;

 
  return (
    <div className=" bg-black items-center justify-items-center m-auto h-screen">
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
<ThirdwebProvider >
      <main className="flex items-center sm:items-start  m-auto h-full ">
       <HomeComponent/>
      </main>
      </ThirdwebProvider>
      </QueryClientProvider>

      </AuthProvider>

    </div>
  );
}
