import React, { useState, useContext } from "react";
import { CommunityContext } from "../../context/community_context";
import { UserContext } from "../../context/user_context";
import "./index.css";

const ChatArea = ({ title }) => {
  const { CommunityMessages, myCommunity, sendMessage } =
    useContext(CommunityContext);

  const { user_address } = useContext(UserContext);
  const [message, setMessage] = useState("");

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
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            {/* <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div> */}
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-700 mr-3">{title}</span>
              </div>
              {/* <span className="text-lg text-gray-600">Junior Developer</span> */}
            </div>
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
            {/* <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      Can be verified on any platform using docker
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
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      Your error message says permission denied, npm global
                      installs must be given root privileges.
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                />
              </div>
            </div> */}
            {/* <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                      Command was run with root privileges. I'm sure about that.
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                      I've update the description so it's more obviously now
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                      FYI https://askubuntu.com/a/700266/510172
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      Check the line above (it ends with a # so, I'm running it
                      as root )<pre># npm install -g @vue/devtools</pre>
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
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      Any updates on this issue? I'm getting the same error when
                      trying to install devtools. Thanks
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-2"
                />
              </div>
            </div> */}
            {/* <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      Thanks for your message David. I thought I'm alone with
                      this issue. Please, ? the issue to support it :)
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
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">
                      Are you using sudo?
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      Run this command sudo chown -R `whoami`
                      /Users/your_user_profile/.npm-global/ then install the
                      package globally without using sudo
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
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                      It seems like you are from Mac OS world. There is no
                      /Users/ folder on linux ?
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      I have no issue with any other packages installed with
                      root permission globally.
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
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                      yes, I have a mac. I never had issues with root permission
                      as well, but this helped me to solve the problem
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
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                      I get the same error on Arch Linux (also with sudo)
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                      I also have this issue, Here is what I was doing until
                      now: #1076
                    </span>
                  </div>
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      even i am facing
                    </span>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                  alt="My profile"
                  className="w-6 h-6 rounded-full order-1"
                />
              </div>
            </div> */}
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
    </>
  );
};

export default ChatArea;
