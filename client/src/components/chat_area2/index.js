import React, { useState, useContext, Fragment, useEffect } from "react";
import { UserContext } from "../../context/user_context";
import { FriendContext } from "../../context/friend_context";
import { Dialog, Transition } from "@headlessui/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import Filter from "bad-words";
import { toast } from "react-toastify";

const ChatArea2 = ({ friends, index }) => {
  const { user_address, myFlaggedWords } = useContext(UserContext);
  const { sendMessage } = useContext(FriendContext);
  const [message, setMessage] = useState("");
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (transcript) {
      setMessage(transcript);
    }
  }, [transcript]);

  const filter = new Filter();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function closeViewModal() {
    setIsOpenModal(false);
  }

  const openViewModal = () => {
    setIsOpenModal(true);
  };

  const send = async (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    const msg = {
      msg: message,
      friend: friends[index].user,
    };
    let messageArr = message.split(" ");
    let isBadWord = messageArr.some((el) =>
      friends[index].flaggedWords.includes(el)
    );

    if (isBadWord || filter.isProfane(message)) {
      return toast.error("message contains flagged or profane words", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      await sendMessage(msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="/default.jpg"
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex justify leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">
                  {friends.length > 0 && friends[index].name && (
                    <>{friends[index].name}</>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="group bottom-10 right-10 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-danger-600 uppercase leading-normal text-white">
            <button
              onClick={openViewModal}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 "
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>

        {friends.length > 0 && friends[index].messages.length > 0 ? (
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {friends[index].messages.map((el, i) => (
              <div key={i}>
                {`${el.sender.toLowerCase()}` === user_address ? (
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
                          src="/default.jpg"
                          alt="My profile"
                          className="w-6 h-6 rounded-full order-2"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="chat-message" key={i}>
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                              {el._msg}
                            </span>
                          </div>
                        </div>
                        <img
                          src="/default.jpg"
                          alt="My profile"
                          className="w-6 h-6 rounded-full order-1"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
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
              <span className="absolute inset-y-0 flex items-center">
                <button
                  type="button"
                  className={
                    listening
                      ? `inline-flex animate-ping  opacity-75 items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out
                  text-gray-500 hover:bg-gray-300 focus:outline-none`
                      : `inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out
                  text-gray-500 hover:bg-gray-300 focus:outline-none`
                  }
                  onClick={SpeechRecognition.startListening}
                >
                  <i
                    className={
                      listening
                        ? `fa-solid fa-microphone text-blue-500 border`
                        : "fa-solid fa-microphone"
                    }
                  ></i>
                </button>
              </span>
              <input
                type="text"
                placeholder="Write your message!"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
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

      {friends[index] && (
        <>
          <Transition appear show={isOpenModal} as={Fragment}>
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
                              Name: {friends[index].name}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                              <i className="fa-solid fa-wallet text-lg mr-2 text-blueGray-400"></i>
                              Wallet address: {friends[index].user}
                            </div>
                            <div className="mb-2 text-blueGray-600 mt-10 break-all">
                              <i className="fa-solid fa-flag mr-2 text-lg text-blueGray-400"></i>
                              Flagged words -{" "}
                              {friends[index].flaggedWords.length > 0 && (
                                <>
                                  {friends[index].flaggedWords.map((el, i) => (
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
        </>
      )}
    </>
  );
};

export default ChatArea2;
