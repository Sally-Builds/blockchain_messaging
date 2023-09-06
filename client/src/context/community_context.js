import React, { createContext, useContext, useEffect, useState } from "react";
import { loadContract } from "../contract/load_contract";
import { toast } from "react-toastify";
import { UserContext } from "./user_context";

export const CommunityContext = createContext(null);

const CommunityContextProvider = ({ children }) => {
  const [contract, setContract] = useState("");
  const [communities, setCommunities] = useState([]);
  const [community, setCommunity] = useState("");
  const [communityMembers, setCommunityMembers] = useState([]);
  const [myCommunity, setMyCommunity] = useState("");
  const [CommunityMessages, setCommunityMessages] = useState([]);

  const { setLoading } = useContext(UserContext);

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
  }, [contract]);

  const getAllCommunities = async (contract) => {
    try {
      const res = await contract.getAllCommunities();
      setCommunities(res);
    } catch (error) {
      window.location.reload();
    }
  };

  const getCommunity = async (communityID) => {
    try {
      const comm = communities.filter((el) => el.communityID === communityID);
      setCommunity(comm[0]);
      await getCommunityMembers(communityID);
    } catch (error) {
      window.location.reload();
    }
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
      window.location.reload();
      console.log(error);
    }
  };

  const getCommunityMessages = async (communityID) => {
    const res = await contract.getCommunityMessages(communityID);
    setCommunityMessages(res);
  };

  const sendMessage = async (data) => {
    try {
      setLoading(true);
      const res = await contract["sendMessage(bytes32,string)"](
        data.communityID,
        data.msg
      );
      res.wait().then(async () => {
        await getCommunityMessages(data.communityID);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const create_community = async (data) => {
    try {
      setLoading(true);
      await contract.createCommunity(
        data.name,
        data.guidelines,
        "0x6865790000000000000000000000000000000000000000000000000000000000"
      );
      await getAllCommunities(contract).then(() => {
        setLoading(false);
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const joinCommunity = async (communityID) => {
    try {
      setLoading(true);
      const res = await contract.joinCommunity(communityID);
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
      res.wait().then(async () => {
        await getCommunityMembers(communityID);
        setLoading(false);
      });
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
