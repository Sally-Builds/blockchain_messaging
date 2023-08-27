import React, { createContext, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../contract/load_contract";

export const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [user_address, setUserAddress] = useState("");
  const [user_name, setUserName] = useState("");
  const [contract, setContract] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  //contract
  useEffect(() => {
    loadMyContract();
  }, []);

  const loadMyContract = async () => {
    const result = await loadContract("_User");
    setContract(result.contract);
    if (result.address) {
      setUserAddress(result.address);
      await get(result.contract);
      await checkIfAdmin(result.contract, result.address);
    }
  };

  //connect metamask to network
  const joinNetwork = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log("Ethereum successfully detected!");

      provider
        .request({
          // method: "eth_accounts",
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
      const res = await contract.register(name, "Public key encryption");
      console.log(res);
    } catch (error) {
      console.log(error); // prints "This is error message"
    }
  };

  const getMe = async () => {
    const res = await contract.getMe();
    console.log(res);
    setUserName(res.name);
  };

  const get = async (contract) => {
    const res = await contract.getMe();
    console.log(res);
    setUserName(res.name);
  };

  const checkIfAdmin = async (contract, address) => {
    const result = await contract._isAdmin(address);
    setisAdmin(result);
  };

  const value = {
    joinNetwork,
    user_address,
    user_name,
    register,
    getMe,
    isAdmin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
