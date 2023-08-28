import React, { useState, useContext, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CommunityContext } from "../../context/community_context";
import { UserContext } from "../../context/user_context";
import { Dialog, Transition } from "@headlessui/react";
import "./index.css";

const ChatArea = ({ title }) => {
  const { CommunityMessages, myCommunity, sendMessage, communityMembers } =
    useContext(CommunityContext);
  const navigate = useNavigate();

  const { user_address, getAFriend } = useContext(UserContext);
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function setTempFriend(user) {
    getAFriend(user);
    navigate("/chat/direct_message");
  }

  const send = async (e) => {
    e.preventDefault();
    const msg = {
      msg: message,
      referenceTo:
        "0x6865790000000000000000000000000000000000000000000000000000000000",
      communityID: myCommunity,
    };

    try {
      await sendMessage(msg);
    } catch (error) {
      console.log("catch");
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="flex items-center justify-between flex-wrap py-3 border-b-2 border-gray-200">
          <div className="text-2xl mt-1">
            <span className="text-gray-700 mr-3">{title}</span>
          </div>
          <div>
            <button
              onClick={openModal}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 "
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
        {CommunityMessages.length > 0 ? (
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {CommunityMessages.map((el, i) => (
              <>
                {`${el.sender.toLowerCase()}` == user_address ? (
                  <>
                    <div className="chat-message" key={i}>
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                              {el._msg}
                            </span>
                          </div>
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                          alt="My profile"
                          className="w-6 h-6 rounded-full order-2"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                              {el._msg}
                            </span>
                          </div>
                        </div>
                        <img
                          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                          alt="My profile"
                          className="w-6 h-6 rounded-full order-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
            {/* <div className="flex mb-2">
            <div
              className="rounded py-2 px-3"
              style={{ backgroundColor: "#F2F2F2" }}
            >
              <p className="text-sm text-teal">Sylverter Stallone</p>
              <p className="text-sm mt-1">
                Hi everyone! Glad you could join! I am making a new movie.
              </p>
              <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
            </div>
          </div> */}
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center mb-4">
              <div
                className="rounded py-2 px-4"
                style={{ backgroundColor: "#FCF4CB" }}
              >
                <p className="text-xs">
                  Messages to this chat and calls are now secured with
                  end-to-end encryption. Tap for more info.
                </p>
              </div>
              <div className="flex justify-center mt-2">
                <div
                  className="rounded py-2 px-4"
                  style={{ backgroundColor: "#DDECF2" }}
                >
                  <p className="text-sm uppercase">No messages</p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form onSubmit={send}>
            <div className="relative flex">
              <input
                type="text"
                placeholder="Write your message!"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <span className="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* user's Dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    className="text-lg font-medium leading-6 text-gray-900 p-2"
                  >
                    Community Members ({communityMembers.length})
                  </Dialog.Title>
                  <hr className="p-2" />
                  <div className="mt-2">
                    <ul>
                      {communityMembers.length > 0 && (
                        <>
                          {communityMembers.map((el, i) => (
                            <li
                              className="py-3 sm:py-4"
                              key={i}
                              onClick={() => setTempFriend(el)}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src="/default.jpg"
                                    alt="Neil"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                    {el.name}
                                  </div>
                                  <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    <button
                                      href="/chat/direct_message"
                                      className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded"
                                    >
                                      Add Friend
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
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

export default ChatArea;
