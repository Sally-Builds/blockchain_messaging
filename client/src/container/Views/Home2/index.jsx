import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/user_context";
import { Link } from "react-router-dom";
// import Speech from "../../../components/speech";

const Home = () => {
  const { user_address, user_name, register } = useContext(UserContext);

  const [name, setName] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    //submit application
    register(name);
  };
  return (
    // <!--Main-->
    <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      {/* <!--Left Col--> */}
      <div className="flex flex-col w-full xl:w-3/5 justify-center lg:items-start overflow-y-hidden">
        <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
          AOURA
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
            {" "}
            DAPP Messaging
          </span>{" "}
        </h1>
        <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-gray-400">
          This platform is aimed at offering a user-friendly and safe messaging
          system specially tailored for individuals with disabilities in
          different support services.
        </p>

        {!user_address ? (
          <span className="text-blue-400">Connect to register</span>
        ) : user_name ? (
          <>
            <div>
              <Link
                to="/chat/direct_message"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Enter chat room
              </Link>
            </div>
          </>
        ) : (
          <>
            <form
              onSubmit={submit}
              className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-blue-300 py-2 font-bold mb-2"
                  for="name"
                >
                  Register
                </label>
                <input
                  className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  required
                  placeholder="Full Name"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="/terms_and_conditions"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* <!--Right Col--> */}
      <div className="w-full xl:w-3/5 p-12 overflow-hidden"></div>
      <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in"></div>
    </div>
  );
};

export default Home;
