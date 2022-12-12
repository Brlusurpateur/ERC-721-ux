import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Redirect } from 'react';
import Web3 from 'web3';



function App() {
  // const [network, setNetworkType] = useState();
  const [networkId, setNetworkId] = useState();
  const [latestBlock, setLatestBlock] = useState();
  const [userAddress, setUserAddress] = useState();

  // Function asynchron
  useEffect(() => {
    async function Data() {

      // Connect to MetaMask
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      // Get network id, latest block and user addresses
      // const network = await web3.eth.getNetworkType();
      const networkId = await web3.eth.net.getId();
      const latestBlock = await web3.eth.getBlockNumber();
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Update state with data
      // setNetworkType(network);
      setNetworkId(networkId);
      setLatestBlock(latestBlock);
      setUserAddress(userAddress);
    }

    Data();
  }, []);

  // if (network !== "sepolia"){
  //   return <Redirect to="/error" />;
  // }

  return (
    <div>
      <h1>Informations</h1>
      {/* <p>Network: {network}</p> */}
      <p>Network ID: {networkId}</p>
      <p>Dernier block: {latestBlock}</p>
      <p>Adresse utilisateur: {userAddress}</p>
    </div>
  );
}

export default App;
