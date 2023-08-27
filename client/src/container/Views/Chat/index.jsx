import React, { useState, useContext } from "react";
import List from "../../../components/List";
import ChatArea from "../../../components/chat_area";
import Details from "../../../components/Details";
import CommunityContextProvider from "../../../context/community_context";
import { UserContext } from "../../../context/user_context";

const Chat = () => {
  const { user_name } = useContext(UserContext);

  const [tab, setTab] = useState(0);
  const tabChange = (i) => {
    setTab(i);
  };
  return (
    <CommunityContextProvider>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-4 p-2 border-double border-r-2 h-full">
          <List tabChange={tabChange} />
        </div>

        <div className="col-span-8">
          {tab === 0 ? <ChatArea title={user_name} /> : <Details />}
        </div>
      </div>
    </CommunityContextProvider>
  );
};

export default Chat;
