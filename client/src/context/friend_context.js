import React, { createContext, useEffect, useState } from "react";
import { loadContract } from "../contract/load_contract";
import { toast } from "react-toastify";

export const FriendContext = createContext(null);

const FriendContextProvider = ({ children }) => {
  const [contract, setContract] = useState("");
  const [friends, setFriends] = useState([]);

  //contract
  useEffect(() => {
    const loadMyContract = async () => {
      const result = await loadContract("_Friend");
      setContract(result.contract);
      if (result.contract) {
        get(result.contract);
        //   getMyCommunity(result.contract);
      }
    };

    const get = async (contract) => {
      let result = await contract.getFriends();
      if (result.length > 0) {
        let data = await Promise.all(
          result.map(async (el) => {
            const messages = await contract.getChatWithFriend(el.user);

            return { ...el, messages };
          })
        );
        result = data;
      }
      setFriends(result);
    };

    loadMyContract();
    // if (contract) {
    //   getFriends(contract);
    // }
  }, [contract]);

  const getFriends = async (contract) => {
    let result = await contract.getFriends();
    if (result.length > 0) {
      let data = await Promise.all(
        result.map(async (el) => {
          const messages = await contract.getChatWithFriend(el.user);

          return { ...el, messages };
        })
      );
      result = data;
    }
    setFriends(result);
  };

  const addFriend = async (user_address) => {
    const result = await contract.addFriend(user_address);
    result.wait();
    await getFriends(contract);
  };

  const sendMessage = async (data) => {
    try {
      let result = await contract.sendPeerMessage(
        data.friend,
        data.msg,
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
      result
        .wait()
        .then(async () => {
          await getMessagesWithAFriend(data.friend);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  const getMessagesWithAFriend = async (friend_address) => {
    const result = await contract.getChatWithFriend(friend_address);

    if (friends.length !== 0) {
      let data = friends.map((friend) => {
        let messages = [];

        if (friend.user.toLowerCase() === friend_address.toLowerCase()) {
          messages = result;
        }

        return {
          ...friend,
          messages,
        };
      });
      setFriends(data);
    }
  };

  const value = {
    friends,
    addFriend,
    sendMessage,
  };

  return (
    <FriendContext.Provider value={value}>{children}</FriendContext.Provider>
  );
};

export default FriendContextProvider;