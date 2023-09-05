import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from "../../components/Navbar2";
import FriendContextProvider from "../../context/friend_context";
import { UserContext } from "../../context/user_context";

const FriendLayout = ({ children }) => {
  const { isLoading, user_name } = useContext(UserContext);
  let location = useLocation();

  if (!user_name && isLoading == false) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <>
      <div
        className="grid min-h-screen"
        // style={{ backgroundImage: "url(/wallpaper.jpeg)" }}
      >
        <FriendContextProvider>
          <NavBar />
          <Outlet />
        </FriendContextProvider>
      </div>
    </>
  );
};

export default FriendLayout;
