import React, { useState, useContext } from "react";
import { CommunityContext } from "../../../context/community_context";
import { UserContext } from "../../../context/user_context";
import CreateCommunityDialog from "../../../components/create_community";
import ChatArea from "../../../components/chat_area";
import { Link } from "react-router-dom";
import Details from "../../../components/Details";

const Index = () => {
  const {
    communities,
    getCommunity,
    myCommunity,
    community,
    communityMembers,
    CommunityMessages,
  } = useContext(CommunityContext);

  const { isAdmin, user_name } = useContext(UserContext);

  const setCommunity = async (id) => {
    await getCommunity(id);
  };

  return (
    <>
      <div className="grid grid-cols-12 h-screen dark:bg-sky-950">
        <div className="col-span-4 p-2 border-double border-r-2 h-full">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <Link
                  to="/chat/direct_message"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  aria-current="page"
                >
                  Direct Message
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  to="/chat/community"
                  className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* HERE */}
          <div className="rounded-xl bg-white dark:bg-sky-950 p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
            {myCommunity ==
              "0x0000000000000000000000000000000000000000000000000000000000000000" &&
              !isAdmin && (
                <>
                  <div>
                    <div className="flex items-center border-b border-teal-500 py-2">
                      <span>
                        You do not belong a community yet. Join a Community{" "}
                      </span>
                    </div>
                  </div>
                  <ul>
                    {communities.length > 0 && (
                      <>
                        {communities.map((community, i) => (
                          <li
                            className="py-3 sm:py-4 border-b-2 cursor-pointer"
                            key={i}
                            onClick={() => setCommunity(community.communityID)}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {community.name}
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                  {community.guidelines}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </>
              )}

            {myCommunity !=
              "0x0000000000000000000000000000000000000000000000000000000000000000" &&
              !isAdmin && (
                <>
                  <ul>
                    <li className="py-3 sm:py-4 border-b-2 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {community.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {/* {community.guidelines} */}
                            {CommunityMessages.length > 0 && (
                              <>
                                {
                                  CommunityMessages[
                                    CommunityMessages.length - 1
                                  ]._msg
                                }
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </>
              )}

            {/* display if user is admin */}
            {isAdmin && (
              <div>
                <CreateCommunityDialog />
                <ul>
                  {communities.length > 0 && (
                    <>
                      {communities.map((community, i) => (
                        <li
                          className="py-3 sm:py-4 border-b-2 cursor-pointer"
                          key={i}
                          onClick={() => setCommunity(community.communityID)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {community.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {community.guidelines}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-8">
          {myCommunity !=
            "0x0000000000000000000000000000000000000000000000000000000000000000" &&
          !isAdmin ? (
            <ChatArea title={community.name} />
          ) : (
            <Details />
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
