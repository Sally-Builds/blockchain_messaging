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
        if (result.address && result.contract) {
          setUserAddress(result.address);
          await get(result.contract);
          await checkIfAdmin(result.contract, result.address);
        } else {
          setUserAddress("");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    // window.ethereum
    //   .request({
    //     method: "eth_accounts",
    //     // method: "eth_requestAccounts",
    //   })
    //   .then(async (addresses) => {
    //     // setUserAddress(addresses[0]);
    //     console.log(addresses, "yield");
    //     // getMe();
    //   });

    loadMyContract();
    // }, []);
  }, [user_address, contract]);

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

  const register = async (name, age) => {
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
    const res = await contract.getMe();
    if (res.name) {
      setUserName(res.name);
    } else {
      setUserName("");
    }
  };

  const checkIfAdmin = async (contract, address) => {
    const result = await contract._isAdmin(address);
    setisAdmin(result);
    if (result) {
      setUserName("admin");
    }
    setLoading(false);
  };

  const getAFriend = async (user) => {
    if (user.member_address.toLowerCase() !== user_address) {
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
