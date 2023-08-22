import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";
// import  bg from "./bg1.jpg"
import bg from "../../components/assets/bg1.jpg"
const LandingLayout = () => {
  return (
    <div className="grid">
      <NavBar />
      <main
        className="container"
        // style={{
        //   backgroundImage: `url(${bg})`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default LandingLayout;
