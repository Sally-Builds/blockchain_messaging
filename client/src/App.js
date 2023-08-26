import React from "react";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./context/user_context";

function App() {
  
  return (
    <>
    <UserContextProvider>
      <Router />
      <ToastContainer />
    </UserContextProvider>
    </>
  );
}

export default App;