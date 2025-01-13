import { useAddress, useMetamask, useDisconnect } from '@thirdweb-dev/react';

const ConnectWalletButton = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();

  const handleConnect = () => {
    connectWithMetamask();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div>
      {!address ? (
        <button
          onClick={handleConnect}
          className="bg-blue-500 text-white p-4 rounded-lg"
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {address}</p>
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white p-4 rounded-lg"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;
