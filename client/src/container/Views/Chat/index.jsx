import React, { useState } from "react";
import List from "../../../components/List";
import ChatArea from "../../../components/chat_area";
import Details from "../../../components/Details";

const Chat = () => {
  const [tab, setTab] = useState(0);
  const tabChange = (i) => {
    setTab(i);
  };
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="col-span-4 p-2 border-double border-r-2 h-full">
        <List tabChange={tabChange} />
      </div>

      <div className="col-span-8">{tab === 0 ? <ChatArea /> : <Details />}</div>
    </div>
  );
};

export default Chat;
