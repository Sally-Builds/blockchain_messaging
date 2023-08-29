import React, { createContext, useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../contract/load_contract";
import { toast } from "react-toastify";

export const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const [user_address, setUserAddress] = useState("");
  const [user_name, setUserName] = useState("");
  const [contract, setContract] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [friend, setFriend] = useState("");

  //contract
  useEffect(() => {
    const loadMyContract = async () => {
      try {
        const result = await loadContract("_User");
        setContract(result.contract);
        if (result.address) {
          setUserAddress(result.address);
          await get(result.contract);
          await checkIfAdmin(result.contract, result.address);
          console.log(user_address);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadMyContract();
  }, [setUserAddress, user_address]);

  // const loadMyContract = async () => {
  //   setLoading(true);
  //   console.log("reche here");
  //   const result = await loadContract("_User");
  //   setContract(result.contract);
  //   if (result.address) {
  //     setUserAddress(result.address);
  //     await get(result.contract);
  //     await checkIfAdmin(result.contract, result.address);
  //   }
  //   setLoading(true);
  // };

  //connect metamask to network
  const joinNetwork = async () => {
    try {
      const provider = await detectEthereumProvider();

      console.log(provider);
      if (provider) {
        console.log("Ethereum successfully detected!");
        window.location.reload();

        provider
          .request({
            // method: "eth_accounts",
            method: "eth_requestAccounts",
          })
          .then(async (addresses) => {
            setUserAddress(addresses[0]);
            // getMe();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          })
          .catch((e) => window.location.reload);
      } else {
        console.log("download metamask");
        toast.success("🦄 Download Metamask!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
    }
  };

  const register = async (name, age) => {
    try {
      console.log("here");
      setLoading(true);
      const res = await contract.register(name, "Public key encryption");
      console.log(res);
      setLoading(false);
      window.location.reload();
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
    if (result) {
      setUserName("admin");
    }
    console.log();
    setLoading(false);
  };

  const getAFriend = async (user) => {
    if (user.member_address.toLowerCase() !== user_address) {
      console.log(user);
      setFriend(user);
    }
  };

  const value = {
    joinNetwork,
    user_address,
    user_name,
    register,
    getMe,
    isAdmin,
    friend,
    getAFriend,
    isLoading,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
