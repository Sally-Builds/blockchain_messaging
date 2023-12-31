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
  const [myFlaggedWords, setMyFlaggedWords] = useState([]);

  const [friend, setFriend] = useState("");

  //contract
  useEffect(() => {
    const loadMyContract = async () => {
      try {
        const result = await loadContract("_User");
        setContract(result.contract);
        if (result.address && result.contract) {
          setUserAddress(result.address);
          await get(result.contract);
          await checkIfAdmin(result.contract, result.address);
          await getFlaggedWords(result.contract);
        } else {
          setUserAddress("");
        }
        setLoading(false);
      } catch (error) {
        setLoading(true);
        window.location.replace("/");
        console.log(error);
        setLoading(false);
      }
    };

    loadMyContract();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setLoading(true);
        window.location.reload();
      });
    }
  }, [user_address, contract]);

  //connect metamask to network
  const joinNetwork = async () => {
    try {
      setLoading(true);
      const provider = await detectEthereumProvider();

      if (provider) {
        console.log("Ethereum successfully detected!");
        provider
          .request({
            // method: "eth_accounts",
            method: "eth_requestAccounts",
          })
          .then(async (addresses) => {
            setUserAddress(addresses[0]);
            setLoading(false);
            // getMe();
          })
          .catch((e) => window.location.reload);
      } else {
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
      setLoading(false);
      window.location.reload();
    }
  };

  const register = async (name) => {
    try {
      setLoading(true);
      const res = await contract.register(name, "Public key encryption");
      res.wait().then(async () => {
        await getMe();
        setLoading(false);
      });
    } catch (error) {
      setUserName("");
      setUserAddress("");
      console.log(error); // prints "This is error message"
    }
  };

  const getMe = async () => {
    const res = await contract.getMe();
    setUserName(res.name);
  };

  const get = async (contract) => {
    try {
      const res = await contract.getMe();
      if (res.name) {
        setUserName(res.name);
      } else {
        setUserName("");
      }
    } catch (error) {
      window.location.reload();
    }
  };

  const checkIfAdmin = async (contract, address) => {
    try {
      const result = await contract._isAdmin(address);
      setisAdmin(result);
      if (result) {
        setUserName("admin");
      }
      setLoading(false);
    } catch (error) {
      window.location.reload();
    }
  };

  const getAFriend = async (user) => {
    if (user.member_address.toLowerCase() !== user_address) {
      setFriend(user);
    }
  };

  const flagWords = async (words) => {
    try {
      setLoading(true);
      const result = await contract.addWords(words);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // window.location.reload();
    }
  };

  const getFlaggedWords = async (contract) => {
    try {
      const res = await contract["getFlaggedWords()"]();
      setMyFlaggedWords(res);
    } catch (error) {
      console.log(error);
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
    flagWords,
    myFlaggedWords,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
