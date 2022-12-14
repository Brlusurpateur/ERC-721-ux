import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Network from './Network'

function FakeBayc() {
  const [balance, setBalance] = useState(0); // Initialize balance with 0
  const [name, Setname] = useState(null); 

  const contractAddress = "0x1dA89342716B14602664626CD3482b47D5C2005E";
  const contractABI = require("./contracts/FakeBAYC.json").abi;

// declare the contract
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
    //use window.ethereum to get the account instead of the var web3
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

// import React from 'react';
// import { useWeb3Context } from 'web3-react';
// import FakeBAYC from './build/contracts/FakeBAYC';

// const FakeBAYC = ({ tokenId }) => {
  
//     const context = useWeb3Context();
  
//     // declare imageURL and attributes in the component's scope
//     let imageURL;
//     let attributes;
  
//     // check if user is connected to a web3 provider
//     if (!context.active && !context.error) {
//       return <div>Please connect to a web3 provider</div>;
//     }
  
//     // load contract instance
//     const contract = new context.library.eth.Contract(
//       FakeBAYC.abi,
//       FakeBAYC.address
//     );
  
//     // retrieve the base URI of the contract
//     const baseURI = contract.methods.baseURI().call();
  
//     // retrieve the metadata URI for the specified tokenId
//     const metadataURI = `${baseURI}/${tokenId}`;

//   // retrieve the metadata for the specified tokenId
  // fetch(metadataURI)
//     .then((response) => response.json())
//     .then((metadata) => {
//       // retrieve the image URL from the metadata
//       const imageURL = metadata.image;

//   // retrieve the attributes from the metadata
//   const attributes = metadata.attributes;
// });

// return (
//     <div>
//       <img src={imageURL} alt="FakeBAYC token" />
//       <p>Attributes:</p>
//       <ul>
//         {attributes.map((attribute) => (
//           <li key={attribute.name}>{attribute.name}: {attribute.value}</li>
//         ))}
//       </ul>
//     </div>
//   );  
// };

// export default FakeBayc;