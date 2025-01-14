import React, { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import {generatePayload, isLoggedIn, login, logout} from '../../utils/AuthProvider';
import { ethereum } from "thirdweb/chains";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";

const client = createThirdwebClient({
  clientId: "95b8094a8af9a767c30afa72aeb6b6fc",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),

];
const Home = () => {
  const isConnected = useActiveWalletConnectionStatus();

  const [isLoading, setIsLoading] = useState(false)

  const auth = createAuth({
    domain: "example.com", // Replace with your domain
  });
  const [message, setMessage] = useState("");

  
  const handleCheckEligibility = async () => {
    setIsLoading(true);
   
    // setIsLoading(false);
  };

    // const { doLogin, doLogout, getLoginPayload, isLoggedIn,  generatePayload , login, logout } = useAuth();
console.log(login)
   
    

  return (
    <div className="text-center flex flex-col gap-10 justify-center m-auto">
      <div className="m-auto">
        <img src="Brand/logo.svg" className="" />
      </div>
      <p className="text-white" >
      Connect a wallet to check your claim Eligibility 
      </p>

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
      // auth={{
      //   // The following methods run on the server (not client)!
      //   isLoggedIn: async () => {
      //     const authResult = await isLoggedIn();
      //     if (!authResult) return false;
      //     return true;
      //   },
      //   doLogin: async (params) => await login(params),
      //   getLoginPayload: async ({ address }) =>
      //     generatePayload({ address }),
      //   doLogout: async () => await logout(),
      // }}
      // onConnect={async () => {
      //   // Perform any additional actions after successful connection
      //   // For example, you can call a function to update the user's login status
      //   await doLogin();
      // }}
      // onDisconnect={async () => {
      //   // Perform any additional actions after successful disconnection
      //   // For example, you can call a function to update the user's logout status
      //   await doLogout();
      // }}
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
            <div className="m-auto"><button className="underline text-[#fb6421] flex gap-3" onClick={handleCheckEligibility}>Check your Eligibility
{isLoading ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              ""
            )}
        </button>
            
          {/* <Spin indicator={<LoadingOutlined spin />} /> */}
          </div>

          ) : (
                    ""
                  )}
                

    </div>
  );
};

export default Home;
