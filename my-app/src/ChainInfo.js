import React, { useState, useEffect, Redirect } from 'react';
import Web3 from 'web3';

function ChainInfo() {
  const [networkType, setNetworkType] = useState("");
  const [networkId, setNetworkId] = useState();
  const [latestBlock, setLatestBlock] = useState();
  const [userAddress, setUserAddress] = useState();

  useEffect(() => {
    async function Data() {

      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      // const networkType = await web3.eth.getNetworkType(); // Use different variable name for network
      const networkId = await web3.eth.net.getId();
      const latestBlock = await web3.eth.getBlockNumber();
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      setNetworkType(networkType); 
      setNetworkId(networkId);
      setLatestBlock(latestBlock);
      setUserAddress(userAddress);
    }

    Data();
  }, []);

  // Check if network is "sepolia"
  // if (networkType !== "sepolia"){
  //   return <Redirect to="/error" />;
  // }

  return (
    <div>
      <h1>Informations</h1>
      <p>Network ID: {networkId}</p>
      <p>Dernier block: {latestBlock}</p>
      <p>Adresse utilisateur: {userAddress}</p>
    </div>
  );
}

export default ChainInfo;
