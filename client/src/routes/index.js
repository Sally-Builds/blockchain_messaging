import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
/**
 * import Layouts
 */
import LandingLayout from "../container/Layout/LandingLayout";
import ChatLayout from "../container/Layout/ChatLayout";
import FriendLayout from "../container/Layout/FriendLayout";
// import UserLayout from "../containers/Layouts/UserLayout";
/**
 * import views
 */
import Home from "../container/Views/Home";
import Chat from "../container/Views/Chat";
import Test from "../container/Views/Test";
import Dm from "../container/Views/Dm";

const Router = () => {
  // const {} = useContext(UserContext);
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route path="" element={<Home />} />

            {/* <Route path="/chat" element={<Chat />} /> */}
          </Route>

          <Route path="/chat/community" element={<ChatLayout />}>
            <Route path="" element={<Test />} />
          </Route>

          <Route path="/chat/direct_message" element={<FriendLayout />}>
            <Route path="" element={<Dm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
