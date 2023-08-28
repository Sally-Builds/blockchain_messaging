import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FriendContext } from "../../../context/friend_context";
import { UserContext } from "../../../context/user_context";
import ChatArea2 from "../../../components/chat_area2";

const Index = () => {
  const { friends } = useContext(FriendContext);
  const { friend } = useContext(UserContext);
  const [index, setIndex] = useState([0]);

  const set = (i) => {
    setIndex(i);
  };
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-4 p-2 border-double border-r-2 h-full">
          <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul class="flex flex-wrap -mb-px">
              <li class="mr-2">
                <Link
                  to="/chat/direct_message"
                  class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                >
                  Direct Message
                </Link>
              </li>
              <li class="mr-2">
                <Link
                  to="/chat/community"
                  class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* HERE */}
          <div className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            <ul>
              {friend && (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Neil"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {friend.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Lorem dolor sit amet the quick brown fox jumps
                      </p>
                    </div>
                    <div className="inline-flex items-center font-thin text-xs underline text-gray-900 dark:text-white">
                      11:35AM
                    </div>
                  </div>
                </li>
              )}
              {friends.length > 0 && (
                <>
                  {friends.map((el, i) => (
                    <li className="py-3 sm:py-4" key={i} onClick={() => set(i)}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Neil"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {el.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Lorem dolor sit amet the quick brown fox jumps
                          </p>
                        </div>
                        <div className="inline-flex items-center font-thin text-xs underline text-gray-900 dark:text-white">
                          11:35AM
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="col-span-8">
          <ChatArea2 friends={friends} index={index} />
        </div>
      </div>
    </>
  );
};

export default Index;
