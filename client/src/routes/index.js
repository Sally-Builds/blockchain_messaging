import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
/**
 * import Layouts
 */
import LandingLayout from "../container/Layout/LandingLayout";
import ChatLayout from "../container/Layout/ChatLayout";
// import UserLayout from "../containers/Layouts/UserLayout";
/**
 * import views
 */
import Home from "../container/Views/Home";
import Chat from "../container/Views/Chat";

const Router = () => {
  // const {} = useContext(UserContext);
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route path="" element={<Home />} />

            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
