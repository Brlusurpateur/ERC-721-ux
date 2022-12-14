import { useEffect, useState } from "react";
import Web3 from "web3";
import Network from "./Network";

const contractABI = require("./contracts/FakeNefturians.json").abi; 
const contract_address = "0x1dA89342716B14602664626CD3482b47D5C2005E"; 

let web3 = new Web3(window.ethereum);
var contract = new web3.eth.Contract(contractABI, contract_address);



function FakeNefturians(){
    
    const[price, Setprice] = useState(); 
    const[priceETH, SetpriceETH] = useState(); 
    useEffect(()=>{
        getPrice();
    })

    async function getPrice(){
        let pri = await contract.methods.tokenPrice().call(); 
        Setprice(String(pri*1.00001)); 
        SetpriceETH(web3.utils.fromWei(String(price))); 
        console.log(priceETH); 
    }

    async function BuyToken(){
        let a = await Network(); 
       
        if(a===true){
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts' }); 
        await contract.methods.buyAToken().send({from: accounts[0], value: price}).then(console.log); 
        }
    }
    return(
        <div>
            
            <br></br>
            <div className="Info">{priceETH} ETH</div>
            <button className ="Click" onClick={BuyToken}> Buy Token </button>
            <div></div>
        </div>
    )
}
export default FakeNefturians;