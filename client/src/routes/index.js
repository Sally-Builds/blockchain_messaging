import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/user_context";
import { CirclesWithBar } from "react-loader-spinner";
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
import Home2 from "../container/Views/Home2";
import Chat from "../container/Views/Chat";
import Test from "../container/Views/Test";
import Dm from "../container/Views/Dm";

const Router = () => {
  const { isLoading } = useContext(UserContext);
  console.log(isLoading);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center text-center items-center min-h-screen">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      ) : (
        <div className="">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingLayout />}>
                <Route path="" element={<Home2 />} />

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
      )}
    </>
  );
};

export default Router;
