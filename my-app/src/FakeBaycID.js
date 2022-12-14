import { useState, IpfsImage} from "react";
import Web3 from "web3";
import Network from "./Network";

function FakeBaycID() {
    
    //Declaration des const pour stocker l'identifiant du jeton, les attributs et l'adresse IPFS de l'image associée
    const[tokenId, setTokenId] = useState(); 
    const[attribute, setAttribute]= useState(); 
    const [image, setImage] = useState(""); 

    //Déclaration des variables pour l'ABI et l'adresse du contrat
    const contractABI = require("./contracts/FakeBAYC.json").abi; 
    const contract_address = "0x1dA89342716B14602664626CD3482b47D5C2005E"; 
    
    //Connection à Metamask et création d'une instance de contrat
    let web3 = new Web3(window.ethereum);
    var contract = new web3.eth.Contract(contractABI, contract_address);

    //
    const handleChamp = (event)=>{
        setTokenId(event.target.value)
    }

    async function TokenInfo(){
       if(tokenId!=null){
       
        let a = await Network(); 
       
        if(a===true){ // good network
           
            if(tokenId >= parseInt(await contract.methods.tokenCounter().call())){
              alert("Ce token n'est pas mint"); 
              throw Error("Token n'est pas dans la liste")
            }else{
            let info= await contract.methods.tokenURI(tokenId).call();
            const jsonURI = await fetch(info).then(res => res.json()); 

            setAttribute(JSON.stringify(jsonURI.attributes));  
            setImage(jsonURI.image); 
            console.log(jsonURI); 
            }
        }
    }else{
        alert("Choisi un Token disponible"); 
        throw Error("L'id du token n'est pas"); 
    }
} 
    
    return (
        <div>
            <input className="barre" type="number"value={tokenId} onChange={e=>handleChamp(e)}/>
            <div>
            <button className ="ClickInfo" onClick={TokenInfo}> Information token</button>
            </div>
                    <div className="Info">{attribute}</div>
                <br></br>
           {image!=="" &&
                <>
                    <IpfsImage className="nft"hash={image}/>
                </>
            }
            <div></div>
        </div>                    
    )
}

export default FakeBaycID;