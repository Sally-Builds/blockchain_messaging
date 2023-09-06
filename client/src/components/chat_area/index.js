import React, { useState, useEffect, useContext, Fragment } from "react";
import { CommunityContext } from "../../context/community_context";
import { UserContext } from "../../context/user_context";
import { FriendContext } from "../../context/friend_context";
import { Dialog, Transition } from "@headlessui/react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";
import Filter from "bad-words";
import { toast } from "react-toastify";

const ChatArea = ({ title }) => {
  const { CommunityMessages, myCommunity, sendMessage, communityMembers } =
    useContext(CommunityContext);

  const { user_address, isAdmin } = useContext(UserContext);
  const { addFriend, friends } = useContext(FriendContext);
  let [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const fn = () => {
      let arr = [];

      if (communityMembers.length > 0) {
        communityMembers.forEach((el, i) => {
          let data = { ...el };
          if (friends.length > 0) {
            let check = friends.filter((e) => e.user === el.member_address);
            if (check.length > 0) {
              data.isFriend = true;
              data.isMe = false;
            } else {
              data.isFriend = false;
              //check if community member is current user
              if (el.member_address.toLowerCase() === user_address) {
                data.isMe = true;
              } else {
                data.isMe = false;
              }
            }
          } else {
            data.isFriend = false;
            if (i != 0) {
              if (el.member_address.toLowerCase() === user_address) {
                data.isMe = true;
              } else {
                data.isMe = false;
              }
            }
          }
          arr.push(data);
        });
      }
      setMembers(arr);
    };

    if (transcript) {
      setMessage(transcript);
    }

    fn();
  }, [friends, communityMembers, user_address, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const filter = new Filter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const send = async (e) => {
    e.preventDefault();
    const msg = {
      msg: message,
      referenceTo:
        "0x6865790000000000000000000000000000000000000000000000000000000000",
      communityID: myCommunity,
    };

    if (filter.isProfane(message)) {
      return toast.error("message contains profane words", {
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
        <div className="flex items-center justify-between flex-wrap py-3 border-b-2 border-gray-200">
          <div className="text-2xl mt-1">
            <span className="text-gray-300 mr-3">{title}</span>
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
                          src="/default.jpg"
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
                          src="/default.jpg"
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
              <span class="absolute inset-y-0 flex items-center">
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
                  <div className="max-w-sm mx-auto mt-4">
                    {communityMembers.length > 0 && (
                      <>
                        {members.map((el, i) => (
                          <div
                            key={i}
                            className="p-4 flex items-center justify-between border-t cursor-pointer hover:bg-gray-200"
                          >
                            <div className="flex items-center">
                              <img
                                className="rounded-full h-10 w-10"
                                src="/default.jpg"
                                alt=""
                              />
                              <div className="ml-2 flex flex-col">
                                <div className="leading-snug text-sm text-gray-900 font-bold">
                                  {el.name}
                                </div>
                                <div className="leading-snug text-xs text-gray-600">
                                  @
                                  {`${el.member_address.replace(
                                    /^(.{7}).{2,}/,
                                    "$1…"
                                  )}`}
                                </div>
                              </div>
                            </div>
                            {i === 0 ? (
                              <span className="h-8 px-3 text-md font-bold text-blue-400 hover:bg-blue-100">
                                admin
                              </span>
                            ) : (
                              <>
                                {el.isFriend ? (
                                  <span className="h-8 px-3 text-md font-bold text-blue-400 hover:bg-blue-100">
                                    friend
                                  </span>
                                ) : (
                                  <>
                                    {el.isMe ? (
                                      <span className="h-8 px-3 text-md font-bold text-blue-400 hover:bg-blue-100">
                                        me
                                      </span>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          addFriend(el.member_address)
                                        }
                                        className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100"
                                      >
                                        Add Friend
                                      </button>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
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
