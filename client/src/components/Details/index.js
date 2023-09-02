import React, { useContext } from "react";
import { CommunityContext } from "../../context/community_context";
import { UserContext } from "../../context/user_context";
import Chat from "../chat_area";

const Details = () => {
  const { community, communityMembers, joinCommunity, myCommunity } =
    useContext(CommunityContext);

  const { isAdmin } = useContext(UserContext);

  const join = async (id) => {
    await joinCommunity(id);
  };
  return (
    <>
      {/* show community details if user has not joined any community yet */}
      {myCommunity !=
      "0x0000000000000000000000000000000000000000000000000000000000000000" ? (
        <Chat title={community.name} />
      ) : (
        <div className="flex flex-col p-6">
          {community && (
            <>
              <div className="py-4">
                <div className="text-3xl flex font-medium justify-between leading-tight pb-8">
                  <div className="text-gray-500 dark:text-gray-400">
                    {community.name}
                  </div>
                  <div className="text-sm pt-2">
                    {!isAdmin && (
                      <button
                        onClick={() => join(community.communityID)}
                        className="bg-transparent hover:bg-blue-500 
                      text-blue-700 font-bold hover:text-white 
                      py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
                <hr className="pb-4" />
                <div className="mb-3 text-gray-500 dark:text-gray-400">
                  <div className="text-xl font-medium leading-tight pb-6">
                    Community Guidelines
                  </div>
                  <p>{community.guidelines}</p>
                </div>
              </div>

              <hr className="pt-4" />
              <div className="py-2">
                <div className="font-antialiased hover:subpixel-antialiased tracking-widest font-bold text-gray-700">
                  Community Members ({communityMembers.length})
                </div>

                <ul>
                  {communityMembers.length > 0 && (
                    <>
                      {communityMembers.map((el, i) => (
                        <li className="py-3 sm:py-4" key={i}>
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
                                {/* Lorem dolor sit amet the quick brown fox jumps */}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Details;
