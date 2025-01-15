"use client"
import Image from "next/image";
import HomeComponent from "@/components/home/Home"; // Correct import name
// import { AuthProvider, useAuth } from '../utils/AuthProvider'; // Import the AuthProvider
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThirdwebProvider } from "thirdweb/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function Home({ params }: { params: { user_id?: string; airdrop_id?: string } }) {
    const queryClient = new QueryClient();
  const desiredChainId = 56;

//   const { user_id, airdrop_id } = params;
const { user_id, airdrop_id } = params;
console.log(user_id, airdrop_id); 
 
  return (
    <div className=" bg-black items-center justify-items-center m-auto h-screen">
      {/* <AuthProvider> */}
      <QueryClientProvider client={queryClient}>
<ThirdwebProvider >
      <main className="flex items-center sm:items-start  m-auto h-full ">
       <HomeComponent user_id={user_id} airdrop_id={airdrop_id} />
      </main>
      </ThirdwebProvider>
      </QueryClientProvider>

      {/* </AuthProvider> */}

    </div>
  );
}
