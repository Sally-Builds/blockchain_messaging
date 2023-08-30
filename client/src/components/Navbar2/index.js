import React, { useContext } from "react";
import { UserContext } from "../../context/user_context";

const NavBar = () => {
  const { joinNetwork, user_name, user_address } = useContext(UserContext);

  const join = async () => {
    await joinNetwork();
    // await getMe();
  };

  return (
    <>
      <div class="h-full">
        {/* Nav */}
        <div class="w-full flex items-center justify-between">
          <a
            class="flex items-center p-2 text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="/"
          >
            Aou
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              ra
            </span>
          </a>

          <div class="flex w-1/2 justify-end content-center p-3">
            {user_address ? (
              <>
                {user_name ? (
                  <span
                    className="
                            bg-blue-100 flex flex-row text-blue-800 text-xs font-medium mr-2 px-2.5 py-2.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    <img
                      class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                      src="/default.jpg"
                      alt="Bordered avatar"
                    />
                    <span className="p-3">{user_name}</span>
                  </span>
                ) : (
                  <span
                    className="
            bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-2.5 rounded dark:bg-blue-900 dark:text-blue-300"
                  >
                    Register Below to
                  </span>
                )}
              </>
            ) : (
              <div>
                <button
                  className="inline-block text-sm px-4 py-2 m-2 leading-none border rounded
              text-white border-white hover:border-transparent hover:text-teal-500
               hover:bg-white mt-4 lg:mt-0"
                  onClick={join}
                >
                  Join Network
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
