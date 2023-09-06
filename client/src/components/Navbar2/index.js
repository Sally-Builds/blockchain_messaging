import React, { useContext, useState, Fragment } from "react";
import { UserContext } from "../../context/user_context";
import { Dialog, Transition } from "@headlessui/react";

const NavBar = () => {
  const { joinNetwork, user_name, user_address, flagWords, myFlaggedWords } =
    useContext(UserContext);

  const flags = ["hello", "hk", "opulus", "wow nbod", "nigga"];

  let [isOpenView, setIsOpenView] = useState(false);
  let [isOpenFlag, setIsOpenFlag] = useState(false);
  let [word, setWord] = useState("");
  let [words, setWords] = useState([]);
  let [flagErr, setFlagErr] = useState("");

  const join = async () => {
    await joinNetwork();
    // await getMe();
  };

  function closeViewModal() {
    setIsOpenView(false);
  }

  const openViewModal = () => {
    setIsOpenView(true);
  };

  const openFlagModal = () => {
    setIsOpenFlag(true);
  };

  const send = (e) => {
    e.preventDefault();
    if (words.length >= 5) {
      setFlagErr("maximum flags per transaction");
    } else {
      setWords([...words, word]);
    }
    setWord("");
    console.log(words);
  };

  const closeFlagModal = async () => {
    if (words.length > 0) {
      await flagWords(words);
      setIsOpenFlag(false);
    }
  };

  const close = async () => {
    setIsOpenFlag(false);
  };

  return (
    <>
      <div className="h-full bg-gray-800">
        {/* Nav */}
        <div className="w-full flex items-center justify-between">
          <a
            className="flex items-center p-2 text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="/"
          >
            Aou
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              ra
            </span>
          </a>

          <div className="flex w-1/2 justify-end content-center p-3">
            {user_address ? (
              <>
                {user_name ? (
                  <div className="group bottom-10 right-10 z-10 flex items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
                    <button
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="hover:scale-110 bg-blue-100 hover:bg-blue-300 flex flex-row text-blue-800 text-xs font-medium mr-2 px-2.5 py-2.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    >
                      <img
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                        src="/default.jpg"
                        alt="Bordered avatar"
                      />
                      <span className="p-3">{user_name}</span>
                    </button>
                    <ul className="absolute z-0 flex translate-x-full flex-row items-center justify-center opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-x-[75%] group-hover:opacity-100">
                      <li onClick={openFlagModal}>
                        <div
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          data-te-ripple-centered="true"
                          className="hover:scale-110 mx-5 mb-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
                        >
                          <i className="fa-solid fa-flag"></i>
                        </div>
                      </li>
                      <li onClick={openViewModal}>
                        <div
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          data-te-ripple-centered="true"
                          className="hover:scale-110 mx-5 mb-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cyan-600 shadow-md hover:shadow-lg"
                        >
                          <i className="fa-solid fa-user"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
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

      <Transition appear show={isOpenView} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeViewModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-transparent p-6 text-left align-middle shadow-xl transition-all">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                          <div className="relative">
                            <img
                              alt="..."
                              src="/default.jpg"
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 text-center mt-20"></div>
                      </div>
                      <div className="text-center mt-6 mb-6">
                        <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                          Name: {user_name}
                        </h3>
                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                          <i className="fa-solid fa-wallet text-lg mr-2 text-blueGray-400"></i>
                          Wallet address: {user_address}
                        </div>
                        <div className="mb-2 text-blueGray-600 mt-10 break-all">
                          <i className="fa-solid fa-flag mr-2 text-lg text-blueGray-400"></i>
                          Flagged words -{" "}
                          {myFlaggedWords.length > 0 && (
                            <>
                              {myFlaggedWords.map((el, i) => (
                                <span
                                  key={i}
                                  className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                >
                                  {el}
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* flag dialog */}
      <Transition appear show={isOpenFlag} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeFlagModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Word Flag
                  </Dialog.Title>

                  <div className="mt-3 mb-3">
                    {words.length > 0 && (
                      <>
                        {words.map((el, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                          >
                            {el}
                          </span>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="mt-2">
                    <form
                      onSubmit={send}
                      className="w-full px-8 pt-6 pb-8 mb-4"
                    >
                      <div className="mb-4">
                        <input
                          className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                          onChange={(e) => setWord(e.target.value)}
                          type="text"
                          value={word}
                          required
                          placeholder="word"
                        />
                        <span className="text-red-400 text-sm pt-2">
                          {" "}
                          {flagErr}{" "}
                        </span>
                      </div>

                      <div className="text-center pt-4">
                        <button
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          type="submit"
                        >
                          Add
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                      // className="mr-9 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeFlagModal}
                    >
                      Update
                    </button>

                    <button
                      type="button"
                      className="bg-red-400 ml-4  hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                      // className="mr-9 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={close}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NavBar;
