import React, { createContext, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../contract/load_contract";
import Web3 from "web3"

export const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [user_address, setUserAddress] = useState("");
  const [user_name, setUserName] = useState("");
  const [contract, setContract] = useState("");

  //contract
  useEffect(() => {
      loadContract("_User", Web3).then((contract) => setContract(contract));
  },[])

  function getRPCErrorMessage(err){
    var open = err.stack.indexOf('{')
    var close = err.stack.lastIndexOf('}')
    var j_s = err.stack.substring(open, close + 1);
    var j = JSON.parse(j_s);
    var reason = j.data[Object.keys(j.data)[0]].reason;
    return reason;
}

  //connect metamask to network
  const joinNetwork = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log("Ethereum successfully detected!");

      provider
        .request({
          method: "eth_requestAccounts",
        })
        .then((addresses) => {
          setUserAddress(addresses[0]);
        })
        .catch((e) => window.location.reload);
    } else {
      console.log("download metamask");
    }
  };

  const register = async (name, age) => {
    try {
      console.log(user_address)
    // const res = await contract.methods.getMe().call({from: user_address});
      const res = await contract.methods.register(name, 'encPubjk').send({from: user_address})
         console.log(res)
    } catch (error) {
        // const data = error.data.message
        // const txHash = Object.keys(data)[0]; // TODO improve
        // const reason = data[txHash].reason;
    
        console.log(error); // prints "This is error message"
    }
  }

  const getMe = async () => {
    const res = await contract.methods.getMe().call({from: user_address});
    setUserName(res.name);
  }

  const value = {
    joinNetwork,
    user_address,
    register,
    getMe
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
