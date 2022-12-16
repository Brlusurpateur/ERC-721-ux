import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Network from './Network'

function FakeBayc() {
  const [balance, setBalance] = useState(0);
  const [name, Setname] = useState(null); 

  const contractAddress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
  const contractABI = require("./contracts/FakeBAYC.json").abi;

let web3 = new Web3(window.ethereum);
var contract = new web3.eth.Contract(contractABI, contractAddress);

 useEffect(()=>{
    GetSupplyAndName(); 
 })

async function GetSupplyAndName(){
 
    let a = await contract.methods.tokenCounter().call();
    setBalance(a); 
    let b = await contract.methods.name().call();
    Setname(b); 
}

async function MintNft(){
    let a = await Network(); 
    if(a===true){
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts' }); 
    await contract.methods.claimAToken().send({from: accounts[0]}).then(console.log); 
    }
}

  return (
    <div>
      <h1>FakeBAYC</h1>
      <p>Nom: {name}</p>
      <p>Total Token Number: {balance}</p>
      <button onClick={MintNft}>Claim Token</button>
    </div>
  );
}

export default FakeBayc;
