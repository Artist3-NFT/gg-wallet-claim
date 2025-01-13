import React from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { AuthProvider, useAuth } from '../../utils/AuthProvider'; // Import the AuthProvider
import { bsc } from "thirdweb/chains";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const client = createThirdwebClient({
  clientId: "...",
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
  console.log(isConnected)


    const { doLogin, doLogout, getLoginPayload, isLoggedIn } = useAuth();
  return (
    <div className="text-center flex flex-col gap-10 justify-center m-auto">
      <div className="m-auto">
        <img src="brand/logo.svg" className="" />
      </div>

      <ConnectButton
      client={client}
      wallets={wallets}
      chain={bsc}
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
      onConnect={async () => {
        // Perform any additional actions after successful connection
        // For example, you can call a function to update the user's login status
        await doLogin();
      }}
      onDisconnect={async () => {
        // Perform any additional actions after successful disconnection
        // For example, you can call a function to update the user's logout status
        await doLogout();
      }}
    />
          {isConnected === "connected" ? (<p className="underline text-[#fb6421]">Check your Eligibility</p> ) : (
                    ""
                  )}

    </div>
  );
};

export default Home;
