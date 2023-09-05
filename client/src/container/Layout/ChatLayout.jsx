import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from "../../components/Navbar2";
import CommunityContextProvider from "../../context/community_context";
import FriendContextProvider from "../../context/friend_context";
import { UserContext } from "../../context/user_context";

const ChatLayout = ({ children }) => {
  const { isLoading, user_name } = useContext(UserContext);
  let location = useLocation();

  if (!user_name && isLoading === false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <>
      <div className="grid bg-cover min-h-screen dark:bg-sky-950">
        <CommunityContextProvider>
          <FriendContextProvider>
            <NavBar />
            <Outlet />
          </FriendContextProvider>
        </CommunityContextProvider>
      </div>
    </>
  );
};

export default ChatLayout;
