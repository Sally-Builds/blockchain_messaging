import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";
import FriendContextProvider from "../../context/friend_context";
const FriendLayout = ({ children }) => {
  return (
    <>
      <FriendContextProvider>
        <NavBar />
        <Outlet />
      </FriendContextProvider>
    </>
  );
};

export default FriendLayout;
