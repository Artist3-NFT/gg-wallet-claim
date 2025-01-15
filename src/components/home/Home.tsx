import React, { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import {generatePayload, isLoggedIn, login, logout} from '../../utils/AuthProvider';
import { ethereum } from "thirdweb/chains";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { use } from "react";

require('dotenv').config();

const client_Id = process.env.NEXT_PUBLIC_CLIENT_ID;
const privateKey = process.env.NEXT_PRIVATE_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


const client = createThirdwebClient({
  clientId: `${client_Id}`,
});
console.log( privateKey)


const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),

];

type HomeComponentProps = {
    user_id?: string;
    airdrop_id?: string;
};

export default function Home({ user_id, airdrop_id }: HomeComponentProps) {
  const isConnected = useActiveWalletConnectionStatus();
  const [eligibilityMessage, setEligibilityMessage] = useState<string | null>(null);

  const activeAccount = useActiveAccount();
  const address = activeAccount?.address; // Get the connected wallet address
  const [isLoading, setIsLoading] = useState(false)

  const auth = createAuth({
    domain: "example.com", // Replace with your domain
  });
  const [message, setMessage] = useState("");

  
  const handleCheckEligibility = async () => {
    if (!address) {
      setEligibilityMessage("Please connect your wallet first.");
      return;
    }
    console.log("Environment Variables: ", process.env);

    setIsLoading(true);
    setEligibilityMessage(null);

    try {
      console.log(apiUrl)
      if (!apiUrl) throw new Error("API URL is not defined in environment variables");

      const response = await fetch(
        `${apiUrl}/${airdrop_id}/${user_id}/${address}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch eligibility status");
      }

      const data = await response.json();

      if (data?.eligible) {
        setEligibilityMessage("Congratulations! You are eligible to claim the reward.");
      } else {
        setEligibilityMessage("Sorry, you are not eligible for this reward.");
      }
    } catch (error) {
      setEligibilityMessage("An error occurred while checking eligibility.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

    // const { doLogin, doLogout, getLoginPayload, isLoggedIn,  generatePayload , login, logout } = useAuth();
  
    

  return (
    <div className="text-center flex flex-col gap-6 justify-center m-auto">
      <div className="m-auto">
        <img src="/Brand/logo.svg" className="" />
      </div>
      <p className="text-white font-extrabold text-xl px-10" >
      Connect a wallet to check your Ecosystem Claim Eligibility 
      </p>
      <p className="text-white ">Gamic ID: {user_id}</p>
      

      <ConnectButton
      client={client}
      wallets={wallets}
      chain={ethereum}
      theme={darkTheme({
        colors: {
          modalBg: "hsl(209, 100%, 1%)",
          borderColor: "hsl(23, 95%, 29%)",
          accentText: "hsl(16, 85%, 41%)",
          separatorLine: "hsl(16, 9%, 27%)",
          primaryButtonBg: "hsl(18, 96%, 55%)",
          primaryButtonText: "hsl(229, 42%, 93%)",
        },
      })}
      connectButton={{ label: "Connect Wallet" }}
      connectModal={{
        size: "compact",
        title: "Connect wallet",
        showThirdwebBranding: false,

      }}
     
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
          {isConnected === "connected" ? (
            <div className="m-auto flex flex-col justify-center items-center">
              <button className="underline text-[#fb6421] flex gap-3" onClick={handleCheckEligibility}>Check your Eligibility
{isLoading ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              ""
            )}
        </button>
           <div>
        {eligibilityMessage && (
        <p className="text-white text-center font-medium mt-5">{eligibilityMessage}</p>
      )}</div> 
               
                </div>

          ) : (
                    ""
                  )}
                

    </div>
  );
};

