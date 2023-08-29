import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar2";

const LandingLayout = () => {
  return (
    <div
      className="grid bg-cover min-h-screen"
      style={{ backgroundImage: "url(/header.png)" }}
    >
      <NavBar />

      <main
        className="container m-6"
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
