import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";
import CommunityContextProvider from "../../context/community_context";
const ChatLayout = ({ children }) => {
  return (
    <>
      <CommunityContextProvider>
        <NavBar />
        <Outlet />
      </CommunityContextProvider>
    </>
  );
};

export default ChatLayout;
