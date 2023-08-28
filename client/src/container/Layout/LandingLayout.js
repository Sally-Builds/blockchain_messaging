import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";

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
