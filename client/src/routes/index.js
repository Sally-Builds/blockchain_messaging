import { Route, Routes, BrowserRouter } from "react-router-dom";

/**
 * import Layouts
 */
import LandingLayout from "../container/Layout/LandingLayout";
// import UserLayout from "../containers/Layouts/UserLayout";
/**
 * import views
 */
import Home from "../container/Views/Home";
import Chat from "../container/Views/Chat";
const Router = () => {
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