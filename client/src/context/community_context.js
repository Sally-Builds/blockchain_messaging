import React, { createContext, useEffect, useState } from "react";
import { loadContract } from "../contract/load_contract";
import { toast } from "react-toastify";

export const CommunityContext = createContext(null);

const CommunityContextProvider = ({ children }) => {
  const [contract, setContract] = useState("");
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState("");
  const [communityMembers, setCommunityMembers] = useState([]);
  const [myCommunity, setMyCommunity] = useState("");
  const [CommunityMessages, setCommunityMessages] = useState([]);

  //contract
  useEffect(() => {
    const loadMyContract = async () => {
      const result = await loadContract("_Community");
      setContract(result.contract);
      if (result.contract) {
        getAllCommunities(result.contract);
        getMyCommunity(result.contract);
      }
    };
    loadMyContract();
    // if (contract) {
    //   contract.on("getMessages", (message, communityID) => {
    //     console.log("entered");
    //     console.log(message, communityID);
    //   });
    // }
  }, [contract]);

  const getAllCommunities = async (contract) => {
    const res = await contract.getAllCommunities();
    setCommunities(res);
  };

  const getCommunity = async (communityID) => {
    const comm = communities.filter((el) => el.communityID === communityID);
    setCommunity(comm[0]);
    await getCommunityMembers(communityID);
  };

  const getCommunityMembers = async (communityID) => {
    const result = await contract.getCommunityMembers(communityID);
    setCommunityMembers(result);
  };

  const getMyCommunity = async (contract) => {
    try {
      const res = await contract.getMyCommunity();
      setMyCommunity(res);
      if (
        res !=
        0x0000000000000000000000000000000000000000000000000000000000000000
      ) {
        const comm = await contract.getCommunity(res);
        setCommunity(comm);
        const messages = await contract.getCommunityMessages(res);
        setCommunityMessages(messages);
        const members = await contract.getCommunityMembers(res);
        setCommunityMembers(members);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCommunityMessages = async (communityID) => {
    const res = await contract.getCommunityMessages(communityID);
    setCommunityMessages(res);
  };

  const sendMessage = async (data) => {
    try {
      // await contract.sendMessage(data.communityID, data.msg);
      const res = await contract["sendMessage(bytes32,string)"](
        data.communityID,
        data.msg
      );
      res.wait();
      await getCommunityMessages(data.communityID);
    } catch (error) {
      console.log(error);
    }
  };

  const create_community = async (data) => {
    try {
      console.log(data, "jdks");
      await contract.createCommunity(
        data.name,
        data.guidelines,
        "0x6865790000000000000000000000000000000000000000000000000000000000"
      );
      toast.success("🦄 successfully created community!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await getAllCommunities(contract);
    } catch (error) {
      console.log(error);
    }
  };

  const joinCommunity = async (communityID) => {
    try {
      await contract.joinCommunity(communityID);
      toast.success("🦄 successfully joined community!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      await getCommunityMembers(communityID);
    } catch (error) {
      if (error.data) {
        toast.error(error.data.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.log(error);
    }
  };

  const value = {
    // getAllCommunities,
    communities,
    getCommunityMembers,
    getCommunity,
    community,
    joinCommunity,
    communityMembers,
    getMyCommunity,
    myCommunity,
    CommunityMessages,
    sendMessage,
    create_community,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityContextProvider;
